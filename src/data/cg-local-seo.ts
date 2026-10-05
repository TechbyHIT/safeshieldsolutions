/**
 * Chhattisgarh places the site can describe with real public context.
 * These are service areas, not claimed office addresses.
 */

export interface CgPlaceProfile {
  slug: string;
  name: string;
  /** Public geographic context. Not a claim of a local branch. */
  localContext: string;
  nearby: string[];
}

/** Towns with enough public context to index a place page and core service pages. */
export const CG_PRIORITY_PLACES: CgPlaceProfile[] = [
  {
    slug: "raipur",
    name: "Raipur",
    localContext:
      "Raipur is the state capital. Housing is a mix of older city neighbourhoods, apartment blocks, and the planned Naya Raipur (Atal Nagar) area.",
    nearby: ["bhilai", "durg", "dhamtari", "mahasamund", "bhatapara", "baloda-bazar"],
  },
  {
    slug: "bhilai",
    name: "Bhilai",
    localContext:
      "Bhilai is a planned steel-township city in Durg district, with sector housing, apartments, and independent houses.",
    nearby: ["durg", "raipur", "rajnandgaon"],
  },
  {
    slug: "durg",
    name: "Durg",
    localContext:
      "Durg sits beside Bhilai. Homes are a mix of town houses and newer apartments along the twin-city corridor.",
    nearby: ["bhilai", "raipur", "rajnandgaon"],
  },
  {
    slug: "bilaspur",
    name: "Bilaspur",
    localContext:
      "Bilaspur is a major railway city and the seat of the Chhattisgarh High Court, with apartments and independent houses around the city.",
    nearby: ["bhatapara", "janjgir", "champa", "korba"],
  },
  {
    slug: "korba",
    name: "Korba",
    localContext:
      "Korba is an industrial power and mining city. Much of the housing is township and independent homes near plant areas.",
    nearby: ["bilaspur", "raigarh", "champa"],
  },
  {
    slug: "rajnandgaon",
    name: "Rajnandgaon",
    localContext:
      "Rajnandgaon is the headquarters of its district, west of Durg, with town-centre houses and growing residential pockets.",
    nearby: ["durg", "bhilai"],
  },
  {
    slug: "raigarh",
    name: "Raigarh",
    localContext:
      "Raigarh is an industrial district headquarters in eastern Chhattisgarh, with town housing and plant-adjacent colonies.",
    nearby: ["korba", "bilaspur"],
  },
  {
    slug: "jagdalpur",
    name: "Jagdalpur",
    localContext:
      "Jagdalpur is the main town of Bastar district in southern Chhattisgarh.",
    nearby: [],
  },
  {
    slug: "ambikapur",
    name: "Ambikapur",
    localContext:
      "Ambikapur is the headquarters of Surguja district in northern Chhattisgarh.",
    nearby: [],
  },
  {
    slug: "dhamtari",
    name: "Dhamtari",
    localContext:
      "Dhamtari is a district town south of Raipur, on the road toward the Mahanadi basin.",
    nearby: ["raipur"],
  },
  {
    slug: "mahasamund",
    name: "Mahasamund",
    localContext:
      "Mahasamund is a district headquarters east of Raipur.",
    nearby: ["raipur"],
  },
  {
    slug: "bhatapara",
    name: "Bhatapara",
    localContext:
      "Bhatapara is a municipal town on the route between Raipur and Bilaspur.",
    nearby: ["raipur", "baloda-bazar", "bilaspur"],
  },
  {
    slug: "baloda-bazar",
    name: "Baloda Bazar",
    localContext:
      "Baloda Bazar is the headquarters of Balodabazar-Bhatapara district, east of Raipur.",
    nearby: ["bhatapara", "raipur"],
  },
  {
    slug: "kawardha",
    name: "Kawardha",
    localContext:
      "Kawardha is the headquarters of Kabirdham district in western Chhattisgarh.",
    nearby: [],
  },
  {
    slug: "janjgir",
    name: "Janjgir",
    localContext:
      "Janjgir is part of Janjgir-Champa district, between Bilaspur and the eastern industrial belt.",
    nearby: ["champa", "bilaspur"],
  },
  {
    slug: "champa",
    name: "Champa",
    localContext:
      "Champa is a railway town in Janjgir-Champa district.",
    nearby: ["janjgir", "bilaspur", "korba"],
  },
];

/**
 * Services with a real catalogue entry and a distinct job.
 * Intent suffixes (price, near-me, quote) stay on these URLs instead of extra pages.
 */
export const CG_CORE_SERVICE_SLUGS = [
  "safety-nets",
  "balcony-safety-nets",
  "pigeon-safety-nets",
  "child-safety-nets",
  "pet-safety-nets",
  "terrace-safety-nets",
  "duct-area-safety-nets",
  "sports-nets",
  "bird-protection-nets",
  "bird-spikes",
  "invisible-grills",
  "balcony-invisible-grills",
  "window-invisible-grills",
  "mosquito-nets",
  "cloth-hangers",
  "zip-screens",
  "mesh-doors",
] as const;

