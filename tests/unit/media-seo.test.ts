import { describe, expect, it } from "vitest";
import { getHeroPhoto, sitemapImageForPath } from "@/config/photo-catalog";
import { ELIGIBLE_VIDEOS, photoCopy, videoObjectSchema } from "@/lib/media-seo";
import { renderUrlsetXml, type SitemapEntry } from "@/lib/sitemap-urls";

describe("media SEO", () => {
  it("describes numbered photo files in the alt text and caption", () => {
    const copy = photoCopy("Balcony Invisible Grills", "168.webp");
    expect(copy.filenameDescriptive).toBe(false);
    expect(copy.alt).toBe("Balcony Invisible Grills fitted on a measured opening");
    expect(copy.caption.toLowerCase()).toContain("finished installation");
    expect(getHeroPhoto().alt).toBe(copy.alt);
  });

  it("adds the hero image only on the homepage and Raipur service URLs", () => {
    expect(sitemapImageForPath("/chhattisgarh/raipur/invisible-grills")?.src).toContain(".webp");
    expect(sitemapImageForPath("/chhattisgarh/bhilai/invisible-grills")).toBeNull();
    const entry = {
      loc: "https://safeshieldsolutions.in/chhattisgarh/raipur/invisible-grills",
      path: "/chhattisgarh/raipur/invisible-grills",
      lastmod: "2026-10-22",
      changefreq: "monthly",
      priority: 0.8,
      seoPriority: "P0",
      group: "raipur",
      sortRank: 1,
    } as SitemapEntry;
    const xml = renderUrlsetXml([entry]);
    expect(xml).toContain("xmlns:image=");
    expect(xml).toContain("<image:loc>https://safeshieldsolutions.in/images/photos/");
    expect(xml).toContain("<image:caption>");
  });

  it("does not emit a VideoObject without a transcript or captions", () => {
    expect(ELIGIBLE_VIDEOS).toHaveLength(0);
    expect(
      videoObjectSchema({
        name: "Install film",
        contentUrl: "https://safeshieldsolutions.in/videos/install.mp4",
        thumbnailUrl: "https://safeshieldsolutions.in/images/photos/balcony-invisible-grills/168.webp",
        uploadDate: "2026-10-22",
        transcript: "",
      }),
    ).toBeNull();
    expect(
      videoObjectSchema({
        name: "Install film",
        contentUrl: "https://safeshieldsolutions.in/videos/install.mp4",
        thumbnailUrl: "https://safeshieldsolutions.in/images/photos/balcony-invisible-grills/168.webp",
        uploadDate: "2026-10-22",
        transcript: "The crew measures the opening before fitting the cable line.",
      })?.["@type"],
    ).toBe("VideoObject");
  });
});
