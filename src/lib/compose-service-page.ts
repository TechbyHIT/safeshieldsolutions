/**
 * Composes a stored technical page for one service + place + intent.
 * Angle selection changes which modules are used, so two towns do not
 * share the same essay with the name swapped.
 * No AI call. No nearby-area filler. No invented specifications.
 */
import { CG_PRIORITY_PLACES, type CgPlaceProfile } from "@/data/cg-local-seo";
import type { SeoService } from "@/data/seo-services";
import { knowledgeForCategory, type KnowledgeModule, type SourceReference } from "@/content/service-knowledge";
import { depthChaptersForCategory, readingTheSpecification } from "@/content/depth-chapters";
import { nearMeSlug } from "@/lib/local-seo-catalog";
import { wordCount } from "@/lib/content-fingerprint";
import { buildEntityProfile } from "@/lib/entity-seo";
import { buildKeywordPlan, supportingSearchSentence } from "@/lib/keyword-targeting";
import { snippetForPlaceService } from "@/lib/search-snippets";

export type LocalIntent = "general" | "near-me";

export interface ComposedSection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface ComposedServicePage {
  path: string;
  contentAngle: string;
  contentVersion: string;
  title: string;
  h1: string;
  description: string;
  intro: string;
  explanation: string;
  sections: ComposedSection[];
  faqs: { question: string; answer: string }[];
  directAnswer: { question: string; answer: string };
  sources: SourceReference[];
  checklist: string[];
  wordCount: number;
  /** Count of "near me" in section paragraphs, bullets, and FAQ answers only (not title/H1/meta). */
  nearMeMentions: number;
}

export const CONTENT_VERSION = "2026-10-05";
export const MIN_PAGE_WORDS = 1500;

function combinations(count: number, size: number): number[][] {
  const out: number[][] = [];
  const pick: number[] = [];
  function walk(start: number) {
    if (pick.length === size) {
      out.push([...pick]);
      return;
    }
    for (let i = start; i < count; i += 1) {
      pick.push(i);
      walk(i + 1);
      pick.pop();
    }
  }
  walk(0);
  return out;
}

