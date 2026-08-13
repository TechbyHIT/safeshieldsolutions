import { routes } from "./routes";

export interface HomeServiceLink {
  slug: string;
  name: string;
}

export interface HomeAreaLink {
  slug: string;
  name: string;
}

export interface HomeIntentLink {
  suffix: string;
  label: string;
  keyword: string;
}

/** High-intent suffixes for homepage internal linking */
export const HOME_SEARCH_INTENTS: HomeIntentLink[] = [
  { suffix: "", label: "General", keyword: "near me" },
  { suffix: "-near-me", label: "Near Me", keyword: "near me" },
  { suffix: "-installation", label: "Installation", keyword: "installation" },
  { suffix: "-price", label: "Price", keyword: "price" },
  { suffix: "-dealers", label: "Dealers", keyword: "dealers" },
  { suffix: "-best", label: "Best", keyword: "best" },
  { suffix: "-premium", label: "Premium", keyword: "premium" },
  { suffix: "-affordable", label: "Affordable", keyword: "affordable" },
  { suffix: "-contractors", label: "Contractors", keyword: "contractors" },
  { suffix: "-company", label: "Company", keyword: "company" },
];

export const HOME_TOP_SERVICES: HomeServiceLink[] = [
  { slug: "invisible-grills", name: "Invisible Grills" },
  { slug: "safety-nets", name: "Safety Nets" },
  { slug: "pigeon-safety-nets", name: "Pigeon Safety Nets" },
  { slug: "balcony-invisible-grills", name: "Balcony Invisible Grills" },
  { slug: "child-safety-grills", name: "Child Safety Grills" },
  { slug: "mosquito-nets", name: "Mosquito Nets" },
  { slug: "cloth-hangers", name: "Cloth Hangers" },
  { slug: "bird-spikes", name: "Bird Spikes" },
  { slug: "terrace-safety-nets", name: "Terrace Safety Nets" },
  { slug: "cricket-nets", name: "Cricket Nets" },
  { slug: "bird-protection-nets", name: "Bird Protection Nets" },
  { slug: "window-invisible-grills", name: "Window Invisible Grills" },
  { slug: "cricket-box-grass", name: "Cricket Box Grass" },
  { slug: "zip-screens", name: "Zip Screens" },
  { slug: "motorized-zip-screens", name: "Motorized Zip Screens" },
  { slug: "mesh-doors", name: "Mesh Doors" },
  { slug: "sliding-mesh-doors", name: "Sliding Mesh Doors" },
];

export const HOME_CITIES = [
  { slug: "chennai", name: "Chennai" },
  { slug: "hyderabad", name: "Hyderabad" },
  { slug: "coimbatore", name: "Coimbatore" },
  { slug: "kochi", name: "Kochi" },
] as const;

