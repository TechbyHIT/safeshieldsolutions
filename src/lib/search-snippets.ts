/**
 * Unique Google-snippet titles, descriptions, H1s, and intros.
 * Google may rewrite snippets and may bold query terms; this module does not
 * insert HTML or hidden keywords to force that formatting.
 */
import { business } from "@/config/business";
import { seoDefaults } from "@/config/seo";
import { getServiceDetail } from "@/config/service-details";
import { getCgPlace } from "@/data/cg-local-seo";
import { getSeoService, type SeoService } from "@/data/seo-services";
import { truncate } from "@/lib/slug";

export type SnippetKind =
  | "home"
  | "service"
  | "state-service"
  | "place"
  | "place-service"
  | "place-service-near-me"
  | "locality"
  | "locality-service"
  | "district"
  | "pricing"
  | "static";

export interface SearchSnippetInput {
  kind: SnippetKind;
  serviceName?: string;
  serviceSlug?: string;
  serviceDescription?: string;
  placeName?: string;
  placeSlug?: string;
  areaName?: string;
  districtName?: string;
  heading?: string;
  summary?: string;
}

export interface SearchSnippet {
  title: string;
  description: string;
  h1: string;
  intro: string;
}

const TITLE_MAX = seoDefaults.maxTitleLength;
const DESC_MAX = seoDefaults.maxDescriptionLength;

const SERVICE_HOOK: Record<string, string> = {
  "invisible-grills": "slim SS304 cables that keep the view open",
  "balcony-invisible-grills": "measured balcony cables, including corners and AC cut-outs",
  "window-invisible-grills": "slim window cables that keep daylight and airflow",
  "stainless-steel-invisible-grills": "named SS304 or SS316 cable systems",
  "child-safety-grills": "closer-spaced cables for toddler balconies and windows",
  "pet-safety-grills": "cable layouts planned for pets on balconies and windows",
  "safety-nets": "UV-stable mesh for balcony, terrace, and utility edges",
  "balcony-safety-nets": "mesh fitted across balcony openings for daily family use",
  "child-safety-nets": "closer-spaced mesh for toddler balconies and windows",
  "pet-safety-nets": "mesh planned for pets on balconies and open terraces",
  "pigeon-safety-nets": "full-opening mesh for ledges, ducts, and nesting spots",
  "bird-protection-nets": "mesh that closes larger bird-entry openings",
  "terrace-safety-nets": "UV-resistant mesh for rooftop edges and sit-outs",
  "duct-area-safety-nets": "mesh for shafts, AC decks, and service ducts",
  "bird-spikes": "narrow-ledge strips that discourage perching",
  "mosquito-nets": "frameless, sliding, or openable insect mesh",
  "cloth-hangers": "ceiling and balcony drying systems with SS304 rods",
  "zip-screens": "tracked screens for rain, dust, and insects on balconies",
  "motorized-zip-screens": "motorized tracked screens with a named motor and cloth",
  "mesh-doors": "hinged or magnetic insect doors for daily entry",
  "sliding-mesh-doors": "sliding insect doors for wide patio openings",
  "cricket-nets": "practice nets that contain balls on terraces and grounds",
  "cricket-box-grass": "artificial turf specified for box-cricket bounce",
  "sports-nets": "multi-sport practice nets for terraces and academies",
};

const PLACE_HOOK: Record<string, string> = {
  raipur: "VIP Road apartments and Naya Raipur sectors",
  bhilai: "steel-township flats and shop-street openings",
  durg: "twin-city houses along the Durg–Bhilai corridor",
  bilaspur: "railway-city houses in Sarkanda, Torwa, and the core",
  korba: "plant-adjacent township quarters and colony homes",
  rajnandgaon: "district-headquarters houses west of Durg",
  raigarh: "eastern industrial-town housing and plant colonies",
  jagdalpur: "Bastar district town houses and small apartments",
  ambikapur: "Surguja district town housing in the north",
  dhamtari: "town houses south of Raipur",
  mahasamund: "town houses east of Raipur",
  bhatapara: "railway-town houses on the Raipur–Bilaspur belt",
  janjgir: "district-town houses on the Bilaspur belt",
  champa: "industrial-town housing near Janjgir",
  kawardha: "district-headquarters houses in Kabirdham",
  "baloda-bazar": "town houses on the Raipur eastern belt",
};

const CTA_BY_CATEGORY: Record<string, string> = {
  Grills: "Book a free site survey for a written quote.",
  Nets: "Send a photo of the opening for a written quote.",
  "Bird Control": "Request a measured quote after a site visit.",
  Screens: "Ask for a survey of the opening and tracks.",
  Doors: "Book a survey of the door opening.",
  Hangers: "Request a measured quote for the drying span.",
  Sports: "Ask for a site visit to size the enclosure.",
  Turf: "Request a measured quote for the court area.",
};

