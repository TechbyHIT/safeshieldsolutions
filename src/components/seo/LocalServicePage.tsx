import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServicePhotoGallery } from "@/components/content/ServicePhotos";
import { business } from "@/config/business";
import { routes } from "@/config/routes";
import { getPrimaryServicePhoto } from "@/config/photo-catalog";
import type { SeoService } from "@/data/seo-services";
import type { CgPlaceProfile } from "@/data/cg-local-seo";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildLocalBusinessSchema,
  buildServiceSchema,
} from "@/lib/schema";
import {
  buildLocalLandingCopy,
  type LocalIntent,
} from "@/lib/local-landing-content";

function whatsappHref(placeName: string, serviceName: string) {
  const text = `Hi, I need a quote for ${serviceName.toLowerCase()} in ${placeName}, Chhattisgarh.`;
  return `https://wa.me/${business.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}

export function LocalServicePage({
  place,
  service,
  intent = "general",
}: {
  place: CgPlaceProfile;
  service: SeoService;
  intent?: LocalIntent;
}) {
  const copy = buildLocalLandingCopy(place, service, intent);
  const breadcrumbs = [
    { name: "Home", url: routes.home },
    { name: "Chhattisgarh", url: "/chhattisgarh" },
    { name: place.name, url: `/chhattisgarh/${place.slug}` },
    { name: service.name, url: copy.path },
  ];

  return (
    <>
      <JsonLd
        data={[
          buildServiceSchema(service.name, service.description, copy.path),
          buildBreadcrumbSchema(breadcrumbs),
          buildFaqSchema(copy.faqs),
          buildLocalBusinessSchema(place.name),
        ]}
      />
      <PageHero
        eyebrow={`${place.name}, Chhattisgarh`}
        title={copy.h1}
        description={copy.description}
        photo={getPrimaryServicePhoto(service.slug)}
        breadcrumbs={breadcrumbs.map((item) => ({ label: item.name, href: item.url }))}
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.5fr_0.7fr]">
          <div className="space-y-10">
            {copy.sections.map((section) => (
              <section key={section.id}>
                <h2 className="text-2xl font-bold text-neutral-900">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="mt-3 text-neutral-700">
                    {paragraph}
                  </p>
                ))}
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-neutral-700">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <section>
              <h2 className="text-2xl font-bold text-neutral-900">Questions</h2>
              <dl className="mt-4 space-y-4">
                {copy.faqs.map((faq) => (
                  <div key={faq.question}>
                    <dt className="font-semibold text-neutral-900">{faq.question}</dt>
                    <dd className="mt-1 text-neutral-700">{faq.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>
            {copy.sources.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-neutral-900">Sources</h2>
                <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                  {copy.sources.map((source) => (
                    <li key={source.url}>
                      <a href={source.url} className="text-brand-700 hover:underline">
                        {source.title}
                      </a>
                      {" — "}
                      {source.publisher}. {source.usedFor}
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <section>
              <h2 className="text-2xl font-bold text-neutral-900">Related services</h2>
              <ul className="mt-3 space-y-1">
                {copy.relatedServices.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-brand-700 hover:underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <aside className="h-fit rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
            <h2 className="text-lg font-bold">Get a measured quote</h2>
            <p className="mt-2 text-sm text-neutral-600">{copy.cta}</p>
            <div className="mt-4 flex flex-col gap-3">
              <a
                href={`tel:${business.phone.replace(/\s/g, "")}`}
                className="rounded-xl bg-brand-900 px-4 py-3 text-center font-semibold text-white"
              >
                Call now
              </a>
              <a
                href={whatsappHref(place.name, service.name)}
                className="rounded-xl bg-shield-600 px-4 py-3 text-center font-semibold text-white"
              >
                WhatsApp
              </a>
              <Link href={routes.contact} className="text-center text-sm font-medium text-brand-700 hover:underline">
                Request a quote
              </Link>
            </div>
          </aside>
        </div>
      </Section>
      <ServicePhotoGallery serviceSlug={service.slug} serviceName={service.name} cityName={place.name} />
    </>
  );
}
