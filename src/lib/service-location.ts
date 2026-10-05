/**
 * Business validity for a service + location pair.
 *
 * This is the indexability database. generateStaticParams() must never be
 * consulted here — a combination can be valid, indexable, and still rendered
 * on demand with ISR.
 */
import { evaluateSeoPath } from "@/lib/seo-quality-gate";
import { isCityServiceIndexable } from "@/lib/local-seo-catalog";
import { getSeoService } from "@/data/seo-services";
import { isCgPriorityPlace } from "@/data/cg-local-seo";

export interface ServiceLocationValidity {
  valid: boolean;
  indexable: boolean;
  path: string;
  canonicalPath: string;
  reasons: string[];
}

/**
 * Validates a catalogue service against a served Chhattisgarh place.
 * `service` may be a product slug (`invisible-grills`) or a near-me slug
 * (`invisible-grills-near-me`).
 */
export function isValidServiceLocation(
  service: string,
  location: string,
): ServiceLocationValidity {
  const path = `/chhattisgarh/${location}/${service}`;
  const gate = evaluateSeoPath(path);
  const valid = gate.index && gate.canonicalPath === path;
  return {
    valid,
    indexable: valid,
    path,
    canonicalPath: gate.canonicalPath,
    reasons: gate.reasons,
  };
}

export function isOfferedInPlace(serviceSlug: string, locationSlug: string): boolean {
  const catalogue = getSeoService(serviceSlug);
  if (!catalogue || !isCgPriorityPlace(locationSlug)) return false;
  return isCityServiceIndexable(locationSlug, serviceSlug);
}
