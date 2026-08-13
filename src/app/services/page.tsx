import { Section } from "@/components/ui/Section";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { routes } from "@/config/routes";
import { getPrimaryServicePhoto } from "@/config/photo-catalog";
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

  return (
    <Section>
      <h1 className="text-3xl font-bold text-neutral-900 md:text-4xl">Our Services</h1>
      <p className="prose-content mt-4 max-w-3xl">
        Professional installation of invisible grills, safety nets, mosquito nets, cloth
        hangers, sports nets, and bird protection solutions across Hyderabad and Chennai.
        Every service page includes real project photos from completed installations.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
  );
}
