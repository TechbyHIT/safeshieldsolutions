import { CG_PRIORITY_PLACES } from "@/data/cg-local-seo";

/**
 * Chhattisgarh location tree.
 * A locality is indexable only when serviceAvailable is true and localContent
 * is specific to that place. Other catalogue areas stay in the area list but
 * are not given commercial URLs.
 */

export interface CgDistrict {
  slug: string;
  name: string;
}

export interface CgLocality {
  slug: string;
  name: string;
  citySlug: string;
  districtSlug: string;
  serviceAvailable: boolean;
  /** Unique public context. Required before the page can be indexed. */
  localContent: string;
  nearby: string[];
  indexable: boolean;
}

export const CG_DISTRICTS: CgDistrict[] = [
  { slug: "raipur", name: "Raipur" },
  { slug: "durg", name: "Durg" },
  { slug: "rajnandgaon", name: "Rajnandgaon" },
  { slug: "dhamtari", name: "Dhamtari" },
  { slug: "mahasamund", name: "Mahasamund" },
  { slug: "balodabazar-bhatapara", name: "Balodabazar-Bhatapara" },
  { slug: "bilaspur", name: "Bilaspur" },
  { slug: "janjgir-champa", name: "Janjgir-Champa" },
  { slug: "korba", name: "Korba" },
  { slug: "raigarh", name: "Raigarh" },
  { slug: "bastar", name: "Bastar" },
  { slug: "surguja", name: "Surguja" },
  { slug: "kabirdham", name: "Kabirdham" },
];

export const CG_CITY_DISTRICT: Record<string, string> = {
  raipur: "raipur",
  bhilai: "durg",
  durg: "durg",
  rajnandgaon: "rajnandgaon",
  dhamtari: "dhamtari",
  mahasamund: "mahasamund",
  bhatapara: "balodabazar-bhatapara",
  "baloda-bazar": "balodabazar-bhatapara",
  bilaspur: "bilaspur",
  janjgir: "janjgir-champa",
  champa: "janjgir-champa",
  korba: "korba",
  raigarh: "raigarh",
  jagdalpur: "bastar",
  ambikapur: "surguja",
  kawardha: "kabirdham",
};

/** Services that can have their own locality URL. Other services stay on the city page. */
export const LOCALITY_SERVICE_SLUGS = [
  "invisible-grills",
  "safety-nets",
  "pigeon-safety-nets",
] as const;

