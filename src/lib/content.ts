export interface ContentSection {
  id: string;
  heading: string;
  body: string;
  level?: 2 | 3;
}

export interface ContentModule {
  type: string;
  data: Record<string, unknown>;
}

export interface PageContent {
  intro: string;
  sections: ContentSection[];
  faqs: { question: string; answer: string }[];
  cta: { heading: string; text: string };
  localNotes?: string;
  issuesSolved?: string[];
  whereWorksBest?: string[];
  materials?: string[];
  priceFactors?: string[];
  installSteps?: { title: string; description: string }[];
  maintenance?: string;
  priceGuide?: string;
}

export interface ServiceContentContext {
  serviceName: string;
  serviceSlug: string;
  serviceDescription: string;
  category: string;
}

export interface LocationContentContext {
  locationName: string;
  locationSlug: string;
  locationType: string;
  cityName?: string;
  citySlug?: string;
  areaName?: string;
  /** URL intent variant, e.g. "installation" */
  intentLabel?: string;
}

import { getServiceDetail } from "@/config/service-details";
import { getAreaZoneForCity } from "@/config/area-zones";
import { getSeoService } from "@/data/seo-services";
import { slugify } from "@/lib/slug";
import { buildAreaSearchIntentsSection } from "@/lib/seo-keywords";
import { buildAreaLongformExpansion } from "@/lib/area-longform-content";
import { buildCityServiceLongform } from "@/lib/city-service-longform";

export function buildServiceContent(ctx: ServiceContentContext): PageContent {
  const detail = getServiceDetail(ctx.serviceSlug);

  return {
    intro: detail.overview,
    issuesSolved: detail.issuesSolved,
    whereWorksBest: detail.whereWorksBest,
    materials: detail.materials,
    priceFactors: detail.priceFactors,
    installSteps: detail.installSteps,
    maintenance: detail.maintenance,
    priceGuide: detail.priceGuide,
    sections: [
      ...detail.extraSections.map((s, i) => ({
        id: `extra-${i}`,
        heading: s.heading,
        body: s.body,
        level: 2 as const,
      })),
      {
        id: "process",
        heading: "Our Installation Process",
        body: `1. Free site survey and measurement\n2. Custom design and written quotation\n3. Professional installation by trained technicians\n4. Quality check, handover, and warranty registration`,
        level: 2,
      },
      {
        id: "why-safeshield",
        heading: "Why Choose SafeShield Solutions",
        body: `With 12+ years of experience and 8,500+ completed projects, SafeShield Solutions is trusted across Telangana and Tamil Nadu. We offer same-day quotes, flexible scheduling, and after-sales service you can reach by phone or WhatsApp.`,
        level: 2,
      },
    ],
    faqs: [
      {
        question: `How much does ${ctx.serviceName.toLowerCase()} installation cost?`,
        answer: detail.priceGuide ??
          `Pricing depends on opening size, floor height, material specification, and quantity. We provide a free site survey and detailed quotation with no hidden charges.`,
      },
      {
        question: `How long does ${ctx.serviceName.toLowerCase()} installation take?`,
        answer:
          "Most residential installations are completed within 2–4 hours per unit. Larger projects may require a full day. We confirm the timeline during the site survey.",
      },
      {
        question: "Do you provide warranty?",
        answer:
          "Yes. All SafeShield Solutions installations include a 5-year warranty on materials and workmanship, subject to standard care guidelines.",
      },
      {
        question: "Which areas do you serve?",
        answer:
          "We serve Chennai, Hyderabad, Coimbatore, and Kochi including all major residential and commercial localities. Contact us or browse our locations index to confirm service availability in your neighbourhood.",
      },
      ...detail.extraFaqs,
    ],
    cta: {
      heading: `Get a Free ${ctx.serviceName} Quote`,
      text: "Book a free site survey today. Our team will measure, recommend the right specification, and share a transparent quotation.",
    },
  };
}

