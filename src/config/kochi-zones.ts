/** Zone metadata for Kochi locality-specific SEO copy. */

import type { AreaZone } from "@/config/area-zones";

export const KOCHI_ZONES: Record<string, AreaZone> = {
  "ernakulam-central": {
    id: "ernakulam-central",
    label: "Ernakulam Central",
    description:
      "Ernakulam Central covers MG Road, Kaloor, Kadavanthra, and the commercial-residential core where apartments, shops, and mixed-age buildings need custom safety fittings.",
    landmarks: ["MG Road Kochi", "Kaloor", "Kadavanthra", "Ernakulam Junction"],
    propertyTypes: ["premium apartments", "retail-front shops", "commercial facades"],
  },
  edappally: {
    id: "edappally",
    label: "Edappally & NH Corridor",
    description:
      "Edappally and the NH corridor combine metro-linked apartments, malls, and fast-growing residential pockets with strong balcony safety demand.",
    landmarks: ["Edappally", "Palarivattom", "Changampuzha Nagar", "BTS Road Edappally"],
    propertyTypes: ["metro-linked apartments", "gated communities", "mid-rise flats"],
  },
  "kakkanad-infopark": {
    id: "kakkanad-infopark",
    label: "Kakkanad & Infopark",
    description:
      "Kakkanad and Infopark host Kerala's largest IT hub with high-rise apartments, CSEZ campuses, and gated townships needing invisible grills and safety nets.",
    landmarks: ["Kakkanad", "Infopark Kochi", "Civil Station Kakkanad", "SmartCity Kochi"],
    propertyTypes: ["IT corridor apartments", "gated townships", "tech-park housing"],
  },
  aluva: {
    id: "aluva",
    label: "Aluva & Airport Belt",
    description:
      "Aluva and the airport belt include metro stations, railway junctions, and residential corridors popular with commuters and airport-adjacent families.",
    landmarks: ["Aluva", "Angamaly Airport Road", "Perumbavoor", "Edathala"],
    propertyTypes: ["commuter apartments", "independent houses", "airport-adjacent villas"],
  },
  "fort-kochi": {
    id: "fort-kochi",
    label: "Fort Kochi & Heritage Islands",
    description:
      "Fort Kochi, Mattancherry, and island localities combine heritage buildings, sea exposure, and premium homes where corrosion-resistant SS304 grills perform best.",
    landmarks: ["Fort Kochi", "Mattancherry", "Willingdon Island", "Vypin"],
    propertyTypes: ["heritage homes", "beach-facing villas", "resort-style apartments"],
  },
  vyttila: {
    id: "vyttila",
    label: "Vyttila & South Ernakulam",
    description:
      "Vyttila and southern Ernakulam localities include mobility hubs, Maradu apartments, and canal-side homes with mixed building ages.",
    landmarks: ["Vyttila", "Maradu", "Tripunithura", "Kundannoor"],
    propertyTypes: ["apartment complexes", "canal-side homes", "mobility-hub flats"],
  },
  angamaly: {
    id: "angamaly",
    label: "Angamaly & Northern Belt",
    description:
      "Angamaly and the northern belt toward the airport include expanding suburbs, plotted developments, and warehouse-adjacent residential growth.",
    landmarks: ["Angamaly", "Nedumbassery", "North Paravur", "Perumbavoor"],
    propertyTypes: ["plotted layouts", "suburban villas", "warehouse-adjacent homes"],
  },
};

const KOCHI_ZONE_SLUG_MAP: Record<string, string> = {
  "ernakulam-central": "ernakulam-central",
  "ernakulam-junction-railway-station-area": "ernakulam-central",
  "ernakulam-north": "ernakulam-central",
  "ernakulam-south": "ernakulam-central",
  kaloor: "ernakulam-central",
  kadavanthra: "ernakulam-central",
  "mg-road-kochi": "ernakulam-central",
  edappally: "edappally",
  "edappally-junction": "edappally",
  palarivattom: "edappally",
  kakkanad: "kakkanad-infopark",
  "infopark-kochi": "kakkanad-infopark",
  "infopark-phase-1": "kakkanad-infopark",
  "infopark-phase-2": "kakkanad-infopark",
  "smartcity-kochi": "kakkanad-infopark",
  aluva: "aluva",
  "aluva-metro-station-area": "aluva",
  edathala: "aluva",
  "fort-kochi": "fort-kochi",
  mattancherry: "fort-kochi",
  "willingdon-island": "fort-kochi",
  vypin: "fort-kochi",
  vyttila: "vyttila",
  "vyttila-junction": "vyttila",
  maradu: "vyttila",
  tripunithura: "vyttila",
  angamaly: "angamaly",
  nedumbassery: "angamaly",
  "north-paravur": "angamaly",
  perumbavoor: "angamaly",
};

export function getKochiZoneId(areaSlug: string): string {
  if (KOCHI_ZONE_SLUG_MAP[areaSlug]) return KOCHI_ZONE_SLUG_MAP[areaSlug]!;
  const slug = areaSlug.toLowerCase();
  if (slug.includes("kakkanad") || slug.includes("infopark") || slug.includes("smartcity")) {
    return "kakkanad-infopark";
  }
  if (slug.includes("edappally") || slug.includes("palarivattom")) {
    return "edappally";
  }
  if (slug.includes("aluva") || slug.includes("edathala") || slug.includes("perumbavoor")) {
    return "aluva";
  }
  if (slug.includes("fort-kochi") || slug.includes("mattancherry") || slug.includes("vypin") || slug.includes("willingdon")) {
    return "fort-kochi";
  }
  if (slug.includes("vyttila") || slug.includes("maradu") || slug.includes("tripunithura")) {
    return "vyttila";
  }
  if (slug.includes("angamaly") || slug.includes("nedumbassery") || slug.includes("paravur")) {
    return "angamaly";
  }
  if (slug.includes("ernakulam") || slug.includes("kaloor") || slug.includes("kadavanthra")) {
    return "ernakulam-central";
  }
  return "ernakulam-central";
}

export function getKochiZone(areaSlug: string): AreaZone {
  const zoneId = getKochiZoneId(areaSlug);
  return KOCHI_ZONES[zoneId] ?? KOCHI_ZONES["ernakulam-central"]!;
}
