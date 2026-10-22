export const routes = {
  home: "/",
  services: "/services",
  service: (slug: string) => `/services/${slug}`,
  locations: "/locations",
  city: (slug: string) => (slug === "chhattisgarh" ? "/chhattisgarh" : `/locations/${slug}`),
  area: (citySlug: string, areaSlug: string) =>
    `/locations/${citySlug}/${areaSlug}`,
  cityService: (citySlug: string, serviceSlug: string) =>
    citySlug === "chhattisgarh"
      ? `/chhattisgarh/${serviceSlug}`
      : `/chhattisgarh/${citySlug}/${serviceSlug}`,
  areaService: (citySlug: string, areaSlug: string, serviceSlug: string) =>
    `/${citySlug}/${areaSlug}/${serviceSlug}`,
  guides: "/guides",
  guide: (slug: string) => `/guides/${slug}`,
  blog: "/blog",
  blogPost: (slug: string) => `/blog/${slug}`,
  contact: "/contact",
  about: "/about",
  gallery: "/gallery",
  faq: "/faq",
  glossary: "/glossary",
  htmlSitemap: "/html-sitemap",
  sitemap: "/sitemap.xml",
} as const;

export type RoutesConfig = typeof routes;
