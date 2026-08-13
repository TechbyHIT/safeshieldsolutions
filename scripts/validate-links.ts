import { HOME_CITY_AREAS, HOME_TOP_SERVICES, HOME_PRIMARY_INTENTS } from "../src/config/home-seo-links";
import { cityAreaHighlights } from "../src/config/mega-menu";
import { getAreaByCitySlugs } from "../src/data/areas";
import { resolveAreaPageSlug } from "../src/lib/area-page-slugs";

const missingAreas: string[] = [];
const brokenSlugs = new Set<string>();

for (const [city, areas] of Object.entries(HOME_CITY_AREAS)) {
  for (const a of areas) {
    if (!getAreaByCitySlugs(city, a.slug)) missingAreas.push(`${city}/${a.slug}`);
  }
}

for (const svc of HOME_TOP_SERVICES) {
  for (const intent of HOME_PRIMARY_INTENTS) {
    const slug = `${svc.slug}${intent.suffix}`;
    if (!resolveAreaPageSlug(slug)) brokenSlugs.add(slug);
  }
}

for (const city of cityAreaHighlights) {
  for (const area of city.areas) {
    const parts = area.href.split("/").filter(Boolean);
    if (parts.length >= 3) {
      const citySlug = parts[0]!;
      const areaSlug = parts[1]!;
      const pageSlug = parts[2]!;
      if (!getAreaByCitySlugs(citySlug, areaSlug)) {
        missingAreas.push(`mega-menu:${citySlug}/${areaSlug}`);
      }
      if (!resolveAreaPageSlug(pageSlug)) {
        brokenSlugs.add(`mega:${pageSlug}`);
      }
    }
  }
}

console.log("Missing areas:", missingAreas.length);
for (const m of missingAreas) console.log(" -", m);
console.log("Broken page slugs:", brokenSlugs.size);
for (const s of [...brokenSlugs].slice(0, 30)) console.log(" -", s);
