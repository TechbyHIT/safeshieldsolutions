/**
 * Validate sitemap integrity, robots, and URL uniqueness (no live crawl of 727k pages).
 * Run: npm run seo:validate
 */
import { CITIES } from "../src/data/cities";
import { getAreasForCity } from "../src/data/areas";
import { getAllAreaPageUrlSlugs } from "../src/lib/area-page-slugs";
import {
  STATIC_PATHS,
  getPathByGlobalIndex,
  getSitemapChunkCount,
  getSitemapIndexLocs,
  getTotalUrlCount,
  SITEMAP_CHUNK_SIZE,
} from "../src/lib/sitemap-urls";
import { site } from "../src/config/site";

const errors: string[] = [];

function assert(cond: boolean, msg: string) {
  if (!cond) errors.push(msg);
}

const total = getTotalUrlCount();
const chunks = getSitemapChunkCount();
assert(total > 0, "Sitemap URL count is 0");
assert(chunks === Math.ceil(total / SITEMAP_CHUNK_SIZE), "Chunk count mismatch");
assert(chunks <= 500, "Too many sitemap chunks");

const seen = new Set<string>();
const sample = Math.min(total, 2500);
for (let i = 0; i < sample; i++) {
  const path = getPathByGlobalIndex(i);
  assert(!!path, `Missing path at index ${i}`);
  if (!path) continue;
  assert(path.startsWith("/"), `Path not rooted: ${path}`);
  assert(path === path.toLowerCase(), `Non-lowercase path: ${path}`);
  assert(!path.includes("?"), `Query parameter URL: ${path}`);
  assert(path === "/" || !path.endsWith("/"), `Trailing slash: ${path}`);
  assert(!seen.has(path), `Duplicate path: ${path}`);
  seen.add(path);
}

const last = getPathByGlobalIndex(total - 1);
const pastEnd = getPathByGlobalIndex(total);
assert(!!last, "Last index has no path");
assert(pastEnd === null, "Index beyond total still returns a path (count/index drift)");

for (const p of STATIC_PATHS) {
  assert(!p.startsWith("/api/"), `Static path looks private: ${p}`);
}

const locs = getSitemapIndexLocs();
assert(locs.every((u) => u.startsWith("https://")), "Sitemap index loc is not HTTPS");
assert(Boolean(locs[0]?.includes("/sitemaps/0.xml")), "First child sitemap missing");
assert(Boolean(locs.at(-1)?.endsWith("/sitemaps/images.xml")), "Image sitemap not last in index");
assert(site.url.replace(/\/$/, "").startsWith("https://"), `site.url is not HTTPS: ${site.url}`);

const areaSlugs = getAllAreaPageUrlSlugs();
let areaHubs = 0;
for (const city of CITIES) areaHubs += getAreasForCity(city.slug).length;

console.log("SEO validation\n");
console.log(`  Total indexable URLs:     ${total.toLocaleString()}`);
console.log(`  Sitemap chunks (50k):     ${chunks}`);
console.log(`  Area hubs:                ${areaHubs}`);
console.log(`  Slugs per locality:       ${areaSlugs.length}`);
console.log(`  Sample uniqueness check:  ${sample} paths`);
console.log(`  Sitemap index children:   ${locs.length}`);

if (errors.length) {
  console.log("\nFAILED:");
  for (const e of errors) console.log(`  - ${e}`);
  process.exit(1);
}

console.log("\nOK — sitemap index, uniqueness sample, HTTPS, and count/index alignment passed.");
