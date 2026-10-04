import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import {
  getLocality,
  LOCALITY_SERVICE_SLUGS,
} from "@/data/cg-hierarchy";
import { getCgPlace } from "@/data/cg-local-seo";
import { getSeoService } from "@/data/seo-services";
import { buildPageMetadata } from "@/lib/metadata";
import { evaluateSeoPath } from "@/lib/seo-quality-gate";
import { routes } from "@/config/routes";
import { business } from "@/config/business";
import { getPrimaryServicePhoto } from "@/config/photo-catalog";

interface PageProps {
  params: Promise<{ city: string; area: string; service: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city, area, service } = await params;
  const locality = getLocality(city, area);
  const place = getCgPlace(city);
  const catalogue = getSeoService(service);
  if (!locality?.serviceAvailable || !place || !catalogue) notFound();
  const path = `/chhattisgarh/${city}/areas/${area}/${service}`;
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

  return (
    <>
      <PageHero
        eyebrow={`${locality.name}, ${place.name}`}
        title={`${catalogue.name} in ${locality.name}, ${place.name}`}
        description={locality.localContent}
        photo={getPrimaryServicePhoto(catalogue.slug)}
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Chhattisgarh", href: "/chhattisgarh" },
          { label: place.name, href: `/chhattisgarh/${city}` },
          { label: locality.name, href: `/chhattisgarh/${city}/areas/${area}` },
          { label: catalogue.name },
        ]}
      />
      <Section>
        <div className="max-w-3xl space-y-4 text-neutral-700">
          <p>{catalogue.description}</p>
          <p>
            In {locality.name}, the usual openings are balconies and windows on houses and
            apartments. SS304 is the standard grill cable. SS316 is specified only when corrosion
            exposure is higher. Nets are nylon or HDPE, chosen after the opening is measured. A grill
            or net does not replace a sound railing.
          </p>
          <p>
            The quote depends on width, height, access, and the fixing surface in {locality.name}. No
            rate is published for this locality.
          </p>
        </div>
        <p className="mt-6">
          <Link href={`/chhattisgarh/${city}/${service}`} className="text-brand-700 hover:underline">
            {catalogue.name} across {place.name}
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
