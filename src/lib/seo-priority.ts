import { CG_CORE_SERVICE_SLUGS, isCgPriorityPlace } from "@/data/cg-local-seo";
import { getIndexableLocalitiesForCity } from "@/data/cg-hierarchy";
import { TOWN_LINK_PRIORITY } from "@/lib/seo-graph";

/**
 * Internal planning label. Google does not read this as a ranking instruction.
 * P0 Raipur core, P1 Bhilai/Durg/Bilaspur/Korba, P2 other served towns and other Raipur services,
 * P3 approved localities and supporting pages.
 */
export type SeoPriority = "P0" | "P1" | "P2" | "P3";

export const P1_CITY_SLUGS = ["bhilai", "durg", "bilaspur", "korba"] as const;

/** Raipur commercial URLs listed first. pigeon-nets redirects and is not a second page. */
export const RAIPUR_CORE_SERVICE_SLUGS = [
  "invisible-grills",
  "safety-nets",
  "pigeon-safety-nets",
  "bird-spikes",
] as const;

export const RAIPUR_ENTRY_LINKS = [
  { href: "/chhattisgarh", label: "Chhattisgarh" },
  { href: "/chhattisgarh/raipur", label: "Raipur" },
  { href: "/chhattisgarh/raipur/invisible-grills", label: "Invisible grills in Raipur" },
  { href: "/chhattisgarh/raipur/safety-nets", label: "Safety nets in Raipur" },
  { href: "/chhattisgarh/raipur/pigeon-safety-nets", label: "Pigeon nets in Raipur" },
  { href: "/chhattisgarh/raipur/bird-spikes-near-me", label: "Bird spikes in Raipur" },
] as const;

export const SITEMAP_GROUP_ORDER = [
  "chhattisgarh",
  "raipur",
  "cities",
  "districts",
  "city-services",
  "areas",
  "services",
  "guides",
] as const;

export type SitemapGroupId = (typeof SITEMAP_GROUP_ORDER)[number];

export const SITEMAP_GROUP_FILES: Record<SitemapGroupId, string> = {
  chhattisgarh: "sitemap-chhattisgarh.xml",
  raipur: "sitemap-raipur.xml",
  cities: "sitemap-cities.xml",
  districts: "sitemap-districts.xml",
  "city-services": "sitemap-city-services.xml",
  areas: "sitemap-areas.xml",
  services: "sitemap-services.xml",
  guides: "sitemap-guides.xml",
};

const P1_SET = new Set<string>(P1_CITY_SLUGS);
const CORE_SET = new Set<string>(RAIPUR_CORE_SERVICE_SLUGS);
const CITY_ORDER = TOWN_LINK_PRIORITY.filter((slug) => slug !== "raipur");

function cityRank(slug: string): number {
  const index = CITY_ORDER.indexOf(slug as (typeof CITY_ORDER)[number]);
  return index < 0 ? 80 : index;
}

function serviceBaseSlug(slug: string): string {
  return slug.endsWith("-near-me") ? slug.slice(0, -8) : slug;
}

function isNearMeSlug(slug: string): boolean {
  return slug.endsWith("-near-me");
}

function serviceRank(slug: string): number {
  const base = serviceBaseSlug(slug);
  const core = RAIPUR_CORE_SERVICE_SLUGS.indexOf(base as (typeof RAIPUR_CORE_SERVICE_SLUGS)[number]);
  const rest = CG_CORE_SERVICE_SLUGS.indexOf(base as (typeof CG_CORE_SERVICE_SLUGS)[number]);
  const baseRank = core >= 0 ? core : rest >= 0 ? 10 + rest : 40;
  return baseRank * 2 + (isNearMeSlug(slug) ? 1 : 0);
}

export function sitemapGroupForPath(path: string): SitemapGroupId {
  if (path === "/chhattisgarh") return "chhattisgarh";
  if (path.startsWith("/chhattisgarh/districts/")) return "districts";
  if (path === "/chhattisgarh/raipur" || path.startsWith("/chhattisgarh/raipur/")) return "raipur";
  const parts = path.split("/").filter(Boolean);
  if (parts[0] === "chhattisgarh" && parts[2] === "areas") return "areas";
  if (parts[0] === "chhattisgarh" && parts.length === 2 && isCgPriorityPlace(parts[1]!)) return "cities";
  if (parts[0] === "chhattisgarh" && parts.length === 3 && isCgPriorityPlace(parts[1]!)) {
    return "city-services";
  }
  if (path === "/services" || path.startsWith("/services/") || (parts[0] === "chhattisgarh" && parts.length === 2)) {
    return "services";
  }
  return "guides";
}

