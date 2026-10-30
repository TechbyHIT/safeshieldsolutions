/**
 * The VPS runs linux-x64, so a bundle built on Windows or macOS needs the Linux
 * sharp binaries or every /_next/image request fails on the server.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const imgDir = path.join(root, ".next", "standalone", "node_modules", "@img");
const sharpPkg = JSON.parse(fs.readFileSync(path.join(root, "node_modules", "sharp", "package.json"), "utf8"));
const wanted = ["sharp-linux-x64", "sharp-libvips-linux-x64"];

if (!fs.existsSync(imgDir)) {
  console.error("Missing standalone @img folder; run next build first.");
  process.exit(1);
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "sharp-linux-"));
for (const name of wanted) {
  const version = sharpPkg.optionalDependencies?.[`@img/${name}`];
  if (!version) throw new Error(`sharp does not list @img/${name}`);
  const target = path.join(imgDir, name);
  if (fs.existsSync(path.join(target, "package.json"))) continue;
  const file = execSync(`npm pack @img/${name}@${version} --silent`, { cwd: tmp }).toString().trim().split(/\r?\n/).pop();
  fs.mkdirSync(target, { recursive: true });
  execSync(`tar -xzf "${path.join(tmp, file)}" -C "${target}" --strip-components=1`);
  console.log(`Added @img/${name}@${version} to standalone`);
}
fs.rmSync(tmp, { recursive: true, force: true });
