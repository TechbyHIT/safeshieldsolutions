import { NextResponse } from "next/server";
import {
  getAllSitemapEntries,
  getSitemapGroups,
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

/** Named urlsets: /api/sitemaps/raipur → sitemap-raipur.xml */
export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const slug = id.replace(/\.xml$/i, "").toLowerCase();
  const entries = getAllSitemapEntries();

  if (/^[1-9]$/.test(slug)) {
    return xmlResponse(renderUrlsetXml(entries));
  }

  const group = getSitemapGroups().find((item) => item.file === `sitemap-${slug}.xml`);
  if (!group) {
    return new NextResponse("Not found", { status: 404 });
  }
  return xmlResponse(renderUrlsetXml(group.entries));
}
