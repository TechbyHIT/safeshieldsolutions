/**
 * SEO intelligence from local checks plus optional exports.
 * Search Console, Analytics, and rank figures are omitted when no export is passed in.
 */
import { refreshStatus } from "@/lib/content-seo";
import { landingTest } from "@/lib/quote-lead";
import { searchPerformanceReport, type SearchPerformanceRow } from "@/lib/programmatic-seo";

export interface QueryRow {
  query: string;
  path: string;
  clicks: number;
  impressions: number;
  position: number;
}

export interface AnalyticsRow {
  path: string;
  sessions: number;
  conversions: number;
}

export interface PositionSnapshot {
  path: string;
  position: number;
}

export interface IntelligenceInput {
  asOf: string;
  indexation: { indexable: number; inSitemap: number; orphans: number; errors: number };
  contentVersions?: { path: string; version: string }[];
  searchConsole?: SearchPerformanceRow[];
  queries?: QueryRow[];
  analytics?: AnalyticsRow[];
  previousPositions?: PositionSnapshot[];
  currentPositions?: PositionSnapshot[];
  technicalScores?: { path: string; score: number }[];
  competitors?: { domain: string }[];
}

export function clickThroughRate(clicks: number, impressions: number): number | null {
  if (impressions <= 0) return null;
  return clicks / impressions;
}

export function intelligenceReport(input: IntelligenceInput) {
  const search = searchPerformanceReport(input.searchConsole);
  const queries = input.queries ?? [];
  const analytics = input.analytics ?? [];
  const landing = input.searchConsole ?? [];
  const decay = (input.contentVersions ?? [])
    .map((item) => ({ path: item.path, ...refreshStatus(item.version, input.asOf) }))
    .filter((item) => item.status === "due");
  const weakTechnical = (input.technicalScores ?? []).filter((item) => item.score < 80);
  const previous = new Map((input.previousPositions ?? []).map((item) => [item.path, item.position]));
  const rankingChanges = (input.currentPositions ?? []).flatMap((item) => {
    const before = previous.get(item.path);
    if (before === undefined) return [];
    return [{ path: item.path, from: before, to: item.position, change: item.position - before }];
  });
  const experiment = landingTest();

  return {
    asOf: input.asOf,
    searchConsole: search,
    analytics: analytics.length
      ? { source: "export" as const, note: "Sessions and conversions come from the supplied Analytics export.", rows: analytics }
      : { source: "none" as const, note: "No Analytics export is loaded. Sessions and conversions are not invented.", rows: [] },
    queries: queries.length
      ? { source: "export" as const, note: "Query rows come from the supplied Search Console export.", rows: queries }
      : { source: "none" as const, note: "No keyword export is loaded. Query positions are not invented.", rows: [] },
    clickThrough: landing
      .map((row) => ({ path: row.path, rate: clickThroughRate(row.clicks, row.impressions), impressions: row.impressions }))
      .filter((row) => row.rate !== null),
    impressions: search,
    indexation: input.indexation,
    conversions: analytics.reduce((sum, row) => sum + row.conversions, 0),
    technical: weakTechnical,
    experiment,
    decay,
    competitors: input.competitors?.length
      ? { source: "export" as const, note: "Competitor domains come from the supplied export.", domains: input.competitors.map((item) => item.domain) }
      : { source: "none" as const, note: "No competitor export is loaded. Competitor ranks are not guessed.", domains: [] as string[] },
    rankingChanges: input.previousPositions?.length && input.currentPositions?.length
      ? { source: "export" as const, note: "Change is current position minus the earlier position. A positive change is a worse rank.", rows: rankingChanges }
      : { source: "none" as const, note: "Two position snapshots are required. Rank movement is not invented.", rows: [] as { path: string; from: number; to: number; change: number }[] },
  };
}

export function formatIntelligenceReport(input: IntelligenceInput): string[] {
  const report = intelligenceReport(input);
  return [
    "INTELLIGENCE",
    `  As of: ${report.asOf}`,
    `  Search Console: ${report.searchConsole.note}`,
    `  Analytics: ${report.analytics.note}`,
    `  Keywords: ${report.queries.note}`,
    `  Indexable: ${report.indexation.indexable}; sitemap: ${report.indexation.inSitemap}; orphans: ${report.indexation.orphans}; errors: ${report.indexation.errors}`,
    `  Conversions in export: ${report.analytics.source === "none" ? "none" : report.conversions}`,
    `  Technical scores under 80: ${report.technical.length}`,
    `  Content due for review: ${report.decay.length}`,
    `  Experiment: ${report.experiment.note}`,
    `  Competitors: ${report.competitors.note}`,
    `  Ranking changes: ${report.rankingChanges.note}`,
  ];
}
