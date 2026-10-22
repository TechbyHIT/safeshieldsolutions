import { describe, expect, it } from "vitest";
import { getSeoService } from "@/data/seo-services";
import { composeServicePage } from "@/lib/compose-service-page";
import { getCgPlace } from "@/data/cg-local-seo";
import {
  buildBrandKeywordPlan,
  buildKeywordPlan,
  findCannibalization,
  normalizeKeyword,
} from "@/lib/keyword-targeting";

const service = getSeoService("invisible-grills")!;

function planFor(path: string, placeSlug?: string, area?: { name: string; slug: string }) {
  const place = placeSlug ? getCgPlace(placeSlug) : undefined;
  return buildKeywordPlan({
    serviceSlug: service.slug,
    serviceName: service.name,
    path,
    placeName: place?.name ?? (path.startsWith("/chhattisgarh/") && !placeSlug ? "Chhattisgarh" : undefined),
    placeSlug,
    areaName: area?.name,
    areaSlug: area?.slug,
  });
}

describe("keyword targeting", () => {
  const home = buildBrandKeywordPlan();
  const head = planFor("/services/invisible-grills");
  const pricing = planFor("/pricing/invisible-grills");
  const state = planFor("/chhattisgarh/invisible-grills");
  const raipur = planFor("/chhattisgarh/raipur/invisible-grills", "raipur");
  const near = planFor("/chhattisgarh/raipur/invisible-grills-near-me", "raipur");
  const locality = planFor("/chhattisgarh/raipur/areas/shankar-nagar/invisible-grills", "raipur", {
    name: "Shankar Nagar",
    slug: "shankar-nagar",
  });
  const doorway = planFor("/chhattisgarh/raipur/invisible-grills-price", "raipur");

  it("gives each indexable URL a different primary", () => {
    const plans = [home, head, pricing, state, raipur, near, locality];
    expect(findCannibalization(plans)).toEqual([]);
    expect(new Set(plans.map((item) => normalizeKeyword(item.primary.phrase))).size).toBe(plans.length);
  });

  it("assigns the primary by intent and place", () => {
    expect(home.primary.phrase).toBe("SafeShield Solutions");
    expect(home.primary.intent).toBe("navigational");
    expect(home.primary.branded).toBe(true);
    expect(head.primary.phrase).toBe("Invisible Grills");
    expect(head.primary.tail).toBe("short");
    expect(head.shortTail.map((item) => item.phrase)).toContain("Invisible Grills");
    expect(pricing.primary.phrase).toBe("Invisible Grills price");
    expect(pricing.commercialInvestigation.map((item) => normalizeKeyword(item.phrase))).toContain("invisible grills price");
    expect(state.primary.phrase).toBe("Invisible Grills in Chhattisgarh");
    expect(raipur.primary.phrase).toBe("Invisible Grills in Raipur");
    expect(raipur.primary.tail).toBe("long");
    expect(raipur.primary.geoModified).toBe(true);
    expect(raipur.longTail.map((item) => item.phrase)).toContain("Invisible Grills in Raipur");
    expect(near.primary.phrase).toBe("Invisible Grills Near Me in Raipur");
    expect(near.primary.intent).toBe("transactional");
    expect(locality.primary.phrase).toBe("Invisible Grills in Shankar Nagar, Raipur");
  });

  it("maps secondary, question, and competitor phrases onto the owning URL", () => {
    expect(raipur.secondary.map((item) => normalizeKeyword(item.phrase))).toEqual(
      expect.arrayContaining([
        "invisible grills price in raipur",
        "invisible grills installation in raipur",
        "how much do invisible grills cost in raipur",
        "best invisible grills company in raipur",
      ]),
    );
    expect(raipur.questions.length).toBeGreaterThan(0);
    expect(raipur.informational.length).toBeGreaterThan(0);
    expect(raipur.competitorGaps.every((item) => item.ownerPath === raipur.canonicalPath)).toBe(true);
    expect(raipur.transactional.some((item) => item.opportunity > (raipur.informational[0]?.opportunity ?? 0))).toBe(true);
  });

  it("suppresses phrases owned by another URL", () => {
    const suppressed = raipur.suppressed.map((item) => ({
      phrase: normalizeKeyword(item.phrase),
      ownerPath: item.ownerPath,
    }));
    expect(suppressed).toEqual(
      expect.arrayContaining([
        { phrase: "invisible grills", ownerPath: "/services/invisible-grills" },
        { phrase: "invisible grills near me in raipur", ownerPath: near.canonicalPath },
        { phrase: "invisible grills price", ownerPath: "/pricing/invisible-grills" },
      ]),
    );
    expect(locality.suppressed.map((item) => normalizeKeyword(item.phrase))).toContain(
      "invisible grills in raipur",
    );
    expect(raipur.metaKeywords.some((phrase) => /\bnear me\b/i.test(phrase))).toBe(false);
    expect(near.metaKeywords.some((phrase) => normalizeKeyword(phrase) === "invisible grills in raipur")).toBe(false);
  });

  it("sends price doorways to the URL that owns that price query", () => {
    const spikes = getSeoService("bird-spikes")!;
    const localPrice = buildKeywordPlan({
      serviceSlug: spikes.slug,
      serviceName: spikes.name,
      path: "/chhattisgarh/raipur/bird-spikes-price",
      placeName: "Raipur",
      placeSlug: "raipur",
    });
    expect(localPrice.canonicalPath).toBe("/chhattisgarh/raipur/bird-spikes");
    expect(localPrice.primary.phrase).toBe("Bird Spikes in Raipur");
    expect(doorway.canonicalPath).toBe("/pricing/invisible-grills");
    expect(doorway.primary.phrase).toBe(pricing.primary.phrase);
  });

  it("keeps near-me copy off the general city page", () => {
    const place = getCgPlace("raipur")!;
    const general = composeServicePage(place, service, "general");
    const local = composeServicePage(place, service, "near-me");
    expect(general.h1).toBe("Invisible Grills in Raipur");
    expect(general.h1.toLowerCase()).not.toContain("near me");
    expect(local.h1).toBe("Invisible Grills Near Me in Raipur");
    expect(general.nearMeMentions).toBe(0);
    expect(local.nearMeMentions).toBe(0);
  });
});
