import { business } from "@/config/business";
import { site } from "@/config/site";
import { buildCanonicalUrl } from "@/lib/metadata";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: business.name,
    legalName: business.legalName,
    url: site.url,
    logo: buildCanonicalUrl("/images/logo.png"),
    description: business.description,
    telephone: business.phone,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.pincode,
      addressCountry: business.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    sameAs: Object.values(business.social),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: business.trustSignals.rating,
      reviewCount: business.trustSignals.reviewCount,
    },
  };
}

export function buildLocalBusinessSchema(cityName?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: business.name,
    image: buildCanonicalUrl("/images/photos/balcony-invisible-grills/01.png"),
    url: site.url,
    telephone: business.phone,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: cityName ?? business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.pincode,
      addressCountry: business.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
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
    areaServed: business.serviceAreas.map((area) => ({
      "@type": "City",
      name: area,
    })),
  };
}

export function buildServiceSchema(
  serviceName: string,
  serviceDescription: string,
  path: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: serviceDescription,
    provider: {
      "@type": "Organization",
      name: business.name,
      url: site.url,
    },
    areaServed: business.serviceAreas.map((area) => ({
      "@type": "City",
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

export function buildFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
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
    name: site.name,
    url: site.url,
    inLanguage: site.locale,
    publisher: {
      "@type": "Organization",
      name: business.name,
      url: site.url,
    },
  };
}

export function buildWebPageSchema(title: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: buildCanonicalUrl(path),
    isPartOf: {
      "@type": "WebSite",
      name: site.name,
      url: site.url,
    },
  };
}