export const CG_LOCALITIES: CgLocality[] = [
  {
    slug: "tatibandh",
    name: "Tatibandh",
    citySlug: "raipur",
    districtSlug: "raipur",
    serviceAvailable: true,
    indexable: true,
    nearby: ["shankar-nagar", "telibandha"],
    localContent:
      "Tatibandh sits on the western side of Raipur, around the medical-college and AIIMS Raipur belt. Housing is a mix of apartment blocks and independent houses along the main road and inner lanes. Balcony and window openings here are usually measured from inside the flat.",
  },
  {
    slug: "shankar-nagar",
    name: "Shankar Nagar",
    citySlug: "raipur",
    districtSlug: "raipur",
    serviceAvailable: true,
    indexable: true,
    nearby: ["tatibandh", "telibandha", "civil-lines-raipur"],
    localContent:
      "Shankar Nagar is an established residential colony in Raipur, with plotted houses and later apartment buildings. Many openings are balcony railings on low and mid-rise blocks rather than high-rise podiums.",
  },
  {
    slug: "telibandha",
    name: "Telibandha",
    citySlug: "raipur",
    districtSlug: "raipur",
    serviceAvailable: true,
    indexable: true,
    nearby: ["shankar-nagar", "tatibandh", "pandri"],
    localContent:
      "Telibandha is the lake-side residential pocket in Raipur. Homes face the water or the ring of roads around it, so balcony work has to account for wind, sun, and older railing lines as well as newer flats.",
  },
  {
    slug: "naya-raipur",
    name: "Naya Raipur",
    citySlug: "raipur",
    districtSlug: "raipur",
    serviceAvailable: true,
    indexable: true,
    nearby: ["atal-nagar", "raipur"],
    localContent:
      "Naya Raipur, also called Atal Nagar, is the planned city southeast of Raipur. Buildings are newer sector housing and apartments, with wider setbacks than the older Raipur colonies.",
  },
  {
    slug: "atal-nagar",
    name: "Atal Nagar",
    citySlug: "raipur",
    districtSlug: "raipur",
    serviceAvailable: true,
    indexable: false,
    nearby: ["naya-raipur"],
    localContent:
      "Atal Nagar is the official name used for Naya Raipur. The same planned sectors apply: newer apartments and plotted houses, not the dense older wards of Raipur city.",
  },
  {
    slug: "vip-road",
    name: "VIP Road",
    citySlug: "raipur",
    districtSlug: "raipur",
    serviceAvailable: true,
    indexable: true,
    nearby: ["devendra-nagar", "pandri"],
    localContent:
      "VIP Road is a main commercial and residential corridor in Raipur. Work here is often on apartment balconies above shops and offices, so access and society timing matter as much as the opening size.",
  },
  {
    slug: "civil-lines-raipur",
    name: "Civil Lines",
    citySlug: "raipur",
    districtSlug: "raipur",
    serviceAvailable: true,
    indexable: true,
    nearby: ["shankar-nagar", "devendra-nagar"],
    localContent:
      "Civil Lines is one of Raipur’s older planned residential areas, with independent houses and some rebuilt apartment plots. Fixing points are often existing concrete or older railings.",
  },
  {
    slug: "pandri",
    name: "Pandri",
    citySlug: "raipur",
    districtSlug: "raipur",
    serviceAvailable: true,
    indexable: true,
    nearby: ["telibandha", "vip-road"],
    localContent:
      "Pandri is a busy central Raipur locality with market streets and residences behind them. Openings are a mix of shop-top homes and apartment balconies.",
  },
  {
    slug: "devendra-nagar",
    name: "Devendra Nagar",
    citySlug: "raipur",
    districtSlug: "raipur",
    serviceAvailable: true,
    indexable: true,
    nearby: ["vip-road", "civil-lines-raipur"],
    localContent:
      "Devendra Nagar is a residential colony in Raipur, close to the VIP Road side of the city. Most jobs are balcony and window openings on houses and small apartment buildings.",
  },
  {
    slug: "nehru-nagar-bhilai",
    name: "Nehru Nagar",
    citySlug: "bhilai",
    districtSlug: "durg",
    serviceAvailable: true,
    indexable: true,
    nearby: ["supela", "civic-centre"],
    localContent:
      "Nehru Nagar is a residential sector in the Bhilai steel township. Housing is planned sector blocks: flats and quarters with repeating balcony sizes, plus some rebuilt private houses.",
  },
  {
    slug: "supela",
    name: "Supela",
    citySlug: "bhilai",
    districtSlug: "durg",
    serviceAvailable: true,
    indexable: true,
    nearby: ["nehru-nagar-bhilai", "civic-centre"],
    localContent:
      "Supela is on the Raipur side of Bhilai, with market roads and residential lanes behind them. Openings are mostly house balconies and low-rise flats rather than township high-rises.",
  },
  {
    slug: "civic-centre",
    name: "Civic Centre",
    citySlug: "bhilai",
    districtSlug: "durg",
    serviceAvailable: true,
    indexable: true,
    nearby: ["nehru-nagar-bhilai", "supela"],
    localContent:
      "Civic Centre is the central commercial and residential hub of Bhilai. Balcony work is often on flats above shops, with limited daytime access from the street side.",
  },
  {
    slug: "sarkanda",
    name: "Sarkanda",
    citySlug: "bilaspur",
    districtSlug: "bilaspur",
    serviceAvailable: true,
    indexable: true,
    nearby: ["torwa"],
    localContent:
      "Sarkanda is a residential area of Bilaspur, away from the railway-station core. Homes are independent houses and small apartment buildings with balcony and terrace openings.",
  },
  {
    slug: "torwa",
    name: "Torwa",
    citySlug: "bilaspur",
    districtSlug: "bilaspur",
    serviceAvailable: true,
    indexable: true,
    nearby: ["sarkanda"],
    localContent:
      "Torwa is a residential locality in Bilaspur. Openings are typically house balconies and windows on plotted streets, not large podium towers.",
  },
];

const LOCALITY_BY_KEY = new Map(
  CG_LOCALITIES.map((area) => [`${area.citySlug}/${area.slug}`, area]),
);

export function getDistrict(slug: string): CgDistrict | undefined {
  return CG_DISTRICTS.find((district) => district.slug === slug);
}

export function getDistrictForCity(citySlug: string): CgDistrict | undefined {
  const districtSlug = CG_CITY_DISTRICT[citySlug];
  return districtSlug ? getDistrict(districtSlug) : undefined;
}

export function getLocalitiesForCity(citySlug: string): CgLocality[] {
  return CG_LOCALITIES.filter((area) => area.citySlug === citySlug && area.serviceAvailable);
}

export function getIndexableLocalitiesForCity(citySlug: string): CgLocality[] {
  return getLocalitiesForCity(citySlug).filter((area) => area.indexable && area.localContent.length >= 160);
}

export function getLocality(citySlug: string, areaSlug: string): CgLocality | undefined {
  return LOCALITY_BY_KEY.get(`${citySlug}/${areaSlug}`);
}

export function isLocalityServiceIndexable(citySlug: string, areaSlug: string, serviceSlug: string): boolean {
  const area = getLocality(citySlug, areaSlug);
  if (!area?.serviceAvailable || !area.indexable || area.localContent.length < 160) return false;
  return LOCALITY_SERVICE_SLUGS.includes(serviceSlug as (typeof LOCALITY_SERVICE_SLUGS)[number]);
}

export function hierarchySummary() {
  const cities = CG_PRIORITY_PLACES.length;
  const localities = CG_LOCALITIES.filter((area) => area.serviceAvailable);
  const indexableLocalities = localities.filter((area) => area.indexable && area.localContent.length >= 160);
  return {
    districts: CG_DISTRICTS.length,
    cities,
    localities: localities.length,
    indexableLocalities: indexableLocalities.length,
    draftLocalities: localities.length - indexableLocalities.length,
  };
}
