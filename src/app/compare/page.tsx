import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { COMPARISONS } from "@/data/cg-local-seo";
import { buildPageMetadata } from "@/lib/metadata";
import { routes } from "@/config/routes";
import { getHeroPhoto } from "@/config/photo-catalog";

export const metadata: Metadata = buildPageMetadata({
  title: "Invisible grill and safety net comparisons",
  description:
    "Factual comparisons of invisible grills and safety nets, SS304 and SS316, and nylon and HDPE mesh. No winner is forced.",
  path: "/compare",
});

export default function CompareIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Compare"
        title="Choose by the opening, not a slogan"
        description="These notes describe differences. The survey still decides what belongs on a particular balcony or window."
        photo={getHeroPhoto()}
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Compare" },
        ]}
      />
      <Section>
        <ul className="space-y-4">
          {COMPARISONS.map((item) => (
            <li key={item.slug}>
              <Link href={`/compare/${item.slug}`} className="text-lg font-semibold text-brand-800 hover:underline">
                {item.title}
              </Link>
              <p className="mt-1 text-sm text-neutral-600">{item.summary}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
