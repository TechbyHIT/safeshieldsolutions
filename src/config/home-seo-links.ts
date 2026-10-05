import { routes } from "./routes";
import { filterIndexableLinks } from "@/lib/indexable-href";

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

export const HOME_CITIES = [{ slug: "chhattisgarh", name: "Chhattisgarh" }] as const;

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
  chhattisgarh: [
    { slug: "raipur", name: "Raipur" },
    { slug: "bhilai", name: "Bhilai" },
    { slug: "durg", name: "Durg" },
    { slug: "bilaspur", name: "Bilaspur" },
    { slug: "korba", name: "Korba" },
    { slug: "rajnandgaon", name: "Rajnandgaon" },
    { slug: "raigarh", name: "Raigarh" },
    { slug: "jagdalpur", name: "Jagdalpur" },
    { slug: "ambikapur", name: "Ambikapur" },
    { slug: "dhamtari", name: "Dhamtari" },
    { slug: "mahasamund", name: "Mahasamund" },
    { slug: "bhatapara", name: "Bhatapara" },
    { slug: "janjgir", name: "Janjgir" },
    { slug: "champa", name: "Champa" },
    { slug: "kawardha", name: "Kawardha" },
    { slug: "baloda-bazar", name: "Baloda Bazar" },
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
  return filterIndexableLinks(links);
}

export function buildCityKeywordLinks(
  citySlug: string,
  cityName: string,
  services: HomeServiceLink[],
  intents: HomeIntentLink[],
): KeywordLinkItem[] {
  return filterIndexableLinks(
    services.flatMap((service) =>
      intents.map((intent) => {
        const pageSlug = `${service.slug}${intent.suffix}`;
        return {
          href: routes.cityService(citySlug, pageSlug),
          label: `${intent.label === "General" ? "Best" : intent.label} ${service.name} in ${cityName}`,
          citySlug,
          serviceSlug: service.slug,
        };
      }),
    ),
  );
}

/** Primary near-me intents shown first in UI */
export const HOME_PRIMARY_INTENTS = HOME_SEARCH_INTENTS.filter((i) =>
  ["", "-near-me"].includes(i.suffix),
);

export const homeSeoParagraphs = [
  {
    id: "near-me",
    heading: "Premium invisible grills & safety nets near me — Chhattisgarh first",
    body: `Searching "invisible grills near me" or "bird spikes near me" in Chhattisgarh should open a local survey and a written quote. Coverage is Chhattisgarh only: Raipur first, then Bhilai, Durg, Bilaspur, Korba, and the other served towns.`,
  },
  {
    id: "premium",
    heading: "Best premium SS304 invisible grills & bird nets — local installers, not middlemen",
    body: `Premium searches — "best invisible grill company in Raipur", "safety nets Bhilai", "pigeon nets Bilaspur" — get a clear spec. Chhattisgarh pages explain cable spacing, knotless net GSM, anchors, high-rise access, and warranty. Raipur is listed first. Bhilai, Durg, Bilaspur, and the other towns follow in the same sitemap.`,
  },
  {
    id: "scale",
    heading: "Chhattisgarh service pages — served towns, not doorway copies",
    body: `The sitemap lists served Chhattisgarh towns and real catalogue services. Raipur is first. Near-me pages exist only where they have their own local copy. Price, dealers, and other intent copies consolidate to the town service page.`,
  },
];

export const homeKeywordTags = [
  "invisible grills Chhattisgarh",
  "safety nets Raipur",
  "invisible grills Raipur",
  "safety nets Bhilai",
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
