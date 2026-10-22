import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { business } from "@/config/business";
import { routes } from "@/config/routes";
import { getHeroPhoto } from "@/config/photo-catalog";
import { GLOSSARY } from "@/lib/content-seo";
import { buildPageMetadata } from "@/lib/metadata";

export const revalidate = 86400;

export const metadata: Metadata = buildPageMetadata({
  title: "Glossary | Grill, net, and screen terms",
  description:
    "Plain definitions of SS304, SS316, HDPE, nylon, invisible grills, safety nets, bird spikes, and zip screens. The quote still follows a measurement.",
  path: "/glossary",
  keywords: GLOSSARY.map((term) => term.term),
});

export default function GlossaryPage() {
  return (
    <>
      <PageHero
        eyebrow={business.name}
        title="Terms used on a quote"
        description="These are the words that show up on a specification. None of them is a price, a load rating, or a promise that an opening is childproof."
        photo={getHeroPhoto()}
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Glossary", href: "/glossary" },
        ]}
      />
      <Section>
        <dl className="mx-auto max-w-3xl space-y-8">
          {GLOSSARY.map((term) => (
            <div key={term.slug} id={term.slug}>
              <dt className="text-xl font-bold text-neutral-900">{term.term}</dt>
              <dd className="mt-2 text-neutral-700">{term.definition}</dd>
            </div>
          ))}
        </dl>
        <p className="mx-auto mt-10 max-w-3xl text-sm text-neutral-600">
          Job photos in the <Link href={routes.gallery} className="text-brand-700 hover:underline">gallery</Link> are
          installation pictures. They are not case studies. A case study is published only when the job record is verified.
        </p>
      </Section>
    </>
  );
}
