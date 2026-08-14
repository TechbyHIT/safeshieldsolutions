import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { PageContentRenderer } from "@/components/content/PageContentRenderer";
import { RelatedLinks } from "@/components/content/RelatedLinks";
import { ServicePhotoGallery, ServicePhotoSidebar } from "@/components/content/ServicePhotos";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/layout/PageHero";
import { getPrimaryServicePhoto } from "@/config/photo-catalog";
import {
  buildCityServiceContent,
  buildAreaServiceContent,
} from "@/lib/content";
import {
  buildCityServiceMetadata,
  buildAreaServiceMetadata,
} from "@/lib/metadata";
import {
  buildCityServiceBreadcrumbs,
  buildAreaServiceBreadcrumbs,
} from "@/lib/internal-links";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceSchema,
} from "@/lib/schema";
import { getCityConfig } from "@/data/cities";
import { PageInternalLinks } from "@/components/content/PageInternalLinks";
import { buildExploreMoreSection } from "@/lib/build-explore-more";
import { resolveAreaPageSlug } from "@/lib/area-page-slugs";
import { getSeoService } from "@/data/seo-services";
import { titleCase } from "@/lib/slug";
import { noBuildStaticParams } from "@/config/build-static";
import {
  getCityBySlug,
  getAreaBySlugs,
  getServiceBySlug,
  getRelatedCityServicePages,
  getRelatedAreaServicePages,
} from "@/lib/queries";

export const revalidate = 86400;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ city: string; segments: string[] }>;
}

function intentTitlePart(intentLabel: string | undefined): string {
  if (!intentLabel || intentLabel === "general") return "";
  return ` — ${titleCase(intentLabel.replace(/-/g, " "))}`;
}

export function generateStaticParams() {
  return noBuildStaticParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city, segments } = await params;
  const cityData = await getCityBySlug(city);
  if (!cityData || segments.length === 0 || segments.length > 2) notFound();

  if (segments.length === 1) {
    const pageSlug = segments[0]!;
    const resolved = resolveAreaPageSlug(pageSlug);
    const serviceSlug = resolved?.serviceSlug ?? pageSlug;
    const serviceData = await getServiceBySlug(serviceSlug);
    if (!serviceData || (!resolved && !getSeoService(pageSlug))) notFound();
    return buildCityServiceMetadata(
      serviceData.name,
      cityData.name,
      city,
      pageSlug,
      resolved?.intentLabel,
      resolved?.serviceSlug,
    );
  }

  if (segments.length === 2) {
    const areaData = await getAreaBySlugs(city, segments[0]!);
    const resolved = resolveAreaPageSlug(segments[1]!);
    if (!areaData || !resolved) notFound();
    const serviceData = await getServiceBySlug(resolved.serviceSlug);
    if (!serviceData) notFound();
    return buildAreaServiceMetadata(
      serviceData.name,
      areaData.name,
      cityData.name,
      city,
      segments[0]!,
      segments[1]!,
      resolved.intentLabel,
      resolved.serviceSlug,
    );
  }

  notFound();
}

