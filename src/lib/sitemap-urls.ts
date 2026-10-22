import { CITIES } from "@/data/cities";
import { SEO_SERVICES } from "@/data/seo-services";
import { serviceMegaMenu } from "@/config/mega-menu";
import { HOME_TOP_SERVICES } from "@/config/home-seo-links";
import { guideArticles, blogPosts } from "@/config/guides-content";
import { CG_CORE_SERVICE_SLUGS, CG_PRIORITY_PLACES, COMPARISONS, PRICING_PAGES } from "@/data/cg-local-seo";
import { CG_DISTRICTS, getIndexableLocalitiesForCity, LOCALITY_SERVICE_SLUGS } from "@/data/cg-hierarchy";
import { evaluateSeoPath } from "@/lib/seo-quality-gate";
import { cityServiceSlugsForPlace, nearMeSlug } from "@/lib/local-seo-catalog";
import {
  pageTypeForPath,
  seoPriorityForPath,
  sitemapGroupForPath,
  sitemapSortRank,
  SITEMAP_GROUP_FILES,
  SITEMAP_GROUP_ORDER,
  type SeoPriority,
  type SitemapGroupId,
} from "@/lib/seo-priority";
import { site } from "@/config/site";
import { getSitemapLastmodIso } from "@/lib/seo-freshness";
import { isPublishedInPhase, publishingWave } from "@/lib/programmatic-seo";
import { sitemapImageForPath } from "@/config/photo-catalog";

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
  seoPriority: SeoPriority;
  group: SitemapGroupId;
  sortRank: number;
}

export interface SitemapExclusion {
  path: string;
  reason: string;
}

/** Internal-only pages: never submit, never link from public nav. */
export const NOINDEX_PATHS = ["/seo-coverage"] as const;

const NOINDEX_PATH_SET = new Set<string>(NOINDEX_PATHS);

/**
 * Indexable static hubs, including legal pages so footer links are not skipped.
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
  "/glossary",
  "/html-sitemap",
  "/privacy-policy",
  "/terms-of-service",
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

/** Reliable lastmod only. Blog posts use their published date; other URLs use the content revision. */
export function lastmodForPath(path: string): string {
  if (path.startsWith("/blog/")) {
    const slug = path.slice("/blog/".length);
    const post = blogPosts.find((item) => item.slug === slug);
    if (post?.date) {
      const parsed = new Date(`${post.date}T00:00:00.000Z`);
      if (!Number.isNaN(parsed.getTime())) return parsed.toISOString();
    }
  }
  return getSitemapLastmodIso();
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
  return [...CITIES].sort((a, b) => a.sortOrder - b.sortOrder);
}

let cachedEntries: SitemapEntry[] | null = null;
let cachedPhase: SitemapPhase | null = null;
let cachedExclusions: SitemapExclusion[] = [];

function exclude(path: string, reason: string) {
  cachedExclusions.push({ path, reason });
}

let activePhase: SitemapPhase = 4;

function pushEntry(
  entries: SitemapEntry[],
  seen: Set<string>,
  path: string,
  priority: number,
  changefreq: SitemapChangeFreq,
  lastmod: string,
) {
  if (!path.startsWith("/") || path.includes("?") || path.includes("#")) {
    exclude(path, "Not a clean path");
    return;
  }
  if (path !== "/" && path.endsWith("/")) {
    exclude(path, "Trailing slash");
    return;
  }
  if (path !== path.toLowerCase()) {
    exclude(path, "Uppercase URL");
    return;
  }
  if (NOINDEX_PATH_SET.has(path)) {
    exclude(path, "noindex");
    return;
  }
  if (!isPublishedInPhase(path, activePhase)) {
    exclude(path, `Held for publishing phase ${publishingWave(path)}`);
    return;
  }
  const gate = evaluateSeoPath(path);
  if (!gate.index) {
    exclude(path, gate.reasons[0] ?? "Quality gate");
    return;
  }
  if (gate.canonicalPath !== path) {
    exclude(path, `Canonical is ${gate.canonicalPath}`);
    return;
  }
  const loc = absoluteUrl(path);
  if (!loc.startsWith("https://") || loc.includes("localhost")) {
    exclude(path, "Not a production HTTPS URL");
    return;
  }
  if (seen.has(loc)) return;
  seen.add(loc);
  entries.push({
    loc,
    path,
    lastmod,
    changefreq,
    priority,
    seoPriority: seoPriorityForPath(path),
    group: sitemapGroupForPath(path),
    sortRank: sitemapSortRank(path),
  });
}

