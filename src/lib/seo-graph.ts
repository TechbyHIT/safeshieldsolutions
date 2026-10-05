import { CG_CORE_SERVICE_SLUGS, CG_PRIORITY_PLACES } from "@/data/cg-local-seo";
import {
  getIndexableLocalitiesForCity,
  LOCALITY_SERVICE_SLUGS,
} from "@/data/cg-hierarchy";
import { getSeoService } from "@/data/seo-services";

export type SearchIntent = "informational" | "commercial" | "transactional" | "local" | "navigational";
export type ServiceRelevance = "high" | "medium" | "low";
export type SeoVerdict = "PASS" | "NEEDS IMPROVEMENT" | "BLOCK INDEXING";

/** Higher score gets more internal links. Not a ranking prediction. */
export const TOWN_LINK_PRIORITY = [
  "raipur",
  "bhilai",
  "durg",
  "bilaspur",
  "korba",
  "rajnandgaon",
  "raigarh",
  "jagdalpur",
  "ambikapur",
  "dhamtari",
  "mahasamund",
  "bhatapara",
  "baloda-bazar",
  "kawardha",
  "janjgir",
  "champa",
] as const;

const PRIORITY_INDEX = new Map<string, number>(TOWN_LINK_PRIORITY.map((slug, index) => [slug, index]));

export function townLinkScore(slug: string): number {
  const index = PRIORITY_INDEX.get(slug);
  return index === undefined ? 0 : TOWN_LINK_PRIORITY.length - index;
}

export function serviceRelevance(serviceSlug: string): ServiceRelevance {
  if (
    serviceSlug === "invisible-grills" ||
    serviceSlug === "safety-nets" ||
    serviceSlug === "pigeon-safety-nets" ||
    serviceSlug === "bird-spikes" ||
    serviceSlug === "balcony-invisible-grills" ||
    serviceSlug === "balcony-safety-nets"
  ) {
    return "high";
  }
  if (serviceSlug === "industrial-safety-nets" || serviceSlug === "sports-nets") return "low";
  return "medium";
}

export interface KeywordCluster {
  id: string;
  primaryUrl: string;
  intents: SearchIntent[];
  /** Phrases covered by the primary URL. Do not mint a new URL for these. */
  coveredQueries: string[];
}

export const KEYWORD_CLUSTERS: KeywordCluster[] = [
  {
    id: "invisible-grills-raipur",
    primaryUrl: "/chhattisgarh/raipur/invisible-grills",
    intents: ["local", "transactional"],
    coveredQueries: [
      "invisible grills in Raipur",
      "invisible grill installation Raipur",
      "balcony invisible grills Raipur",
      "window invisible grills Raipur",
      "invisible grills near Raipur",
    ],
  },
  {
    id: "invisible-grill-price",
    primaryUrl: "/pricing/invisible-grills",
    intents: ["commercial"],
    coveredQueries: ["invisible grill price", "invisible grill cost", "invisible grill rate", "invisible grill quotation"],
  },
  {
    id: "ss304-vs-ss316",
    primaryUrl: "/compare/ss304-vs-ss316",
    intents: ["informational", "commercial"],
    coveredQueries: ["SS 304 vs SS 316", "which invisible grill grade"],
  },
  {
    id: "grills-vs-nets",
    primaryUrl: "/compare/invisible-grills-vs-safety-nets",
    intents: ["informational"],
    coveredQueries: ["invisible grills vs safety nets", "invisible grill vs conventional grill"],
  },
  {
    id: "safety-nets-raipur",
    primaryUrl: "/chhattisgarh/raipur/safety-nets",
    intents: ["local", "transactional"],
    coveredQueries: ["safety nets in Raipur", "balcony safety nets Raipur", "safety nets near Raipur"],
  },
  {
    id: "installation-process",
    primaryUrl: "/services/invisible-grills",
    intents: ["informational"],
    coveredQueries: ["how invisible grills are installed", "how safety nets are installed"],
  },
];

export function findCluster(query: string): KeywordCluster | undefined {
  const needle = query.trim().toLowerCase();
  return KEYWORD_CLUSTERS.find((cluster) =>
    cluster.coveredQueries.some((item) => item.toLowerCase() === needle),
  );
}

export interface ContextualLink {
  href: string;
  label: string;
  reason: "parent" | "sibling-service" | "nearby" | "guide" | "pricing";
}

