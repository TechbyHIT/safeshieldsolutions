/**
 * Orphan detection and broken internal-link checks on the crawl graph.
 * Run: npm run links:audit
 */
import { navigation } from "../src/config/navigation";
import { cityAreaHighlights } from "../src/config/mega-menu";
import { buildCrawlGraph, inboundCounts, sitemapAuditSummary } from "../src/lib/seo-crawl";
import { evaluateSeoPath } from "../src/lib/seo-quality-gate";
import { isIndexableInternalPath, normalizeInternalPath } from "../src/lib/indexable-href";
import { getAllSitemapEntries } from "../src/lib/sitemap-urls";

const failures: string[] = [];
const warnings: string[] = [];

const navHrefs = [
  ...navigation.main.map((item) => item.href),
  ...navigation.footer.map((item) => item.href),
  ...cityAreaHighlights.flatMap((city) => city.areas.map((area) => area.href)),
];

for (const href of navHrefs) {
  if (!isIndexableInternalPath(href)) {
    failures.push(`Nav/mega-menu link is not indexable: ${href}`);
  }
}

const graph = buildCrawlGraph();
const inbound = inboundCounts(graph);
const sitemapPaths = new Set(getAllSitemapEntries().map((entry) => entry.path));

for (const [from, targets] of graph.entries()) {
  for (const target of targets) {
    const normalized = normalizeInternalPath(target);
    if (!normalized) continue;
    const gate = evaluateSeoPath(normalized);
    if (sitemapPaths.has(normalized) && (!gate.index || gate.canonicalPath !== normalized)) {
      failures.push(`${from} → ${normalized} (sitemap URL is not self-canonical indexable)`);
    }
    if (!gate.index && gate.canonicalPath !== normalized && !sitemapPaths.has(normalized)) {
      const allowedRedirect =
        normalized.startsWith("/locations/") ||
        normalized.includes("-price") ||
        normalized.includes("-nearby");
      if (!allowedRedirect) {
        warnings.push(`${from} → ${normalized} (consolidates to ${gate.canonicalPath})`);
      }
    }
  }
}

const summary = sitemapAuditSummary();
const orphanP0 = summary.orphans.filter((row) => row.priority === "P0");
const orphanP1 = summary.orphans.filter((row) => row.priority === "P1");

if (orphanP0.length) {
  failures.push(`${orphanP0.length} P0 sitemap URLs have no inbound internal links`);
  for (const row of orphanP0.slice(0, 12)) failures.push(`  orphan P0: ${row.url}`);
}

if (orphanP1.length > 5) {
  warnings.push(`${orphanP1.length} P1 sitemap URLs have no inbound internal links`);
}

for (const row of summary.findings.filter((item) => item.flag === "ERROR")) {
  failures.push(`${row.url}: ${row.notes.join("; ")}`);
}

const unlinkedIntended = [...sitemapPaths].filter((path) => (inbound.get(path) ?? 0) === 0 && path !== "/");
if (unlinkedIntended.length > orphanP0.length + orphanP1.length) {
  warnings.push(`${unlinkedIntended.length} sitemap URLs have zero modeled inbound links (long-tail)`);
}

console.log("INTERNAL LINK AUDIT\n");
console.log(`  Sitemap URLs:        ${sitemapPaths.size}`);
console.log(`  Crawl graph nodes:   ${graph.size}`);
console.log(`  Orphans (all):       ${summary.orphans.length}`);
console.log(`  Orphan P0:           ${orphanP0.length}`);
console.log(`  Crawl errors:        ${summary.invalid}`);
console.log(`  Nav failures:        ${failures.filter((line) => line.includes("Nav")).length}`);
console.log(`  Warnings:            ${warnings.length}`);

if (warnings.length) {
  console.log("\nWARNINGS:");
  for (const line of warnings.slice(0, 20)) console.log(`  ${line}`);
  if (warnings.length > 20) console.log(`  … ${warnings.length - 20} more`);
}

if (failures.length) {
  console.log("\nFAILED:");
  for (const line of failures.slice(0, 40)) console.log(`  ${line}`);
  if (failures.length > 40) console.log(`  … ${failures.length - 40} more`);
  process.exit(1);
}

console.log("\nPASS — navigation links resolve and P0 sitemap URLs are linked in the crawl graph.");
