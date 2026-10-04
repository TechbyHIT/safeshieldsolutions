import { getAreaByCitySlugs } from "@/data/areas";
import {
  CG_CORE_SERVICE_SLUGS,
  isCgPriorityPlace,
} from "@/data/cg-local-seo";
import { getLocality, isLocalityServiceIndexable } from "@/data/cg-hierarchy";
import { resolveAreaPageSlug } from "@/lib/area-page-slugs";

const CORE_SERVICES = new Set<string>(CG_CORE_SERVICE_SLUGS);

export interface SeoIndexDecision {
  index: boolean;
  /** One URL for this search intent. */
  canonicalPath: string;
  reasons: string[];
}

function decision(index: boolean, canonicalPath: string, reasons: string[]): SeoIndexDecision {
  return { index, canonicalPath, reasons };
}

/**
 * Index a Chhattisgarh URL only when it is a real place or a core service
 * with its own intent. Suffix copies (price, near-me, quote, and the rest)
 * stay available but point at the base URL.
 */
export function evaluateSeoPath(path: string): SeoIndexDecision {
  const parts = path.split("/").filter(Boolean);

  if (path === "/privacy-policy" || path === "/terms-of-service" || path === "/seo-coverage") {
    return decision(false, path, ["Legal or internal page"]);
  }

  if (parts[0] === "locations" && parts[1] === "chhattisgarh" && !parts[2]) {
    return decision(false, "/chhattisgarh", ["Duplicate of the state hub"]);
  }

  if (parts[0] === "locations" && parts[1] === "chhattisgarh" && parts[2]) {
    const place = parts[2];
    const canonical = `/chhattisgarh/${place}`;
    if (!getAreaByCitySlugs("chhattisgarh", place)) {
      return decision(false, canonical, ["Unknown place"]);
    }
    if (!isCgPriorityPlace(place)) {
      return decision(false, path, ["No unique local profile for this locality"]);
    }
    return decision(false, canonical, ["Duplicate of the place page"]);
  }

  if (parts[0] !== "chhattisgarh") {
    return decision(true, path, []);
  }

  if (parts.length === 1) {
    return decision(true, "/chhattisgarh", ["State hub"]);
  }

  if (parts.length === 2) {
    const segment = parts[1]!;
    const place = getAreaByCitySlugs("chhattisgarh", segment);
    const resolved = resolveAreaPageSlug(segment, "chhattisgarh");
    if (place && !resolved) {
      if (!isCgPriorityPlace(segment)) {
        return decision(false, path, ["Locality has no unique local profile"]);
      }
      return decision(true, path, ["Priority place page"]);
    }
    if (!resolved || !CORE_SERVICES.has(resolved.serviceSlug)) {
      return decision(false, path, ["Not a core service"]);
    }
    if (resolved.intentLabel !== "general") {
      return decision(false, `/chhattisgarh/${resolved.serviceSlug}`, [
        "Intent variant of the state service page",
      ]);
    }
    return decision(true, path, ["State service page"]);
  }

  if (parts.length === 3) {
    const place = parts[1]!;
    const pageSlug = parts[2]!;
    const resolved = resolveAreaPageSlug(pageSlug, "chhattisgarh");
    if (!getAreaByCitySlugs("chhattisgarh", place) || !resolved) {
      return decision(false, path, ["Unknown place or service"]);
    }
    const base = `/chhattisgarh/${place}/${resolved.serviceSlug}`;
    if (!isCgPriorityPlace(place)) {
      return decision(false, path, ["Place is outside the indexable city list"]);
    }
    if (!CORE_SERVICES.has(resolved.serviceSlug)) {
      return decision(false, path, ["Service is not in the core cluster"]);
    }
    if (resolved.intentLabel !== "general") {
      return decision(false, base, ["Same intent as the base service page"]);
    }
    return decision(true, base, ["Priority city and core service"]);
  }

  if (parts[2] === "areas" && (parts.length === 4 || parts.length === 5)) {
    const citySlug = parts[1]!;
    const areaSlug = parts[3]!;
    const locality = getLocality(citySlug, areaSlug);
    if (!locality?.serviceAvailable) {
      return decision(false, `/chhattisgarh/${citySlug}`, ["Locality is not marked serviceable"]);
    }
    const canonicalArea = areaSlug === "atal-nagar" ? "naya-raipur" : areaSlug;
    if (parts.length === 4) {
      const canonical = `/chhattisgarh/${citySlug}/areas/${canonicalArea}`;
      if (!locality.indexable || areaSlug === "atal-nagar") {
        return decision(false, canonical, ["Same place as another locality, or content is not ready"]);
      }
      return decision(true, canonical, ["Locality hub with its own description"]);
    }
    const serviceSlug = parts[4]!;
    const canonical = `/chhattisgarh/${citySlug}/areas/${canonicalArea}/${serviceSlug}`;
    if (!isLocalityServiceIndexable(citySlug, canonicalArea, serviceSlug) || areaSlug === "atal-nagar") {
      return decision(false, `/chhattisgarh/${citySlug}/${serviceSlug}`, [
        "Locality service is not distinct from the city service",
      ]);
    }
    return decision(true, canonical, ["Locality and primary service"]);
  }

  return decision(false, path, ["URL is outside the local SEO model"]);
}
