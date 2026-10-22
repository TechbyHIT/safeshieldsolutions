import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getIndexableLocalitiesForCity,
  getLocality,
  LOCALITY_SERVICE_SLUGS,
} from "@/data/cg-hierarchy";
import { raipurAreaFaqs, raipurAreaSections } from "@/config/raipur-seo";
import { getCgPlace } from "@/data/cg-local-seo";
import { getSeoService } from "@/data/seo-services";
import { buildPageMetadata } from "@/lib/metadata";
import { buildKeywordPlan } from "@/lib/keyword-targeting";
import { buildSearchSnippet } from "@/lib/search-snippets";
import { evaluateSeoPath } from "@/lib/seo-quality-gate";
import { enforceIndexablePath } from "@/lib/seo-enforce";
import { routes } from "@/config/routes";
import { business } from "@/config/business";
import { getPrimaryServicePhoto } from "@/config/photo-catalog";
import { buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from "@/lib/schema";

import { generateLocalityServiceStaticParams } from "@/lib/ssg-priority";

export const revalidate = 86400;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ city: string; area: string; service: string }>;
}

export function generateStaticParams() {
  return generateLocalityServiceStaticParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city, area, service } = await params;
  const locality = getLocality(city, area);
  const place = getCgPlace(city);
  const catalogue = getSeoService(service);
  if (!locality?.serviceAvailable || !place || !catalogue) notFound();
  const path = `/chhattisgarh/${city}/areas/${area}/${service}`;
  enforceIndexablePath(path);
  const gate = evaluateSeoPath(path);
  const plan = buildKeywordPlan({
    serviceSlug: catalogue.slug,
    serviceName: catalogue.name,
    path,
    placeName: place.name,
    placeSlug: place.slug,
    areaName: locality.name,
    areaSlug: locality.slug,
  });
  const snippet = buildSearchSnippet({
    kind: "locality-service",
    serviceName: catalogue.name,
    serviceSlug: catalogue.slug,
    serviceDescription: catalogue.description,
    placeName: place.name,
    placeSlug: place.slug,
    areaName: locality.name,
    summary: locality.localContent,
  });
  return buildPageMetadata({
    title: snippet.title,
    description: snippet.description,
    path,
    canonicalPath: gate.canonicalPath,
    robots: { index: gate.index, follow: true },
    keywords: plan.metaKeywords,
  });
}

