/**
 * One primary keyword per indexable URL.
 * Other query types are mapped onto that URL, or suppressed when another URL owns them.
 * Difficulty, demand, and opportunity are relative scores for prioritisation, not Search Console volumes.
 */
import { business } from "@/config/business";
import { CG_PRIORITY_PLACES, getCgPlace } from "@/data/cg-local-seo";
import { getSeoService } from "@/data/seo-services";
import { getLocality, isLocalityServiceIndexable } from "@/data/cg-hierarchy";
import { pricingPathForService } from "@/lib/local-seo-catalog";
import { evaluateSeoPath } from "@/lib/seo-quality-gate";
import { titleCase } from "@/lib/slug";

export type KeywordIntent =
  | "informational"
  | "commercial-investigation"
  | "transactional"
  | "navigational";

export type KeywordTail = "short" | "long";

export interface KeywordPlanInput {
  serviceSlug: string;
  serviceName: string;
  path: string;
  placeName?: string;
  placeSlug?: string;
  areaName?: string;
  areaSlug?: string;
  intentLabel?: string;
}

export interface TargetedKeyword {
  phrase: string;
  intent: KeywordIntent;
  tail: KeywordTail;
  branded: boolean;
  geoModified: boolean;
  question: boolean;
  competitorGap: boolean;
  difficulty: number;
  demand: number;
  businessValue: number;
  opportunity: number;
  ownerPath: string;
}

export interface KeywordPlan {
  path: string;
  canonicalPath: string;
  primary: TargetedKeyword;
  secondary: TargetedKeyword[];
  longTail: TargetedKeyword[];
  shortTail: TargetedKeyword[];
  questions: TargetedKeyword[];
  informational: TargetedKeyword[];
  commercialInvestigation: TargetedKeyword[];
  transactional: TargetedKeyword[];
  navigational: TargetedKeyword[];
  branded: TargetedKeyword[];
  nonBranded: TargetedKeyword[];
  geoModified: TargetedKeyword[];
  competitorGaps: TargetedKeyword[];
  suppressed: { phrase: string; ownerPath: string }[];
  metaKeywords: string[];
}

const HIGH_DEMAND = new Set(["raipur"]);
const MID_DEMAND = new Set(["bhilai", "durg", "bilaspur"]);
const PLACES_BY_LENGTH = [...CG_PRIORITY_PLACES].sort((a, b) => b.name.length - a.name.length);

export function normalizeKeyword(phrase: string): string {
  return phrase
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, Math.round(value)));
}

