import { isLocalityServiceIndexable } from "@/data/cg-hierarchy";
import { buildKeywordPlan, supportingSearchSentence } from "@/lib/keyword-targeting";
import { slugify } from "@/lib/slug";

export interface AreaKeywordInput {
  serviceSlug: string;
  serviceName: string;
  areaName: string;
  cityName: string;
  citySlug?: string;
  areaSlug?: string;
}

/** Meta keywords for one area page: its primary first, then secondaries it actually owns. */
export function buildAreaServiceKeywords(input: AreaKeywordInput): string[] {
  const citySlug = input.citySlug ?? slugify(input.cityName);
  const areaSlug = input.areaSlug ?? slugify(input.areaName);
  if (!isLocalityServiceIndexable(citySlug, areaSlug, input.serviceSlug)) {
    return [`${input.serviceName} in ${input.areaName}, ${input.cityName}`];
  }
  return buildKeywordPlan({
    serviceSlug: input.serviceSlug,
    serviceName: input.serviceName,
    placeName: input.cityName,
    placeSlug: citySlug,
    areaName: input.areaName,
    areaSlug,
    path: `/chhattisgarh/${citySlug}/areas/${areaSlug}/${input.serviceSlug}`,
  }).metaKeywords;
}

export function buildAreaServiceMetaTitle(
  serviceName: string,
  areaName: string,
  cityName: string,
): string {
  return `${serviceName} in ${areaName}, ${cityName} | Installation & Price`;
}

export function buildAreaServiceMetaDescription(
  serviceName: string,
  areaName: string,
  cityName: string,
): string {
  const serviceLower = serviceName.toLowerCase();
  return `${serviceName} in ${areaName}, ${cityName}. Free site survey, written quote after measurement, and SS304 as the standard grill grade where this fitting uses stainless cable.`;
}

/** On-page secondary keywords that this URL owns. Other primaries stay on their own URLs. */
export function buildAreaSearchIntentsSection(input: AreaKeywordInput): {
  heading: string;
  body: string;
} {
  const citySlug = input.citySlug ?? slugify(input.cityName);
  const areaSlug = input.areaSlug ?? slugify(input.areaName);
  const serviceLower = input.serviceName.toLowerCase();
  if (!isLocalityServiceIndexable(citySlug, areaSlug, input.serviceSlug)) {
    return {
      heading: `${input.serviceName} in ${input.areaName}`,
      body: `${input.serviceName} in ${input.areaName}, ${input.cityName} is quoted after a site measurement.`,
    };
  }
  const plan = buildKeywordPlan({
    serviceSlug: input.serviceSlug,
    serviceName: input.serviceName,
    placeName: input.cityName,
    placeSlug: citySlug,
    areaName: input.areaName,
    areaSlug,
    path: `/chhattisgarh/${citySlug}/areas/${areaSlug}/${input.serviceSlug}`,
  });
  const support = supportingSearchSentence(plan);
  return {
    heading: `${input.serviceName} in ${input.areaName}`,
    body: [
      support,
      `These queries map to one ${serviceLower} page for ${input.areaName}, ${input.cityName}: survey, specification, and installation after measurement.`,
    ]
      .filter(Boolean)
      .join(" "),
  };
}
