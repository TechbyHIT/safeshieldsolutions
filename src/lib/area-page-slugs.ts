import { AREA_PAGE_SERVICES, SEO_SERVICES } from "@/data/seo-services";
import {
  PAGE_INTENT_SUFFIXES,
  type ResolvedAreaPageSlug,
} from "@/lib/area-page-slugs-types";

/** One canonical base slug per service — long-tail phrases stay in on-page copy & meta keywords only. */
function baseSlugsForService(serviceSlug: string): string[] {
  return [serviceSlug];
}

let cachedUrlSlugs: string[] | null = null;
let cachedResolverMap: Map<string, ResolvedAreaPageSlug> | null = null;

function buildResolverMap(): Map<string, ResolvedAreaPageSlug> {
  const map = new Map<string, ResolvedAreaPageSlug>();

  for (const service of AREA_PAGE_SERVICES) {
    const bases = baseSlugsForService(service.slug);
    for (const base of bases) {
      for (const suffix of PAGE_INTENT_SUFFIXES) {
        const urlSlug = `${base}${suffix}`;
        if (map.has(urlSlug)) continue;

        const intentLabel = suffix
          ? suffix.slice(1).replace(/-/g, " ")
          : "general";

        map.set(urlSlug, {
          urlSlug,
          serviceSlug: service.slug,
          intentLabel,
          phraseSlug: base !== service.slug ? base : undefined,
        });
      }
    }
  }

  for (const service of SEO_SERVICES) {
    if (!map.has(service.slug)) {
      map.set(service.slug, {
        urlSlug: service.slug,
        serviceSlug: service.slug,
        intentLabel: "general",
      });
    }
  }

  return map;
}

export function getAreaPageResolverMap(): Map<string, ResolvedAreaPageSlug> {
  if (!cachedResolverMap) cachedResolverMap = buildResolverMap();
  return cachedResolverMap;
}

export function getAllAreaPageUrlSlugs(): string[] {
  if (!cachedUrlSlugs) {
    cachedUrlSlugs = [...getAreaPageResolverMap().keys()];
  }
  return cachedUrlSlugs;
}

export function resolveAreaPageSlug(urlSlug: string): ResolvedAreaPageSlug | null {
  return getAreaPageResolverMap().get(urlSlug) ?? null;
}

export function isCityServiceSlug(slug: string): boolean {
  return SEO_SERVICES.some((s) => s.slug === slug) && !resolveAreaPageSlug(slug)?.phraseSlug;
}

/** Total programmatic area×page-slug URLs for one city. */
export function countAreaPagesPerCity(areaCount: number): number {
  return areaCount * getAllAreaPageUrlSlugs().length;
}

export function countCityServicePages(): number {
  return SEO_SERVICES.length;
}

export function getSlugCountStats(): {
  urlSlugsPerArea: number;
  areaPageServices: number;
} {
  return {
    urlSlugsPerArea: getAllAreaPageUrlSlugs().length,
    areaPageServices: AREA_PAGE_SERVICES.length,
  };
}
