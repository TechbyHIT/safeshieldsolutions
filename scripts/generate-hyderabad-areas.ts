/**
 * One-time generator: builds src/data/hyderabad-areas.ts from the master locality list.
 * Run: npx tsx scripts/generate-hyderabad-areas.ts
 */
import { writeFileSync } from "node:fs";
import { slugify } from "../src/lib/slug";
import { getAreaZoneId } from "../src/config/area-zones";

const RAW = `
a. s. rao nagar
abdullapurmet
abids
ac guards
adarsh nagar
adibatla
adikmet
afzal gunj
agapura
ahmed nagar
alijah kotla
alkapur township
allwyn colony
almasguda
alwal
amberpet
ameenpur
ameerpet
ammuguda
anand bagh
anand nagar colony
anjaiah nagar
annojiguda
appa junction
aramghar
ashok nagar
asif nagar
attapur
auto nagar
azamabad
azampura
aziz nagar
b n reddy nagar
bachupally
badangpet
bahadurpally
bahadurpura
bairamalguda
balanagar
balapur
balkampet
bandlaguda
bandlaguda jagir
banjara hills
barkas
barkatpura
basheerbagh
beeramguda
begum bazaar
begumpet
bhag amberpet
bharat nagar
bhel township
bhoiguda
bholakpur
boduppal
boggulkunta
bolarum
bongloor
borabanda
botanical garden
boudha nagar
bowenpally
bowrampet
brahmanwadi
budvel
chaderghat
chaitanyapuri
champapet
chanchalguda
chandanagar
chandrayanagutta
charminar
chengicherla
cherlapally
chevella
chikkadpally
chilakalguda
chilkalguda
chilkur
chintal
chintalkunta
chintalmet
chowmahalla
d d colony
dabirpura
dammaiguda
darulshifa
dattatreya nagar
dhoolpet
dilsukhnagar
domalguda
doodh bowli
dr a. s. rao nagar
dundigal
east anandbagh
east marredpally
ecil
edi bazaar
erragadda
erramanzil
falaknuma
fateh darwaza
fateh nagar
feelkhana
film nagar
financial district
gachibowli
gaganpahad
gajularamaram
gandhi nagar
gandimaisamma
gandipet
general bazaar
ghansi bazaar
ghatkesar
golconda
gopanpally
goshamahal
gowlidoddy
gudimalkapur
gundlapochampally
habsiguda
hafeezpet
hakimpet
hasmathpet
hastinapuram
hayathnagar
himayat sagar
himayatnagar
hitec city
hmt colony
humayun nagar
hyder nagar
hyderguda
hydershakote
ibrahim bagh
ibrahimpatnam
injapur
isnapur
jahanuma
jalpally
jam bagh
jambagh
james street
jawahar nagar
jeedimetla
jillelguda
jiyaguda
jntu
jubilee hills
kachiguda
kakatiya nagar
kalapathar
kalasiguda
kanchanbagh
kandi
kandlakoya
kapra
karkhana
karmanghat
karwan
katedan
kavadiguda
keesara
khairatabad
khajaguda
khanamet
khilwat
king koti
kishanbagh
kismatpur
koheda
kokapet
kollur
kompally
kondapur
kongara kalan
kothaguda
kothapet
kothur
koti
kowkoor
kphb colony
krishna nagar
kukatpally
kushaiguda
l b nagar
lakdikapul
lalapet
lallaguda
langar houz
lingampally
lower tank bund
madhapur
madinaguda
mahendra hills
maheshwaram
mailardevpally
malakpet
malkajgiri
mallampet
mallapur
mallepally
mamidipally
mangalhat
manikonda
mansoorabad
marredpally
masab tank
masjid banda
medchal
medipally
meerpet
mehdipatnam
mettuguda
mg road
miyapur
moghalpura
moinabad
moosapet
moosarambagh
moula ali
muchintal
mughalpura
musheerabad
muthangi
nacharam
nadergul
nagaram
nagole
nallagandla
nallakunta
nampally
nanakramguda
nanal nagar
nandigama
narapally
narayanaguda
narsingi
nawab saheb kunta
necklace road
neknampur
neopolis
neredmet
new bowenpally
new malakpet
nizampet
noor khan bazaar
old alwal
old bowenpally
old city
osman nagar
osmania university
padmarao nagar
pahadi shareef
pan mandi
panjagutta
paradise
parsigutta
patancheru
pathergatti
patighanpur
patny
pedda amberpet
peerancheru
peerzadiguda
pet basheerabad
petlaburj
picket
pocharam
pragathi nagar
prakash nagar
puppalaguda
puranapul
purani haveli
quthbullapur
raidurg
raj bhavan road
rajendranagar
ramachandrapuram
ramanthapur
ramnagar
rampally
ranigunj
rasoolpura
red hills
rein bazaar
riyasat nagar
rtc cross roads
rudraram
s d road
s r nagar
safilguda
saidabad
saifabad
sainikpuri
saleem nagar
sanath nagar
santosh nagar
santoshnagar
saroornagar
satamrai
secunderabad
seven tombs
shadnagar
shah ali banda
shaikpet
shamirpet
shamshabad
shankarpally
shapur nagar
shivrampally
siddiamber bazaar
sikh village
sitaphalmandi
somajiguda
sri nagar colony
subhash nagar
suchitra
sultan bazaar
sun city
suraram
tadban
tadbund
talab katta
tappachabutra
tarnaka
tellapur
theatre road
thumkunta
tilak nagar
tolichowki
trimulgherry
tukkuguda
turkayamjal
uppal
uppal bhagat
uppuguda
vanasthalipuram
velimela
vengal rao nagar
vidyanagar
vijayanagar colony
vivekananda nagar
west marredpally
whitefields
yakutpura
yapral
yellareddyguda
yousufguda
zamistanpur
ziaguda
`.trim();

