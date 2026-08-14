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

/** Top areas per city for Areas mega-menu (links to invisible-grills in each area). */
export const cityAreaHighlights: CityAreaHighlight[] = [
  {
    citySlug: "chennai",
    cityName: "Chennai",
    areas: [
      { label: "Adyar", href: routes.areaService("chennai", "adyar", "invisible-grills") },
      { label: "Velachery", href: routes.areaService("chennai", "velachery", "invisible-grills") },
      { label: "Anna Nagar", href: routes.areaService("chennai", "anna-nagar", "invisible-grills") },
      { label: "T. Nagar", href: routes.areaService("chennai", "t-nagar", "invisible-grills") },
      { label: "OMR", href: routes.areaService("chennai", "omr", "invisible-grills") },
      { label: "Tambaram", href: routes.areaService("chennai", "tambaram", "invisible-grills") },
    ],
  },
  {
    citySlug: "hyderabad",
    cityName: "Hyderabad",
    areas: [
      { label: "Gachibowli", href: routes.areaService("hyderabad", "gachibowli", "invisible-grills") },
      { label: "Kukatpally", href: routes.areaService("hyderabad", "kukatpally", "invisible-grills") },
      { label: "Madhapur", href: routes.areaService("hyderabad", "madhapur", "invisible-grills") },
      { label: "Banjara Hills", href: routes.areaService("hyderabad", "banjara-hills", "invisible-grills") },
      { label: "Secunderabad", href: routes.areaService("hyderabad", "secunderabad", "invisible-grills") },
      { label: "Miyapur", href: routes.areaService("hyderabad", "miyapur", "invisible-grills") },
    ],
  },
  {
    citySlug: "coimbatore",
    cityName: "Coimbatore",
    areas: [
      { label: "Gandhipuram", href: routes.areaService("coimbatore", "gandhipuram", "invisible-grills") },
      { label: "Peelamedu", href: routes.areaService("coimbatore", "peelamedu", "invisible-grills") },
      { label: "Saibaba Colony", href: routes.areaService("coimbatore", "saibaba-colony", "invisible-grills") },
      { label: "RS Puram", href: routes.areaService("coimbatore", "rs-puram", "invisible-grills") },
      { label: "Singanallur", href: routes.areaService("coimbatore", "singanallur", "invisible-grills") },
      { label: "Saravanampatti", href: routes.areaService("coimbatore", "saravanampatti", "invisible-grills") },
    ],
  },
  {
    citySlug: "kochi",
    cityName: "Kochi",
    areas: [
      { label: "Kakkanad", href: routes.areaService("kochi", "kakkanad", "invisible-grills") },
      { label: "Edappally", href: routes.areaService("kochi", "edappally", "invisible-grills") },
      { label: "Aluva", href: routes.areaService("kochi", "aluva", "invisible-grills") },
      { label: "Vyttila", href: routes.areaService("kochi", "vyttila", "invisible-grills") },
      { label: "Fort Kochi", href: routes.areaService("kochi", "fort-kochi", "invisible-grills") },
      { label: "Palarivattom", href: routes.areaService("kochi", "palarivattom", "invisible-grills") },
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
