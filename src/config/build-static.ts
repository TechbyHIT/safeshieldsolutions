/**
 * Selective SSG is documented in src/lib/ssg-priority.ts.
 * Kept for local smoke tests only — production prerender lists live there.
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

/** Empty helper for routes that must not prerender (legacy location redirects). */
export function noBuildStaticParams(): [] {
  return [];
}
