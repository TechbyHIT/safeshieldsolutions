/**
 * Publication gate for a generated URL.
 * A failed critical check keeps the URL out of the index.
 */
import { evaluateSeoPath } from "@/lib/seo-quality-gate";

export type PublicationStatus = "publish" | "review" | "block";

export interface PublicationInput {
  path: string;
  title: string;
  description: string;
  h1: string;
  headings: string[];
  body: string;
  wordCount: number;
  imageAlt: string;
  links: { href: string; anchor: string }[];
  schemaTypes: string[];
  conversionLabel: string;
}

export interface PublicationDecision {
  status: PublicationStatus;
  index: boolean;
  canonicalPath: string;
  failures: string[];
  reviews: string[];
}

const INAPPROPRIATE_SCHEMA = new Set(["Product", "Event", "JobPosting", "Recipe", "Course", "VideoObject"]);

function misleadingLocalClaim(body: string): boolean {
  return /our branch|branch office in|we have an office in|flat rate of ₹/i.test(body);
}

export function publicationGate(input: PublicationInput): PublicationDecision {
  const gate = evaluateSeoPath(input.path);
  const failures: string[] = [];
  const reviews: string[] = [];

  if (!gate.index || gate.canonicalPath !== input.path) {
    failures.push(gate.reasons[0] ?? "This URL is not a distinct indexable intent.");
  }
  if (input.title.trim().length < 10 || input.h1.trim().length < 10) failures.push("Title or H1 is incomplete.");
  if (input.title.trim() && input.h1.trim() && input.title.trim() !== input.h1.trim()) {
    reviews.push("Title and H1 differ.");
  }
  if (input.description.trim().length < 50) failures.push("Meta description is missing or too short.");
  if (!/^[a-z0-9/-]+$/.test(input.path.replace(/^\//, "")) && input.path !== "/") failures.push("URL is not readable.");
  if (input.wordCount < 1500) reviews.push(`Main content is ${input.wordCount} words.`);
  if (input.wordCount < 400) failures.push("Main content does not carry a useful explanation.");
  if (!/measure|measurement/i.test(input.body)) failures.push("The page does not explain that the quote follows measurement.");
  if (misleadingLocalClaim(input.body)) failures.push("The page makes a misleading local claim.");
  if (input.imageAlt.trim().length < 10) failures.push("Image alt text is missing.");
  if (input.links.length === 0 || input.links.some((link) => !link.href.startsWith("/") || link.anchor.trim().length < 3)) {
    failures.push("A crawlable internal link or its anchor is missing.");
  }
  if (input.headings.length < 2) failures.push("The page has no heading structure.");
  if (input.schemaTypes.some((type) => INAPPROPRIATE_SCHEMA.has(type))) {
    failures.push("Structured data includes a type this page cannot support.");
  }
  if (!input.schemaTypes.includes("Service") && !input.schemaTypes.includes("FAQPage")) {
    reviews.push("Service or FAQ schema is absent.");
  }
  if (input.conversionLabel.trim().length < 10) failures.push("The page has no next action.");

  const status: PublicationStatus = failures.length > 0 ? "block" : reviews.length > 0 ? "review" : "publish";
  return {
    status,
    index: status === "publish" && gate.index && gate.canonicalPath === input.path,
    canonicalPath: gate.canonicalPath,
    failures,
    reviews,
  };
}
