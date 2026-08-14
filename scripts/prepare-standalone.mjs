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

function copyDirMerge(src, dest) {
  if (!fs.existsSync(src)) return false;
  fs.mkdirSync(dest, { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
  return true;
}

const nextSrc = path.join(root, "node_modules", "next", "dist");
const nextDest = path.join(standaloneDir, "node_modules", "next", "dist");
for (const part of ["server", "shared", "lib", "compiled"]) {
  const from = path.join(nextSrc, part);
  const to = path.join(nextDest, part);
  if (copyDirMerge(from, to)) {
    console.log(`Synced next/dist/${part} into standalone`);
  }
}

const nextServerJs = path.join(nextDest, "server", "next-server.js");
const imageOptimizerJs = path.join(nextDest, "server", "image-optimizer.js");
if (fs.existsSync(nextServerJs)) {
  const nextServerSrc = fs.readFileSync(nextServerJs, "utf8");
  if (nextServerSrc.includes("./image-optimizer") && !fs.existsSync(imageOptimizerJs)) {
    console.error("FATAL: next-server.js requires ./image-optimizer but the file is missing.");
    process.exit(1);
  }
}

const maps = stripSourceMaps(standaloneDir);
if (maps) console.log(`Removed ${maps} source map file(s) from standalone`);

console.log("Standalone bundle ready for PM2.");
