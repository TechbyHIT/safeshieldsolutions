/**
 * Readable sitemap inventory and quality report.
 * Run: npm run sitemap:audit
 *
 * Optional live fetch: SITEMAP_AUDIT_BASE=http://127.0.0.1:3010 npm run sitemap:audit
 */
import fs from "node:fs";
import path from "node:path";
import robots from "../src/app/robots";
import {
  canonicalOrigin,
  getAllSitemapEntries,
  getSitemapExclusions,
  getSitemapGroups,
  getSitemapIndexLocs,
  renderPublishedSitemapXml,
  renderUrlsetXml,
  summarizeSitemapInventory,
} from "../src/lib/sitemap-urls";
import { evaluateSeoPath } from "../src/lib/seo-quality-gate";

const errors: string[] = [];
const warnings: string[] = [];

function fail(message: string) {
  errors.push(message);
}

function xmlWellFormed(xml: string, label: string) {
  if (!xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
    fail(`${label}: missing UTF-8 XML declaration`);
  }
  if (/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[0-9a-fA-F]+;)/.test(xml)) {
    fail(`${label}: unescaped ampersand`);
  }
  const stack: string[] = [];
  const token = /<!--[\s\S]*?-->|<\?[\s\S]*?\?>|<\/?([A-Za-z][\w:.-]*)\b[^>]*?(\/)?>/g;
  let match: RegExpExecArray | null;
  while ((match = token.exec(xml))) {
    const full = match[0];
    if (full.startsWith("<!--") || full.startsWith("<?")) continue;
    const name = match[1];
    if (!name) continue;
    if (full.startsWith("</")) {
      const open = stack.pop();
      if (open !== name) fail(`${label}: mismatched </${name}> (open: ${open ?? "none"})`);
      continue;
    }
    if (match[2] === "/" || full.endsWith("/>")) continue;
    stack.push(name);
  }
  if (stack.length) fail(`${label}: unclosed <${stack.join(">, <")}>`);
}

const origin = canonicalOrigin();
const entries = getAllSitemapEntries();
const groups = getSitemapGroups();
const indexXml = renderPublishedSitemapXml();
const inventory = summarizeSitemapInventory();
const exclusions = getSitemapExclusions();
const robotsDoc = robots();
const today = new Date().toISOString().slice(0, 10);

if (!indexXml.includes("<sitemapindex")) fail("sitemap.xml is not a sitemap index");
if (indexXml.includes("<urlset")) fail("sitemap.xml still contains a urlset");
if (!origin.startsWith("https://")) fail(`Origin is not HTTPS: ${origin}`);
if (origin.includes("localhost")) fail("Origin is localhost");
if (origin !== "https://safeshieldsolutions.in") fail(`Unexpected production origin: ${origin}`);
xmlWellFormed(indexXml, "sitemap.xml");

const robotsSitemap = Array.isArray(robotsDoc.sitemap) ? robotsDoc.sitemap : [robotsDoc.sitemap];
if (!robotsSitemap.includes(`${origin}/sitemap.xml`)) {
  fail(`robots.txt does not declare ${origin}/sitemap.xml`);
}

const indexLocs = [...indexXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const expectedLocs = getSitemapIndexLocs();
if (indexLocs.length !== expectedLocs.length) {
  fail(`Index lists ${indexLocs.length} children, expected ${expectedLocs.length}`);
}
if (indexLocs.some((loc) => loc === `${origin}/sitemap.xml`)) fail("Index lists itself");
if (indexLocs.some((loc, i) => loc !== expectedLocs[i])) fail("Index loc order drifted from group order");

const seen = new Set<string>();
for (const group of groups) {
  const xml = renderUrlsetXml(group.entries);
  xmlWellFormed(xml, group.file);
  if (!xml.includes("<urlset")) fail(`${group.file} is not a urlset`);
  if (xml.includes("<sitemapindex")) fail(`${group.file} is nested as an index`);
  if (xml.includes("<priority>") || xml.includes("<changefreq>")) {
    fail(`${group.file} emits priority or changefreq`);
  }
  if (group.entries.length === 0) fail(`${group.file} is empty`);
  if (group.entries.length > 50_000) fail(`${group.file} exceeds 50,000 URLs`);
  if (Buffer.byteLength(xml, "utf8") > 50 * 1024 * 1024) fail(`${group.file} exceeds 50 MB`);
  for (const entry of group.entries) {
    if (seen.has(entry.loc)) fail(`Duplicate loc ${entry.loc}`);
    seen.add(entry.loc);
    const gate = evaluateSeoPath(entry.path);
    if (!gate.index) fail(`noindex URL in ${group.file}: ${entry.path}`);
    if (gate.canonicalPath !== entry.path) {
      fail(`Non-canonical sitemap URL ${entry.path} → ${gate.canonicalPath}`);
    }
    if (entry.path !== "/" && !entry.loc.startsWith(`${origin}/`)) {
      fail(`Host mismatch: ${entry.loc}`);
    }
    if (entry.path === "/" && entry.loc !== origin && entry.loc !== `${origin}/`) {
      fail(`Homepage loc is not the origin: ${entry.loc}`);
    }
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(entry.lastmod)) {
      fail(`lastmod is not W3C datetime: ${entry.path} ${entry.lastmod}`);
    }
  }
}

if (seen.size !== entries.length) {
  fail(`Grouped URLs (${seen.size}) do not match inventory (${entries.length})`);
}

if (entries.every((entry) => entry.lastmod.startsWith(today))) {
  fail("Every lastmod is today — do not stamp the build clock onto URLs");
}

for (const pathName of ["/", "/services", "/contact", "/chhattisgarh", "/chhattisgarh/raipur/invisible-grills"]) {
  if (!entries.some((entry) => entry.path === pathName)) fail(`Important page missing: ${pathName}`);
}

