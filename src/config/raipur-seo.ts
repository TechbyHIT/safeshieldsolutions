import { raipurListingRank } from "@/config/chhattisgarh-zones";
import { getIndexableLocalitiesForCity } from "@/data/cg-hierarchy";

export interface RaipurSeoBlock {
  id: string;
  heading: string;
  body: string;
}

export interface RaipurFaq {
  question: string;
  answer: string;
}

/** Localities that should read as Raipur in titles and on-page links. */
export function isRaipurFocusArea(areaSlug: string): boolean {
  return raipurListingRank(areaSlug) < 10_000;
}

export const RAIPUR_SERVICE_LINKS = [
  { slug: "invisible-grills", name: "Invisible grills" },
  { slug: "balcony-invisible-grills", name: "Balcony invisible grills" },
  { slug: "window-invisible-grills", name: "Window invisible grills" },
  { slug: "safety-nets", name: "Safety nets" },
  { slug: "balcony-safety-nets", name: "Balcony safety nets" },
  { slug: "pigeon-safety-nets", name: "Pigeon safety nets" },
  { slug: "bird-spikes", name: "Bird spikes" },
  { slug: "child-safety-grills", name: "Child safety grills" },
  { slug: "mosquito-nets", name: "Mosquito nets" },
  { slug: "cloth-hangers", name: "Cloth hangers" },
  { slug: "staircase-invisible-grills", name: "Staircase invisible grills" },
  { slug: "staircase-safety-nets", name: "Staircase safety nets" },
  { slug: "open-area-safety-nets", name: "Open area and courtyard nets" },
  { slug: "monkey-safety-nets", name: "Monkey safety nets" },
  { slug: "sparrow-protection-nets", name: "Sparrow protection nets" },
  { slug: "car-parking-safety-nets", name: "Car parking safety nets" },
  { slug: "swimming-pool-safety-nets", name: "Swimming pool safety nets" },
  { slug: "shade-nets", name: "Shade nets" },
] as const;

export function raipurLocalityLinks() {
  return [
    { slug: "raipur", name: "Raipur city", href: "/chhattisgarh/raipur" },
    ...getIndexableLocalitiesForCity("raipur").map((area) => ({
      slug: area.slug,
      name: area.name,
      href: `/chhattisgarh/raipur/areas/${area.slug}`,
    })),
  ];
}

export function raipurHubSections(): RaipurSeoBlock[] {
  return [
    {
      id: "raipur-grills",
      heading: "Invisible grills in Raipur",
      body: "Raipur balcony and window jobs start with the opening, not a packaged size. Apartments in Shankar Nagar, Telibandha, Civil Lines, Devendra Nagar, Pandri, and Naya Raipur often mix concrete beams, MS railings, and uPVC frames on the same floor. A useful quote names cable grade (SS304 as standard), spacing, channel finish, anchor type, and whether the society allows a visible edge. SS316 is only specified when the opening faces heavy moisture. The survey is free for a standard residential visit; the written scope is what you compare with other Raipur dealers.",
    },
    {
      id: "raipur-nets",
      heading: "Safety nets and pigeon nets in Raipur",
      body: "Safety nets in Raipur are usually for balcony edges, staircase voids, and terrace sides where children or pets use the opening every day. Pigeon nets are a different mesh and fixing pattern: ducts, ledges, and shafts where birds sit, not a fall-protection net. Tell us which problem you have. Knotless UV-stable net, edge rope, and anchor spacing should be on the quotation. High floors in Raipur towers need lift access and a harness plan before a date is fixed.",
    },
    {
      id: "raipur-quote",
      heading: "What changes the price in Raipur",
      body: "Raipur prices move with measured area, floor level, number of openings, fixing surface, and material grade. A single window is not priced like a full-tower balcony package. Ask for anchors, edge treatment, transport, GST, and warranty on the same sheet. Installation is commonly scheduled after the quote is approved and the material is cut. Society timing rules in Raipur apartments decide the start hour more often than the travel distance.",
    },
    {
      id: "raipur-localities",
      heading: "Raipur localities with their own pages",
      body: "Raipur city is listed first. Then each listed locality has its own hub and service pages: Naya Raipur, Shankar Nagar, Telibandha, Tatibandh, Civil Lines, VIP Road, Pandri, Devendra Nagar, Samta Colony, Avanti Vihar, Gudhiyari, Fafadih, Amanaka, Kota, Mowa, Kachna, Saddu, Sejbahar, Labhandi, Pachpedi Naka, Tikrapara, Dangania, Birgaon, and Mandir Hasaud. Bhilai, Durg, Bilaspur, and the other Chhattisgarh towns stay in the sitemap after the Raipur set.",
    },
  ];
}