export function buildCityServiceContent(
  serviceCtx: ServiceContentContext,
  locationCtx: LocationContentContext,
): PageContent {
  const { serviceName, serviceSlug, serviceDescription, category } = serviceCtx;
  const { locationName, cityName, citySlug, intentLabel } = locationCtx;
  const city = cityName ?? locationName;
  const serviceLower = serviceName.toLowerCase();
  const detail = getServiceDetail(serviceSlug);
  const seo = getSeoService(serviceSlug);

  const intentLead =
    intentLabel && intentLabel !== "general"
      ? `Searching for ${serviceLower} ${intentLabel.replace(/-/g, " ")} in ${city}? This city hub covers premium installers, dealers, price factors, and near-me booking across every major ${city} locality. `
      : "";

  const searchSnippet = seo?.searchPhrases
    ?.slice(0, 5)
    .map((p) => p.replace(/\{city\}/gi, city))
    .join(", ");

  const longform = buildCityServiceLongform({
    serviceName,
    serviceSlug,
    serviceLower,
    category,
    cityName: city,
    citySlug: citySlug ?? slugify(city),
    intentLabel,
  });

  return {
    intro: `${intentLead}Looking for professional ${serviceLower} in ${city}? SafeShield Solutions provides expert installation with SS304 materials, free site surveys, and a 5-year warranty. ${serviceDescription} We serve apartments, gated communities, villas, and commercial properties across ${city}, with dedicated pages for ${searchSnippet ?? `${serviceLower} near me`}, installation, price, dealers, best, and premium options in every neighbourhood.`,
    issuesSolved: [
      `Openings in ${city} homes that need measured ${serviceName.toLowerCase()} fitting`,
      "Society facade rules, heat exposure, and monsoon conditions affecting material choice",
      "High-rise and villa projects needing site-specific anchor planning",
    ],
    whereWorksBest: [
      `Apartment towers and gated communities across ${city}`,
      "Independent houses and villa balconies",
      "Commercial and institutional buildings",
    ],
    priceFactors: [
      "Measured opening size and local access conditions",
      "Material grade, mesh or cable specification",
      "Number of units for society or builder projects",
      "Included installation, transport, and warranty scope",
    ],
    sections: [
      {
        id: "near-me-city",
        heading: `${serviceName} near me in ${city} — how local booking works`,
        body: `Near-me searches for ${serviceLower} in ${city} route to neighbourhood crews — not a call centre. Share your pin code, society name, and photos of the opening. We confirm survey slot, material grade (${category} category), and written quote scope before production. Premium and affordable packages differ in mesh GSM, cable count, and included hardware — not safety-critical anchors.`,
        level: 2,
      },
      {
        id: "local-check",
        heading: `What we check before recommending ${serviceName} in ${city}`,
        body: `We confirm fixing surface condition, society or facade rules, exposure to sun and rain, daily use of the opening, and safe access for installation. A standard package should not be forced onto every ${city} property without measurement.`,
        level: 2,
      },
      {
        id: "price-dealers-city",
        heading: `${serviceName} price & dealers in ${city}`,
        body: `"${serviceLower} price in ${city}" and "dealers near me" queries should compare itemised scope: anchors, edge treatment, transport, GST, and warranty. We operate as manufacturer-installer across Chennai, Hyderabad, Coimbatore, and Kochi — ${city} residents get direct fitting without middleman markup.`,
        level: 2,
      },
      {
        id: "areas-covered",
        heading: `Areas We Cover in ${city}`,
        body: `We install ${serviceLower} across all major localities in ${city}. Whether you need a single balcony or a full building project, our technicians arrive on schedule with the right materials and tools. Browse the city locations page for searchable neighbourhood links.`,
        level: 2,
      },
      {
        id: "materials",
        heading: "Quality You Can Trust",
        body: `Every ${serviceLower} installation in ${city} uses tested SS304 components and professional mounting hardware where applicable. We never compromise on anchor strength or cable tension — critical for child safety and long-term durability.`,
        level: 2,
      },
      ...detail.extraSections.slice(0, 2).map((s, i) => ({
        id: `city-detail-${i}`,
        heading: s.heading.replace(/\{city\}/g, city),
        body: s.body.replace(/\{city\}/g, city),
        level: 2 as const,
      })),
      ...longform.sections,
    ],
    faqs: [
      {
        question: `Where can I find ${serviceLower} near me in ${city}?`,
        answer: `Open our ${city} locations page, search your neighbourhood, or use intent pages like installation, price, dealers, best, and premium. Each locality page includes 20,000+ words of local guidance and free survey booking.`,
      },
      {
        question: `What is the ${serviceLower} price in ${city}?`,
        answer: `Pricing depends on measured area, material specification, access, and finish. For invisible grills, standard ${city} installations often fall around ₹130–180 per sq ft after site survey. We provide a written quotation with included scope.`,
      },
      {
        question: `Do you provide ${serviceName.toLowerCase()} in ${city}?`,
        answer: `Yes. SafeShield Solutions provides ${serviceName.toLowerCase()} installation across ${city} with free site survey and same-day quotation options.`,
      },
      {
        question: `How soon can you install in ${city}?`,
        answer: `Most ${city} installations are scheduled within 24–48 hours of confirmation, subject to material availability and project size.`,
      },
      {
        question: "Is site survey free?",
        answer: "Yes. We offer a free site survey and measurement for all residential enquiries in Chennai, Hyderabad, Coimbatore, and Kochi.",
      },
      ...longform.faqs,
    ],
    cta: {
      heading: `Book ${serviceName} Installation in ${city}`,
      text: `Call or WhatsApp now for a free survey in ${city}. Transparent pricing, trained installers, 5-year warranty.`,
    },
    localNotes: `Serving ${city} with local installation teams for faster response and area-specific expertise.`,
  };
}

