import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { routes } from "@/config/routes";
import { AREA_PAGE_SERVICES } from "@/data/seo-services";
import { getAreasForCity } from "@/data/areas";
import { buildPageMetadata } from "@/lib/metadata";
import { buildAreaHubBreadcrumbs } from "@/lib/internal-links";
import { buildBreadcrumbSchema, buildLocalBusinessSchema } from "@/lib/schema";
import { getCityBySlug, getAreaBySlugs } from "@/lib/queries";

export const revalidate = 86400;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string; area: string }>;
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, area } = await params;
  const city = await getCityBySlug(slug);
  const areaData = await getAreaBySlugs(slug, area);
  if (!city || !areaData) notFound();
  return buildPageMetadata({
    title: `Invisible Grills & Safety Nets in ${areaData.name}, ${city.name}`,
    description: `Local hub for invisible grills, safety nets, zip screens, and cloth hangers in ${areaData.name}, ${city.name}. Free site survey and neighbourhood service pages.`,
    path: routes.area(slug, area),
    keywords: [areaData.name, city.name, "invisible grills", "safety nets"],
  });
}

export default async function AreaHubPage({ params }: PageProps) {
  const { slug, area } = await params;
  const city = await getCityBySlug(slug);
  const areaData = await getAreaBySlugs(slug, area);
  if (!city || !areaData) notFound();

  const breadcrumbs = buildAreaHubBreadcrumbs(city.name, city.slug, areaData.name, areaData.slug);
  const nearby = getAreasForCity(city.slug)
    .filter((a) => a.slug !== area)
    .slice(0, 12);

  return (
    <>
      <JsonLd
        data={[buildLocalBusinessSchema(city.name), buildBreadcrumbSchema(breadcrumbs)]}
      />
      <Section>
        <Breadcrumbs items={breadcrumbs.map((b) => ({ label: b.name, href: b.url }))} />
        <h1 className="text-3xl font-bold text-neutral-900 md:text-4xl">
          Home safety services in {areaData.name}, {city.name}
        </h1>
        <p className="prose-content mt-4 max-w-3xl">
          SafeShield Solutions installs invisible grills, safety nets, mosquito nets, zip screens,
          mesh doors, and cloth hangers in {areaData.name}. Choose a service below for
          neighbourhood-specific installation, price, and near-me pages.
        </p>

        <h2 className="mt-10 text-xl font-bold text-neutral-900">Services in {areaData.name}</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {AREA_PAGE_SERVICES.map((svc) => (
            <li key={svc.slug}>
              <Link
                href={routes.areaService(city.slug, areaData.slug, svc.slug)}
                className="text-sm text-brand-700 hover:underline"
              >
                {svc.name} in {areaData.name}
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="mt-12 text-xl font-bold text-neutral-900">Nearby areas</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {nearby.map((a) => (
            <li key={a.slug}>
              <Link
                href={routes.area(city.slug, a.slug)}
                className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-800 hover:bg-brand-50"
              >
                {a.name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8">
          <Link href={routes.city(city.slug)} className="font-medium text-brand-700 hover:underline">
            ← All {city.name} localities
          </Link>
        </p>
      </Section>
    </>
  );
}
