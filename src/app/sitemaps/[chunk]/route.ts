import { imageCatalog } from "@/config/images";
import { site } from "@/config/site";
import { getSitemapLastmodIso } from "@/lib/seo-freshness";
import {
  getSitemapChangeFreq,
  getSitemapChunkCount,
  getSitemapChunkEntries,
  getSitemapPriority,
} from "@/lib/sitemap-urls";

export const dynamic = "force-dynamic";

interface RouteProps {
  params: Promise<{ chunk: string }>;
}

function xmlEscape(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function imageSitemapBody(): string {
  const base = site.url.replace(/\/$/, "");
  const lastmod = getSitemapLastmodIso();
  const images = Object.values(imageCatalog);
  const urls = images
    .map((img) => {
      const loc = img.src.startsWith("http") ? img.src : `${base}${img.src}`;
      return `  <url>
    <loc>${xmlEscape(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export async function GET(_request: Request, { params }: RouteProps) {
  const { chunk } = await params;
  const name = chunk.replace(/\.xml$/i, "");

  if (name === "images") {
    return new Response(imageSitemapBody(), {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  }

  const chunkId = Number.parseInt(name, 10);
  const max = getSitemapChunkCount();
  if (Number.isNaN(chunkId) || chunkId < 0 || chunkId >= max) {
    return new Response("Not found", { status: 404 });
  }

  const entries = getSitemapChunkEntries(chunkId);
  if (entries.length === 0) {
    return new Response("Not found", { status: 404 });
  }

  const lastmod = getSitemapLastmodIso();
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    ({ url, path }) => `  <url>
    <loc>${xmlEscape(url)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${getSitemapChangeFreq(path)}</changefreq>
    <priority>${getSitemapPriority(path).toFixed(2)}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
