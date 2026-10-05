/**
 * Unique local landing copy for served Chhattisgarh city × service pages.
 * Facts come from the place profile and the service catalogue — not synonym spinning.
 * No AI is called at request time.
 */
import { getServiceDetail } from "@/config/service-details";
import { getDistrictForCity, getIndexableLocalitiesForCity } from "@/data/cg-hierarchy";
import { CG_PRIORITY_PLACES, getCgPlace, type CgPlaceProfile } from "@/data/cg-local-seo";
import { getSeoService, type SeoService } from "@/data/seo-services";
import { cityServiceSlugsForPlace, nearMeSlug } from "@/lib/local-seo-catalog";
import { composeServicePage, type LocalIntent } from "@/lib/compose-service-page";

export type { LocalIntent };

export interface LocalLandingCopy {
  path: string;
  title: string;
  h1: string;
  description: string;
  intro: string;
  explanation: string;
  propertyTypes: string[];
  problems: string[];
  applications: string[];
  benefits: string[];
  install: string;
  serviceArea: string;
  faqs: { question: string; answer: string }[];
  relatedServices: { href: string; label: string }[];
  nearbyPlaces: { href: string; label: string }[];
  localityLinks: { href: string; label: string }[];
  cta: string;
  sections: { id: string; heading: string; paragraphs: string[]; bullets?: string[] }[];
  sources: { title: string; url: string; publisher: string; usedFor: string }[];
  checklist: string[];
  contentAngle: string;
}

const RELATED_FOR_SERVICE: Record<string, string[]> = {
  "bird-spikes": ["bird-protection-nets", "pigeon-safety-nets", "safety-nets", "invisible-grills"],
  "bird-protection-nets": ["bird-spikes", "pigeon-safety-nets", "safety-nets"],
  "pigeon-safety-nets": ["bird-spikes", "safety-nets", "balcony-safety-nets", "invisible-grills"],
  "invisible-grills": ["safety-nets", "balcony-invisible-grills", "window-invisible-grills", "bird-spikes"],
  "safety-nets": ["invisible-grills", "pigeon-safety-nets", "child-safety-nets", "bird-spikes"],
  "balcony-safety-nets": ["safety-nets", "invisible-grills", "child-safety-nets"],
  "child-safety-nets": ["safety-nets", "invisible-grills", "pet-safety-nets"],
  "mosquito-nets": ["zip-screens", "mesh-doors", "sliding-mesh-doors"],
  "cloth-hangers": ["ceiling-cloth-hangers", "balcony-cloth-hangers", "safety-nets"],
  "zip-screens": ["mosquito-nets", "mesh-doors", "invisible-grills"],
  "mesh-doors": ["sliding-mesh-doors", "mosquito-nets", "zip-screens"],
  "sports-nets": ["cricket-nets", "cricket-box-grass", "safety-nets"],
};

interface PlaceHousing {
  types: string[];
  access: string;
  climate: string;
}

