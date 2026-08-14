import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/layout/PageHero";
import { PagePhotoStrip } from "@/components/layout/PagePhotoStrip";
import { homeFaqs } from "@/config/home-content";
import { getInterleavedPhotos } from "@/config/photo-catalog";
import { CITIES } from "@/data/cities";
import { routes } from "@/config/routes";
import { buildPageMetadata } from "@/lib/metadata";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

export const revalidate = 86400;

export const metadata = buildPageMetadata({
  title: "FAQ | Invisible Grills, Safety Nets & Free Site Survey",
  description:
    "Answers on invisible grill price, safety net installation, free surveys, warranty, and service areas across Chennai, Hyderabad, Coimbatore, and Kochi.",
  path: routes.faq,
  keywords: ["invisible grill faq", "safety net price", "free site survey"],
});

const breadcrumbs = [
  { name: "Home", url: routes.home },
  { name: "FAQ", url: routes.faq },
];

export default function FaqPage() {
  const photos = getInterleavedPhotos(9);
  return (
    <>
      <JsonLd data={[buildFaqSchema(homeFaqs), buildBreadcrumbSchema(breadcrumbs)]} />
      <PageHero
        eyebrow="Helpful answers"
        title="Frequently asked questions"
        description="Common questions about invisible grills, safety nets, zip screens, and installation across South India. Need a quote? Book a free site survey."
        photo={photos[0]}
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "FAQ" },
        ]}
      />
      <Section>
        <dl className="max-w-3xl space-y-8">
          {homeFaqs.map((faq) => (
            <div key={faq.question}>
              <dt className="text-lg font-semibold text-neutral-900">{faq.question}</dt>
              <dd className="mt-2 text-neutral-600">{faq.answer}</dd>
            </div>
          ))}
        </dl>
        <h2 className="mt-14 text-2xl font-bold text-neutral-900">Browse by city</h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {CITIES.map((city) => (
            <li key={city.slug}>
              <Link
                href={routes.city(city.slug)}
                className="rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-brand-800 hover:bg-brand-100"
              >
                {city.name} services
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8">
          <Link href={routes.contact} className="font-semibold text-brand-700 hover:underline">
            Book a free inspection →
          </Link>
        </p>
      </Section>
      <PagePhotoStrip photos={photos} heading="Installation examples" columns={3} />
    </>
  );
}
