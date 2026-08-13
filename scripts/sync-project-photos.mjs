import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEST = path.join(ROOT, "public", "images", "photos");
const ALLOWED = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const MIN_BYTES = 8 * 1024;

const DUMP_ROOTS = [
  path.join(ROOT, "images", "FINIALIZED PHOTOS"),
  path.join(ROOT, "images", "FINIALIZED PHOTOS - 1"),
  path.join(ROOT, "images", "FINIALIZED PHOTOS - 2"),
  path.join(ROOT, "images", "FINIALIZED PHOTOS - 3"),
  path.join(ROOT, "images", "FINIALIZED PHOTOS - 4"),
];

function classifyFolder(name) {
  const n = name.toLowerCase().replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
  if (n.includes("siri")) return null;
  if (n.includes("invisible") && n.includes("window")) return "window-invisible-grills";
  if (n.includes("invisible") && n.includes("balcony")) return "balcony-invisible-grills";
  if (n.includes("child")) return "child-safety-grills";
  if (n.includes("cloth")) return "cloth-hangers";
  if (n.includes("cricket") || n.includes("sports")) return "cricket-nets";
  if (n.includes("duct") || n.includes("pigeon")) return "pigeon-safety-nets";
  if (n.includes("mosquito")) return "mosquito-nets";
  if (n.includes("pet")) return "pet-safety-nets";
  if (n.includes("spike")) return "bird-spikes";
  if (n.includes("safety") && (n.includes("balcony") || n.includes("net"))) return "safety-nets";
  return null;
}

function hashFile(filePath) {
  const hash = crypto.createHash("sha1");
  hash.update(fs.readFileSync(filePath));
  return hash.digest("hex");
}

function listFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFiles(full));
    else out.push(full);
  }
  return out;
}

function padName(index, ext) {
  return `${String(index).padStart(2, "0")}${ext}`;
}

function existingIndex(filename) {
  const match = filename.match(/^(\d+)\./);
  return match ? Number(match[1]) : 0;
}

const seen = new Set();
const folders = new Map();

function ensureFolder(folder) {
  if (!folders.has(folder)) {
    folders.set(folder, { max: 0, files: [] });
  }
  return folders.get(folder);
}

function ingestExisting() {
  if (!fs.existsSync(DEST)) return;
  for (const folder of fs.readdirSync(DEST, { withFileTypes: true })) {
    if (!folder.isDirectory()) continue;
    const destDir = path.join(DEST, folder.name);
    const state = ensureFolder(folder.name);
    for (const file of fs.readdirSync(destDir)) {
      const ext = path.extname(file).toLowerCase();
      if (!ALLOWED.has(ext)) continue;
      const full = path.join(destDir, file);
      seen.add(hashFile(full));
      state.files.push(file);
      state.max = Math.max(state.max, existingIndex(file));
    }
  }
}

function ingestDumps() {
  let added = 0;
  for (const dump of DUMP_ROOTS) {
    if (!fs.existsSync(dump)) continue;
    for (const entry of fs.readdirSync(dump, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const folder = classifyFolder(entry.name);
      if (!folder) continue;
      const state = ensureFolder(folder);
      const destDir = path.join(DEST, folder);
      fs.mkdirSync(destDir, { recursive: true });

      for (const file of listFiles(path.join(dump, entry.name))) {
        const ext = path.extname(file).toLowerCase();
        if (!ALLOWED.has(ext)) continue;
        const stat = fs.statSync(file);
        if (stat.size < MIN_BYTES) continue;
        const digest = hashFile(file);
        if (seen.has(digest)) continue;
        seen.add(digest);
        state.max += 1;
        const destName = padName(state.max, ext);
        fs.copyFileSync(file, path.join(destDir, destName));
        state.files.push(destName);
        added += 1;
      }
    }
  }
  return added;
}

function writeManifest() {
  const manifest = {};
  for (const [folder, state] of [...folders.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    manifest[folder] = state.files
      .slice()
      .sort((a, b) => existingIndex(a) - existingIndex(b) || a.localeCompare(b));
  }

  const jsonPath = path.join(ROOT, "scripts", "photo-manifest.json");
  fs.writeFileSync(jsonPath, `${JSON.stringify(manifest, null, 2)}\n`);

  const lines = ["/** Photo filenames per folder under public/images/photos/ */", "export const photoManifest = {"];
  for (const [folder, files] of Object.entries(manifest)) {
    lines.push(`  "${folder}": [`);
    for (const file of files) lines.push(`    "${file}",`);
    lines.push("  ],");
  }
  lines.push("} as const;", "", "export type PhotoFolder = keyof typeof photoManifest;", "");
  fs.writeFileSync(path.join(ROOT, "src", "config", "photo-manifest.ts"), lines.join("\n"));
  return manifest;
}

ingestExisting();
const added = ingestDumps();
const manifest = writeManifest();
const counts = Object.fromEntries(Object.entries(manifest).map(([k, v]) => [k, v.length]));
const total = Object.values(counts).reduce((sum, n) => sum + n, 0);
console.log(JSON.stringify({ added, total, counts }, null, 2));
