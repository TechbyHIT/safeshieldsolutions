import type { Metadata } from "next";
import { sitemapAuditSummary } from "@/lib/seo-crawl";
import { buildPageMetadata } from "@/lib/metadata";
import { citationReport } from "@/lib/answer-visibility";
import { linkableAssets, mentionReport } from "@/lib/off-page-seo";
import { scoreLandingPage, searchPerformanceReport } from "@/lib/programmatic-seo";
import { getSitemapPhase } from "@/lib/sitemap-urls";
import { buildSeoDashboard } from "@/lib/seo-dashboard";

export const metadata: Metadata = buildPageMetadata({
  title: "Raipur SEO coverage",
  description: "Internal sitemap and crawl report. Raipur is listed first.",
  path: "/seo-coverage",
  robots: { index: false, follow: false },
});

export default function SeoCoveragePage() {
  const summary = sitemapAuditSummary();
  const raipur = summary.raipur;

  return (
    <main className="container py-16">
      <h1 className="text-3xl font-bold">Raipur first</h1>
      <p className="mt-2 max-w-2xl text-sm text-neutral-600">
        Internal check only. It does not measure Google rankings or force indexing.
      </p>
      <h2 className="mt-8 text-xl font-bold">Raipur P0</h2>
      <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Raipur URLs" value={raipur.total} />
        <Stat label="P0 pages" value={raipur.p0} />
        <Stat label="In Raipur sitemap" value={raipur.inSitemap} />
        <Stat label="Orphans" value={raipur.orphans.length} />
        <Stat label="Canonical errors" value={raipur.errors.length} />
      </dl>
      <ul className="mt-6 space-y-2 text-sm">
        {raipur.findings
          .filter((row) => row.priority === "P0")
          .map((row) => (
            <li key={row.url}>
              {row.flag} · {row.url} · depth {row.depth ?? "—"} · {row.internalLinks} internal links
            </li>
          ))}
      </ul>
      <h2 className="mt-10 text-xl font-bold">Publishing and quality</h2>
      <p className="mt-2 max-w-2xl text-sm text-neutral-600">
        Phase {getSitemapPhase()} is active. A URL in a later wave stays out of the sitemap until that phase.
        Held this run: {summary.exclusions.filter((item) => item.reason.startsWith("Held")).length}.
      </p>
      <ul className="mt-4 space-y-2 text-sm">
        {summary.raipur.findings
          .filter((row) => row.priority === "P0")
          .map((row) => {
            const score = scoreLandingPage({
              path: row.url,
              inboundLinks: row.internalLinks,
              inSitemap: true,
              knownPaths: new Set(summary.findings.map((item) => item.url)),
            });
            return (
              <li key={`score-${row.url}`}>
                {score.score}/100 · {row.url}
                {score.checks.some((check) => !check.pass)
                  ? ` · ${score.checks
                      .filter((check) => !check.pass)
                      .map((check) => check.detail)
                      .join("; ")}`
                  : ""}
              </li>
            );
          })}
      </ul>
      <h2 className="mt-10 text-xl font-bold">Search performance</h2>
      <p className="mt-2 max-w-2xl text-sm text-neutral-600">{searchPerformanceReport().note}</p>
      <h2 className="mt-10 text-xl font-bold">Off-page</h2>
      <p className="mt-2 max-w-2xl text-sm text-neutral-600">{mentionReport().note}</p>
      <p className="mt-2 max-w-2xl text-sm text-neutral-600">{citationReport().note}</p>
      <p className="mt-2 text-sm text-neutral-600">Original pages available to cite: {linkableAssets().length}.</p>
      <h2 className="mt-10 text-xl font-bold">Sitemap</h2>
      <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Total URLs" value={summary.total} />
        <Stat label="Indexable URLs" value={summary.indexable} />
        <Stat label="Excluded candidates" value={summary.excluded} />
        <Stat label="Invalid URLs" value={summary.invalid} />
      </dl>
      <ul className="mt-4 list-disc pl-5 text-sm">
        {summary.groups.map((group) => (
          <li key={group.file}>
            {group.file}: {group.count}
          </li>
        ))}
      </ul>
      <h2 className="mt-10 text-xl font-bold">Orphans</h2>
      {summary.orphans.length === 0 ? (
        <p className="mt-3 text-sm text-neutral-600">No sitemap URL is missing an internal link.</p>
      ) : (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
          {summary.orphans.map((row) => (
            <li key={row.url}>
              {row.priority} {row.url} — link it from {row.recommendedParent}
            </li>
          ))}
        </ul>
      )}
      <h2 className="mt-10 text-xl font-bold">Reports</h2>
      <div className="mt-4 space-y-6">
        {buildSeoDashboard({
          submitted: summary.total,
          eligible: summary.indexable,
          exclusions: summary.exclusions,
          orphans: summary.orphans.map((row) => row.url),
          errors: summary.findings.filter((row) => row.flag === "ERROR").map((row) => ({ path: row.url, notes: row.notes })),
          phase: getSitemapPhase(),
        }).map((section) => (
          <section key={section.id}>
            <h3 className="font-semibold text-neutral-900">{section.title}</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-700">
              {section.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-neutral-200 p-4">
      <dt className="text-sm text-neutral-500">{label}</dt>
      <dd className="text-2xl font-bold">{value}</dd>
    </div>
  );
}
