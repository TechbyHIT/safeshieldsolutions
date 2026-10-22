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
  getSitemapGroups,
  getSitemapIndexLocs,
  getSitemapPhase,
  getTotalUrlCount,
  NOINDEX_PATHS,
  renderPublishedSitemapXml,
  renderSitemapIndexXml,
  renderUrlsetXml,
  summarizeSitemapInventory,
  xmlEscape,
} from "../src/lib/sitemap-urls";
import { evaluateSeoPath } from "../src/lib/seo-quality-gate";
import { isValidServiceLocation } from "../src/lib/service-location";
import { isBuildTimePrerendered, summarizePrerenderVsIndexable } from "../src/lib/ssg-priority";
import { listIndexableLocalPaths } from "../src/lib/local-seo-catalog";
import { site } from "../src/config/site";
import robots from "../src/app/robots";

const errors: string[] = [];

function assert(cond: boolean, msg: string) {
  if (!cond) errors.push(msg);
}

const phase = getSitemapPhase();
const entries = getAllSitemapEntries();
const total = getTotalUrlCount();
const groups = getSitemapGroups();

assert(total > 0, "Sitemap URL count is 0");
assert(groups.every((group) => group.entries.length <= SITEMAP_SHARD_SIZE), `A urlset exceeds ${SITEMAP_SHARD_SIZE} URLs`);
assert(groups.every((group) => group.entries.length <= 50_000), "A urlset exceeds Google’s 50k limit");
assert(groups.length <= 500, "Too many sitemap files");
assert(groups.some((group) => group.file === "sitemap-raipur.xml"), "Raipur sitemap missing");
assert(groups.some((group) => group.file === "sitemap-districts.xml"), "District sitemap missing");
assert(!groups.some((group) => group.file === "sitemap-projects.xml"), "Project sitemap was created without real projects");

const seen = new Set<string>();
for (const entry of entries) {
  assert(entry.path.startsWith("/"), `Path not rooted: ${entry.path}`);
  assert(entry.path === entry.path.toLowerCase(), `Non-lowercase path: ${entry.path}`);
  assert(!entry.path.includes("?"), `Query parameter URL: ${entry.path}`);
  assert(entry.path === "/" || !entry.path.endsWith("/"), `Trailing slash: ${entry.path}`);
  assert(entry.loc.startsWith("https://"), `Non-HTTPS loc: ${entry.loc}`);
  assert(!entry.loc.includes("localhost"), `Localhost loc: ${entry.loc}`);
  assert(!seen.has(entry.loc), `Duplicate loc: ${entry.loc}`);
  const gate = evaluateSeoPath(entry.path);
  assert(gate.index, `Sitemap URL is not indexable: ${entry.path}`);
  assert(gate.canonicalPath === entry.path, `Sitemap URL is not self-canonical: ${entry.path} -> ${gate.canonicalPath}`);
  seen.add(entry.loc);
}

const raipur = groups.find((group) => group.id === "raipur");
assert(raipur?.entries[0]?.path === "/chhattisgarh/raipur", "Raipur sitemap does not start with the city page");
assert(
  Boolean(raipur?.entries.some((entry) => entry.path === "/chhattisgarh/raipur/invisible-grills")),
  "Raipur invisible grills missing",
);
assert(
  Boolean(raipur?.entries.some((entry) => entry.path === "/chhattisgarh/raipur/safety-nets")),
  "Raipur safety nets missing",
);
assert(
  Boolean(raipur?.entries.some((entry) => entry.path === "/chhattisgarh/raipur/pigeon-safety-nets")),
  "Raipur pigeon safety nets missing",
);
assert(
  Boolean(raipur?.entries.some((entry) => entry.path === "/chhattisgarh/raipur/bird-spikes")),
  "Raipur bird spikes missing",
);
assert(
  Boolean(raipur?.entries.some((entry) => entry.path === "/chhattisgarh/raipur/bird-spikes-near-me")),
  "Raipur bird spikes near me missing",
);
assert(
  !entries.some((entry) => entry.path === "/pigeon-nets" || /^\/chhattisgarh\/.*\/pigeon-nets$/.test(entry.path)),
  "Redirect slug pigeon-nets is in the sitemap",
);
assert(!entries.some((entry) => entry.path.includes("atal-nagar")), "Atal Nagar is in the sitemap");
assert(!entries.some((entry) => entry.path.startsWith("/locations/chhattisgarh")), "Duplicate locations URL is in the sitemap");
assert(
  !entries.some((entry) => entry.path === "/blog/premium-invisible-grills-gachibowli"),
  "Out-of-area Hyderabad blog post is in the sitemap",
);
assert(
  !entries.every((entry) => entry.lastmod.startsWith(new Date().toISOString().slice(0, 10))),
  "Every lastmod is today",
);

for (const path of NOINDEX_PATHS) {
  assert(!entries.some((e) => e.path === path), `noindex path in sitemap: ${path}`);
}

for (const p of STATIC_PATHS) {
  assert(!p.startsWith("/api/"), `Static path looks private: ${p}`);
  assert(entries.some((e) => e.path === p), `Missing hub: ${p}`);
}

