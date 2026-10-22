/**
 * Content rules for service, guide, comparison, and glossary pages.
 * Case studies stay unpublished until a verified job record exists.
 */
import { business } from "@/config/business";

export type ContentRole = "service" | "product" | "guide" | "comparison" | "faq" | "glossary";

export interface ContentBrief {
  role: ContentRole;
  intent: "local-transactional" | "local-commercial" | "informational";
  audience: string;
  mustInclude: string[];
  mustAvoid: string[];
}

export interface ContentCheck {
  id: string;
  pass: boolean;
  detail: string;
}

export interface ContentAssessment {
  score: number;
  checks: ContentCheck[];
  brief: ContentBrief;
  refresh: { version: string; status: "current" | "due"; detail: string };
}

export interface GlossaryTerm {
  slug: string;
  term: string;
  definition: string;
}

/** Terms a homeowner meets on a quote. Definitions stay qualitative. */
export const GLOSSARY: readonly GlossaryTerm[] = [
  {
    slug: "ss304",
    term: "SS304",
    definition:
      "SS304 is the stainless grade usually named for invisible-grill cables and fittings. The quote should name the cable grade and the fastener grade. A stainless cable held by an ordinary steel screw can still stain at the screw.",
  },
  {
    slug: "ss316",
    term: "SS316",
    definition:
      "SS316 is the upgrade when the opening stays wet or faces heavier corrosion. It is not required on every dry inland balcony. The survey decides whether the upgrade belongs on that opening.",
  },
  {
    slug: "hdpe",
    term: "HDPE",
    definition:
      "HDPE is a polyethylene used for some outdoor meshes. It is one mesh option, chosen after the opening, the sun, and what the net has to stop are known.",
  },
  {
    slug: "nylon",
    term: "Nylon",
    definition:
      "Nylon is a polyamide family used in some meshes. Outdoor nets need a UV-stabilised specification. The polymer is written on the quote, not assumed from the colour.",
  },
  {
    slug: "invisible-grill",
    term: "Invisible grill",
    definition:
      "An invisible grill is a cable line in a channel or between end posts. It keeps the view and the airflow. It does not replace a sound railing, and it does not stop small birds by itself.",
  },
  {
    slug: "safety-net",
    term: "Safety net",
    definition:
      "A safety net is a mesh closure on a measured opening: balcony, window, duct, or terrace. The mesh and the border are chosen for that use. A pigeon net and a child net are not the same line.",
  },
  {
    slug: "bird-spike",
    term: "Bird spike",
    definition:
      "A bird spike is a strip on a landing edge such as a parapet, sign, or AC hood. It does not close a balcony and it is not a child-safety product.",
  },
  {
    slug: "zip-screen",
    term: "Zip screen",
    definition:
      "A zip screen is a retractable screen that runs in side tracks. Manual and motorized versions are quoted as separate parts. The motor, cloth, and tracks are not one hidden package.",
  },
];

/** No verified job write-ups are in the catalogue. Gallery photos are not case studies. */
export const PUBLISHED_CASE_STUDIES: readonly [] = [];

export function contentBrief(role: ContentRole, subject: string, place?: string): ContentBrief {
  if (role === "service" || role === "product") {
    return {
      role,
      intent: "local-transactional",
      audience: place ? `A household or building manager in ${place}` : "A household comparing a measured installation",
      mustInclude: [
        `${subject} named as the product`,
        place ? `The place name ${place}` : "The service area",
        "A statement that the quote follows measurement",
        "What the product is not",
        "At least three questions a buyer asks",
      ],
      mustAvoid: [
        "A flat rate presented as the price",
        "A claim that the product makes an opening childproof",
        "A fake customer case study",
        "A second page for the same intent",
      ],
    };
  }
  if (role === "comparison") {
    return {
      role,
      intent: "informational",
      audience: "A buyer choosing between two products already in the catalogue",
      mustInclude: ["Both product names", "A limit for each product", "No invented strength or price"],
      mustAvoid: ["A winner declared for every opening", "A product that is not sold"],
    };
  }
  if (role === "glossary") {
    return {
      role,
      intent: "informational",
      audience: "A reader who met a term on a quote",
      mustInclude: ["The term", "What it does on an opening", "The measurement caveat"],
      mustAvoid: ["Copied reference text", "A diameter, load, or lifespan that was not measured"],
    };
  }
  return {
    role,
    intent: "informational",
    audience: "A person researching before a survey",
    mustInclude: ["A question in the title", "The product it supports", "A link toward the service page"],
    mustAvoid: ["The town service page's primary as the guide title", "Near-me wording owned by a town page"],
  };
}

