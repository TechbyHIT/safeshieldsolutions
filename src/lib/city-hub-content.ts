import { HOME_CITY_AREAS } from "@/config/home-seo-links";
import { CITIES } from "@/data/cities";
import { AREA_PAGE_SERVICES } from "@/data/seo-services";
import { routes } from "@/config/routes";

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
  const areas = HOME_CITY_AREAS[citySlug] ?? [];
  const topAreas = areas.slice(0, 8).map((a) => a.name).join(", ");
  const otherCities = CITIES.filter((c) => c.slug !== citySlug).map((c) => c.name).join(", ");

  const sections: CityHubSection[] = [
    {
      id: "near-me-hub",
      heading: `Premium invisible grills, safety nets & zip screens near me in ${cityName}`,
      body: `Searching "invisible grills near me", "safety nets near me", "pigeon nets near me", "zip screens near me", or "cricket box grass near me" in ${cityName} should lead to measurable installation — not generic listings. SafeShield Solutions publishes dedicated pages for every major ${cityName} neighbourhood with 20,000+ words covering installation, price, dealers, contractors, premium, and near-me intent. From ${topAreas || cityName} to outer corridors, the same SS304, UV-stable, and factory-spec standards apply.`,
    },
    {
      id: "services-overview",
      heading: `All services we install across ${cityName}`,
      body: `${cityName} residents book invisible grills, balcony safety nets, pigeon nets, mosquito nets, cloth hangers, cricket nets, cricket box grass, zip screens, motorized zip screens, mesh doors, sliding mesh doors, bird spikes, and sports nets. Each service has city-wide and locality-specific pages — over 29,000 URL variants per area for long-tail SEO coverage. City hub pages connect you to searchable localities below.`,
    },
    {
      id: "pricing-guide",
      heading: `${cityName} price guide — what affects your quote`,
      body: `Price searches — "invisible grill price in ${cityName}", "safety net dealers", "zip screen cost per sq ft", "box cricket turf price per sq ft" — need itemised scope. Compare anchors, edge treatment, material grade, transport, GST, and warranty on every quote. We operate as manufacturer-installer across ${cityName} so residents skip dealer markup while keeping documented SS304, knotless net GSM, and automation specs where applicable.`,
    },
    {
      id: "process",
      heading: `How booking works in ${cityName}`,
      body: `Share photos, pin code, and society name by phone or WhatsApp. We assign the nearest ${cityName} survey crew, measure openings or court dimensions, and send a written quotation. Installation typically follows within days after approval — phased for full-tower or commercial projects. Post-install warranty registration and care instructions are included for every ${cityName} locality.`,
    },
    {
      id: "new-services",
      heading: `Cricket box grass, zip screens & mesh doors in ${cityName}`,
      body: `New ${cityName} service lines include premium cricket box grass and box cricket turf for indoor/outdoor courts, manual and motorized zip screens for balconies and patios, and mesh doors plus sliding mesh doors for insect-free ventilation. Each links to near-me, installation, price, dealers, and premium pages in every ${cityName} locality listed below.`,
    },
  ];

  const faqs: CityHubFaq[] = [
    {
      question: `How many localities do you cover in ${cityName}?`,
      answer: `We cover all listed ${cityName} neighbourhoods on this page, each with thousands of service and intent URLs. Use the search box to find your area, then open installation, price, or near-me variants for your service.`,
    },
    {
      question: `Do you offer free site survey in ${cityName}?`,
      answer: `Yes. Residential and commercial enquiries in ${cityName} receive free measurement and specification guidance before quotation.`,
    },
    {
      question: `Which services are most popular in ${cityName}?`,
      answer: `Invisible grills, balcony safety nets, pigeon nets, zip screens, and cricket box grass are among the most searched services in ${cityName}. Each has dedicated city and locality pages with full buying guides.`,
    },
    {
      question: `Can I find dealers and contractors for safety nets in ${cityName}?`,
      answer: `Our ${cityName} pages cover dealers, contractors, company, suppliers, and manufacturers intent searches — all resolving to direct supply and installation with written scope.`,
    },
    {
      question: `Do you serve other cities besides ${cityName}?`,
      answer: `Yes. We also serve ${otherCities} with the same page scale and quality standards.`,
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

  const serviceLinks = prioritySlugs
    .map((slug) => AREA_PAGE_SERVICES.find((s) => s.slug === slug))
    .filter(Boolean)
    .flatMap((svc) => [
      {
        href: routes.cityService(citySlug, `${svc!.slug}-near-me`),
        label: `${svc!.name} near me in ${cityName}`,
      },
      {
        href: routes.cityService(citySlug, `${svc!.slug}-installation`),
        label: `${svc!.name} installation in ${cityName}`,
      },
      {
        href: routes.cityService(citySlug, `${svc!.slug}-price`),
        label: `${svc!.name} price in ${cityName}`,
      },
    ]);

  return { sections, faqs, serviceLinks };
}
