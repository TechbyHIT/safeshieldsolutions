import type { MetadataRoute } from "next";
import { getAllSitemapEntries } from "@/lib/sitemap-urls";

/** Served at /sitemap.xml by Next — does not depend on nginx alias copies. */
export const revalidate = 86400;

export default function sitemap(): MetadataRoute.Sitemap {
  return getAllSitemapEntries().map((entry) => ({
    url: entry.loc,
    lastModified: entry.lastmod,
    changeFrequency: entry.changefreq,
    priority: entry.priority,
  }));
}
