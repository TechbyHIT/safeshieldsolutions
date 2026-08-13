/** Zone metadata for Chennai locality-specific SEO copy. */

import type { AreaZone } from "@/config/area-zones";

export const CHENNAI_ZONES: Record<string, AreaZone> = {
  "omr-corridor": {
    id: "omr-corridor",
    label: "OMR & IT Corridor Chennai",
    description:
      "Old Mahabalipuram Road and IT corridors host high-rise apartments, tech parks, and gated communities with strong demand for invisible grills and safety nets across Chennai.",
    landmarks: ["Sholinganallur", "Thoraipakkam", "Siruseri", "Navalur"],
    propertyTypes: ["IT corridor apartments", "gated townships", "villa projects"],
  },
  "ecr-coast": {
    id: "ecr-coast",
    label: "ECR & East Coast Chennai",
    description:
      "East Coast Road localities combine sea exposure, premium villas, and apartment towers where corrosion-resistant SS304 grills and UV nets perform best in Chennai weather.",
    landmarks: ["ECR Neelankarai", "Injambakkam", "Akkarai", "Uthandi"],
    propertyTypes: ["beach-facing villas", "ECR apartments", "resort-style homes"],
  },
  "south-chennai": {
    id: "south-chennai",
    label: "South Chennai",
    description:
      "South Chennai covers Adyar, Velachery, Besant Nagar, and adjacent residential belts with apartment-heavy stock and society-managed facade rules.",
    landmarks: ["Adyar", "Velachery", "Besant Nagar", "Taramani"],
    propertyTypes: ["premium apartments", "independent houses", "institutional campuses"],
  },
  "central-chennai": {
    id: "central-chennai",
    label: "Central Chennai",
    description:
      "Central Chennai includes T. Nagar, Nungambakkam, Mylapore, and commercial-residential hubs with mixed building ages and custom fixing requirements.",
    landmarks: ["T. Nagar", "Nungambakkam", "Mylapore", "Egmore"],
    propertyTypes: ["retail-front shops", "mid-rise apartments", "heritage streets"],
  },
  "west-chennai": {
    id: "west-chennai",
    label: "West Chennai",
    description:
      "West Chennai spans Porur, Valasaravakkam, Virugambakkam, and Porur–Ambattur industrial adjacency with fast-growing apartment inventory.",
    landmarks: ["Porur", "Valasaravakkam", "Virugambakkam", "Mugalivakkam"],
    propertyTypes: ["apartment complexes", "builder floors", "villa layouts"],
  },
  "north-chennai": {
    id: "north-chennai",
    label: "North Chennai",
    description:
      "North Chennai includes Ambattur, Avadi, Mogappair, and industrial-adjacent colonies where safety nets and bird control are common upgrades.",
    landmarks: ["Ambattur", "Avadi", "Mogappair", "Korattur"],
    propertyTypes: ["colony houses", "industrial-adjacent flats", "township blocks"],
  },
  "south-suburbs": {
    id: "south-suburbs",
    label: "South Chennai Suburbs",
    description:
      "Tambaram, Chromepet, Pallavaram, and Chengalpattu belt localities mix railway-town apartments with new villa and township development south of Chennai city.",
    landmarks: ["Tambaram", "Chromepet", "Pallavaram", "Chengalpattu"],
    propertyTypes: ["railway colony flats", "suburban villas", "new townships"],
  },
  "north-suburbs": {
    id: "north-suburbs",
    label: "North Chennai Suburbs",
    description:
      "Northern suburbs toward Red Hills, Minjur, and Ponneri include plotted developments and warehouse-adjacent homes needing span-planned nets and grills.",
    landmarks: ["Red Hills", "Minjur", "Ponneri", "Ennore"],
    propertyTypes: ["plotted layouts", "warehouse-adjacent homes", "village extensions"],
  },
};

const CHENNAI_ZONE_SLUG_MAP: Record<string, string> = {
  adyar: "south-chennai",
  velachery: "south-chennai",
  "besant-nagar": "south-chennai",
  taramani: "south-chennai",
  guindy: "south-chennai",
  saidapet: "south-chennai",
  "t-nagar": "central-chennai",
  nungambakkam: "central-chennai",
  mylapore: "central-chennai",
  egmore: "central-chennai",
  chetpet: "central-chennai",
  kilpauk: "central-chennai",
  porur: "west-chennai",
  valasaravakkam: "west-chennai",
  virugambakkam: "west-chennai",
  mugalivakkam: "west-chennai",
  ambattur: "north-chennai",
  avadi: "north-chennai",
  mogappair: "north-chennai",
  korattur: "north-chennai",
  sholinganallur: "omr-corridor",
  thoraipakkam: "omr-corridor",
  "old-mahabalipuram-road": "omr-corridor",
  omr: "omr-corridor",
  navalur: "omr-corridor",
  siruseri: "omr-corridor",
  perungudi: "omr-corridor",
  injambakkam: "ecr-coast",
  neelankarai: "ecr-coast",
  akkarai: "ecr-coast",
  palavakkam: "ecr-coast",
  tambaram: "south-suburbs",
  chromepet: "south-suburbs",
  pallavaram: "south-suburbs",
  chengalpattu: "south-suburbs",
  guduvancheri: "south-suburbs",
  "red-hills": "north-suburbs",
  minjur: "north-suburbs",
  ponneri: "north-suburbs",
  ennore: "north-suburbs",
};

export function getChennaiZoneId(areaSlug: string): string {
  if (CHENNAI_ZONE_SLUG_MAP[areaSlug]) return CHENNAI_ZONE_SLUG_MAP[areaSlug]!;
  const slug = areaSlug.toLowerCase();
  if (slug.includes("omr") || slug.includes("thoraipakkam") || slug.includes("sholinganallur")) {
    return "omr-corridor";
  }
  if (slug.includes("ecr") || slug.includes("injambakkam") || slug.includes("neelankarai")) {
    return "ecr-coast";
  }
  if (slug.includes("tambaram") || slug.includes("chromepet") || slug.includes("pallavaram")) {
    return "south-suburbs";
  }
  if (slug.includes("ambattur") || slug.includes("avadi") || slug.includes("mogappair")) {
    return "north-chennai";
  }
  if (slug.includes("porur") || slug.includes("valasaravakkam") || slug.includes("virugambakkam")) {
    return "west-chennai";
  }
  return "central-chennai";
}

export function getChennaiZone(areaSlug: string): AreaZone {
  const zoneId = getChennaiZoneId(areaSlug);
  return CHENNAI_ZONES[zoneId] ?? CHENNAI_ZONES["central-chennai"]!;
}
