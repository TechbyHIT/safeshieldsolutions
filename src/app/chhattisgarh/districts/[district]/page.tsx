import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { routes } from "@/config/routes";
import { CG_PRIORITY_PLACES } from "@/data/cg-local-seo";
import { CG_CITY_DISTRICT, getDistrict } from "@/data/cg-hierarchy";
import { buildPageMetadata } from "@/lib/metadata";
import { buildBreadcrumbSchema, buildLocalBusinessSchema } from "@/lib/schema";
import { getPrimaryServicePhoto } from "@/config/photo-catalog";
import { enforceIndexablePath } from "@/lib/seo-enforce";
import { generateDistrictStaticParams } from "@/lib/ssg-priority";

export const revalidate = 86400;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ district: string }>;
}

export function generateStaticParams() {
  return generateDistrictStaticParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { district } = await params;
  const path = `/chhattisgarh/districts/${district}`;
  enforceIndexablePath(path);
  const record = getDistrict(district);
  if (!record) notFound();
  return buildPageMetadata({
    title: `${record.name} District | Safety Nets & Bird Spikes`,
    description: record.summary,
    path,
    canonicalPath: path,
    robots: { index: true, follow: true },
  });
}

export default async function DistrictPage({ params }: PageProps) {
  const { district } = await params;
  const path = `/chhattisgarh/districts/${district}`;
  enforceIndexablePath(path);
  const record = getDistrict(district);
  if (!record) notFound();
  const towns = CG_PRIORITY_PLACES.filter((place) => CG_CITY_DISTRICT[place.slug] === record.slug);
  const breadcrumbs = [
    { name: "Home", url: routes.home },
    { name: "Chhattisgarh", url: "/chhattisgarh" },
    { name: `${record.name} district`, url: path },
  ];

  return (
    <>
      <JsonLd
        data={[buildBreadcrumbSchema(breadcrumbs), buildLocalBusinessSchema(record.name)]}
      />
      <PageHero
        eyebrow="Chhattisgarh district"
        title={`${record.name} district`}
        description={record.summary}
        photo={getPrimaryServicePhoto("safety-nets")}
        breadcrumbs={breadcrumbs.map((item) => ({ label: item.name, href: item.url }))}
      />
      <Section>
        <h2 className="text-2xl font-bold text-neutral-900">Towns we serve in {record.name}</h2>
        {towns.length === 0 ? (
          <p className="mt-4 text-neutral-700">
            This district is listed for geography. Book from the nearest served town on the
            Chhattisgarh page.
          </p>
        ) : (
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {towns.map((place) => (
              <li key={place.slug} className="rounded-2xl border border-neutral-200 p-4">
                <Link
                  href={`/chhattisgarh/${place.slug}`}
                  className="font-semibold text-brand-800 hover:underline"
                >
                  {place.name}
                </Link>
                <p className="mt-2 text-sm text-neutral-600">{place.localContext}</p>
                <p className="mt-3 text-sm">
                  <Link
                    href={`/chhattisgarh/${place.slug}/bird-spikes-near-me`}
                    className="text-brand-700 hover:underline"
                  >
                    Bird spikes in {place.name}
                  </Link>
                  {" · "}
                  <Link
                    href={`/chhattisgarh/${place.slug}/safety-nets`}
                    className="text-brand-700 hover:underline"
                  >
                    Safety nets
                  </Link>
                </p>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-8 text-sm text-neutral-600">
          <Link href="/chhattisgarh" className="font-medium text-brand-700 hover:underline">
            All Chhattisgarh towns
          </Link>
        </p>
      </Section>
    </>
  );
}
