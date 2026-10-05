import { CG_PRIORITY_PLACES } from "@/data/cg-local-seo";
import { cityServiceSlugsForPlace } from "@/lib/local-seo-catalog";
import { getSeoService } from "@/data/seo-services";
import { evaluateSeoPath } from "@/lib/seo-quality-gate";

export interface InternalLinkGroup {
  heading: string;
  links: { href: string; label: string }[];
}

function keep(href: string): boolean {
  const gate = evaluateSeoPath(href);
  return gate.index && gate.canonicalPath === href;
}

/** Internal links for city×service pages (not area-specific). */
export function buildCityPageInternalLinks(input: {
  citySlug: string;
  cityName: string;
  serviceSlug: string;
  serviceName: string;
  pageSlug: string;
}): InternalLinkGroup[] {
  const townLinks = CG_PRIORITY_PLACES.slice(0, 8).map((place) => ({
    href: `/chhattisgarh/${place.slug}/${input.serviceSlug}`,
    label: `${input.serviceName} in ${place.name}`,
  })).filter((item) => keep(item.href));

  const related = cityServiceSlugsForPlace("raipur")
    .filter((slug) => slug !== input.serviceSlug)
    .slice(0, 8)
    .map((slug) => {
      const service = getSeoService(slug);
      return {
        href: `/chhattisgarh/raipur/${slug}`,
        label: `${service?.name ?? slug} in Raipur`,
      };
    })
    .filter((item) => keep(item.href));

  return [
    { heading: `${input.serviceName} in served towns`, links: townLinks },
    { heading: "Other services in Raipur", links: related },
  ];
}
