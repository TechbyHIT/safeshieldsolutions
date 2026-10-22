/**
 * SEO Opportunity = Service × Location × Search Intent × Audience × Business Value.
 * The score discovers where an idea belongs. It does not create a URL per combination.
 */
import { guideArticles } from "@/config/guides-content";
import { COMPARISONS, isCgPriorityPlace } from "@/data/cg-local-seo";
import { getSeoService } from "@/data/seo-services";
import { cityServiceSlugsForPlace, parentCityForArea, pricingPathForService } from "@/lib/local-seo-catalog";

export type OpportunityIntent = "transactional" | "near-me" | "commercial" | "informational" | "comparison" | "navigational";

export type OpportunityTreatment =
  | "dedicated-landing-page"
  | "section"
  | "supporting-article"
  | "category-page"
  | "comparison-page"
  | "service-detail-page"
  | "no-new-page";

export interface SeoOpportunity {
  serviceSlug: string;
  /** Town slug. Omit for a state or national idea. */
  locationSlug?: string;
  intent: OpportunityIntent;
  audience: string;
  /** 0–100. Calculated when omitted. */
  businessValue?: number;
  /** Category demand such as "grills in Raipur", with no extra product URL. */
  scope?: "service" | "category";
}

export interface OpportunityDecision {
  treatment: OpportunityTreatment;
  canonicalPath: string;
  businessValue: number;
  reason: string;
}

const VALUE_FOR_PAGE = 60;

export function businessValueFor(input: SeoOpportunity): number {
  if (input.businessValue !== undefined) return Math.max(0, Math.min(100, Math.round(input.businessValue)));
  let score = 35;
  if (input.intent === "transactional" || input.intent === "near-me") score += 30;
  if (input.intent === "commercial" || input.intent === "comparison") score += 18;
  if (input.intent === "informational") score += 8;
  if (input.intent === "navigational") score += 12;
  if (input.locationSlug === "raipur") score += 20;
  else if (input.locationSlug && isCgPriorityPlace(input.locationSlug)) score += 10;
  const service = getSeoService(input.serviceSlug);
  if (service && service.priority >= 80) score += 8;
  return Math.max(0, Math.min(100, score));
}

function landing(serviceSlug: string, placeSlug: string): string {
  return `/chhattisgarh/${placeSlug}/${serviceSlug}`;
}

export function decideOpportunity(input: SeoOpportunity): OpportunityDecision {
  const value = businessValueFor(input);
  const service = getSeoService(input.serviceSlug);
  const place = input.locationSlug;
  const served = Boolean(place && isCgPriorityPlace(place) && service && cityServiceSlugsForPlace(place).includes(service.slug));

  if (input.scope === "category") {
    const path = place && isCgPriorityPlace(place) ? `/chhattisgarh/${place}` : "/chhattisgarh";
    return {
      treatment: "category-page",
      canonicalPath: path,
      businessValue: value,
      reason: "A category demand stays on the town or state hub.",
    };
  }

  if (!service) {
    return {
      treatment: "no-new-page",
      canonicalPath: "/chhattisgarh",
      businessValue: value,
      reason: "Unknown service.",
    };
  }

  if (input.intent === "comparison") {
    const comparison = COMPARISONS.find((item) => item.slug.includes(service.slug.split("-")[0] ?? "") || item.slug.includes("invisible-grills"));
    const match = COMPARISONS.find((item) => item.slug.startsWith(service.slug) || item.slug.includes(service.slug));
    const chosen = match ?? (service.category === "Grills" || service.category === "Nets" ? comparison : undefined);
    if (chosen) {
      return {
        treatment: "comparison-page",
        canonicalPath: `/compare/${chosen.slug}`,
        businessValue: value,
        reason: "A versus query uses the existing comparison.",
      };
    }
    return {
      treatment: "section",
      canonicalPath: place && served ? landing(service.slug, place) : `/services/${service.slug}`,
      businessValue: value,
      reason: "No comparison page exists, so the difference stays on the service page.",
    };
  }

  if (input.intent === "informational") {
    const guide = guideArticles.find((item) => item.serviceSlug === service.slug);
    if (guide && !place) {
      return {
        treatment: "supporting-article",
        canonicalPath: `/guides/${guide.slug}`,
        businessValue: value,
        reason: "A how-to without a town uses the guide.",
      };
    }
    return {
      treatment: "section",
      canonicalPath: place && served ? landing(service.slug, place) : `/services/${service.slug}`,
      businessValue: value,
      reason: "A local question is answered on the landing page.",
    };
  }

  if (!place) {
    if (input.intent === "commercial") {
      const pricing = pricingPathForService(service.slug);
      if (pricing) {
        return {
          treatment: "section",
          canonicalPath: pricing,
          businessValue: value,
          reason: "The head price query stays on the pricing page.",
        };
      }
    }
    return {
      treatment: "service-detail-page",
      canonicalPath: `/services/${service.slug}`,
      businessValue: value,
      reason: "A service without a town uses the service detail page.",
    };
  }

  if (!isCgPriorityPlace(place) || !served) {
    const parent = parentCityForArea(place);
    return {
      treatment: "no-new-page",
      canonicalPath: landing(service.slug, parent),
      businessValue: value,
      reason: "The place is outside the served list, or the service is not offered there.",
    };
  }

  if (value < VALUE_FOR_PAGE) {
    return {
      treatment: "no-new-page",
      canonicalPath: landing(service.slug, place),
      businessValue: value,
      reason: "Business value is too low for another URL.",
    };
  }

  if (input.intent === "near-me") {
    return {
      treatment: "dedicated-landing-page",
      canonicalPath: `${landing(service.slug, place)}-near-me`,
      businessValue: value,
      reason: "Near-me is a separate local intent with its own page.",
    };
  }

  if (input.intent === "commercial") {
    return {
      treatment: "section",
      canonicalPath: landing(service.slug, place),
      businessValue: value,
      reason: "Price, dealer, and company wording stay on the town service page.",
    };
  }

  return {
    treatment: "dedicated-landing-page",
    canonicalPath: landing(service.slug, place),
    businessValue: value,
    reason: "One town service page covers this product and place.",
  };
}

/** Same canonical path means the same intent. Audience wording does not earn a second page. */
export function mergeOpportunities(inputs: SeoOpportunity[]): (OpportunityDecision & { audiences: string[] })[] {
  const groups = new Map<string, { decision: OpportunityDecision; audiences: Set<string> }>();
  for (const input of inputs) {
    const decision = decideOpportunity(input);
    const existing = groups.get(decision.canonicalPath);
    if (!existing) {
      groups.set(decision.canonicalPath, { decision, audiences: new Set([input.audience]) });
      continue;
    }
    existing.audiences.add(input.audience);
    if (decision.businessValue > existing.decision.businessValue) {
      existing.decision = { ...decision, reason: existing.decision.reason };
    }
  }
  return [...groups.values()].map((group) => ({
    ...group.decision,
    audiences: [...group.audiences],
    reason:
      group.audiences.size > 1
        ? `${group.decision.reason} ${group.audiences.size} audience descriptions share this URL.`
        : group.decision.reason,
  }));
}