const locs = getSitemapIndexLocs();
assert(locs.every((u) => u.startsWith("https://")), "Sitemap index loc is not HTTPS");
assert(Boolean(locs[0]?.endsWith("/sitemap-pages.xml")), "Index should list the pages sitemap first");
assert(Boolean(locs.some((u) => u.endsWith("/sitemap-raipur.xml"))), "Index should list the Raipur sitemap");
assert(Boolean(locs.some((u) => u.endsWith("/sitemap-services.xml"))), "Index should list the services sitemap");
assert(
  locs.every((u) => /\/sitemap-[a-z0-9-]+\.xml$/.test(u) && !u.includes("/sitemaps/")),
  "Child sitemaps must be named files at the site root",
);
assert(!locs.some((u) => u.endsWith("/sitemap.xml")), "Index must not list itself");
assert(site.url.replace(/\/$/, "").startsWith("https://"), `site.url is not HTTPS: ${site.url}`);
assert(canonicalOrigin() === site.url.replace(/\/$/, ""), "Canonical origin drift");
const robotsDoc = robots();
const robotsSitemaps = Array.isArray(robotsDoc.sitemap) ? robotsDoc.sitemap : [robotsDoc.sitemap];
assert(robotsSitemaps.includes(`${canonicalOrigin()}/sitemap.xml`), "robots.txt is missing the production sitemap URL");

const groupedPaths = groups.flatMap((group) => group.entries.map((entry) => entry.path));
assert(groupedPaths.length === entries.length, "Child urlsets do not cover every sitemap URL");
assert(new Set(groupedPaths).size === entries.length, "A URL appears in more than one child sitemap");

const sampleXml = renderUrlsetXml(entries.slice(0, 3));
assert(sampleXml.includes("<urlset"), "urlset XML missing root");
assert(!sampleXml.includes("<sitemapindex"), "Child sitemap must be a urlset, not a nested index");
assert(!sampleXml.includes("<priority>"), "Child sitemap still emits priority");
assert(!sampleXml.includes("<changefreq>"), "Child sitemap still emits changefreq");
assert(xmlEscape(`&<>"'`) === "&amp;&lt;&gt;&quot;&apos;", "XML escape incomplete");

const publishedXml = renderPublishedSitemapXml();
assert(publishedXml.includes("<sitemapindex"), "sitemap.xml must be a sitemap index");
assert(!publishedXml.includes("<urlset"), "sitemap.xml must not be a page urlset");
assert((publishedXml.match(/<loc>/g) ?? []).length === groups.length, "Index is missing a child sitemap");
const indexXml = renderSitemapIndexXml(locs);
assert(indexXml.includes("<sitemapindex"), "sitemap index helper missing root");
assert(groups.some((group) => group.file === "sitemap-pages.xml"), "Pages sitemap missing");

const inventory = summarizeSitemapInventory();
assert(inventory.total === entries.length, "Inventory total drifted from sitemap entries");
assert((inventory.byPageType.home ?? 0) === 1, "Homepage missing from sitemap inventory");

let areaHubs = 0;
for (const city of CITIES) areaHubs += getAreasForCity(city.slug).length;

assert(isBuildTimePrerendered("/chhattisgarh/raipur/invisible-grills"), "Raipur invisible grills must be a build-time page");
assert(isBuildTimePrerendered("/chhattisgarh/raipur"), "Raipur city hub must be a build-time page");
assert(!isBuildTimePrerendered("/chhattisgarh/bhilai/zip-screens"), "Long-tail Bhilai page must stay on-demand ISR");
assert(isValidServiceLocation("zip-screens", "bhilai").indexable, "Bhilai zip-screens must remain indexable without SSG");
assert(
  entries.some((entry) => entry.path === "/chhattisgarh/bhilai/zip-screens"),
  "On-demand Bhilai zip-screens missing from sitemap",
);
assert(
  entries.some((entry) => entry.path === "/chhattisgarh/bhilai/invisible-grills"),
  "Bhilai invisible grills missing from sitemap",
);
const prerender = summarizePrerenderVsIndexable();
assert(prerender.buildTimeLocalSeoPages < prerender.indexableLocalSeoPages, "SSG set must be smaller than the indexable catalog");
assert(prerender.onDemandIsrPages > 0, "No on-demand ISR pages remain");
assert(listIndexableLocalPaths().length === prerender.indexableLocalSeoPages, "Indexable catalog drift");

console.log("SEO validation\n");
console.log(`  Sitemap phase:            ${phase}`);
console.log(`  Total indexable URLs:     ${total.toLocaleString()}`);
console.log(`  Child urlsets (≤${SITEMAP_SHARD_SIZE.toLocaleString()}): ${groups.length}`);
console.log(`  Area hubs:                ${areaHubs}`);
console.log(`  Sitemap index children:   ${locs.length}`);
console.log(`  Child files:              ${groups.map((group) => group.file).join(", ")}`);
console.log(`  Homepage:                 ${inventory.byPageType.home ?? 0}`);
console.log(`  Build-time local SEO:     ${prerender.buildTimeLocalSeoPages}`);
console.log(`  Raipur prerendered:       ${prerender.raipurPages}`);
console.log(`  Other priority SSG:       ${prerender.otherPriorityPages}`);
console.log(`  On-demand ISR (valid):    ${prerender.onDemandIsrPages}`);
console.log(`  Sample ISR path:          ${prerender.sampleOnDemandPath}`);

if (errors.length) {
  console.log("\nFAILED:");
  for (const e of errors) console.log(`  - ${e}`);
  process.exit(1);
}

console.log("\nOK — named sitemap index, Raipur order, self-canonical URLs, HTTPS, and 50k cap passed.");
