import { describe, it, expect } from "vitest";
import { isIndexableInternalPath } from "@/lib/indexable-href";
import {
  buildAreaKeywordLinks,
  buildCityKeywordLinks,
  HOME_CITIES,
  HOME_CITY_AREAS,
  HOME_PRIMARY_INTENTS,
  HOME_TOP_SERVICES,
} from "@/config/home-seo-links";
import { cityAreaHighlights } from "@/config/mega-menu";
import { navigation } from "@/config/navigation";
import { getAllSitemapEntries } from "@/lib/sitemap-urls";

describe("crawler skip prevention", () => {
  it("emits only self-canonical indexable homepage keyword links", () => {
    const cityLinks = HOME_CITIES.flatMap((city) =>
      buildCityKeywordLinks(city.slug, city.name, HOME_TOP_SERVICES.slice(0, 8), HOME_PRIMARY_INTENTS),
    );
    const areaLinks = HOME_CITIES.flatMap((city) =>
      buildAreaKeywordLinks(
        city.slug,
        HOME_CITY_AREAS[city.slug] ?? [],
        HOME_TOP_SERVICES.slice(0, 6),
        HOME_PRIMARY_INTENTS,
      ),
    );
    expect(cityLinks.length).toBeGreaterThan(0);
    expect(areaLinks.length).toBeGreaterThan(0);
    for (const link of [...cityLinks, ...areaLinks]) {
      expect(isIndexableInternalPath(link.href), link.href).toBe(true);
    }
  });

  it("does not put redirect or xml URLs in the nav or area menu", () => {
    const hrefs = [
      ...navigation.main.map((item) => item.href),
      ...navigation.footer.map((item) => item.href),
      ...cityAreaHighlights.flatMap((city) => city.areas.map((area) => area.href)),
    ];
    expect(hrefs.some((href) => href.endsWith(".xml"))).toBe(false);
    expect(hrefs).not.toContain("/locations/chhattisgarh");
    for (const href of hrefs) {
      expect(isIndexableInternalPath(href), href).toBe(true);
    }
  });

  it("keeps privacy in the sitemap and locations/chhattisgarh out", () => {
    const paths = new Set(getAllSitemapEntries().map((entry) => entry.path));
    expect(paths.has("/privacy-policy")).toBe(true);
    expect(paths.has("/terms-of-service")).toBe(true);
    expect(paths.has("/locations/chhattisgarh")).toBe(false);
    expect(paths.has("/seo-coverage")).toBe(false);
  });
});
