/**
 * After `next build`, assemble a runtime-only standalone tree.
 * Copies public + hashed CSS/JS. Strips source maps. Skips non-runtime files.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const standaloneDir = path.join(root, ".next", "standalone");
const staticDir = path.join(root, ".next", "static");
const publicDir = path.join(root, "public");

const SKIP_PUBLIC_NAMES = new Set([
  ".DS_Store",
  "Thumbs.db",
  "desktop.ini",
]);

const SKIP_PUBLIC_EXT = new Set([
  ".map",
  ".md",
  ".psd",
  ".ai",
  ".sketch",
  ".mp4",
  ".mov",
  ".webm",
]);

if (!fs.existsSync(standaloneDir)) {
  console.error("Missing .next/standalone — run next build first.");
  process.exit(1);
}

function shouldCopyPublic(name) {
  if (SKIP_PUBLIC_NAMES.has(name)) return false;
  const ext = path.extname(name).toLowerCase();
  return !SKIP_PUBLIC_EXT.has(ext);
}

function copyPublicFiltered(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const ent of fs.readdirSync(src, { withFileTypes: true })) {
    if (!shouldCopyPublic(ent.name)) continue;
    const from = path.join(src, ent.name);
    const to = path.join(dest, ent.name);
    if (ent.isDirectory()) copyPublicFiltered(from, to);
    else fs.copyFileSync(from, to);
  }
}

function stripSourceMaps(dir) {
  if (!fs.existsSync(dir)) return 0;
  let removed = 0;
  const stack = [dir];
  while (stack.length) {
    const current = stack.pop();
    if (!current) continue;
    let entries;
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const ent of entries) {
      const full = path.join(current, ent.name);
      if (ent.isDirectory()) {
        stack.push(full);
      } else if (ent.name.endsWith(".map")) {
        fs.rmSync(full, { force: true });
        removed += 1;
      }
    }
  }
  return removed;
}

const standalonePublic = path.join(standaloneDir, "public");
const standaloneStatic = path.join(standaloneDir, ".next", "static");

if (fs.existsSync(publicDir)) {
  if (fs.existsSync(standalonePublic)) {
    fs.rmSync(standalonePublic, { recursive: true, force: true });
  }
  copyPublicFiltered(publicDir, standalonePublic);
  console.log("Copied public/ → .next/standalone/public/ (runtime assets only)");
}

if (fs.existsSync(staticDir)) {
  fs.mkdirSync(path.dirname(standaloneStatic), { recursive: true });
  fs.cpSync(staticDir, standaloneStatic, { recursive: true });
  console.log("Copied .next/static → .next/standalone/.next/static/");
}

const maps = stripSourceMaps(standaloneDir);
if (maps) console.log(`Removed ${maps} source map file(s) from standalone`);

console.log("Standalone bundle ready for PM2.");