function intentIntroParagraph(
  intentLabel: string | undefined,
  serviceName: string,
  serviceLower: string,
  locality: string,
  area: string,
): string {
  if (!intentLabel || intentLabel === "general") return "";

  const label = intentLabel.replace(/-/g, " ");
  const intentMap: Record<string, string> = {
    installation: `This page focuses on ${serviceLower} installation in ${locality} — survey, fixing method, timeline, and post-install warranty. Residents searching "installation" want a crew that arrives on schedule, respects society rules in ${area}, and documents measurements before production.`,
    price: `This page answers ${serviceLower} price queries for ${locality}. We explain what drives quotes in ${area} — opening size, floor access, material grade, and quantity — so you can compare dealers and contractors on equal scope rather than headline rates alone.`,
    cost: `Cost comparisons for ${serviceName.toLowerCase()} in ${locality} should include anchors, edge treatment, transport, and warranty. This guide breaks down typical cost bands for ${area} homes and when bulk or society packages reduce per-opening rates.`,
    dealers: `Looking for ${serviceLower} dealers near ${area}? We operate as manufacturer-installer, so ${locality} customers get factory-spec SS304 and UV-stable nets with direct fitting — no middleman markup or mismatched hardware.`,
    contractors: `Contractors and builders in ${area} use this page for ${serviceLower} specifications on new towers and villa projects. We supply itemised BOQs, harness-compliant crews, and phased installs for ${locality} sites.`,
    company: `Compare ${serviceLower} companies serving ${locality} on written scope, material certificates, and warranty registration. SafeShield Solutions assigns ${area}-familiar installers with documented spacing and society-friendly finishes.`,
    "near me": `Near-me searches in ${area} route to the same ${locality} team — local mobilisation, same-day survey slots where available, and transparent quotes after on-site measurement.`,
    quote: `Request a written ${serviceLower} quote for ${locality} after a free survey. We itemise labour, hardware, GST, and warranty so ${area} residents can approve scope before production.`,
    best: `Choosing the best ${serviceLower} in ${locality} means verifying steel grade, knotless net GSM, spacing, and after-sales support — not just lowest price. This ${area} guide lists what premium installs include.`,
    affordable: `Affordable ${serviceLower} in ${locality} still requires correct anchors and SS304 where exposed. We explain how ${area} customers save via multi-opening packages without cutting safety-critical components.`,
    premium: `Premium ${serviceLower} in ${locality} means documented material grades, factory-cut components, trained harness crews for ${area} high-rises, and warranty registration — not inflated dealer margins. Compare premium packages on spec sheets, not taglines.`,
    quotation: `Quotation pages for ${serviceLower} in ${locality} explain itemised BOQs: materials, labour, transport, GST, and warranty. ${area} residents should approve written scope before production — especially for motorized zip screens, box cricket turf, or custom mesh doors.`,
    suppliers: `Suppliers and manufacturers serving ${area} should list mesh GSM, cable grade, turf pile height, or motor torque in writing. We supply and install directly in ${locality} so specification and fitting stay under one accountable team.`,
    manufacturers: `Manufacturer-direct ${serviceLower} in ${locality} removes reseller markup common among ${area} dealers. Factory production follows survey measurements — critical for irregular openings, L-shaped balconies, and custom court dimensions.`,
    repair: `Repair intent for ${serviceLower} in ${area} covers mesh replacement, cable re-tensioning, roller fixes on sliding mesh doors, and motor recalibration on zip screens. Send photos for a repair quotation before ordering new frames in ${locality}.`,
    maintenance: `Maintenance for ${serviceName.toLowerCase()} in ${locality} includes annual tension checks, pulley lubrication, infill top-up on turf, and track cleaning on zip systems. ${area} monsoon seasons accelerate wear — schedule inspection before peak rain.`,
    booking: `Booking ${serviceLower} in ${area} starts with pin code, society name, and opening photos. ${locality} slots batch with neighbouring areas for faster survey and installation timelines.`,
    warranty: `Warranty searches for ${serviceLower} in ${locality} should confirm workmanship period, material coverage, and how to register claims in ${area}. SS304 grills, UV nets, turf seams, and motorized drives each carry different care requirements.`,
    automation: `Automation and motorized ${serviceLower} in ${area} need limit calibration, motor sizing for opening width, and weather sealing on tracks. Smart home integration in ${locality} is quoted after measuring load and exposure.`,
  };

  const key = label.toLowerCase();
  for (const [k, v] of Object.entries(intentMap)) {
    if (key.includes(k)) return `${v}\n\n`;
  }
  return `You searched for ${serviceName.toLowerCase()} ${label} in ${locality}. The guidance below covers survey, materials, pricing factors, and installation standards specific to ${area}.\n\n`;
}

