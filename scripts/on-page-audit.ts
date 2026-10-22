/**
 * Readable site-wide on-page SEO report.
 * Run: npm run seo:on-page
 */
import { auditSiteSeo, formatSiteSeoReport } from "../src/lib/site-seo-audit";

const result = auditSiteSeo();
console.log(formatSiteSeoReport(result));
if (result.counts.critical > 0 || result.counts.high > 0) {
  process.exit(1);
}
