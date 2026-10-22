/**
 * Repeatable on-page SEO audit for indexable templates and shared components.
 * Findings are grouped by severity. They are not ranking scores.
 */
import { homeCatalogServices, homeHero, heroBullets } from "@/config/home-content";
import { HOME_CITIES, HOME_CITY_AREAS, homeSeoParagraphs } from "@/config/home-seo-links";
import { getCgPlace } from "@/data/cg-local-seo";
import { getSeoService } from "@/data/seo-services";
import { buildCityHubContent } from "@/lib/city-hub-content";
import { buildServiceContent, buildCityServiceContent } from "@/lib/content";
import { composeServicePage } from "@/lib/compose-service-page";
import { snapshotLocalService, auditOnPage } from "@/lib/on-page-seo";
import { buildOrganizationSchema, buildLocalBusinessSchema } from "@/lib/schema";
import { validateStructuredData } from "@/lib/technical-seo";
import { routes } from "@/config/routes";
import { CG_PRIORITY_PLACES } from "@/data/cg-local-seo";
import { buildSearchSnippet, snippetForPlaceService } from "@/lib/search-snippets";

export type AuditSeverity = "critical" | "high" | "medium" | "low";
export type AuditCategory = "technical" | "content" | "usability" | "best-practice";

export interface SiteSeoFinding {
  url: string;
  issue: string;
  severity: AuditSeverity;
  category: AuditCategory;
  recommended: string;
  file?: string;
}

const FORBIDDEN_CLAIMS: { pattern: RegExp; label: string }[] = [
  { pattern: /12\+\s*years/i, label: "unverified years-in-business claim" },
  { pattern: /8,?500\+/, label: "unverified project-count claim" },
  { pattern: /20,000\+\s*word/i, label: "inflated word-count claim" },
  { pattern: /29,000/, label: "inflated URL-count claim" },
  { pattern: /₹\s*130\s*[–-]\s*180/, label: "invented per-sq-ft rate" },
  { pattern: /trusted across Telangana/i, label: "out-of-area service claim" },
  { pattern: /ISO 9001/i, label: "unevidenced certification" },
];

function scanText(url: string, text: string, file: string, findings: SiteSeoFinding[]) {
  for (const rule of FORBIDDEN_CLAIMS) {
    if (rule.pattern.test(text)) {
      findings.push({
        url,
        issue: `Copy includes ${rule.label}`,
        severity: "critical",
        category: "content",
        recommended: "Remove the unevidenced claim and describe the survey-and-quote process instead.",
        file,
      });
    }
  }
}

