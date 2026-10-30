import { business } from "@/config/business";
import { site } from "@/config/site";
import { TOPIC_CLUSTERS, entityId } from "@/lib/entity-seo";
import { buildCanonicalUrl } from "@/lib/metadata";
import { videoObjectSchema, type EligibleVideo } from "@/lib/media-seo";
import { SEO_CONTENT_UPDATED_ISO } from "@/lib/seo-freshness";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": entityId("organization"),
    name: business.name,
    knowsAbout: TOPIC_CLUSTERS.map((cluster) => cluster.name),
    legalName: business.legalName,
    url: site.url,
    logo: buildCanonicalUrl("/images/logo.png"),
    description: business.description,
    telephone: business.phone,
    email: business.email,
    areaServed: { "@type": "State", name: "Chhattisgarh" },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: business.phone,
        email: business.email,
        areaServed: "IN-CT",
        availableLanguage: ["English", "Hindi"],
      },
    ],
    sameAs: Object.values(business.social),
  };
}

export function buildLocalBusinessSchema(areaServedName?: string, neighborhood?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${site.url.replace(/\/$/, "")}/#local-business`,
    parentOrganization: { "@id": entityId("organization") },
    name: business.name,
    image: buildCanonicalUrl("/images/photos/balcony-invisible-grills/168.webp"),
    url: site.url,
    telephone: business.phone,
    priceRange: "₹₹",
    areaServed: [
      { "@type": "State", name: "Chhattisgarh" },
      ...(areaServedName ? [{ "@type": "City", name: areaServedName }] : []),
      ...(neighborhood ? [{ "@type": "Place", name: neighborhood }] : []),
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Invisible grills, safety nets and home safety installation",
      itemListElement: [
        "Invisible Grills",
        "Balcony Safety Nets",
        "Pigeon Safety Nets",
        "Child Safety Nets",
        "Bird Spikes",
        "Mosquito Nets",
        "Cloth Hangers",
        "Staircase Invisible Grills",
        "Monkey Safety Nets",
        "Shade Nets",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name,
          provider: { "@id": entityId("organization") },
          areaServed: { "@type": "State", name: "Chhattisgarh" },
        },
      })),
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "18:00",
      },
    ],
  };
}

export function buildServiceSchema(
  serviceName: string,
  serviceDescription: string,
  path: string,
  serviceType = "Home installation",
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${buildCanonicalUrl(path)}#service`,
    name: serviceName,
    serviceType,
    description: serviceDescription,
    provider: { "@id": entityId("organization") },
    areaServed: business.serviceAreas.map((area) => ({
      "@type": "State",
      name: area,
    })),
    url: buildCanonicalUrl(path),
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: buildCanonicalUrl(item.url),
    })),
  };
}

export function buildFaqSchema(faqs: { question: string; answer: string }[], description?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(description ? { description } : {}),
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      text: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url.replace(/\/$/, "")}/#website`,
    name: site.name,
    url: site.url,
    description: business.description,
    inLanguage: site.locale,
    publisher: { "@id": entityId("organization") },
  };
}

export function buildWebPageSchema(
  title: string,
  description: string,
  path: string,
  dateModified: string = SEO_CONTENT_UPDATED_ISO,
) {
  const url = buildCanonicalUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: title,
    description,
    url,
    inLanguage: site.locale,
    dateModified,
    isPartOf: { "@id": `${site.url.replace(/\/$/, "")}/#website` },
    about: { "@id": entityId("organization") },
    author: { "@id": entityId("organization") },
    publisher: { "@id": entityId("organization") },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[data-speakable]"],
    },
  };
}

export function buildArticleSchema(input: {
  kind: "Article" | "BlogPosting";
  headline: string;
  description: string;
  path: string;
  datePublished?: string;
  image?: string;
}) {
  if (input.kind === "BlogPosting" && !input.datePublished) return null;
  const url = buildCanonicalUrl(input.path);
  return {
    "@context": "https://schema.org",
    "@type": input.kind,
    "@id": `${url}#article`,
    headline: input.headline,
    name: input.headline,
    description: input.description,
    mainEntityOfPage: url,
    author: { "@id": entityId("organization") },
    publisher: { "@id": entityId("organization") },
    ...(input.datePublished
      ? { datePublished: input.datePublished, dateModified: input.datePublished }
      : {}),
    ...(input.image
      ? { image: input.image.startsWith("http") ? input.image : buildCanonicalUrl(input.image) }
      : {}),
  };
}

/** A product needs a public offer. Catalogue services stay Service records. */
export function buildProductSchema(input: { name: string; price?: string; path: string }) {
  if (!input.price) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    offers: {
      "@type": "Offer",
      price: input.price,
      priceCurrency: "INR",
      url: buildCanonicalUrl(input.path),
    },
  };
}

export function buildVideoObjectSchema(video: EligibleVideo) {
  return videoObjectSchema(video);
}

export function buildEventSchema(input: { name?: string; startDate?: string; location?: string }) {
  if (!input.name || !input.startDate || !input.location) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: input.name,
    startDate: input.startDate,
    location: input.location,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
  };
}

export function buildJobPostingSchema(input: { title?: string; description?: string; datePosted?: string }) {
  if (!input.title || !input.description || !input.datePosted) return null;
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: input.title,
    description: input.description,
    datePosted: input.datePosted,
    hiringOrganization: { "@id": entityId("organization") },
  };
}

export function buildRecipeSchema(input: { name?: string; recipeIngredient?: string[] }) {
  if (!input.name || !input.recipeIngredient?.length) return null;
  return null;
}

export function buildCourseSchema(input: { name?: string; description?: string }) {
  if (!input.name || !input.description) return null;
  return null;
}
