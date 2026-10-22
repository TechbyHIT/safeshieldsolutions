import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getLocality,
  getIndexableLocalitiesForCity,
  LOCALITY_SERVICE_SLUGS,
} from "@/data/cg-hierarchy";
import { raipurAreaFaqs } from "@/config/raipur-seo";
import { getCgPlace } from "@/data/cg-local-seo";
import { getSeoService } from "@/data/seo-services";
import { buildPageMetadata } from "@/lib/metadata";
import { buildSearchSnippet } from "@/lib/search-snippets";
import { evaluateSeoPath } from "@/lib/seo-quality-gate";
import { enforceIndexablePath } from "@/lib/seo-enforce";
import { routes } from "@/config/routes";
import { business } from "@/config/business";
import { getHeroPhoto } from "@/config/photo-catalog";
import { buildBreadcrumbSchema, buildFaqSchema, buildLocalBusinessSchema } from "@/lib/schema";

import { generateLocalityHubStaticParams } from "@/lib/ssg-priority";

export const revalidate = 86400;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ city: string; area: string }>;
}

export function generateStaticParams() {
  return generateLocalityHubStaticParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city, area } = await params;
  const locality = getLocality(city, area);
  const place = getCgPlace(city);
  if (!locality?.serviceAvailable || !place) notFound();
  const path = `/chhattisgarh/${city}/areas/${area}`;
  enforceIndexablePath(path);
  const gate = evaluateSeoPath(path);
  const snippet = buildSearchSnippet({
    kind: "locality",
    areaName: locality.name,
    placeName: place.name,
    placeSlug: place.slug,
    summary: locality.localContent,
  });
  return buildPageMetadata({
    title: snippet.title,
    description: snippet.description,
    keywords: [`balcony safety in ${locality.name}`, `${locality.name}, ${place.name}`, "SafeShield Solutions"],
    path,
    canonicalPath: gate.canonicalPath,
    robots: { index: gate.index, follow: true },
  });
}

export default async function LocalityHubPage({ params }: PageProps) {
  const { city, area } = await params;
  if (city === "raipur" && area === "atal-nagar") {
    permanentRedirect("/chhattisgarh/raipur/areas/naya-raipur");
  }
  const path = `/chhattisgarh/${city}/areas/${area}`;
  enforceIndexablePath(path);
  const locality = getLocality(city, area);
  const place = getCgPlace(city);
  if (!locality?.serviceAvailable || !place) notFound();
  const services = LOCALITY_SERVICE_SLUGS.map((slug) => getSeoService(slug)).filter(
    (service): service is NonNullable<typeof service> => Boolean(service),
  );
  const allAreas = getIndexableLocalitiesForCity(city).filter((item) => item.slug !== area);
  const nearbyNamed = allAreas.filter((item) => locality.nearby.includes(item.slug));
  const nearbyAreas = [...nearbyNamed, ...allAreas.filter((item) => !locality.nearby.includes(item.slug))].slice(
    0,
    8,
  );
  const faqs = [
    ...raipurAreaFaqs(locality.name, locality.slug, "balcony safety"),
    {
      question: `Which fittings are surveyed in ${locality.name}?`,
      answer: `Invisible grills, balcony safety nets, pigeon nets, and bird spikes have their own pages for ${locality.name}. Other fittings are quoted from the ${place.name} service page after a site visit.`,
    },
  ];
  const snippet = buildSearchSnippet({
    kind: "locality",
    areaName: locality.name,
    placeName: place.name,
    placeSlug: place.slug,
    summary: locality.localContent,
  });
  const breadcrumbs = [
    { name: "Home", url: routes.home },
    { name: "Chhattisgarh", url: "/chhattisgarh" },
    { name: place.name, url: `/chhattisgarh/${city}` },
    { name: locality.name, url: path },
  ];

  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema(breadcrumbs),
          buildLocalBusinessSchema(place.name, locality.name),
          buildFaqSchema(faqs),
        ]}
      />
      <PageHero
        eyebrow={`${locality.name}, ${place.name}`}
        title={snippet.h1}
        description={snippet.description}
        photo={getHeroPhoto()}
        breadcrumbs={breadcrumbs.map((item) => ({ label: item.name, href: item.url }))}
      />
      <Section>
        <div className="max-w-3xl space-y-8">
          <p className="text-neutral-700">{snippet.intro}</p>
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">Openings in {locality.name}</h2>
            <p className="mt-3 text-neutral-700">{locality.localContent}</p>
            <p className="mt-3 text-neutral-700">
              A grill or net is an added layer. It does not replace a sound railing or supervision.
              SS304 is the standard grill cable. SS316 is specified only when corrosion exposure is
              higher. Nets are chosen by use — fall protection, birds, or insects — after the opening
              is measured.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">
              {city === "raipur" ? `Services in ${locality.name}, Raipur` : `Services in ${locality.name}`}
            </h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/chhattisgarh/${city}/areas/${area}/${service.slug}`}
                    className="font-medium text-brand-700 hover:underline"
                  >
                    {service.name} in {locality.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-neutral-600">
              Citywide pages:{" "}
              <Link href={`/chhattisgarh/${city}/invisible-grills`} className="text-brand-700 hover:underline">
                invisible grills in {place.name}
              </Link>
              {" · "}
              <Link href={`/chhattisgarh/${city}/safety-nets`} className="text-brand-700 hover:underline">
                safety nets in {place.name}
              </Link>
              {" · "}
              <Link href={`/chhattisgarh/${city}/pigeon-safety-nets`} className="text-brand-700 hover:underline">
                pigeon nets in {place.name}
              </Link>
            </p>
          </div>
          {nearbyAreas.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Nearby {place.name} areas</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {nearbyAreas.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/chhattisgarh/${city}/areas/${item.slug}`}
                      className="rounded-full border border-neutral-200 px-3 py-1.5 text-sm text-brand-800 hover:border-brand-500"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <dl className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-neutral-200 bg-neutral-50 p-5">
                <dt className="font-semibold text-neutral-900">{faq.question}</dt>
                <dd className="mt-2 text-sm text-neutral-700">{faq.answer}</dd>
              </div>
            ))}
          </dl>
          <p className="text-sm text-neutral-600">
            Measurement is still done on site.{" "}
            <a href={`tel:${business.phone.replace(/\s/g, "")}`} className="font-medium text-brand-800 hover:underline">
              Call {business.phone}
            </a>
            {" · "}
            <Link href={routes.contact} className="text-brand-700 hover:underline">
              Request a written quote
            </Link>
          </p>
        </div>
      </Section>
    </>
  );
}
