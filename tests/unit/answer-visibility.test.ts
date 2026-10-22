import { describe, expect, it } from "vitest";
import { getCgPlace } from "@/data/cg-local-seo";
import { getSeoService } from "@/data/seo-services";
import { answerReadiness, citationReport } from "@/lib/answer-visibility";
import { composeServicePage } from "@/lib/compose-service-page";

describe("answer visibility", () => {
  it("gives a Raipur service page a direct, sourced answer", () => {
    const page = composeServicePage(getCgPlace("raipur")!, getSeoService("invisible-grills")!, "general");
    const readiness = answerReadiness({
      title: page.title,
      serviceName: "Invisible Grills",
      placeName: "Raipur",
      directQuestion: page.directAnswer.question,
      directAnswer: page.directAnswer.answer,
      faqs: page.faqs,
      sources: page.sources,
      faqSchema: true,
    });
    expect(page.directAnswer.question).toBe("What is Invisible Grills in Raipur?");
    expect(page.directAnswer.answer).toContain("not a flat rate");
    expect(page.nearMeMentions).toBe(0);
    expect(readiness.score).toBe(100);
    expect(page.sources[0]?.publisher.length).toBeGreaterThan(0);
  });

  it("does not invent citations", () => {
    expect(citationReport().source).toBe("none");
    const report = citationReport([
      { referrer: "example-assistant.example", landingPath: "/chhattisgarh/raipur/invisible-grills", visits: 2 },
    ]);
    expect(report.source).toBe("export");
    expect(report.rows[0]?.visits).toBe(2);
  });
});
