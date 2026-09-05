/**
 * Writes a universal sitemap index + numbered child urlsets into public/.
 *
 *   public/sitemap.xml      ← sitemapindex
 *   public/sitemap-1.xml    ← urlset
 *   public/sitemap-2.xml
 *   …
 *
 * Does not invent URLs — all locs come from src/lib/sitemap-urls.ts.
 * Child files are urlsets only (never nested sitemap indexes).
 *
 * Run: npm run sitemap:build
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function loadDotEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  const text = fs.readFileSync(filePath, "utf8");
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

loadDotEnv(path.join(root, ".env.local"));
loadDotEnv(path.join(root, ".env"));

const {
  childSitemapFilename,
  getAllSitemapEntries,
  getSitemapPhase,
  getSitemapIndexLocs,
  renderSitemapIndexXml,
  renderUrlsetXml,
  shardSitemapEntries,
} = await import("../src/lib/sitemap-urls.ts");

const publicDir = path.join(root, "public");
const legacyShardsDir = path.join(publicDir, "sitemaps");

fs.mkdirSync(publicDir, { recursive: true });

for (const name of fs.readdirSync(publicDir)) {
  if (/^sitemap-\d+\.xml$/i.test(name)) {
    fs.rmSync(path.join(publicDir, name), { force: true });
  }
}

if (fs.existsSync(legacyShardsDir)) {
  fs.rmSync(legacyShardsDir, { recursive: true, force: true });
}

const phase = getSitemapPhase();
const entries = getAllSitemapEntries();
const shards = shardSitemapEntries(entries);

shards.forEach((shard, index) => {
  const filename = childSitemapFilename(index + 1);
  fs.writeFileSync(path.join(publicDir, filename), renderUrlsetXml(shard), "utf8");
});

fs.writeFileSync(path.join(publicDir, "sitemap.xml"), renderSitemapIndexXml(getSitemapIndexLocs()), "utf8");

const names = shards.map((_, i) => childSitemapFilename(i + 1)).join(", ");
console.log(
  `[sitemap:build] phase ${phase} — ${entries.length.toLocaleString()} URLs in ${shards.length} child urlset(s) (${names}) → public/sitemap.xml`,
);
