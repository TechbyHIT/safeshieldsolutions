import { CITIES } from "@/data/cities";
import { getAreasForCity } from "@/data/areas";
import { SEO_SERVICES } from "@/data/seo-services";
import { serviceMegaMenu } from "@/config/mega-menu";
import { HOME_TOP_SERVICES } from "@/config/home-seo-links";
import { guideArticles, blogPosts } from "@/config/guides-content";
import { intentSuffixesForCity } from "@/lib/area-page-slugs-types";
import { getAllAreaPageUrlSlugs } from "@/lib/area-page-slugs";
import { site } from "@/config/site";
import { getSitemapLastmodIso } from "@/lib/seo-freshness";

/** Under Google’s 50k urlset limit. */
export const SITEMAP_SHARD_SIZE = 40_000;

/** @deprecated Use SITEMAP_SHARD_SIZE — kept for seo-validate / page-count. */
export const SITEMAP_CHUNK_SIZE = SITEMAP_SHARD_SIZE;

export type SitemapPhase = 1 | 2 | 3 | 4;
export type SitemapChangeFreq = "daily" | "weekly" | "monthly";

export interface SitemapEntry {
  loc: string;
  path: string;
  lastmod: string;
  changefreq: SitemapChangeFreq;
  priority: number;
}

/** Thin/legal pages: noindex, follow in meta — never submit these in the sitemap. */
export const NOINDEX_PATHS = ["/privacy-policy", "/terms-of-service"] as const;

const NOINDEX_PATH_SET = new Set<string>(NOINDEX_PATHS);

/**
 * Indexable static hubs. Legal pages stay out — they use noindex, follow
 * so crawlers can still read the meta without ranking the URL.
 */
export const STATIC_PATHS = [
  "/",
  "/services",
  "/locations",
  "/contact",
  "/about",
  "/gallery",
  "/guides",
  "/blog",
  "/faq",
  "/html-sitemap",
] as const;

export function getSitemapPhase(): SitemapPhase {
  const raw = process.env.SITEMAP_PHASE?.trim();
  if (raw === "1" || raw === "2" || raw === "3" || raw === "4") {
    return Number(raw) as SitemapPhase;
  }
  return 4;
}

