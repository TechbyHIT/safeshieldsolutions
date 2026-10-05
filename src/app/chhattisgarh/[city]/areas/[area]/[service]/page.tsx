import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getLocality,
  LOCALITY_SERVICE_SLUGS,
} from "@/data/cg-hierarchy";
import { getCgPlace } from "@/data/cg-local-seo";
import { getSeoService } from "@/data/seo-services";
import { buildPageMetadata } from "@/lib/metadata";
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
  return buildPageMetadata({
    title: `${catalogue.name} in ${locality.name}, ${place.name}`,
    description: `${catalogue.name} for balconies and windows in ${locality.name}, ${place.name}. ${locality.localContent}`,
    path,
    canonicalPath: gate.canonicalPath,
    robots: { index: gate.index, follow: true },
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
  const faqs = [
    {
      question: `Do you install ${catalogue.name.toLowerCase()} in ${locality.name}?`,
      answer: `Yes, after a site measurement. ${locality.localContent}`,
    },
    {
      question: "Is the quote published here?",
      answer: `No. Width, height, access, and the fixing surface in ${locality.name} change the written quote.`,
    },
  ];
  const body =
    catalogue.slug === "bird-spikes"
      ? `In ${locality.name}, bird spikes are used on parapets, AC hoods, and ledges — not as a substitute for a balcony net. ${locality.localContent}`
      : `In ${locality.name}, the usual openings are balconies and windows on houses and apartments. SS304 is the standard grill cable. SS316 is specified only when corrosion exposure is higher. Nets are nylon or HDPE, chosen after the opening is measured. A grill or net does not replace a sound railing.`;

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
        title={`${catalogue.name} in ${locality.name}, ${place.name}`}
        description={locality.localContent}
        photo={getPrimaryServicePhoto(catalogue.slug)}
        breadcrumbs={breadcrumbs.map((item) => ({ label: item.name, href: item.url }))}
      />
      <Section>
        <div className="max-w-3xl space-y-4 text-neutral-700">
          <p>{catalogue.description}</p>
          <p>{body}</p>
          <p>
            The quote depends on width, height, access, and the fixing surface in {locality.name}. No
            rate is published for this locality.
          </p>
        </div>
        <p className="mt-6">
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
        <p className="mt-3 text-sm">
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
