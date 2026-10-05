import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { COMPARISONS } from "@/data/cg-local-seo";
import { buildPageMetadata } from "@/lib/metadata";
import { routes } from "@/config/routes";
import { getHeroPhoto } from "@/config/photo-catalog";

export const revalidate = 86400;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return COMPARISONS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = COMPARISONS.find((entry) => entry.slug === slug);
  if (!item) notFound();
  return buildPageMetadata({
    title: item.title,
    description: item.summary,
    path: `/compare/${item.slug}`,
  });
}

export default async function ComparisonPage({ params }: PageProps) {
  const { slug } = await params;
  const item = COMPARISONS.find((entry) => entry.slug === slug);
  if (!item) notFound();

  return (
    <>
      <PageHero
        eyebrow="Comparison"
        title={item.title}
        description={item.summary}
        photo={getHeroPhoto()}
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Compare", href: "/compare" },
          { label: item.title },
        ]}
      />
      <Section>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="py-2 pr-4 font-semibold">Point</th>
                <th className="py-2 pr-4 font-semibold">Option A</th>
                <th className="py-2 font-semibold">Option B</th>
              </tr>
            </thead>
            <tbody>
              {item.rows.map((row) => (
                <tr key={row[0]} className="border-b border-neutral-100">
                  <th className="py-3 pr-4 font-medium text-neutral-900">{row[0]}</th>
                  <td className="py-3 pr-4 text-neutral-700">{row[1]}</td>
                  <td className="py-3 text-neutral-700">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-sm text-neutral-600">
          Neither option wins every opening.{" "}
          <Link href={routes.contact} className="text-brand-700 hover:underline">
            Ask for a measured recommendation
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
