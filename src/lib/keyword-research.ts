/**
 * Keyword research for one town.
 * Demand and difficulty are estimates unless a volume or SERP export is passed in.
 * The workflow maps keywords onto existing URLs. It does not open a new URL per variation.
 */
import { getCgPlace } from "@/data/cg-local-seo";
import { getSeoService } from "@/data/seo-services";
import { clusterFor } from "@/lib/entity-seo";
import { buildKeywordPlan, findCannibalization, normalizeKeyword, type TargetedKeyword } from "@/lib/keyword-targeting";
import { cityServiceSlugsForPlace } from "@/lib/local-seo-catalog";
import { decideOpportunity, type OpportunityIntent, type OpportunityTreatment } from "@/lib/seo-opportunity";

export interface SerpRow {
  query: string;
  url: string;
  position: number;
}

export interface VolumeRow {
  query: string;
  searches: number;
}

export type ResearchAction = "keep" | "add-section" | "use-article" | "use-comparison" | "do-not-create";

export interface KeywordWorkItem {
  keyword: string;
  seed: string;
  intent: TargetedKeyword["intent"];
  cluster: string;
  demand: { source: "estimate" | "export"; value: number };
  difficulty: { source: "estimate" | "export"; value: number };
  commercialValue: number;
  url: string;
  treatment: OpportunityTreatment;
  action: ResearchAction;
  priority: number;
}

export interface MarketResearch {
  market: string;
  seeds: string[];
  variations: number;
  serp: { source: "none" | "export"; note: string; rows: SerpRow[] };
  clusters: { name: string; url: string; keywords: string[] }[];
  competing: { keyword: string; urls: string[] }[];
  work: KeywordWorkItem[];
}

function opportunityIntent(keyword: TargetedKeyword): OpportunityIntent {
  const phrase = normalizeKeyword(keyword.phrase);
  if (phrase.includes(" vs ") || phrase.startsWith("best ")) return phrase.startsWith("best ") ? "commercial" : "comparison";
  if (/\bnear me\b/.test(phrase)) return "near-me";
  if (keyword.intent === "commercial-investigation") return "commercial";
  if (keyword.intent === "informational") return "informational";
  if (keyword.intent === "navigational") return "navigational";
  return "transactional";
}

function actionFor(treatment: OpportunityTreatment): ResearchAction {
  if (treatment === "dedicated-landing-page" || treatment === "service-detail-page" || treatment === "category-page") return "keep";
  if (treatment === "section") return "add-section";
  if (treatment === "supporting-article") return "use-article";
  if (treatment === "comparison-page") return "use-comparison";
  return "do-not-create";
}

function effort(action: ResearchAction): number {
  if (action === "use-article") return 3;
  if (action === "add-section" || action === "use-comparison") return 2;
  if (action === "keep") return 1;
  return 0;
}

function toWorkItem(
  phrase: string,
  seed: string,
  intent: KeywordWorkItem["intent"],
  cluster: string,
  demand: number,
  difficulty: number,
  commercialValue: number,
  decision: { treatment: OpportunityTreatment; canonicalPath: string },
  volumeByQuery: Map<string, number>,
  serpRows: SerpRow[],
): KeywordWorkItem {
  const action = actionFor(decision.treatment);
  const exported = volumeByQuery.get(normalizeKeyword(phrase));
  const serpForQuery = serpRows.filter((row) => normalizeKeyword(row.query) === normalizeKeyword(phrase));
  const difficultySource = serpForQuery.length >= 8 ? "export" : "estimate";
  const difficultyValue = difficultySource === "export" ? Math.min(94, difficulty + 15) : difficulty;
  const confidence = exported !== undefined || serpForQuery.length > 0 ? 85 : 45;
  const units = effort(action);
  const priority = units === 0 ? 0 : Math.round(((commercialValue * (100 - difficultyValue) * confidence) / 100) / units);
  return {
    keyword: phrase,
    seed,
    intent,
    cluster,
    demand: exported !== undefined ? { source: "export", value: exported } : { source: "estimate", value: demand },
    difficulty: { source: difficultySource, value: difficultyValue },
    commercialValue,
    url: decision.canonicalPath,
    treatment: decision.treatment,
    action,
    priority,
  };
}

