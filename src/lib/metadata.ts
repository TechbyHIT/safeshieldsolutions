import type { Metadata } from "next";
import { site } from "@/config/site";
import { seoDefaults } from "@/config/seo";
import type { PageIndexabilityInput } from "@/lib/indexability";
import { truncate, titleCase } from "@/lib/slug";
import {
  buildAreaServiceKeywords,
} from "@/lib/seo-keywords";

export interface MetadataInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
  indexability?: PageIndexabilityInput;
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
  const title = truncate(input.title, seoDefaults.maxTitleLength);
  const description = truncate(input.description, seoDefaults.maxDescriptionLength);
  const canonical = buildCanonicalUrl(input.path);
  const ogImage = input.ogImage ?? seoDefaults.ogImage;

  return {
    title,
    description,
    keywords: [...(input.keywords ?? seoDefaults.defaultKeywords)],
    alternates: { canonical },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: site.name,
      locale: site.locale,
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
  return buildPageMetadata({
    title: `${serviceName} Near Me | Installation, Price & Dealers`,
    description: truncate(
      `${serviceDescription} ${serviceName} near me — free site survey, installation, price per sq ft, dealers & premium options. SafeShield Solutions across Chennai, Hyderabad, Coimbatore & Kochi.`,
      seoDefaults.maxDescriptionLength,
    ),
    path: `/services/${serviceSlug}`,
    keywords: [serviceName, "installation", "Hyderabad", "Chennai"],
    ogImage: `/images/${serviceSlug}.svg`,
  });
}

function highIntentTitlePart(intentLabel?: string): string {
  if (!intentLabel || intentLabel === "general") {
    return "Near Me | Free Survey";
  }
  const label = intentLabel.toLowerCase().replace(/-/g, " ");
  if (label.includes("near me") || label === "nearby") return "Near Me | Free Survey";
  if (label.includes("install")) return "Installation | Same-Day Quote";
  if (label.includes("price") || label.includes("cost")) return "Price | Free Quotation";
  if (label.includes("dealer")) return "Dealers Near Me | Direct Install";
  if (label.includes("contractor")) return "Contractors | Verified Crew";
  if (label.includes("quote") || label.includes("quotation")) return "Quotation | Itemised BOQ";
  if (label.includes("best") || label.includes("top")) return "Best Rated | SS304 Spec";
  if (label.includes("premium")) return "Premium | Factory Direct";
  if (label.includes("affordable")) return "Affordable | No Hidden Charges";
  if (label.includes("free survey")) return "Free Site Survey | Book Now";
  if (label.includes("same day")) return "Same-Day Survey | Fast Install";
  if (label.includes("supplier") || label.includes("manufacturer")) {
    return "Suppliers & Manufacturers | Direct";
  }
  if (label.includes("repair") || label.includes("maintenance")) return "Repair & Service";
  return titleCase(label);
}

function highIntentDescriptionLead(
  serviceLower: string,
  place: string,
  intentLabel?: string,
): string {
  if (!intentLabel || intentLabel === "general") {
    return `${serviceLower} near me in ${place} — free site survey, dealers, installation & price quote.`;
  }
  const label = intentLabel.toLowerCase().replace(/-/g, " ");
  if (label.includes("near")) {
    return `${serviceLower} near me in ${place} — local installers, free survey, SS304 & UV-stable materials.`;
  }
  if (label.includes("price") || label.includes("cost")) {
    return `${serviceLower} price in ${place} — itemised quotation, dealers comparison, GST-inclusive scope.`;
  }
  if (label.includes("install")) {
    return `${serviceLower} installation in ${place} — trained crew, society NOC support, 5-year warranty.`;
  }
  if (label.includes("dealer") || label.includes("contractor") || label.includes("company")) {
    return `${serviceLower} dealers & contractors in ${place} — manufacturer-direct install, no middleman markup.`;
  }
  return `${serviceLower} ${label} in ${place} — SafeShield Solutions, free survey, premium materials.`;
}

export function buildCityServiceMetadata(
  serviceName: string,
  cityName: string,
  citySlug: string,
  pageSlug: string,
  intentLabel?: string,
  canonicalServiceSlug?: string,
): Metadata {
  const intent =
    intentLabel && intentLabel !== "general" ? ` ${intentLabel.replace(/-/g, " ")}` : "";
  const serviceSlug = canonicalServiceSlug ?? pageSlug;
  const titlePart = highIntentTitlePart(intentLabel);
  return buildPageMetadata({
    title: `${serviceName}${intent} in ${cityName} | ${titlePart}`,
    description: truncate(
      `${highIntentDescriptionLead(serviceName.toLowerCase(), cityName, intentLabel)} SafeShield Solutions — SS304, 5-year warranty. Call for same-day quote.`,
      seoDefaults.maxDescriptionLength,
    ),
    path: `/${citySlug}/${pageSlug}`,
    keywords: [serviceName, cityName, `${serviceName} ${cityName}`, "installation", cityName],
    ogImage: `/images/${serviceSlug}.svg`,
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
  const intent =
    intentLabel && intentLabel !== "general" ? ` ${intentLabel.replace(/-/g, " ")}` : "";
  const serviceSlug = canonicalServiceSlug ?? pageSlug;
  const titlePart = highIntentTitlePart(intentLabel);
  return buildPageMetadata({
    title: `${serviceName}${intent} in ${areaName}, ${cityName} | ${titlePart}`,
    description: truncate(
      `${highIntentDescriptionLead(serviceName.toLowerCase(), `${areaName}, ${cityName}`, intentLabel)} Dealers, installation, premium options — SafeShield Solutions.`,
      seoDefaults.maxDescriptionLength,
    ),
    path: `/${citySlug}/${areaSlug}/${pageSlug}`,
    keywords: buildAreaServiceKeywords({
      serviceSlug,
      serviceName,
      areaName,
      cityName,
    }),
    ogImage: `/images/${serviceSlug}.svg`,
  });
}
