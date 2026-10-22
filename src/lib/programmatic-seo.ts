/**
 * Programmatic publishing controls for catalogue combinations.
 * Scores use the index gate and the crawl graph. They do not predict rankings.
 */
import { CG_CORE_SERVICE_SLUGS, isCgPriorityPlace } from "@/data/cg-local-seo";
import { evaluateSeoPath } from "@/lib/seo-quality-gate";

export type PublishingWave = 1 | 2 | 3 | 4;

const CORE = new Set<string>(CG_CORE_SERVICE_SLUGS);

/** Which incremental wave a URL belongs to. Wave 1 is Raipur core. */
export function publishingWave(path: string): PublishingWave {
  if (
    path === "/" ||
    path === "/chhattisgarh" ||
    path === "/services" ||
    path === "/contact" ||
    path === "/chhattisgarh/raipur"
  ) {
    return 1;
  }

  const raipurService = path.match(/^\/chhattisgarh\/raipur\/([^/]+)$/);
  if (raipurService) {
    const slug = raipurService[1]!.replace(/-near-me$/, "");
    return CORE.has(slug) ? 1 : 2;
  }

  if (path.includes("/areas/") || path.includes("/districts/")) return 3;

  const town = path.match(/^\/chhattisgarh\/([^/]+)$/);
  if (town && isCgPriorityPlace(town[1]!)) return 2;

  const townService = path.match(/^\/chhattisgarh\/([^/]+)\/([^/]+)$/);
  if (townService && isCgPriorityPlace(townService[1]!)) return 2;

  if (path.startsWith("/services/") || path.startsWith("/chhattisgarh/")) return 2;

  return 4;
}

export function isPublishedInPhase(path: string, phase: PublishingWave): boolean {
  return publishingWave(path) <= phase;
}

export interface QualityCheck {
  id:
    | "indexation"
    | "canonical"
    | "internal-link"
    | "thin"
    | "duplicate"
    | "broken-link"
    | "sitemap";
  pass: boolean;
  weight: number;
  detail: string;
}

export interface QualityScore {
  path: string;
  score: number;
  index: boolean;
  checks: QualityCheck[];
}

export interface QualityScoreInput {
  path: string;
  inboundLinks: number;
  inSitemap: boolean;
  /** Set when a render measured the page. Omitted checks pass as not measured. */
  wordCount?: number;
  duplicateOf?: string;
  outbound?: string[];
  knownPaths?: Set<string>;
}

/**
 * A link is broken when it is outside the published set and does not
 * canonicalize to a published URL. Doorway URLs that consolidate are intact.
 */
export function brokenOutbound(hrefs: string[], knownPaths: Set<string>): string[] {
  const broken: string[] = [];
  for (const href of hrefs) {
    if (!href.startsWith("/") || href.startsWith("//")) {
      broken.push(href);
      continue;
    }
    if (knownPaths.has(href)) continue;
    const gate = evaluateSeoPath(href);
    if (knownPaths.has(gate.canonicalPath) && gate.canonicalPath !== href) continue;
    broken.push(href);
  }
  return broken;
}

export function scoreLandingPage(input: QualityScoreInput): QualityScore {
  const gate = evaluateSeoPath(input.path);
  const selfCanonical = gate.canonicalPath === input.path;
  const thin =
    input.wordCount === undefined ? false : input.wordCount < 1500 && input.path.split("/").length >= 4;
  const broken = brokenOutbound(input.outbound ?? [], input.knownPaths ?? new Set([input.path]));
  const checks: QualityCheck[] = [
    {
      id: "indexation",
      pass: gate.index,
      weight: 25,
      detail: gate.index ? "Indexable" : (gate.reasons[0] ?? "Noindex"),
    },
    {
      id: "canonical",
      pass: selfCanonical,
      weight: 20,
      detail: selfCanonical ? "Self canonical" : `Canonical is ${gate.canonicalPath}`,
    },
    {
      id: "sitemap",
      pass: input.inSitemap,
      weight: 10,
      detail: input.inSitemap ? "In the sitemap" : "Held out of the sitemap",
    },
    {
      id: "internal-link",
      pass: input.inboundLinks > 0,
      weight: 15,
      detail: input.inboundLinks > 0 ? `${input.inboundLinks} inbound links` : "Orphan",
    },
    {
      id: "thin",
      pass: !thin,
      weight: 10,
      detail:
        input.wordCount === undefined
          ? "Length not measured in this pass"
          : thin
            ? `${input.wordCount} words`
            : `${input.wordCount} words`,
    },
    {
      id: "duplicate",
      pass: !input.duplicateOf,
      weight: 10,
      detail: input.duplicateOf ? `Duplicates ${input.duplicateOf}` : "Title is unique in this batch",
    },
    {
      id: "broken-link",
      pass: broken.length === 0,
      weight: 10,
      detail: broken.length === 0 ? "Outbound targets resolve" : broken.slice(0, 3).join(", "),
    },
  ];
  const score = checks.reduce((sum, check) => sum + (check.pass ? check.weight : 0), 0);
  return { path: input.path, score, index: gate.index && selfCanonical, checks };
}

export interface SearchPerformanceRow {
  path: string;
  clicks: number;
  impressions: number;
  position: number;
}

export interface SearchPerformanceReport {
  source: "none" | "export";
  note: string;
  rows: SearchPerformanceRow[];
}

/** Local quality is not a ranking report. Rows appear only when an export is passed in. */
export function searchPerformanceReport(rows?: SearchPerformanceRow[]): SearchPerformanceReport {
  if (!rows || rows.length === 0) {
    return {
      source: "none",
      note: "No Search Console export is loaded. This report does not invent clicks, impressions, or positions.",
      rows: [],
    };
  }
  return {
    source: "export",
    note: "Figures come from the supplied export.",
    rows: [...rows].sort((a, b) => b.impressions - a.impressions),
  };
}