export default async function CitySegmentPage({ params }: PageProps) {
  const { city, segments } = await params;
  const cityData = await getCityBySlug(city);
  if (!cityData || segments.length === 0 || segments.length > 2) notFound();

  if (segments.length === 1) {
    const pageSlug = segments[0]!;
    const resolved = resolveAreaPageSlug(pageSlug);
    const serviceSlug = resolved?.serviceSlug ?? pageSlug;
    const serviceData = await getServiceBySlug(serviceSlug);
    if (!serviceData || (!resolved && !getSeoService(pageSlug))) notFound();

    const content = buildCityServiceContent(
      {
        serviceName: serviceData.name,
        serviceSlug: serviceData.slug,
        serviceDescription: serviceData.description ?? serviceData.name,
        category: serviceData.category,
      },
      {
        locationName: cityData.name,
        locationSlug: cityData.slug,
        locationType: "CITY",
        cityName: cityData.name,
        citySlug: city,
        intentLabel: resolved?.intentLabel,
      },
    );

    const h1 = `${serviceData.name}${intentTitlePart(resolved?.intentLabel)} in ${cityData.name}`;
    const breadcrumbs = buildCityServiceBreadcrumbs(
      cityData.name,
      cityData.slug,
      serviceData.name,
      pageSlug,
    );
    const related = await getRelatedCityServicePages(city, serviceSlug);
    const stateName = getCityConfig(city)?.state ?? "";
    const exploreMore = buildExploreMoreSection({
      pageType: "city-service",
      citySlug: city,
      cityName: cityData.name,
      stateName,
      serviceSlug: serviceData.slug,
      serviceName: serviceData.name,
      pageSlug,
      currentPath: `/${city}/${pageSlug}`,
    });

    return (
      <>
        <JsonLd
          data={[
            buildServiceSchema(
              serviceData.name,
              serviceData.description ?? "",
              `/${city}/${pageSlug}`,
            ),
            buildBreadcrumbSchema(breadcrumbs),
            buildFaqSchema(content.faqs),
          ]}
        />
        <PageHero
          eyebrow={`${cityData.name} service`}
          title={h1}
          description={content.intro}
          photo={getPrimaryServicePhoto(serviceData.slug)}
          breadcrumbs={breadcrumbs.map((b) => ({ label: b.name, href: b.url }))}
        />
        <Section>
          <div className="grid gap-10 lg:grid-cols-2">
            <PageContentRenderer content={content} h1={h1} hideH1 />
            <ServicePhotoSidebar
              serviceSlug={serviceData.slug}
              serviceName={serviceData.name}
            />
          </div>
          <RelatedLinks
            heading={`Other Services in ${cityData.name}`}
            links={related.map((p) => ({
              href: p.path,
              label: p.service?.name ?? p.title,
            }))}
          />
        </Section>
        <PageInternalLinks exploreMore={exploreMore} />
        <ServicePhotoGallery
          serviceSlug={serviceData.slug}
          serviceName={serviceData.name}
          cityName={cityData.name}
        />
      </>
    );
  }

  const areaSlug = segments[0]!;
  const pageSlug = segments[1]!;
  const areaData = await getAreaBySlugs(city, areaSlug);
  const resolved = resolveAreaPageSlug(pageSlug);
  if (!areaData || !resolved) notFound();

  const serviceData = await getServiceBySlug(resolved.serviceSlug);
  if (!serviceData) notFound();

  const content = buildAreaServiceContent(
    {
      serviceName: serviceData.name,
      serviceSlug: serviceData.slug,
      serviceDescription: serviceData.description ?? serviceData.name,
      category: serviceData.category,
    },
    {
      locationName: areaData.name,
      locationSlug: areaData.slug,
      locationType: "AREA",
      cityName: cityData.name,
      citySlug: city,
      areaName: areaData.name,
      intentLabel: resolved.intentLabel,
    },
  );

  const h1 = `${serviceData.name}${intentTitlePart(resolved.intentLabel)} in ${areaData.name}, ${cityData.name}`;
  const breadcrumbs = buildAreaServiceBreadcrumbs(
    cityData.name,
    cityData.slug,
    areaData.name,
    areaData.slug,
    serviceData.name,
    pageSlug,
  );
  const related = await getRelatedAreaServicePages(city, areaSlug, resolved.serviceSlug);

  const stateName = getCityConfig(city)?.state ?? "";
  const exploreMore = buildExploreMoreSection({
    pageType: "area-service",
    citySlug: city,
    cityName: cityData.name,
    stateName,
    areaSlug,
    areaName: areaData.name,
    serviceSlug: resolved.serviceSlug,
    serviceName: serviceData.name,
    pageSlug,
    currentPath: `/${city}/${areaSlug}/${pageSlug}`,
  });

  return (
    <>
      <JsonLd
        data={[
          buildServiceSchema(
            serviceData.name,
            serviceData.description ?? "",
            `/${city}/${areaSlug}/${pageSlug}`,
          ),
          buildBreadcrumbSchema(breadcrumbs),
          buildFaqSchema(content.faqs),
        ]}
        />
        <PageHero
          eyebrow={`${areaData.name}, ${cityData.name}`}
          title={h1}
          description={content.intro}
          photo={getPrimaryServicePhoto(serviceData.slug)}
          breadcrumbs={breadcrumbs.map((b) => ({ label: b.name, href: b.url }))}
        />
        <Section>
          <div className="grid gap-10 lg:grid-cols-2">
            <PageContentRenderer content={content} h1={h1} hideH1 />
          <ServicePhotoSidebar
            serviceSlug={serviceData.slug}
            serviceName={serviceData.name}
          />
        </div>
        <RelatedLinks
          heading={`Other Services in ${areaData.name}`}
          links={related.map((p) => ({
            href: p.path,
            label: p.service?.name ?? p.title,
          }))}
        />
      </Section>
      <PageInternalLinks exploreMore={exploreMore} />
      <ServicePhotoGallery
        serviceSlug={serviceData.slug}
        serviceName={serviceData.name}
        cityName={`${areaData.name}, ${cityData.name}`}
      />
    </>
  );
}
