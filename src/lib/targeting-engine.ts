/**
 * One targeting profile per URL.
 * A doorway URL inherits the profile of its canonical page.
 */
import { guideArticles } from "@/config/guides-content";
import { COMPARISONS, getCgPlace } from "@/data/cg-local-seo";
import { getLocality } from "@/data/cg-hierarchy";
import { getSeoService, type SeoService } from "@/data/seo-services";
import { resolveAreaPageSlug } from "@/lib/area-page-slugs";
import { clusterFor } from "@/lib/entity-seo";
import { telHref } from "@/lib/quote-lead";
import { evaluateSeoPath } from "@/lib/seo-quality-gate";

export type UserIntent = "transactional" | "commercial" | "informational" | "navigational";
export type FunnelStage = "awareness" | "consideration" | "decision";
export type ConversionAction = "quote-form" | "call" | "whatsapp" | "service-page";

export interface TargetingProfile {
  path: string;
  service: { slug: string; name: string };
  location: { state: "Chhattisgarh"; place: string; placeSlug?: string; locality?: string };
  category: string;
  subcategory: string;
  intent: UserIntent;
  audience: string;
  objective: string;
  funnel: FunnelStage;
  device: { primary: "mobile"; requirements: string[] };
  entities: string[];
  conversion: { action: ConversionAction; href: string; label: string };
}

const DEVICE = {
  primary: "mobile" as const,
  requirements: [
    "Text stays readable without pinch-zoom",
    "Call and WhatsApp are one tap away",
    "Quote fields are at least 16px",
    "The offer is stated in text, not only in the hero image",
  ],
};

const SURVEY = "Book a free site survey and a written quote.";
const EXPLAIN = "Explain the choice, then open the matching service page.";

function audienceFor(service: SeoService): string {
  const slug = service.slug;
  if (slug.includes("child") || slug.includes("pet")) return "Households protecting children or pets on an opening";
  if (service.category === "Bird Control" || slug.includes("pigeon")) return "Households dealing with pigeons on ledges or openings";
  if (service.category === "Sports" || service.category === "Turf") return "Terrace owners, schools, and practice-bay operators";
  if (service.category === "Hangers") return "Households drying clothes on a balcony or utility area";
  if (service.category === "Screens" || service.category === "Doors" || slug.includes("mosquito")) {
    return "Households that want airflow with fewer insects";
  }
  return "Apartment and house owners in the service area";
}

function profileForService(
  path: string,
  service: SeoService,
  placeName: string,
  placeSlug: string | undefined,
  locality: string | undefined,
  intent: UserIntent,
  funnel: FunnelStage,
): TargetingProfile {
  const cluster = clusterFor(service);
  const decision = funnel === "decision";
  return {
    path,
    service: { slug: service.slug, name: service.name },
    location: { state: "Chhattisgarh", place: placeName, placeSlug, locality },
    category: service.category,
    subcategory: service.name,
    intent,
    audience: audienceFor(service),
    objective: funnel === "awareness" ? EXPLAIN : SURVEY,
    funnel,
    device: DEVICE,
    entities: [service.name, placeName, "Chhattisgarh", cluster.name],
    conversion: decision
      ? { action: "call", href: telHref(), label: `Call about ${service.name} in ${placeName}` }
      : funnel === "awareness"
        ? { action: "service-page", href: `/services/${service.slug}`, label: service.name }
        : { action: "quote-form", href: "/contact", label: "Request a measured quote" },
  };
}

export function targetForPath(path: string): TargetingProfile | null {
  const canonical = evaluateSeoPath(path).canonicalPath;
  if (canonical === "/contact") {
    return {
      path: canonical,
      service: { slug: "catalogue", name: "Chosen on the form" },
      location: { state: "Chhattisgarh", place: "Chhattisgarh" },
      category: "Installation",
      subcategory: "Quote request",
      intent: "transactional",
      audience: "A person ready to book a survey",
      objective: SURVEY,
      funnel: "decision",
      device: DEVICE,
      entities: ["SafeShield Solutions", "Chhattisgarh"],
      conversion: { action: "quote-form", href: "/contact", label: "Request a measured quote" },
    };
  }

  const guide = guideArticles.find((item) => `/guides/${item.slug}` === canonical);
  if (guide) {
    const service = getSeoService(guide.serviceSlug);
    if (!service) return null;
    return profileForService(canonical, service, "Chhattisgarh", undefined, undefined, "informational", "awareness");
  }

  const comparison = COMPARISONS.find((item) => `/compare/${item.slug}` === canonical);
  if (comparison) {
    const service = getSeoService("invisible-grills") ?? getSeoService("safety-nets");
    if (!service) return null;
    return profileForService(canonical, service, "Chhattisgarh", undefined, undefined, "informational", "awareness");
  }

  if (canonical === "/glossary" || canonical === "/about" || canonical === "/") {
    const service = getSeoService("invisible-grills");
    if (!service) return null;
    return profileForService(
      canonical,
      service,
      "Chhattisgarh",
      undefined,
      undefined,
      canonical === "/" ? "navigational" : "informational",
      "awareness",
    );
  }

  const pricing = canonical.match(/^\/pricing\/([^/]+)$/);
  if (pricing) {
    const service = getSeoService(pricing[1]!) ?? getSeoService("invisible-grills");
    if (!service) return null;
    return profileForService(canonical, service, "Chhattisgarh", undefined, undefined, "commercial", "consideration");
  }

  const locality = canonical.match(/^\/chhattisgarh\/([^/]+)\/areas\/([^/]+)(?:\/([^/]+))?$/);
  if (locality) {
    const place = getCgPlace(locality[1]!);
    const area = getLocality(locality[1]!, locality[2]!);
    const service = getSeoService(locality[3] ?? "invisible-grills");
    if (!place || !service) return null;
    return profileForService(canonical, service, place.name, place.slug, area?.name, "transactional", "consideration");
  }

  const townService = canonical.match(/^\/chhattisgarh\/([^/]+)\/([^/]+)$/);
  if (townService && getCgPlace(townService[1]!)) {
    const place = getCgPlace(townService[1]!)!;
    const resolved = resolveAreaPageSlug(townService[2]!, "chhattisgarh");
    const service = getSeoService(resolved?.serviceSlug ?? townService[2]!);
    if (!service) return null;
    const near = resolved?.intentLabel === "near me";
    return profileForService(
      canonical,
      service,
      place.name,
      place.slug,
      undefined,
      near ? "transactional" : "transactional",
      near ? "decision" : "consideration",
    );
  }

  const stateService = canonical.match(/^\/chhattisgarh\/([^/]+)$/);
  if (stateService) {
    const service = getSeoService(stateService[1]!);
    if (service) {
      return profileForService(canonical, service, "Chhattisgarh", undefined, undefined, "transactional", "consideration");
    }
  }

  const national = canonical.match(/^\/services\/([^/]+)$/);
  if (national) {
    const service = getSeoService(national[1]!);
    if (!service) return null;
    return profileForService(canonical, service, "Chhattisgarh", undefined, undefined, "commercial", "consideration");
  }

  return null;
}