export function refreshStatus(version: string, asOf: string): ContentAssessment["refresh"] {
  const published = Date.parse(version);
  const now = Date.parse(asOf);
  if (Number.isNaN(published) || Number.isNaN(now)) {
    return { version, status: "due", detail: "Version date is missing" };
  }
  const ageDays = Math.floor((now - published) / 86_400_000);
  if (ageDays > 180) {
    return { version, status: "due", detail: `Last set on ${version}. Review the sources and the local notes.` };
  }
  return { version, status: "current", detail: `Set on ${version}. Next review after 180 days.` };
}

export function assessServicePage(input: {
  title: string;
  body: string;
  faqs: number;
  sectionIds: string[];
  sources: number;
  placeName: string;
  serviceName: string;
  intent: "general" | "near-me";
  version: string;
  asOf: string;
}): ContentAssessment {
  const brief = contentBrief("service", input.serviceName, input.placeName);
  const title = input.title.toLowerCase();
  const body = input.body.toLowerCase();
  const checks: ContentCheck[] = [
    {
      id: "intent",
      pass: input.intent === "near-me" ? title.includes("near me") && title.includes(input.placeName.toLowerCase()) : title.includes(input.placeName.toLowerCase()) && !title.includes("near me"),
      detail: input.intent === "near-me" ? "Near-me title names the town" : "Town title does not take the near-me query",
    },
    {
      id: "people-first",
      pass: body.includes("measure") || body.includes("measurement"),
      detail: "The page tells the reader the quote follows a measurement",
    },
    {
      id: "helpful",
      pass: input.faqs >= 3 && input.sectionIds.length >= 4,
      detail: `${input.faqs} questions, ${input.sectionIds.length} sections`,
    },
    {
      id: "completeness",
      pass: input.sectionIds.includes("entity-context") && input.sectionIds.includes("local-context"),
      detail: "Local notes and the what-it-is-not section are present",
    },
    {
      id: "evidence",
      pass: input.sources > 0,
      detail: input.sources > 0 ? `${input.sources} named sources` : "No source",
    },
    {
      id: "experience",
      pass: body.includes(input.placeName.toLowerCase()) && body.includes("not a branch"),
      detail: "The town is described as a service area, not a claimed branch",
    },
    {
      id: "credibility",
      pass: body.includes(business.name.toLowerCase()) || body.includes("safeshield"),
      detail: business.name,
    },
    {
      id: "faq",
      pass: input.faqs >= 3,
      detail: "Buyer questions are answered on the page",
    },
    {
      id: "originality",
      pass: !body.includes("lorem ipsum") && !body.includes("case study:"),
      detail: "No placeholder copy and no invented case study",
    },
  ];
  const score = Math.round((checks.filter((check) => check.pass).length / checks.length) * 100);
  return { score, checks, brief, refresh: refreshStatus(input.version, input.asOf) };
}

/** Doorway intents that stay consolidated instead of being published as articles. */
export function consolidatedIntents(serviceSlug: string, placeSlug: string): { path: string; keep: string }[] {
  const base = `/chhattisgarh/${placeSlug}/${serviceSlug}`;
  return [
    { path: `${base}-price`, keep: base },
    { path: `${base}-dealers`, keep: base },
    { path: `${base}-installation`, keep: base },
  ];
}
