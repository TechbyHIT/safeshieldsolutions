import { describe, expect, it } from "vitest";
import { PRIORITY_WEIGHTS, prioritize } from "@/lib/prioritization";

const base = {
  searchDemand: 70,
  businessRelevance: 90,
  conversionPotential: 85,
  contentGap: "section" as const,
  technicalFailures: 0,
  competition: 40,
  effort: "low" as const,
};

describe("prioritization model", () => {
  it("shows each factor and lowers confidence when rank data is missing", () => {
    const result = prioritize(base);
    expect(result.confidence).toBe(0.45);
    expect(result.factors.find((factor) => factor.id === "visibility")).toBeUndefined();
    expect(result.factors.find((factor) => factor.id === "searchDemand")?.source).toBe("estimate");
    const weightSum = result.factors.reduce((sum, factor) => sum + factor.weight, 0);
    expect(weightSum).toBeGreaterThan(0.99);
    expect(weightSum).toBeLessThan(1.01);
    expect(Object.values(PRIORITY_WEIGHTS).reduce((sum, weight) => sum + weight, 0)).toBeCloseTo(1);
  });

  it("raises a weak visible query with a content gap above an easy winner", () => {
    const opportunity = prioritize({
      ...base,
      demandSource: "export",
      searchDemand: 80,
      position: 18,
      impressions: 200,
      contentGap: "section",
      technicalFailures: 1,
      competition: 35,
      competitionSource: "export",
    });
    const winner = prioritize({
      ...base,
      demandSource: "export",
      position: 2,
      impressions: 200,
      contentGap: "none",
      technicalFailures: 0,
      effort: "high",
    });
    expect(opportunity.confidence).toBe(0.85);
    expect(opportunity.score).toBeGreaterThan(winner.score);
    expect(opportunity.factors.find((factor) => factor.id === "visibility")?.score).toBe(85);
    expect(winner.factors.find((factor) => factor.id === "visibility")?.score).toBe(20);
  });
});
