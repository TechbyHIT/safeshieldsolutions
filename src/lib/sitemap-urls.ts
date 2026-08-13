import { CITIES } from "@/data/cities";
import { getAreasForCity } from "@/data/areas";
import { SEO_SERVICES } from "@/data/seo-services";
import { getAllAreaPageUrlSlugs } from "@/lib/area-page-slugs";
import { guideArticles, blogPosts } from "@/config/guides-content";
import { site } from "@/config/site";

export const SITEMAP_CHUNK_SIZE = 50_000;

/** Indexable static hubs only — never noindex, admin, or canonicalized-away paths. */
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
  "/privacy-policy",
  "/terms-of-service",
] as const;

const HIGH_INTENT_FRAGMENTS = [
  "-near-me",
  "-installation",
  "-price",
  "-dealers",
  "-contractors",
  "-free-survey",
  "-best",
  "-premium",
  "-cost",
] as const;

function absoluteUrl(path: string): string {
  const base = site.url.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

function countDynamicUrls(): number {
  const areaPageSlugs = getAllAreaPageUrlSlugs().length;
  let total = STATIC_PATHS.length;
  total += guideArticles.length;
  total += blogPosts.length;
  total += SEO_SERVICES.length;
  total += CITIES.length;

  for (const city of CITIES) {
    const areas = getAreasForCity(city.slug);
    total += areas.length;
    total += areaPageSlugs;
    total += areas.length * areaPageSlugs;
  }

  return total;
}

export function getSitemapChunkCount(): number {
  return Math.ceil(countDynamicUrls() / SITEMAP_CHUNK_SIZE);
}

export function getSitemapPriority(path: string): number {
  if (path === "/") return 1;
  if (path === "/services" || path === "/locations" || path === "/contact") return 0.95;
  if (path === "/html-sitemap" || path === "/faq") return 0.9;
  if (path.startsWith("/services/")) return 0.9;
  if (path.startsWith("/locations/")) return 0.9;
  if (HIGH_INTENT_FRAGMENTS.some((frag) => path.includes(frag))) return 0.85;
  if (path.startsWith("/guides") || path.startsWith("/blog")) return 0.8;
  return 0.7;
}

export function getSitemapChangeFreq(path: string): "daily" | "weekly" | "monthly" {
  if (path === "/privacy-policy" || path === "/terms-of-service") return "monthly";
  return "weekly";
}

/** Deterministic global index → path. Order must match countDynamicUrls(). */
export function getPathByGlobalIndex(index: number): string | null {
  let cursor = 0;

  for (const path of STATIC_PATHS) {
    if (cursor === index) return path;
    cursor++;
  }

  for (const guide of guideArticles) {
    if (cursor === index) return `/guides/${guide.slug}`;
    cursor++;
  }

  for (const post of blogPosts) {
    if (cursor === index) return `/blog/${post.slug}`;
    cursor++;
  }

  for (const service of SEO_SERVICES) {
    if (cursor === index) return `/services/${service.slug}`;
    cursor++;
  }

  for (const city of CITIES) {
    if (cursor === index) return `/locations/${city.slug}`;
    cursor++;
  }

  for (const city of CITIES) {
    const areas = getAreasForCity(city.slug);
    for (const area of areas) {
      if (cursor === index) return `/locations/${city.slug}/${area.slug}`;
      cursor++;
    }
  }

  const areaPageSlugs = getAllAreaPageUrlSlugs();

  for (const city of CITIES) {
    for (const pageSlug of areaPageSlugs) {
      if (cursor === index) return `/${city.slug}/${pageSlug}`;
      cursor++;
    }
  }

  for (const city of CITIES) {
    const areas = getAreasForCity(city.slug);
    for (const area of areas) {
      for (const pageSlug of areaPageSlugs) {
        if (cursor === index) return `/${city.slug}/${area.slug}/${pageSlug}`;
        cursor++;
      }
    }
  }

  return null;
}

export function getSitemapChunkUrls(chunkId: number): string[] {
  return getSitemapChunkEntries(chunkId).map((e) => e.url);
}

export function getSitemapChunkEntries(chunkId: number): { url: string; path: string }[] {
  if (chunkId < 0 || !Number.isInteger(chunkId)) return [];
  const start = chunkId * SITEMAP_CHUNK_SIZE;
  const end = start + SITEMAP_CHUNK_SIZE;
  const entries: { url: string; path: string }[] = [];

  for (let i = start; i < end; i++) {
    const path = getPathByGlobalIndex(i);
    if (!path) break;
    entries.push({ url: absoluteUrl(path), path });
  }

  return entries;
}

export function getTotalUrlCount(): number {
  return countDynamicUrls();
}

export function getSitemapIndexLocs(): string[] {
  const base = site.url.replace(/\/$/, "");
  const chunks = Array.from({ length: getSitemapChunkCount() }, (_, id) => `${base}/sitemaps/${id}.xml`);
  chunks.push(`${base}/sitemaps/images.xml`);
  return chunks;
}
