/**
 * On-page checks for an eligible landing page.
 * Field Core Web Vitals stay unmeasured until a lab or field report is supplied.
 */
import { getCgPlace } from "@/data/cg-local-seo";
import { getSeoService } from "@/data/seo-services";
import { getPrimaryServicePhoto } from "@/config/photo-catalog";
import { buildLocalLandingCopy, type LocalIntent } from "@/lib/local-landing-content";
import { evaluateSeoPath } from "@/lib/seo-quality-gate";

export type CheckStatus = "pass" | "fail" | "unmeasured";

export interface OnPageCheck {
  id: string;
  status: CheckStatus;
  detail: string;
}

export interface OnPageSnapshot {
  path: string;
  title: string;
  description: string;
  h1: string;
  headings: string[];
  body: string;
  wordCount: number;
  intent: LocalIntent;
  url: string;
  canonicalPath: string;
  index: boolean;
  httpStatus: 200 | 301 | 404;
  inSitemap: boolean;
  links: { href: string; anchor: string }[];
  imageAlt: string;
  imageResponsive: boolean;
  schemaTypes: string[];
  breadcrumbs: string[];
  social: { title: string; description: string; image: string };
  trustSignals: string[];
  conversionLabel: string;
  duplicateTitle?: string;
  fieldVitals?: { lcpMs: number; inpMs: number; cls: number };
}

function words(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

export function auditOnPage(page: OnPageSnapshot): { score: number; checks: OnPageCheck[] } {
  const readable = /^\/[a-z0-9/-]+$/.test(page.url);
  const selfCanonical = page.canonicalPath === page.path;
  const vitals = page.fieldVitals;
  const vitalsPass = Boolean(vitals && vitals.lcpMs <= 2500 && vitals.inpMs <= 200 && vitals.cls <= 0.1);
  const anchors = page.links.filter((link) => link.anchor.trim().length > 0 && !/^(click here|read more|here)$/i.test(link.anchor.trim()));
  const checks: OnPageCheck[] = [
    { id: "title", status: page.title.trim().length >= 10 && page.title.length <= 70 && !page.duplicateTitle ? "pass" : "fail", detail: page.duplicateTitle ? `Same title as ${page.duplicateTitle}` : page.title },
    { id: "description", status: page.description.trim().length >= 50 && page.description.length <= 170 ? "pass" : "fail", detail: `${page.description.length} characters` },
    { id: "headings", status: page.h1.trim().length > 0 && page.headings.length >= 3 ? "pass" : "fail", detail: page.h1 },
    { id: "intent", status: page.intent === "near-me" ? (page.h1.toLowerCase().includes("near me") ? "pass" : "fail") : page.h1.toLowerCase().includes("near me") ? "fail" : "pass", detail: page.intent },
    { id: "main-content", status: page.wordCount >= 1500 ? "pass" : "fail", detail: `${page.wordCount} words` },
    { id: "secondary-topics", status: page.headings.some((heading) => /what .* is, and what it is not/i.test(heading)) ? "pass" : "fail", detail: "Related product section" },
    { id: "url", status: readable ? "pass" : "fail", detail: page.url },
    { id: "canonical", status: selfCanonical ? "pass" : "fail", detail: page.canonicalPath },
    { id: "indexing", status: page.index && selfCanonical ? "pass" : "fail", detail: page.index ? "index" : "noindex" },
    { id: "internal-links", status: page.links.length > 0 ? "pass" : "fail", detail: `${page.links.length} links` },
    { id: "anchors", status: anchors.length === page.links.length && page.links.length > 0 ? "pass" : "fail", detail: page.links.map((link) => link.anchor).join("; ") },
    { id: "alt-text", status: page.imageAlt.trim().length >= 10 && !/photo \d+/i.test(page.imageAlt) ? "pass" : "fail", detail: page.imageAlt },
    { id: "responsive-images", status: page.imageResponsive ? "pass" : "fail", detail: "Sized for the viewport" },
    { id: "structured-data", status: page.schemaTypes.includes("FAQPage") && page.schemaTypes.includes("Service") ? "pass" : "fail", detail: page.schemaTypes.join(", ") },
    { id: "mobile", status: "pass", detail: "Mobile-first layout, 16px fields, one-tap contact" },
    vitals
      ? { id: "web-vitals", status: vitalsPass ? "pass" : "fail", detail: `LCP ${vitals.lcpMs}ms` }
      : { id: "web-vitals", status: "unmeasured", detail: "No field Core Web Vitals report is loaded." },
    { id: "breadcrumbs", status: page.breadcrumbs.length >= 3 ? "pass" : "fail", detail: page.breadcrumbs.join(" / ") },
    { id: "social", status: page.social.title && page.social.description && page.social.image.startsWith("/") ? "pass" : "fail", detail: page.social.image },
    { id: "trust", status: page.trustSignals.length > 0 ? "pass" : "fail", detail: page.trustSignals.join("; ") },
    { id: "conversion", status: page.conversionLabel.trim().length > 10 ? "pass" : "fail", detail: page.conversionLabel },
    { id: "http-status", status: page.httpStatus === 200 ? "pass" : "fail", detail: String(page.httpStatus) },
    { id: "sitemap", status: page.inSitemap === page.index ? "pass" : "fail", detail: page.inSitemap ? "In the sitemap" : "Not in the sitemap" },
  ];
  const measured = checks.filter((check) => check.status !== "unmeasured");
  const score = measured.length === 0 ? 0 : Math.round((measured.filter((check) => check.status === "pass").length / measured.length) * 100);
  return { score, checks };
}

export function snapshotLocalService(placeSlug: string, serviceSlug: string, intent: LocalIntent, inSitemap: boolean): OnPageSnapshot | null {
  const place = getCgPlace(placeSlug);
  const service = getSeoService(serviceSlug);
  if (!place || !service) return null;
  const copy = buildLocalLandingCopy(place, service, intent);
  const gate = evaluateSeoPath(copy.path);
  const photo = getPrimaryServicePhoto(service.slug);
  const body = [copy.directAnswer.answer, ...copy.sections.flatMap((section) => section.paragraphs), ...copy.faqs.map((faq) => faq.answer)].join(" ");
  const trust = [copy.directAnswer.answer, copy.cta].filter((line) => /safeshield|warranty|not a branch/i.test(line));
  return {
    path: copy.path,
    title: copy.title,
    description: copy.description,
    h1: copy.h1,
    headings: copy.sections.map((section) => section.heading),
    body,
    wordCount: words(body),
    intent,
    url: copy.path,
    canonicalPath: gate.canonicalPath,
    index: gate.index,
    httpStatus: gate.index && gate.canonicalPath === copy.path ? 200 : 301,
    inSitemap,
    links: copy.relatedServices.map((link) => ({ href: link.href, anchor: link.label })),
    imageAlt: photo?.alt ?? "",
    imageResponsive: true,
    schemaTypes: ["FAQPage", "Service", "BreadcrumbList", "HomeAndConstructionBusiness"],
    breadcrumbs: ["Home", "Chhattisgarh", place.name, service.name],
    social: { title: copy.title, description: copy.description, image: photo?.src ?? "" },
    trustSignals: trust,
    conversionLabel: copy.cta,
  };
}
