import { describe, expect, it } from "vitest";
import {
  brokenLinkOpportunities,
  competitorLinkGap,
  DIRECTORY_CHECKS,
  linkableAssets,
  linkQuality,
  mentionReport,
  prospectDecision,
} from "@/lib/off-page-seo";

describe("off-page authority", () => {
  it("lists original pages that can be cited", () => {
    const assets = linkableAssets();
    expect(assets.some((asset) => asset.path === "/glossary" && asset.kind === "glossary")).toBe(true);
    expect(assets.some((asset) => asset.path === "/compare/invisible-grills-vs-safety-nets")).toBe(true);
    expect(assets.some((asset) => asset.kind === "local-page" && asset.path.includes("/raipur/"))).toBe(true);
    expect(DIRECTORY_CHECKS[0]?.name).toBe("Google Business Profile");
  });

  it("reviews an editorial page and ignores a paid or unrelated link", () => {
    expect(prospectDecision({ url: "https://example.com/balcony-safety", kind: "editorial", topicMatches: true, paid: false })).toBe("review");
    expect(prospectDecision({ url: "https://example.com/guest-post", kind: "editorial", topicMatches: true, paid: true })).toBe("ignore");
    expect(prospectDecision({ url: "https://example.com/casino", kind: "spam", topicMatches: true, paid: false })).toBe("ignore");
    expect(prospectDecision({ url: "https://example.com/cooking", kind: "mention", topicMatches: false, paid: false })).toBe("ignore");
  });

  it("does not invent mentions, competitor links, or broken-link opportunities", () => {
    expect(mentionReport().source).toBe("none");
    expect(competitorLinkGap().review).toEqual([]);
    expect(brokenLinkOpportunities(undefined, linkableAssets()).rows).toEqual([]);
    expect(linkQuality().source).toBe("none");
    const gap = competitorLinkGap([
      { domain: "news.example", competitorHas: true, weHave: false, kind: "editorial" },
      { domain: "spam.example", competitorHas: true, weHave: false, kind: "spam" },
    ]);
    expect(gap.review).toEqual(["news.example"]);
    const broken = brokenLinkOpportunities(
      [{ pageUrl: "https://news.example/old", brokenUrl: "https://old.example/grills", httpStatus: 404, topicMatches: true }],
      linkableAssets(),
    );
    expect(broken.rows[0]?.suggest).toBe("/compare/invisible-grills-vs-safety-nets");
  });
});