export function stripMetaText(text: string): string {
  return text
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function fitTitle(title: string, max = TITLE_MAX): string {
  const clean = stripMetaText(title);
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const atPipe = cut.lastIndexOf(" | ");
  if (atPipe >= 24) return cut.slice(0, atPipe);
  const atDash = cut.lastIndexOf(" – ");
  if (atDash >= 24) return cut.slice(0, atDash);
  return truncate(clean, max).replace(/…$/, "").trim();
}

export function fitDescription(description: string, max = DESC_MAX): string {
  const clean = stripMetaText(description);
  if (clean.length <= max) return clean;
  return truncate(clean, max);
}

function serviceHook(slug: string | undefined, name: string): string {
  if (slug && SERVICE_HOOK[slug]) return SERVICE_HOOK[slug];
  const detail = slug ? getServiceDetail(slug) : undefined;
  const issue = detail?.issuesSolved[0];
  if (issue && issue.length < 80) return issue.charAt(0).toLowerCase() + issue.slice(1);
  return `${name.toLowerCase()} specified after a survey of the opening`;
}

function placeHook(placeSlug: string | undefined, placeName: string): string {
  if (placeSlug && PLACE_HOOK[placeSlug]) return PLACE_HOOK[placeSlug];
  const place = placeSlug ? getCgPlace(placeSlug) : undefined;
  if (place?.localContext) {
    const first = place.localContext.split(/(?<=\.)\s/)[0] ?? place.localContext;
    if (first.length <= 90) return first.replace(/\.$/, "");
  }
  return `homes and small apartments in ${placeName}`;
}

function ctaFor(slug?: string): string {
  const category = slug ? getSeoService(slug)?.category : undefined;
  return (category && CTA_BY_CATEGORY[category]) || "Book a free site survey for a written quote.";
}

function firstSentence(text: string, fallback: string): string {
  const clean = stripMetaText(text);
  if (!clean) return fallback;
  const match = clean.match(/^.*?[.!?](?=\s|$)/);
  return match?.[0] ?? (clean.length <= 140 ? clean : `${clean.slice(0, 137).trim()}…`);
}

export function serviceCardDescription(service: Pick<SeoService, "slug" | "name" | "description">): string {
  const clean = stripMetaText(service.description);
  const generic = /premium |best |trusted |leading /i.test(clean) || clean.length < 48;
  if (!generic && clean.length <= 160) return clean;
  const hook = serviceHook(service.slug, service.name);
  return fitDescription(
    `${service.name} — ${hook}. Measured installation across Chhattisgarh, with Raipur listed first.`,
  );
}

export function buildSearchSnippet(input: SearchSnippetInput): SearchSnippet {
  const service = input.serviceName ?? "this service";
  const slug = input.serviceSlug;
  const place = input.placeName ?? "Chhattisgarh";
  const hook = serviceHook(slug, service);
  const cta = ctaFor(slug);
  const local = placeHook(input.placeSlug, place);
  const area = input.areaName;
  const detail = slug ? getServiceDetail(slug) : undefined;
  const overview = firstSentence(
    input.serviceDescription ?? detail?.overview ?? "",
    `${service} is specified after the opening is measured.`,
  );

  let title = "";
  let h1 = "";
  let description = "";
  let intro = "";

  switch (input.kind) {
    case "home":
      title = "Invisible Grills & Safety Nets in Raipur | SafeShield";
      h1 = "Invisible grills and safety nets for Raipur homes";
      description =
        "Invisible grills, balcony safety nets, and pigeon nets in Raipur — Shankar Nagar, Telibandha, VIP Road, Naya Raipur and other listed areas. Free site survey; written quote after measurement.";
      intro =
        "SafeShield Solutions surveys and fits invisible grills, safety nets, and pigeon nets in Raipur first, then the other served Chhattisgarh towns. Each listed Raipur locality has its own pages. The quote follows a measurement of the opening.";
      break;
    case "service":
      title = `${service} | SafeShield Solutions`;
      h1 = service;
      description = `${overview} ${hook.charAt(0).toUpperCase() + hook.slice(1)}. Coverage is Chhattisgarh, with Raipur listed first. ${cta}`;
      intro = `${overview} This catalogue page explains materials, fixing, and how to request a written quote. Town pages name the actual survey area.`;
      break;
    case "state-service":
      title = `${service} in Chhattisgarh`;
      h1 = `${service} in Chhattisgarh`;
      description = `${service} across Chhattisgarh, with Raipur listed first. ${hook.charAt(0).toUpperCase() + hook.slice(1)}. ${cta}`;
      intro = `${service} in Chhattisgarh is specified after the opening is measured. Raipur is listed first, then Bhilai, Durg, Bilaspur, and the other served towns. ${cta}`;
      break;
    case "place":
      title = `Safety Nets and Invisible Grills in ${place}`;
      h1 = `Safety nets and invisible grills in ${place}`;
      description = `Safety nets, invisible grills, pigeon nets, and bird spikes in ${place} for ${local}. Free site survey; the quote is written after measurement.`;
      intro = `${place} is a SafeShield Solutions service area in Chhattisgarh, not a claimed branch office. ${getCgPlace(input.placeSlug ?? "")?.localContext ?? `Jobs in ${place} are surveyed on site.`} This page lists the services measured here.`;
      break;
    case "place-service":
      title = `${service} in ${place}`;
      h1 = `${service} in ${place}`;
      description = `${service} in ${place} for ${local}. ${hook.charAt(0).toUpperCase() + hook.slice(1)}. ${cta}`;
      intro = `${service} in ${place} is specified after the opening is measured. ${getCgPlace(input.placeSlug ?? "")?.localContext ?? `${place} is a listed Chhattisgarh service area.`} This page covers how ${service.toLowerCase()} is specified, what the quote includes, and how to book a survey.`;
      break;
    case "place-service-near-me":
      title = `${service} Near Me in ${place}`;
      h1 = `${service} Near Me in ${place}`;
      description = `Need ${service.toLowerCase()} near you in ${place}? ${hook.charAt(0).toUpperCase() + hook.slice(1)}. Send a photo to book a free survey.`;
      intro = `${business.name} surveys and fits ${service.toLowerCase()} in ${place}. ${getCgPlace(input.placeSlug ?? "")?.localContext ?? `${place} is a service area, not a branch office.`} The quote follows a measurement of the opening.`;
      break;
    case "locality":
      title = `Safety Nets and Invisible Grills in ${area}, ${place}`;
      h1 = `Safety nets and invisible grills in ${area}, ${place}`;
      description = `Invisible grills, balcony safety nets, pigeon nets, and bird spikes in ${area}, ${place}. ${firstSentence(input.summary ?? "", `${area} openings are measured on site.`)} ${cta}`;
      intro = `${area} in ${place} is a listed survey neighbourhood, not a claimed branch office. ${input.summary ?? `Openings here are measured before any quote.`} A net or grill does not replace a sound railing.`;
      break;
    case "locality-service":
      title = area ? `${service} in ${area}, ${place}` : `${service} in ${place}`;
      h1 = title;
      description = `${service} in ${area}, ${place}. ${hook.charAt(0).toUpperCase() + hook.slice(1)}. ${firstSentence(input.summary ?? "", "The quote follows a measurement of the opening.")}`;
      intro = `${service} in ${area}, ${place} is specified after the opening is measured. ${input.summary ?? `${area} is a listed neighbourhood in ${place}.`} ${cta}`;
      break;
    case "district": {
      const district = input.districtName ?? place;
      title = `Safety Nets and Invisible Grills in ${district} District`;
      h1 = `Safety nets and invisible grills in ${district} district`;
      description = fitDescription(
        `${input.summary ?? `${district} district towns in Chhattisgarh.`} Free site survey in the served towns; the quote is written after measurement.`,
      );
      intro = `${input.summary ?? `${district} district is listed for geography.`} Open a town page below to see the services measured there.`;
      break;
    }
    case "pricing":
      title = `${service} Price in Chhattisgarh`;
      h1 = `${service} price in Chhattisgarh`;
      description = `What changes the ${service.toLowerCase()} quote in Chhattisgarh: opening size, material, access, and fixing. No flat rate is published. ${cta}`;
      intro = `${service} price in Chhattisgarh is not a published square-foot rate. Width, height, access, and material are written after the survey.`;
      break;
    default:
      title = input.heading ?? `${business.name}`;
      h1 = input.heading ?? business.name;
      description = input.summary ?? seoDefaults.defaultDescription;
      intro = input.summary ?? "";
  }

  return {
    title: fitTitle(title),
    description: fitDescription(description),
    h1: stripMetaText(h1),
    intro: stripMetaText(intro),
  };
}

export function snippetForPlaceService(
  placeSlug: string,
  placeName: string,
  service: Pick<SeoService, "slug" | "name" | "description">,
  intent: "general" | "near-me",
): SearchSnippet {
  return buildSearchSnippet({
    kind: intent === "near-me" ? "place-service-near-me" : "place-service",
    serviceName: service.name,
    serviceSlug: service.slug,
    serviceDescription: service.description,
    placeName,
    placeSlug,
  });
}