function hasTerm(phrase: string, term: string): boolean {
  const cleaned = term.trim().toLowerCase();
  if (!cleaned) return false;
  const escaped = cleaned.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?:^|\\s)${escaped}(?:\\s|$)`).test(phrase);
}

function matchedPlace(phrase: string): { slug: string; name: string } | undefined {
  return PLACES_BY_LENGTH.find((place) => hasTerm(phrase, place.name));
}

function isQuestion(phrase: string): boolean {
  return /^(how|what|who|where|why|which|when)\b/.test(phrase);
}

function isCompetitorGap(phrase: string): boolean {
  return (
    phrase.includes("cost per sq ft") ||
    phrase.includes("installation charges") ||
    phrase.includes("manufacturers") ||
    phrase.startsWith("best ")
  );
}

function isBranded(phrase: string): boolean {
  return phrase.startsWith("safeshield") || phrase.includes("safeshieldsolutions");
}

function wordCount(phrase: string): number {
  return phrase.split(/\s+/).filter(Boolean).length;
}

export function resolveCanonicalPath(path: string): string {
  if (path === "/") return "/";
  if (path.startsWith("/chhattisgarh")) return evaluateSeoPath(path).canonicalPath;
  return path;
}

function demandBoost(placeSlug: string | undefined): number {
  if (!placeSlug) return 0;
  if (HIGH_DEMAND.has(placeSlug)) return 14;
  if (MID_DEMAND.has(placeSlug)) return 8;
  return 4;
}

function classifyIntent(phrase: string, branded: boolean, geo: boolean): KeywordIntent {
  if (branded && !/\b(price|cost|install|near me)\b/.test(phrase)) return "navigational";
  if (/\bhow much\b|\bprice\b|\bcost\b|\bcharges\b|\brates\b|\bbest\b|\bdealers\b|\bmanufacturers\b|\bcompany\b|\bvs\b/.test(phrase)) {
    return "commercial-investigation";
  }
  if (/\bnear me\b|\bnearby\b|\bbook\b|\bhire\b|\bquote\b|\bsame day\b|\binstallation\b|\binstall\b|\bcontractors\b/.test(phrase)) {
    return "transactional";
  }
  if (isQuestion(phrase)) return "informational";
  if (branded) return "navigational";
  if (geo) return "transactional";
  return "transactional";
}

function businessValueFor(intent: KeywordIntent, gap: boolean): number {
  const base =
    intent === "transactional" ? 90 : intent === "commercial-investigation" ? 76 : intent === "navigational" ? 64 : 34;
  return clamp(base + (gap ? 6 : 0), 1, 99);
}

function difficultyFor(input: {
  tail: KeywordTail;
  geo: boolean;
  branded: boolean;
  question: boolean;
  gap: boolean;
}): number {
  let score = 62;
  if (input.tail === "short" && !input.geo) score += 22;
  if (input.tail === "long") score -= 18;
  if (input.geo) score -= 12;
  if (input.question) score -= 8;
  if (input.branded) score -= 28;
  if (input.gap) score -= 6;
  return clamp(score, 8, 94);
}

function demandFor(intent: KeywordIntent, placeSlug: string | undefined, tail: KeywordTail, question: boolean): number {
  let score = 48;
  if (intent === "transactional") score += 22;
  if (intent === "commercial-investigation") score += 16;
  if (intent === "navigational") score += 8;
  if (intent === "informational") score -= 8;
  score += demandBoost(placeSlug);
  if (tail === "long") score -= 6;
  if (question) score -= 4;
  return clamp(score, 8, 96);
}

export function ownerForKeyword(phrase: string, input: KeywordPlanInput): string {
  const normalized = normalizeKeyword(phrase);
  const serviceLower = input.serviceName.toLowerCase();
  const place = matchedPlace(normalized);
  const near = /\bnear me\b/.test(normalized) || /\bnearby\b/.test(normalized);
  const areaHit = Boolean(input.areaName && input.areaSlug && input.placeSlug && hasTerm(normalized, input.areaName));
  const stateHit = hasTerm(normalized, "chhattisgarh");
  const branded = isBranded(normalized);

  if (branded && !place && !areaHit && !near && !stateHit) return "/";

  if (near && place) return `/chhattisgarh/${place.slug}/${input.serviceSlug}-near-me`;

  if (
    areaHit &&
    !near &&
    input.placeSlug &&
    input.areaSlug &&
    isLocalityServiceIndexable(input.placeSlug, input.areaSlug, input.serviceSlug)
  ) {
    return `/chhattisgarh/${input.placeSlug}/areas/${input.areaSlug}/${input.serviceSlug}`;
  }

  if (near) return `/chhattisgarh/${input.serviceSlug}`;

  const priceHead =
    normalized === `${serviceLower} price` ||
    normalized === `${serviceLower} cost` ||
    normalized === `${serviceLower} price in chhattisgarh` ||
    normalized === `${serviceLower} cost in chhattisgarh`;
  if (priceHead) return pricingPathForService(input.serviceSlug) ?? `/chhattisgarh/${input.serviceSlug}`;

  if (place) return `/chhattisgarh/${place.slug}/${input.serviceSlug}`;

  if (areaHit && input.placeSlug) return `/chhattisgarh/${input.placeSlug}/${input.serviceSlug}`;

  if (stateHit) return `/chhattisgarh/${input.serviceSlug}`;

  if (isQuestion(normalized) && !normalized.includes("installation")) return "/faq";

  return `/services/${input.serviceSlug}`;
}

function primaryPhrase(canonical: string, input: KeywordPlanInput): string {
  const service = input.serviceName;
  if (canonical === "/") return business.name;
  if (canonical.startsWith("/pricing/")) return `${service} price`;
  if (canonical.startsWith("/services/")) return service;
  if (canonical === "/faq") return `what are ${service.toLowerCase()}`;

  const locality = canonical.match(/^\/chhattisgarh\/([^/]+)\/areas\/([^/]+)\/([^/]+)$/);
  if (locality) {
    const place = input.placeName ?? getCgPlace(locality[1]!)?.name ?? titleCase(locality[1]!);
    const area = input.areaName ?? getLocality(locality[1]!, locality[2]!)?.name ?? titleCase(locality[2]!);
    return `${service} in ${area}, ${place}`;
  }

  const near = canonical.match(/^\/chhattisgarh\/([^/]+)\/(.+)-near-me$/);
  if (near && near[1] !== "districts" && getCgPlace(near[1]!)) {
    const place = input.placeName ?? getCgPlace(near[1]!)?.name ?? titleCase(near[1]!);
    return `${service} Near Me in ${place}`;
  }

  const city = canonical.match(/^\/chhattisgarh\/([^/]+)\/([^/]+)$/);
  if (city && city[1] !== "districts" && getCgPlace(city[1]!)) {
    const place = input.placeName ?? getCgPlace(city[1]!)?.name ?? titleCase(city[1]!);
    return `${service} in ${place}`;
  }

  const state = canonical.match(/^\/chhattisgarh\/([^/]+)$/);
  if (state && !getCgPlace(state[1]!)) return `${service} in Chhattisgarh`;

  return service;
}

function contextPlaceSlug(input: KeywordPlanInput, canonical: string): string | undefined {
  if (input.placeSlug && input.placeSlug !== "chhattisgarh") return input.placeSlug;
  const match = canonical.match(/^\/chhattisgarh\/([^/]+)\//);
  if (match && getCgPlace(match[1]!)) return match[1];
  return undefined;
}

function candidatesFor(input: KeywordPlanInput): string[] {
  const service = input.serviceName;
  const lower = service.toLowerCase();
  const place = input.placeName;
  const area = input.areaName;
  const list = [
    service,
    `${service} price`,
    `${service} installation`,
    `what are ${lower}`,
    `how do ${lower} work`,
    business.name,
    `${business.name} ${lower}`,
    "safeshieldsolutions.in",
    `${service} in Chhattisgarh`,
    `${service} price in Chhattisgarh`,
    `${lower} near me`,
  ];

  if (place && input.placeSlug && getCgPlace(input.placeSlug)) {
    list.push(
      `${service} in ${place}`,
      `${service} ${place}`,
      `${service} Near Me in ${place}`,
      `${service} price in ${place}`,
      `${service} installation in ${place}`,
      `${service} dealers in ${place}`,
      `${service} contractors in ${place}`,
      `${service} company in ${place}`,
      `${lower} cost per sq ft in ${place}`,
      `best ${lower} company in ${place}`,
      `${lower} installation charges in ${place}`,
      `${lower} manufacturers in ${place}`,
      `how much do ${lower} cost in ${place}`,
      `who installs ${lower} near me in ${place}`,
      `where to get ${lower} near me in ${place}`,
      `what should a ${place} site survey check before ${lower}`,
      `${business.name} ${lower} in ${place}`,
    );
  }

  if (area && place) {
    list.push(
      `${service} in ${area}, ${place}`,
      `${service} ${area}`,
      `${lower} price in ${area}`,
      `how much do ${lower} cost in ${area}`,
    );
  }

  for (const phrase of (getSeoService(input.serviceSlug)?.searchPhrases ?? []).slice(0, 6)) {
    list.push(phrase);
    if (place && input.placeSlug !== "chhattisgarh") list.push(`${phrase} in ${place}`);
  }

  return list;
}

function scoreKeyword(phrase: string, input: KeywordPlanInput, placeSlug: string | undefined): TargetedKeyword {
  const normalized = normalizeKeyword(phrase);
  const branded = isBranded(normalized);
  const geo =
    /\bnear me\b/.test(normalized) ||
    /\bnearby\b/.test(normalized) ||
    hasTerm(normalized, "chhattisgarh") ||
    Boolean(matchedPlace(normalized)) ||
    Boolean(input.areaName && hasTerm(normalized, input.areaName));
  const question = isQuestion(normalized);
  const gap = isCompetitorGap(normalized);
  const tail: KeywordTail = wordCount(normalized) <= 3 ? "short" : "long";
  const intent = classifyIntent(normalized, branded, geo);
  const difficulty = difficultyFor({ tail, geo, branded, question, gap });
  const demand = demandFor(intent, geo ? placeSlug : undefined, tail, question);
  const businessValue = businessValueFor(intent, gap);
  const opportunity = clamp((businessValue / 100) * (demand / 100) * ((100 - difficulty) / 100) * 100, 1, 99);
  return {
    phrase,
    intent,
    tail,
    branded,
    geoModified: geo,
    question,
    competitorGap: gap,
    difficulty,
    demand,
    businessValue,
    opportunity,
    ownerPath: ownerForKeyword(phrase, input),
  };
}

function byOpportunity(a: TargetedKeyword, b: TargetedKeyword): number {
  return b.opportunity - a.opportunity || a.phrase.localeCompare(b.phrase);
}

export function buildKeywordPlan(input: KeywordPlanInput): KeywordPlan {
  const canonicalPath = resolveCanonicalPath(input.path);
  const placeSlug = contextPlaceSlug(input, canonicalPath);
  const wanted = normalizeKeyword(primaryPhrase(canonicalPath, input));
  const seen = new Set<string>();
  const scored: TargetedKeyword[] = [];

  for (const phrase of candidatesFor(input)) {
    const key = normalizeKeyword(phrase);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    scored.push(scoreKeyword(phrase, input, placeSlug));
  }

  if (!seen.has(wanted)) {
    scored.push(scoreKeyword(primaryPhrase(canonicalPath, input), input, placeSlug));
  }

  const owned = scored.filter((item) => item.ownerPath === canonicalPath);
  const primary =
    owned.find((item) => normalizeKeyword(item.phrase) === wanted) ??
    scored.find((item) => normalizeKeyword(item.phrase) === wanted) ??
    owned[0];

  if (!primary || primary.ownerPath !== canonicalPath) {
    throw new Error(
      `Primary "${primary?.phrase ?? wanted}" for ${input.path} resolved to ${primary?.ownerPath ?? "nothing"} instead of ${canonicalPath}`,
    );
  }

  const secondary = owned.filter((item) => item !== primary).sort(byOpportunity);
  const kept = [primary, ...secondary];
  const bucket = (pick: (item: TargetedKeyword) => boolean) => kept.filter(pick).sort(byOpportunity);

  return {
    path: input.path,
    canonicalPath,
    primary,
    secondary,
    longTail: bucket((item) => item.tail === "long"),
    shortTail: bucket((item) => item.tail === "short"),
    questions: bucket((item) => item.question),
    informational: bucket((item) => item.intent === "informational"),
    commercialInvestigation: bucket((item) => item.intent === "commercial-investigation"),
    transactional: bucket((item) => item.intent === "transactional"),
    navigational: bucket((item) => item.intent === "navigational"),
    branded: bucket((item) => item.branded),
    nonBranded: bucket((item) => !item.branded),
    geoModified: bucket((item) => item.geoModified),
    competitorGaps: bucket((item) => item.competitorGap),
    suppressed: scored
      .filter((item) => item.ownerPath !== canonicalPath)
      .map((item) => ({ phrase: item.phrase, ownerPath: item.ownerPath })),
    metaKeywords: kept.slice(0, 12).map((item) => item.phrase),
  };
}

export function buildBrandKeywordPlan(): KeywordPlan {
  return buildKeywordPlan({
    serviceSlug: "invisible-grills",
    serviceName: "Invisible Grills",
    path: "/",
    placeName: "Chhattisgarh",
    placeSlug: "chhattisgarh",
  });
}

export function supportingSearchSentence(plan: KeywordPlan): string {
  const picks = plan.secondary
    .filter((item) => !/\bnear me\b/i.test(item.phrase))
    .slice(0, 3)
    .map((item) => item.phrase);
  if (picks.length === 0) return "";
  if (picks.length === 1) return `Searches answered on this page include ${picks[0]}.`;
  const head = picks.slice(0, -1).join(", ");
  return `Searches answered on this page include ${head}, and ${picks[picks.length - 1]}.`;
}

export function findCannibalization(plans: KeywordPlan[]): { phrase: string; paths: string[] }[] {
  const owners = new Map<string, Set<string>>();
  for (const plan of plans) {
    if (plan.path !== plan.canonicalPath) continue;
    const key = normalizeKeyword(plan.primary.phrase);
    const paths = owners.get(key) ?? new Set<string>();
    paths.add(plan.canonicalPath);
    owners.set(key, paths);
  }
  return [...owners.entries()]
    .filter(([, paths]) => paths.size > 1)
    .map(([phrase, paths]) => ({ phrase, paths: [...paths] }));
}