export function seoPriorityForPath(path: string): SeoPriority {
  if (path === "/chhattisgarh/raipur") return "P0";
  const raipurService = /^\/chhattisgarh\/raipur\/([^/]+)$/.exec(path);
  if (raipurService?.[1] && CORE_SET.has(serviceBaseSlug(raipurService[1]))) return "P0";
  if (path.startsWith("/chhattisgarh/raipur/areas/")) return "P3";
  if (path.startsWith("/chhattisgarh/raipur/")) return "P2";

  if (path.includes("/areas/")) return "P3";
  if (path.startsWith("/chhattisgarh/districts/")) return "P2";

  const town = /^\/chhattisgarh\/([^/]+)$/.exec(path);
  if (town?.[1] && isCgPriorityPlace(town[1])) {
    return P1_SET.has(town[1]) ? "P1" : "P2";
  }

  const townService = /^\/chhattisgarh\/([^/]+)\/([^/]+)$/.exec(path);
  if (townService?.[1] && isCgPriorityPlace(townService[1])) {
    if (P1_SET.has(townService[1]) && CORE_SET.has(serviceBaseSlug(townService[2] ?? ""))) return "P1";
    return "P2";
  }

  if (path === "/chhattisgarh") return "P1";
  return "P3";
}

/** Lower sorts first inside a sitemap file. */
export function sitemapSortRank(path: string): number {
  if (path === "/") return 0;
  if (path === "/chhattisgarh") return 0;
  if (path === "/chhattisgarh/raipur") return 0;

  const raipurService = /^\/chhattisgarh\/raipur\/([^/]+)$/.exec(path);
  if (raipurService?.[1]) return 10 + serviceRank(raipurService[1]);

  const raipurArea = /^\/chhattisgarh\/raipur\/areas\/([^/]+)$/.exec(path);
  if (raipurArea?.[1]) {
    return 200 + localityRank("raipur", raipurArea[1]);
  }

  const raipurAreaService = /^\/chhattisgarh\/raipur\/areas\/([^/]+)\/([^/]+)$/.exec(path);
  if (raipurAreaService?.[1] && raipurAreaService[2]) {
    return 400 + localityRank("raipur", raipurAreaService[1]) * 10 + serviceRank(raipurAreaService[2]);
  }

  const town = /^\/chhattisgarh\/([^/]+)$/.exec(path);
  if (town?.[1] && isCgPriorityPlace(town[1])) return cityRank(town[1]);

  const townService = /^\/chhattisgarh\/([^/]+)\/([^/]+)$/.exec(path);
  if (townService?.[1] && isCgPriorityPlace(townService[1]) && townService[2]) {
    return cityRank(townService[1]) * 100 + serviceRank(townService[2]);
  }

  const otherArea = /^\/chhattisgarh\/([^/]+)\/areas\/([^/]+)$/.exec(path);
  if (otherArea?.[1] && otherArea[2]) {
    return cityRank(otherArea[1]) * 100 + localityRank(otherArea[1], otherArea[2]);
  }

  const otherAreaService = /^\/chhattisgarh\/([^/]+)\/areas\/([^/]+)\/([^/]+)$/.exec(path);
  if (otherAreaService?.[1] && otherAreaService[2] && otherAreaService[3]) {
    return (
      cityRank(otherAreaService[1]) * 1000 +
      localityRank(otherAreaService[1], otherAreaService[2]) * 10 +
      serviceRank(otherAreaService[3])
    );
  }

  if (path === "/services") return 0;
  if (RAIPUR_CORE_SERVICE_SLUGS.some((slug) => path === `/chhattisgarh/${slug}` || path === `/services/${slug}`)) {
    const slug = path.split("/").pop() ?? "";
    return 10 + serviceRank(slug);
  }
  return 500;
}

function localityRank(city: string, area: string): number {
  const index = getIndexableLocalitiesForCity(city).findIndex((item) => item.slug === area);
  return index < 0 ? 50 : index;
}

export function pageTypeForPath(path: string): string {
  if (path === "/") return "home";
  if (path === "/chhattisgarh") return "state";
  if (path === "/chhattisgarh/raipur") return "raipur-city";
  if (/^\/chhattisgarh\/raipur\/[^/]+$/.test(path)) return "raipur-service";
  if (/^\/chhattisgarh\/raipur\/areas\/[^/]+$/.test(path)) return "raipur-locality";
  if (/^\/chhattisgarh\/raipur\/areas\/[^/]+\/[^/]+$/.test(path)) return "raipur-locality-service";
  if (/^\/chhattisgarh\/[^/]+$/.test(path) && isCgPriorityPlace(path.split("/")[2] ?? "")) return "city";
  if (/^\/chhattisgarh\/[^/]+\/[^/]+$/.test(path)) return "city-service";
  if (path.includes("/areas/")) return "locality";
  if (path.startsWith("/services")) return "service";
  if (path.startsWith("/guides")) return "guide";
  if (path.startsWith("/blog")) return "blog";
  if (path.startsWith("/pricing")) return "pricing";
  if (path.startsWith("/compare")) return "compare";
  return "supporting";
}
