/** Zone metadata for Chhattisgarh locality-specific SEO copy. */

import type { AreaZone } from "@/config/area-zones";

export const CHHATTISGARH_ZONES: Record<string, AreaZone> = {
  "raipur-belt": {
    id: "raipur-belt",
    label: "Raipur Belt",
    description:
      "The Raipur belt covers the state capital and adjoining districts with apartments, independent houses, and mixed commercial-residential buildings.",
    landmarks: ["Raipur", "Naya Raipur", "Dhamtari", "Mahasamund", "Baloda Bazar"],
    propertyTypes: ["apartments", "independent houses", "commercial fronts"],
  },
  "durg-bhilai": {
    id: "durg-bhilai",
    label: "Durg–Bhilai",
    description:
      "Durg and Bhilai form the industrial twin-city corridor with township housing, steel-plant adjacent colonies, and growing apartment stock.",
    landmarks: ["Bhilai", "Durg", "Rajnandgaon", "Balod"],
    propertyTypes: ["township flats", "colony houses", "apartment complexes"],
  },
  "bilaspur-belt": {
    id: "bilaspur-belt",
    label: "Bilaspur Belt",
    description:
      "The Bilaspur belt includes railway-town apartments, district headquarters housing, and mixed residential layouts across central Chhattisgarh.",
    landmarks: ["Bilaspur", "Mungeli", "Janjgir", "Champa", "Sakti"],
    propertyTypes: ["railway-town flats", "independent houses", "mid-rise apartments"],
  },
  "north-chhattisgarh": {
    id: "north-chhattisgarh",
    label: "North Chhattisgarh",
    description:
      "North Chhattisgarh covers Korba, Raigarh, Ambikapur, and adjoining districts with industrial-adjacent homes and expanding residential pockets.",
    landmarks: ["Korba", "Raigarh", "Ambikapur", "Surajpur", "Chirmiri"],
    propertyTypes: ["industrial-adjacent flats", "plotted homes", "township blocks"],
  },
  "bastar-south": {
    id: "bastar-south",
    label: "Bastar & South",
    description:
      "Bastar and southern districts include Jagdalpur, Kanker, and adjoining towns with independent homes and emerging apartment demand.",
    landmarks: ["Jagdalpur", "Kanker", "Kondagaon", "Dantewada"],
    propertyTypes: ["independent houses", "town apartments", "plotted layouts"],
  },
  "kawardha-west": {
    id: "kawardha-west",
    label: "Kawardha & Kabirdham",
    description:
      "Kawardha and Kabirdham cover western Chhattisgarh district towns with mixed residential and commercial openings.",
    landmarks: ["Kawardha", "Kabirdham", "Pandariya"],
    propertyTypes: ["district-town houses", "shop-fronts", "low-rise flats"],
  },
};

