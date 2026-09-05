/**
 * Preflight for the static TypeScript catalog (no database).
 * Run: npm run catalog:build
 */
import { CITIES } from "../src/data/cities.ts";
import { SEO_SERVICES } from "../src/data/seo-services.ts";
import { getTotalAreaCount } from "../src/data/areas.ts";

if (!CITIES.length) {
  console.error("[catalog:build] No live cities in the catalog.");
  process.exit(1);
}
if (!SEO_SERVICES.length) {
  console.error("[catalog:build] No services in the catalog.");
  process.exit(1);
}

console.log(
  `[catalog:build] ${CITIES.length} cities (${CITIES.map((c) => c.slug).join(", ")}), ${SEO_SERVICES.length} services, ${getTotalAreaCount()} areas`,
);
