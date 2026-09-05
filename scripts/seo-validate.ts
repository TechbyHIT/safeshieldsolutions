/**
 * Validate sitemap integrity, robots, and URL uniqueness.
 * Run: npm run seo:validate
 */
import { CITIES } from "../src/data/cities";
import { getAreasForCity } from "../src/data/areas";
import {
  STATIC_PATHS,
  SITEMAP_SHARD_SIZE,
  canonicalOrigin,
  getAllSitemapEntries,
  getSitemapIndexLocs,
  getSitemapPhase,
  getSitemapShardCount,
  getTotalUrlCount,
  NOINDEX_PATHS,
  renderSitemapIndexXml,
  renderUrlsetXml,
  shardSitemapEntries,
  xmlEscape,
} from "../src/lib/sitemap-urls";
import { site } from "../src/config/site";

const errors: string[] = [];

function assert(cond: boolean, msg: string) {
  if (!cond) errors.push(msg);
}

const phase = getSitemapPhase();
const entries = getAllSitemapEntries();
const total = getTotalUrlCount();
const shards = shardSitemapEntries(entries);
const shardCount = getSitemapShardCount();

assert(total > 0, "Sitemap URL count is 0");
assert(entries[0]?.path === "/", "Home URL is not first");
assert(shardCount === shards.length, "Shard count mismatch");
assert(shards.every((s) => s.length <= SITEMAP_SHARD_SIZE), `A urlset exceeds ${SITEMAP_SHARD_SIZE} URLs`);
assert(shards.every((s) => s.length <= 50_000), "A urlset exceeds Google’s 50k limit");
assert(shardCount <= 500, "Too many sitemap shards");

const seen = new Set<string>();
for (const entry of entries) {
  assert(entry.path.startsWith("/"), `Path not rooted: ${entry.path}`);
  assert(entry.path === entry.path.toLowerCase(), `Non-lowercase path: ${entry.path}`);
  assert(!entry.path.includes("?"), `Query parameter URL: ${entry.path}`);
  assert(entry.path === "/" || !entry.path.endsWith("/"), `Trailing slash: ${entry.path}`);
  assert(entry.loc.startsWith("https://"), `Non-HTTPS loc: ${entry.loc}`);
  assert(!seen.has(entry.loc), `Duplicate loc: ${entry.loc}`);
  seen.add(entry.loc);
}

for (const path of NOINDEX_PATHS) {
  assert(!entries.some((e) => e.path === path), `noindex path in sitemap: ${path}`);
}

for (const p of STATIC_PATHS) {
  assert(!p.startsWith("/api/"), `Static path looks private: ${p}`);
  assert(entries.some((e) => e.path === p), `Missing hub: ${p}`);
}

const locs = getSitemapIndexLocs();
assert(locs.every((u) => u.startsWith("https://")), "Sitemap index loc is not HTTPS");
assert(Boolean(locs[0]?.endsWith("/sitemap-1.xml")), "First child sitemap missing (/sitemap-1.xml)");
assert(
  locs.every((u) => /\/sitemap-\d+\.xml$/.test(u) && !u.includes("/sitemaps/")),
  "Child sitemaps must be /sitemap-N.xml at the site root (not nested under /sitemaps/)",
);
assert(site.url.replace(/\/$/, "").startsWith("https://"), `site.url is not HTTPS: ${site.url}`);
assert(canonicalOrigin() === site.url.replace(/\/$/, ""), "Canonical origin drift");

const sampleXml = renderUrlsetXml(entries.slice(0, 3));
assert(sampleXml.includes("<urlset"), "urlset XML missing root");
assert(!sampleXml.includes("<sitemapindex"), "Child sitemap must be a urlset, not a nested index");
assert(xmlEscape(`&<>"'`) === "&amp;&lt;&gt;&quot;&apos;", "XML escape incomplete");

const indexXml = renderSitemapIndexXml(locs);
assert(indexXml.includes("<sitemapindex"), "sitemap index XML missing root");
assert(!indexXml.includes("<urlset"), "Index must list child sitemaps, not page URLs");

let areaHubs = 0;
for (const city of CITIES) areaHubs += getAreasForCity(city.slug).length;

console.log("SEO validation\n");
console.log(`  Sitemap phase:            ${phase}`);
console.log(`  Total indexable URLs:     ${total.toLocaleString()}`);
console.log(`  Child urlsets (≤${SITEMAP_SHARD_SIZE.toLocaleString()}): ${shardCount}`);
console.log(`  Area hubs:                ${areaHubs}`);
console.log(`  Sitemap index children:   ${locs.length}`);

if (errors.length) {
  console.log("\nFAILED:");
  for (const e of errors) console.log(`  - ${e}`);
  process.exit(1);
}

console.log("\nOK — sitemap index + /sitemap-N.xml children, uniqueness, HTTPS, and 50k cap passed.");
