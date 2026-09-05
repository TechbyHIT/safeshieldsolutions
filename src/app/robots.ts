import { site } from "@/config/site";

export default function robots() {
  const origin = site.url.replace(/\/$/, "");
  const host = new URL(origin.startsWith("http") ? origin : `https://${origin}`).hostname;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/*?*"],
      },
    ],
    sitemap: `${origin}/sitemap.xml`,
    host,
  };
}