export default async function LocalityServicePage({ params }: PageProps) {
  const { city, area, service } = await params;
  if (city === "raipur" && area === "atal-nagar") {
    permanentRedirect(`/chhattisgarh/raipur/areas/naya-raipur/${service}`);
  }
  if (service === "pigeon-nets") {
    permanentRedirect(`/chhattisgarh/${city}/areas/${area}/pigeon-safety-nets`);
  }
  const path = `/chhattisgarh/${city}/areas/${area}/${service}`;
  enforceIndexablePath(path);
  const locality = getLocality(city, area);
  const place = getCgPlace(city);
  const catalogue = getSeoService(service);
  if (
    !locality?.serviceAvailable ||
    !place ||
    !catalogue ||
    !LOCALITY_SERVICE_SLUGS.includes(service as (typeof LOCALITY_SERVICE_SLUGS)[number])
  ) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", url: routes.home },
    { name: "Chhattisgarh", url: "/chhattisgarh" },
    { name: place.name, url: `/chhattisgarh/${city}` },
    { name: locality.name, url: `/chhattisgarh/${city}/areas/${area}` },
    { name: catalogue.name, url: path },
  ];
  const nearbyAreas = getIndexableLocalitiesForCity(city)
    .filter((item) => item.slug !== area && locality.nearby.includes(item.slug))
    .slice(0, 6);
  const faqs = [
    ...raipurAreaFaqs(locality.name, locality.slug, catalogue.name.toLowerCase()),
    {
      question: `Do you install ${catalogue.name.toLowerCase()} in ${locality.name}?`,
      answer: `Yes, after a site measurement in ${locality.name}, ${place.name}. ${locality.localContent}`,
    },
    {
      question: `What changes the ${catalogue.name.toLowerCase()} quote in ${locality.name}?`,
      answer: `Width, height, access, fixing surface, and how many openings are in one visit. No rate is published for ${locality.name}.`,
    },
  ];
  const snippet = buildSearchSnippet({
    kind: "locality-service",
    serviceName: catalogue.name,
    serviceSlug: catalogue.slug,
    serviceDescription: catalogue.description,
    placeName: place.name,
    placeSlug: place.slug,
    areaName: locality.name,
    summary: locality.localContent,
  });
  const extraSections = raipurAreaSections(locality.name, locality.slug, catalogue.name, catalogue.name.toLowerCase());
  const body =
    catalogue.slug === "bird-spikes"
      ? `In ${locality.name}, bird spikes are used on parapets, AC hoods, and ledges — not as a substitute for a balcony net. ${locality.localContent}`
      : `In ${locality.name}, ${place.name}, the usual openings are balconies and windows on houses and apartments. SS304 is the standard grill cable. SS316 is specified only when corrosion exposure is higher. Nets are nylon or HDPE, chosen after the opening is measured. A grill or net does not replace a sound railing.`;

  return (
    <>
      <JsonLd
        data={[
          buildServiceSchema(catalogue.name, catalogue.description, path),
          buildBreadcrumbSchema(breadcrumbs),
          buildFaqSchema(faqs),
        ]}
      />
      <PageHero
        eyebrow={`${locality.name}, ${place.name}`}
        title={snippet.h1}
        description={snippet.description}
        photo={getPrimaryServicePhoto(catalogue.slug)}
        breadcrumbs={breadcrumbs.map((item) => ({ label: item.name, href: item.url }))}
      />
      <Section>
        <div className="max-w-3xl space-y-4 text-neutral-700">
          <p>{snippet.intro}</p>
          <p>{catalogue.description}</p>
          <p>{body}</p>
          {extraSections.map((section) => (
            <article key={section.id}>
              <h2 className="text-xl font-bold text-neutral-900">{section.heading}</h2>
              <p className="mt-3">{section.body}</p>
            </article>
          ))}
          <p>
            The quote depends on width, height, access, and the fixing surface in {locality.name}. No
            rate is published for this locality.
          </p>
        </div>
        {nearbyAreas.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-neutral-900">Nearby {place.name} areas</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {nearbyAreas.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/chhattisgarh/${city}/areas/${item.slug}/${service}`}
                    className="rounded-full border border-neutral-200 px-3 py-1.5 text-sm text-brand-800 hover:border-brand-500"
                  >
                    {catalogue.name} in {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <p className="mt-6">
          <Link href={`/chhattisgarh/${city}/areas/${area}`} className="text-brand-700 hover:underline">
            All fittings in {locality.name}
          </Link>
          {" · "}
          <Link href={`/chhattisgarh/${city}/${service}`} className="text-brand-700 hover:underline">
            {catalogue.name} across {place.name}
          </Link>
          {" · "}
          <Link
            href={`/chhattisgarh/${city}/${service}-near-me`}
            className="text-brand-700 hover:underline"
          >
            {catalogue.name} near me in {place.name}
          </Link>
        </p>
        <dl className="mt-8 max-w-3xl space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-xl border border-neutral-200 bg-neutral-50 p-5">
              <dt className="font-semibold text-neutral-900">{faq.question}</dt>
              <dd className="mt-2 text-sm text-neutral-700">{faq.answer}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm">
          <a href={`tel:${business.phone.replace(/\s/g, "")}`} className="font-medium text-brand-800">
            Call {business.phone}
          </a>
          {" · "}
          <Link href={routes.contact} className="text-brand-700 hover:underline">
            Request a measurement
          </Link>
        </p>
      </Section>
    </>
  );
}
