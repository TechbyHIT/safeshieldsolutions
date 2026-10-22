import { NextResponse } from "next/server";
import {
  getSitemapGroups,
  renderPublishedSitemapXml,
  renderUrlsetXml,
} from "@/lib/sitemap-urls";

export const revalidate = 86400;

function xmlResponse(xml: string) {
  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

/** /api/sitemaps/index → sitemap.xml index. Named ids → child urlsets. */
export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const slug = id.replace(/\.xml$/i, "").toLowerCase();

  if (slug === "index" || slug === "xml" || slug === "1") {
    return xmlResponse(renderPublishedSitemapXml());
  }

  const group = getSitemapGroups().find((item) => item.file === `sitemap-${slug}.xml`);
  if (!group) {
    return new NextResponse("Not found", { status: 404 });
  }
  return xmlResponse(renderUrlsetXml(group.entries));
}