function hubPriority(path: string): number {
  if (path === "/") return 1;
  if (path === "/services" || path === "/locations") return 0.9;
  if (path === "/contact") return 0.8;
  return 0.7;
}

function buildEntries(phase: SitemapPhase): SitemapEntry[] {
  activePhase = phase;
  cachedExclusions = [];
  const entries: SitemapEntry[] = [];
  const seen = new Set<string>();
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
      lastmodForPath(path),
    );
  }

  for (const guide of guideArticles) {
    const path = `/guides/${guide.slug}`;
    pushEntry(entries, seen, path, 0.7, "weekly", lastmodForPath(path));
  }
  for (const post of blogPosts) {
    const path = `/blog/${post.slug}`;
    pushEntry(entries, seen, path, 0.55, "weekly", lastmodForPath(path));
  }

  const serviceList = phase === 1 ? services.filter((s) => menuSet.has(s.slug)) : services;
  for (const service of serviceList) {
    const priority = menuSet.has(service.slug) ? 0.9 : 0.65;
    pushEntry(entries, seen, `/services/${service.slug}`, priority, "weekly", lastmodForPath(`/services/${service.slug}`));
  }

  for (const city of cities) {
    const path = city.slug === "chhattisgarh" ? "/chhattisgarh" : `/locations/${city.slug}`;
    pushEntry(entries, seen, path, 0.85, "weekly", lastmodForPath(path));
  }

  // Self-canonical indexable URLs only. Doorway intents stay out. Raipur is its own sitemap.
  pushEntry(entries, seen, "/chhattisgarh", 0.95, "weekly", lastmodForPath("/chhattisgarh"));
  for (const district of CG_DISTRICTS) {
    const path = `/chhattisgarh/districts/${district.slug}`;
    pushEntry(entries, seen, path, 0.7, "monthly", lastmodForPath(path));
  }
  pushEntry(entries, seen, "/pricing", 0.6, "monthly", lastmodForPath("/pricing"));
  pushEntry(entries, seen, "/compare", 0.55, "monthly", lastmodForPath("/compare"));
  for (const page of PRICING_PAGES) {
    const path = `/pricing/${page.slug}`;
    pushEntry(entries, seen, path, 0.5, "monthly", lastmodForPath(path));
  }
  for (const item of COMPARISONS) {
    const path = `/compare/${item.slug}`;
    pushEntry(entries, seen, path, 0.5, "monthly", lastmodForPath(path));
  }

  for (const place of CG_PRIORITY_PLACES) {
    for (const locality of getIndexableLocalitiesForCity(place.slug)) {
      const hub = `/chhattisgarh/${place.slug}/areas/${locality.slug}`;
      if (evaluateSeoPath(hub).index) {
        pushEntry(entries, seen, hub, 0.6, "monthly", lastmodForPath(hub));
      }
      for (const serviceSlug of LOCALITY_SERVICE_SLUGS) {
        const path = `${hub}/${serviceSlug}`;
        if (!evaluateSeoPath(path).index) continue;
        pushEntry(entries, seen, path, 0.55, "monthly", lastmodForPath(path));
      }
    }
  }

  for (const place of CG_PRIORITY_PLACES) {
    const placePath = `/chhattisgarh/${place.slug}`;
    if (evaluateSeoPath(placePath).index) {
      pushEntry(
        entries,
        seen,
        placePath,
        place.slug === "raipur" ? 0.9 : 0.8,
        "weekly",
        lastmodForPath(placePath),
      );
    }
    for (const serviceSlug of cityServiceSlugsForPlace(place.slug)) {
      const path = `/chhattisgarh/${place.slug}/${serviceSlug}`;
      const nearMe = `/chhattisgarh/${place.slug}/${nearMeSlug(serviceSlug)}`;
      if (evaluateSeoPath(path).index) {
        pushEntry(
          entries,
          seen,
          path,
          place.slug === "raipur" ? 0.85 : 0.65,
          "monthly",
          lastmodForPath(path),
        );
      }
      if (evaluateSeoPath(nearMe).index) {
        pushEntry(
          entries,
          seen,
          nearMe,
          place.slug === "raipur" ? 0.84 : 0.64,
          "monthly",
          lastmodForPath(nearMe),
        );
      }
    }
  }

  for (const serviceSlug of CG_CORE_SERVICE_SLUGS) {
    const path = `/chhattisgarh/${serviceSlug}`;
    if (!evaluateSeoPath(path).index) continue;
    pushEntry(entries, seen, path, 0.75, "weekly", lastmodForPath(path));
  }

  entries.sort((a, b) => {
    const groupDelta = SITEMAP_GROUP_ORDER.indexOf(a.group) - SITEMAP_GROUP_ORDER.indexOf(b.group);
    if (groupDelta !== 0) return groupDelta;
    return a.sortRank - b.sortRank || a.path.localeCompare(b.path);
  });
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
  const images = entries.map((entry) => sitemapImageForPath(entry.path));
  const hasImages = images.some(Boolean);
  const urls = entries
    .map((entry, index) => {
      const image = images[index];
      const imageXml = image
        ? `<image:image><image:loc>${xmlEscape(absoluteUrl(image.src))}</image:loc><image:title>${xmlEscape(image.title)}</image:title><image:caption>${xmlEscape(image.caption)}</image:caption></image:image>`
        : "";
      return `<url><loc>${xmlEscape(entry.loc)}</loc><lastmod>${xmlEscape(entry.lastmod)}</lastmod>${imageXml}</url>`;
    })
    .join("\n");
  const xmlns = hasImages
    ? 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"'
    : 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset ${xmlns}>
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

