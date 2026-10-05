/**
 * Authoritative list of Chhattisgarh URLs that may be indexed.
 * Intent copies, unserved towns, and locations-hub duplicates stay out.
 */
import { AREA_PAGE_SERVICES } from "@/data/seo-services";
import {
  CG_PRIORITY_PLACES,
  PRICING_PAGES,
  isCgPriorityPlace,
} from "@/data/cg-local-seo";
import {
  CG_DISTRICTS,
  CG_LOCALITIES,
  LOCALITY_SERVICE_SLUGS,
  getDistrict,
  getIndexableLocalitiesForCity,
  getLocality,
  isLocalityServiceIndexable,
} from "@/data/cg-hierarchy";
import { getChhattisgarhZoneId } from "@/config/chhattisgarh-zones";
import { resolveAreaPageSlug } from "@/lib/area-page-slugs";

/** Product page plus a distinct local “near me” landing page. Nothing else. */
export const INDEXABLE_INTENT_LABELS = new Set(["general", "near me"]);

const PRICING_BY_SERVICE = new Map<string, string>(
  PRICING_PAGES.map((page) => [page.serviceSlug, `/pricing/${page.slug}`]),
);

const ZONE_PARENT_CITY: Record<string, string> = {
  "raipur-belt": "raipur",
  "durg-bhilai": "bhilai",
  "bilaspur-belt": "bilaspur",
  "north-chhattisgarh": "korba",
  "bastar-south": "jagdalpur",
  "kawardha-west": "kawardha",
};

const PRICE_INTENTS = new Set(["price", "cost", "rates", "charges"]);

export function isIndexableIntentLabel(label: string): boolean {
  return INDEXABLE_INTENT_LABELS.has(label);
}

/** Raipur gets the full marketed catalogue. Other served towns get the core cluster. */
export function cityServiceSlugsForPlace(placeSlug: string): string[] {
  const minPriority = placeSlug === "raipur" ? 50 : 65;
  return AREA_PAGE_SERVICES.filter((service) => service.priority >= minPriority).map(
    (service) => service.slug,
  );
}

export function isCityServiceIndexable(placeSlug: string, serviceSlug: string): boolean {
  return isCgPriorityPlace(placeSlug) && cityServiceSlugsForPlace(placeSlug).includes(serviceSlug);
}

export function parentCityForArea(areaSlug: string): string {
  if (isCgPriorityPlace(areaSlug)) return areaSlug;
  const locality = CG_LOCALITIES.find((item) => item.slug === areaSlug);
  if (locality && isCgPriorityPlace(locality.citySlug)) return locality.citySlug;
  return ZONE_PARENT_CITY[getChhattisgarhZoneId(areaSlug)] ?? "raipur";
}

export function nearMeSlug(serviceSlug: string): string {
  return `${serviceSlug}-near-me`;
}

export function stripNearMe(urlSlug: string): string {
  return urlSlug.endsWith("-near-me") ? urlSlug.slice(0, -"-near-me".length) : urlSlug;
}

export function pricingPathForService(serviceSlug: string): string | null {
  return PRICING_BY_SERVICE.get(serviceSlug) ?? null;
}

export function canonicalForIntent(serviceSlug: string, intentLabel: string, placeSlug?: string): string {
  const label = intentLabel.toLowerCase();
  if (label === "nearby" || label === "near me") {
    if (placeSlug) return `/chhattisgarh/${placeSlug}/${nearMeSlug(serviceSlug)}`;
    return `/chhattisgarh/${serviceSlug}`;
  }
  if (PRICE_INTENTS.has(label)) {
    const pricing = pricingPathForService(serviceSlug);
    if (pricing) return pricing;
  }
  return placeSlug ? `/chhattisgarh/${placeSlug}/${serviceSlug}` : `/chhattisgarh/${serviceSlug}`;
}

export interface IndexableUrlRecord {
  path: string;
  kind:
    | "state"
    | "district"
    | "city"
    | "city-service"
    | "city-service-near-me"
    | "locality"
    | "locality-service";
}

/** Every Chhattisgarh URL that should return 200, self-canonical, indexable. */
export function listIndexableLocalPaths(): IndexableUrlRecord[] {
  const records: IndexableUrlRecord[] = [{ path: "/chhattisgarh", kind: "state" }];

  for (const district of CG_DISTRICTS) {
    records.push({ path: `/chhattisgarh/districts/${district.slug}`, kind: "district" });
  }

  for (const place of CG_PRIORITY_PLACES) {
    records.push({ path: `/chhattisgarh/${place.slug}`, kind: "city" });
    for (const serviceSlug of cityServiceSlugsForPlace(place.slug)) {
      records.push({
        path: `/chhattisgarh/${place.slug}/${serviceSlug}`,
        kind: "city-service",
      });
      records.push({
        path: `/chhattisgarh/${place.slug}/${nearMeSlug(serviceSlug)}`,
        kind: "city-service-near-me",
      });
    }
    for (const locality of getIndexableLocalitiesForCity(place.slug)) {
      records.push({
        path: `/chhattisgarh/${place.slug}/areas/${locality.slug}`,
        kind: "locality",
      });
      for (const serviceSlug of LOCALITY_SERVICE_SLUGS) {
        if (!isLocalityServiceIndexable(place.slug, locality.slug, serviceSlug)) continue;
        records.push({
          path: `/chhattisgarh/${place.slug}/areas/${locality.slug}/${serviceSlug}`,
          kind: "locality-service",
        });
      }
    }
  }

  return records;
}

export function resolveCgPageSlug(urlSlug: string) {
  return resolveAreaPageSlug(urlSlug, "chhattisgarh");
}

export function isKnownDistrict(slug: string): boolean {
  return Boolean(getDistrict(slug));
}

export function localityOrUndefined(citySlug: string, areaSlug: string) {
  return getLocality(citySlug, areaSlug);
}
