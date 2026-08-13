import { getSeoService } from "@/data/seo-services";

export interface AreaKeywordInput {
  serviceSlug: string;
  serviceName: string;
  areaName: string;
  cityName: string;
}

/** Build meta keyword list for area-service pages from canonical service + locality. */
export function buildAreaServiceKeywords(input: AreaKeywordInput): string[] {
  const { serviceSlug, serviceName, areaName, cityName } = input;
  const seo = getSeoService(serviceSlug);
  const city = cityName.trim();
  const area = areaName.trim();

  const serviceLower = serviceName.toLowerCase();

  const localized = [
    `${serviceName} in ${area}`,
    `${serviceName} in ${area} ${city}`,
    `${serviceName} installation in ${area}`,
    `${serviceName} installation in ${area} ${city}`,
    `${serviceName} price in ${area}`,
    `${serviceName} price in ${area} ${city}`,
    `${serviceName} company in ${area}`,
    `${serviceName} company in ${area} ${city}`,
    `${serviceName} dealers in ${area}`,
    `${serviceName} dealers in ${area} ${city}`,
    `${serviceName} contractors in ${area}`,
    `${serviceName} contractors in ${area} ${city}`,
    `${serviceLower} in ${area}`,
    `${serviceLower} in ${area} ${city}`,
    `${serviceLower} installation in ${area}`,
    `${serviceLower} price in ${area}`,
    `${serviceName} near ${area}`,
    `${serviceName} ${area}`,
    `${serviceName} ${city}`,
    `${serviceName} near me`,
    area,
    city,
  ];

  const fromTemplate = (seo?.searchPhrases ?? []).flatMap((phrase) => [
    phrase,
    `${phrase} in ${area}`,
    `${phrase} in ${area} ${city}`,
    `${phrase} ${area}`,
    `${phrase} ${city}`,
  ]);

  return [...new Set([...localized, ...fromTemplate])].slice(0, 96);
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
  return `Professional ${serviceLower} in ${areaName}, ${cityName}. ${serviceName} installation, dealers, and price quotes with free site survey, SS304 materials, local installers, and 5-year warranty. Call for same-day quote.`;
}

const SEARCH_INTENT_SUFFIXES = [
  "",
  " installation",
  " price",
  " company",
  " dealers",
  " contractors",
] as const;

/** Visible on-page section weaving locality × intent variants (maps to same canonical URL). */
export function buildAreaSearchIntentsSection(input: AreaKeywordInput): {
  heading: string;
  body: string;
} {
  const { serviceSlug, serviceName, areaName, cityName } = input;
  const seo = getSeoService(serviceSlug);
  const area = areaName.trim();
  const city = cityName.trim();
  const locality = city ? `${area}, ${city}` : area;
  const serviceLower = serviceName.toLowerCase();

  const basePhrases = [
    serviceName,
    serviceLower,
    ...(seo?.searchPhrases ?? []).slice(0, 8),
  ];

  const intentLines = [...new Set(
    basePhrases.flatMap((phrase) =>
      SEARCH_INTENT_SUFFIXES.map((suffix) => {
        const term = `${phrase}${suffix}`.trim();
        return `${term} in ${area} ${city}`.replace(/\s+/g, " ");
      }),
    ),
  )].slice(0, 28);

  const primary = intentLines.slice(0, 10).join("; ");
  const secondary = intentLines.slice(10, 18).join("; ");

  const body = [
    `Residents across ${locality} often search using different wording for the same job. Common queries include ${primary}.`,
    secondary
      ? `Related searches also include ${secondary}.`
      : "",
    `All of these map to one service: survey, supply, and professional installation of ${serviceLower} in ${area} with warranty-backed workmanship.`,
    `Whether you typed "price", "dealers", "company", or "contractors" alongside ${serviceLower}, you get the same SafeShield Solutions process—free measurement visit, itemised quote, factory-spec materials, and a single team that handles fitting without middlemen.`,
    `We publish this page so search engines and homeowners in ${city} can find ${serviceName} coverage for ${area} under every natural search phrase, not only the exact service name.`,
  ]
    .filter(Boolean)
    .join(" ");

  return {
    heading: `Popular ${serviceLower} searches in ${area}`,
    body,
  };
}
