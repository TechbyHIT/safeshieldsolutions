import { routes } from "./routes";
import {
  HOME_CITIES,
  HOME_CITY_AREAS,
  HOME_TOP_SERVICES,
} from "./home-seo-links";
import { filterIndexableLinks } from "@/lib/indexable-href";
import { getSeoService } from "@/data/seo-services";

export interface GuideArticle {
  slug: string;
  title: string;
  summary: string;
  serviceSlug: string;
  keywords: string[];
  /** Other catalogue services this guide should link from. */
  relatedServiceSlugs?: string[];
  intent?: "transactional" | "commercial" | "informational" | "local";
  sections?: { heading: string; body: string }[];
}

export const guideArticles: GuideArticle[] = [
  {
    slug: "invisible-grills-near-me-guide",
    title: "How to Compare Invisible Grill Quotes",
    summary:
      "How to compare premium SS304 invisible grills, cable spacing, society rules, and installation quotes in your city.",
    serviceSlug: "invisible-grills",
    keywords: ["how to compare invisible grill quotes", "invisible grill buying guide", "SS304 cable spacing guide"],
  },
  {
    slug: "balcony-safety-nets-price-guide",
    title: "Balcony Safety Nets Price Guide — What Affects Your Quote",
    summary:
      "Understand mesh grade, access, floor height, and scope items before comparing safety net dealers near you.",
    serviceSlug: "safety-nets",
    keywords: ["how balcony safety net quotes are calculated", "balcony safety net buying guide", "what changes a balcony net quote"],
  },
  {
    slug: "pigeon-net-installation-checklist",
    title: "Pigeon Net Installation Checklist for Apartments",
    summary:
      "Duct areas, balcony gaps, ledges, and shaft openings — what to measure before bird net fitting.",
    serviceSlug: "pigeon-safety-nets",
    keywords: ["pigeon net installation checklist", "what to measure before pigeon net fitting", "pigeon net apartment guide"],
  },
  {
    slug: "child-safety-grills-high-rise",
    title: "Child Safety Grills for High-Rise Balconies & Windows",
    summary:
      "Spacing, openable sections, harness rules, and invisible grill vs safety net decisions for families.",
    serviceSlug: "child-safety-grills",
    keywords: ["child safety grill buying guide", "how to choose balcony child protection", "high-rise grill checklist"],
  },
  {
    slug: "mosquito-nets-types-comparison",
    title: "Mosquito Net Types — Frameless vs Sliding vs Openable",
    summary:
      "Compare airflow, cleaning access, and price for window and balcony door mosquito protection.",
    serviceSlug: "mosquito-nets",
    keywords: ["mosquito net types guide", "frameless vs sliding mosquito nets", "how to compare mosquito nets"],
  },
  {
    slug: "cloth-hangers-ceiling-vs-balcony",
    title: "Ceiling vs Balcony Cloth Hangers — Space-Saving Drying",
    summary:
      "Pulley systems, SS304 rods, and society-friendly drying setups for Raipur, Bhilai, Bilaspur, and other Chhattisgarh towns.",
    serviceSlug: "cloth-hangers",
    keywords: ["ceiling vs balcony cloth hangers", "cloth hanger buying guide", "pulley cloth hanger checklist"],
  },
  {
    slug: "cricket-practice-nets-terrace",
    title: "Cricket Practice Nets for Home Terraces & Academies",
    summary:
      "Contain balls, protect neighbours, and size knotless sports nets for regular batting practice.",
    serviceSlug: "cricket-nets",
    keywords: ["cricket practice net guide", "terrace cricket net checklist", "how to size cricket nets"],
  },
  {
    slug: "bird-spikes-vs-bird-nets",
    title: "Bird Spikes vs Bird Nets — When to Use Each",
    summary:
      "Ledges and AC ducts vs full openings — humane bird control options for apartments and urban homes.",
    serviceSlug: "bird-spikes",
    keywords: ["bird spikes vs bird nets", "when to use bird spikes", "bird control buying guide"],
  },
  {
    slug: "cricket-box-grass-price-guide",
    title: "Cricket Box Grass Price Guide — Indoor vs Outdoor Turf",
    summary:
      "Compare pile height, infill type, base preparation, and sq ft rates for box cricket courts and academies.",
    serviceSlug: "cricket-box-grass",
    keywords: ["how box cricket turf quotes work", "cricket box grass buying guide", "indoor vs outdoor box cricket turf"],
  },
  {
    slug: "zip-screens-balcony-guide",
    title: "Zip Screens for Balconies — Weather & Insect Protection",
    summary:
      "Manual vs motorized zip screens, wind resistance, transparent vs mesh grades, and cost per sq ft.",
    serviceSlug: "zip-screens",
    keywords: ["zip screen buying guide", "how zip screens work on balconies", "zip screen checklist"],
  },
  {
    slug: "motorized-zip-screens-automation",
    title: "Motorized Zip Screens — Motors, Smart Home & Maintenance",
    summary:
      "Electric zip screens, remote control, automation service, and motor sizing for wide openings.",
    serviceSlug: "motorized-zip-screens",
    keywords: ["motorized zip screen guide", "how automatic zip screens work", "zip screen motor checklist"],
  },
  {
    slug: "mesh-doors-mosquito-guide",
    title: "Mesh Doors for Mosquito & Insect Protection",
    summary:
      "Aluminium vs SS mesh, magnetic vs hinged, pet-friendly options, and main door mesh sizing.",
    serviceSlug: "mesh-doors",
    keywords: ["mesh door buying guide", "how to choose a mosquito mesh door", "mesh door checklist"],
  },
  {
    slug: "sliding-mesh-doors-space-saving",
    title: "Sliding Mesh Doors — Balcony & Patio Openings",
    summary:
      "Double sliding mesh doors, track installation, repair vs replacement, and patio applications.",
    serviceSlug: "sliding-mesh-doors",
    keywords: ["sliding mesh door guide", "how sliding mesh doors are measured", "patio mesh door checklist"],
  },
  {
    slug: "ss304-vs-ss316-invisible-grills",
    title: "SS304 vs SS316 for Invisible Grills",
    summary:
      "SS304 is the standard cable for most Raipur balconies. SS316 is specified only where pool splash or constant damp raises corrosion risk.",
    serviceSlug: "invisible-grills",
    relatedServiceSlugs: ["balcony-invisible-grills", "window-invisible-grills", "stainless-steel-invisible-grills"],
    intent: "commercial",
    keywords: ["SS304 vs SS316 invisible grill", "invisible grill steel grade", "which steel for a balcony grill"],
    sections: [
      {
        heading: "Which grade we fit by default",
        body: "For inland Raipur apartments we specify SS304 cable unless the opening stays wet. The grade is written on the quote after the survey, with the cable diameter and spacing. We do not sell SS316 as the default for every balcony.",
      },
      {
        heading: "When SS316 is the better specification",
        body: "SS316 costs more and is worth it beside a pool, on a splash-facing edge, or where the cables stay damp. A dry living-room balcony does not need it. The survey checks exposure before the grade is named.",
      },
      {
        heading: "What else changes the quote",
        body: "Grade is one line on the quote. Width, height, floor access, channel type, and openable sections change the figure as well. There is no single rate per square foot that fits every opening.",
      },
    ],
  },
  {
    slug: "safety-net-vs-invisible-grill",
    title: "Balcony Safety Net or Invisible Grill",
    summary:
      "A safety net closes a fall-risk opening with mesh. An invisible grill uses slim steel cables when the view matters more than a soft edge.",
    serviceSlug: "balcony-safety-nets",
    relatedServiceSlugs: ["safety-nets", "invisible-grills", "balcony-invisible-grills", "child-safety-nets"],
    intent: "commercial",
    keywords: ["balcony safety net vs invisible grill", "net or grill for a balcony", "which balcony protection to choose"],
    sections: [
      {
        heading: "Choose the net when the job is a fall",
        body: "Balcony and child safety nets suit openings where children or pets use the edge every day. The mesh is visible. It is an added layer and does not replace a sound railing or adult supervision.",
      },
      {
        heading: "Choose the grill when the view is the priority",
        body: "Invisible grills use vertical SS304 cables in fixed channels. They keep more of the outlook than a mesh net. Corners, AC cut-outs, and the fixing surface still have to be measured.",
      },
      {
        heading: "You can need both",
        body: "A pigeon problem and a fall-risk opening are different jobs. A bird net does not take a child-fall load, and a grill does not stop nesting in a duct. We name the system after seeing the opening.",
      },
    ],
  },
  {
    slug: "how-to-keep-pigeons-off-a-balcony",
    title: "How to Keep Pigeons Off a Balcony",
    summary:
      "A full-opening pigeon net stops nesting on ledges and ducts. Spikes suit a narrow ledge. Neither one is a fall-protection net.",
    serviceSlug: "pigeon-safety-nets",
    relatedServiceSlugs: ["bird-protection-nets", "bird-spikes", "sparrow-protection-nets"],
    intent: "informational",
    keywords: ["how to keep pigeons off a balcony", "pigeon net or bird spikes", "balcony bird control"],
    sections: [
      {
        heading: "Close the opening they use",
        body: "Pigeons return to the same ledge, duct, or shaft. A pigeon net is planned around those entry points, not hung as a loose curtain. Send one wide photo and one close photo of the gap before the visit.",
      },
      {
        heading: "Spikes are for a narrow perch",
        body: "Bird spikes discourage perching on a parapet, AC ledge, or sign band. They do not cover a balcony opening. If birds are entering the flat, a net is the usual fit.",
      },
      {
        heading: "Small birds need a finer mesh",
        body: "Sparrows and mynas can pass through standard pigeon mesh. If those birds are still getting in after a pigeon net, a finer sparrow mesh is a separate specification.",
      },
    ],
  },
];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  citySlug: string;
  areaSlug: string;
  serviceSlug: string;
  date: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "premium-invisible-grills-gachibowli",
    title: "Premium Invisible Grills in Gachibowli — IT Corridor Install Tips",
    excerpt: "SS304 spacing and society NOC patterns for Financial District adjacent towers.",
    citySlug: "hyderabad",
    areaSlug: "gachibowli",
    serviceSlug: "invisible-grills",
    date: "2026-07-15",
  },
  {
    slug: "pigeon-nets-kakkanad-apartments",
    title: "Pigeon Nets for Kakkanad Apartments — Coastal Humidity & Mesh Choice",
    excerpt: "Why knotless GSM and edge sealing matter near Infopark high-rises.",
    citySlug: "kochi",
    areaSlug: "kakkanad",
    serviceSlug: "pigeon-safety-nets",
    date: "2026-07-12",
  },
  {
    slug: "safety-nets-peelamedu-family-homes",
    title: "Balcony Safety Nets in Peelamedu — Family & Pet Use Cases",
    excerpt: "Measuring rail gaps and choosing fall-risk vs bird-control specifications.",
    citySlug: "coimbatore",
    areaSlug: "peelamedu",
    serviceSlug: "safety-nets",
    date: "2026-07-10",
  },
  {
    slug: "invisible-grills-adyar-sea-facing",
    title: "Invisible Grills on Adyar Sea-Facing Balconies — Salt Air & SS304",
    excerpt: "Material grades and maintenance for coastal exposure on OMR corridor homes.",
    citySlug: "chennai",
    areaSlug: "adyar",
    serviceSlug: "invisible-grills",
    date: "2026-07-08",
  },
  {
    slug: "cloth-hangers-edappally-flats",
    title: "Ceiling Cloth Hangers in Edappally Flats — Pulley vs Fixed Rods",
    excerpt: "Space-saving laundry drying without blocking balcony views.",
    citySlug: "kochi",
    areaSlug: "edappally",
    serviceSlug: "cloth-hangers",
    date: "2026-07-05",
  },
  {
    slug: "mosquito-nets-anna-nagar-windows",
    title: "Mosquito Nets for Anna Nagar Windows — Monsoon Ventilation",
    excerpt: "Frameless vs openable systems for year-round insect protection.",
    citySlug: "chennai",
    areaSlug: "anna-nagar",
    serviceSlug: "mosquito-nets",
    date: "2026-07-01",
  },
  {
    slug: "cricket-nets-saravanampatti-terraces",
    title: "Cricket Nets on Saravanampatti Terraces — Safe Home Practice",
    excerpt: "Ball containment and neighbour-friendly sports net sizing.",
    citySlug: "coimbatore",
    areaSlug: "saravanampatti",
    serviceSlug: "cricket-nets",
    date: "2026-06-28",
  },
  {
    slug: "bird-spikes-fort-kochi-heritage",
    title: "Bird Spikes in Fort Kochi Heritage Buildings — Low-Profile Fixes",
    excerpt: "Narrow ledges, duct corners, and aesthetic constraints near the waterfront.",
    citySlug: "kochi",
    areaSlug: "fort-kochi",
    serviceSlug: "bird-spikes",
    date: "2026-06-25",
  },
  {
    slug: "cricket-box-grass-peelamedu-academy",
    title: "Cricket Box Grass in Peelamedu — Indoor Academy Turf Specs",
    excerpt: "Pile height, infill, and bounce planning for box cricket courts near the IT corridor.",
    citySlug: "coimbatore",
    areaSlug: "peelamedu",
    serviceSlug: "cricket-box-grass",
    date: "2026-07-20",
  },
  {
    slug: "zip-screens-kakkanad-balconies",
    title: "Zip Screens on Kakkanad Balconies — Rain & Dust Control",
    excerpt: "Track sealing and mesh grades for high-floor Infopark corridor apartments.",
    citySlug: "kochi",
    areaSlug: "kakkanad",
    serviceSlug: "zip-screens",
    date: "2026-07-18",
  },
  {
    slug: "mesh-doors-gachibowli-apartments",
    title: "Mesh Doors in Gachibowli — Pet-Friendly Main Door Options",
    excerpt: "Magnetic mesh vs sliding systems for busy apartment entrances.",
    citySlug: "hyderabad",
    areaSlug: "gachibowli",
    serviceSlug: "mesh-doors",
    date: "2026-07-16",
  },
];

