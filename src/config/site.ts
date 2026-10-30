export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://safeshieldsolutions.in",
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "SafeShield Solutions",
  locale: "en-IN",
  /** Open Graph uses underscore form; html lang and hreflang use the hyphen form. */
  ogLocale: "en_IN",
  defaultLanguage: "en",
  themeColor: "#0B2C5E",
  revalidateSeconds: 86400,
  /** Max paths for audits / warm lists — not build-time SSG (see NEXT_BUILD_* env). */
  staticParamsLimit: 48,
} as const;

export type SiteConfig = typeof site;