function displayName(raw: string): string {
  return raw
    .split(/\s+/)
    .map((w) => {
      const lower = w.toLowerCase();
      if (["a", "s", "b", "d", "l", "s", "r"].includes(lower) && raw.includes(".")) {
        return w.replace(/\./g, "").toUpperCase();
      }
      if (lower === "lb" || lower === "bn" || lower === "dd" || lower === "sr" || lower === "sd") {
        return w.toUpperCase();
      }
      if (lower === "kphb" || lower === "jntu" || lower === "ecil" || lower === "hmt") {
        return w.toUpperCase();
      }
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    })
    .join(" ")
    .replace(/\bA S Rao\b/g, "A.S. Rao")
    .replace(/\bB N Reddy\b/g, "B.N. Reddy")
    .replace(/\bL B\b/g, "L.B.")
    .replace(/\bS R\b/g, "S.R.")
    .replace(/\bS D\b/g, "S.D.")
    .replace(/\bD D\b/g, "D.D.")
    .replace(/\bDr A S Rao\b/g, "Dr A.S. Rao");
}

/** Merge near-duplicate locality names to one canonical slug. */
const CANONICAL_SLUG: Record<string, string> = {
  "a-s-rao-nagar": "as-rao-nagar",
  "dr-a-s-rao-nagar": "as-rao-nagar",
  "hitec-city": "hitech-city",
  "l-b-nagar": "lb-nagar",
  "b-n-reddy-nagar": "bn-reddy-nagar",
  santoshnagar: "santosh-nagar",
};

function canonicalSlug(raw: string): string {
  const base = slugify(raw);
  return CANONICAL_SLUG[base] ?? base;
}

const seen = new Map<string, { slug: string; name: string; raw: string }>();
for (const line of RAW.split("\n")) {
  const raw = line.trim();
  if (!raw) continue;
  const slug = canonicalSlug(raw);
  if (!slug) continue;
  const existing = seen.get(slug);
  const name = displayName(raw);
  if (!existing) {
    seen.set(slug, { slug, name, raw });
    continue;
  }
  // Prefer shorter display name unless new entry is the canonical A.S. Rao form
  if (name.length < existing.name.length || raw.toLowerCase().includes("a. s. rao")) {
    seen.set(slug, { slug, name, raw });
  }
}

const areas = [...seen.values()].map((a, i) => ({
  slug: a.slug,
  name: a.name,
  zone: getAreaZoneId(a.slug),
  sortOrder: i + 1,
  priorityTier: getPriorityTier(a.slug),
}));

function getPriorityTier(slug: string): 1 | 2 | 3 {
  const tier1 = new Set([
    "gachibowli", "kondapur", "madhapur", "hitech-city", "financial-district",
    "banjara-hills", "jubilee-hills", "kukatpally", "miyapur", "nizampet",
    "manikonda", "nallagandla", "tellapur", "nanakramguda", "kokapet",
    "secunderabad", "uppal", "lb-nagar", "dilsukhnagar", "kompally",
    "bachupally", "narsingi", "attapur", "mehdipatnam", "hafeezpet",
    "ameerpet", "somajiguda", "kothaguda", "gachibowli", "film-nagar",
    "jubilee-hills", "banjara-hills", "habsiguda", "tarnaka", "sainikpuri",
    "alwal", "bowenpally", "malkajgiri", "nagole", "vanasthalipuram",
  ]);
  const tier2 = new Set([
    "as-rao-nagar", "a-s-rao-nagar", "ecil", "kphb-colony", "moosapet", "erragadda",
    "panjagutta", "begumpet", "masab-tank", "shaikpet", "langar-houz",
    "peerzadiguda", "patancheru", "medchal", "shamshabad", "adibatla",
  ]);
  if (tier1.has(slug)) return 1;
  if (tier2.has(slug)) return 2;
  return 3;
}

const out = `/** Auto-generated by scripts/generate-hyderabad-areas.ts — do not edit by hand */
export type AreaPriorityTier = 1 | 2 | 3;

export interface HyderabadArea {
  slug: string;
  name: string;
  zone: string;
  sortOrder: number;
  priorityTier: AreaPriorityTier;
}

export const HYDERABAD_AREAS: HyderabadArea[] = ${JSON.stringify(areas, null, 2)};

export const HYDERABAD_AREA_COUNT = ${areas.length};

export function getHyderabadAreaBySlug(slug: string): HyderabadArea | undefined {
  return HYDERABAD_AREAS.find((a) => a.slug === slug);
}
`;

writeFileSync(new URL("../src/data/hyderabad-areas.ts", import.meta.url), out, "utf8");
console.log(`Wrote ${areas.length} Hyderabad areas to src/data/hyderabad-areas.ts`);
