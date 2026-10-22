export const seoDefaults = {
  titleTemplate: "%s | SafeShield Solutions",
  defaultTitle: "Invisible Grills & Safety Nets in Raipur | SafeShield",
  defaultDescription:
    "Invisible grills, balcony safety nets, and pigeon nets in Raipur and served Chhattisgarh towns. Free site survey, SS304 specification, and a written quote after measurement.",
  defaultKeywords: ["SafeShield Solutions", "safeshieldsolutions.in"],
  ogImage: "/images/photos/balcony-invisible-grills/168.webp",
  twitterHandle: "@safeshieldsolutions",
  robotsDefault: "index, follow",
  maxTitleLength: 60,
  maxDescriptionLength: 160,
} as const;

export type SeoDefaults = typeof seoDefaults;
