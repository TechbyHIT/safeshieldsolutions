/** Zone metadata for Coimbatore locality-specific SEO copy. */

import type { AreaZone } from "@/config/area-zones";

export const COIMBATORE_ZONES: Record<string, AreaZone> = {
  "coimbatore-central": {
    id: "coimbatore-central",
    label: "Central Coimbatore",
    description:
      "Central Coimbatore covers Gandhipuram, R.S. Puram, Race Course, and the commercial-residential core where apartments, retail fronts, and heritage streets need custom invisible grills and safety nets.",
    landmarks: ["Gandhipuram", "R.S. Puram", "Race Course", "Town Hall"],
    propertyTypes: ["retail-front shops", "mid-rise apartments", "heritage streets"],
  },
  "peelamedu-it": {
    id: "peelamedu-it",
    label: "Peelamedu & Avinashi Road IT Belt",
    description:
      "Peelamedu and Avinashi Road host colleges, IT parks, and apartment towers along the airport corridor with strong demand for balcony safety and bird control across Coimbatore.",
    landmarks: ["Peelamedu", "Avinashi Road", "HUDCO Colony", "Lakshmi Mills"],
    propertyTypes: ["IT corridor apartments", "student housing", "gated communities"],
  },
  "saibaba-colony": {
    id: "saibaba-colony",
    label: "Saibaba Colony & West Coimbatore",
    description:
      "Saibaba Colony and adjacent west-side neighbourhoods combine planned residential layouts with independent houses and society-managed apartment blocks.",
    landmarks: ["Saibaba Colony", "Kavundampalayam", "Vadavalli", "Thudiyalur"],
    propertyTypes: ["colony houses", "apartment complexes", "villa layouts"],
  },
  singanallur: {
    id: "singanallur",
    label: "Singanallur & East Coimbatore",
    description:
      "Singanallur and eastern Coimbatore localities mix railway-adjacent colonies with growing apartment inventory and industrial adjacency.",
    landmarks: ["Singanallur", "Uppilipalayam", "Ondipudur", "Trichy Road"],
    propertyTypes: ["railway colony flats", "mid-rise apartments", "independent houses"],
  },
  "pollachi-belt": {
    id: "pollachi-belt",
    label: "Pollachi & South Belt",
    description:
      "Pollachi and southern belt localities include market towns, agricultural edges, and expanding residential corridors south of Coimbatore city.",
    landmarks: ["Pollachi", "Kinathukadavu", "Madukkarai", "Eachanari"],
    propertyTypes: ["town houses", "plotted layouts", "villa projects"],
  },
  "mettupalayam-belt": {
    id: "mettupalayam-belt",
    label: "Mettupalayam & North Hills Belt",
    description:
      "Mettupalayam and northern hill-adjacent localities combine railway towns, plantation edges, and residential growth toward the Nilgiri foothills.",
    landmarks: ["Mettupalayam", "Annur", "Karamadai", "Sathyamangalam Road"],
    propertyTypes: ["railway town homes", "plotted developments", "plantation-adjacent villas"],
  },
  saravanampatti: {
    id: "saravanampatti",
    label: "Saravanampatti & IT Corridor North",
    description:
      "Saravanampatti and the northern IT corridor include Keeranatham, Vilankurichi, and tech-park adjacency with high-rise apartment demand.",
    landmarks: ["Saravanampatti", "Keeranatham", "Vilankurichi", "CHIL SEZ Area"],
    propertyTypes: ["IT corridor apartments", "gated townships", "tech-park housing"],
  },
  "kurichi-industrial": {
    id: "kurichi-industrial",
    label: "Kurichi & Industrial Coimbatore",
    description:
      "Kurichi, SIDCO estates, and industrial-adjacent localities need span-planned safety nets, bird control, and corrosion-resistant fittings.",
    landmarks: ["Kurichi", "Kuniyamuthur", "Sulur", "Irugur"],
    propertyTypes: ["industrial-adjacent flats", "colony houses", "warehouse-adjacent homes"],
  },
};

const COIMBATORE_ZONE_SLUG_MAP: Record<string, string> = {
  gandhipuram: "coimbatore-central",
  "rs-puram": "coimbatore-central",
  "race-course": "coimbatore-central",
  "town-hall": "coimbatore-central",
  "coimbatore-central": "coimbatore-central",
  "coimbatore-junction-area": "coimbatore-central",
  peelamedu: "peelamedu-it",
  "avinashi-road": "peelamedu-it",
  "avinashi-road-peelamedu": "peelamedu-it",
  "avinashi-road-it-corridor": "peelamedu-it",
  "hudco-colony-peelamedu": "peelamedu-it",
  "lakshmi-mills": "peelamedu-it",
  sitra: "peelamedu-it",
  "saibaba-colony": "saibaba-colony",
  "anna-nagar-saibaba-colony": "saibaba-colony",
  vadavalli: "saibaba-colony",
  kavundampalayam: "saibaba-colony",
  thudiyalur: "saibaba-colony",
  singanallur: "singanallur",
  "singanallur-bus-stand-area": "singanallur",
  uppilipalayam: "singanallur",
  ondipudur: "singanallur",
  "trichy-road": "singanallur",
  pollachi: "pollachi-belt",
  kinathukadavu: "pollachi-belt",
  madukkarai: "pollachi-belt",
  eachanari: "pollachi-belt",
  mettupalayam: "mettupalayam-belt",
  annur: "mettupalayam-belt",
  karamadai: "mettupalayam-belt",
  saravanampatti: "saravanampatti",
  "saravanampatti-junction": "saravanampatti",
  keeranatham: "saravanampatti",
  vilankurichi: "saravanampatti",
  kalapatti: "saravanampatti",
  kurichi: "kurichi-industrial",
  kuniyamuthur: "kurichi-industrial",
  sulur: "kurichi-industrial",
  irugur: "kurichi-industrial",
};

export function getCoimbatoreZoneId(areaSlug: string): string {
  if (COIMBATORE_ZONE_SLUG_MAP[areaSlug]) return COIMBATORE_ZONE_SLUG_MAP[areaSlug]!;
  const slug = areaSlug.toLowerCase();
  if (slug.includes("peelamedu") || slug.includes("avinashi") || slug.includes("sitra")) {
    return "peelamedu-it";
  }
  if (slug.includes("saibaba") || slug.includes("vadavalli") || slug.includes("kavundampalayam")) {
    return "saibaba-colony";
  }
  if (slug.includes("singanallur") || slug.includes("ondipudur") || slug.includes("uppilipalayam")) {
    return "singanallur";
  }
  if (slug.includes("pollachi") || slug.includes("madukkarai") || slug.includes("kinathukadavu")) {
    return "pollachi-belt";
  }
  if (slug.includes("mettupalayam") || slug.includes("annur") || slug.includes("karamadai")) {
    return "mettupalayam-belt";
  }
  if (slug.includes("saravanampatti") || slug.includes("vilankurichi") || slug.includes("keeranatham")) {
    return "saravanampatti";
  }
  if (slug.includes("kurichi") || slug.includes("sulur") || slug.includes("kuniyamuthur")) {
    return "kurichi-industrial";
  }
  return "coimbatore-central";
}

export function getCoimbatoreZone(areaSlug: string): AreaZone {
  const zoneId = getCoimbatoreZoneId(areaSlug);
  return COIMBATORE_ZONES[zoneId] ?? COIMBATORE_ZONES["coimbatore-central"]!;
}