function housingFor(place: CgPlaceProfile): PlaceHousing {
  switch (place.slug) {
    case "raipur":
      return {
        types: [
          "Older plotted houses in Civil Lines, Shankar Nagar, Pandri, and Devendra Nagar",
          "Mid-rise apartments on VIP Road and around Telibandha lake",
          "Newer sector flats and plotted houses in Naya Raipur (Atal Nagar)",
          "Shop-top residences and mixed-use buildings in central market streets",
        ],
        access: "Society timing, lift bookings, and street-side parking on VIP Road and Pandri change how the crew stages tools",
        climate: "Hot dry months, monsoon splash on west-facing balconies, and dust from the ring roads",
      };
    case "bhilai":
      return {
        types: [
          "Steel-township sector flats with repeating balcony sizes",
          "Rebuilt private houses inside planned sectors",
          "Low-rise flats above shops in Supela and Civic Centre",
          "Independent houses on the Raipur-facing side of the township",
        ],
        access: "Township gates and shop-street access windows matter more than high-rise crane work",
        climate: "Industrial dust plus monsoon wetting on ledges and AC decks",
      };
    case "durg":
      return {
        types: [
          "Twin-city town houses along the Durg–Bhilai corridor",
          "Newer apartment pockets on the Raipur road",
          "Independent houses with existing MS railings",
        ],
        access: "Jobs are usually reached from the twin-city roads rather than a separate plant township gate",
        climate: "Same monsoon and dust pattern as Bhilai, with more older masonry openings",
      };
    case "bilaspur":
      return {
        types: [
          "Independent houses in Sarkanda and Torwa",
          "Flats and older plots near the railway-city core",
          "Small apartment buildings away from the station",
        ],
        access: "Street-side plotted houses are the usual access; podium towers are uncommon",
        climate: "Railway-city dust and monsoon wetting on older sunshades",
      };
    case "korba":
      return {
        types: [
          "Plant-adjacent township quarters",
          "Independent homes near power and mining colonies",
          "Balconies and AC decks that collect industrial dust",
        ],
        access: "Township and colony gates set the working hours",
        climate: "Dust, heat, and corrosion exposure on ledges next to plant areas",
      };
    default: {
      const ctx = place.localContext.toLowerCase();
      const industrial = ctx.includes("plant") || ctx.includes("industrial") || ctx.includes("mining") || ctx.includes("steel");
      return {
        types: [
          `Independent houses in ${place.name}`,
          ctx.includes("apartment") ? `Apartment balconies in ${place.name}` : `Low-rise flats and shop-top homes in ${place.name}`,
          industrial ? "Township and colony openings near workplaces" : "Town-centre houses and newer residential pockets",
        ],
        access: `Most ${place.name} jobs are reached from street-level houses or small societies rather than high-rise podiums`,
        climate: industrial
          ? "Dust and heat on ledges, plus monsoon wetting"
          : "Chhattisgarh heat, monsoon splash, and dust on west-facing openings",
      };
    }
  }
}

function raipurExplanation(service: SeoService): string | null {
  switch (service.slug) {
    case "invisible-grills":
      return "In Raipur the usual request is a slim SS304 cable line on a balcony that already has a masonry or MS railing. Older Civil Lines and Shankar Nagar houses often need anchors into existing concrete. VIP Road apartments want a facade-quiet finish. Naya Raipur sectors are newer slabs with more regular spans. The grill is specified after the opening is measured; it does not replace a sound railing or adult supervision.";
    case "safety-nets":
      return "Raipur safety-net jobs split between child/pet balcony closures in city colonies and pigeon or debris nets on ducts and AC decks. Mesh grade follows the use, not a single catalogue SKU. Pandri and market-street homes often need street-side access planning. Naya Raipur flats are typically cleaner rectangular openings.";
    case "balcony-safety-nets":
      return "Balcony nets in Raipur are fitted to the existing railing line. Colony houses have mixed span widths; apartment blocks on VIP Road and Telibandha repeat similar sizes. The net is a closure, not a structural guardrail replacement.";
    case "pigeon-safety-nets":
      return "Pigeon pressure in Raipur shows up on AC outdoor units, water-tank platforms, and ledges around Pandri, Telibandha, and central markets. A pigeon net is the wrong product when the only problem is a parapet edge — that is a spike job. Duct and shaft openings are measured separately from balcony child nets.";
    case "bird-spikes":
      return "Bird spikes in Raipur are specified for parapets, signage, and AC hoods where pigeons land daily. They are not a balcony child-safety product. Market streets and lake-facing ledges at Telibandha collect droppings after the same roost pattern; the strip length follows the landing edge, not the floor area of the flat.";
    case "balcony-invisible-grills":
      return "Balcony-only grill work in Raipur is common on mid-rise flats where the window line is already shuttered. Cable spacing and channel type follow the railing height and the way the family uses the sit-out.";
    case "window-invisible-grills":
      return "Window grills in Raipur are often specified for children's rooms and stair-side openings on independent houses. The opening is usually a casement or slider, not a full balcony span.";
    default:
      return null;
  }
}

