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

] as const;



export type PageIntentSuffix = (typeof PAGE_INTENT_SUFFIXES)[number];



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