function buildAreaIntro(input: {
  serviceName: string;
  serviceLower: string;
  serviceDescription: string;
  area: string;
  city: string;
  locality: string;
  zoneLabel: string;
  zoneDesc: string;
  searchSnippet?: string;
  intentLabel?: string;
}): string {
  const {
    serviceName,
    serviceLower,
    serviceDescription,
    area,
    locality,
    zoneLabel,
    zoneDesc,
    searchSnippet,
    intentLabel,
  } = input;

  const intentLead = intentIntroParagraph(intentLabel, serviceName, serviceLower, locality, area);

  const base = `${serviceName} in ${locality} is one of the most searched home safety upgrades in ${zoneLabel}. Homeowners and facility managers in ${area} choose ${serviceLower} for child safety, bird control, better drying space, or sports practice without blocking views or airflow. ${serviceDescription} Our ${area} installation team covers apartments, gated communities, villas, and commercial buildings across ${zoneDesc}. Whether you searched for ${searchSnippet ?? `${serviceLower} in ${area}`}, you get the same premium materials, site survey, and warranty-backed installation from SafeShield Solutions. We serve ${locality} with locally assigned installers who know typical ${area} balcony sizes, society rules, and fixing methods for concrete, MS frame, and uPVC openings.`;

  return intentLead + base;
}

