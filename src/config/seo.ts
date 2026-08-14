export const seoDefaults = {
  titleTemplate: "%s | SafeShield Solutions",
  defaultTitle:
    "Invisible Grills Near Me | Safety Nets & Zip Screens | SafeShield Solutions",
  defaultDescription:
    "SafeShield Solutions — invisible grills near me, safety nets, pigeon nets, zip screens, mesh doors & cricket box grass in Chennai, Hyderabad, Coimbatore & Kochi. Free site survey, SS304 materials, 5-year warranty.",
  defaultKeywords: [
    "invisible grills near me",
    "safety nets near me",
    "pigeon nets near me",
    "zip screens near me",
    "mesh doors near me",
    "cricket box grass near me",
    "invisible grill installation",
    "safety net dealers",
    "invisible grill price",
    "Chennai",
    "Hyderabad",
    "Coimbatore",
    "Kochi",
  ],
  ogImage: "/images/photos/balcony-invisible-grills/168.webp",
  twitterHandle: "@safeshieldsolutions",
  robotsDefault: "index, follow",
  maxTitleLength: 60,
  maxDescriptionLength: 160,
} as const;

export type SeoDefaults = typeof seoDefaults;