function serviceShift(slug: string): number {
  return [...slug].reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

const packCache = new Map<string, number[][]>();

function packedSets(moduleCount: number, size: number): number[][] {
  const key = `${moduleCount}:${size}`;
  const cached = packCache.get(key);
  if (cached) return cached;
  const all = combinations(moduleCount, size);
  const picked: number[][] = [];
  for (const combo of all) {
    const fits = picked.every((prev) => combo.filter((index) => prev.includes(index)).length <= 1);
    if (fits) picked.push(combo);
  }
  packCache.set(key, picked.length > 0 ? picked : all);
  return packCache.get(key)!;
}

export function selectModuleIndexes(
  moduleCount: number,
  placeSlug: string,
  serviceSlug: string,
  intent: LocalIntent,
): number[] {
  const tripleSets = moduleCount >= 6 ? packedSets(moduleCount, 3) : [];
  const sets = tripleSets.length >= 16 ? tripleSets : packedSets(moduleCount, Math.min(2, moduleCount));
  const placeIndex = Math.max(0, CG_PRIORITY_PLACES.findIndex((place) => place.slug === placeSlug));
  const index = Math.abs(placeIndex + serviceShift(serviceSlug)) % sets.length;
  const chosen = sets[index] ?? [0];
  if (intent === "near-me") {
    return chosen.map((item) => (item + Math.max(1, Math.floor(moduleCount / 2))) % moduleCount);
  }
  return chosen;
}

function answerForKeyword(phrase: string, placeName: string, serviceName: string): string {
  const lower = serviceName.toLowerCase();
  if (/\bhow much\b|\bprice\b|\bcost\b|\bcharges\b/.test(phrase)) {
    return `${serviceName} in ${placeName} is quoted after the opening is measured. Width, height, access, and material change the figure. No flat rate is published for ${lower}.`;
  }
  if (/\bwho installs\b|\bwhere to\b/.test(phrase)) {
    return `SafeShield Solutions surveys and fits ${lower} in ${placeName}. Send the floor and a photo of the fixing edge to book the visit.`;
  }
  return `A ${placeName} ${lower} visit checks the fixing edge, access, and how the opening is used before any specification is written.`;
}

function localParagraph(place: CgPlaceProfile, service: SeoService): string {
  return `${place.localContext} On a ${service.name.toLowerCase()} visit the survey records access, the fixing surface, and how this opening is used. SafeShield Solutions measures and fits the opening. ${place.name} is a service area, not a branch office.`;
}

export function composeServicePage(
  place: CgPlaceProfile,
  service: SeoService,
  intent: LocalIntent,
): ComposedServicePage {
  const knowledge = knowledgeForCategory(service.category);
  const indexes = selectModuleIndexes(knowledge.modules.length, place.slug, service.slug, intent);
  const modules = indexes.map((index) => knowledge.modules[index]).filter((item): item is KnowledgeModule => Boolean(item));
  const angle = `${service.category.toLowerCase()}:${modules.map((item) => item.id).join("+")}`;

  const local = localParagraph(place, service);
  const placeIndex = Math.max(0, CG_PRIORITY_PLACES.findIndex((item) => item.slug === place.slug));
  const depth = depthChaptersForCategory(service.category);
  const depthStart = (placeIndex + (intent === "near-me" ? 1 : 0)) % Math.max(1, depth.length);
  const orderedDepth = depth
    .map((_, index) => depth[(depthStart + index) % depth.length])
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const specification = readingTheSpecification(service.name, service.category);
  const sections: ComposedSection[] = [
    {
      id: "local-context",
      heading: `What changes on a ${place.name} survey`,
      paragraphs: [local],
    },
    {
      id: specification.id,
      heading: specification.heading,
      paragraphs: specification.paragraphs,
    },
    ...modules.map((item) => ({
      id: item.id,
      heading: item.heading,
      paragraphs: item.paragraphs,
      bullets: item.bullets,
    })),
    ...orderedDepth.map((item) => ({
      id: item.id,
      heading: item.heading,
      paragraphs: item.paragraphs,
    })),
  ];

  const checklist = modules.flatMap((item) => item.bullets ?? []);
  const second = modules[1] ?? modules[0];
  const path =
    intent === "near-me"
      ? `/chhattisgarh/${place.slug}/${nearMeSlug(service.slug)}`
      : `/chhattisgarh/${place.slug}/${service.slug}`;
  const plan = buildKeywordPlan({
    serviceSlug: service.slug,
    serviceName: service.name,
    path,
    placeName: place.name,
    placeSlug: place.slug,
    intentLabel: intent === "near-me" ? "near me" : "general",
  });
  const support = supportingSearchSentence(plan);
  if (support && sections[0]) sections[0].paragraphs.push(support);
  const entity = buildEntityProfile(service, place);
  sections.push(entity.section);

  const moduleFaqs = modules.flatMap((item) => item.faqs).slice(0, 12);
  const entityFaq = entity.fanOut.find((item) => item.query.startsWith("How is"));
  const questionPool =
    intent === "near-me"
      ? plan.questions.filter((item) => !/\bnear me\b/i.test(item.phrase))
      : plan.questions;
  const extraFaqs = questionPool.slice(0, 2).map((item) => ({
    question: item.phrase.endsWith("?") ? item.phrase.charAt(0).toUpperCase() + item.phrase.slice(1) : `${item.phrase.charAt(0).toUpperCase()}${item.phrase.slice(1)}?`,
    answer: answerForKeyword(item.phrase, place.name, service.name),
  }));
  const faqs = [
    ...moduleFaqs,
    ...extraFaqs,
    ...(entityFaq ? [{ question: entityFaq.query, answer: entityFaq.answer }] : []),
  ];

  const snippet = snippetForPlaceService(place.slug, place.name, service, intent);
  const title = snippet.title;
  const h1 = snippet.h1;
  const description = snippet.description;
  const directAnswer =
    intent === "near-me"
      ? {
          question: `Who fits ${service.name} in ${place.name}?`,
          answer: `SafeShield Solutions surveys and fits ${service.name} in ${place.name}. The quote follows a measurement. ${place.name} is a service area, not a branch office.`,
        }
      : {
          question: `What is ${service.name} in ${place.name}?`,
          answer: `${service.name} in ${place.name} is specified after the opening is measured. The quote is not a flat rate. SafeShield Solutions treats ${place.name} as a service area, not a branch office.`,
        };

  const bodyText = [
    title,
    h1,
    description,
    directAnswer.question,
    directAnswer.answer,
    ...sections.flatMap((section) => [section.heading, ...section.paragraphs, ...(section.bullets ?? [])]),
    ...faqs.flatMap((faq) => [faq.question, faq.answer]),
  ].join("\n");
  const nearMeBodyText = [
    ...sections.flatMap((section) => [...section.paragraphs, ...(section.bullets ?? [])]),
    ...faqs.map((faq) => faq.answer),
  ].join("\n");

  return {
    path,
    contentAngle: angle,
    contentVersion: CONTENT_VERSION,
    title,
    h1,
    description,
    intro: snippet.intro,
    explanation: `${second?.paragraphs.join(" ") ?? ""} ${service.description}`.trim(),
    sections,
    faqs,
    directAnswer,
    sources: knowledge.sources,
    checklist,
    wordCount: wordCount(bodyText),
    nearMeMentions: (nearMeBodyText.match(/near me/gi) ?? []).length,
  };
}
