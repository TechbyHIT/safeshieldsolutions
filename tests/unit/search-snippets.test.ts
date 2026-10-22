import { describe, expect, it } from "vitest";
import { getCgPlace } from "@/data/cg-local-seo";
import { getSeoService } from "@/data/seo-services";
import { composeServicePage } from "@/lib/compose-service-page";
import { buildServiceMetadata } from "@/lib/metadata";
import {
  buildSearchSnippet,
  fitTitle,
  serviceCardDescription,
  snippetForPlaceService,
  stripMetaText,
} from "@/lib/search-snippets";

describe("search snippets", () => {
  const grill = getSeoService("invisible-grills")!;
  const nets = getSeoService("safety-nets")!;
  const raipur = getCgPlace("raipur")!;
  const bhilai = getCgPlace("bhilai")!;

  it("strips HTML and does not keep forced bold markup", () => {
    expect(stripMetaText("Safety <b>Nets</b> in Raipur")).toBe("Safety Nets in Raipur");
    expect(fitTitle("Safety Nets Manufacturers Suppliers in Raipur | Extra")).toContain("Safety Nets");
  });

  it("gives unique titles and descriptions for neighbouring town pages", () => {
    const a = snippetForPlaceService(raipur.slug, raipur.name, grill, "general");
    const b = snippetForPlaceService(bhilai.slug, bhilai.name, grill, "general");
    const c = snippetForPlaceService(raipur.slug, raipur.name, nets, "general");
    const near = snippetForPlaceService(raipur.slug, raipur.name, grill, "near-me");
    expect(a.title).toBe("Invisible Grills in Raipur");
    expect(b.title).toBe("Invisible Grills in Bhilai");
    expect(c.title).toBe("Safety Nets in Raipur");
    expect(near.title).toBe("Invisible Grills Near Me in Raipur");
    expect(new Set([a.description, b.description, c.description, near.description]).size).toBe(4);
    expect(a.description).not.toMatch(/<b>|<strong>/i);
    expect(a.intro).toMatch(/Raipur/);
    expect(a.intro).toMatch(/Invisible Grills/);
  });

  it("keeps catalogue, state, and town titles on different queries", () => {
    const catalog = buildSearchSnippet({
      kind: "service",
      serviceName: grill.name,
      serviceSlug: grill.slug,
      serviceDescription: grill.description,
    });
    const state = buildSearchSnippet({
      kind: "state-service",
      serviceName: grill.name,
      serviceSlug: grill.slug,
    });
    const town = snippetForPlaceService(raipur.slug, raipur.name, grill, "general");
    expect(catalog.title).toBe("Invisible Grills | SafeShield Solutions");
    expect(state.title).toBe("Invisible Grills in Chhattisgarh");
    expect(town.title).toBe("Invisible Grills in Raipur");
    expect(catalog.description.length).toBeGreaterThanOrEqual(70);
    expect(catalog.description.length).toBeLessThanOrEqual(160);
  });

  it("writes usable service-card copy without stuffing", () => {
    const card = serviceCardDescription({
      slug: "stainless-steel-invisible-grills",
      name: "Stainless Steel Invisible Grills",
      description: "Premium SS304 invisible grill systems.",
    });
    expect(card.toLowerCase()).not.toContain("premium ss304 invisible grill systems.");
    expect(card.length).toBeGreaterThan(40);
  });

  it("feeds unique copy into composed pages and Next metadata", () => {
    const page = composeServicePage(raipur, grill, "general");
    const meta = buildServiceMetadata(grill.name, grill.description, grill.slug);
    expect(page.title).toBe("Invisible Grills in Raipur");
    expect(page.h1).toBe(page.title);
    expect(page.description).not.toBe(`${page.title}. The quote follows a measurement of the opening in Raipur.`);
    expect(page.intro.startsWith("Invisible Grills in Raipur")).toBe(true);
    expect(meta.title).toBe("Invisible Grills | SafeShield Solutions");
  });
});
