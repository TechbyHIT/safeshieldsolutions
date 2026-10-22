import { raipurListingRank } from "@/config/chhattisgarh-zones";
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
  summary: string;
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
  {
    slug: "raipur",
    name: "Raipur",
    summary:
      "Raipur district covers the state capital, Naya Raipur sector housing, and the ring of towns on the Raipur belt. Apartment balconies, independent houses, and commercial ledges are the usual openings.",
  },
  {
    slug: "durg",
    name: "Durg",
    summary:
      "Durg district includes Durg town and the Bhilai steel township. Housing is a mix of planned sectors, colony houses, and newer apartments along the twin-city corridor.",
  },
  {
    slug: "rajnandgaon",
    name: "Rajnandgaon",
    summary:
      "Rajnandgaon district sits west of Durg. Work here is mostly town-centre houses, shop-top homes, and a smaller apartment stock than Raipur.",
  },
  {
    slug: "dhamtari",
    name: "Dhamtari",
    summary:
      "Dhamtari district lies south of Raipur toward the Mahanadi basin. Openings are typically house balconies, windows, and market-street ledges rather than high-rise podiums.",
  },
  {
    slug: "mahasamund",
    name: "Mahasamund",
    summary:
      "Mahasamund district is east of Raipur. Homes are plotted streets and low-rise flats; bird control on ledges and nets on sitting balconies are the usual requests.",
  },
  {
    slug: "balodabazar-bhatapara",
    name: "Balodabazar-Bhatapara",
    summary:
      "This district sits on the Raipur–Bilaspur route. Bhatapara and Baloda Bazar have municipal housing, shopfronts, and independent houses along the railway and highway.",
  },
  {
    slug: "bilaspur",
    name: "Bilaspur",
    summary:
      "Bilaspur district is a railway and court city. Apartments and independent houses around Sarkanda, Torwa, and the station side generate balcony, net, and bird-control jobs.",
  },
  {
    slug: "janjgir-champa",
    name: "Janjgir-Champa",
    summary:
      "Janjgir-Champa sits between Bilaspur and the eastern industrial belt. Town housing in Janjgir and Champa is mostly plotted houses and low-rise flats.",
  },
  {
    slug: "korba",
    name: "Korba",
    summary:
      "Korba district is an industrial power and mining belt. Township and plant-adjacent houses need corrosion-aware materials on balconies, ducts, and ledges.",
  },
  {
    slug: "raigarh",
    name: "Raigarh",
    summary:
      "Raigarh district in eastern Chhattisgarh has town housing and plant-adjacent colonies. Openings are similar to other industrial district towns: balconies, windows, and parapets.",
  },
  {
    slug: "bastar",
    name: "Bastar",
    summary:
      "Bastar district is served from Jagdalpur. Housing is independent homes and a smaller apartment stock than the Raipur belt.",
  },
  {
    slug: "surguja",
    name: "Surguja",
    summary:
      "Surguja district is served from Ambikapur in northern Chhattisgarh. Work is district-town houses, shopfronts, and low-rise flats.",
  },
  {
    slug: "kabirdham",
    name: "Kabirdham",
    summary:
      "Kabirdham district is served from Kawardha in western Chhattisgarh. Openings are town houses, shop ledges, and a limited apartment stock.",
  },
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
  "balcony-safety-nets",
  "pigeon-safety-nets",
  "bird-spikes",
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
      "Pandri is a busy central Raipur locality with market streets and residences behind them. Openings are a mix of shop-top homes and apartment balconies, so access from the street side and society timing matter as much as the opening size.",
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
    slug: "samta-colony",
    name: "Samta Colony",
    citySlug: "raipur",
    districtSlug: "raipur",
    serviceAvailable: true,
    indexable: true,
    nearby: ["shankar-nagar", "devendra-nagar", "civil-lines-raipur"],
    localContent:
      "Samta Colony is a compact residential pocket in central Raipur, with older plotted houses and later walk-up apartments. Openings are usually shallow front balconies and street-facing windows, so access is from the house side rather than a high-rise podium.",
  },
  {
    slug: "avanti-vihar",
    name: "Avanti Vihar",
    citySlug: "raipur",
    districtSlug: "raipur",
    serviceAvailable: true,
    indexable: true,
    nearby: ["telibandha", "shankar-nagar"],
    localContent:
      "Avanti Vihar sits on the Telibandha side of Raipur, with independent houses and mid-rise apartments around the lake belt. Balcony work here often faces open sky and wind, so cable tension and net edge sealing are checked on site rather than copied from an inner-city house.",
  },
  {
    slug: "gudhiyari",
    name: "Gudhiyari",
    citySlug: "raipur",
    districtSlug: "raipur",
    serviceAvailable: true,
    indexable: true,
    nearby: ["pandri", "fafadih"],
    localContent:
      "Gudhiyari is an older mixed residential and market locality in Raipur. Many openings are shop-top homes and narrow balcony rails on busy streets, so daytime access and fixing into existing masonry matter as much as the measured width.",
  },
  {
    slug: "fafadih",
    name: "Fafadih",
    citySlug: "raipur",
    districtSlug: "raipur",
    serviceAvailable: true,
    indexable: true,
    nearby: ["gudhiyari", "pandri"],
    localContent:
      "Fafadih lies on the eastern side of Raipur, with industrial-adjacent housing and independent houses on inner lanes. Jobs are typically house balconies and parapets rather than tower podiums, and fixing surfaces are often older brick or plastered RCC.",
  },
  {
    slug: "amanaka",
    name: "Amanaka",
    citySlug: "raipur",
    districtSlug: "raipur",
    serviceAvailable: true,
    indexable: true,
    nearby: ["tatibandh", "kota-raipur"],
    localContent:
      "Amanaka is on the western education and hospital belt of Raipur, near the medical-college side of the city. Housing mixes student apartments, staff quarters, and independent houses, so balcony sizes repeat on some blocks and vary on others.",
  },
  {
    slug: "mowa",
    name: "Mowa",
    citySlug: "raipur",
    districtSlug: "raipur",
    serviceAvailable: true,
    indexable: true,
    nearby: ["kachna", "saddu"],
    localContent:
      "Mowa is a northern Raipur locality with newer plotted colonies and a growing stock of low-rise apartments. Openings are usually rear and side balconies on houses still being finished, so the survey notes plaster, railing type, and whether the slab edge is ready for anchors.",
  },
  {
    slug: "kachna",
    name: "Kachna",
    citySlug: "raipur",
    districtSlug: "raipur",
    serviceAvailable: true,
    indexable: true,
    nearby: ["mowa", "saddu"],
    localContent:
      "Kachna sits in north-east Raipur, with plotted residential streets and a smaller apartment stock than VIP Road. Work is mostly house balconies, terrace sit-outs, and window lines on boundary-facing rooms rather than high-rise ducts.",
  },
  {
    slug: "saddu",
    name: "Saddu",
    citySlug: "raipur",
    districtSlug: "raipur",
    serviceAvailable: true,
    indexable: true,
    nearby: ["mowa", "kachna"],
    localContent:
      "Saddu is on the northern highway approach to Raipur, with mixed housing along the main road and quieter inner plots. Balcony and terrace jobs here often need a note on road noise, dust, and whether the opening faces the highway or the colony lane.",
  },
  {
    slug: "kota-raipur",
    name: "Kota",
    citySlug: "raipur",
    districtSlug: "raipur",
    serviceAvailable: true,
    indexable: true,
    nearby: ["amanaka", "tatibandh"],
    localContent:
      "Kota is a western Raipur residential area, inland from the Tatibandh medical-college belt. Housing is mostly independent houses and small apartment buildings; openings are balcony rails and windows rather than podium towers.",
  },
  {
    slug: "sejbahar",
    name: "Sejbahar",
    citySlug: "raipur",
    districtSlug: "raipur",
    serviceAvailable: true,
    indexable: true,
    nearby: ["labhandi", "amanaka"],
    localContent:
      "Sejbahar lies on the south-western edge of Raipur, with newer residential pockets and remaining open plots. Jobs are house balconies and terrace edges on buildings that are still filling in, so access and unfinished parapets are checked before a date is set.",
  },
  {
    slug: "labhandi",
    name: "Labhandi",
    citySlug: "raipur",
    districtSlug: "raipur",
    serviceAvailable: true,
    indexable: true,
    nearby: ["sejbahar", "amanaka"],
    localContent:
      "Labhandi is known for the agricultural-university side of Raipur. Housing includes staff quarters, student hostels, and nearby independent houses. Openings are repeating balcony sizes on campus blocks plus one-off house rails on the approach roads.",
  },
  {
    slug: "pachpedi-naka",
    name: "Pachpedi Naka",
    citySlug: "raipur",
    districtSlug: "raipur",
    serviceAvailable: true,
    indexable: true,
    nearby: ["gudhiyari", "pandri"],
    localContent:
      "Pachpedi Naka is a major junction locality in Raipur, with commercial frontage and residences behind the main roads. Work is often on flats above shops and on house balconies one street in, so society or shop-timing rules affect when a crew can set anchors.",
  },
  {
    slug: "tikrapara",
    name: "Tikrapara",
    citySlug: "raipur",
    districtSlug: "raipur",
    serviceAvailable: true,
    indexable: true,
    nearby: ["dangania", "gudhiyari"],
    localContent:
      "Tikrapara is an older inner-city Raipur neighbourhood with dense plotted streets. Balconies are typically shallow, and neighbouring walls sit close, so the survey records swing space, shared walls, and whether a net or grill must stay inside the existing railing line.",
  },
  {
    slug: "dangania",
    name: "Dangania",
    citySlug: "raipur",
    districtSlug: "raipur",
    serviceAvailable: true,
    indexable: true,
    nearby: ["tikrapara", "pandri"],
    localContent:
      "Dangania sits toward the railway side of central Raipur, with older houses and mixed commercial streets. Openings are house balconies, courtyard sides, and windows on plots that were not built as apartment towers.",
  },
  {
    slug: "birgaon",
    name: "Birgaon",
    citySlug: "raipur",
    districtSlug: "raipur",
    serviceAvailable: true,
    indexable: true,
    nearby: ["saddu", "mowa"],
    localContent:
      "Birgaon is the industrial municipal area on the northern edge of Raipur. Housing is colony quarters and independent houses near plant and warehouse belts. Corrosion and dust exposure are noted on the quote when the opening faces the industrial side.",
  },
  {
    slug: "mandir-hasaud",
    name: "Mandir Hasaud",
    citySlug: "raipur",
    districtSlug: "raipur",
    serviceAvailable: true,
    indexable: true,
    nearby: ["naya-raipur", "sejbahar"],
    localContent:
      "Mandir Hasaud sits on the Raipur–Naya Raipur approach, with highway-side houses and newer residential pockets. Jobs are typically independent-house balconies and terrace sit-outs rather than Naya Raipur sector towers, so access is from the plot rather than a society lift.",
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
      "Torwa is a residential locality in Bilaspur. Openings are typically house balconies and windows on plotted streets, not large podium towers. Fixing is usually into existing concrete or older railing lines on independent houses.",
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
  return getLocalitiesForCity(citySlug)
    .filter((area) => area.indexable && area.localContent.length >= 160)
    .sort((a, b) => raipurListingRank(a.slug) - raipurListingRank(b.slug) || a.name.localeCompare(b.name));
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