/** Short URLs that must not compete with the existing service page. */
export const SERVICE_ALIAS_REDIRECTS: { source: string; destination: string }[] = [
  { source: "/safety-nets", destination: "/services/safety-nets" },
  { source: "/invisible-grills", destination: "/services/invisible-grills" },
  { source: "/pigeon-nets", destination: "/services/pigeon-safety-nets" },
  { source: "/pigeon-safety-nets", destination: "/services/pigeon-safety-nets" },
  { source: "/balcony-safety-nets", destination: "/services/balcony-safety-nets" },
  { source: "/child-safety-nets", destination: "/services/child-safety-nets" },
  { source: "/pet-safety-nets", destination: "/services/pet-safety-nets" },
  { source: "/terrace-safety-nets", destination: "/services/terrace-safety-nets" },
  { source: "/balcony-invisible-grills", destination: "/services/balcony-invisible-grills" },
  { source: "/window-invisible-grills", destination: "/services/window-invisible-grills" },
  { source: "/sports-nets", destination: "/services/sports-nets" },
  { source: "/industrial-safety-nets", destination: "/services/industrial-safety-nets" },
];

/**
 * Same product as an existing service. These URLs redirect so they do not compete.
 * Distinct products that are not in the catalogue are omitted, not invented.
 */
export const SERVICE_SLUG_ALIASES: Record<string, string> = {
  "pigeon-nets": "pigeon-safety-nets",
  "bird-nets": "bird-protection-nets",
  "duct-safety-nets": "duct-area-safety-nets",
  "safety-net-installation": "safety-nets",
  "invisible-grill-installation": "invisible-grills",
};

export const PRICING_PAGES = [
  { slug: "invisible-grills", name: "Invisible grills", serviceSlug: "invisible-grills" },
  { slug: "safety-nets", name: "Safety nets", serviceSlug: "safety-nets" },
  { slug: "pigeon-nets", name: "Pigeon nets", serviceSlug: "pigeon-safety-nets" },
  { slug: "balcony-safety-nets", name: "Balcony safety nets", serviceSlug: "balcony-safety-nets" },
] as const;

export const COMPARISONS = [
  {
    slug: "invisible-grills-vs-safety-nets",
    title: "Invisible grills vs safety nets",
    summary:
      "Grills and nets solve different jobs. A grill is a cable barrier in a channel. A net is a mesh closure. Many balconies use one, some use both for different openings.",
    rows: [
      ["Best suited to", "View-facing balconies and windows", "Pigeons, pets, children, ducts, terraces"],
      ["Material", "SS304 cables; SS316 where corrosion is higher", "Nylon or HDPE mesh, chosen for the job"],
      ["Maintenance", "Wipe-down and tension check", "Debris removal and edge check"],
      ["Price factors", "Span, cable grade, access, openable frames", "Mesh, area, edges, access"],
      ["Limitation", "Does not stop small birds by itself", "Changes the look of the opening more than cables"],
    ],
  },
  {
    slug: "ss304-vs-ss316",
    title: "SS304 vs SS316 invisible grills",
    summary:
      "Both are stainless grades used for cable grills. SS304 is the usual specification. SS316 is the upgrade when the opening faces heavier corrosion, such as constant damp or pool splash.",
    rows: [
      ["Usual use", "Most apartments and inland homes", "Higher corrosion exposure"],
      ["What changes the quote", "Cable amount, span, access", "Grade plus the same size factors"],
      ["Limitation", "Not the better choice for every opening", "Costs more; not required on a dry inland balcony"],
    ],
  },
  {
    slug: "nylon-vs-hdpe-nets",
    title: "Nylon vs HDPE safety nets",
    summary:
      "Both are mesh options already used for outdoor nets. The survey picks the mesh for the opening, sun exposure, and what the net has to stop. Neither is universally better.",
    rows: [
      ["Outdoor use", "UV-stabilised nylon is used for long outdoor life", "HDPE is used where a heavier mesh is specified"],
      ["Selection", "Based on the opening, not a default brand", "Based on the opening, not a default brand"],
      ["Limitation", "A light mesh is wrong for a heavy-duty job", "A heavy mesh can be more visible"],
    ],
  },
] as const;

const PRIORITY_BY_SLUG = new Map(CG_PRIORITY_PLACES.map((place) => [place.slug, place]));

export function getCgPlace(slug: string): CgPlaceProfile | undefined {
  return PRIORITY_BY_SLUG.get(slug);
}

export function isCgPriorityPlace(slug: string): boolean {
  return PRIORITY_BY_SLUG.has(slug);
}
