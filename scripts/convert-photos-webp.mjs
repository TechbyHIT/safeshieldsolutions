import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEST = path.join(ROOT, "public", "images", "photos");
const SOURCE_EXTS = new Set([".jpg", ".jpeg", ".png", ".avif"]);
const KEEP_EXTS = new Set([".webp"]);
const MAX_EDGE = 2560;
const QUALITY = 82;

function existingIndex(filename) {
  const match = filename.match(/^(\d+)\./);
  return match ? Number(match[1]) : 0;
}

async function convertFile(fullPath) {
  const ext = path.extname(fullPath).toLowerCase();
  const dir = path.dirname(fullPath);
  const stem = path.basename(fullPath, path.extname(fullPath));
  const outPath = path.join(dir, `${stem}.webp`);

  if (KEEP_EXTS.has(ext)) return { skipped: true, outPath: fullPath };

  const image = sharp(fullPath, { failOn: "none" }).rotate();
  const meta = await image.metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;
  const pipeline =
    width > MAX_EDGE || height > MAX_EDGE
      ? image.resize({
          width: MAX_EDGE,
          height: MAX_EDGE,
          fit: "inside",
          withoutEnlargement: true,
        })
      : image;

  await pipeline.webp({ quality: QUALITY, effort: 4 }).toFile(outPath);
  if (path.resolve(outPath) !== path.resolve(fullPath)) {
    fs.unlinkSync(fullPath);
  }
  return { skipped: false, outPath };
}

function writeManifest(manifest) {
  const jsonPath = path.join(ROOT, "scripts", "photo-manifest.json");
  fs.writeFileSync(jsonPath, `${JSON.stringify(manifest, null, 2)}\n`);

  const lines = [
    "/** Photo filenames per folder under public/images/photos/ */",
    "export const photoManifest = {",
  ];
  for (const [folder, files] of Object.entries(manifest)) {
    lines.push(`  "${folder}": [`);
    for (const file of files) lines.push(`    "${file}",`);
    lines.push("  ],");
  }
  lines.push("} as const;", "", "export type PhotoFolder = keyof typeof photoManifest;", "");
  fs.writeFileSync(path.join(ROOT, "src", "config", "photo-manifest.ts"), lines.join("\n"));
}

async function main() {
  if (!fs.existsSync(DEST)) {
    throw new Error(`Photo folder missing: ${DEST}`);
  }

  const folders = fs
    .readdirSync(DEST, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  let converted = 0;
  let skipped = 0;
  const manifest = {};

  for (const folder of folders) {
    const dir = path.join(DEST, folder);
    const names = fs
      .readdirSync(dir)
      .filter((file) => SOURCE_EXTS.has(path.extname(file).toLowerCase()) || KEEP_EXTS.has(path.extname(file).toLowerCase()))
      .sort((a, b) => existingIndex(a) - existingIndex(b) || a.localeCompare(b));

    const nextNames = [];
    for (const name of names) {
      const full = path.join(dir, name);
      const result = await convertFile(full);
      if (result.skipped) skipped += 1;
      else converted += 1;
      nextNames.push(path.basename(result.outPath));
    }
    manifest[folder] = [...new Set(nextNames)].sort(
      (a, b) => existingIndex(a) - existingIndex(b) || a.localeCompare(b),
    );
  }

  writeManifest(manifest);
  const total = Object.values(manifest).reduce((sum, files) => sum + files.length, 0);
  console.log(JSON.stringify({ converted, skipped, total, folders: Object.fromEntries(Object.entries(manifest).map(([k, v]) => [k, v.length])) }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
