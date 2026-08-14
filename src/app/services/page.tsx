import { Section } from "@/components/ui/Section";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { PageHero } from "@/components/layout/PageHero";
import { PagePhotoStrip } from "@/components/layout/PagePhotoStrip";
import { routes } from "@/config/routes";
import { getPrimaryServicePhoto, getInterleavedPhotos } from "@/config/photo-catalog";
import { buildPageMetadata } from "@/lib/metadata";
import { getActiveServices } from "@/lib/queries";

export const revalidate = 86400;

export const metadata = buildPageMetadata({
  title: "Our Services | Invisible Grills, Safety Nets & More",
  description:
    "Browse all SafeShield Solutions services with real project photos: invisible grills, safety nets, mosquito nets, cloth hangers, sports nets, and bird protection.",
  path: "/services",
});

export default async function ServicesIndexPage() {
  const services = await getActiveServices();
  const photos = getInterleavedPhotos(12);

  return (
    <>
      <PageHero
        eyebrow="Installation services"
        title="Our Services"
        description="Professional installation of invisible grills, safety nets, mosquito nets, cloth hangers, sports nets, and bird protection solutions across Hyderabad and Chennai. Every service page includes real project photos from completed installations."
        photo={photos[0]}
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Services" },
        ]}
      />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const photo = getPrimaryServicePhoto(service.slug);
            return (
              <ServiceCard
                key={service.id}
                name={service.name}
                slug={service.slug}
                description={service.description}
                imageSlug={service.imageSlug}
                photoSrc={photo?.src}
                photoAlt={photo?.alt}
                href={routes.service(service.slug)}
              />
            );
          })}
        </div>
      </Section>
      <PagePhotoStrip
        photos={photos}
        heading="Complete photo catalog of services"
        description="Every major offering with a high-definition installation photograph."
        columns={4}
      />
    </>
  );
}
