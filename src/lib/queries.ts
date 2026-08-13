import { CITIES, getCityConfig } from "@/data/cities";
import { getAreaByCitySlugs, getAreasForCity, CHENNAI_AREA_COUNT, HYDERABAD_AREA_COUNT } from "@/data/areas";
import { SEO_SERVICES, AREA_PAGE_SERVICES, getSeoService } from "@/data/seo-services";
import { site } from "@/config/site";
import {
  getAllAreaPageUrlSlugs,
  resolveAreaPageSlug,
  countAreaPagesPerCity,
  countCityServicePages,
} from "@/lib/area-page-slugs";

export type PageType =
  | "HOME"
  | "SERVICE"
  | "CITY"
  | "AREA"
  | "CITY_SERVICE"
  | "AREA_SERVICE"
  | "GUIDE"
  | "BLOG";

export interface DataService {
  id: string;
  slug: string;
  name: string;
  shortName: string | null;
  description: string;
  category: string;
  keywords: string[];
  imageSlug: string;
  sortOrder: number;
  isActive: boolean;
}

export interface DataLocation {
  id: string;
  slug: string;
  name: string;
  type: "CITY" | "AREA";
  citySlug: string | null;
  areaSlug: string | null;
  state: string;
  description: string | null;
  sortOrder: number;
  isActive: boolean;
  children?: { slug: string; name: string }[];
}

export interface DataPage {
  path: string;
  title: string;
  pageType: PageType;
  priority: number;
  changeFreq: string;
  updatedAt: Date;
  service?: DataService | null;
  location?: DataLocation | null;
}

function mapSeoToService(seo: (typeof SEO_SERVICES)[number]): DataService {
  return {
    id: `file-${seo.slug}`,
    slug: seo.slug,
    name: seo.name,
    shortName: null,
    description: seo.description,
    category: seo.category,
    keywords: seo.searchPhrases.slice(0, 8),
    imageSlug: seo.imageSlug,
    sortOrder: seo.sortOrder,
    isActive: true,
  };
}

function mapAreaToLocation(citySlug: string, area: ReturnType<typeof getAreaByCitySlugs>): DataLocation {
  return {
    id: `file-${citySlug}-${area!.slug}`,
    slug: area!.slug,
    name: area!.name,
    type: "AREA",
    citySlug,
    areaSlug: area!.slug,
    state: getCityConfig(citySlug)?.state ?? "",
    description: null,
    sortOrder: area!.sortOrder,
    isActive: true,
  };
}

export async function getServiceBySlug(slug: string): Promise<DataService | null> {
  const seo = getSeoService(slug);
  return seo ? mapSeoToService(seo) : null;
}

export async function getActiveServices(): Promise<DataService[]> {
  return SEO_SERVICES.map(mapSeoToService);
}

export async function getCityBySlug(slug: string): Promise<DataLocation | null> {
  const city = getCityConfig(slug);
  if (!city) return null;
  const areas = getAreasForCity(slug);
  return {
    id: `file-city-${slug}`,
    slug: city.slug,
    name: city.name,
    type: "CITY",
    citySlug: null,
    areaSlug: null,
    state: city.state,
    description: city.description,
    sortOrder: city.sortOrder,
    isActive: true,
    children: areas.map((a) => ({ slug: a.slug, name: a.name })),
  };
}

export async function getAreaBySlugs(
  citySlug: string,
  areaSlug: string,
): Promise<DataLocation | null> {
  const area = getAreaByCitySlugs(citySlug, areaSlug);
  if (!area) return null;
  return mapAreaToLocation(citySlug, area);
}

export async function getActiveCities() {
  return CITIES.map((c) => ({
    slug: c.slug,
    name: c.name,
    description: c.description,
  }));
}

export async function getRelatedAreaServicePages(
  citySlug: string,
  areaSlug: string,
  excludeServiceSlug: string,
  limit = 6,
): Promise<DataPage[]> {
  return AREA_PAGE_SERVICES.filter((s) => s.slug !== excludeServiceSlug)
    .slice(0, limit)
    .map((s) => ({
      path: `/${citySlug}/${areaSlug}/${s.slug}`,
      title: `${s.name} in ${areaSlug}`,
      pageType: "AREA_SERVICE" as const,
      priority: 0.7,
      changeFreq: "weekly",
      updatedAt: new Date(),
      service: mapSeoToService(s),
    }));
}

export async function getRelatedCityServicePages(
  citySlug: string,
  excludeServiceSlug: string,
  limit = 8,
): Promise<DataPage[]> {
  return SEO_SERVICES.filter((s) => s.slug !== excludeServiceSlug)
    .slice(0, limit)
    .map((s) => ({
      path: `/${citySlug}/${s.slug}`,
      title: `${s.name} in ${citySlug}`,
      pageType: "CITY_SERVICE" as const,
      priority: 0.75,
      changeFreq: "weekly",
      updatedAt: new Date(),
      service: mapSeoToService(s),
    }));
}

function getWarmPaths(limit = site.staticParamsLimit): DataPage[] {
  const paths: DataPage[] = [];
  const pageSlugs = getAllAreaPageUrlSlugs().slice(0, 8);

  for (const city of CITIES) {
    const areas = getAreasForCity(city.slug).filter((a) => a.priorityTier === 1);
    for (const area of areas) {
      for (const pageSlug of pageSlugs) {
        const resolved = resolveAreaPageSlug(pageSlug);
        if (!resolved) continue;
        paths.push({
          path: `/${city.slug}/${area.slug}/${pageSlug}`,
          title: `${resolved.serviceSlug} in ${area.name}`,
          pageType: "AREA_SERVICE",
          priority: 0.85,
          changeFreq: "weekly",
          updatedAt: new Date(),
        });
        if (paths.length >= limit) return paths;
      }
    }

    for (const service of SEO_SERVICES.slice(0, 6)) {
      paths.push({
        path: `/${city.slug}/${service.slug}`,
        title: `${service.name} in ${city.name}`,
        pageType: "CITY_SERVICE",
        priority: 0.8,
        changeFreq: "weekly",
        updatedAt: new Date(),
      });
      if (paths.length >= limit) return paths;
    }
  }

  return paths;
}

export async function getStaticParamsForPageType(pageType: PageType): Promise<DataPage[]> {
  const warm = getWarmPaths();
  return warm.filter((p) => p.pageType === pageType);
}

export async function countPages(): Promise<number> {
  return (
    countAreaPagesPerCity(CHENNAI_AREA_COUNT) +
    countAreaPagesPerCity(HYDERABAD_AREA_COUNT) +
    countCityServicePages() * CITIES.length
  );
}

/** @deprecated File-based site — pages are always generated on demand. */
export async function getPublishedPages(): Promise<DataPage[]> {
  return getWarmPaths(site.staticParamsLimit);
}

export async function getPageByPath(path: string): Promise<DataPage | null> {
  const warm = getWarmPaths(site.staticParamsLimit);
  return warm.find((p) => p.path === path) ?? null;
}

export async function getCityServicePage(): Promise<null> {
  return null;
}

export async function getAreaServicePage(): Promise<null> {
  return null;
}
