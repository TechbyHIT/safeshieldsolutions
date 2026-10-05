/**
 * BUILD-TIME PRE-RENDERING ONLY.
 *
 * generateStaticParams() decides which HTML is produced during `next build`.
 * It does NOT decide indexability, sitemap inclusion, canonicals, or robots.
 *
 * Priority:
 *   P1 Raipur city + Raipur services (general + near-me) + Raipur localities
 *   P2 Major Chhattisgarh city hubs
 *   P3 District hubs (all)
 *   P4 High-value service pages on other served towns (general, not near-me)
 *   P5 Remaining valid long-tail URLs → on-demand ISR
 */
import { AREA_PAGE_SERVICES, getSeoService } from "@/data/seo-services";
import { CG_CORE_SERVICE_SLUGS, CG_PRIORITY_PLACES } from "@/data/cg-local-seo";
import {
  CG_DISTRICTS,
  getIndexableLocalitiesForCity,
  isLocalityServiceIndexable,
  LOCALITY_SERVICE_SLUGS,
} from "@/data/cg-hierarchy";
import { blogPosts, guideArticles } from "@/config/guides-content";
import { P1_CITY_SLUGS, RAIPUR_CORE_SERVICE_SLUGS } from "@/lib/seo-priority";
import { cityServiceSlugsForPlace, listIndexableLocalPaths, nearMeSlug } from "@/lib/local-seo-catalog";
import { isValidServiceLocation } from "@/lib/service-location";

export type CatchAllStaticParam = { city: string; segments: string[] };

/**
 * High-value catalogue slugs used for selective SSG outside Raipur.
 * Taken from the business dataset — not a random hardcoded city list.
 */
export const HIGH_VALUE_SERVICE_SLUGS = [
  ...RAIPUR_CORE_SERVICE_SLUGS,
  "balcony-safety-nets",
  "balcony-invisible-grills",
  "window-invisible-grills",
  "child-safety-nets",
  "mosquito-nets",
  "cloth-hangers",
] as const;

const HIGH_VALUE_SET = new Set<string>(
  HIGH_VALUE_SERVICE_SLUGS.filter((slug) => Boolean(getSeoService(slug))),
);

function uniqueParams(): {
  list: CatchAllStaticParam[];
  add: (segments: string[]) => void;
} {
  const list: CatchAllStaticParam[] = [];
  const seen = new Set<string>();
  return {
    list,
    add(segments: string[]) {
      const key = segments.join("/");
      if (seen.has(key)) return;
      seen.add(key);
      list.push({ city: "chhattisgarh", segments });
    },
  };
}

/** Catch-all `[city]/[...segments]` — Raipur first, then majors, then high-value. */
export function generateCatchAllStaticParams(): CatchAllStaticParam[] {
  const { list, add } = uniqueParams();

  add(["raipur"]);
  for (const slug of cityServiceSlugsForPlace("raipur")) {
    if (!isValidServiceLocation(slug, "raipur").valid) continue;
    add(["raipur", slug]);
    if (isValidServiceLocation(nearMeSlug(slug), "raipur").valid) {
      add(["raipur", nearMeSlug(slug)]);
    }
  }

  for (const slug of CG_CORE_SERVICE_SLUGS) {
    add([slug]);
  }

  for (const city of P1_CITY_SLUGS) {
    add([city]);
  }

  for (const place of CG_PRIORITY_PLACES) {
    if (place.slug === "raipur") continue;
    add([place.slug]);
    const allowed = new Set(cityServiceSlugsForPlace(place.slug));
    for (const slug of HIGH_VALUE_SET) {
      if (!allowed.has(slug)) continue;
      if (!isValidServiceLocation(slug, place.slug).valid) continue;
      add([place.slug, slug]);
    }
  }

  return list;
}

export function generateDistrictStaticParams(): { district: string }[] {
  return CG_DISTRICTS.map((district) => ({ district: district.slug }));
}

