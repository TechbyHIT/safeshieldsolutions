import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { RelatedLinks } from "@/components/content/RelatedLinks";
import { AreaBrowser } from "@/components/locations/AreaBrowser";
import { JsonLd } from "@/components/seo/JsonLd";
import { routes } from "@/config/routes";
import { buildPageMetadata } from "@/lib/metadata";
import { buildCityBreadcrumbs, buildAreaHubLinks, buildCityServiceHubLinks } from "@/lib/internal-links";
import { buildBreadcrumbSchema, buildLocalBusinessSchema } from "@/lib/schema";
import { buildCityHubContent } from "@/lib/city-hub-content";
import { getCityBySlug, getActiveServices } from "@/lib/queries";

export const revalidate = 86400;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = await getCityBySlug(slug);
  if (!city) notFound();
  return buildPageMetadata({
    title: `Invisible Grills & Safety Nets in ${city.name}`,
    description: `Professional invisible grills, safety nets, mosquito nets and home protection in ${city.name}. Free site survey, SS304 materials, 5-year warranty.`,
    path: routes.city(slug),
  });
}

export default async function CityPage({ params }: PageProps) {
  const { slug } = await params;
  const city = await getCityBySlug(slug);
  if (!city) notFound();

  const services = await getActiveServices();
  const breadcrumbItems = buildCityBreadcrumbs(city.name, city.slug);
  const areaLinks = buildAreaHubLinks(
    city.slug,
    (city.children ?? []).map((a) => ({ slug: a.slug, name: a.name })),
  );
  const serviceLinks = buildCityServiceHubLinks(
    city.slug,
    services.map((s) => ({ slug: s.slug, name: s.name })),
  );
  const hubContent = buildCityHubContent(city.slug, city.name);

  return (
    <>
      <JsonLd
        data={[
          buildLocalBusinessSchema(city.name),
          buildBreadcrumbSchema(breadcrumbItems),
        ]}
      />

      <Section>
        <Breadcrumbs
          items={breadcrumbItems.map((b) => ({ label: b.name, href: b.url }))}
        />
        <h1 className="text-3xl font-bold text-neutral-900 md:text-4xl">
          Invisible Grills & Safety Solutions in {city.name}
        </h1>
        <p className="prose-content mt-4 max-w-3xl">
          SafeShield Solutions provides professional invisible grills, safety nets, mosquito
          nets, cloth hangers, sports nets, cricket box grass, zip screens, motorized zip screens,
          mesh doors, sliding mesh doors, and bird protection across {city.name}. Free site
          survey, SS304 materials, trained technicians, and 5-year warranty.
        </p>

        {hubContent.sections.map((section) => (
          <article key={section.id} className="mt-10 max-w-3xl">
            <h2 className="text-2xl font-bold text-neutral-900">{section.heading}</h2>
            <p className="prose-content mt-4 whitespace-pre-line">{section.body}</p>
          </article>
        ))}

        <RelatedLinks
          heading={`${city.name} service intent pages`}
          links={hubContent.serviceLinks.slice(0, 36)}
        />

        <RelatedLinks heading={`Popular areas in ${city.name}`} links={areaLinks.slice(0, 24)} />

        <h2 className="mt-12 text-2xl font-bold text-neutral-900">
          All {city.name} localities
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-neutral-600">
          Browse {(city.children ?? []).length.toLocaleString()} neighbourhoods — each links to
          dedicated invisible grills, safety nets, and intent pages with 20,000+ words of local SEO
          content.
        </p>
        <AreaBrowser
          citySlug={city.slug}
          cityName={city.name}
          areas={city.children ?? []}
        />

        <h2 className="mt-12 text-2xl font-bold text-neutral-900">Services in {city.name}</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              name={`${service.name} in ${city.name}`}
              slug={service.slug}
              description={service.description}
              imageSlug={service.imageSlug}
              href={routes.cityService(city.slug, service.slug)}
            />
          ))}
        </div>

        <RelatedLinks heading="Quick Links" links={serviceLinks} />

        <section className="mt-12 max-w-3xl" aria-labelledby="city-faq-heading">
          <h2 id="city-faq-heading" className="text-2xl font-bold text-neutral-900">
            {city.name} installation FAQs
          </h2>
          <dl className="mt-6 space-y-4">
            {hubContent.faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-xl border border-neutral-200 bg-neutral-50 p-5"
              >
                <dt className="font-semibold text-neutral-900">{faq.question}</dt>
                <dd className="prose-content mt-2 text-sm">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      </Section>
    </>
  );
}