/** Featured localities per city — deep-linked on homepage for crawl + near-me SEO */
export const HOME_CITY_AREAS: Record<string, HomeAreaLink[]> = {
  chennai: [
    { slug: "adyar", name: "Adyar" },
    { slug: "velachery", name: "Velachery" },
    { slug: "anna-nagar", name: "Anna Nagar" },
    { slug: "t-nagar", name: "T. Nagar" },
    { slug: "omr", name: "OMR" },
    { slug: "tambaram", name: "Tambaram" },
    { slug: "porur", name: "Porur" },
    { slug: "chromepet", name: "Chromepet" },
    { slug: "mylapore", name: "Mylapore" },
    { slug: "nungambakkam", name: "Nungambakkam" },
    { slug: "sholinganallur", name: "Sholinganallur" },
    { slug: "medavakkam", name: "Medavakkam" },
    { slug: "pallavaram", name: "Pallavaram" },
    { slug: "guindy", name: "Guindy" },
    { slug: "east-coast-road", name: "East Coast Road" },
    { slug: "avadi", name: "Avadi" },
    { slug: "ambattur", name: "Ambattur" },
    { slug: "perungudi", name: "Perungudi" },
    { slug: "kilpauk", name: "Kilpauk" },
    { slug: "royapettah", name: "Royapettah" },
  ],
  hyderabad: [
    { slug: "gachibowli", name: "Gachibowli" },
    { slug: "kukatpally", name: "Kukatpally" },
    { slug: "madhapur", name: "Madhapur" },
    { slug: "banjara-hills", name: "Banjara Hills" },
    { slug: "secunderabad", name: "Secunderabad" },
    { slug: "miyapur", name: "Miyapur" },
    { slug: "hitech-city", name: "HITEC City" },
    { slug: "kondapur", name: "Kondapur" },
    { slug: "manikonda", name: "Manikonda" },
    { slug: "lb-nagar", name: "LB Nagar" },
    { slug: "uppal", name: "Uppal" },
    { slug: "financial-district", name: "Financial District" },
    { slug: "jubilee-hills", name: "Jubilee Hills" },
    { slug: "dilsukhnagar", name: "Dilsukhnagar" },
    { slug: "kompally", name: "Kompally" },
    { slug: "nizampet", name: "Nizampet" },
    { slug: "bachupally", name: "Bachupally" },
    { slug: "tellapur", name: "Tellapur" },
    { slug: "kokapet", name: "Kokapet" },
    { slug: "nallagandla", name: "Nallagandla" },
  ],
  coimbatore: [
    { slug: "gandhipuram", name: "Gandhipuram" },
    { slug: "peelamedu", name: "Peelamedu" },
    { slug: "saibaba-colony", name: "Saibaba Colony" },
    { slug: "rs-puram", name: "R.S. Puram" },
    { slug: "singanallur", name: "Singanallur" },
    { slug: "saravanampatti", name: "Saravanampatti" },
    { slug: "race-course", name: "Race Course" },
    { slug: "vadavalli", name: "Vadavalli" },
    { slug: "ukkadam", name: "Ukkadam" },
    { slug: "podanur", name: "Podanur" },
    { slug: "kuniyamuthur", name: "Kuniyamuthur" },
    { slug: "thudiyalur", name: "Thudiyalur" },
    { slug: "vilankurichi", name: "Vilankurichi" },
    { slug: "kalapatti", name: "Kalapatti" },
    { slug: "neelambur", name: "Neelambur" },
    { slug: "avinashi-road", name: "Avinashi Road" },
    { slug: "mettupalayam", name: "Mettupalayam" },
    { slug: "pollachi", name: "Pollachi" },
    { slug: "perur", name: "Perur" },
  ],
  kochi: [
    { slug: "kakkanad", name: "Kakkanad" },
    { slug: "edappally", name: "Edappally" },
    { slug: "aluva", name: "Aluva" },
    { slug: "vyttila", name: "Vyttila" },
    { slug: "fort-kochi", name: "Fort Kochi" },
    { slug: "palarivattom", name: "Palarivattom" },
    { slug: "kaloor", name: "Kaloor" },
    { slug: "kadavanthra", name: "Kadavanthra" },
    { slug: "maradu", name: "Maradu" },
    { slug: "tripunithura", name: "Tripunithura" },
    { slug: "infopark-phase-1", name: "Infopark Phase 1" },
    { slug: "thrikkakara", name: "Thrikkakara" },
    { slug: "kalamassery", name: "Kalamassery" },
    { slug: "angamaly", name: "Angamaly" },
    { slug: "panampilly-nagar", name: "Panampilly Nagar" },
    { slug: "thevara", name: "Thevara" },
    { slug: "mattancherry", name: "Mattancherry" },
    { slug: "palluruthy", name: "Palluruthy" },
    { slug: "kumbalangi", name: "Kumbalangi" },
    { slug: "perumbavoor", name: "Perumbavoor" },
  ],
};

export interface KeywordLinkItem {
  href: string;
  label: string;
  citySlug: string;
  areaSlug?: string;
  serviceSlug: string;
}

