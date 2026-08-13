/**
 * Report total programmatic URLs (file-based, no database).
 * Run: npm run pages:count
 */
import { CITIES } from "../src/data/cities";
import {
  CHENNAI_AREA_COUNT,
  HYDERABAD_AREA_COUNT,
  COIMBATORE_AREA_COUNT,
  KOCHI_AREA_COUNT,
} from "../src/data/areas";
import {
  countAreaPagesPerCity,
  getAllAreaPageUrlSlugs,
  getSlugCountStats,
} from "../src/lib/area-page-slugs";
import { getSitemapChunkCount, getTotalUrlCount } from "../src/lib/sitemap-urls";

const stats = getSlugCountStats();
const pageSlugs = getAllAreaPageUrlSlugs().length;

console.log("SafeShield Solutions — programmatic SEO scale\n");
console.log(`Cities: ${CITIES.map((c) => c.name).join(", ")}`);
console.log(`Chennai areas: ${CHENNAI_AREA_COUNT}`);
console.log(`Hyderabad areas: ${HYDERABAD_AREA_COUNT}`);
console.log(`Coimbatore areas: ${COIMBATORE_AREA_COUNT}`);
console.log(`Kochi areas: ${KOCHI_AREA_COUNT}`);
console.log(`High-intent URL slugs per locality: ${pageSlugs}`);
console.log(`Area-page services (canonical): ${stats.areaPageServices}`);
console.log("");
for (const city of CITIES) {
  const count =
    city.slug === "chennai"
      ? CHENNAI_AREA_COUNT
      : city.slug === "hyderabad"
        ? HYDERABAD_AREA_COUNT
        : city.slug === "coimbatore"
          ? COIMBATORE_AREA_COUNT
          : KOCHI_AREA_COUNT;
  console.log(`${city.name} area pages: ${countAreaPagesPerCity(count).toLocaleString()}`);
}
console.log(
  `City service + intent hubs: ${(pageSlugs * CITIES.length).toLocaleString()}`,
);
console.log(
  `URL slugs per locality (36 services × high-intent): ${pageSlugs.toLocaleString()}`,
);
console.log(`Total indexable URLs: ${getTotalUrlCount().toLocaleString()}`);
console.log(`Sitemap chunks (50k each): ${getSitemapChunkCount()}`);
