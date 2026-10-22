import { describe, expect, it } from "vitest";
import { homeCatalogServices } from "@/config/home-content";
import { routes } from "@/config/routes";
import { buildServiceContent } from "@/lib/content";
import { auditSiteSeo } from "@/lib/site-seo-audit";
import { getSeoService } from "@/data/seo-services";

describe("site SEO audit", () => {
  it("has no critical or high findings on the measured templates", () => {
    const result = auditSiteSeo();
    const serious = result.findings.filter((item) => item.severity === "critical" || item.severity === "high");
    expect(serious).toEqual([]);
  });

  it("gives homepage service cards unique destinations", () => {
    const slugs = homeCatalogServices.map((item) => item.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("keeps unverified project counts out of the service template", () => {
    const service = getSeoService("invisible-grills")!;
    const copy = buildServiceContent({
      serviceName: service.name,
      serviceSlug: service.slug,
      serviceDescription: service.description,
      category: service.category,
    });
    const body = [copy.intro, ...copy.sections.map((section) => section.body)].join(" ");
    expect(body).not.toMatch(/8,?500/);
    expect(body).not.toMatch(/Telangana/);
  });

  it("points town service cards at the canonical Chhattisgarh URL", () => {
    expect(routes.cityService("chhattisgarh", "invisible-grills")).toBe("/chhattisgarh/invisible-grills");
    expect(routes.cityService("raipur", "invisible-grills")).toBe("/chhattisgarh/raipur/invisible-grills");
  });
});