const CHHATTISGARH_ZONE_SLUG_MAP: Record<string, string> = {
  raipur: "raipur-belt",
  "naya-raipur": "raipur-belt",
  "atal-nagar": "raipur-belt",
  abhanpur: "raipur-belt",
  arang: "raipur-belt",
  "tilda-newra": "raipur-belt",
  "gobra-nawapara": "raipur-belt",
  "mandir-hasaud": "raipur-belt",
  birgaon: "raipur-belt",
  siltara: "raipur-belt",
  "shankar-nagar": "raipur-belt",
  telibandha: "raipur-belt",
  tatibandh: "raipur-belt",
  "devendra-nagar": "raipur-belt",
  "samta-colony": "raipur-belt",
  mowa: "raipur-belt",
  kachna: "raipur-belt",
  saddu: "raipur-belt",
  "vip-road": "raipur-belt",
  "avanti-vihar": "raipur-belt",
  "kota-raipur": "raipur-belt",
  pandri: "raipur-belt",
  "civil-lines-raipur": "raipur-belt",
  gudhiyari: "raipur-belt",
  fafadih: "raipur-belt",
  amanaka: "raipur-belt",
  sejbahar: "raipur-belt",
  labhandi: "raipur-belt",
  raipura: "raipur-belt",
  hirapur: "raipur-belt",
  tikrapara: "raipur-belt",
  dangania: "raipur-belt",
  "pachpedi-naka": "raipur-belt",
  "byron-bazar": "raipur-belt",
  dhamtari: "raipur-belt",
  kurud: "raipur-belt",
  nagri: "raipur-belt",
  magarlod: "raipur-belt",
  mahasamund: "raipur-belt",
  saraipali: "raipur-belt",
  basna: "raipur-belt",
  bagbahara: "raipur-belt",
  pithora: "raipur-belt",
  "baloda-bazar": "raipur-belt",
  "baloda-bazar-bhatapara": "raipur-belt",
  bhatapara: "raipur-belt",
  simga: "raipur-belt",
  palari: "raipur-belt",
  kasdol: "raipur-belt",
  lawan: "raipur-belt",
  gariaband: "raipur-belt",
  rajim: "raipur-belt",
  chhura: "raipur-belt",
  deobhog: "raipur-belt",
  bindranawagarh: "raipur-belt",
  bemetara: "raipur-belt",
  nawagarh: "raipur-belt",
  berla: "raipur-belt",
  saja: "raipur-belt",
  bhilai: "durg-bhilai",
  durg: "durg-bhilai",
  risali: "durg-bhilai",
  charoda: "durg-bhilai",
  "bhilai-3": "durg-bhilai",
  kumhari: "durg-bhilai",
  patan: "durg-bhilai",
  ahiwara: "durg-bhilai",
  supela: "durg-bhilai",
  "civic-centre": "durg-bhilai",
  "nehru-nagar-bhilai": "durg-bhilai",
  junwani: "durg-bhilai",
  khursipar: "durg-bhilai",
  jamul: "durg-bhilai",
  utai: "durg-bhilai",
  dhamdha: "durg-bhilai",
  "power-house-bhilai": "durg-bhilai",
  rajnandgaon: "durg-bhilai",
  dongargarh: "durg-bhilai",
  dongargaon: "durg-bhilai",
  chhuriya: "durg-bhilai",
  balod: "durg-bhilai",
  dondi: "durg-bhilai",
  "dondi-lohara": "durg-bhilai",
  gunderdehi: "durg-bhilai",
  gurur: "durg-bhilai",
  "khairagarh-chhuikhadan-gandai": "durg-bhilai",
  khairagarh: "durg-bhilai",
  chhuikhadan: "durg-bhilai",
  gandai: "durg-bhilai",
  "mohla-manpur-ambagarh-chowki": "durg-bhilai",
  mohla: "durg-bhilai",
  manpur: "durg-bhilai",
  "ambagarh-chowki": "durg-bhilai",
  bilaspur: "bilaspur-belt",
  takhatpur: "bilaspur-belt",
  kota: "bilaspur-belt",
  ratanpur: "bilaspur-belt",
  masturi: "bilaspur-belt",
  belha: "bilaspur-belt",
  tifra: "bilaspur-belt",
  sarkanda: "bilaspur-belt",
  torwa: "bilaspur-belt",
  "vyapar-vihar": "bilaspur-belt",
  seepat: "bilaspur-belt",
  lingiyadih: "bilaspur-belt",
  koni: "bilaspur-belt",
  "rajkishor-nagar": "bilaspur-belt",
  mungeli: "bilaspur-belt",
  lormi: "bilaspur-belt",
  pathariya: "bilaspur-belt",
  "janjgir-champa": "bilaspur-belt",
  janjgir: "bilaspur-belt",
  champa: "bilaspur-belt",
  akaltara: "bilaspur-belt",
  sakti: "bilaspur-belt",
  baradwar: "bilaspur-belt",
  "naila-janjgir": "bilaspur-belt",
  pamgarh: "bilaspur-belt",
  shivrinarayan: "bilaspur-belt",
  "gaurela-pendra-marwahi": "bilaspur-belt",
  gaurela: "bilaspur-belt",
  pendra: "bilaspur-belt",
  marwahi: "bilaspur-belt",
  "pendra-road": "bilaspur-belt",
  korba: "north-chhattisgarh",
  katghora: "north-chhattisgarh",
  dipka: "north-chhattisgarh",
  pali: "north-chhattisgarh",
  darri: "north-chhattisgarh",
  "balco-nagar": "north-chhattisgarh",
  kusmunda: "north-chhattisgarh",
  gevra: "north-chhattisgarh",
  jamnipali: "north-chhattisgarh",
  "korba-west": "north-chhattisgarh",
  raigarh: "north-chhattisgarh",
  kharsia: "north-chhattisgarh",
  dharamjaigarh: "north-chhattisgarh",
  gharghoda: "north-chhattisgarh",
  sarangarh: "north-chhattisgarh",
  "sarangarh-bilaigarh": "north-chhattisgarh",
  pusaur: "north-chhattisgarh",
  lailunga: "north-chhattisgarh",
  tamnar: "north-chhattisgarh",
  bilaigarh: "north-chhattisgarh",
  ambikapur: "north-chhattisgarh",
  surguja: "north-chhattisgarh",
  sitapur: "north-chhattisgarh",
  lundra: "north-chhattisgarh",
  lakhanpur: "north-chhattisgarh",
  udaipur: "north-chhattisgarh",
  pratappur: "north-chhattisgarh",
  rajpur: "north-chhattisgarh",
  wadrafnagar: "north-chhattisgarh",
  batauli: "north-chhattisgarh",
  mainpat: "north-chhattisgarh",
  ramanujganj: "north-chhattisgarh",
  "balrampur-ramanujganj": "north-chhattisgarh",
  balrampur: "north-chhattisgarh",
  kusmi: "north-chhattisgarh",
  shankargarh: "north-chhattisgarh",
  surajpur: "north-chhattisgarh",
  bishrampur: "north-chhattisgarh",
  premnagar: "north-chhattisgarh",
  odgi: "north-chhattisgarh",
  jashpur: "north-chhattisgarh",
  "jashpur-nagar": "north-chhattisgarh",
  kunkuri: "north-chhattisgarh",
  pathalgaon: "north-chhattisgarh",
  bagicha: "north-chhattisgarh",
  kansabel: "north-chhattisgarh",
  koriya: "north-chhattisgarh",
  baikunthpur: "north-chhattisgarh",
  "manendragarh-chirmiri-bharatpur": "north-chhattisgarh",
  manendragarh: "north-chhattisgarh",
  chirmiri: "north-chhattisgarh",
  bharatpur: "north-chhattisgarh",
  jagdalpur: "bastar-south",
  bastar: "bastar-south",
  kondagaon: "bastar-south",
  keshkal: "bastar-south",
  tokapal: "bastar-south",
  darbha: "bastar-south",
  bakawand: "bastar-south",
  lohandiguda: "bastar-south",
  kanker: "bastar-south",
  bhanupratappur: "bastar-south",
  charama: "bastar-south",
  antagarh: "bastar-south",
  pakhanjur: "bastar-south",
  narharpur: "bastar-south",
  narayanpur: "bastar-south",
  dantewada: "bastar-south",
  geedam: "bastar-south",
  kirandul: "bastar-south",
  bacheli: "bastar-south",
  barsur: "bastar-south",
  sukma: "bastar-south",
  konta: "bastar-south",
  chhindgarh: "bastar-south",
  bijapur: "bastar-south",
  bhairamgarh: "bastar-south",
  basaguda: "bastar-south",
  bhopalpatnam: "bastar-south",
  kawardha: "kawardha-west",
  kabirdham: "kawardha-west",
  pandariya: "kawardha-west",
  bodla: "kawardha-west",
  pandatarai: "kawardha-west",
};