export function buildAreaServiceContent(
  serviceCtx: ServiceContentContext,
  locationCtx: LocationContentContext,
): PageContent {
  const { serviceName, serviceSlug, serviceDescription, category } = serviceCtx;
  const area = locationCtx.areaName ?? locationCtx.locationName;
  const city = locationCtx.cityName ?? "";
  const citySlug = locationCtx.citySlug ?? slugify(city);
  const areaSlug = locationCtx.locationSlug ?? slugify(area);
  const locality = city ? `${area}, ${city}` : area;
  const serviceLower = serviceName.toLowerCase();
  const intentLabel = locationCtx.intentLabel;

  const detail = getServiceDetail(serviceSlug);
  const seo = getSeoService(serviceSlug);
  const zone = getAreaZoneForCity(citySlug, areaSlug);
  const zoneLabel = zone.label;
  const zoneDesc = zone.description;

  const searchSnippet = seo?.searchPhrases
    ?.slice(0, 6)
    .map((p) => p.replace(/\{area\}/gi, area).replace(/\{city\}/gi, city))
    .join(", ");

  const searchIntents = buildAreaSearchIntentsSection({
    serviceSlug,
    serviceName,
    areaName: area,
    cityName: city,
  });

  const intro = buildAreaIntro({
    serviceName,
    serviceLower,
    serviceDescription,
    area,
    city,
    locality,
    zoneLabel,
    zoneDesc,
    searchSnippet,
    intentLabel,
  });

  const priceGuide = detail.priceGuide
    ? `${detail.priceGuide} In ${area}, final quotes depend on opening size, floor height, access, and quantity. We share itemised estimates after a free site visit in ${locality}—no hidden visit charges for standard residential surveys.`
    : undefined;

  const localNotes = `Local coverage in ${area} (${zoneLabel}): ${zoneDesc}. Typical projects include high-rise flats, independent houses, and gated layouts. Mention your society name when booking for faster routing to the nearest installation crew.`;

  const longform = buildAreaLongformExpansion({
    serviceName,
    serviceSlug,
    serviceLower,
    category,
    areaName: area,
    areaSlug,
    cityName: city,
    citySlug,
    locality,
    intentLabel,
  });

  return {
    intro,
    issuesSolved: detail.issuesSolved.map((item) =>
      item.replace(/\{city\}/g, city || area).replace(/\{area\}/g, area),
    ),
    whereWorksBest: [
      ...detail.whereWorksBest,
      `Apartments and gated communities across ${area} and nearby ${zoneLabel} corridors`,
      `Independent homes and villa projects in ${locality}`,
    ],
    materials: detail.materials,
    priceFactors: [
      ...detail.priceFactors,
      `Floor level and lift access in ${area} high-rises`,
      `Society-specific fixing permissions in ${locality}`,
    ],
    installSteps: detail.installSteps,
    maintenance: detail.maintenance,
    priceGuide,
    sections: [
      {
        id: "coverage",
        heading: `${serviceName} coverage in ${area}`,
        body: `${area} sits in ${zoneLabel}, where demand for ${serviceLower} is driven by dense residential growth, balcony-heavy floor plans, and year-round need for ventilation. Our team completes projects in ${locality} weekly—from single-window installs to full-tower bird net or grill packages. We coordinate with building managers for work timings, lift usage, and safety harness requirements on upper floors common in ${area}.`,
        level: 2,
      },
      {
        id: "why-safeshield-area",
        heading: `Why ${area} residents choose SafeShield Solutions`,
        body: `Customers in ${locality} value clear pricing, SS304 and UV-stable materials where applicable, and installers who arrive on schedule. We document measurements, share before/after photos, and explain maintenance so your ${serviceLower} performs for years. Dealers and contractors in ${area} often refer us for complex facades; homeowners book direct for transparent quotes and factory-grade components.`,
        level: 2,
      },
      {
        id: "property-types",
        heading: `Property types we install in ${locality}`,
        body: `In ${area} we regularly install for 2BHK and 3BHK flats, penthouse balconies, villa courtyards, terrace sports cages, and shop-front bird control. ${category} systems are sized for each opening—no one-size templates. For ${zoneLabel} societies with strict exterior rules, we offer low-profile invisible grills and neutral net colours that pass most aesthetic guidelines.`,
        level: 2,
      },
      {
        id: "process-area",
        heading: `Installation process in ${area}`,
        body: `Book a free survey in ${locality} by phone or WhatsApp. We visit ${area}, measure openings, check substrate strength, and recommend spacing and fixing type. Production and material cut happens after you approve the quote. Installation usually completes in one day for standard homes; larger ${area} projects may be phased by tower or floor. We clean the work area and walk you through warranty and care instructions before sign-off.`,
        level: 2,
      },
      ...detail.extraSections.slice(0, 2).map((s, i) => ({
        id: `detail-${i}`,
        heading: s.heading.replace(/\{city\}/g, city || area).replace(/\{area\}/g, area),
        body: s.body.replace(/\{city\}/g, city || area).replace(/\{area\}/g, area),
        level: 2 as const,
      })),
      {
        id: "price-dealers",
        heading: `${serviceName} price and dealers in ${area}`,
        body: `Searching "${serviceLower} price in ${area}" or "dealers near me" usually means you want a fair rate and reliable fitting. Published ranges depend on wire count, net mesh grade, hanger length, or sports net span. We operate as manufacturer-installer, so ${locality} customers skip middleman markup. Request a written quote after survey to compare with local dealers—ensure SS304 grills, correct knotless net GSM, and included hardware are specified.`,
        level: 2,
      },
      {
        id: "search-intents",
        heading: searchIntents.heading,
        body: searchIntents.body,
        level: 2,
      },
      {
        id: "nearby",
        heading: `Nearby localities from ${area}`,
        body: `From ${area} we also serve surrounding neighbourhoods in ${zoneLabel}. If your pin code borders another sector, mention it during booking—we often batch routes for ${city || "the city"} to offer quicker slots. Same quality standards and warranty apply across all ${locality} service visits.`,
        level: 2,
      },
      ...longform.sections,
    ],
    faqs: [
      {
        question: `What is the cost of ${serviceLower} in ${area}?`,
        answer: `Pricing in ${locality} depends on dimensions, material spec, floor access, and number of openings. After a free site visit in ${area}, we provide an itemised quote. Bulk discounts apply for full-apartment or multi-tower projects in gated communities.`,
      },
      {
        question: `Do you provide ${serviceLower} installation in ${area}?`,
        answer: `Yes. We install ${serviceLower} across ${locality} with our own trained team—not outsourced daily labour. Survey, production, and installation are managed end-to-end for consistent quality in ${area}.`,
      },
      {
        question: `Are you ${serviceLower} dealers or contractors in ${area}?`,
        answer: `We supply and install directly in ${area}, which covers the role of dealer and contractor. You get factory-spec materials, fixed-scope quotes, and warranty support from one point of contact in ${locality}.`,
      },
      {
        question: `How soon can you install in ${locality}?`,
        answer: `Most ${area} residential bookings receive a survey within 24–48 hours. Installation follows 3–7 days after approval depending on material prep and weather. Urgent child-safety cases in ${locality} are prioritised when possible.`,
      },
      {
        question: `Is ${serviceLower} suitable for apartments in ${area}?`,
        answer: `Yes. Most ${area} projects are in apartments and gated communities. We use methods suited to concrete slabs, MS railings, and uPVC windows, and coordinate with society offices for timing and safety compliance.`,
      },
      {
        question: `What warranty do you offer for ${serviceLower} in ${area}?`,
        answer: `Installations in ${locality} include workmanship warranty plus material coverage as stated in your quote. SS304 invisible grills and UV-treated nets are specified for long life in ${zoneLabel} weather.`,
      },
      ...detail.extraFaqs.slice(0, 2).map((f) => ({
        question: f.question.replace(/\{city\}/g, city || area).replace(/\{area\}/g, area),
        answer: f.answer.replace(/\{city\}/g, city || area).replace(/\{area\}/g, area),
      })),
      ...longform.faqs,
    ],
    cta: {
      heading: `Book ${serviceName} in ${area}`,
      text: `Free site visit in ${locality}. Call or WhatsApp for survey slots, price estimate, and installation timeline in ${area}.`,
    },
    localNotes,
  };
}

