/**
 * Compare composed service pages. Fails when two towns are the same essay
 * with the place name removed.
 *
 *   npm run seo:content-audit
 */
import { CG_PRIORITY_PLACES } from "../src/data/cg-local-seo";
import { getSeoService } from "../src/data/seo-services";
import { cityServiceSlugsForPlace } from "../src/lib/local-seo-catalog";
import { composeServicePage } from "../src/lib/compose-service-page";
import { isBuildTimePrerendered } from "../src/lib/ssg-priority";
import { jaccard, normalizeForCompare, shingles } from "../src/lib/content-fingerprint";
import { getAllSitemapEntries } from "../src/lib/sitemap-urls";

const names = CG_PRIORITY_PLACES.map((place) => place.name);
const sitemap = new Set(getAllSitemapEntries().map((entry) => entry.path));
const failures: string[] = [];
let compared = 0;
let maxSimilarity = 0;

for (const place of CG_PRIORITY_PLACES) {
  for (const serviceSlug of cityServiceSlugsForPlace(place.slug)) {
    const service = getSeoService(serviceSlug);
    if (!service) continue;
    for (const intent of ["general", "near-me"] as const) {
      const page = composeServicePage(place, service, intent);
      if (!sitemap.has(page.path)) failures.push(`${page.path} missing from sitemap`);
      if (page.nearMeMentions > 0) failures.push(`${page.path} repeats "near me" ${page.nearMeMentions} times`);
      if (page.wordCount < 1500) failures.push(`${page.path} is under 1500 words (${page.wordCount})`);
      if (page.faqs.length < 2) failures.push(`${page.path} has too few FAQs`);
    }
  }
}

for (const serviceSlug of cityServiceSlugsForPlace("raipur")) {
  const service = getSeoService(serviceSlug);
  if (!service) continue;
  const pages = CG_PRIORITY_PLACES.filter((place) => cityServiceSlugsForPlace(place.slug).includes(serviceSlug)).map(
    (place) => composeServicePage(place, service, "general"),
  );
  for (let i = 0; i < pages.length; i += 1) {
    for (let j = i + 1; j < pages.length; j += 1) {
      const a = pages[i]!;
      const b = pages[j]!;
      const left = shingles(normalizeForCompare(a.sections.map((section) => section.paragraphs.join(" ")).join(" "), names));
      const right = shingles(normalizeForCompare(b.sections.map((section) => section.paragraphs.join(" ")).join(" "), names));
      const score = jaccard(left, right);
      compared += 1;
      if (score > maxSimilarity) maxSimilarity = score;
      if (score >= 0.98) {
        failures.push(`${a.path} ~ ${b.path} similarity ${score.toFixed(2)} after place names are removed`);
      }
    }
  }
}

const sample = composeServicePage(CG_PRIORITY_PLACES[0]!, getSeoService("invisible-grills")!, "general");
console.log("SEO CONTENT AUDIT\n");
console.log(`Sample ${sample.path}`);
console.log(`  Angle: ${sample.contentAngle}`);
console.log(`  Words: ${sample.wordCount}`);
console.log(`  FAQs: ${sample.faqs.length}`);
console.log(`  Sources: ${sample.sources.length}`);
console.log(`  Render: ${isBuildTimePrerendered(sample.path) ? "SSG" : "ISR"}`);
console.log(`  Sitemap: ${sitemap.has(sample.path) ? "yes" : "no"}`);
console.log(`Pairs compared: ${compared}`);
console.log(`Highest similarity after place-name removal: ${maxSimilarity.toFixed(2)}`);

if (failures.length) {
  console.log(`\nFAILED ${failures.length}`);
  for (const line of failures.slice(0, 40)) console.log(`  ${line}`);
  process.exit(1);
}

console.log("\nPASS — town pages use different technical modules, not a renamed essay.");
