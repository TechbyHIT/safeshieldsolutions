import { describe, expect, it } from "vitest";
import { researchMarket } from "@/lib/keyword-research";

describe("keyword research workflow", () => {
  it("maps Raipur invisible-grill variations onto the landing page and the near-me page", () => {
    const research = researchMarket({ placeSlug: "raipur", serviceSlugs: ["invisible-grills"] });
    expect(research.serp.source).toBe("none");
    expect(research.seeds).toContain("Invisible Grills");
    expect(research.competing).toEqual([]);
    const primary = research.work.find((item) => item.keyword === "Invisible Grills in Raipur");
    const price = research.work.find((item) => item.keyword === "Invisible Grills price in Raipur");
    const near = research.work.find((item) => item.keyword === "Invisible Grills Near Me in Raipur");
    expect(primary).toMatchObject({ action: "keep", url: "/chhattisgarh/raipur/invisible-grills", cluster: "Invisible grills" });
    expect(price).toMatchObject({ action: "add-section", url: "/chhattisgarh/raipur/invisible-grills" });
    expect(near).toMatchObject({ action: "keep", url: "/chhattisgarh/raipur/invisible-grills-near-me" });
    expect(primary?.demand.source).toBe("estimate");
    expect(research.work[0]?.priority).toBeGreaterThanOrEqual(research.work.at(-1)?.priority ?? 0);
  });

  it("uses exported search demand when a volume row matches", () => {
    const research = researchMarket({
      placeSlug: "raipur",
      serviceSlugs: ["invisible-grills"],
      volumes: [{ query: "Invisible Grills in Raipur", searches: 240 }],
      serp: [{ query: "Invisible Grills in Raipur", url: "https://example.com/other", position: 3 }],
    });
    const primary = research.work.find((item) => item.keyword === "Invisible Grills in Raipur");
    expect(primary?.demand).toEqual({ source: "export", value: 240 });
    expect(research.serp.source).toBe("export");
  });
});
