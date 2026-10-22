import { CITIES } from "@/data/cities";
import { AREA_PAGE_SERVICES } from "@/data/seo-services";
import { isCgPriorityPlace } from "@/data/cg-local-seo";
import { raipurHubFaqs, raipurHubSections } from "@/config/raipur-seo";
import { filterIndexableLinks } from "@/lib/indexable-href";

export interface CityHubSection {
  id: string;
  heading: string;
  body: string;
}

export interface CityHubFaq {
  question: string;
  answer: string;
}

export function buildCityHubContent(citySlug: string, cityName: string): {
  sections: CityHubSection[];
  faqs: CityHubFaq[];
  serviceLinks: { href: string; label: string }[];
} {
  const otherCities = CITIES.filter((c) => c.slug !== citySlug).map((c) => c.name).join(", ");
  const placeSlug = citySlug === "chhattisgarh" || !isCgPriorityPlace(citySlug) ? "raipur" : citySlug;
  const placeName = placeSlug === "raipur" && citySlug === "chhattisgarh" ? "Raipur" : cityName;

  const sections: CityHubSection[] = [
    ...(citySlug === "chhattisgarh" ? raipurHubSections() : []),
    {
      id: "near-me-hub",
      heading: `What to book in ${cityName}`,
      body: `A search for invisible grills, safety nets, pigeon nets, zip screens, or cricket box grass in ${cityName} should lead to a survey and a written quote. SafeShield Solutions publishes a town page when there is distinct local copy and the service is actually offered. SS304 is the standard grill grade. Nets are specified by use.`,
    },
    {
      id: "services-overview",
      heading: `Services installed across ${cityName}`,
      body: `${cityName} pages cover invisible grills, balcony safety nets, pigeon nets, mosquito nets, cloth hangers, cricket nets, cricket box grass, zip screens, mesh doors, bird spikes, and sports nets where those catalogue lines are offered. Open the town service page that matches the opening.`,
    },
    {
      id: "pricing-guide",
      heading: `What affects a ${cityName} quote`,
      body: `Useful quotes list anchors, edge treatment, material grade, transport, GST, and warranty. Compare those items rather than a headline rate. The figure follows a measurement of the opening.`,
    },
    {
      id: "process",
      heading: `How booking works in ${cityName}`,
      body: `Share photos, the town, and the society name by phone or WhatsApp. We measure the opening and send a written quotation. Installation is scheduled after approval. Care instructions are included at handover.`,
    },
    {
      id: "new-services",
      heading: `Sports, zip screens, and mesh doors`,
      body: `Where offered, cricket box grass, zip screens, and mesh doors follow the same survey-then-quote process as balcony fittings. Specification depends on span, motor load, or mesh grade — not a catalogue default.`,
    },
  ];

  const faqs: CityHubFaq[] = [
    ...(citySlug === "chhattisgarh" ? raipurHubFaqs() : []),
    {
      question: `How many localities do you cover in ${cityName}?`,
      answer: `We cover the listed ${cityName} neighbourhoods that have their own pages. Use the list on this hub, then open the service that matches the opening.`,
    },
    {
      question: `Do you offer free site survey in ${cityName}?`,
      answer: `Yes. Residential enquiries in served ${cityName} towns receive free measurement before quotation.`,
    },
    {
      question: `Which services are most requested in ${cityName}?`,
      answer: `Invisible grills, balcony safety nets, pigeon nets, zip screens, and cricket box grass are among the lines people ask about. Each has a dedicated page where the service is offered.`,
    },
    {
      question: `Can I find dealers and contractors for safety nets in ${cityName}?`,
      answer: `Dealer and contractor searches for ${cityName} resolve to the same measured installation: written scope, named materials, and fitting by the crew that surveyed the opening.`,
    },
    {
      question: `Do you serve other cities besides ${cityName}?`,
      answer: otherCities
        ? `This site also lists ${otherCities}. Coverage is Chhattisgarh only.`
        : `This site covers Chhattisgarh. Raipur is listed first, then every other listed town in the state.`,
    },
  ];

  const prioritySlugs = [
    "invisible-grills",
    "safety-nets",
    "pigeon-safety-nets",
    "zip-screens",
    "motorized-zip-screens",
    "cricket-box-grass",
    "mesh-doors",
    "sliding-mesh-doors",
    "mosquito-nets",
    "cloth-hangers",
    "cricket-nets",
    "bird-spikes",
  ];

  const serviceLinks = filterIndexableLinks(
    prioritySlugs
      .map((slug) => AREA_PAGE_SERVICES.find((s) => s.slug === slug))
      .filter(Boolean)
      .flatMap((svc) => [
        {
          href: `/chhattisgarh/${placeSlug}/${svc!.slug}`,
          label: `${svc!.name} in ${placeName}`,
        },
        {
          href: `/chhattisgarh/${placeSlug}/${svc!.slug}-near-me`,
          label: `${svc!.name} in ${placeName} — nearby booking`,
        },
      ]),
  );

  return { sections, faqs, serviceLinks };
}
