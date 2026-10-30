import type { Metadata } from "next";
import { site } from "@/config/site";
import { seoDefaults } from "@/config/seo";
import {
  isPageIndexable,
  type PageIndexabilityInput,
} from "@/lib/indexability";
import { buildAreaServiceKeywords } from "@/lib/seo-keywords";
import { buildKeywordPlan } from "@/lib/keyword-targeting";
import { evaluateSeoPath } from "@/lib/seo-quality-gate";
import { languageAlternates } from "@/lib/technical-seo";
import { getHeroPhoto, getServiceOgImage } from "@/config/photo-catalog";
import { buildSearchSnippet, fitDescription, fitTitle, stripMetaText } from "@/lib/search-snippets";

export interface MetadataInput {
  title: string;
  description: string;
  path: string;
  /** When set, this is the single indexable URL for the intent. */
  canonicalPath?: string;
  keywords?: string[];
  ogImage?: string;
  indexability?: PageIndexabilityInput;
  robots?: {
    index?: boolean;
    follow?: boolean;
  };
}

export function buildCanonicalUrl(path: string): string {
  let base = site.url.replace(/\/$/, "");
  if (base.startsWith("http://")) {
    base = `https://${base.slice("http://".length)}`;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function buildPageMetadata(input: MetadataInput): Metadata {
  const title = fitTitle(stripMetaText(input.title), seoDefaults.maxTitleLength);
  const description = fitDescription(stripMetaText(input.description), seoDefaults.maxDescriptionLength);
  const canonical = buildCanonicalUrl(input.canonicalPath ?? input.path);
  const ogImage = input.ogImage ?? getHeroPhoto().src;
  const follow = input.robots?.follow ?? true;
  const indexableFromRules =
    input.indexability === undefined
      ? true
      : isPageIndexable(input.indexability).indexable;
  const index = input.robots?.index ?? indexableFromRules;

  return {
    title,
    description,
    keywords: [...(input.keywords ?? seoDefaults.defaultKeywords)],
    alternates: {
      canonical,
      languages: languageAlternates(canonical),
    },
    robots: {
      index,
      follow,
      googleBot: index
        ? {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          }
        : { index: false, follow },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: site.name,
      locale: site.ogLocale,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function buildServiceMetadata(
  serviceName: string,
  serviceDescription: string,
  serviceSlug: string,
): Metadata {
  const path = `/services/${serviceSlug}`;
  const plan = buildKeywordPlan({ serviceSlug, serviceName, path });
  const snippet = buildSearchSnippet({
    kind: "service",
    serviceName,
    serviceSlug,
    serviceDescription,
  });
  return buildPageMetadata({
    title: snippet.title,
    description: snippet.description,
    path,
    keywords: plan.metaKeywords,
    ogImage: getServiceOgImage(serviceSlug),
  });
}

export function buildCityServiceMetadata(
  serviceName: string,
  cityName: string,
  citySlug: string,
  pageSlug: string,
  intentLabel?: string,
  canonicalServiceSlug?: string,
): Metadata {
  const serviceSlug = canonicalServiceSlug ?? pageSlug;
  const path = `/${citySlug}/${pageSlug}`;
  const nearMe = Boolean(intentLabel && /near me/i.test(intentLabel));
  const plan = buildKeywordPlan({
    serviceSlug,
    serviceName,
    path,
    placeName: cityName,
    placeSlug: citySlug === "chhattisgarh" ? undefined : citySlug,
    intentLabel,
  });
  const snippet = buildSearchSnippet({
    kind:
      citySlug === "chhattisgarh" && !nearMe
        ? "state-service"
        : nearMe
          ? "place-service-near-me"
          : "place-service",
    serviceName,
    serviceSlug,
    placeName: cityName,
    placeSlug: citySlug === "chhattisgarh" ? undefined : citySlug,
  });
  return buildPageMetadata({
    title: snippet.title,
    description: snippet.description,
    path,
    keywords: plan.metaKeywords,
    ogImage: getServiceOgImage(serviceSlug),
    ...seoRobotsForPath(path),
  });
}

export function buildAreaServiceMetadata(
  serviceName: string,
  areaName: string,
  cityName: string,
  citySlug: string,
  areaSlug: string,
  pageSlug: string,
  intentLabel?: string,
  canonicalServiceSlug?: string,
): Metadata {
  const serviceSlug = canonicalServiceSlug ?? pageSlug;
  const snippet = buildSearchSnippet({
    kind: intentLabel && /near me/i.test(intentLabel) ? "place-service-near-me" : "locality-service",
    serviceName,
    serviceSlug,
    placeName: cityName,
    placeSlug: citySlug === "chhattisgarh" ? areaSlug : citySlug,
    areaName,
  });
  return buildPageMetadata({
    title: snippet.title,
    description: snippet.description,
    path: `/${citySlug}/${areaSlug}/${pageSlug}`,
    keywords: buildAreaServiceKeywords({
      serviceSlug,
      serviceName,
      areaName,
      cityName,
      citySlug,
      areaSlug,
    }),
    ogImage: getServiceOgImage(serviceSlug),
    ...seoRobotsForPath(`/${citySlug}/${areaSlug}/${pageSlug}`),
  });
}

function seoRobotsForPath(path: string): {
  canonicalPath: string;
  robots: { index: boolean; follow: boolean };
} {
  const gate = evaluateSeoPath(path);
  return {
    canonicalPath: gate.canonicalPath,
    robots: { index: gate.index, follow: true },
  };
}
