import { describe, it, expect } from "vitest";
import { isValidServiceLocation } from "@/lib/service-location";
import {
  generateCatchAllStaticParams,
  isBuildTimePrerendered,
  listPrerenderedLocalSeoPaths,
  summarizePrerenderVsIndexable,
} from "@/lib/ssg-priority";
import { listIndexableLocalPaths } from "@/lib/local-seo-catalog";
import { getAllSitemapEntries } from "@/lib/sitemap-urls";
import { evaluateSeoPath } from "@/lib/seo-quality-gate";
import { buildLocalLandingCopy } from "@/lib/local-landing-content";
import { getCgPlace } from "@/data/cg-local-seo";
import { getSeoService } from "@/data/seo-services";

describe("isValidServiceLocation", () => {
  it("accepts a served town and catalogue service", () => {
    const result = isValidServiceLocation("invisible-grills", "bhilai");
    expect(result.valid).toBe(true);
    expect(result.indexable).toBe(true);
    expect(result.path).toBe("/chhattisgarh/bhilai/invisible-grills");
    expect(result.canonicalPath).toBe("/chhattisgarh/bhilai/invisible-grills");
  });

  it("rejects an unserved town instead of indexing it", () => {
    const result = isValidServiceLocation("invisible-grills", "bemetara");
    expect(result.valid).toBe(false);
    expect(result.indexable).toBe(false);
  });
});

describe("generateStaticParams vs indexability", () => {
  it("prerenders Raipur core service pages", () => {
    expect(isBuildTimePrerendered("/chhattisgarh/raipur")).toBe(true);
    expect(isBuildTimePrerendered("/chhattisgarh/raipur/invisible-grills")).toBe(true);
    expect(isBuildTimePrerendered("/chhattisgarh/raipur/safety-nets")).toBe(true);
    expect(isBuildTimePrerendered("/chhattisgarh/raipur/bird-spikes")).toBe(true);
    expect(isBuildTimePrerendered("/chhattisgarh/raipur/pigeon-safety-nets")).toBe(true);
    expect(isBuildTimePrerendered("/chhattisgarh/raipur/balcony-safety-nets")).toBe(true);
  });

  it("does not use the prerender list as the indexability database", () => {
    const onDemand = "/chhattisgarh/bhilai/zip-screens";
    expect(isBuildTimePrerendered(onDemand)).toBe(false);
    expect(isValidServiceLocation("zip-screens", "bhilai").indexable).toBe(true);
    expect(evaluateSeoPath(onDemand).index).toBe(true);
    expect(evaluateSeoPath(onDemand).canonicalPath).toBe(onDemand);
    const sitemap = new Set(getAllSitemapEntries().map((entry) => entry.path));
    expect(sitemap.has(onDemand)).toBe(true);
    expect(listIndexableLocalPaths().some((record) => record.path === onDemand)).toBe(true);
  });

  it("keeps generateStaticParams much smaller than the indexable catalog", () => {
    const summary = summarizePrerenderVsIndexable();
    expect(summary.catchAllParams).toBeGreaterThan(20);
    expect(summary.catchAllParams).toBeLessThan(800);
    expect(summary.buildTimeLocalSeoPages).toBeLessThan(summary.indexableLocalSeoPages);
    expect(summary.onDemandIsrPages).toBeGreaterThan(0);
    expect(summary.raipurPages).toBeGreaterThan(10);
  });

  it("lists Raipur catch-all params before other towns", () => {
    const params = generateCatchAllStaticParams();
    expect(params[0]).toEqual({ city: "chhattisgarh", segments: ["raipur"] });
    expect(params[1]?.segments[0]).toBe("raipur");
  });

  it("does not prerender every indexable path", () => {
    const prerendered = new Set(listPrerenderedLocalSeoPaths());
    const extra = listIndexableLocalPaths().filter((record) => !prerendered.has(record.path));
    expect(extra.length).toBeGreaterThan(0);
  });
});

describe("unique local copy", () => {
  it("writes different bodies for the same service in Raipur and Bhilai", () => {
    const service = getSeoService("invisible-grills")!;
    const raipur = buildLocalLandingCopy(getCgPlace("raipur")!, service, "general");
    const bhilai = buildLocalLandingCopy(getCgPlace("bhilai")!, service, "general");
    expect(raipur.title).toContain("Raipur");
    expect(bhilai.title).toContain("Bhilai");
    expect(raipur.h1).not.toBe(bhilai.h1);
    expect(raipur.intro).not.toBe(bhilai.intro);
    expect(raipur.explanation).not.toBe(bhilai.explanation);
    expect(raipur.description).not.toBe(bhilai.description);
    expect(raipur.contentAngle).not.toBe(bhilai.contentAngle);
    expect(raipur.title.toLowerCase()).not.toContain("near me");
    const durg = buildLocalLandingCopy(getCgPlace("durg")!, service, "general");
    expect(durg.contentAngle).not.toBe(raipur.contentAngle);
    expect(durg.contentAngle).not.toBe(bhilai.contentAngle);
  });
});
