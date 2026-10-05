import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLocality, getDistrictForCity, LOCALITY_SERVICE_SLUGS } from "@/data/cg-hierarchy";
import { getCgPlace } from "@/data/cg-local-seo";
import { getSeoService } from "@/data/seo-services";
import { buildPageMetadata } from "@/lib/metadata";
import { evaluateSeoPath } from "@/lib/seo-quality-gate";
import { enforceIndexablePath } from "@/lib/seo-enforce";
import { routes } from "@/config/routes";
import { business } from "@/config/business";
import { getHeroPhoto } from "@/config/photo-catalog";
import { buildBreadcrumbSchema, buildLocalBusinessSchema } from "@/lib/schema";

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
  return buildPageMetadata({
    title: `Invisible grills and safety nets in ${locality.name}, ${place.name}`,
    description: locality.localContent,
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
  const district = getDistrictForCity(city);
  if (!locality?.serviceAvailable || !place) notFound();
  const services = LOCALITY_SERVICE_SLUGS.map((slug) => getSeoService(slug)).filter(
    (service): service is NonNullable<typeof service> => Boolean(service),
  );
  const breadcrumbs = [
    { name: "Home", url: routes.home },
    { name: "Chhattisgarh", url: "/chhattisgarh" },
    { name: place.name, url: `/chhattisgarh/${city}` },
    { name: locality.name, url: path },
  ];

  return (
    <>
      <JsonLd data={[buildBreadcrumbSchema(breadcrumbs), buildLocalBusinessSchema(locality.name)]} />
      <PageHero
        eyebrow={`${district?.name ?? "Chhattisgarh"} district`}
        title={`${locality.name}, ${place.name}`}
        description={locality.localContent}
        photo={getHeroPhoto()}
        breadcrumbs={breadcrumbs.map((item) => ({ label: item.name, href: item.url }))}
      />
      <Section>
        <h2 className="text-2xl font-bold text-neutral-900">Services in {locality.name}</h2>
        <ul className="mt-4 space-y-2">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/chhattisgarh/${city}/areas/${area}/${service.slug}`}
                className="text-brand-700 hover:underline"
              >
                {service.name} in {locality.name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-neutral-600">
          Measurement is still done on site.{" "}
          <a href={`tel:${business.phone.replace(/\s/g, "")}`} className="text-brand-700 hover:underline">
            Call {business.phone}
          </a>
        </p>
      </Section>
    </>
  );
}
