import { describe, expect, it } from "vitest";
import { decideOpportunity, mergeOpportunities } from "@/lib/seo-opportunity";

describe("SEO opportunity discovery", () => {
  it("gives Raipur invisible grills one landing page and keeps price on that page", () => {
    const landing = decideOpportunity({
      serviceSlug: "invisible-grills",
      locationSlug: "raipur",
      intent: "transactional",
      audience: "Apartment owners",
    });
    const price = decideOpportunity({
      serviceSlug: "invisible-grills",
      locationSlug: "raipur",
      intent: "commercial",
      audience: "Owners comparing quotes",
    });
    const near = decideOpportunity({
      serviceSlug: "invisible-grills",
      locationSlug: "raipur",
      intent: "near-me",
      audience: "People ready to call",
    });
    expect(landing.treatment).toBe("dedicated-landing-page");
    expect(landing.canonicalPath).toBe("/chhattisgarh/raipur/invisible-grills");
    expect(landing.businessValue).toBeGreaterThanOrEqual(60);
    expect(price.treatment).toBe("section");
    expect(price.canonicalPath).toBe(landing.canonicalPath);
    expect(near.treatment).toBe("dedicated-landing-page");
    expect(near.canonicalPath).toBe("/chhattisgarh/raipur/invisible-grills-near-me");
  });

  it("merges two audiences with the same intent onto one URL", () => {
    const merged = mergeOpportunities([
      { serviceSlug: "invisible-grills", locationSlug: "raipur", intent: "transactional", audience: "Apartment owners" },
      { serviceSlug: "invisible-grills", locationSlug: "raipur", intent: "transactional", audience: "Independent house owners" },
      { serviceSlug: "invisible-grills", locationSlug: "raipur", intent: "commercial", audience: "People asking for a price" },
    ]);
    const landing = merged.find((item) => item.canonicalPath === "/chhattisgarh/raipur/invisible-grills");
    expect(landing?.audiences).toEqual(["Apartment owners", "Independent house owners", "People asking for a price"]);
    expect(merged.filter((item) => item.canonicalPath === "/chhattisgarh/raipur/invisible-grills")).toHaveLength(1);
  });

  it("routes the other shapes to an article, a category hub, a comparison, a service page, or nowhere new", () => {
    expect(decideOpportunity({ serviceSlug: "invisible-grills", intent: "informational", audience: "Researchers" })).toMatchObject({
      treatment: "supporting-article",
      canonicalPath: "/guides/invisible-grills-near-me-guide",
    });
    expect(decideOpportunity({ serviceSlug: "invisible-grills", locationSlug: "raipur", intent: "transactional", audience: "Owners", scope: "category" })).toMatchObject({
      treatment: "category-page",
      canonicalPath: "/chhattisgarh/raipur",
    });
    expect(decideOpportunity({ serviceSlug: "invisible-grills", intent: "comparison", audience: "Buyers choosing a product" })).toMatchObject({
      treatment: "comparison-page",
      canonicalPath: "/compare/invisible-grills-vs-safety-nets",
    });
    expect(decideOpportunity({ serviceSlug: "invisible-grills", intent: "transactional", audience: "National searchers" })).toMatchObject({
      treatment: "service-detail-page",
      canonicalPath: "/services/invisible-grills",
    });
    expect(decideOpportunity({ serviceSlug: "invisible-grills", locationSlug: "bemetara", intent: "transactional", audience: "Local owners" })).toMatchObject({
      treatment: "no-new-page",
      canonicalPath: "/chhattisgarh/raipur/invisible-grills",
    });
  });
});
