/** High-intent suffixes only — one URL per canonical service slug (no phrase-slug explosion). */

export const PAGE_INTENT_SUFFIXES = [
  "",
  "-near-me",
  "-installation",
  "-price",
  "-dealers",
  "-contractors",
  "-best",
  "-premium",
  "-free-survey",
  "-cost",
  "-affordable",
  "-company",
] as const;

/**
 * Extra search intents for Chhattisgarh only — every existing service × every area.
 * Other cities keep the default suffix set.
 */
export const CHHATTISGARH_EXTRA_INTENT_SUFFIXES = [
  "-quote",
  "-nearby",
  "-rates",
  "-charges",
  "-suppliers",
  "-manufacturers",
  "-service",
  "-services",
  "-same-day",
  "-local",
  "-home",
  "-apartment",
  "-balcony",
  "-window",
  "-villa",
  "-warranty",
  "-ss304",
  "-stainless-steel",
  "-for-balconies",
  "-for-windows",
  "-for-children",
  "-for-pets",
  "-high-rise",
  "-society",
  "-residential",
  "-commercial",
  "-custom",
  "-professional",
] as const;

export type PageIntentSuffix = (typeof PAGE_INTENT_SUFFIXES)[number];

export function intentSuffixesForCity(citySlug?: string): readonly string[] {
  if (citySlug === "chhattisgarh") {
    return [...PAGE_INTENT_SUFFIXES, ...CHHATTISGARH_EXTRA_INTENT_SUFFIXES];
  }
  return PAGE_INTENT_SUFFIXES;
}

export interface ResolvedAreaPageSlug {
  /** Slug segment in URL */
  urlSlug: string;
  /** Canonical service for content/materials */
  serviceSlug: string;
  /** Human intent label for H1/meta, e.g. "installation" */
  intentLabel: string;
  /** Optional search phrase slug when URL came from a phrase base */
  phraseSlug?: string;
}