if (exclusions.some((item) => item.path === "/")) fail("Homepage was excluded");
if (entries.some((entry) => entry.path === "/seo-coverage")) fail("Internal page listed");
if (entries.some((entry) => entry.path === "/blog/premium-invisible-grills-gachibowli")) {
  fail("Out-of-area Hyderabad blog post is in the sitemap");
}
if (entries.some((entry) => entry.path.startsWith("/api/"))) fail("API route listed");

if ((inventory.byPageType.home ?? 0) !== 1) warnings.push("Homepage count is not 1");

const publicDir = path.join(process.cwd(), "public");
const publicIndex = path.join(publicDir, "sitemap.xml");
if (!fs.existsSync(publicIndex)) {
  warnings.push("public/sitemap.xml is missing — run npm run sitemap:build");
} else {
  const diskIndex = fs.readFileSync(publicIndex, "utf8");
  xmlWellFormed(diskIndex, "public/sitemap.xml");
  if (!diskIndex.includes("<sitemapindex")) fail("public/sitemap.xml is not a sitemap index");
  if (diskIndex.includes("<urlset")) fail("public/sitemap.xml still contains page urls");
  for (const loc of expectedLocs) {
    const file = loc.split("/").pop()!;
    const diskPath = path.join(publicDir, file);
    if (!fs.existsSync(diskPath)) {
      fail(`Index lists ${file} but public/${file} is missing`);
      continue;
    }
    const child = fs.readFileSync(diskPath, "utf8");
    xmlWellFormed(child, `public/${file}`);
    if (!child.includes("<urlset")) fail(`public/${file} is not a urlset`);
  }
}

console.log("SITEMAP AUDIT\n");
console.log(`Index:    ${origin}/sitemap.xml`);
console.log(`Origin:   ${origin}`);
console.log(`URLs:     ${inventory.total.toLocaleString()}`);
console.log(`Children: ${groups.length}`);
console.log("");
console.log("Child sitemaps");
for (const group of inventory.groups) {
  console.log(`  ${group.file.padEnd(32)} ${String(group.count).padStart(5)}`);
}
console.log("");
console.log("URL count by page type");
for (const [type, count] of Object.entries(inventory.byPageType).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${type.padEnd(28)} ${String(count).padStart(5)}`);
}
console.log("");
console.log(`Excluded candidates: ${exclusions.length}`);
for (const [reason, count] of Object.entries(inventory.exclusionsByReason).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${count.toString().padStart(4)}  ${reason}`);
}

const liveBase = process.env.SITEMAP_AUDIT_BASE ?? "http://127.0.0.1:3010";

async function probeLive(base: string) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const indexRes = await fetch(`${base}/sitemap.xml`, { redirect: "manual", signal: controller.signal });
    if (indexRes.status !== 200) fail(`Live ${base}/sitemap.xml returned ${indexRes.status}`);
    const body = await indexRes.text();
    if (!body.includes("<sitemapindex")) fail(`Live ${base}/sitemap.xml is not a sitemap index`);
    const type = indexRes.headers.get("content-type") ?? "";
    if (!type.includes("xml")) warnings.push(`Live sitemap Content-Type is ${type || "(missing)"}`);

    for (const loc of expectedLocs) {
      const file = loc.split("/").pop()!;
      const childRes = await fetch(`${base}/${file}`, { redirect: "manual", signal: controller.signal });
      if (childRes.status !== 200) {
        fail(`Live ${base}/${file} returned ${childRes.status}`);
        continue;
      }
      const childBody = await childRes.text();
      if (!childBody.includes("<urlset")) fail(`Live ${base}/${file} is not a urlset`);
    }

    const legacy = await fetch(`${base}/sitemap-1.xml`, { redirect: "manual", signal: controller.signal });
    if (![301, 302, 307, 308].includes(legacy.status) && legacy.status !== 200) {
      warnings.push(`Live /sitemap-1.xml returned ${legacy.status} (expected 301 to the index)`);
    }

    const robotsRes = await fetch(`${base}/robots.txt`, { signal: controller.signal });
    if (robotsRes.status !== 200) fail(`Live /robots.txt returned ${robotsRes.status}`);
    else {
      const robotsText = await robotsRes.text();
      if (!robotsText.includes(`Sitemap: ${origin}/sitemap.xml`)) {
        fail("Live robots.txt is missing the production Sitemap line");
      }
    }

    const samplePaths = [
      "/",
      "/services",
      "/contact",
      "/chhattisgarh",
      "/chhattisgarh/raipur/invisible-grills",
      "/guides/invisible-grills-near-me-guide",
    ];
    for (const sample of samplePaths) {
      const page = await fetch(`${base}${sample}`, { redirect: "manual", signal: controller.signal });
      if (page.status !== 200) fail(`Live ${sample} returned ${page.status}`);
    }
    console.log(`\nLive fetch (${base}): index, ${expectedLocs.length} children, robots.txt, and sample pages checked.`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    warnings.push(`Live HTTP skipped — ${base} is not reachable (${message}). Production status codes were not verified.`);
  } finally {
    clearTimeout(timer);
  }
}

await probeLive(liveBase);

if (warnings.length) {
  console.log("\nWarnings (not sitemap errors)");
  for (const warning of warnings) console.log(`  - ${warning}`);
}

if (errors.length) {
  console.log("\nFAILED:");
  for (const error of errors) console.log(`  - ${error}`);
  process.exit(1);
}

console.log("\nPASS — index lists child urlsets of unique, self-canonical HTTPS URLs.");
console.log("Sitemap inclusion does not guarantee Google will index every URL.");
