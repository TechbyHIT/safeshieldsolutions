export type AreaPriorityTier = 1 | 2 | 3;

export interface CityArea {
  slug: string;
  name: string;
  zone: string;
  sortOrder: number;
  priorityTier: AreaPriorityTier;
}

export interface CityConfig {
  slug: string;
  name: string;
  state: string;
  description: string;
  sortOrder: number;
}

export const CITIES: CityConfig[] = [
  {
    slug: "chhattisgarh",
    name: "Chhattisgarh",
    state: "Chhattisgarh",
    description:
      "Professional invisible grills, safety nets, cloth hangers, and bird control across Chhattisgarh — Raipur first, then Bhilai, Durg, Bilaspur, Korba, and every listed district town.",
    sortOrder: 1,
  },
];

export function getCityConfig(slug: string): CityConfig | undefined {
  return CITIES.find((c) => c.slug === slug);
}

export function getCitiesByPriority(): CityConfig[] {
  return [...CITIES].sort((a, b) => a.sortOrder - b.sortOrder);
}
