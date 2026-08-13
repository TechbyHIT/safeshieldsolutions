/**
 * After a successful build, drop files that are not needed to run PM2.
 * Keeps: .next/standalone, deploy/, .env, package.json, src/ (for rebuilds)
 * Removes: node_modules, .next/cache, leftover .next artifacts, test caches
 *
 * Run: npm run deploy:prune
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function rmrf(rel) {
  const abs = path.join(root, rel);
  if (!fs.existsSync(abs)) return;
  fs.rmSync(abs, { recursive: true, force: true });
  console.log(`Removed ${rel}`);
}

const standalone = path.join(root, ".next", "standalone");
if (!fs.existsSync(standalone)) {
  console.error("ERROR: .next/standalone missing — run npm run build first.");
  process.exit(1);
}

console.log("Pruning build-only paths (runtime standalone kept)…\n");

rmrf("node_modules");
rmrf(".turbo");
rmrf(".eslintcache");
rmrf("tsconfig.tsbuildinfo");
rmrf("playwright-report");
rmrf("test-results");
rmrf("coverage");

const nextRoot = path.join(root, ".next");
if (fs.existsSync(nextRoot)) {
  for (const name of fs.readdirSync(nextRoot)) {
    // Keep hashed CSS/JS at .next/static — Next standalone may resolve from cwd.
    if (name === "standalone" || name === "static") continue;
    rmrf(path.join(".next", name));
  }
}

const standaloneCache = path.join(standalone, ".next", "cache");
if (fs.existsSync(standaloneCache)) {
  fs.rmSync(standaloneCache, { recursive: true, force: true });
  console.log("Removed .next/standalone/.next/cache (build cache; ISR recreates at runtime)");
}

console.log("\nDone. Start: pm2 start deploy/ecosystem.config.cjs");
console.log("Rebuild later: npm ci && npm run build && npm run deploy:prune");
