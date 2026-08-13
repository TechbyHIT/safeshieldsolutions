import type { CityArea } from "@/data/cities";
import { CHENNAI_AREAS, getChennaiAreaBySlug } from "@/data/chennai-areas";
import { COIMBATORE_AREAS, getCoimbatoreAreaBySlug } from "@/data/coimbatore-areas";
import { HYDERABAD_AREAS, getHyderabadAreaBySlug } from "@/data/hyderabad-areas";
import { KOCHI_AREAS, getKochiAreaBySlug } from "@/data/kochi-areas";

export function getAreasForCity(citySlug: string): CityArea[] {
  if (citySlug === "chennai") return CHENNAI_AREAS;
  if (citySlug === "hyderabad") return HYDERABAD_AREAS;
  if (citySlug === "coimbatore") return COIMBATORE_AREAS;
  if (citySlug === "kochi") return KOCHI_AREAS;
  return [];
}

export function getAreaByCitySlugs(
  citySlug: string,
  areaSlug: string,
): CityArea | undefined {
  if (citySlug === "chennai") return getChennaiAreaBySlug(areaSlug);
  if (citySlug === "hyderabad") return getHyderabadAreaBySlug(areaSlug);
  if (citySlug === "coimbatore") return getCoimbatoreAreaBySlug(areaSlug);
  if (citySlug === "kochi") return getKochiAreaBySlug(areaSlug);
  return undefined;
}

export function getTotalAreaCount(): number {
  return (
    CHENNAI_AREAS.length +
    HYDERABAD_AREAS.length +
    COIMBATORE_AREAS.length +
    KOCHI_AREAS.length
  );
}

export { CHENNAI_AREAS, CHENNAI_AREA_COUNT } from "@/data/chennai-areas";
export { HYDERABAD_AREAS, HYDERABAD_AREA_COUNT } from "@/data/hyderabad-areas";
export { COIMBATORE_AREAS, COIMBATORE_AREA_COUNT } from "@/data/coimbatore-areas";
export { KOCHI_AREAS, KOCHI_AREA_COUNT } from "@/data/kochi-areas";
