import { site } from "@/config/site";

export const dynamic = "force-dynamic";

export default function robots() {
  const base = site.url.replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/", "/_next/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
