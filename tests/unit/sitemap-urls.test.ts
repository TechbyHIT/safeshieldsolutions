import { describe, expect, it } from "vitest";
import {
  getAllSitemapEntries,
  getSitemapGroups,
  lastmodForPath,
  renderPublishedSitemapXml,
  renderUrlsetXml,
  summarizeSitemapInventory,
} from "@/lib/sitemap-urls";
import { sitemapGroupForPath } from "@/lib/seo-priority";
import { SEO_CONTENT_UPDATED_ISO } from "@/lib/seo-freshness";

describe("sitemap inventory", () => {
  const entries = getAllSitemapEntries();
  const groups = getSitemapGroups();
  const indexXml = renderPublishedSitemapXml();

  it("publishes sitemap.xml as an index of named child urlsets", () => {
    expect(indexXml).toContain("<sitemapindex");
    expect(indexXml).not.toContain("<urlset");
    expect(indexXml).toContain("https://safeshieldsolutions.in/sitemap-pages.xml");
    expect(indexXml).toContain("https://safeshieldsolutions.in/sitemap-raipur.xml");
    expect(indexXml).not.toContain("https://safeshieldsolutions.in/sitemap.xml</loc>");
  });

  it("puts each eligible URL in exactly one child sitemap", () => {
    const grouped = groups.flatMap((group) => group.entries.map((entry) => entry.loc));
    expect(grouped).toHaveLength(entries.length);
    expect(new Set(grouped).size).toBe(entries.length);
    expect(groups.every((group) => group.entries.length > 0)).toBe(true);
    expect(groups.some((group) => group.file === "sitemap-pages.xml")).toBe(true);
  });

  it("keeps static hubs out of the guides file", () => {
    expect(sitemapGroupForPath("/")).toBe("pages");
    expect(sitemapGroupForPath("/contact")).toBe("pages");
    expect(sitemapGroupForPath("/services/invisible-grills")).toBe("services");
    expect(sitemapGroupForPath("/chhattisgarh/raipur/invisible-grills")).toBe("raipur");
    expect(sitemapGroupForPath("/guides/invisible-grills-near-me-guide")).toBe("guides");
    const pages = groups.find((group) => group.id === "pages");
    expect(pages?.entries.some((entry) => entry.path === "/")).toBe(true);
    expect(pages?.entries.some((entry) => entry.path === "/seo-coverage")).toBe(false);
  });

  it("emits loc and lastmod without priority or changefreq", () => {
    const xml = renderUrlsetXml(entries.slice(0, 2));
    expect(xml).toContain("<loc>");
    expect(xml).toContain("<lastmod>");
    expect(xml).not.toContain("<priority>");
    expect(xml).not.toContain("<changefreq>");
    expect(lastmodForPath("/")).toBe(SEO_CONTENT_UPDATED_ISO);
  });

  it("summarizes counts without inventing a blog inventory", () => {
    const inventory = summarizeSitemapInventory();
    expect(inventory.total).toBe(entries.length);
    expect(inventory.byPageType.home).toBe(1);
    expect(inventory.groups.reduce((sum, group) => sum + group.count, 0)).toBe(entries.length);
  });

  it("keeps lastmod on the content revision, not the build clock", () => {
    const today = new Date().toISOString().slice(0, 10);
    expect(lastmodForPath("/")).toBe(SEO_CONTENT_UPDATED_ISO);
    expect(entries.every((entry) => entry.lastmod.startsWith(today))).toBe(false);
  });

  it("excludes out-of-area blog posts and internal tools", () => {
    const paths = new Set(entries.map((entry) => entry.path));
    expect(paths.has("/blog")).toBe(true);
    expect(paths.has("/blog/premium-invisible-grills-gachibowli")).toBe(false);
    expect(paths.has("/seo-coverage")).toBe(false);
    expect(paths.has("/locations/chhattisgarh")).toBe(false);
  });
});
