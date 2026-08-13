/**
 * Disk usage for PM2 standalone deploy (cross-platform).
 * Run: npm run storage:report
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function dirSizeBytes(dir) {
  if (!fs.existsSync(dir)) return 0;
  let total = 0;
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
      if (ent.isDirectory()) stack.push(full);
      else if (ent.isFile()) {
        try {
          total += fs.statSync(full).size;
        } catch {
          /* skip */
        }
      }
    }
  }
  return total;
}

function fmt(bytes) {
  if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
  if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${bytes} B`;
}

const targets = [
  { label: "node_modules (build only)", path: "node_modules" },
  { label: ".next/standalone (PM2 runtime)", path: ".next/standalone" },
  { label: ".next/cache (delete after build)", path: ".next/cache" },
  { label: ".next/static (copied into standalone)", path: ".next/static" },
  { label: ".next/server (build artifact)", path: ".next/server" },
  { label: "ISR cache (runtime, grows)", path: ".next/standalone/.next/cache" },
  { label: "public/", path: "public" },
  { label: "src/", path: "src" },
];

console.log("SafeShield Solutions — storage report\n");
console.log(`Project: ${root}\n`);

const sizes = {};
for (const t of targets) {
  const abs = path.join(root, t.path);
  const bytes = dirSizeBytes(abs);
  sizes[t.path] = bytes;
  console.log(`  ${t.label.padEnd(44)} ${fs.existsSync(abs) ? fmt(bytes) : "(missing)"}`);
}

const standalone = sizes[".next/standalone"] ?? 0;
const nodeModules = sizes.node_modules ?? 0;
const cache = sizes[".next/cache"] ?? 0;
const isr = sizes[".next/standalone/.next/cache"] ?? 0;
const prodEstimate = standalone - isr + 80_000;

console.log("\n--- Estimates ---");
console.log(`  Dev tree (node_modules + .next):     ${fmt(standalone + nodeModules + cache)}`);
console.log(`  After deploy:prune (typical):        ${fmt(prodEstimate)} – ${fmt(prodEstimate + 80 * 1024 ** 2)}`);
console.log(`  50 sites × ~150 MB standalone:       ~${fmt(50 * 150 * 1024 ** 2)} (plus ISR per site)`);
console.log("\n--- Runtime (not files at build) ---");
console.log("  ~727k URLs are ISR on demand — not 727k files.");
console.log("  ISR HTML lives in .next/standalone/.next/cache and grows with crawl traffic.");
console.log("  Sitemaps are generated on the fly (no bulk XML dumps).");
console.log("\n  Safe ISR trim: pm2 stop safeshield-solutions && rm -rf .next/standalone/.next/cache && pm2 start deploy/ecosystem.config.cjs");
