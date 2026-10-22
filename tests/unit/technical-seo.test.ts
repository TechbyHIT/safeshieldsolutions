import { describe, expect, it } from "vitest";
import { getCgPlace } from "@/data/cg-local-seo";
import { getSeoService } from "@/data/seo-services";
import { buildServiceEntityGraph } from "@/lib/entity-seo";
import { buildPageMetadata } from "@/lib/metadata";
import { buildBreadcrumbSchema, buildFaqSchema, buildOrganizationSchema } from "@/lib/schema";
import {
  crawlUrlChanged,
  normalizeCrawlUrl,
  validateStructuredData,
} from "@/lib/technical-seo";

describe("technical SEO", () => {
  it("collapses duplicate URL forms into one https URL", () => {
    const messy = {
      protocol: "http:" as const,
      host: "WWW.SafeShieldSolutions.in",
      pathname: "/Chhattisgarh/Raipur/Invisible-Grills/",
      search: "?page=2&finish=ss304",
    };
    const clean = normalizeCrawlUrl(messy);
    expect(clean).toEqual({
      protocol: "https:",
      host: "safeshieldsolutions.in",
      pathname: "/chhattisgarh/raipur/invisible-grills",
      search: "",
    });
    expect(crawlUrlChanged(messy, clean)).toBe(true);
  });

  it("keeps localhost on http and keeps API query strings", () => {
    const local = normalizeCrawlUrl({
      protocol: "http:",
      host: "localhost:3010",
      pathname: "/chhattisgarh/raipur",
      search: "?page=2",
    });
    expect(local.protocol).toBe("http:");
    expect(local.search).toBe("");
    const api = normalizeCrawlUrl(
      {
        protocol: "http:",
        host: "localhost:3010",
        pathname: "/api/sitemaps/raipur",
        search: "?id=1",
      },
      { keepSearch: true },
    );
    expect(api.search).toBe("?id=1");
  });

  it("advertises en-IN and large image previews on indexable pages", () => {
    const metadata = buildPageMetadata({
      title: "Invisible Grills in Raipur",
      description: "Measured quote for Invisible Grills in Raipur.",
      path: "/chhattisgarh/raipur/invisible-grills",
    });
    expect(metadata.alternates?.canonical).toBe(
      "https://safeshieldsolutions.in/chhattisgarh/raipur/invisible-grills",
    );
    expect(metadata.alternates?.languages).toEqual({
      "en-IN": "https://safeshieldsolutions.in/chhattisgarh/raipur/invisible-grills",
      "x-default": "https://safeshieldsolutions.in/chhattisgarh/raipur/invisible-grills",
    });
    expect(metadata.robots).toMatchObject({
      index: true,
      follow: true,
      googleBot: { index: true, "max-image-preview": "large" },
    });
  });

  it("accepts the service graph, organization, FAQ, and breadcrumbs", () => {
    const place = getCgPlace("raipur")!;
    const service = getSeoService("invisible-grills")!;
    const graph = buildServiceEntityGraph({
      service,
      place,
      path: "/chhattisgarh/raipur/invisible-grills",
      title: "Invisible Grills in Raipur",
      description: "Measured quote.",
    });
    expect(validateStructuredData(graph)).toEqual([]);
    expect(validateStructuredData(buildOrganizationSchema())).toEqual([]);
    expect(
      validateStructuredData(
        buildFaqSchema([{ question: "How is the quote made?", answer: "After measurement." }]),
      ),
    ).toEqual([]);
    expect(
      validateStructuredData(
        buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Raipur", url: "/chhattisgarh/raipur" },
        ]),
      ),
    ).toEqual([]);
    expect(validateStructuredData(buildFaqSchema([{ question: " ", answer: "" }]))).toContain(
      "FAQ question needs a name",
    );
  });
});
