import type { CityArea } from "@/data/cities";
import { CHHATTISGARH_AREAS, getChhattisgarhAreaBySlug } from "@/data/chhattisgarh-areas";
import { raipurListingRank } from "@/config/chhattisgarh-zones";

/** Raipur city and Raipur localities first, then the rest of Chhattisgarh. */
export function getAreasForCity(citySlug: string): CityArea[] {
  if (citySlug !== "chhattisgarh") return [];
  return [...CHHATTISGARH_AREAS].sort((a, b) => {
    const rank = raipurListingRank(a.slug) - raipurListingRank(b.slug);
    return rank !== 0 ? rank : a.sortOrder - b.sortOrder;
  });
}

export function getAreaByCitySlugs(
  citySlug: string,
  areaSlug: string,
): CityArea | undefined {
  if (citySlug !== "chhattisgarh") return undefined;
  return getChhattisgarhAreaBySlug(areaSlug);
}

export function getTotalAreaCount(): number {
  return CHHATTISGARH_AREAS.length;
}

export { CHHATTISGARH_AREAS, CHHATTISGARH_AREA_COUNT } from "@/data/chhattisgarh-areas";
