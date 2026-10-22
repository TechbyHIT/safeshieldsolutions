import { describe, expect, it } from "vitest";
import {
  brokenOutbound,
  isPublishedInPhase,
  publishingWave,
  scoreLandingPage,
  searchPerformanceReport,
} from "@/lib/programmatic-seo";

describe("programmatic SEO controls", () => {
  it("publishes Raipur core before other towns and localities", () => {
    expect(publishingWave("/chhattisgarh/raipur/invisible-grills")).toBe(1);
    expect(publishingWave("/chhattisgarh/raipur/invisible-grills-near-me")).toBe(1);
    expect(publishingWave("/chhattisgarh/bhilai/invisible-grills")).toBe(2);
    expect(publishingWave("/chhattisgarh/raipur/areas/shankar-nagar/invisible-grills")).toBe(3);
    expect(publishingWave("/guides/how-to-compare-invisible-grill-quotes")).toBe(4);
    expect(isPublishedInPhase("/chhattisgarh/raipur/bird-spikes", 1)).toBe(true);
    expect(isPublishedInPhase("/chhattisgarh/bhilai/bird-spikes", 1)).toBe(false);
    expect(isPublishedInPhase("/chhattisgarh/bhilai/bird-spikes", 2)).toBe(true);
  });

  it("scores a linked self-canonical page above an orphan doorway", () => {
    const known = new Set(["/chhattisgarh/raipur/invisible-grills", "/chhattisgarh/raipur/safety-nets"]);
    const ready = scoreLandingPage({
      path: "/chhattisgarh/raipur/invisible-grills",
      inboundLinks: 4,
      inSitemap: true,
      wordCount: 1800,
      knownPaths: known,
      outbound: ["/chhattisgarh/raipur/safety-nets"],
    });
    const doorway = scoreLandingPage({
      path: "/chhattisgarh/raipur/invisible-grills-price",
      inboundLinks: 0,
      inSitemap: false,
      knownPaths: known,
    });
    expect(ready.score).toBe(100);
    expect(ready.index).toBe(true);
    expect(doorway.index).toBe(false);
    expect(doorway.checks.find((check) => check.id === "canonical")?.pass).toBe(false);
    expect(doorway.checks.find((check) => check.id === "internal-link")?.detail).toBe("Orphan");
    expect(doorway.score).toBeLessThan(ready.score);
  });

  it("treats a consolidated URL as intact and an unknown URL as broken", () => {
    const known = new Set(["/chhattisgarh/raipur/bird-spikes"]);
    expect(brokenOutbound(["/chhattisgarh/raipur/bird-spikes-price"], known)).toEqual([]);
    expect(brokenOutbound(["/not-a-real-page"], known)).toEqual(["/not-a-real-page"]);
  });

  it("does not invent search performance", () => {
    expect(searchPerformanceReport().source).toBe("none");
    expect(searchPerformanceReport().rows).toEqual([]);
    const report = searchPerformanceReport([
      { path: "/chhattisgarh/raipur/invisible-grills", clicks: 3, impressions: 40, position: 8 },
      { path: "/chhattisgarh/raipur/safety-nets", clicks: 1, impressions: 90, position: 12 },
    ]);
    expect(report.source).toBe("export");
    expect(report.rows[0]?.path).toBe("/chhattisgarh/raipur/safety-nets");
  });

  it("marks a short commercial page as thin and a repeated title as a duplicate", () => {
    const score = scoreLandingPage({
      path: "/chhattisgarh/raipur/invisible-grills",
      inboundLinks: 2,
      inSitemap: true,
      wordCount: 400,
      duplicateOf: "/chhattisgarh/bhilai/invisible-grills",
    });
    expect(score.checks.find((check) => check.id === "thin")?.pass).toBe(false);
    expect(score.checks.find((check) => check.id === "duplicate")?.pass).toBe(false);
  });
});
