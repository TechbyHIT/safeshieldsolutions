export type PageType =
  | "HOME"
  | "SERVICE"
  | "CITY"
  | "AREA"
  | "CITY_SERVICE"
  | "AREA_SERVICE"
  | "LOCALITY"
  | "LOCALITY_SERVICE"
  | "GUIDE"
  | "BLOG"
  | "PROBLEM"
  | "PROBLEM_SERVICE"
  | "PROPERTY_TYPE"
  | "PROPERTY_TYPE_SERVICE";

export type PageStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
export type IndexStatus = "INDEX" | "NOINDEX";

export interface PageIndexabilityInput {
  pageType: PageType;
  status: PageStatus;
  indexStatus: IndexStatus;
  wordCount: number;
  contentScore: number;
  isDuplicate: boolean;
  isThin: boolean;
  hasPlaceholder: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  h1: string | null;
  publishPhase: number;
}

export interface IndexabilityResult {
  indexable: boolean;
  reasons: string[];
}

const MIN_WORD_COUNTS: Partial<Record<PageType, number>> = {
  SERVICE: 800,
  CITY: 600,
  AREA: 700,
  CITY_SERVICE: 900,
  AREA_SERVICE: 20000,
  LOCALITY: 650,
  LOCALITY_SERVICE: 950,
  GUIDE: 1200,
  BLOG: 1000,
  PROBLEM: 700,
  PROBLEM_SERVICE: 900,
  PROPERTY_TYPE: 700,
  PROPERTY_TYPE_SERVICE: 900,
};

export function isPageIndexable(input: PageIndexabilityInput): IndexabilityResult {
  const reasons: string[] = [];

  if (input.status !== "PUBLISHED") {
    reasons.push("Page is not published");
  }

  if (input.indexStatus === "NOINDEX") {
    reasons.push("Page is explicitly set to noindex");
  }

  if (input.isDuplicate) {
    reasons.push("Duplicate content detected");
  }

  if (input.isThin) {
    reasons.push("Thin content detected");
  }

  if (input.hasPlaceholder) {
    reasons.push("Placeholder content detected");
  }

  if (!input.metaTitle?.trim()) {
    reasons.push("Missing meta title");
  }

  if (!input.metaDescription?.trim()) {
    reasons.push("Missing meta description");
  }

  if (!input.h1?.trim()) {
    reasons.push("Missing H1");
  }

  const minWords = MIN_WORD_COUNTS[input.pageType] ?? 600;
  if (input.wordCount < minWords) {
    reasons.push(`Word count ${input.wordCount} below minimum ${minWords}`);
  }

  if (input.contentScore < 0.7) {
    reasons.push(`Content score ${input.contentScore} below threshold 0.7`);
  }

  if (input.publishPhase === 0 && input.pageType !== "HOME") {
    reasons.push("Page not assigned to a publish phase");
  }

  return {
    indexable: reasons.length === 0,
    reasons,
  };
}

export function getRobotsDirective(_input: PageIndexabilityInput): string {
  return "index, follow";
}