export function guidesForService(serviceSlug: string): GuideArticle[] {
  return guideArticles.filter(
    (article) =>
      article.serviceSlug === serviceSlug || article.relatedServiceSlugs?.includes(serviceSlug),
  );
}

export function guideAreaLinks(article: GuideArticle, limit = 16) {
  const name = getSeoService(article.serviceSlug)?.name ?? article.serviceSlug.replace(/-/g, " ");
  const links: { href: string; label: string }[] = [];
  for (const city of HOME_CITIES) {
    const areas = HOME_CITY_AREAS[city.slug]?.slice(0, 8) ?? [];
    for (const area of areas) {
      links.push({
        href: routes.areaService(city.slug, area.slug, article.serviceSlug),
        label: `${name} in ${area.name}`,
      });
    }
  }
  const kept = filterIndexableLinks(links);
  if (kept.length > 0) return kept.slice(0, limit);
  return filterIndexableLinks([
    {
      href: `/chhattisgarh/raipur/${article.serviceSlug}`,
      label: `${article.serviceSlug.replace(/-/g, " ")} in Raipur`,
    },
  ]);
}

export function blogRelatedLinks(post: BlogPost) {
  const name = getSeoService(post.serviceSlug)?.name ?? post.serviceSlug.replace(/-/g, " ");
  return filterIndexableLinks([
    {
      href: `/chhattisgarh/raipur/${post.serviceSlug}`,
      label: `${name} in Raipur`,
    },
    {
      href: `/chhattisgarh/raipur/${post.serviceSlug}-near-me`,
      label: `${name} near me in Raipur`,
    },
    {
      href: `/services/${post.serviceSlug}`,
      label: name,
    },
  ]);
}

export function allGuideServiceLinks() {
  return filterIndexableLinks(
    HOME_TOP_SERVICES.map((svc) => ({
      href: `/chhattisgarh/raipur/${svc.slug}`,
      label: `${svc.name} in Raipur`,
    })),
  );
}
