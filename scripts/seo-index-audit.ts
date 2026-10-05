/**
 * Indexability report for the production sitemap.
 * Does not call Google and does not predict rankings.
 * Run: npm run seo:audit
 */
import { sitemapAuditSummary } from "../src/lib/seo-crawl";
import { SERVICE_ALIAS_REDIRECTS } from "../src/data/cg-local-seo";

const summary = sitemapAuditSummary();
const errors = summary.findings.filter((row) => row.flag === "ERROR");
const warnings = summary.findings.filter((row) => row.flag === "WARNING");

console.log("SITEMAP");
console.log(`  Total URLs:     ${summary.total}`);
console.log(`  Indexable URLs: ${summary.indexable}`);
console.log(`  Excluded URLs:  ${summary.excluded}`);
console.log(`  Invalid URLs:   ${summary.invalid}`);
for (const group of summary.groups) {
  console.log(`  ${group.file}: ${group.count}`);
}

console.log("\nRAIPUR");
console.log(`  URLs:           ${summary.raipur.total}`);
console.log(`  P0 pages:       ${summary.raipur.p0}`);
console.log(`  Sitemap URLs:   ${summary.raipur.inSitemap}`);
console.log(`  Orphans:        ${summary.raipur.orphans.length}`);
console.log(`  Canonical errors: ${summary.raipur.errors.length}`);

console.log("\nP0");
for (const row of summary.findings.filter((item) => item.priority === "P0")) {
  console.log(
    `  ${row.flag}  ${row.url}  depth ${row.depth ?? "unreachable"}  links ${row.internalLinks}  ${row.notes.join("; ")}`,
  );
}

console.log("\nORPHANS");
if (summary.orphans.length === 0) console.log("  none");
for (const row of summary.orphans) {
  console.log(`  ${row.priority}  ${row.url}  ${row.pageType}  parent ${row.recommendedParent}`);
}

console.log("\nWARNINGS");
if (warnings.length === 0) console.log("  none");
for (const row of warnings.slice(0, 30)) {
  console.log(`  ${row.priority}  ${row.url}  ${row.notes.join("; ")}`);
}
if (warnings.length > 30) console.log(`  … ${warnings.length - 30} more`);

console.log("\nREDIRECTS (single hop, not in the sitemap)");
for (const item of SERVICE_ALIAS_REDIRECTS) {
  console.log(`  ${item.source} → ${item.destination}`);
}
console.log("  /chhattisgarh/raipur/areas/atal-nagar → /chhattisgarh/raipur/areas/naya-raipur");
console.log("  /chhattisgarh/raipur/pigeon-nets → /chhattisgarh/raipur/pigeon-safety-nets");
console.log("  /locations/chhattisgarh → /chhattisgarh");

console.log("\nNOT CREATED");
console.log("  sitemap-projects.xml — no verified project case studies");

if (errors.length) {
  console.log("\nERRORS");
  for (const row of errors) console.log(`  ${row.url}  ${row.notes.join("; ")}`);
  process.exit(1);
}

console.log("\nPASS — sitemap URLs are self-canonical and indexable. Raipur P0 has no errors.");
