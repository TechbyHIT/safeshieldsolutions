import { describe, expect, it } from "vitest";
import { getSeoService } from "@/data/seo-services";
import { guidesForService, guideArticles } from "@/config/guides-content";

describe("service and guide links", () => {
  it("connects the three comparison guides to real services", () => {
    for (const slug of [
      "ss304-vs-ss316-invisible-grills",
      "safety-net-vs-invisible-grill",
      "how-to-keep-pigeons-off-a-balcony",
    ]) {
      const guide = guideArticles.find((item) => item.slug === slug);
      expect(guide?.sections?.length).toBeGreaterThan(0);
      expect(getSeoService(guide!.serviceSlug)).toBeTruthy();
    }
    expect(guidesForService("invisible-grills").some((item) => item.slug === "ss304-vs-ss316-invisible-grills")).toBe(
      true,
    );
    expect(guidesForService("balcony-invisible-grills").some((item) => item.slug === "ss304-vs-ss316-invisible-grills")).toBe(
      true,
    );
    expect(guidesForService("pigeon-safety-nets").some((item) => item.slug === "how-to-keep-pigeons-off-a-balcony")).toBe(
      true,
    );
  });
});