export function linksForTownService(townSlug: string, serviceSlug: string): ContextualLink[] {
  const town = CG_PRIORITY_PLACES.find((place) => place.slug === townSlug);
  const service = getSeoService(serviceSlug);
  if (!town || !service) return [];

  const pricingHref =
    serviceSlug === "invisible-grills" || serviceSlug === "safety-nets" || serviceSlug === "balcony-safety-nets"
      ? `/pricing/${serviceSlug}`
      : serviceSlug === "pigeon-safety-nets"
        ? "/pricing/pigeon-nets"
        : "/pricing";

  const links: ContextualLink[] = [
    { href: `/chhattisgarh/${town.slug}`, label: town.name, reason: "parent" },
    { href: "/chhattisgarh", label: "Chhattisgarh", reason: "parent" },
    { href: pricingHref, label: "What changes the quote", reason: "pricing" },
  ];

  for (const slug of ["invisible-grills", "safety-nets", "pigeon-safety-nets", "balcony-safety-nets", "bird-spikes"]) {
    if (slug === serviceSlug || serviceRelevance(slug) === "low") continue;
    const item = getSeoService(slug);
    if (!item) continue;
    links.push({
      href: `/chhattisgarh/${town.slug}/${slug}`,
      label: `${item.name} in ${town.name}`,
      reason: "sibling-service",
    });
  }

  const nearby = [...town.nearby].sort((a, b) => townLinkScore(b) - townLinkScore(a)).slice(0, 3);
  for (const slug of nearby) {
    const place = CG_PRIORITY_PLACES.find((item) => item.slug === slug);
    if (!place) continue;
    links.push({
      href: `/chhattisgarh/${slug}/${serviceSlug}`,
      label: `${service.name} in ${place.name}`,
      reason: "nearby",
    });
    if (serviceSlug === "bird-spikes" || serviceSlug === "invisible-grills" || serviceSlug === "safety-nets") {
      links.push({
        href: `/chhattisgarh/${slug}/${serviceSlug}-near-me`,
        label: `${service.name} near ${place.name}`,
        reason: "nearby",
      });
    }
  }

  for (const area of getIndexableLocalitiesForCity(town.slug).slice(0, 4)) {
    const href = LOCALITY_SERVICE_SLUGS.includes(serviceSlug as (typeof LOCALITY_SERVICE_SLUGS)[number])
      ? `/chhattisgarh/${town.slug}/areas/${area.slug}/${serviceSlug}`
      : `/chhattisgarh/${town.slug}/areas/${area.slug}`;
    links.push({ href, label: area.name, reason: "nearby" });
  }

  if (serviceSlug.includes("grill")) {
    links.push({ href: "/compare/ss304-vs-ss316", label: "SS304 and SS316 compared", reason: "guide" });
  }
  links.push({
    href: "/compare/invisible-grills-vs-safety-nets",
    label: "Grills and nets compared",
    reason: "guide",
  });
  return links;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: "service" | "local" | "installation" | "material" | "pricing" | "maintenance";
}

export function faqsForServicePlace(serviceName: string, placeName: string, localContext: string, isGrill: boolean): FaqItem[] {
  const material: FaqItem = isGrill
    ? {
        category: "material",
        question: `Which steel is used for grills in ${placeName}?`,
        answer:
          "SS304 is the usual cable grade. SS316 is specified only when the opening has higher corrosion exposure. The written quote names the grade.",
      }
    : {
        category: "material",
        question: `Which mesh is used for nets in ${placeName}?`,
        answer:
          "Nylon or HDPE is chosen after the opening is seen. A light pigeon mesh is not the same specification as a heavier balcony or sports net.",
      };
  return [
    {
      category: "pricing",
      question: `What changes the ${serviceName.toLowerCase()} quote in ${placeName}?`,
      answer: `Width, height, number of openings, access, and the fixing surface. ${localContext} No flat rate is published.`,
    },
    {
      category: "installation",
      question: `How is ${serviceName.toLowerCase()} installed?`,
      answer:
        "The opening is measured, the material is chosen, fixing points are prepared, the grill or net is fitted, tension or edges are checked, and the job is handed over. A site visit is required before the quote is final.",
    },
    material,
    {
      category: "local",
      question: `Is ${placeName} a separate business address?`,
      answer: `${placeName} is a service area, not a separate office. Calls and WhatsApp use the same SafeShield number.`,
    },
  ];
}

export function shortAnswers(serviceName: string, placeName: string) {
  return [
    { q: "What is it?", a: `${serviceName} fitted to a measured balcony, window, or terrace opening in ${placeName}.` },
    { q: "What does it cost?", a: "There is no published rate. Size, material, access, and fixing change the written quote." },
    { q: "How is it installed?", a: "Measure, choose the material, prepare the fixings, install, check tension or edges, then hand over." },
    { q: "Which material?", a: "Grill cables are SS304, or SS316 if corrosion exposure is higher. Nets are nylon or HDPE." },
  ];
}

const EXPECTED_TOPICS = ["balcony", "window", "material", "installation", "pricing", "faq", "cta"] as const;

export function diagnoseCommercialPage(input: {
  path: string;
  indexable: boolean;
  hasUniqueLocal: boolean;
  hasMetadata: boolean;
  topicText: string;
}): { verdict: SeoVerdict; missing: string[] } {
  if (!input.indexable) return { verdict: "BLOCK INDEXING", missing: ["Page is not approved for indexing"] };
  const text = input.topicText.toLowerCase();
  const missing: string[] = EXPECTED_TOPICS.filter((topic) => !text.includes(topic === "faq" ? "question" : topic));
  if (!input.hasUniqueLocal) missing.push("unique local context");
  if (!input.hasMetadata) missing.push("metadata");
  if (missing.length === 0) return { verdict: "PASS", missing: [] };
  return { verdict: "NEEDS IMPROVEMENT", missing };
}

/** Pages whose only internal link is the parent town hub. */
export function weakInternalLinks(): string[] {
  const inbound = new Map<string, number>();
  const note = (href: string) => inbound.set(href, (inbound.get(href) ?? 0) + 1);

  for (const place of CG_PRIORITY_PLACES) {
    note(`/chhattisgarh/${place.slug}`);
    for (const serviceSlug of CG_CORE_SERVICE_SLUGS) {
      note(`/chhattisgarh/${place.slug}/${serviceSlug}`);
    }
    for (const area of getIndexableLocalitiesForCity(place.slug)) {
      note(`/chhattisgarh/${place.slug}/areas/${area.slug}`);
    }
  }

  for (const place of CG_PRIORITY_PLACES) {
    for (const serviceSlug of ["invisible-grills", "safety-nets", "pigeon-safety-nets"]) {
      for (const link of linksForTownService(place.slug, serviceSlug)) note(link.href);
    }
  }

  return [...inbound.entries()]
    .filter(([, count]) => count < 2)
    .map(([href, count]) => `${href} has ${count} internal link${count === 1 ? "" : "s"} from the commercial graph.`);
}
