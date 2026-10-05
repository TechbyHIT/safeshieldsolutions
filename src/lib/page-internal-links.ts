import { getIndexableLocalitiesForCity } from "@/data/cg-hierarchy";
import { cityServiceSlugsForPlace } from "@/lib/local-seo-catalog";
import { getSeoService } from "@/data/seo-services";
import { getCgPlace } from "@/data/cg-local-seo";
import { evaluateSeoPath } from "@/lib/seo-quality-gate";

export interface InternalLinkGroup {
  heading: string;
  links: { href: string; label: string }[];
}

function keep(href: string): boolean {
  const gate = evaluateSeoPath(href);
  return gate.index && gate.canonicalPath === href;
}

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
  const place = getCgPlace(input.areaSlug);
  const parent = place
    ? `/chhattisgarh/${place.slug}`
    : `/chhattisgarh`;
  const related = (place ? cityServiceSlugsForPlace(place.slug) : [])
    .filter((slug) => slug !== input.serviceSlug)
    .slice(0, 6)
    .map((slug) => ({
      href: `/chhattisgarh/${input.areaSlug}/${slug}`,
      label: `${getSeoService(slug)?.name ?? slug} in ${input.areaName}`,
    }))
    .filter((item) => keep(item.href));

  const localities = place
    ? getIndexableLocalitiesForCity(place.slug).slice(0, 8).map((area) => ({
        href: `/chhattisgarh/${place.slug}/areas/${area.slug}`,
        label: area.name,
      }))
    : [];

  const nearby = (place?.nearby ?? [])
    .slice(0, 3)
    .map((slug) => {
      const item = getCgPlace(slug);
      return item
        ? {
            href: `/chhattisgarh/${slug}/${input.serviceSlug}`,
            label: `${input.serviceName} in ${item.name}`,
          }
        : null;
    })
    .filter((item): item is { href: string; label: string } => Boolean(item && keep(item.href)));

  return [
    {
      heading: `${input.areaName} pages`,
      links: [
        { href: parent, label: input.areaName },
        { href: `/chhattisgarh/${input.areaSlug}/${input.serviceSlug}`, label: `${input.serviceName} in ${input.areaName}` },
      ].filter((item) => keep(item.href)),
    },
    { heading: `Other services in ${input.areaName}`, links: related },
    { heading: "Nearby towns", links: nearby },
    { heading: "Localities", links: localities.filter((item) => keep(item.href)) },
  ].filter((group) => group.links.length > 0);
}
