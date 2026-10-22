import { describe, expect, it } from "vitest";
import { clickThroughRate, intelligenceReport } from "@/lib/seo-intelligence";

const indexation = { indexable: 10, inSitemap: 10, orphans: 0, errors: 0 };

describe("SEO intelligence", () => {
  it("reports local indexation and leaves Search Console and Analytics empty", () => {
    const report = intelligenceReport({ asOf: "2026-10-22", indexation });
    expect(report.searchConsole.source).toBe("none");
    expect(report.analytics.source).toBe("none");
    expect(report.queries.source).toBe("none");
    expect(report.competitors.source).toBe("none");
    expect(report.rankingChanges.source).toBe("none");
    expect(report.experiment.active).toBe(false);
    expect(report.indexation.orphans).toBe(0);
    expect(report.clickThrough).toEqual([]);
  });

  it("calculates click-through rate only when impressions exist", () => {
    expect(clickThroughRate(4, 0)).toBeNull();
    expect(clickThroughRate(4, 100)).toBe(0.04);
    const report = intelligenceReport({
      asOf: "2026-10-22",
      indexation,
      searchConsole: [{ path: "/chhattisgarh/raipur/invisible-grills", clicks: 4, impressions: 100, position: 6 }],
      queries: [{ query: "invisible grills in raipur", path: "/chhattisgarh/raipur/invisible-grills", clicks: 4, impressions: 100, position: 6 }],
      analytics: [{ path: "/contact", sessions: 20, conversions: 3 }],
      previousPositions: [{ path: "/chhattisgarh/raipur/invisible-grills", position: 8 }],
      currentPositions: [{ path: "/chhattisgarh/raipur/invisible-grills", position: 6 }],
      contentVersions: [{ path: "/chhattisgarh/raipur/invisible-grills", version: "2025-01-01" }],
      technicalScores: [{ path: "/chhattisgarh/raipur/bird-spikes-price", score: 30 }],
      competitors: [{ domain: "example-installer.test" }],
    });
    expect(report.clickThrough[0]?.rate).toBe(0.04);
    expect(report.impressions.rows[0]?.impressions).toBe(100);
    expect(report.conversions).toBe(3);
    expect(report.rankingChanges.rows[0]?.change).toBe(-2);
    expect(report.decay).toHaveLength(1);
    expect(report.technical).toHaveLength(1);
    expect(report.competitors.domains).toEqual(["example-installer.test"]);
  });
});