export function buildAreaKeywordLinks(
  citySlug: string,
  areas: HomeAreaLink[],
  services: HomeServiceLink[],
  intents: HomeIntentLink[],
): KeywordLinkItem[] {
  const links: KeywordLinkItem[] = [];
  for (const area of areas) {
    for (const service of services) {
      for (const intent of intents) {
        const pageSlug = `${service.slug}${intent.suffix}`;
        links.push({
          href: routes.areaService(citySlug, area.slug, pageSlug),
          label: `${intent.label === "General" ? "Premium" : intent.label} ${service.name} in ${area.name}`,
          citySlug,
          areaSlug: area.slug,
          serviceSlug: service.slug,
        });
      }
    }
  }
  return links;
}

export function buildCityKeywordLinks(
  citySlug: string,
  cityName: string,
  services: HomeServiceLink[],
  intents: HomeIntentLink[],
): KeywordLinkItem[] {
  return services.flatMap((service) =>
    intents.map((intent) => {
      const pageSlug = `${service.slug}${intent.suffix}`;
      return {
        href: routes.cityService(citySlug, pageSlug),
        label: `${intent.label === "General" ? "Best" : intent.label} ${service.name} in ${cityName}`,
        citySlug,
        serviceSlug: service.slug,
      };
    }),
  );
}

/** Primary near-me intents shown first in UI */
export const HOME_PRIMARY_INTENTS = HOME_SEARCH_INTENTS.filter((i) =>
  ["", "-near-me", "-installation", "-price", "-dealers", "-best", "-premium"].includes(i.suffix),
);

export const homeSeoParagraphs = [
  {
    id: "near-me",
    heading: "Premium invisible grills & safety nets near me — Chennai, Hyderabad, Coimbatore & Kochi",
    body: `Searching "invisible grills near me", "safety nets near me", or "pigeon nets near me" should lead to a local team that surveys your opening, specifies SS304 or UV-stable materials, and installs with warranty — not a generic dealer list. SafeShield Solutions publishes dedicated pages for 1,991 neighbourhoods across four cities, each with 20,000+ words covering installation, price, dealers, contractors, and premium options. Whether you are in Peelamedu IT corridor, Kakkanad Infopark, Gachibowli high-rises, or Adyar sea-facing flats, the same quality standard applies: measured scope, itemised quotes, and society-friendly finishes.`,
  },
  {
    id: "premium",
    heading: "Best premium SS304 invisible grills & bird nets — local installers, not middlemen",
    body: `Premium searches — "best invisible grill company near me", "premium pigeon net installation", "top safety net dealers" — deserve transparent comparison. Our city and locality pages explain cable spacing, knotless net GSM, anchor types, harness compliance for high-rises, and what warranty registration includes. Coimbatore textile-belt humidity, Kochi coastal salt air, Chennai monsoon exposure, and Hyderabad dust each affect material choice; every area page references zone-specific guidance so you rank and choose with confidence.`,
  },
  {
    id: "scale",
    heading: "700,000+ local SEO pages — every locality, high-intent variants",
    body: `Each neighbourhood links to 2,996 URL variants per area: core services plus installation, price, dealers, near-me, best, premium, affordable, contractors, and company intent suffixes. That scale supports long-tail rankings for hyper-local queries while keeping content substantive — not thin doorway pages. Browse city hubs at our locations index, search 600+ Coimbatore or 500+ Kochi localities, or jump from the homepage keyword sections below.`,
  },
];

export const homeKeywordTags = [
  "invisible grills near me",
  "safety nets near me",
  "pigeon nets near me",
  "balcony safety nets near me",
  "premium invisible grills",
  "best safety net company",
  "SS304 invisible grill installation",
  "bird spikes near me",
  "mosquito nets near me",
  "cloth hangers near me",
  "cricket nets near me",
  "invisible grill price",
  "safety net dealers",
  "pigeon net installation",
  "child safety grills near me",
  "terrace safety nets",
  "bird protection nets",
  "window invisible grills",
  "affordable safety nets",
  "free site survey",
  "cricket box grass near me",
  "zip screens near me",
  "motorized zip screens near me",
  "mesh doors near me",
  "sliding mesh doors near me",
  "box cricket turf installation",
  "balcony zip screens price",
] as const;