/** Score 0–1 for indexability; aligns with publishing.minContentScore (0.7). */
export function computeContentScore(
  wordCount: number,
  minWords: number,
  faqCount: number,
  sectionCount: number,
): number {
  const wordRatio = Math.min(wordCount / Math.max(minWords, 1), 1.25);
  const faqBonus = Math.min(faqCount / 20, 1) * 0.1;
  const sectionBonus = Math.min(sectionCount / 35, 1) * 0.1;
  return Math.round(Math.min(0.98, 0.4 + wordRatio * 0.38 + faqBonus + sectionBonus) * 100) / 100;
}

export function contentToPlainText(content: PageContent): string {
  const parts = [
    content.intro,
    ...(content.issuesSolved ?? []),
    ...(content.whereWorksBest ?? []),
    ...(content.materials ?? []),
    ...(content.priceFactors ?? []),
    ...(content.installSteps ?? []).map((s) => `${s.title} ${s.description}`),
    content.maintenance ?? "",
    content.priceGuide ?? "",
    ...content.sections.map((s) => `${s.heading} ${s.body}`),
    ...content.faqs.map((f) => `${f.question} ${f.answer}`),
    content.cta.heading,
    content.cta.text,
    content.localNotes ?? "",
  ];
  return parts.filter(Boolean).join(" ");
}
