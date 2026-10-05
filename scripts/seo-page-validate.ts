/**
 * Validate every intended indexable URL and print exact skip reasons.
 * Static checks always run. HTTP crawl runs when SEO_VALIDATE_BASE_URL is set.
 *
 *   npm run seo:pages
 *   SEO_VALIDATE_BASE_URL=https://safeshieldsolutions.in npm run seo:pages
 */
import { evaluateSeoPath } from "../src/lib/seo-quality-gate";
import { listIndexableLocalPaths } from "../src/lib/local-seo-catalog";
import { getAllSitemapEntries, getSitemapExclusions, getSitemapGroups } from "../src/lib/sitemap-urls";
import { buildCrawlGraph, inboundCounts } from "../src/lib/seo-crawl";
import { buildLocalLandingCopy } from "../src/lib/local-landing-content";
import { getCgPlace } from "../src/data/cg-local-seo";
import { getSeoService } from "../src/data/seo-services";
import { isBuildTimePrerendered, summarizePrerenderVsIndexable } from "../src/lib/ssg-priority";
import { site } from "../src/config/site";

const origin = (process.env.SEO_VALIDATE_BASE_URL ?? site.url).replace(/\/$/, "");
const runHttp = Boolean(process.env.SEO_VALIDATE_BASE_URL);

interface Row {
  url: string;
  status: string;
  indexable: string;
  sitemap: string;
  canonical: string;
  noindex: string;
  reason: string;
}

const intended = listIndexableLocalPaths();
const sitemap = new Set(getAllSitemapEntries().map((entry) => entry.path));
const exclusions = getSitemapExclusions();
const graph = buildCrawlGraph();
const inbound = inboundCounts(graph);

const titleSeen = new Map<string, string>();
const h1Seen = new Map<string, string>();
const descSeen = new Map<string, string>();

let valid = 0;
let skipped = 0;
let invalid = 0;
let noindex = 0;
let duplicate = 0;
let redirect = 0;
let missingContent = 0;
let canonicalErrors = 0;
let robotsErrors = 0;
let internalLinkIssues = 0;
const rows: Row[] = [];
const skipLog: string[] = [];

function noteSkip(url: string, reason: string) {
  skipped += 1;
  skipLog.push(`${url} — ${reason}`);
}

for (const record of intended) {
  const gate = evaluateSeoPath(record.path);
  const inSitemap = sitemap.has(record.path);
  const linked = (inbound.get(record.path) ?? 0) > 0;
  const reasons: string[] = [];

  if (!gate.index) {
    noindex += 1;
    reasons.push(gate.reasons[0] ?? "Not indexable");
  }
  if (gate.canonicalPath !== record.path) {
    canonicalErrors += 1;
    reasons.push(`Canonical is ${gate.canonicalPath}`);
  }
  if (!inSitemap) reasons.push("Missing from sitemap");
  if (!linked) {
    internalLinkIssues += 1;
    reasons.push("No internal link in crawl graph");
  }

  if (record.kind === "city-service" || record.kind === "city-service-near-me") {
    const parts = record.path.split("/").filter(Boolean);
    const place = getCgPlace(parts[1]!);
    const serviceSlug = parts[2]!.replace(/-near-me$/, "");
    const service = getSeoService(serviceSlug);
    if (place && service) {
      const copy = buildLocalLandingCopy(
        place,
        service,
        record.kind === "city-service-near-me" ? "near-me" : "general",
      );
      if (
        !copy.title.trim() ||
        !copy.h1.trim() ||
        !copy.description.trim() ||
        copy.intro.length < 80 ||
        copy.explanation.length < 80
      ) {
        missingContent += 1;
        reasons.push("Missing unique content");
      }
      const prevTitle = titleSeen.get(copy.title);
      if (prevTitle && prevTitle !== record.path) {
        duplicate += 1;
        reasons.push(`Duplicate title of ${prevTitle}`);
      } else {
        titleSeen.set(copy.title, record.path);
      }
      const prevH1 = h1Seen.get(copy.h1);
      if (prevH1 && prevH1 !== record.path) {
        duplicate += 1;
        reasons.push(`Duplicate H1 of ${prevH1}`);
      } else {
        h1Seen.set(copy.h1, record.path);
      }
      const prevDesc = descSeen.get(copy.description);
      if (prevDesc && prevDesc !== record.path) {
        duplicate += 1;
        reasons.push(`Duplicate description of ${prevDesc}`);
      } else {
        descSeen.set(copy.description, record.path);
      }
    } else {
      missingContent += 1;
      reasons.push("Missing place or service record");
    }
  }

  const ok = reasons.length === 0;
  if (ok) valid += 1;
  else {
    invalid += 1;
    noteSkip(record.path, reasons.join("; "));
  }

  rows.push({
    url: `${origin}${record.path}`,
    status: ok ? "PASS" : "SKIP",
    indexable: gate.index ? "yes" : "no",
    sitemap: inSitemap ? "yes" : "no",
    canonical: gate.canonicalPath,
    noindex: gate.index ? "no" : "yes",
    reason: ok ? "Self-canonical indexable landing page" : reasons.join("; "),
  });
}

