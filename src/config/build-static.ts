/**
 * Build-time SSG is off by default so `next build` stays fast.
 * All programmatic URLs are generated on first request (ISR, revalidate 86400).
 *
 * Set NEXT_BUILD_STATIC_* > 0 only for a local smoke test — never in production deploy.
 */
export function buildStaticServiceLimit(): number {
  const raw = process.env.NEXT_BUILD_STATIC_SERVICES;
  if (raw === undefined || raw === "") return 0;
  const n = Number.parseInt(raw, 10);
  return Number.isNaN(n) || n < 0 ? 0 : n;
}

export function buildStaticCitySampleLimit(): number {
  const raw = process.env.NEXT_BUILD_STATIC_CITY_SAMPLES;
  if (raw === undefined || raw === "") return 0;
  const n = Number.parseInt(raw, 10);
  return Number.isNaN(n) || n < 0 ? 0 : n;
}

/** Always empty in production — used by every dynamic route. */
export function noBuildStaticParams(): [] {
  return [];
}

/** Small smoke set when NEXT_BUILD_STATIC_CITY_SAMPLES > 0 */
export const BUILD_CITY_SAMPLE_PARAMS = [
  { city: "chennai", segments: ["invisible-grills"] },
  { city: "chennai", segments: ["adyar", "invisible-grills-near-me"] },
  { city: "hyderabad", segments: ["gachibowli", "safety-nets-installation"] },
  { city: "coimbatore", segments: ["peelamedu", "cricket-box-grass-near-me"] },
  { city: "kochi", segments: ["kakkanad", "zip-screens-price"] },
] as const;