export function auditSiteSeo(): { findings: SiteSeoFinding[]; counts: Record<AuditSeverity, number> } {
  const findings: SiteSeoFinding[] = [];

  const slugs = homeCatalogServices.map((item) => item.slug);
  const uniqueSlugs = new Set(slugs);
  if (uniqueSlugs.size !== slugs.length) {
    findings.push({
      url: "/",
      issue: "Homepage service cards reuse the same service URL",
      severity: "high",
      category: "usability",
      recommended: "Give each card a distinct service slug and destination.",
      file: "src/config/home-content.ts",
    });
  }

  scanText("/", [homeHero.title, homeHero.description, ...heroBullets].join("\n"), "src/config/home-content.ts", findings);
  scanText("/", homeSeoParagraphs.map((block) => `${block.heading}\n${block.body}`).join("\n"), "src/config/home-seo-links.ts", findings);

  for (const heading of [homeHero.title, ...homeSeoParagraphs.map((block) => block.heading)]) {
    if (/\bnear me\b/i.test(heading)) {
      findings.push({
        url: "/",
        issue: `Heading repeats “near me”: ${heading}`,
        severity: "high",
        category: "content",
        recommended: "Keep near-me wording on the dedicated town URL, not in every homepage heading.",
        file: "src/config/home-content.ts",
      });
    }
  }

  const invisible = getSeoService("invisible-grills")!;
  const serviceCopy = buildServiceContent({
    serviceName: invisible.name,
    serviceSlug: invisible.slug,
    serviceDescription: invisible.description,
    category: invisible.category,
  });
  scanText(
    "/services/invisible-grills",
    [serviceCopy.intro, ...serviceCopy.sections.map((section) => `${section.heading}\n${section.body}`), ...serviceCopy.faqs.map((faq) => `${faq.question}\n${faq.answer}`)].join("\n"),
    "src/lib/content.ts",
    findings,
  );

  const stateCopy = buildCityServiceContent(
    {
      serviceName: invisible.name,
      serviceSlug: invisible.slug,
      serviceDescription: invisible.description,
      category: invisible.category,
    },
    {
      locationName: "Chhattisgarh",
      locationSlug: "chhattisgarh",
      locationType: "CITY",
      cityName: "Chhattisgarh",
      citySlug: "chhattisgarh",
    },
  );
  scanText(
    "/chhattisgarh/invisible-grills",
    [stateCopy.intro, ...stateCopy.sections.map((section) => `${section.heading}\n${section.body}`), ...stateCopy.faqs.map((faq) => `${faq.question}\n${faq.answer}`)].join("\n"),
    "src/lib/content.ts",
    findings,
  );

  const hub = buildCityHubContent("chhattisgarh", "Chhattisgarh");
  scanText(
    "/locations/chhattisgarh",
    [...hub.sections.map((section) => `${section.heading}\n${section.body}`), ...hub.faqs.map((faq) => `${faq.question}\n${faq.answer}`)].join("\n"),
    "src/lib/city-hub-content.ts",
    findings,
  );

  const raipur = composeServicePage(getCgPlace("raipur")!, invisible, "general");
  const bhilai = composeServicePage(getCgPlace("bhilai")!, invisible, "general");
  if (raipur.title === bhilai.title) {
    findings.push({
      url: raipur.path,
      issue: "Raipur and Bhilai invisible-grill titles are identical",
      severity: "high",
      category: "technical",
      recommended: "Keep place names in the title so each town page is unique.",
      file: "src/lib/compose-service-page.ts",
    });
  }

  const snapshot = snapshotLocalService("raipur", "invisible-grills", "general", true);
  if (snapshot) {
    const audit = auditOnPage(snapshot);
    for (const check of audit.checks.filter((item) => item.status === "fail")) {
      findings.push({
        url: snapshot.path,
        issue: `On-page check failed: ${check.id} (${check.detail})`,
        severity: check.id === "title" || check.id === "canonical" ? "critical" : "high",
        category: "technical",
        recommended: "Fix the failing on-page field on the Raipur sample landing page.",
        file: "src/lib/on-page-seo.ts",
      });
    }
  }

  for (const node of [buildOrganizationSchema(), buildLocalBusinessSchema("Raipur")]) {
    const errors = validateStructuredData(node);
    for (const error of errors) {
      findings.push({
        url: "/",
        issue: `Structured data: ${error}`,
        severity: "high",
        category: "technical",
        recommended: "Correct the JSON-LD builder so required properties are present and true.",
        file: "src/lib/schema.ts",
      });
    }
  }

  if (JSON.stringify(buildOrganizationSchema()).includes("AggregateRating")) {
    findings.push({
      url: "/",
      issue: "Organization schema includes a rating",
      severity: "critical",
      category: "content",
      recommended: "Omit review markup unless genuine ratings are published on the page.",
      file: "src/lib/schema.ts",
    });
  }

  for (const city of HOME_CITIES) {
    if ((HOME_CITY_AREAS[city.slug] ?? []).length === 0) {
      findings.push({
        url: "/",
        issue: `Homepage city “${city.name}” has no town links`,
        severity: "medium",
        category: "technical",
        recommended: "Map homepage cities to served Chhattisgarh towns only.",
        file: "src/config/home-seo-links.ts",
      });
    }
  }

  const outOfState = Object.keys(HOME_CITY_AREAS).filter((slug) => slug !== "chhattisgarh");
  if (outOfState.length) {
    findings.push({
      url: "/",
      issue: `Homepage area map still lists out-of-state cities: ${outOfState.join(", ")}`,
      severity: "high",
      category: "content",
      recommended: "Keep homepage deep links inside served Chhattisgarh towns.",
      file: "src/config/home-seo-links.ts",
    });
  }

  const titles = new Map<string, string>();
  const descriptions = new Map<string, string>();
  const snippetSamples: { url: string; title: string; description: string }[] = [
    { url: "/", ...buildSearchSnippet({ kind: "home" }) },
    {
      url: "/services/invisible-grills",
      ...buildSearchSnippet({
        kind: "service",
        serviceName: invisible.name,
        serviceSlug: invisible.slug,
        serviceDescription: invisible.description,
      }),
    },
    {
      url: "/chhattisgarh/invisible-grills",
      ...buildSearchSnippet({
        kind: "state-service",
        serviceName: invisible.name,
        serviceSlug: invisible.slug,
      }),
    },
  ];
  for (const place of CG_PRIORITY_PLACES.slice(0, 8)) {
    snippetSamples.push({
      url: `/chhattisgarh/${place.slug}`,
      ...buildSearchSnippet({ kind: "place", placeName: place.name, placeSlug: place.slug }),
    });
    for (const slug of ["invisible-grills", "safety-nets", "bird-spikes"] as const) {
      const svc = getSeoService(slug);
      if (!svc) continue;
      snippetSamples.push({
        url: `/chhattisgarh/${place.slug}/${slug}`,
        ...snippetForPlaceService(place.slug, place.name, svc, "general"),
      });
      snippetSamples.push({
        url: `/chhattisgarh/${place.slug}/${slug}-near-me`,
        ...snippetForPlaceService(place.slug, place.name, svc, "near-me"),
      });
    }
  }
  for (const sample of snippetSamples) {
    if (/<[a-z][\s\S]*?>/i.test(sample.title) || /<[a-z][\s\S]*?>/i.test(sample.description)) {
      findings.push({
        url: sample.url,
        issue: "Title or description contains HTML tags",
        severity: "critical",
        category: "technical",
        recommended: "Keep metadata as plain text. Google bolds matching query terms on its own.",
        file: "src/lib/search-snippets.ts",
      });
    }
    if (/manufacturers suppliers|best rated|click here/i.test(`${sample.title} ${sample.description}`)) {
      findings.push({
        url: sample.url,
        issue: "Snippet uses stuffed or generic wording",
        severity: "high",
        category: "content",
        recommended: "Name the service and town once, then explain the survey and quote.",
        file: "src/lib/search-snippets.ts",
      });
    }
    if (sample.description.length < 70) {
      findings.push({
        url: sample.url,
        issue: `Meta description is too short (${sample.description.length} characters)`,
        severity: "medium",
        category: "technical",
        recommended: "Write a unique description of the page in about 120–160 characters.",
        file: "src/lib/search-snippets.ts",
      });
    }
    const sameTitle = [...titles.entries()].find(([, title]) => title === sample.title);
    if (sameTitle) {
      findings.push({
        url: sample.url,
        issue: `Duplicate title also used on ${sameTitle[0]}`,
        severity: "high",
        category: "technical",
        recommended: "Build the title from the service and place so each URL is unique.",
        file: "src/lib/search-snippets.ts",
      });
    } else {
      titles.set(sample.url, sample.title);
    }
    const sameDescription = [...descriptions.entries()].find(([, text]) => text === sample.description);
    if (sameDescription) {
      findings.push({
        url: sample.url,
        issue: `Duplicate meta description also used on ${sameDescription[0]}`,
        severity: "high",
        category: "content",
        recommended: "Include the service, town, and a real differentiator in each description.",
        file: "src/lib/search-snippets.ts",
      });
    } else {
      descriptions.set(sample.url, sample.description);
    }
  }

  if (routes.cityService("raipur", "invisible-grills") !== "/chhattisgarh/raipur/invisible-grills") {
    findings.push({
      url: "/chhattisgarh/raipur/invisible-grills",
      issue: "cityService() does not point at the canonical Chhattisgarh town URL",
      severity: "high",
      category: "technical",
      recommended: "Route town service cards to /chhattisgarh/{town}/{service}.",
      file: "src/config/routes.ts",
    });
  }

  const counts: Record<AuditSeverity, number> = { critical: 0, high: 0, medium: 0, low: 0 };
  for (const finding of findings) counts[finding.severity] += 1;
  return { findings, counts };
}

export function formatSiteSeoReport(result: ReturnType<typeof auditSiteSeo>): string {
  const lines = [
    "SITE SEO AUDIT",
    "",
    `Critical: ${result.counts.critical}`,
    `High:     ${result.counts.high}`,
    `Medium:   ${result.counts.medium}`,
    `Low:      ${result.counts.low}`,
  ];
  if (result.findings.length === 0) {
    lines.push("", "PASS — no template issues in the measured on-page checks.");
    return lines.join("\n");
  }
  lines.push("");
  for (const finding of result.findings) {
    lines.push(
      `[${finding.severity.toUpperCase()}] ${finding.url}`,
      `  Issue: ${finding.issue}`,
      `  Category: ${finding.category}`,
      `  Fix: ${finding.recommended}`,
      finding.file ? `  File: ${finding.file}` : "",
      "",
    );
  }
  return lines.filter(Boolean).join("\n");
}
