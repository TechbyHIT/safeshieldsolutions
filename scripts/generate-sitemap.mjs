/**
 * Writes a universal sitemap index + numbered child urlsets into public/.
 *
 *   public/sitemap.xml                 ← urlset of every indexable URL
 *   public/sitemap-1.xml               ← same urlset (Search Console already requests this)
 *   public/sitemap-chhattisgarh.xml
 *   public/sitemap-raipur.xml
 *   … named urlsets. Empty groups are omitted.
 * sitemap.xml is not an index. An index stays at 0 discovered pages until
 * Google successfully fetches a child, which is what failed in Search Console.
 *
 * Does not invent URLs — all locs come from src/lib/sitemap-urls.ts.
 * Child files are urlsets only (never nested sitemap indexes).
 *
 * Run: npm run sitemap:build
 */
import fs from "node:fs";
import path from "node:path";
import { gzipSync } from "node:zlib";
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
  getAllSitemapEntries,
  getSitemapPhase,
  getSitemapGroups,
  renderUrlsetXml,
} = await import("../src/lib/sitemap-urls.ts");

const publicDir = path.join(root, "public");
const legacyShardsDir = path.join(publicDir, "sitemaps");

fs.mkdirSync(publicDir, { recursive: true });

for (const name of fs.readdirSync(publicDir)) {
  if (/^sitemap(-.*)?\.xml(\.gz)?$/i.test(name)) {
    fs.rmSync(path.join(publicDir, name), { force: true });
  }
}

if (fs.existsSync(legacyShardsDir)) {
  fs.rmSync(legacyShardsDir, { recursive: true, force: true });
}

const phase = getSitemapPhase();
const entries = getAllSitemapEntries();
const groups = getSitemapGroups();

function writeXmlAndGzip(filePath, xml) {
  fs.writeFileSync(filePath, xml, "utf8");
  fs.writeFileSync(`${filePath}.gz`, gzipSync(xml, { level: 6 }));
}

for (const group of groups) {
  writeXmlAndGzip(path.join(publicDir, group.file), renderUrlsetXml(group.entries));
}

const allPages = renderUrlsetXml(entries);
writeXmlAndGzip(path.join(publicDir, "sitemap.xml"), allPages);
writeXmlAndGzip(path.join(publicDir, "sitemap-1.xml"), allPages);

const metaPath = path.join(root, "src", "generated", "sitemap-meta.ts");
fs.mkdirSync(path.dirname(metaPath), { recursive: true });
fs.writeFileSync(
  metaPath,
  `/** Written by \`npm run sitemap:build\`. Fallback values keep typecheck working before a generate. */\nexport const SITEMAP_URL_COUNT = ${entries.length};\nexport const SITEMAP_SHARD_COUNT = ${groups.length};\n`,
  "utf8",
);

const names = groups.map((group) => group.file).join(", ");
const raipurFile = groups.find((group) => group.id === "raipur")?.file ?? groups[0]?.file;
const shardBytes = fs.statSync(path.join(publicDir, raipurFile)).size;
console.log(
  `[sitemap:build] phase ${phase} — ${entries.length.toLocaleString()} URLs in ${groups.length} child urlset(s) (${names}) → public/sitemap.xml`,
);
console.log(
  `[sitemap:build] first child ${Math.round(shardBytes / 1024).toLocaleString()} KB uncompressed (gzip alongside for nginx gzip_static)`,
);
