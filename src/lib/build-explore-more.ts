import { routes } from "@/config/routes";
import { evaluateSeoPath } from "@/lib/seo-quality-gate";
import { cityServiceSlugsForPlace } from "@/lib/local-seo-catalog";
import { getSeoService } from "@/data/seo-services";
import { getCgPlace } from "@/data/cg-local-seo";
import type { ExploreMoreContext, ExploreMoreSectionData } from "@/lib/explore-more-types";

function keep(href: string): boolean {
  return evaluateSeoPath(href).index && evaluateSeoPath(href).canonicalPath === href;
}

/** Contextual links only. Intent doorway URLs are not emitted. */
export function buildExploreMoreSection(ctx: ExploreMoreContext): ExploreMoreSectionData {
  const placeSlug = ctx.areaSlug && getCgPlace(ctx.areaSlug) ? ctx.areaSlug : null;
  const links: { href: string; label: string }[] = [];

  if (placeSlug) {
    links.push({ href: `/chhattisgarh/${placeSlug}`, label: `${ctx.areaName ?? placeSlug}` });
    for (const slug of cityServiceSlugsForPlace(placeSlug).slice(0, 6)) {
      if (slug === ctx.serviceSlug) continue;
      const service = getSeoService(slug);
      if (!service) continue;
      const href = `/chhattisgarh/${placeSlug}/${slug}`;
      if (keep(href)) links.push({ href, label: `${service.name} in ${ctx.areaName}` });
    }
    const nearMe = `/chhattisgarh/${placeSlug}/${ctx.serviceSlug}-near-me`;
    if (keep(nearMe)) links.push({ href: nearMe, label: `${ctx.serviceName} near me` });
  }

  links.push({ href: "/chhattisgarh", label: "Chhattisgarh" });
  links.push({ href: routes.services, label: "All services" });
  links.push({ href: routes.contact, label: "Request a quote" });

  return {
    pageKey: [ctx.citySlug, ctx.areaSlug, ctx.pageSlug].filter(Boolean).join("/"),
    title: "Related pages",
    subtitle: `${ctx.serviceName} in ${ctx.areaName ? `${ctx.areaName}, ` : ""}${ctx.cityName}`,
    cards: [
      {
        id: "related",
        icon: "related",
        heading: "Related pages",
        description: "Parent town, nearby services, and the quote form.",
        links: links.filter((item, index, all) => all.findIndex((row) => row.href === item.href) === index),
      },
    ],
  };
}
