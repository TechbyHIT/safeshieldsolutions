import { getSitemapIndexLocs } from "@/lib/sitemap-urls";
import { getSitemapLastmodIso } from "@/lib/seo-freshness";

export const dynamic = "force-dynamic";

/** Official sitemap index (sitemapindex), not a urlset of child files. */
export async function GET() {
  const lastmod = getSitemapLastmodIso();
  const locs = getSitemapIndexLocs();

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${locs
  .map(
    (loc) => `  <sitemap>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`,
  )
  .join("\n")}
</sitemapindex>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
