import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { PageContentRenderer } from "@/components/content/PageContentRenderer";
import { RelatedLinks } from "@/components/content/RelatedLinks";
import { PhotoGallery, ProjectPhotoImage } from "@/components/ui/PhotoGallery";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPhotosForService, getPrimaryServicePhoto } from "@/config/photo-catalog";
import { getServiceImage } from "@/config/images";
import { SeoImage } from "@/components/ui/SeoImage";
import { noBuildStaticParams } from "@/config/build-static";
import { routes } from "@/config/routes";
import { buildServiceContent } from "@/lib/content";
import { buildServiceMetadata } from "@/lib/metadata";
import {
  buildServiceBreadcrumbs,
  buildCityServiceHubLinks,
} from "@/lib/internal-links";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceSchema,
} from "@/lib/schema";
import { getServiceBySlug, getActiveServices } from "@/lib/queries";

export const revalidate = 86400;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return noBuildStaticParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();
  return buildServiceMetadata(
    service.name,
    service.description ?? service.name,
    service.slug,
  );
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const content = buildServiceContent({
    serviceName: service.name,
    serviceSlug: service.slug,
    serviceDescription: service.description ?? service.name,
    category: service.category,
  });

  const primaryPhoto = getPrimaryServicePhoto(service.slug);
  const galleryPhotos = getPhotosForService(service.slug, 36);
  const breadcrumbItems = buildServiceBreadcrumbs(service.name, service.slug);
  const allServices = await getActiveServices();

  const cityLinks = [
    { city: "Hyderabad", slug: "hyderabad" },
    { city: "Chennai", slug: "chennai" },
  ].flatMap(({ city, slug: citySlug }) =>
    buildCityServiceHubLinks(citySlug, [{ slug: service.slug, name: `${service.name} in ${city}` }]),
  );

  return (
    <>
      <JsonLd
        data={[
          buildServiceSchema(service.name, service.description ?? "", routes.service(service.slug)),
          buildBreadcrumbSchema(breadcrumbItems),
          buildFaqSchema(content.faqs),
        ]}
      />

      <Section>
        <Breadcrumbs
          items={breadcrumbItems.map((b) => ({ label: b.name, href: b.url }))}
        />
        <div className="grid gap-10 lg:grid-cols-2">
          <PageContentRenderer content={content} h1={service.name} />
          <div className="lg:sticky lg:top-24 lg:self-start">
            {primaryPhoto ? (
              <ProjectPhotoImage photo={primaryPhoto} priority />
            ) : (
              <SeoImage image={getServiceImage(service.slug)} />
            )}
          </div>
        </div>
      </Section>

      {galleryPhotos.length > 0 && (
        <Section className="border-t border-neutral-200 bg-neutral-50" ariaLabel="Project photos">
          <h2 className="text-2xl font-bold text-neutral-900">
            Real {service.name} Project Photos
          </h2>
          <p className="mt-3 max-w-2xl text-neutral-600">
            Review completed installations — cable spacing, edge fixing, mesh quality,
            and finish details from our Hyderabad and Chennai teams.
          </p>
          <div className="mt-8">
            <PhotoGallery photos={galleryPhotos} columns={3} />
          </div>
        </Section>
      )}

      <Section>
        <RelatedLinks heading={`${service.name} by City`} links={cityLinks} />
        <RelatedLinks
          heading="Other Services"
          links={allServices
            .filter((s) => s.slug !== service.slug)
            .slice(0, 8)
            .map((s) => ({ href: routes.service(s.slug), label: s.name }))}
        />
      </Section>
    </>
  );
}
