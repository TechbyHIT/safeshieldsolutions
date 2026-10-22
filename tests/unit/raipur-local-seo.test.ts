import { describe, expect, it } from "vitest";
import { getIndexableLocalitiesForCity, LOCALITY_SERVICE_SLUGS } from "@/data/cg-hierarchy";
import { evaluateSeoPath } from "@/lib/seo-quality-gate";
import { getAllSitemapEntries } from "@/lib/sitemap-urls";
import { buildSearchSnippet } from "@/lib/search-snippets";
import { raipurLocalityLinks } from "@/config/raipur-seo";

describe("Raipur locality SEO", () => {
  const raipurAreas = getIndexableLocalitiesForCity("raipur");
  const sitemap = new Set(getAllSitemapEntries().map((entry) => entry.path));

  it("indexes the well-known Raipur neighbourhoods with unique copy", () => {
    const slugs = raipurAreas.map((area) => area.slug);
    expect(slugs[0]).toBe("naya-raipur");
    expect(slugs).toEqual(expect.arrayContaining([
      "shankar-nagar",
      "telibandha",
      "samta-colony",
      "avanti-vihar",
      "gudhiyari",
      "amanaka",
      "mowa",
      "pachpedi-naka",
      "birgaon",
    ]));
    expect(raipurAreas.every((area) => area.localContent.length >= 160)).toBe(true);
    expect(raipurAreas.length).toBeGreaterThanOrEqual(20);
  });

  it("puts each Raipur locality hub and core service in the sitemap", () => {
    for (const area of raipurAreas) {
      const hub = `/chhattisgarh/raipur/areas/${area.slug}`;
      expect(evaluateSeoPath(hub)).toMatchObject({ index: true, canonicalPath: hub });
      expect(sitemap.has(hub)).toBe(true);
      for (const service of LOCALITY_SERVICE_SLUGS) {
        const path = `${hub}/${service}`;
        expect(evaluateSeoPath(path)).toMatchObject({ index: true, canonicalPath: path });
        expect(sitemap.has(path)).toBe(true);
      }
    }
  });

  it("keeps homepage and area titles Raipur-first without stealing the city service title", () => {
    const home = buildSearchSnippet({ kind: "home" });
    const hub = buildSearchSnippet({
      kind: "locality",
      areaName: "Shankar Nagar",
      placeName: "Raipur",
      placeSlug: "raipur",
      summary: "Shankar Nagar is an established residential colony in Raipur.",
    });
    const cityService = buildSearchSnippet({
      kind: "place-service",
      serviceName: "Invisible Grills",
      serviceSlug: "invisible-grills",
      placeName: "Raipur",
      placeSlug: "raipur",
    });
    expect(home.title).toBe("Invisible Grills & Safety Nets in Raipur | SafeShield");
    expect(home.h1).toMatch(/Raipur/);
    expect(hub.title).toBe("Safety Nets and Invisible Grills in Shankar Nagar, Raipur");
    expect(cityService.title).toBe("Invisible Grills in Raipur");
    expect(home.title).not.toBe(cityService.title);
    expect(raipurLocalityLinks().some((item) => item.slug === "shankar-nagar")).toBe(true);
  });
});