export interface SitemapGroupFile {
  id: SitemapGroupId;
  file: string;
  entries: SitemapEntry[];
}

/** Named child urlsets. Empty groups are omitted. Project files are not created. */
export function getSitemapGroups(): SitemapGroupFile[] {
  const entries = getAllSitemapEntries();
  return SITEMAP_GROUP_ORDER.map((id) => ({
    id,
    file: SITEMAP_GROUP_FILES[id],
    entries: entries.filter((entry) => entry.group === id),
  })).filter((group) => group.entries.length > 0);
}

export function getSitemapExclusions(): SitemapExclusion[] {
  getAllSitemapEntries();
  return cachedExclusions;
}

export function childSitemapFilename(index: number): string {
  const groups = getSitemapGroups();
  return groups[index - 1]?.file ?? `sitemap-${index}.xml`;
}

export function getSitemapIndexLocs(): string[] {
  const origin = canonicalOrigin();
  return getSitemapGroups().map((group) => `${origin}/${group.file}`);
}

/** Production document at /sitemap.xml — an index of child urlsets, not a second copy of every URL. */
export function renderPublishedSitemapXml(): string {
  return renderSitemapIndexXml(getSitemapIndexLocs());
}

export interface SitemapInventory {
  total: number;
  groups: { id: SitemapGroupId; file: string; count: number }[];
  byPageType: Record<string, number>;
  exclusions: SitemapExclusion[];
  exclusionsByReason: Record<string, number>;
}

export function summarizeSitemapInventory(): SitemapInventory {
  const entries = getAllSitemapEntries();
  const byPageType: Record<string, number> = {};
  for (const entry of entries) {
    const type = pageTypeForPath(entry.path);
    byPageType[type] = (byPageType[type] ?? 0) + 1;
  }
  const exclusions = getSitemapExclusions();
  const exclusionsByReason: Record<string, number> = {};
  for (const item of exclusions) {
    exclusionsByReason[item.reason] = (exclusionsByReason[item.reason] ?? 0) + 1;
  }
  return {
    total: entries.length,
    groups: getSitemapGroups().map((group) => ({
      id: group.id,
      file: group.file,
      count: group.entries.length,
    })),
    byPageType,
    exclusions,
    exclusionsByReason,
  };
}