/** Raipur city first, then Raipur urban localities, before the rest of the state. */
export const RAIPUR_FIRST_SLUGS = [
  "raipur",
  "naya-raipur",
  "atal-nagar",
  "shankar-nagar",
  "telibandha",
  "tatibandh",
  "devendra-nagar",
  "samta-colony",
  "vip-road",
  "avanti-vihar",
  "civil-lines-raipur",
  "pandri",
  "gudhiyari",
  "fafadih",
  "amanaka",
  "mowa",
  "kachna",
  "saddu",
  "kota-raipur",
  "sejbahar",
  "labhandi",
  "raipura",
  "hirapur",
  "tikrapara",
  "dangania",
  "pachpedi-naka",
  "byron-bazar",
  "birgaon",
  "mandir-hasaud",
  "siltara",
  "abhanpur",
  "arang",
  "tilda-newra",
  "gobra-nawapara",
] as const;

const RAIPUR_FIRST_RANK = new Map<string, number>(
  RAIPUR_FIRST_SLUGS.map((slug, index) => [slug, index]),
);

/** 0 = Raipur city. Lower is listed sooner. 10_000 = rest of Chhattisgarh. */
export function raipurListingRank(areaSlug: string): number {
  return RAIPUR_FIRST_RANK.get(areaSlug) ?? 10_000;
}

export function getChhattisgarhZoneId(areaSlug: string): string {
  if (CHHATTISGARH_ZONE_SLUG_MAP[areaSlug]) return CHHATTISGARH_ZONE_SLUG_MAP[areaSlug]!;
  const slug = areaSlug.toLowerCase();
  if (
    slug.includes("bhilai") ||
    slug.includes("durg") ||
    slug.includes("rajnandgaon") ||
    slug.includes("dongar") ||
    slug.includes("khairagarh") ||
    slug.includes("mohla") ||
    slug.includes("ambagarh")
  ) {
    return "durg-bhilai";
  }
  if (
    slug.includes("bilaspur") ||
    slug.includes("janjgir") ||
    slug.includes("champa") ||
    slug.includes("mungeli") ||
    slug.includes("gaurela") ||
    slug.includes("pendra") ||
    slug.includes("sakti")
  ) {
    return "bilaspur-belt";
  }
  if (
    slug.includes("jagdalpur") ||
    slug.includes("bastar") ||
    slug.includes("kanker") ||
    slug.includes("kondagaon") ||
    slug.includes("dantewada") ||
    slug.includes("sukma") ||
    slug.includes("bijapur") ||
    slug.includes("narayanpur")
  ) {
    return "bastar-south";
  }
  if (
    slug.includes("korba") ||
    slug.includes("raigarh") ||
    slug.includes("ambikapur") ||
    slug.includes("surguja") ||
    slug.includes("surajpur") ||
    slug.includes("jashpur") ||
    slug.includes("koriya") ||
    slug.includes("manendragarh") ||
    slug.includes("chirmiri")
  ) {
    return "north-chhattisgarh";
  }
  if (slug.includes("kawardha") || slug.includes("kabirdham") || slug.includes("pandariya")) {
    return "kawardha-west";
  }
  return "raipur-belt";
}

export function getChhattisgarhZone(areaSlug: string): AreaZone {
  const zoneId = getChhattisgarhZoneId(areaSlug);
  return CHHATTISGARH_ZONES[zoneId] ?? CHHATTISGARH_ZONES["raipur-belt"]!;
}
