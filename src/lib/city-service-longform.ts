import type { ContentSection } from "@/lib/content";
import { getServiceDetail } from "@/config/service-details";
import { getSeoService } from "@/data/seo-services";
import { HOME_CITY_AREAS } from "@/config/home-seo-links";
import { contentSeed, pickVariant } from "@/lib/content-seed";

export interface CityServiceLongformContext {
  serviceName: string;
  serviceSlug: string;
  serviceLower: string;
  category: string;
  cityName: string;
  citySlug: string;
  intentLabel?: string;
}

export function buildCityServiceLongform(ctx: CityServiceLongformContext): {
  sections: ContentSection[];
  faqs: { question: string; answer: string }[];
} {
  const seed = contentSeed(ctx.citySlug, ctx.serviceSlug);
  const detail = getServiceDetail(ctx.serviceSlug);
  const seo = getSeoService(ctx.serviceSlug);
  const areas = HOME_CITY_AREAS[ctx.citySlug] ?? [];
  const phrases = (seo?.searchPhrases ?? [ctx.serviceLower]).slice(0, 12);

  const localitySections: ContentSection[] = areas.slice(0, 10).map((area) => ({
    id: `city-locality-${area.slug}`,
    heading: `${ctx.serviceName} in ${area.name}, ${ctx.cityName}`,
    body: [
      `${ctx.serviceName} in ${area.name} is served by the same ${ctx.cityName} installation hub covering installation, price, dealers, near-me, premium, and best intent searches. Residents in ${area.name} book free surveys for ${ctx.serviceLower} with itemised quotes — SS304, UV nets, turf infill, zip track specs, or mesh door frames as applicable.`,
      `Popular searches from ${area.name} include ${phrases.slice(0, 4).join(", ")}. Technicians batch ${area.name} with neighbouring ${ctx.cityName} pin codes for faster slots. Society compliance, harness rules, and warranty registration match every other ${ctx.cityName} locality.`,
    ].join("\n\n"),
    level: 3 as const,
  }));

  const phraseSections: ContentSection[] = phrases.slice(0, 8).map((phrase, i) => ({
    id: `city-phrase-${i}`,
    heading: `${phrase} in ${ctx.cityName} — what to expect`,
    body: pickVariant(
      [
        `"${phrase} in ${ctx.cityName}" is a high-intent search — you want fair pricing, verified materials, and installers who know local society rules. We publish this section so ${ctx.cityName} residents comparing dealers, contractors, and companies see the same professional scope: survey, supply, installation, and warranty.`,
        `When you search "${phrase}" near ${ctx.cityName}, compare written quotes on material grade, labour inclusion, GST, and after-sales support. Premium ${ctx.serviceLower} in ${ctx.cityName} does not mean overpriced — it means documented specification and factory-direct fitting.`,
        `${ctx.cityName} homeowners typing "${phrase}" usually need installation timeline, price per unit or sq ft, and dealer vs direct comparison. Our city hub routes you to locality pages for hyper-local guidance while this page covers ${ctx.cityName}-wide standards.`,
      ],
      seed,
      i,
    ),
    level: 3 as const,
  }));

  const faqs: { question: string; answer: string }[] = [
    {
      question: `Where can I find ${ctx.serviceLower} near me in ${ctx.cityName}?`,
      answer: `Browse locality pages from our ${ctx.cityName} locations index or use intent URLs like ${ctx.serviceSlug}-near-me. Every neighbourhood has installation, price, dealers, and premium variants with full guides.`,
    },
    {
      question: `What is ${ctx.serviceLower} price in ${ctx.cityName}?`,
      answer: `Pricing depends on scope — opening size, court dimensions, mesh or turf grade, motorized vs manual, and access. We provide itemised ${ctx.cityName} quotations after free site survey.`,
    },
    ...detail.extraFaqs.map((f) => ({
      question: f.question.replace(/\{city\}/g, ctx.cityName),
      answer: f.answer.replace(/\{city\}/g, ctx.cityName),
    })),
  ];

  for (const phrase of phrases.slice(0, 6)) {
    faqs.push({
      question: `Who installs ${phrase} in ${ctx.cityName}?`,
      answer: `SafeShield Solutions installs ${phrase} across ${ctx.cityName} with trained crews, factory-spec materials, and warranty support. Book a free survey via our ${ctx.cityName} locations page.`,
    });
  }

  return {
    sections: [
      {
        id: "city-longform-hub",
        heading: `Complete ${ctx.serviceName} guide for ${ctx.cityName}`,
        body: `This ${ctx.cityName} city page covers ${ctx.serviceLower} end-to-end — near-me booking, installation process, price factors, dealers and contractors, premium specifications, and links to every major locality. Whether you manage a tower in central ${ctx.cityName} or a villa in outer corridors, the same SafeShield Solutions quality standard applies.`,
        level: 2,
      },
      {
        id: "city-intent-hub",
        heading: `Popular ${ctx.serviceName} searches in ${ctx.cityName}`,
        body: `The sections below explain installation, price, company, dealers, contractors, near me, cost, suppliers, manufacturers, premium, best, and quotation searches for ${ctx.serviceLower} across ${ctx.cityName}.`,
        level: 2,
      },
      ...phraseSections,
      {
        id: "city-locality-hub",
        heading: `Top ${ctx.cityName} localities for ${ctx.serviceName}`,
        body: `Hyper-local pages below cover ${ctx.serviceLower} in featured ${ctx.cityName} neighbourhoods with 20,000+ words each.`,
        level: 2,
      },
      ...localitySections,
    ],
    faqs,
  };
}
