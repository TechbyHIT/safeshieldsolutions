/** Zone metadata for locality-specific SEO copy on area pages. */

export interface AreaZone {
  id: string;
  label: string;
  description: string;
  landmarks: string[];
  propertyTypes: string[];
}

export const AREA_ZONES: Record<string, AreaZone> = {
  "west-hyderabad": {
    id: "west-hyderabad",
    label: "West Hyderabad",
    description:
      "West Hyderabad covers the IT corridor, financial district, and fast-growing residential townships with high-rise apartments and gated communities.",
    landmarks: ["Gachibowli", "Financial District", "Nanakramguda", "Kokapet"],
    propertyTypes: ["high-rise apartments", "gated communities", "villa projects"],
  },
  "north-hyderabad": {
    id: "north-hyderabad",
    label: "North Hyderabad",
    description:
      "North Hyderabad includes established residential pockets and expanding suburbs popular with families and IT commuters.",
    landmarks: ["Kompally", "Bachupally", "Alwal", "Medchal"],
    propertyTypes: ["independent houses", "mid-rise apartments", "villa layouts"],
  },
  "central-hyderabad": {
    id: "central-hyderabad",
    label: "Central Hyderabad",
    description:
      "Central Hyderabad has premium residential areas, commercial hubs, and older planned colonies with mixed apartment and villa stock.",
    landmarks: ["Banjara Hills", "Jubilee Hills", "Somajiguda", "Ameerpet"],
    propertyTypes: ["premium apartments", "independent homes", "commercial facades"],
  },
  "east-hyderabad": {
    id: "east-hyderabad",
    label: "East Hyderabad",
    description:
      "East Hyderabad spans growing residential corridors with new apartment projects, villas, and improving connectivity.",
    landmarks: ["Uppal", "LB Nagar", "Nagole", "Pocharam"],
    propertyTypes: ["apartment complexes", "builder floors", "township projects"],
  },
  "old-city": {
    id: "old-city",
    label: "Old City & Charminar Belt",
    description:
      "The Old City belt includes dense residential neighborhoods where custom measurements and careful fixing are essential.",
    landmarks: ["Charminar", "Falaknuma", "Yakutpura", "Malakpet"],
    propertyTypes: ["independent houses", "old apartments", "shop-front windows"],
  },
  secunderabad: {
    id: "secunderabad",
    label: "Secunderabad & Cantonment",
    description:
      "Secunderabad and nearby cantonment areas combine colonial-era buildings with modern apartment towers.",
    landmarks: ["Secunderabad", "Trimulgherry", "Sainikpuri", "Paradise"],
    propertyTypes: ["colony houses", "apartment towers", "institutional buildings"],
  },
  "outer-hyderabad": {
    id: "outer-hyderabad",
    label: "Outer Hyderabad & ORR Belt",
    description:
      "Outer Hyderabad localities along the ORR include new townships, villa projects, and large-format residential developments.",
    landmarks: ["Shamshabad", "Patancheru", "Shadnagar", "Chevella"],
    propertyTypes: ["villa communities", "plotted developments", "warehouse-adjacent homes"],
  },
};

const ZONE_SLUG_MAP: Record<string, string> = {
  gachibowli: "west-hyderabad",
  kondapur: "west-hyderabad",
  madhapur: "west-hyderabad",
  "hitech-city": "west-hyderabad",
  "financial-district": "west-hyderabad",
  nanakramguda: "west-hyderabad",
  kokapet: "west-hyderabad",
  manikonda: "west-hyderabad",
  nallagandla: "west-hyderabad",
  tellapur: "west-hyderabad",
  raidurg: "west-hyderabad",
  khajaguda: "west-hyderabad",
  gopanpally: "west-hyderabad",
  neopolis: "west-hyderabad",
  lingampally: "west-hyderabad",
  hafeezpet: "west-hyderabad",
  kothaguda: "west-hyderabad",
  miyapur: "west-hyderabad",
  kukatpally: "west-hyderabad",
  nizampet: "west-hyderabad",
  "kphb-colony": "west-hyderabad",
  chandanagar: "west-hyderabad",
  kompally: "north-hyderabad",
  bachupally: "north-hyderabad",
  alwal: "north-hyderabad",
  bowenpally: "north-hyderabad",
  "new-bowenpally": "north-hyderabad",
  "old-bowenpally": "north-hyderabad",
  medchal: "north-hyderabad",
  quthbullapur: "north-hyderabad",
  suchitra: "north-hyderabad",
  dundigal: "north-hyderabad",
  "as-rao-nagar": "north-hyderabad",
  "dr-as-rao-nagar": "north-hyderabad",
  ecil: "north-hyderabad",
  kapra: "north-hyderabad",
  "banjara-hills": "central-hyderabad",
  "jubilee-hills": "central-hyderabad",
  "film-nagar": "central-hyderabad",
  ameerpet: "central-hyderabad",
  somajiguda: "central-hyderabad",
  panjagutta: "central-hyderabad",
  begumpet: "central-hyderabad",
  khairatabad: "central-hyderabad",
  masabtank: "central-hyderabad",
  "masab-tank": "central-hyderabad",
  shaikpet: "central-hyderabad",
  uppal: "east-hyderabad",
  "lb-nagar": "east-hyderabad",
  nagole: "east-hyderabad",
  dilsukhnagar: "east-hyderabad",
  vanasthalipuram: "east-hyderabad",
  hayathnagar: "east-hyderabad",
  saroornagar: "east-hyderabad",
  charminar: "old-city",
  falaknuma: "old-city",
  yakutpura: "old-city",
  malakpet: "old-city",
  "old-city": "old-city",
  secunderabad: "secunderabad",
  trimulgherry: "secunderabad",
  sainikpuri: "secunderabad",
  tarnaka: "secunderabad",
  malkajgiri: "secunderabad",
  shamshabad: "outer-hyderabad",
  patancheru: "outer-hyderabad",
  shadnagar: "outer-hyderabad",
  chevella: "outer-hyderabad",
  ibrahimpatnam: "outer-hyderabad",
};

export function getAreaZoneId(areaSlug: string): string {
  return ZONE_SLUG_MAP[areaSlug] ?? "west-hyderabad";
}

import { getChennaiZone, getChennaiZoneId } from "@/config/chennai-zones";
import { getCoimbatoreZone, getCoimbatoreZoneId } from "@/config/coimbatore-zones";
import { getKochiZone, getKochiZoneId } from "@/config/kochi-zones";

export function getAreaZoneForCity(citySlug: string, areaSlug: string): AreaZone {
  if (citySlug === "chennai") return getChennaiZone(areaSlug);
  if (citySlug === "coimbatore") return getCoimbatoreZone(areaSlug);
  if (citySlug === "kochi") return getKochiZone(areaSlug);
  const zoneId = getAreaZoneId(areaSlug);
  return AREA_ZONES[zoneId] ?? AREA_ZONES["west-hyderabad"]!;
}

export function getAreaZoneIdForCity(citySlug: string, areaSlug: string): string {
  if (citySlug === "chennai") return getChennaiZoneId(areaSlug);
  if (citySlug === "coimbatore") return getCoimbatoreZoneId(areaSlug);
  if (citySlug === "kochi") return getKochiZoneId(areaSlug);
  return getAreaZoneId(areaSlug);
}

export function getAreaZone(areaSlug: string): AreaZone {
  return getAreaZoneForCity("hyderabad", areaSlug);
}
