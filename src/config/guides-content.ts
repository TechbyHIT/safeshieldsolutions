import { routes } from "./routes";
import {
  HOME_CITIES,
  HOME_CITY_AREAS,
  HOME_TOP_SERVICES,
  HOME_PRIMARY_INTENTS,
} from "./home-seo-links";

export interface GuideArticle {
  slug: string;
  title: string;
  summary: string;
  serviceSlug: string;
  keywords: string[];
}

export const guideArticles: GuideArticle[] = [
  {
    slug: "invisible-grills-near-me-guide",
    title: "Invisible Grills Near Me — Complete Buying Guide",
    summary:
      "How to compare premium SS304 invisible grills, cable spacing, society rules, and installation quotes in your city.",
    serviceSlug: "invisible-grills",
    keywords: ["invisible grills near me", "premium invisible grills", "SS304 installation"],
  },
  {
    slug: "balcony-safety-nets-price-guide",
    title: "Balcony Safety Nets Price Guide — What Affects Your Quote",
    summary:
      "Understand mesh grade, access, floor height, and scope items before comparing safety net dealers near you.",
    serviceSlug: "safety-nets",
    keywords: ["safety nets near me", "balcony safety nets price", "safety net dealers"],
  },
  {
    slug: "pigeon-net-installation-checklist",
    title: "Pigeon Net Installation Checklist for Apartments",
    summary:
      "Duct areas, balcony gaps, ledges, and shaft openings — what to measure before bird net fitting.",
    serviceSlug: "pigeon-safety-nets",
    keywords: ["pigeon nets near me", "pigeon net installation", "anti bird nets"],
  },
  {
    slug: "child-safety-grills-high-rise",
    title: "Child Safety Grills for High-Rise Balconies & Windows",
    summary:
      "Spacing, openable sections, harness rules, and invisible grill vs safety net decisions for families.",
    serviceSlug: "child-safety-grills",
    keywords: ["child safety grills near me", "best child safety grills", "balcony child safety"],
  },
  {
    slug: "mosquito-nets-types-comparison",
    title: "Mosquito Net Types — Frameless vs Sliding vs Openable",
    summary:
      "Compare airflow, cleaning access, and price for window and balcony door mosquito protection.",
    serviceSlug: "mosquito-nets",
    keywords: ["mosquito nets near me", "mosquito net price", "sliding mosquito nets"],
  },
  {
    slug: "cloth-hangers-ceiling-vs-balcony",
    title: "Ceiling vs Balcony Cloth Hangers — Space-Saving Drying",
    summary:
      "Pulley systems, SS304 rods, and society-friendly drying setups for Chennai, Hyderabad, Coimbatore & Kochi.",
    serviceSlug: "cloth-hangers",
    keywords: ["cloth hangers near me", "ceiling cloth hangers", "pulley cloth hangers"],
  },
  {
    slug: "cricket-practice-nets-terrace",
    title: "Cricket Practice Nets for Home Terraces & Academies",
    summary:
      "Contain balls, protect neighbours, and size knotless sports nets for regular batting practice.",
    serviceSlug: "cricket-nets",
    keywords: ["cricket nets near me", "sports nets installation", "terrace cricket nets"],
  },
  {
    slug: "bird-spikes-vs-bird-nets",
    title: "Bird Spikes vs Bird Nets — When to Use Each",
    summary:
      "Ledges and AC ducts vs full openings — humane bird control options for coastal and urban homes.",
    serviceSlug: "bird-spikes",
    keywords: ["bird spikes near me", "bird protection nets", "pigeon spikes installation"],
  },
  {
    slug: "cricket-box-grass-price-guide",
    title: "Cricket Box Grass Price Guide — Indoor vs Outdoor Turf",
    summary:
      "Compare pile height, infill type, base preparation, and sq ft rates for box cricket courts and academies.",
    serviceSlug: "cricket-box-grass",
    keywords: ["cricket box grass near me", "box cricket turf price per sq ft", "artificial grass for box cricket"],
  },
  {
    slug: "zip-screens-balcony-guide",
    title: "Zip Screens for Balconies — Weather & Insect Protection",
    summary:
      "Manual vs motorized zip screens, wind resistance, transparent vs mesh grades, and cost per sq ft.",
    serviceSlug: "zip-screens",
    keywords: ["zip screens near me", "balcony zip screens", "zip screen cost per sq ft"],
  },
  {
    slug: "motorized-zip-screens-automation",
    title: "Motorized Zip Screens — Motors, Smart Home & Maintenance",
    summary:
      "Electric zip screens, remote control, automation service, and motor sizing for wide openings.",
    serviceSlug: "motorized-zip-screens",
    keywords: ["motorized zip screens near me", "automatic zip screens", "electric zip screens price"],
  },
  {
    slug: "mesh-doors-mosquito-guide",
    title: "Mesh Doors for Mosquito & Insect Protection",
    summary:
      "Aluminium vs SS mesh, magnetic vs hinged, pet-friendly options, and main door mesh sizing.",
    serviceSlug: "mesh-doors",
    keywords: ["mesh doors near me", "mosquito mesh doors", "mesh door price"],
  },
  {
    slug: "sliding-mesh-doors-space-saving",
    title: "Sliding Mesh Doors — Balcony & Patio Openings",
    summary:
      "Double sliding mesh doors, track installation, repair vs replacement, and patio applications.",
    serviceSlug: "sliding-mesh-doors",
    keywords: ["sliding mesh doors near me", "sliding mosquito mesh doors", "balcony sliding mesh doors"],
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

export function guideAreaLinks(article: GuideArticle, limit = 16) {
  const links: { href: string; label: string }[] = [];
  for (const city of HOME_CITIES) {
    const areas = HOME_CITY_AREAS[city.slug]?.slice(0, 4) ?? [];
    for (const area of areas) {
      for (const intent of HOME_PRIMARY_INTENTS.slice(0, 3)) {
        if (links.length >= limit) return links;
        links.push({
          href: routes.areaService(city.slug, area.slug, `${article.serviceSlug}${intent.suffix}`),
          label: `${article.serviceSlug.replace(/-/g, " ")} ${intent.keyword} · ${area.name}, ${city.name}`,
        });
      }
    }
  }
  return links;
}

export function blogRelatedLinks(post: BlogPost) {
  const intents = ["", "-near-me", "-installation", "-price", "-dealers", "-best"];
  return intents.map((suffix) => ({
    href: routes.areaService(post.citySlug, post.areaSlug, `${post.serviceSlug}${suffix}`),
    label: `${post.serviceSlug.replace(/-/g, " ")}${suffix.replace(/-/g, " ")} in ${post.areaSlug.replace(/-/g, " ")}`,
  }));
}

export function allGuideServiceLinks() {
  return HOME_TOP_SERVICES.flatMap((svc) =>
    HOME_CITIES.map((city) => ({
      href: routes.cityService(city.slug, `${svc.slug}-near-me`),
      label: `${svc.name} near me in ${city.name}`,
    })),
  );
}
