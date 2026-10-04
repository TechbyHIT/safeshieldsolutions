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
  renderSitemapIndexXml,
  renderUrlsetXml,
  xmlEscape,
} from "../src/lib/sitemap-urls";
import { evaluateSeoPath } from "../src/lib/seo-quality-gate";
import { site } from "../src/config/site";

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
assert(!groups.some((group) => group.file === "sitemap-districts.xml"), "Empty district sitemap was created");
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
  raipur?.entries[1]?.path === "/chhattisgarh/raipur/invisible-grills",
  "Raipur invisible grills is not second",
);
assert(
  raipur?.entries[2]?.path === "/chhattisgarh/raipur/safety-nets",
  "Raipur safety nets is not third",
);
assert(
  raipur?.entries[3]?.path === "/chhattisgarh/raipur/pigeon-safety-nets",
  "Raipur pigeon safety nets is not fourth",
);
assert(
  !entries.some((entry) => entry.path === "/pigeon-nets" || /^\/chhattisgarh\/.*\/pigeon-nets$/.test(entry.path)),
  "Redirect slug pigeon-nets is in the sitemap",
);
assert(!entries.some((entry) => entry.path.includes("atal-nagar")), "Atal Nagar is in the sitemap");
assert(!entries.some((entry) => entry.path.startsWith("/locations/chhattisgarh")), "Duplicate locations URL is in the sitemap");

for (const path of NOINDEX_PATHS) {
  assert(!entries.some((e) => e.path === path), `noindex path in sitemap: ${path}`);
}

for (const p of STATIC_PATHS) {
  assert(!p.startsWith("/api/"), `Static path looks private: ${p}`);
  assert(entries.some((e) => e.path === p), `Missing hub: ${p}`);
}

const locs = getSitemapIndexLocs();
assert(locs.every((u) => u.startsWith("https://")), "Sitemap index loc is not HTTPS");
assert(Boolean(locs[0]?.endsWith("/sitemap-chhattisgarh.xml")), "Index should list the state sitemap first");
assert(Boolean(locs[1]?.endsWith("/sitemap-raipur.xml")), "Index should list the Raipur sitemap second");
assert(
  locs.every((u) => /\/sitemap-[a-z0-9-]+\.xml$/.test(u) && !u.includes("/sitemaps/")),
  "Child sitemaps must be named files at the site root",
);
assert(site.url.replace(/\/$/, "").startsWith("https://"), `site.url is not HTTPS: ${site.url}`);
assert(canonicalOrigin() === site.url.replace(/\/$/, ""), "Canonical origin drift");

const sampleXml = renderUrlsetXml(entries.slice(0, 3));
assert(sampleXml.includes("<urlset"), "urlset XML missing root");
assert(!sampleXml.includes("<sitemapindex"), "Child sitemap must be a urlset, not a nested index");
assert(xmlEscape(`&<>"'`) === "&amp;&lt;&gt;&quot;&apos;", "XML escape incomplete");

const publishedXml = renderUrlsetXml(entries);
assert(publishedXml.includes("<urlset"), "Published sitemap.xml must list page URLs");
assert((publishedXml.match(/<loc>/g) ?? []).length === entries.length, "Published sitemap is missing URLs");
assert(!publishedXml.includes("<sitemapindex"), "sitemap.xml must not be an index");
const indexXml = renderSitemapIndexXml(locs);
assert(indexXml.includes("<sitemapindex"), "sitemap index helper missing root");

let areaHubs = 0;
for (const city of CITIES) areaHubs += getAreasForCity(city.slug).length;

console.log("SEO validation\n");
console.log(`  Sitemap phase:            ${phase}`);
console.log(`  Total indexable URLs:     ${total.toLocaleString()}`);
console.log(`  Child urlsets (≤${SITEMAP_SHARD_SIZE.toLocaleString()}): ${groups.length}`);
console.log(`  Area hubs:                ${areaHubs}`);
console.log(`  Sitemap index children:   ${locs.length}`);

if (errors.length) {
  console.log("\nFAILED:");
  for (const e of errors) console.log(`  - ${e}`);
  process.exit(1);
}

console.log("\nOK — named sitemap index, Raipur order, self-canonical URLs, HTTPS, and 50k cap passed.");
