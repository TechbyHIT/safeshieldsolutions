/** Curated pools for programmatic “entity” cards — rotated per page seed. */

export const BUILDING_TYPE_LINKS = [
  { slug: "apartments", label: "High-rise apartments" },
  { slug: "villas", label: "Independent villas" },
  { slug: "duplex", label: "Duplex & row houses" },
  { slug: "offices", label: "Office balconies & ducts" },
  { slug: "schools", label: "Schools & colleges" },
  { slug: "hospitals", label: "Hospitals & clinics" },
  { slug: "hotels", label: "Hotels & service apartments" },
  { slug: "warehouses", label: "Warehouses & factories" },
] as const;

export const APPLICATION_PHRASES = [
  "balcony safety",
  "window protection",
  "terrace containment",
  "duct & shaft sealing",
  "child fall prevention",
  "pet barrier nets",
  "pigeon & bird control",
  "monsoon-ready mesh",
  "sports practice at home",
  "invisible view-safe grills",
] as const;

export const MATERIAL_PHRASES = [
  "SS304 stainless cable",
  "SS316 coastal grade",
  "HDPE knotless nets",
  "nylon sports mesh",
  "UV-stabilised polyethylene",
  "powder-coated frames",
  "motorised zip track",
  "magnetic mesh doors",
] as const;

export const LANDMARKS_BY_CITY: Record<string, readonly string[]> = {
  chennai: [
    "OMR IT corridor",
    "Anna Nagar",
    "T Nagar retail hub",
    "Adyar riverfront",
    "Velachery junction",
    "Porur lake belt",
  ],
  hyderabad: [
    "Gachibowli Financial District",
    "HITEC City",
    "Kondapur metro corridor",
    "Banjara Hills",
    "Uppal industrial belt",
  ],
  coimbatore: [
    "Peelamedu IT park",
    "RS Puram",
    "Saibaba Colony",
    "Saravanampatti",
    "Gandhipuram",
  ],
  kochi: [
    "Infopark Kakkanad",
    "Marine Drive",
    "Edappally metro",
    "Fort Kochi heritage",
    "Vyttila hub",
  ],
};

export const IT_PARKS_BY_CITY: Record<string, readonly string[]> = {
  chennai: ["DLF IT Park", "Tidel Park", "RMZ Millenia", "International Tech Park"],
  hyderabad: ["Cyber Towers", "WaveRock", "DivyaSree Orion", "Phoenix Tech Park"],
  coimbatore: ["CHIL SEZ", "KCT Tech Park", "Peelamedu tech belt"],
  kochi: ["Infopark Phase 1", "Infopark Phase 2", "SmartCity Kochi"],
};

export const POPULAR_SEARCH_MODIFIERS = [
  "near me",
  "price",
  "installation",
  "dealers",
  "contractors",
  "best",
  "premium",
  "free survey",
  "cost",
  "same day",
] as const;