export function xmlEscape(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function canonicalOrigin(): string {
  return site.url.replace(/\/$/, "");
}

function absoluteUrl(path: string): string {
  const origin = canonicalOrigin();
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Unique mega-menu + homepage featured service slugs (the “menu” cap). */
export function getMenuServiceSlugs(): string[] {
  const slugs = new Set<string>();
  for (const category of serviceMegaMenu) {
    for (const link of category.links) {
      const match = /^\/services\/([^/?#]+)$/.exec(link.href);
      if (match?.[1]) slugs.add(match[1]);
    }
  }
  for (const service of HOME_TOP_SERVICES) slugs.add(service.slug);
  return [...slugs].filter((slug) => SEO_SERVICES.some((s) => s.slug === slug));
}

function publishedServices() {
  return SEO_SERVICES.filter((s) => s.priority > 0);
}

function liveCities() {
  return CITIES;
}

let cachedEntries: SitemapEntry[] | null = null;
let cachedPhase: SitemapPhase | null = null;

function pushEntry(
  entries: SitemapEntry[],
  seen: Set<string>,
  path: string,
  priority: number,
  changefreq: SitemapChangeFreq,
  lastmod: string,
) {
  if (!path.startsWith("/") || path.includes("?")) return;
  if (NOINDEX_PATH_SET.has(path)) return;
  const loc = absoluteUrl(path);
  if (seen.has(loc)) return;
  seen.add(loc);
  entries.push({ loc, path, lastmod, changefreq, priority });
}

function hubPriority(path: string): number {
  if (path === "/") return 1;
  if (path === "/services" || path === "/locations") return 0.9;
  if (path === "/contact") return 0.8;
  return 0.7;
}

function buildEntries(phase: SitemapPhase): SitemapEntry[] {
  const entries: SitemapEntry[] = [];
  const seen = new Set<string>();
  const lastmod = getSitemapLastmodIso();
  const menuSlugs = getMenuServiceSlugs();
  const menuSet = new Set(menuSlugs);
  const services = publishedServices();
  const cities = liveCities();

  for (const path of STATIC_PATHS) {
    pushEntry(
      entries,
      seen,
      path,
      hubPriority(path),
      path === "/" ? "daily" : "weekly",
      lastmod,
    );
  }

  for (const guide of guideArticles) {
    pushEntry(entries, seen, `/guides/${guide.slug}`, 0.7, "weekly", lastmod);
  }
  for (const post of blogPosts) {
    pushEntry(entries, seen, `/blog/${post.slug}`, 0.55, "weekly", lastmod);
  }

  const serviceList = phase === 1 ? services.filter((s) => menuSet.has(s.slug)) : services;
  for (const service of serviceList) {
    const priority = menuSet.has(service.slug) ? 0.9 : 0.65;
    pushEntry(entries, seen, `/services/${service.slug}`, priority, "weekly", lastmod);
  }

  for (const city of cities) {
    pushEntry(entries, seen, `/locations/${city.slug}`, 0.85, "weekly", lastmod);
  }

  if (phase < 2) return entries;

  for (const city of cities) {
    for (const area of getAreasForCity(city.slug)) {
      pushEntry(entries, seen, `/locations/${city.slug}/${area.slug}`, 0.7, "monthly", lastmod);
    }
  }

  for (const city of cities) {
    for (const service of services) {
      const priority = menuSet.has(service.slug) ? 0.85 : 0.55;
      pushEntry(entries, seen, `/${city.slug}/${service.slug}`, priority, "weekly", lastmod);
    }
  }

  if (phase < 3) return entries;

  for (const city of cities) {
    const suffixes = intentSuffixesForCity(city.slug);
    for (const service of services) {
      for (const suffix of suffixes) {
        if (!suffix) continue;
        const priority = menuSet.has(service.slug) ? 0.55 : 0.4;
        pushEntry(
          entries,
          seen,
          `/${city.slug}/${service.slug}${suffix}`,
          priority,
          "monthly",
          lastmod,
        );
      }
    }
  }

  if (phase < 4) return entries;

  for (const city of cities) {
    const areas = getAreasForCity(city.slug);
    const areaPageSlugs =
      city.slug === "chhattisgarh" ? getAllAreaPageUrlSlugs("chhattisgarh") : menuSlugs;
    for (const area of areas) {
      for (const slug of areaPageSlugs) {
        pushEntry(
          entries,
          seen,
          `/${city.slug}/${area.slug}/${slug}`,
          city.slug === "chhattisgarh" ? 0.5 : 0.6,
          "monthly",
          lastmod,
        );
      }
    }
  }

  return entries;
}

export function getAllSitemapEntries(): SitemapEntry[] {
  const phase = getSitemapPhase();
  if (cachedEntries && cachedPhase === phase) return cachedEntries;
  cachedEntries = buildEntries(phase);
  cachedPhase = phase;
  return cachedEntries;
}

export function shardSitemapEntries(entries: SitemapEntry[]): SitemapEntry[][] {
  if (entries.length === 0) return [[]];
  const shards: SitemapEntry[][] = [];
  for (let i = 0; i < entries.length; i += SITEMAP_SHARD_SIZE) {
    shards.push(entries.slice(i, i + SITEMAP_SHARD_SIZE));
  }
  return shards;
}

export function renderUrlsetXml(entries: SitemapEntry[]): string {
  const urls = entries
    .map(
      (entry) => `  <url>
    <loc>${xmlEscape(entry.loc)}</loc>
    <lastmod>${xmlEscape(entry.lastmod)}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(2)}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export function renderSitemapIndexXml(locs: string[]): string {
  const lastmod = getSitemapLastmodIso();
  const body = locs
    .map(
      (loc) => `  <sitemap>
    <loc>${xmlEscape(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</sitemapindex>
`;
}

export function getSitemapShardCount(): number {
  return shardSitemapEntries(getAllSitemapEntries()).length;
}

export function getSitemapChunkCount(): number {
  return getSitemapShardCount();
}

export function getTotalUrlCount(): number {
  return getAllSitemapEntries().length;
}

/** Child urlsets live next to the index: /sitemap-1.xml, /sitemap-2.xml, … (never nested indexes). */
export function childSitemapFilename(index: number): string {
  return `sitemap-${index}.xml`;
}

export function getSitemapIndexLocs(): string[] {
  const origin = canonicalOrigin();
  const count = getSitemapShardCount();
  return Array.from({ length: count }, (_, i) => `${origin}/${childSitemapFilename(i + 1)}`);
}
