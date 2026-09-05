import { AREA_PAGE_SERVICES } from "@/data/seo-services";
import { getAreasForCity } from "@/data/areas";
import { routes } from "@/config/routes";
import { intentSuffixesForCity } from "@/lib/area-page-slugs-types";
import { contentSeed } from "@/lib/content-seed";

export interface InternalLinkGroup {
  heading: string;
  links: { href: string; label: string }[];
}

const FEATURED_INTENTS = [
  "-installation",
  "-price",
  "-dealers",
  "-near-me",
  "-cost",
  "-contractors",
  "-company",
  "-quote",
  "-best",
  "-affordable",
] as const;

/** SEO internal links for area-service pages. */
export function buildPageInternalLinks(input: {
  citySlug: string;
  cityName: string;
  areaSlug: string;
  areaName: string;
  serviceSlug: string;
  serviceName: string;
  pageSlug: string;
}): InternalLinkGroup[] {
  const topIntents = intentSuffixesForCity(input.citySlug).filter((s) =>
    FEATURED_INTENTS.includes(s as (typeof FEATURED_INTENTS)[number]),
  );
  const seed = contentSeed(input.areaSlug, input.serviceSlug);
  const zoneAreas = getAreasForCity(input.citySlug).filter((a) => a.slug !== input.areaSlug);
  const nearbyCount = 18;
  const nearby: { href: string; label: string }[] = [];

  for (let i = 0; i < nearbyCount; i++) {
    const area = zoneAreas[(seed + i * 13) % zoneAreas.length];
    if (!area) break;
    nearby.push({
      href: routes.areaService(input.citySlug, area.slug, input.pageSlug),
      label: `${input.serviceName} in ${area.name}`,
    });
  }

  const intentLinks = topIntents.map((suffix) => ({
    href: routes.areaService(input.citySlug, input.areaSlug, `${input.serviceSlug}${suffix}`),
    label: `${input.serviceName}${suffix.replace(/-/g, " ")} in ${input.areaName}`,
  }));

  const otherServices = AREA_PAGE_SERVICES.filter((s) => s.slug !== input.serviceSlug)
    .slice(0, 15)
    .map((s) => ({
      href: routes.areaService(input.citySlug, input.areaSlug, s.slug),
      label: `${s.name} in ${input.areaName}, ${input.cityName}`,
    }));

  const cityHub = [
    { href: routes.city(input.citySlug), label: `All services in ${input.cityName}` },
    { href: routes.cityService(input.citySlug, input.serviceSlug), label: `${input.serviceName} in ${input.cityName}` },
    { href: routes.locations, label: "All service cities" },
  ];

  return [
    { heading: `More ${input.serviceName} searches in ${input.areaName}`, links: intentLinks },
    { heading: `Other services in ${input.areaName}, ${input.cityName}`, links: otherServices },
    { heading: `${input.serviceName} in nearby ${input.cityName} areas`, links: nearby },
    { heading: `${input.cityName} service hubs`, links: cityHub },
  ];
}
