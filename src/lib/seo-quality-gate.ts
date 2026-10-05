import { getAreaByCitySlugs } from "@/data/areas";
import { CG_CORE_SERVICE_SLUGS, isCgPriorityPlace } from "@/data/cg-local-seo";
import { getLocality, isLocalityServiceIndexable } from "@/data/cg-hierarchy";
import { resolveAreaPageSlug } from "@/lib/area-page-slugs";
import {
  canonicalForIntent,
  cityServiceSlugsForPlace,
  isIndexableIntentLabel,
  isKnownDistrict,
  parentCityForArea,
} from "@/lib/local-seo-catalog";

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
 * Index a Chhattisgarh URL only when it is a real served place plus a real
 * catalogue service, with unique local copy. Doorway intent copies consolidate.
 */
export function evaluateSeoPath(path: string): SeoIndexDecision {
  const parts = path.split("/").filter(Boolean);

  if (path === "/privacy-policy" || path === "/terms-of-service") {
    return decision(true, path, ["Legal page"]);
  }

  if (path === "/seo-coverage") {
    return decision(false, path, ["Internal page"]);
  }

  if (parts[0] === "locations" && parts[1] === "chhattisgarh" && !parts[2]) {
    return decision(false, "/chhattisgarh", ["Duplicate of the state hub"]);
  }

  if (parts[0] === "locations" && parts[1] === "chhattisgarh" && parts[2]) {
    const place = parts[2];
    if (isCgPriorityPlace(place)) {
      return decision(false, `/chhattisgarh/${place}`, ["Duplicate of the place page"]);
    }
    if (getAreaByCitySlugs("chhattisgarh", place)) {
      return decision(false, `/chhattisgarh/${parentCityForArea(place)}`, [
        "Thin locality redirects to the served parent city",
      ]);
    }
    return decision(false, "/chhattisgarh", ["Unknown place"]);
  }

  if (parts[0] !== "chhattisgarh") {
    return decision(true, path, []);
  }

  if (parts.length === 1) {
    return decision(true, "/chhattisgarh", ["State hub"]);
  }

  if (parts[1] === "districts" && parts.length === 3) {
    const district = parts[2]!;
    if (!isKnownDistrict(district)) {
      return decision(false, "/chhattisgarh", ["Unknown district"]);
    }
    return decision(true, `/chhattisgarh/districts/${district}`, ["District hub"]);
  }

  if (parts.length === 2) {
    const segment = parts[1]!;
    const place = getAreaByCitySlugs("chhattisgarh", segment);
    const resolved = resolveAreaPageSlug(segment, "chhattisgarh");
    if (place && !resolved) {
      if (!isCgPriorityPlace(segment)) {
        return decision(false, `/chhattisgarh/${parentCityForArea(segment)}`, [
          "Locality has no unique local profile",
        ]);
      }
      return decision(true, path, ["Priority place page"]);
    }
    if (!resolved) {
      return decision(false, "/chhattisgarh", ["Not a core service"]);
    }
    if (!CORE_SERVICES.has(resolved.serviceSlug) && !cityServiceSlugsForPlace("raipur").includes(resolved.serviceSlug)) {
      return decision(false, "/chhattisgarh", ["Service is not in the served catalogue"]);
    }
    if (!isIndexableIntentLabel(resolved.intentLabel)) {
      return decision(false, canonicalForIntent(resolved.serviceSlug, resolved.intentLabel), [
        "Intent variant of the state service page",
      ]);
    }
    if (resolved.intentLabel === "near me") {
      return decision(false, `/chhattisgarh/${resolved.serviceSlug}`, [
        "State near-me consolidates to the state service page",
      ]);
    }
    return decision(true, `/chhattisgarh/${resolved.serviceSlug}`, ["State service page"]);
  }

  if (parts.length === 3) {
    const place = parts[1]!;
    const pageSlug = parts[2]!;
    const resolved = resolveAreaPageSlug(pageSlug, "chhattisgarh");
    if (!resolved) {
      return decision(false, `/chhattisgarh/${isCgPriorityPlace(place) ? place : parentCityForArea(place)}`, [
        "Unknown service",
      ]);
    }

    if (!getAreaByCitySlugs("chhattisgarh", place)) {
      return decision(false, canonicalForIntent(resolved.serviceSlug, resolved.intentLabel, parentCityForArea(place)), [
        "Unknown place or service",
      ]);
    }

    const servedCity = isCgPriorityPlace(place) ? place : parentCityForArea(place);
    const base = `/chhattisgarh/${servedCity}/${resolved.serviceSlug}`;
    const nearMe = `/chhattisgarh/${servedCity}/${resolved.serviceSlug}-near-me`;

    if (!isCgPriorityPlace(place)) {
      const target = resolved.intentLabel === "near me" ? nearMe : base;
      return decision(false, target, ["Place is outside the indexable city list"]);
    }

    if (!cityServiceSlugsForPlace(place).includes(resolved.serviceSlug)) {
      return decision(false, `/chhattisgarh/${place}`, ["Service is not offered as a landing page in this town"]);
    }

    if (resolved.intentLabel === "nearby") {
      return decision(false, nearMe, ["Nearby consolidates to the near-me landing page"]);
    }

    if (!isIndexableIntentLabel(resolved.intentLabel)) {
      return decision(false, canonicalForIntent(resolved.serviceSlug, resolved.intentLabel, place), [
        "Same intent as the base service page",
      ]);
    }

    if (resolved.intentLabel === "near me") {
      return decision(true, nearMe, ["Local near-me landing page"]);
    }

    return decision(true, base, ["Priority city and catalogue service"]);
  }

  if (parts[2] === "areas" && (parts.length === 4 || parts.length === 5)) {
    const citySlug = parts[1]!;
    const areaSlug = parts[3]!;
    const locality = getLocality(citySlug, areaSlug);
    if (!locality?.serviceAvailable) {
      return decision(false, `/chhattisgarh/${isCgPriorityPlace(citySlug) ? citySlug : parentCityForArea(citySlug)}`, [
        "Locality is not marked serviceable",
      ]);
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
