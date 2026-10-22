/**
 * Internal SEO reports.
 * Clicks, positions, leads, and field vitals appear only from supplied exports.
 */
import { CONTENT_VERSION } from "@/lib/compose-service-page";
import { refreshStatus } from "@/lib/content-seo";
import { auditOnPage, snapshotLocalService } from "@/lib/on-page-seo";
import { researchMarket } from "@/lib/keyword-research";
import { publicationGate } from "@/lib/publication-gate";
import { clickThroughRate } from "@/lib/seo-intelligence";
import type { SearchPerformanceRow } from "@/lib/programmatic-seo";
import { buildOrganizationSchema } from "@/lib/schema";
import { validateStructuredData } from "@/lib/technical-seo";

export interface DashboardExports {
  search?: SearchPerformanceRow[];
  queries?: { query: string; path: string; clicks: number; impressions: number; position: number }[];
  leads?: { channel: "form" | "call" | "whatsapp"; qualified?: boolean }[];
  vitals?: { lcpMs: number; inpMs: number; cls: number };
  broken?: { path: string; target: string }[];
}

export interface DashboardSection {
  id: string;
  title: string;
  source: "measured" | "none" | "export";
  lines: string[];
}

export interface CoverageCounts {
  submitted: number;
  eligible: number;
  exclusions: { path: string; reason: string }[];
  orphans: string[];
  errors: { path: string; notes: string[] }[];
  phase: number;
}

function cap(lines: string[], max = 12): string[] {
  if (lines.length <= max) return lines;
  return [...lines.slice(0, max), `… ${lines.length - max} more`];
}

