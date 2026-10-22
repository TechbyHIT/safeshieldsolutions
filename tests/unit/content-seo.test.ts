import { describe, expect, it } from "vitest";
import { getCgPlace } from "@/data/cg-local-seo";
import { getSeoService } from "@/data/seo-services";
import { composeServicePage } from "@/lib/compose-service-page";
import {
  GLOSSARY,
  PUBLISHED_CASE_STUDIES,
  assessServicePage,
  consolidatedIntents,
  contentBrief,
  refreshStatus,
} from "@/lib/content-seo";
import { evaluateSeoPath } from "@/lib/seo-quality-gate";

describe("content SEO", () => {
  it("matches a Raipur service page to the local intent and passes the brief", () => {
    const place = getCgPlace("raipur")!;
    const service = getSeoService("invisible-grills")!;
    const page = composeServicePage(place, service, "general");
    const assessment = assessServicePage({
      title: page.title,
      body: [page.h1, page.description, ...page.sections.flatMap((section) => [section.heading, ...section.paragraphs])].join("\n"),
      faqs: page.faqs.length,
      sectionIds: page.sections.map((section) => section.id),
      sources: page.sources.length,
      placeName: place.name,
      serviceName: service.name,
      intent: "general",
      version: page.contentVersion,
      asOf: "2026-10-22",
    });
    expect(assessment.score).toBe(100);
    expect(assessment.refresh.status).toBe("current");
    expect(assessment.brief.mustAvoid).toContain("A fake customer case study");
    expect(page.nearMeMentions).toBe(0);
  });

  it("flags a stale version and keeps case studies unpublished", () => {
    expect(refreshStatus("2026-10-05", "2027-05-01").status).toBe("due");
    expect(PUBLISHED_CASE_STUDIES).toHaveLength(0);
    expect(GLOSSARY.map((term) => term.term)).toEqual(
      expect.arrayContaining(["SS304", "Safety net", "Bird spike"]),
    );
    expect(contentBrief("glossary", "SS304").intent).toBe("informational");
    expect(contentBrief("comparison", "Invisible grills vs safety nets").mustInclude).toContain("Both product names");
  });

  it("consolidates price, dealers, and installation doorways onto the service page", () => {
    for (const item of consolidatedIntents("invisible-grills", "raipur")) {
      const gate = evaluateSeoPath(item.path);
      expect(gate.index).toBe(false);
      expect(gate.canonicalPath === item.keep || gate.canonicalPath.startsWith("/pricing/")).toBe(true);
    }
  });
});
