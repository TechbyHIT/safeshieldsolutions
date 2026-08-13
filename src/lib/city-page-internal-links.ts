import { AREA_PAGE_SERVICES } from "@/data/seo-services";
import { HOME_CITY_AREAS } from "@/config/home-seo-links";
import { routes } from "@/config/routes";
import { PAGE_INTENT_SUFFIXES } from "@/lib/area-page-slugs-types";
import { contentSeed } from "@/lib/content-seed";

export interface InternalLinkGroup {
  heading: string;
  links: { href: string; label: string }[];
}

const CITY_INTENTS = PAGE_INTENT_SUFFIXES.filter((s) =>
  ["", "-near-me", "-installation", "-price", "-dealers", "-best", "-premium", "-affordable"].includes(s),
);

/** Internal links for city×service pages (not area-specific). */
export function buildCityPageInternalLinks(input: {
  citySlug: string;
  cityName: string;
  serviceSlug: string;
  serviceName: string;
  pageSlug: string;
}): InternalLinkGroup[] {
  const seed = contentSeed(input.citySlug, input.serviceSlug);
  const areas = HOME_CITY_AREAS[input.citySlug] ?? [];
  const areaLinks: { href: string; label: string }[] = [];

  for (let i = 0; i < Math.min(20, areas.length); i++) {
    const area = areas[(seed + i * 7) % areas.length];
    if (!area) break;
    areaLinks.push({
      href: routes.areaService(input.citySlug, area.slug, input.pageSlug),
      label: `${input.serviceName} in ${area.name}, ${input.cityName}`,
    });
  }

  const intentLinks = CITY_INTENTS.filter((s) => s).map((suffix) => ({
    href: routes.cityService(input.citySlug, `${input.serviceSlug}${suffix}`),
    label: `${input.serviceName}${suffix.replace(/-/g, " ")} in ${input.cityName}`,
  }));

  const otherServices = AREA_PAGE_SERVICES.filter((s) => s.slug !== input.serviceSlug)
    .slice(0, 12)
    .map((s) => ({
      href: routes.cityService(input.citySlug, `${s.slug}-near-me`),
      label: `${s.name} near me in ${input.cityName}`,
    }));

  return [
    { heading: `Popular ${input.cityName} localities for ${input.serviceName}`, links: areaLinks },
    { heading: `More ${input.serviceName} searches in ${input.cityName}`, links: intentLinks },
    { heading: `Other premium services near me in ${input.cityName}`, links: otherServices },
    {
      heading: "Browse all cities",
      links: [
        { href: routes.city(input.citySlug), label: `All areas in ${input.cityName}` },
        { href: routes.locations, label: "All service cities" },
        { href: routes.guides, label: "Installation guides" },
        { href: routes.blog, label: "Local project blog" },
      ],
    },
  ];
}