export function researchMarket(input: {
  placeSlug: string;
  serviceSlugs?: string[];
  serp?: SerpRow[];
  volumes?: VolumeRow[];
}): MarketResearch {
  const place = getCgPlace(input.placeSlug);
  if (!place) {
    return {
      market: input.placeSlug,
      seeds: [],
      variations: 0,
      serp: { source: "none", note: "Unknown market.", rows: [] },
      clusters: [],
      competing: [],
      work: [],
    };
  }

  const slugs = input.serviceSlugs ?? cityServiceSlugsForPlace(place.slug).slice(0, 6);
  const volumeByQuery = new Map((input.volumes ?? []).map((row) => [normalizeKeyword(row.query), row.searches]));
  const serpRows = input.serp ?? [];
  const plans = [];
  const work: KeywordWorkItem[] = [];

  for (const slug of slugs) {
    const service = getSeoService(slug);
    if (!service) continue;
    const plan = buildKeywordPlan({
      serviceSlug: service.slug,
      serviceName: service.name,
      path: `/chhattisgarh/${place.slug}/${service.slug}`,
      placeName: place.name,
      placeSlug: place.slug,
    });
    plans.push(plan);
    const cluster = clusterFor(service);
    const owned = [plan.primary, ...plan.secondary];
    for (const keyword of owned) {
      const intent = opportunityIntent(keyword);
      const decision = decideOpportunity({
        serviceSlug: service.slug,
        locationSlug: place.slug,
        intent,
        audience: "Local owners",
      });
      work.push(toWorkItem(keyword.phrase, service.name, keyword.intent, cluster.name, keyword.demand, keyword.difficulty, keyword.businessValue, decision, volumeByQuery, serpRows));
    }
    for (const suppressed of plan.suppressed) {
      const phrase = normalizeKeyword(suppressed.phrase);
      if (!phrase.includes(place.name.toLowerCase()) && !phrase.includes("near me")) continue;
      const stub = {
        phrase: suppressed.phrase,
        intent: phrase.includes("near me") ? "transactional" as const : phrase.includes("price") || phrase.includes("cost") ? "commercial-investigation" as const : "transactional" as const,
        demand: 40,
        difficulty: 45,
        businessValue: phrase.includes("near me") ? 90 : 70,
      };
      const decision = {
        treatment: suppressed.ownerPath.includes("-near-me") ? "dedicated-landing-page" as const : "section" as const,
        canonicalPath: suppressed.ownerPath,
        businessValue: stub.businessValue,
        reason: "Owned by an existing URL.",
      };
      work.push(toWorkItem(suppressed.phrase, service.name, stub.intent, cluster.name, stub.demand, stub.difficulty, stub.businessValue, decision, volumeByQuery, serpRows));
    }
  }

  const clusters = new Map<string, { name: string; url: string; keywords: string[] }>();
  for (const item of work) {
    const group = clusters.get(item.cluster) ?? { name: item.cluster, url: item.url, keywords: [] };
    group.keywords.push(item.keyword);
    clusters.set(item.cluster, group);
  }

  const competing = findCannibalization(plans).map((conflict) => ({
    keyword: conflict.phrase,
    urls: conflict.paths,
  }));

  return {
    market: place.name,
    seeds: plans.map((plan) => plan.primary.phrase.split(" in ")[0] ?? plan.primary.phrase),
    variations: work.length,
    serp: serpRows.length
      ? { source: "export", note: "SERP rows come from the supplied export.", rows: serpRows }
      : { source: "none", note: "No SERP export is loaded. Live results are not invented.", rows: [] },
    clusters: [...clusters.values()],
    competing,
    work: work.sort((a, b) => b.priority - a.priority || a.keyword.localeCompare(b.keyword)),
  };
}
