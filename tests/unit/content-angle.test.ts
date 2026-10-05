import { describe, it, expect } from "vitest";
import { CG_PRIORITY_PLACES } from "@/data/cg-local-seo";
import { getSeoService } from "@/data/seo-services";
import { composeServicePage } from "@/lib/compose-service-page";
import { jaccard, normalizeForCompare, shingles } from "@/lib/content-fingerprint";

describe("service content angles", () => {
  it("does not reuse one invisible-grill essay across Raipur, Bhilai, and Durg", () => {
    const service = getSeoService("invisible-grills")!;
    const names = CG_PRIORITY_PLACES.map((place) => place.name);
    const pages = ["raipur", "bhilai", "durg"].map((slug) =>
      composeServicePage(CG_PRIORITY_PLACES.find((place) => place.slug === slug)!, service, "general"),
    );
    const [raipur, bhilai, durg] = pages;
    expect(raipur!.contentAngle).not.toBe(bhilai!.contentAngle);
    expect(raipur!.contentAngle).not.toBe(durg!.contentAngle);
    expect(bhilai!.contentAngle).not.toBe(durg!.contentAngle);

    const bodies = pages.map((page) =>
      shingles(
        normalizeForCompare(
          page!.sections.map((section) => section.paragraphs.join(" ")).join(" "),
          names,
        ),
      ),
    );
    expect(jaccard(bodies[0]!, bodies[1]!)).toBeLessThan(0.98);
    expect(jaccard(bodies[0]!, bodies[2]!)).toBeLessThan(0.98);
    expect(jaccard(bodies[1]!, bodies[2]!)).toBeLessThan(0.98);
    for (const page of pages) {
      expect(page!.nearMeMentions).toBe(0);
      expect(page!.wordCount).toBeGreaterThanOrEqual(1500);
      expect(page!.faqs.length).toBeGreaterThanOrEqual(3);
    }
  });
});
