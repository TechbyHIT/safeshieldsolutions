/**
 * Priority = impact × ease × confidence.
 * Missing rank or volume data is left out. It is not treated as zero demand or zero competition.
 */
export const PRIORITY_WEIGHTS = {
  searchDemand: 0.18,
  businessRelevance: 0.14,
  conversionPotential: 0.14,
  visibility: 0.1,
  contentGap: 0.12,
  technicalSeverity: 0.12,
  competition: 0.1,
  effort: 0.1,
} as const;

export type EvidenceSource = "measured" | "estimate" | "export" | "none";

export interface PriorityInput {
  searchDemand: number;
  demandSource?: EvidenceSource;
  businessRelevance: number;
  conversionPotential: number;
  /** Current position. Omit when no rank snapshot exists. */
  position?: number;
  impressions?: number;
  /** none = covered, section = wording to add, page = a justified URL is missing. */
  contentGap: "none" | "section" | "page";
  technicalFailures: number;
  /** 0 is easy, 100 is crowded. */
  competition: number;
  competitionSource?: EvidenceSource;
  effort: "low" | "medium" | "high";
}

export interface PriorityFactor {
  id: keyof typeof PRIORITY_WEIGHTS;
  score: number;
  weight: number;
  contribution: number;
  source: EvidenceSource;
  note: string;
}

export interface PriorityResult {
  score: number;
  confidence: number;
  factors: PriorityFactor[];
}

function clamp(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function gapScore(gap: PriorityInput["contentGap"]): number {
  if (gap === "page") return 90;
  if (gap === "section") return 60;
  return 15;
}

function effortScore(effort: PriorityInput["effort"]): number {
  if (effort === "high") return 80;
  if (effort === "medium") return 50;
  return 20;
}

function visibilityScore(position: number): number {
  if (position <= 3) return 20;
  if (position <= 10) return 55;
  return 85;
}

export function prioritize(input: PriorityInput): PriorityResult {
  const demandSource = input.demandSource ?? "estimate";
  const competitionSource = input.competitionSource ?? "estimate";
  const hasVisibility = input.position !== undefined;
  const confidence = input.position !== undefined || input.impressions !== undefined || demandSource === "export" ? 0.85 : 0.45;

  const raw: { id: PriorityFactor["id"]; score: number; source: EvidenceSource; note: string; invert?: boolean }[] = [
    { id: "searchDemand", score: clamp(input.searchDemand), source: demandSource, note: demandSource === "export" ? "Search demand from the supplied export." : "Relative demand estimate. Not a search volume." },
    { id: "businessRelevance", score: clamp(input.businessRelevance), source: "measured", note: "Catalogue priority and whether the town is served." },
    { id: "conversionPotential", score: clamp(input.conversionPotential), source: "measured", note: "Higher when the intent can book a survey." },
    ...(hasVisibility
      ? [{ id: "visibility" as const, score: visibilityScore(input.position!), source: "export" as const, note: `Position ${input.position}. Weaker visibility raises the score.` }]
      : []),
    { id: "contentGap", score: gapScore(input.contentGap), source: "measured", note: input.contentGap === "none" ? "The intent already has a page." : `Gap: ${input.contentGap}.` },
    { id: "technicalSeverity", score: clamp(input.technicalFailures * 25), source: "measured", note: `${input.technicalFailures} critical publication failures.` },
    { id: "competition", score: clamp(input.competition), source: competitionSource, note: competitionSource === "export" ? "Difficulty adjusted from a SERP export." : "Difficulty estimate.", invert: true },
    { id: "effort", score: effortScore(input.effort), source: "measured", note: `${input.effort} implementation effort.`, invert: true },
  ];

  const activeWeight = raw.reduce((sum, factor) => sum + PRIORITY_WEIGHTS[factor.id], 0);
  const factors: PriorityFactor[] = raw.map((factor) => {
    const weight = PRIORITY_WEIGHTS[factor.id] / activeWeight;
    const points = factor.invert ? 100 - factor.score : factor.score;
    return {
      id: factor.id,
      score: factor.score,
      weight: Math.round(weight * 1000) / 1000,
      contribution: Math.round(points * weight * confidence * 10) / 10,
      source: factor.source,
      note: factor.note,
    };
  });

  const score = Math.round(factors.reduce((sum, factor) => sum + factor.contribution, 0) * 10) / 10;
  return { score, confidence, factors };
}
