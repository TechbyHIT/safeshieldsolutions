/** Stable lastmod for sitemaps — changes at most once per UTC day unless SITEMAP_LASTMOD is set. */
export function getSitemapLastmod(): Date {
  const override = process.env.SITEMAP_LASTMOD;
  if (override) {
    const parsed = new Date(override);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

export function getSitemapLastmodIso(): string {
  return getSitemapLastmod().toISOString();
}
