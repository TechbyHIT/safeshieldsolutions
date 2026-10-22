import { describe, expect, it } from "vitest";
import { buildSeoDashboard } from "@/lib/seo-dashboard";

const counts = {
  submitted: 120,
  eligible: 118,
  exclusions: [
    { path: "/chhattisgarh/bemetara/invisible-grills", reason: "Place is outside the indexable city list" },
    { path: "/guides/later", reason: "Held for publishing phase 4" },
  ],
  orphans: [],
  errors: [],
  phase: 4,
};

describe("SEO dashboard", () => {
  it("reports submitted pages and leaves Search Console figures empty", () => {
    const sections = buildSeoDashboard(counts);
    const indexed = sections.find((section) => section.id === "indexed-submitted");
    const clicks = sections.find((section) => section.id === "clicks-impressions");
    const vitals = sections.find((section) => section.id === "vitals");
    const leads = sections.find((section) => section.id === "lead-quality");
    expect(indexed?.lines[0]).toContain("120 URLs");
    expect(clicks?.source).toBe("none");
    expect(vitals?.source).toBe("none");
    expect(leads?.source).toBe("none");
    expect(sections.map((section) => section.id)).toEqual(
      expect.arrayContaining([
        "exclusions",
        "ctr-position",
        "query-url",
        "conversions",
        "broken",
        "duplicate-thin",
        "metadata",
        "schema",
        "orphans",
        "cannibalization",
        "refresh",
        "publishing",
        "severity",
      ]),
    );
  });

  it("uses a Search Console and lead export when one is supplied", () => {
    const sections = buildSeoDashboard(counts, {
      search: [{ path: "/chhattisgarh/raipur/invisible-grills", clicks: 4, impressions: 100, position: 6 }],
      queries: [{ query: "invisible grills in raipur", path: "/chhattisgarh/raipur/invisible-grills", clicks: 4, impressions: 100, position: 6 }],
      leads: [{ channel: "whatsapp", qualified: true }, { channel: "form", qualified: false }],
      vitals: { lcpMs: 1800, inpMs: 120, cls: 0.02 },
    });
    expect(sections.find((section) => section.id === "ctr-position")?.lines[0]).toBe("CTR 4.0%");
    expect(sections.find((section) => section.id === "query-url")?.lines[0]).toContain("invisible grills in raipur");
    expect(sections.find((section) => section.id === "lead-quality")?.lines[0]).toContain("1 of 2");
    expect(sections.find((section) => section.id === "vitals")?.source).toBe("export");
  });
});