export function raipurHubFaqs(): RaipurFaq[] {
  return [
    {
      question: "Who installs invisible grills in Raipur?",
      answer:
        "SafeShield Solutions surveys, supplies, and installs invisible grills in Raipur. The quotation lists cable grade, spacing, anchors, and warranty before work starts.",
    },
    {
      question: "What is the invisible grill price in Raipur?",
      answer:
        "The Raipur price depends on measured square feet, floor access, cable grade, and how many openings are in one visit. A free site survey produces an itemised quote. Do not compare a headline rate that leaves out anchors or GST.",
    },
    {
      question: "Do you fit safety nets and pigeon nets in Raipur apartments?",
      answer:
        "Yes. Safety nets and pigeon nets are specified separately. Share a full photo of the balcony, duct, or ledge, plus the society name, so the mesh and fixing match the opening.",
    },
    {
      question: "Which Raipur areas have service pages?",
      answer:
        "Each listed Raipur locality has its own page, including Naya Raipur, Shankar Nagar, Telibandha, Civil Lines, VIP Road, Pandri, Samta Colony, Avanti Vihar, Gudhiyari, Amanaka, Mowa, Kachna, and the other neighbourhoods in the Raipur area list.",
    },
    {
      question: "How do I book a Raipur site survey?",
      answer:
        "Call or WhatsApp with photos, an approximate size, and the locality. Residential surveys in Raipur are free. Installation is booked after you approve the written quote.",
    },
  ];
}

export function raipurAreaSections(
  areaName: string,
  areaSlug: string,
  serviceName: string,
  serviceLower: string,
): RaipurSeoBlock[] {
  if (!isRaipurFocusArea(areaSlug)) return [];
  const place = areaSlug === "raipur" ? "Raipur" : `${areaName}, Raipur`;
  return [
    {
      id: "raipur-search",
      heading: `What a ${serviceLower} survey covers in ${place}`,
      body: `A useful ${serviceLower} quote in ${place} names the opening size, fixing surface, floor access, and society rules. SS304 is the standard grill grade. Nets are specified by use — fall protection, birds, or insects — not by a single mesh for every job. Price, dealer, and near-me searches for ${place} are answered on this page after a site measurement.`,
    },
    {
      id: "raipur-compare",
      heading: `How to compare ${serviceLower} quotes in ${place}`,
      body: `Line up square feet, cable or net grade, anchors, edge finish, labour, transport, GST, and warranty. A lower ${place} rate that omits anchors or uses an unnamed steel grade is not the same job. We survey ${place} before cutting material, then install after approval. Send one wide photo and one close photo of the fixing points with your locality name.`,
    },
  ];
}

export function raipurAreaFaqs(areaName: string, areaSlug: string, serviceLower: string): RaipurFaq[] {
  if (!isRaipurFocusArea(areaSlug)) return [];
  const place = areaSlug === "raipur" ? "Raipur" : `${areaName}, Raipur`;
  return [
    {
      question: `Where can I get ${serviceLower} in ${place}?`,
      answer: `Book a survey for ${place}. The visit measures the opening and the quote names material, anchors, and warranty before installation.`,
    },
    {
      question: `Do Raipur societies allow ${serviceLower}?`,
      answer: `Many Raipur apartments allow grills and nets if the fixing is neat and the colour stays close to the facade. Share the society name during booking so the specification can follow those rules.`,
    },
  ];
}
