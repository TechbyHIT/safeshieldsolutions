import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { AreaEstimator } from "@/components/seo/AreaEstimator";
import { PRICING_PAGES } from "@/data/cg-local-seo";
import { getSeoService } from "@/data/seo-services";
import { buildPageMetadata } from "@/lib/metadata";
import { routes } from "@/config/routes";
import { getHeroPhoto } from "@/config/photo-catalog";

interface PageProps {
  params: Promise<{ service: string }>;
}

export function generateStaticParams() {
  return PRICING_PAGES.map((page) => ({ service: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service } = await params;
  const page = PRICING_PAGES.find((item) => item.slug === service);
  if (!page) notFound();
  return buildPageMetadata({
    title: `${page.name} price factors in Chhattisgarh`,
    description: `What changes a ${page.name.toLowerCase()} quote in Chhattisgarh. No flat rate is published. The figure follows measurement.`,
    path: `/pricing/${page.slug}`,
  });
}

export default async function PricingServicePage({ params }: PageProps) {
  const { service } = await params;
  const page = PRICING_PAGES.find((item) => item.slug === service);
  if (!page) notFound();
  const catalogue = getSeoService(page.serviceSlug);

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={`${page.name}: what changes the quote`}
        description="Size, material, access, and the town change the figure. This page does not publish a rate."
        photo={getHeroPhoto()}
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Pricing", href: "/pricing" },
          { label: page.name },
        ]}
      />
      <Section>
        <p className="max-w-3xl text-neutral-700">
          {catalogue?.description} A written quote lists the grade or mesh, the measured area, and
          what is included. Compare that scope, not a headline rate.
        </p>
        <div className="mt-8">
          <AreaEstimator />
        </div>
        <p className="mt-6">
          <Link href={`/chhattisgarh/raipur/${page.serviceSlug}`} className="text-brand-700 hover:underline">
            {page.name} in Raipur
          </Link>
        </p>
      </Section>
    </>
  );
}