function explanationFor(service: SeoService, place: CgPlaceProfile, housing: PlaceHousing): string {
  const raipur = place.slug === "raipur" ? raipurExplanation(service) : null;
  if (raipur) return raipur;
  const serviceLower = service.name.toLowerCase();
  if (service.slug === "bird-spikes" || service.category === "Bird Control") {
    return `${service.name} in ${place.name} is specified for landing edges — parapets, AC hoods, signage, and tank platforms — not as a child balcony net. ${housing.climate}. ${place.localContext} Strip length follows the roost edge after a site look, not a flat square-foot guess.`;
  }
  if (service.category === "Grills") {
    return `${service.name} in ${place.name} is a measured SS cable line on an existing opening. ${housing.types[0]}. ${housing.access}. The grill is an added layer; it does not replace a sound railing. ${place.localContext}`;
  }
  if (service.category === "Nets") {
    return `${serviceLower} work in ${place.name} follows the opening use: child or pet closure, pigeon pressure, or terrace/duct debris. ${housing.climate}. Mesh and border are chosen after width, height, and fixing are measured. ${place.localContext}`;
  }
  return `${service.name} in ${place.name} is quoted after the opening is measured. ${place.localContext} ${housing.access}.`;
}

function applicationsFor(service: SeoService, place: CgPlaceProfile, housing: PlaceHousing): string[] {
  if (service.slug === "bird-spikes" || service.category === "Bird Control") {
    return [
      `Parapets and balcony walls on the ${place.name} housing mix (${housing.types[0]?.toLowerCase() ?? "local houses"})`,
      "AC outdoor units, water-tank platforms, and solar frames",
      place.slug === "raipur"
        ? "Shop canopies and beam lines in Pandri and other market streets"
        : "Shop canopies, signage, and beam lines in market streets",
      housing.types.some((item) => item.toLowerCase().includes("plant") || item.toLowerCase().includes("township"))
        ? "Township and plant-adjacent ledges where pigeons follow food waste"
        : "Independent-house sunshades and courtyard walls",
    ];
  }
  if (service.category === "Grills") {
    return [
      ...housing.types.slice(0, 2),
      "Windows used by children or pets",
      place.slug === "raipur"
        ? "Utility and staircase openings on independent houses in Civil Lines and Devendra Nagar"
        : "Utility and staircase openings",
    ];
  }
  if (service.category === "Nets") {
    return [
      `Balconies and windows in ${place.name}`,
      "Ducts, terraces, and sit-outs that need a mesh closure",
      place.slug === "raipur"
        ? "Pigeon pressure on AC decks around Telibandha, Pandri, and central Raipur"
        : "Pigeon pressure on ledges and AC decks",
      "Child or pet openings after a site measurement",
    ];
  }
  if (service.category === "Hangers") {
    return [`Utility balconies and drying courts in ${place.name}`, "Ceiling pulley lines in apartments", "Wall-mounted rods where the slab is not suitable"];
  }
  if (service.category === "Screens" || service.category === "Doors") {
    return [`Balconies and patios in ${place.name}`, "Monsoon and dust control on sitting openings", "Shopfront and office entries that need a mesh door"];
  }
  if (service.category === "Sports" || service.category === "Turf") {
    return [`Terrace and school practice areas in ${place.name}`, "Box-cricket and coaching cages", "Boundary nets where balls must stay on site"];
  }
  return [`Measured openings on homes and commercial buildings in ${place.name}`];
}

function problemsFor(service: SeoService, place: CgPlaceProfile, housing: PlaceHousing): string[] {
  if (service.slug === "bird-spikes") {
    return [
      `Pigeons using the same ledge every day in ${place.name}`,
      "Droppings on balconies, parked vehicles, and shop fronts",
      "Nests on AC units and water tanks that return after cleaning",
      "A balcony net is the wrong product when the problem is only the parapet edge",
    ];
  }
  if (place.slug === "raipur") {
    return [
      `Openings in Raipur that need a measured ${service.name.toLowerCase()} fit rather than a catalogue size`,
      "Society facade rules on VIP Road and Naya Raipur sectors that limit bulky replacements",
      housing.climate,
      "Floor access, lift bookings, and mixed railing types across older colonies and newer sectors",
    ];
  }
  return [
    `Openings in ${place.name} that need a measured ${service.name.toLowerCase()} fit`,
    "Society or facade rules that limit bulky replacements",
    housing.climate,
    housing.access,
  ];
}

