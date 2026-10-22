import { describe, expect, it } from "vitest";
import { clusterArchitecture, clusterPerformance, siteArchitecture } from "@/lib/topic-architecture";

describe("topic architecture", () => {
  it("builds a grills hub with distinct intents and no case-study URL", () => {
    const cluster = clusterArchitecture("grills", "raipur");
    expect(cluster?.subject).toBe("Invisible grills");
    expect(cluster?.marketHub).toBe("/chhattisgarh");
    expect(cluster?.hub).toEqual({ path: "/services/invisible-grills", intent: "Invisible grills service detail" });
    const intents = new Set(cluster?.spokes.map((spoke) => spoke.intent));
    expect(intents.size).toBe(cluster?.spokes.length);
    expect(cluster?.spokes.some((spoke) => spoke.path === "/chhattisgarh/raipur/invisible-grills" && spoke.role === "location")).toBe(true);
    expect(cluster?.spokes.some((spoke) => spoke.path === "/chhattisgarh/raipur/balcony-invisible-grills" && spoke.linksTo.includes("/services/invisible-grills"))).toBe(true);
    expect(cluster?.spokes.some((spoke) => spoke.role === "guide" && spoke.path === "/guides/invisible-grills-near-me-guide")).toBe(true);
    expect(cluster?.spokes.some((spoke) => spoke.role === "comparison")).toBe(true);
    expect(cluster?.spokes.some((spoke) => spoke.role === "faq-section" && spoke.path === "/chhattisgarh/raipur/invisible-grills")).toBe(true);
    expect(cluster?.gaps.map((gap) => gap.subtopic)).toContain("Verified case study");
    expect(cluster?.spokes.some((spoke) => spoke.path.includes("case-stud"))).toBe(false);
    expect(cluster?.consolidate.some((item) => item.from.endsWith("-price") && item.to === "/chhattisgarh/raipur/invisible-grills")).toBe(true);
  });

  it("measures a cluster only from supplied rows", () => {
    expect(clusterPerformance("grills").source).toBe("none");
    const report = clusterPerformance("grills", [
      { path: "/chhattisgarh/raipur/invisible-grills", clicks: 4, impressions: 40 },
      { path: "/unrelated", clicks: 9, impressions: 90 },
    ]);
    expect(report).toMatchObject({ source: "export", clicks: 4, impressions: 40 });
    expect(siteArchitecture("raipur").clusters.length).toBeGreaterThan(1);
  });
});
