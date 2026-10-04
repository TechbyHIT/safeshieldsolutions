import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { getPublishedNeighbourhood } from "@/data/cg-neighbourhoods";
import { CG_CORE_SERVICE_SLUGS } from "@/data/cg-local-seo";
import { getSeoService } from "@/data/seo-services";
import { buildPageMetadata } from "@/lib/metadata";
import { routes } from "@/config/routes";
import { getHeroPhoto } from "@/config/photo-catalog";

interface PageProps {
  params: Promise<{ city: string; area: string; service: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city, area, service } = await params;
  const neighbourhood = getPublishedNeighbourhood(city, area);
  const catalogue = getSeoService(service);
  if (!neighbourhood || !catalogue) notFound();
  return buildPageMetadata({
    title: `${catalogue.name} in ${neighbourhood.name}, Chhattisgarh`,
    description: neighbourhood.description,
    path: `/chhattisgarh/${city}/area/${area}/${service}`,
  });
}

export default async function NeighbourhoodServicePage({ params }: PageProps) {
  const { city, area, service } = await params;
  const neighbourhood = getPublishedNeighbourhood(city, area);
  const catalogue = getSeoService(service);
  if (
    !neighbourhood ||
    !catalogue ||
    !CG_CORE_SERVICE_SLUGS.includes(service as (typeof CG_CORE_SERVICE_SLUGS)[number])
  ) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow={`${neighbourhood.name}, ${city}`}
        title={`${catalogue.name} in ${neighbourhood.name}`}
        description={neighbourhood.description}
        photo={getHeroPhoto()}
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Chhattisgarh", href: "/chhattisgarh" },
          { label: city, href: `/chhattisgarh/${city}` },
          { label: neighbourhood.name },
        ]}
      />
      <Section>
        <p className="text-neutral-700">{neighbourhood.description}</p>
        <p className="mt-4">
          <Link href={`/chhattisgarh/${city}/${service}`} className="text-brand-700 hover:underline">
            {catalogue.name} across {city}
          </Link>
        </p>
      </Section>
    </>
  );
}
