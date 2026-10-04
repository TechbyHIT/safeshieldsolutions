import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { PageContentRenderer } from "@/components/content/PageContentRenderer";
import { RelatedLinks } from "@/components/content/RelatedLinks";
import { PhotoGallery, ProjectPhotoImage } from "@/components/ui/PhotoGallery";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/layout/PageHero";
import { getHeroPhoto, getPhotosForService, getPrimaryServicePhoto } from "@/config/photo-catalog";
import { noBuildStaticParams } from "@/config/build-static";
import { routes } from "@/config/routes";
import { buildServiceContent } from "@/lib/content";
import { buildServiceMetadata } from "@/lib/metadata";
import {
  buildServiceBreadcrumbs,
} from "@/lib/internal-links";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceSchema,
} from "@/lib/schema";
import { getServiceBySlug, getActiveServices } from "@/lib/queries";
import { evaluateSeoPath } from "@/lib/seo-quality-gate";
import { RAIPUR_ENTRY_LINKS } from "@/lib/seo-priority";

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

  const primaryPhoto = getPrimaryServicePhoto(service.slug) ?? getHeroPhoto();
  const galleryPhotos = getPhotosForService(service.slug, 48);
  const breadcrumbItems = buildServiceBreadcrumbs(service.name, service.slug);
  const allServices = await getActiveServices();

  const raipurPath = `/chhattisgarh/raipur/${service.slug}`;
  const statePath = `/chhattisgarh/${service.slug}`;
  const cityLinks = [
    ...RAIPUR_ENTRY_LINKS.map((link) => ({ href: link.href, label: link.label })),
    evaluateSeoPath(raipurPath).index && !RAIPUR_ENTRY_LINKS.some((link) => link.href === raipurPath)
      ? { href: raipurPath, label: `${service.name} in Raipur` }
      : null,
    evaluateSeoPath(statePath).index ? { href: statePath, label: `${service.name} across Chhattisgarh` } : null,
  ].filter((link): link is { href: string; label: string } => Boolean(link));

  return (
    <>
      <JsonLd
        data={[
          buildServiceSchema(service.name, service.description ?? "", routes.service(service.slug)),
          buildBreadcrumbSchema(breadcrumbItems),
          buildFaqSchema(content.faqs),
        ]}
      />

      <PageHero
        eyebrow={service.category ?? "Service"}
        title={service.name}
        description={service.description ?? content.intro}
        photo={primaryPhoto}
        breadcrumbs={breadcrumbItems.map((b) => ({ label: b.name, href: b.url }))}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <PageContentRenderer content={content} h1={service.name} hideH1 />
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProjectPhotoImage photo={primaryPhoto} />
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
            and finish details from completed installations.
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
