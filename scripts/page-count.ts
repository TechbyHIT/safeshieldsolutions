/**
 * Report total programmatic URLs (file-based, no database).
 * Run: npm run pages:count
 */
import { CITIES } from "../src/data/cities";
import { getAreasForCity, getTotalAreaCount } from "../src/data/areas";
import {
  countAreaPagesPerCity,
  getAllAreaPageUrlSlugs,
  getSlugCountStats,
} from "../src/lib/area-page-slugs";
import {
  getSitemapPhase,
  getSitemapShardCount,
  getTotalUrlCount,
  SITEMAP_SHARD_SIZE,
} from "../src/lib/sitemap-urls";

const stats = getSlugCountStats();
const pageSlugs = getAllAreaPageUrlSlugs().length;
const cgPageSlugs = getAllAreaPageUrlSlugs("chhattisgarh").length;

console.log("SafeShield Solutions — programmatic SEO scale\n");
console.log(`Cities: ${CITIES.map((c) => c.name).join(", ")}`);
for (const city of CITIES) {
  console.log(`${city.name} areas: ${getAreasForCity(city.slug).length}`);
}
console.log(`Total areas: ${getTotalAreaCount()}`);
console.log(`High-intent URL slugs per locality: ${pageSlugs}`);
console.log(`Chhattisgarh URL slugs per locality: ${cgPageSlugs}`);
console.log(`Area-page services (canonical): ${stats.areaPageServices}`);
console.log("");
for (const city of CITIES) {
  const count = getAreasForCity(city.slug).length;
  console.log(
    `${city.name} area pages: ${countAreaPagesPerCity(count, city.slug).toLocaleString()}`,
  );
}
console.log(
  `City service + intent hubs: ${(pageSlugs * CITIES.length).toLocaleString()}`,
);
console.log(
  `URL slugs per locality (36 services × high-intent): ${pageSlugs.toLocaleString()}`,
);
console.log(`Sitemap phase: ${getSitemapPhase()}`);
console.log(`Sitemap URLs (capped, phase-aware): ${getTotalUrlCount().toLocaleString()}`);
console.log(`Sitemap shards (${SITEMAP_SHARD_SIZE.toLocaleString()} max): ${getSitemapShardCount()}`);