const exclusionReasons = new Map<string, number>();
for (const item of exclusions) {
  exclusionReasons.set(item.reason, (exclusionReasons.get(item.reason) ?? 0) + 1);
}

console.log("SEO PAGE VALIDATION\n");
console.log(`TOTAL INTENDED INDEXABLE: ${intended.length}`);
console.log(`TOTAL VALID:              ${valid}`);
console.log(`TOTAL SKIPPED:            ${skipped}`);
console.log(`TOTAL INVALID:            ${invalid}`);
console.log(`TOTAL NOINDEX:            ${noindex}`);
console.log(`TOTAL DUPLICATE:          ${duplicate}`);
console.log(`TOTAL REDIRECT:           ${redirect}`);
console.log(`TOTAL MISSING CONTENT:    ${missingContent}`);
console.log(`CANONICAL ERRORS:         ${canonicalErrors}`);
console.log(`ROBOTS ERRORS:            ${robotsErrors}`);
console.log(`INTERNAL-LINK ISSUES:     ${internalLinkIssues}`);
console.log(`SITEMAP URLS:             ${sitemap.size}`);
console.log(`SITEMAP FILES:            ${getSitemapGroups().map((g) => g.file).join(", ")}`);

console.log("\nLEGITIMATE EXCLUSIONS (generated but not submitted)");
for (const [reason, count] of [...exclusionReasons.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${count}\t${reason}`);
}

if (skipLog.length) {
  console.log("\nSKIPPED URLS (exact reason)");
  for (const line of skipLog) console.log(`  ${line}`);
}

const prerender = summarizePrerenderVsIndexable();
console.log("\nBUILD-TIME vs ON-DEMAND");
console.log(`  Build-time local SEO:  ${prerender.buildTimeLocalSeoPages}`);
console.log(`  Raipur prerendered:    ${prerender.raipurPages}`);
console.log(`  Other priority SSG:    ${prerender.otherPriorityPages}`);
console.log(`  On-demand ISR:         ${prerender.onDemandIsrPages}`);
console.log(`  Sample ISR path:       ${prerender.sampleOnDemandPath}`);
console.log(
  `  Raipur invisible grills prerendered: ${isBuildTimePrerendered("/chhattisgarh/raipur/invisible-grills") ? "yes" : "no"}`,
);
console.log(
  `  Bhilai zip-screens prerendered:      ${isBuildTimePrerendered("/chhattisgarh/bhilai/zip-screens") ? "yes" : "no"}`,
);

const showcase = [
  "/chhattisgarh/raipur/bird-spikes-near-me",
  "/chhattisgarh/raipur/bird-spikes",
  "/chhattisgarh/raipur/invisible-grills",
  "/chhattisgarh/raipur/safety-nets",
  "/chhattisgarh/bhilai/bird-spikes-near-me",
  "/chhattisgarh/bhilai/zip-screens",
  "/chhattisgarh/districts/raipur",
  "/chhattisgarh",
];
console.log("\nURL | STATUS | INDEXABLE | SITEMAP | CANONICAL | NOINDEX | REASON");
for (const path of showcase) {
  const row = rows.find((item) => item.url.endsWith(path));
  if (!row) {
    console.log(`${origin}${path} | MISSING | - | - | - | - | Not in intended set`);
    continue;
  }
  console.log(
    `${row.url} | ${row.status} | ${row.indexable} | ${row.sitemap} | ${row.canonical} | ${row.noindex} | ${row.reason}`,
  );
}

if (runHttp) {
  console.log(`\nHTTP crawl against ${origin} (intended URLs)`);
  let httpFail = 0;
  for (const record of intended) {
    const url = `${origin}${record.path}`;
    try {
      const res = await fetch(url, { redirect: "manual" });
      const loc = res.headers.get("location");
      if (res.status >= 300 && res.status < 400) {
        redirect += 1;
        httpFail += 1;
        console.log(`  ${url} — redirect ${res.status} ${loc ?? ""}`);
      } else if (res.status !== 200) {
        httpFail += 1;
        console.log(`  ${url} — HTTP ${res.status}`);
      }
    } catch (error) {
      httpFail += 1;
      console.log(`  ${url} — fetch failed: ${(error as Error).message}`);
    }
  }
  console.log(`HTTP failures: ${httpFail}`);
} else {
  console.log("\nHTTP crawl skipped. Set SEO_VALIDATE_BASE_URL to crawl live URLs.");
}

if (skipped > 0) {
  process.exitCode = 1;
} else {
  console.log("\nPASS — intended indexable URLs are self-canonical, linked, and in the sitemap.");
}