export function generateLocalityHubStaticParams(): { city: string; area: string }[] {
  const params: { city: string; area: string }[] = [];
  for (const place of CG_PRIORITY_PLACES) {
    for (const area of getIndexableLocalitiesForCity(place.slug)) {
      params.push({ city: place.slug, area: area.slug });
    }
  }
  return params;
}

export function generateLocalityServiceStaticParams(): {
  city: string;
  area: string;
  service: string;
}[] {
  const params: { city: string; area: string; service: string }[] = [];
  for (const place of CG_PRIORITY_PLACES) {
    for (const area of getIndexableLocalitiesForCity(place.slug)) {
      for (const service of LOCALITY_SERVICE_SLUGS) {
        if (!isLocalityServiceIndexable(place.slug, area.slug, service)) continue;
        params.push({ city: place.slug, area: area.slug, service });
      }
    }
  }
  return params;
}

export function generateServiceSlugStaticParams(): { slug: string }[] {
  return AREA_PAGE_SERVICES.map((service) => ({ slug: service.slug }));
}

export function generateGuideSlugStaticParams(): { slug: string }[] {
  return guideArticles.map((article) => ({ slug: article.slug }));
}

export function generateBlogSlugStaticParams(): { slug: string }[] {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

/** Local SEO paths that Next will HTML-prerender. Independent of the sitemap. */
export function listPrerenderedLocalSeoPaths(): string[] {
  const paths: string[] = [];
  for (const param of generateCatchAllStaticParams()) {
    paths.push(`/chhattisgarh/${param.segments.join("/")}`);
  }
  for (const param of generateDistrictStaticParams()) {
    paths.push(`/chhattisgarh/districts/${param.district}`);
  }
  for (const param of generateLocalityHubStaticParams()) {
    paths.push(`/chhattisgarh/${param.city}/areas/${param.area}`);
  }
  for (const param of generateLocalityServiceStaticParams()) {
    paths.push(`/chhattisgarh/${param.city}/areas/${param.area}/${param.service}`);
  }
  return paths;
}

export function isBuildTimePrerendered(path: string): boolean {
  return listPrerenderedLocalSeoPathSet().has(path);
}

let prerenderSetCache: Set<string> | undefined;

function listPrerenderedLocalSeoPathSet(): Set<string> {
  prerenderSetCache ??= new Set(listPrerenderedLocalSeoPaths());
  return prerenderSetCache;
}

export interface PrerenderSummary {
  raipurPages: number;
  otherPriorityPages: number;
  districtPages: number;
  localityPages: number;
  buildTimeLocalSeoPages: number;
  indexableLocalSeoPages: number;
  onDemandIsrPages: number;
  catchAllParams: number;
  sampleOnDemandPath: string | null;
}

export function summarizePrerenderVsIndexable(): PrerenderSummary {
  const prerendered = listPrerenderedLocalSeoPaths();
  const prerenderSet = new Set(prerendered);
  const indexable = listIndexableLocalPaths().map((record) => record.path);
  const onDemand = indexable.filter((path) => !prerenderSet.has(path));
  const raipurPages = prerendered.filter(
    (path) => path === "/chhattisgarh/raipur" || path.startsWith("/chhattisgarh/raipur/"),
  ).length;
  const districtPages = prerendered.filter((path) => path.startsWith("/chhattisgarh/districts/")).length;
  const localityPages = prerendered.filter((path) => path.includes("/areas/")).length;

  return {
    raipurPages,
    otherPriorityPages: prerendered.length - raipurPages,
    districtPages,
    localityPages,
    buildTimeLocalSeoPages: prerendered.length,
    indexableLocalSeoPages: indexable.length,
    onDemandIsrPages: onDemand.length,
    catchAllParams: generateCatchAllStaticParams().length,
    sampleOnDemandPath: onDemand.find((path) => path.split("/").filter(Boolean).length === 3) ?? onDemand[0] ?? null,
  };
}
