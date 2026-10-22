import { describe, expect, it } from "vitest";
import { business } from "@/config/business";
import {
  buildArticleSchema,
  buildCourseSchema,
  buildEventSchema,
  buildJobPostingSchema,
  buildLocalBusinessSchema,
  buildOrganizationSchema,
  buildProductSchema,
  buildRecipeSchema,
  buildServiceSchema,
  buildVideoObjectSchema,
  buildWebsiteSchema,
} from "@/lib/schema";
import { validateStructuredData } from "@/lib/technical-seo";

describe("structured data", () => {
  it("publishes organization, website, local business, and service for real pages", () => {
    expect(validateStructuredData(buildOrganizationSchema())).toEqual([]);
    expect(validateStructuredData(buildWebsiteSchema())).toEqual([]);
    const local = buildLocalBusinessSchema("Raipur") as { "@type": string; areaServed: { name: string }[] };
    expect(local["@type"]).toBe("HomeAndConstructionBusiness");
    expect(local.areaServed.map((area) => area.name)).toContain("Raipur");
    expect(validateStructuredData(local)).toEqual([]);
    const service = buildServiceSchema("Invisible Grills", "Measured cable infill.", "/services/invisible-grills");
    expect(validateStructuredData(service)).toEqual([]);
    expect(service.provider).toEqual({ "@id": expect.stringContaining("#organization") });
  });

  it("marks guides as articles and dated posts as blog posts", () => {
    const article = buildArticleSchema({
      kind: "Article",
      headline: "How to compare invisible grill quotes",
      description: "What the survey checks.",
      path: "/guides/how-to-compare-invisible-grill-quotes",
    });
    expect(article?.["@type"]).toBe("Article");
    expect(validateStructuredData(article)).toEqual([]);
    const post = buildArticleSchema({
      kind: "BlogPosting",
      headline: "Invisible grills in Raipur",
      description: "A measured note.",
      path: "/blog/example",
      datePublished: "2026-10-22",
    });
    expect(post?.["@type"]).toBe("BlogPosting");
    expect(post).toMatchObject({ datePublished: "2026-10-22", author: { "@id": expect.stringContaining("#organization") } });
    expect(
      buildArticleSchema({
        kind: "BlogPosting",
        headline: "Undated",
        description: "Missing a date.",
        path: "/blog/undated",
      }),
    ).toBeNull();
  });

  it("omits product, video, event, job, recipe, and course markup without a real record", () => {
    expect(buildProductSchema({ name: "Invisible Grills", path: "/services/invisible-grills" })).toBeNull();
    expect(
      buildVideoObjectSchema({
        name: "Install",
        contentUrl: "https://safeshieldsolutions.in/video.mp4",
        thumbnailUrl: "https://safeshieldsolutions.in/images/photos/balcony-invisible-grills/168.webp",
        uploadDate: "2026-10-22",
        transcript: "",
      }),
    ).toBeNull();
    expect(buildEventSchema({})).toBeNull();
    expect(buildJobPostingSchema({})).toBeNull();
    expect(buildRecipeSchema({ name: "Cable mix", recipeIngredient: ["SS304"] })).toBeNull();
    expect(buildCourseSchema({ name: "Install training", description: "A class." })).toBeNull();
    expect(business.name).toBe("SafeShield Solutions");
  });
});
