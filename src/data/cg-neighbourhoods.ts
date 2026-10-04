/**
 * Neighbourhood pages under a town.
 * Publish one only after it has its own description, nearby list, and FAQs.
 * An empty list means those URLs 404 instead of swapping the town name.
 */
export interface CgNeighbourhood {
  id: string;
  citySlug: string;
  name: string;
  slug: string;
  description: string;
  nearby: string[];
  status: "published" | "draft";
}

export const CG_NEIGHBOURHOODS: CgNeighbourhood[] = [];

export function getPublishedNeighbourhood(citySlug: string, areaSlug: string) {
  return CG_NEIGHBOURHOODS.find(
    (area) => area.status === "published" && area.citySlug === citySlug && area.slug === areaSlug,
  );
}