export function buildSeoDashboard(counts: CoverageCounts, exports?: DashboardExports, asOf = "2026-10-22"): DashboardSection[] {
  const search = exports?.search ?? [];
  const queries = exports?.queries ?? [];
  const leads = exports?.leads ?? [];
  const held = counts.exclusions.filter((item) => item.reason.startsWith("Held"));
  const reasons = new Map<string, number>();
  for (const item of counts.exclusions) reasons.set(item.reason, (reasons.get(item.reason) ?? 0) + 1);
  const clicks = search.reduce((sum, row) => sum + row.clicks, 0);
  const impressions = search.reduce((sum, row) => sum + row.impressions, 0);
  const ctr = clickThroughRate(clicks, impressions);
  const position = search.length ? search.reduce((sum, row) => sum + row.position, 0) / search.length : null;
  const qualified = leads.filter((lead) => lead.qualified === true).length;
  const knownQuality = leads.filter((lead) => lead.qualified !== undefined).length;
  const refresh = refreshStatus(CONTENT_VERSION, asOf);
  const sample = snapshotLocalService("raipur", "invisible-grills", "general", true);
  const onPage = sample ? auditOnPage(sample) : null;
  const missingMeta = onPage?.checks.filter((check) => check.status === "fail" && ["title", "description", "headings"].includes(check.id)) ?? [];
  const thin = sample && sample.wordCount < 1500 ? [sample.path] : [];
  const schemaErrors = validateStructuredData(buildOrganizationSchema());
  const gate = sample
    ? publicationGate({
        path: sample.path,
        title: sample.title,
        description: sample.description,
        h1: sample.h1,
        headings: sample.headings,
        body: sample.body,
        wordCount: sample.wordCount,
        imageAlt: sample.imageAlt,
        links: sample.links,
        schemaTypes: sample.schemaTypes,
        conversionLabel: sample.conversionLabel,
      })
    : null;
  const research = researchMarket({ placeSlug: "raipur", serviceSlugs: ["invisible-grills"] });

  const searchNote = search.length ? "export" : "none";
  const queryNote = queries.length ? "export" : "none";

  return [
    {
      id: "indexed-submitted",
      title: "Indexed versus submitted pages",
      source: "measured",
      lines: [
        `${counts.submitted} URLs are in the sitemap we submit.`,
        `${counts.eligible} of those pass the local index rules.`,
        "Google's indexed count is not in this report.",
      ],
    },
    {
      id: "exclusions",
      title: "Important indexing exclusions",
      source: "measured",
      lines: cap([...reasons.entries()].sort((a, b) => b[1] - a[1]).map(([reason, count]) => `${count} · ${reason}`)),
    },
    {
      id: "clicks-impressions",
      title: "Organic clicks and impressions",
      source: searchNote,
      lines: search.length ? [`${clicks} clicks`, `${impressions} impressions`] : ["No Search Console export is loaded."],
    },
    {
      id: "ctr-position",
      title: "CTR and average position",
      source: searchNote,
      lines: ctr === null || position === null ? ["No Search Console export is loaded."] : [`CTR ${(ctr * 100).toFixed(1)}%`, `Average position ${position.toFixed(1)}`],
    },
    {
      id: "query-url",
      title: "Query-to-URL mapping",
      source: queryNote,
      lines: queries.length ? cap(queries.map((row) => `${row.query} → ${row.path}`)) : ["No query export is loaded."],
    },
    {
      id: "conversions",
      title: "Landing-page conversions",
      source: leads.length ? "export" : "none",
      lines: leads.length
        ? [`${leads.length} lead events`, ...(["form", "call", "whatsapp"] as const).map((channel) => `${channel}: ${leads.filter((lead) => lead.channel === channel).length}`)]
        : ["No lead export is loaded."],
    },
    {
      id: "lead-quality",
      title: "Organic lead quality",
      source: knownQuality ? "export" : "none",
      lines: knownQuality ? [`${qualified} of ${knownQuality} leads were marked qualified.`] : ["Lead quality is not measurable until an export marks qualified leads."],
    },
    {
      id: "vitals",
      title: "Core Web Vitals",
      source: exports?.vitals ? "export" : "none",
      lines: exports?.vitals
        ? [`LCP ${exports.vitals.lcpMs} ms`, `INP ${exports.vitals.inpMs} ms`, `CLS ${exports.vitals.cls}`]
        : ["No field Core Web Vitals report is loaded."],
    },
    {
      id: "broken",
      title: "Broken links and images",
      source: exports?.broken?.length ? "export" : "measured",
      lines: exports?.broken?.length ? cap(exports.broken.map((row) => `${row.path} → ${row.target}`)) : ["No broken-link export is loaded. Crawl errors are listed with technical issues."],
    },
    {
      id: "duplicate-thin",
      title: "Duplicate and thin pages",
      source: "measured",
      lines: [
        thin.length ? `Thin sample: ${thin.join(", ")}` : "The Raipur invisible-grill sample is over 1,500 words.",
        "Duplicate titles are blocked when a second page repeats an existing title.",
      ],
    },
    {
      id: "metadata",
      title: "Missing metadata",
      source: "measured",
      lines: missingMeta.length ? missingMeta.map((check) => `${sample?.path}: ${check.detail}`) : ["The Raipur invisible-grill sample has a title, description, and H1."],
    },
    {
      id: "schema",
      title: "Schema validation errors",
      source: "measured",
      lines: schemaErrors.length ? schemaErrors : ["The organization record passed structured-data checks."],
    },
    {
      id: "orphans",
      title: "Orphan pages",
      source: "measured",
      lines: counts.orphans.length ? cap(counts.orphans) : ["No sitemap URL is missing an internal link."],
    },
    {
      id: "cannibalization",
      title: "Keyword cannibalization candidates",
      source: "measured",
      lines: research.competing.length
        ? research.competing.map((item) => `${item.keyword}: ${item.urls.join(", ")}`)
        : ["The Raipur invisible-grill primary keywords do not share two indexable URLs."],
    },
    {
      id: "refresh",
      title: "Content refresh opportunities",
      source: "measured",
      lines: [refresh.detail],
    },
    {
      id: "publishing",
      title: "Publishing quality",
      source: "measured",
      lines: [
        `Phase ${counts.phase}. ${held.length} URLs are held for a later phase.`,
        gate ? `${sample?.path}: ${gate.status}` : "No sample page was built.",
      ],
    },
    {
      id: "severity",
      title: "Technical issues by severity",
      source: "measured",
      lines: [
        `Critical: ${counts.errors.length} canonical or index errors.`,
        `Warning: ${counts.orphans.length} orphan URLs.`,
        `Info: ${held.length} URLs held for a later publishing phase.`,
      ],
    },
  ];
}
