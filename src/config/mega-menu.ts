import { routes } from "./routes";

export interface MegaMenuLink {
  label: string;
  href: string;
}

export interface ServiceMegaCategory {
  title: string;
  links: MegaMenuLink[];
}

export const serviceMegaMenu: ServiceMegaCategory[] = [
  {
    title: "Invisible Grills",
    links: [
      { label: "Invisible Grills", href: routes.service("invisible-grills") },
      { label: "Balcony Invisible Grills", href: routes.service("balcony-invisible-grills") },
      { label: "Window Invisible Grills", href: routes.service("window-invisible-grills") },
      { label: "SS304 & SS316 Invisible Grills", href: routes.service("stainless-steel-invisible-grills") },
      { label: "Child Safety Grills", href: routes.service("child-safety-grills") },
      { label: "Pet Safety Grills", href: routes.service("pet-safety-grills") },
    ],
  },
  {
    title: "Safety Nets",
    links: [
      { label: "Safety Nets", href: routes.service("safety-nets") },
      { label: "Balcony Safety Nets", href: routes.service("safety-nets") },
      { label: "Terrace Safety Nets", href: routes.service("terrace-safety-nets") },
      { label: "Child Safety Nets", href: routes.service("child-safety-nets") },
      { label: "Pet Safety Nets", href: routes.service("pet-safety-nets") },
      { label: "Construction Safety Nets", href: routes.service("construction-safety-nets") },
    ],
  },
  {
    title: "Balcony Nets",
    links: [
      { label: "Balcony Safety Nets", href: routes.service("safety-nets") },
      { label: "Balcony Pigeon Nets", href: routes.service("pigeon-safety-nets") },
      { label: "Balcony Bird Nets", href: routes.service("bird-protection-nets") },
      { label: "High-Rise Balcony Nets", href: routes.service("safety-nets") },
      { label: "Transparent Balcony Nets", href: routes.service("safety-nets") },
    ],
  },
  {
    title: "Bird Nets",
    links: [
      { label: "Bird Protection Nets", href: routes.service("bird-protection-nets") },
      { label: "Anti Bird Nets", href: routes.service("pigeon-safety-nets") },
      { label: "Duct Area Bird Nets", href: routes.service("pigeon-safety-nets") },
      { label: "Building Bird Nets", href: routes.service("bird-protection-nets") },
    ],
  },
  {
    title: "Pigeon Nets",
    links: [
      { label: "Pigeon Safety Nets", href: routes.service("pigeon-safety-nets") },
      { label: "Pigeon Protection Nets", href: routes.service("pigeon-safety-nets") },
      { label: "Balcony Pigeon Nets", href: routes.service("pigeon-safety-nets") },
      { label: "Anti Pigeon Nets", href: routes.service("pigeon-safety-nets") },
    ],
  },
  {
    title: "Sports Nets",
    links: [
      { label: "Sports Nets", href: routes.service("sports-nets") },
      { label: "Cricket Practice Nets", href: routes.service("cricket-nets") },
      { label: "Cricket Box Grass", href: routes.service("cricket-box-grass") },
      { label: "Box Cricket Turf", href: routes.service("cricket-box-grass") },
      { label: "Football Nets", href: routes.service("sports-nets") },
    ],
  },
  {
    title: "Cloth Hangers",
    links: [
      { label: "Cloth Hangers", href: routes.service("cloth-hangers") },
      { label: "Ceiling Cloth Hangers", href: routes.service("ceiling-cloth-hangers") },
      { label: "Balcony Cloth Hangers", href: routes.service("balcony-cloth-hangers") },
      { label: "Pulley Cloth Hangers", href: routes.service("cloth-hangers") },
      { label: "SS304 Cloth Hangers", href: routes.service("cloth-hangers") },
    ],
  },
  {
    title: "Bird Spikes",
    links: [
      { label: "Bird Spikes", href: routes.service("bird-spikes") },
      { label: "Zip Screens", href: routes.service("zip-screens") },
      { label: "Motorized Zip Screens", href: routes.service("motorized-zip-screens") },
      { label: "Mesh Doors", href: routes.service("mesh-doors") },
      { label: "Sliding Mesh Doors", href: routes.service("sliding-mesh-doors") },
    ],
  },
];

export interface CityAreaHighlight {
  citySlug: string;
  cityName: string;
  areas: MegaMenuLink[];
}

/** Top areas for the Areas menu. Raipur leads; other Chhattisgarh towns follow. */
export const cityAreaHighlights: CityAreaHighlight[] = [
  {
    citySlug: "chhattisgarh",
    cityName: "Chhattisgarh",
    areas: [
      { label: "Raipur", href: routes.areaService("chhattisgarh", "raipur", "invisible-grills") },
      { label: "Naya Raipur", href: routes.areaService("chhattisgarh", "naya-raipur", "invisible-grills") },
      { label: "Shankar Nagar", href: routes.areaService("chhattisgarh", "shankar-nagar", "invisible-grills") },
      { label: "Bhilai", href: routes.areaService("chhattisgarh", "bhilai", "invisible-grills") },
      { label: "Durg", href: routes.areaService("chhattisgarh", "durg", "invisible-grills") },
      { label: "Bilaspur", href: routes.areaService("chhattisgarh", "bilaspur", "invisible-grills") },
    ],
  },
];

export const trustBadges = [
  "Certified Installation",
  "Warranty Support",
  "Premium SS304 & SS316 Materials",
  "Fast Installation",
  "Affordable Pricing",
  "Free Site Survey",
] as const;
