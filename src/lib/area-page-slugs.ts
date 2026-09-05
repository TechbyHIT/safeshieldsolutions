import { AREA_PAGE_SERVICES, SEO_SERVICES } from "@/data/seo-services";
import {
  intentSuffixesForCity,
  type ResolvedAreaPageSlug,
} from "@/lib/area-page-slugs-types";

/** One canonical base slug per service — long-tail phrases stay in on-page copy & meta keywords only. */
function baseSlugsForService(serviceSlug: string): string[] {
  return [serviceSlug];
}

const resolverCache = new Map<string, Map<string, ResolvedAreaPageSlug>>();
const slugListCache = new Map<string, string[]>();

function cacheKey(citySlug?: string): string {
  return citySlug === "chhattisgarh" ? "chhattisgarh" : "default";
}

function buildResolverMap(citySlug?: string): Map<string, ResolvedAreaPageSlug> {
  const map = new Map<string, ResolvedAreaPageSlug>();
  const suffixes = intentSuffixesForCity(citySlug);

  for (const service of AREA_PAGE_SERVICES) {
    const bases = baseSlugsForService(service.slug);
    for (const base of bases) {
      for (const suffix of suffixes) {
        const urlSlug = `${base}${suffix}`;
        if (map.has(urlSlug)) continue;

        const intentLabel = suffix ? suffix.slice(1).replace(/-/g, " ") : "general";

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

export function getAreaPageResolverMap(citySlug?: string): Map<string, ResolvedAreaPageSlug> {
  const key = cacheKey(citySlug);
  const cached = resolverCache.get(key);
  if (cached) return cached;
  const map = buildResolverMap(citySlug);
  resolverCache.set(key, map);
  return map;
}

export function getAllAreaPageUrlSlugs(citySlug?: string): string[] {
  const key = cacheKey(citySlug);
  const cached = slugListCache.get(key);
  if (cached) return cached;
  const slugs = [...getAreaPageResolverMap(citySlug).keys()];
  slugListCache.set(key, slugs);
  return slugs;
}

export function resolveAreaPageSlug(
  urlSlug: string,
  citySlug?: string,
): ResolvedAreaPageSlug | null {
  return getAreaPageResolverMap(citySlug).get(urlSlug) ?? null;
}

export function isCityServiceSlug(slug: string, citySlug?: string): boolean {
  return SEO_SERVICES.some((s) => s.slug === slug) && !resolveAreaPageSlug(slug, citySlug)?.phraseSlug;
}

/** Total programmatic area×page-slug URLs for one city. */
export function countAreaPagesPerCity(areaCount: number, citySlug?: string): number {
  return areaCount * getAllAreaPageUrlSlugs(citySlug).length;
}

export function countCityServicePages(): number {
  return SEO_SERVICES.length;
}

export function getSlugCountStats(citySlug?: string): {
  urlSlugsPerArea: number;
  areaPageServices: number;
} {
  return {
    urlSlugsPerArea: getAllAreaPageUrlSlugs(citySlug).length,
    areaPageServices: AREA_PAGE_SERVICES.length,
  };
}
