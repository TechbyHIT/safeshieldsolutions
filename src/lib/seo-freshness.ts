/**
 * Content revision used as sitemap lastmod.
 * Bump this only when page copy meaningfully changes. Do not set it from the build clock.
 */
export const SEO_CONTENT_UPDATED_ISO = "2026-10-04T00:00:00.000Z";

/** Stable lastmod. SITEMAP_LASTMOD overrides the revision date for a manual republish. */
export function getSitemapLastmod(): Date {
  const override = process.env.SITEMAP_LASTMOD;
  if (override) {
    const parsed = new Date(override);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  return new Date(SEO_CONTENT_UPDATED_ISO);
}

export function getSitemapLastmodIso(): string {
  return getSitemapLastmod().toISOString();
}