function benefitsFor(service: SeoService, place: CgPlaceProfile): string[] {
  const name = service.name.toLowerCase();
  if (place.slug === "raipur") {
    return [
      `A specification written for the actual Raipur opening, not a copied city template`,
      `Materials chosen for ${name} after seeing the railing, slab, and exposure`,
      "One crew for survey and fitting across Raipur city and Naya Raipur",
      "A written quote after measurement — no published flat rate for Raipur",
    ];
  }
  return [
    `A ${name} specification that matches how buildings are used in ${place.name}`,
    "Survey and fitting by the same Chhattisgarh crew",
    "Written scope after width, height, and access are known",
    `${place.name} is a service area, not a claimed extra branch office`,
  ];
}

function relatedLinks(place: CgPlaceProfile, serviceSlug: string): { href: string; label: string }[] {
  const allowed = new Set(cityServiceSlugsForPlace(place.slug));
  const preferred = RELATED_FOR_SERVICE[serviceSlug] ?? ["invisible-grills", "safety-nets", "pigeon-safety-nets", "bird-spikes"];
  const links: { href: string; label: string }[] = [];
  for (const slug of preferred) {
    if (slug === serviceSlug || !allowed.has(slug)) continue;
    const item = getSeoService(slug);
    if (!item) continue;
    links.push({
      href: `/chhattisgarh/${place.slug}/${slug}`,
      label: `${item.name} in ${place.name}`,
    });
    if (links.length >= 4) break;
  }
  return links;
}

function nearbyServiceLinks(place: CgPlaceProfile, serviceSlug: string, intent: LocalIntent): { href: string; label: string }[] {
  const suffix = intent === "near-me" ? `/${nearMeSlug(serviceSlug)}` : `/${serviceSlug}`;
  return place.nearby
    .map((slug) => CG_PRIORITY_PLACES.find((item) => item.slug === slug))
    .filter((item): item is CgPlaceProfile => Boolean(item))
    .slice(0, 3)
    .map((item) => ({
      href: `/chhattisgarh/${item.slug}${suffix}`,
      label: `${getSeoService(serviceSlug)?.name ?? "Service"} in ${item.name}`,
    }));
}

export function buildLocalLandingCopy(
  place: CgPlaceProfile,
  service: SeoService,
  intent: LocalIntent,
): LocalLandingCopy {
  const composed = composeServicePage(place, service, intent);
  const detail = getServiceDetail(service.slug);
  const district = getDistrictForCity(place.slug);
  const housing = housingFor(place);
  const applications = applicationsFor(service, place, housing);
  const problems = problemsFor(service, place, housing);
  const localities = getIndexableLocalitiesForCity(place.slug);

  return {
    path: composed.path,
    title: composed.title,
    h1: composed.h1,
    description: composed.description,
    intro: composed.intro,
    explanation: composed.explanation,
    propertyTypes: housing.types,
    problems,
    applications,
    benefits: benefitsFor(service, place),
    install: composed.sections
      .flatMap((section) => section.paragraphs)
      .slice(0, 2)
      .join(" "),
    serviceArea: `${place.localContext} ${district?.name ?? "Chhattisgarh"} district. Specification stays on the technical sections above. ${detail.installSteps[0]?.title ?? "Measurement"} comes before any quote.`,
    faqs: composed.faqs,
    relatedServices: relatedLinks(place, service.slug),
    nearbyPlaces: [],
    localityLinks: localities.slice(0, 6).map((area) => ({
      href: `/chhattisgarh/${place.slug}/areas/${area.slug}`,
      label: area.name,
    })),
    cta: `Send the opening size, the floor, and a photo of the fixing edge in ${place.name}. The written quote follows a measurement.`,
    sections: composed.sections,
    sources: composed.sources,
    checklist: composed.checklist,
    contentAngle: composed.contentAngle,
  };
}

export function getCgPlaceOrThrow(slug: string): CgPlaceProfile {
  const place = getCgPlace(slug);
  if (!place) {
    throw new Error(`Unknown served place: ${slug}`);
  }
  return place;
}
