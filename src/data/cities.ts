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
    slug: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    description:
      "Professional invisible grills, safety nets, cloth hangers, and bird control across every Chennai locality.",
    sortOrder: 1,
  },
  {
    slug: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    description:
      "Professional invisible grills, safety nets, cloth hangers, and bird control across Hyderabad and Secunderabad.",
    sortOrder: 2,
  },
  {
    slug: "coimbatore",
    name: "Coimbatore",
    state: "Tamil Nadu",
    description:
      "Professional invisible grills, safety nets, cloth hangers, and bird control across every Coimbatore locality.",
    sortOrder: 3,
  },
  {
    slug: "kochi",
    name: "Kochi",
    state: "Kerala",
    description:
      "Professional invisible grills, safety nets, cloth hangers, and bird control across Kochi and Ernakulam.",
    sortOrder: 4,
  },
];

export function getCityConfig(slug: string): CityConfig | undefined {
  return CITIES.find((c) => c.slug === slug);
}
