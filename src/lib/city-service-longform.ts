import type { ContentSection } from "@/lib/content";
import { getServiceDetail } from "@/config/service-details";
import { CG_PRIORITY_PLACES } from "@/data/cg-local-seo";
import { cityServiceSlugsForPlace } from "@/lib/local-seo-catalog";

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
  const detail = getServiceDetail(ctx.serviceSlug);
  const towns = CG_PRIORITY_PLACES.filter((place) =>
    cityServiceSlugsForPlace(place.slug).includes(ctx.serviceSlug),
  )
    .slice(0, 8)
    .map((place) => place.name)
    .join(", ");

  const faqs: { question: string; answer: string }[] = [
    {
      question: `Do you install ${ctx.serviceLower} in ${ctx.cityName}?`,
      answer: `Yes, in the served ${ctx.cityName} towns that have a ${ctx.serviceName} page. Book a free survey from the town page that matches the opening.`,
    },
    {
      question: `What is ${ctx.serviceLower} price in ${ctx.cityName}?`,
      answer: `Pricing depends on opening size, access, and material grade. We provide an itemised quotation after a free site survey. No flat rate is published.`,
    },
    ...detail.extraFaqs.map((f) => ({
      question: f.question.replace(/\{city\}/g, ctx.cityName),
      answer: f.answer.replace(/\{city\}/g, ctx.cityName),
    })),
  ];

  return {
    sections: [
      {
        id: "city-longform-hub",
        heading: `${ctx.serviceName} across ${ctx.cityName}`,
        body: `This ${ctx.cityName} page explains how ${ctx.serviceLower} is surveyed, specified, and fitted. The quote follows a measurement. Town pages exist where the service is offered and the copy is distinct.`,
        level: 2,
      },
      {
        id: "city-intent-hub",
        heading: "Booking, specification, and quotes",
        body: `Installation, price, and nearby-installer searches for ${ctx.serviceLower} in ${ctx.cityName} use the same process: photo, survey, written scope, then fitting. Compare quotes on anchors, material grade, labour, GST, and warranty.`,
        level: 2,
      },
      {
        id: "city-locality-hub",
        heading: `Towns with ${ctx.serviceName} pages`,
        body: towns
          ? `${ctx.serviceName} pages are published for ${towns} where the catalogue includes this line. Open the town page that matches the opening.`
          : `${ctx.serviceName} is listed on the Chhattisgarh hub. Open a served town page when it exists for this service.`,
        level: 2,
      },
    ],
    faqs,
  };
}
