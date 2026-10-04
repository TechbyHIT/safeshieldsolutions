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
import { buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from "@/lib/schema";
import { faqsForServicePlace, linksForTownService, shortAnswers } from "@/lib/seo-graph";

const APPLICATIONS = [
  "Apartments",
  "Independent houses",
  "Balconies",
  "Windows",
  "Terraces",
  "High-rise openings",
];

const INSTALL_STEPS = [
  "Site measurement",
  "Material selection",
  "Fixing preparation",
  "Installation",
  "Tensioning or edge finishing",
  "Inspection",
  "Handover",
];

function whatsappHref(placeName: string, serviceName: string) {
  const text = `Hi, I need a quote for ${serviceName.toLowerCase()} in ${placeName}, Chhattisgarh.`;
  return `https://wa.me/${business.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}

export function LocalServicePage({
  place,
  service,
}: {
  place: CgPlaceProfile;
  service: SeoService;
}) {
  const faqs = faqsForServicePlace(service.name, place.name, place.localContext, service.slug.includes("grill"));
  const answers = shortAnswers(service.name, place.name);
  const contextual = linksForTownService(place.slug, service.slug);
  const path = `/chhattisgarh/${place.slug}/${service.slug}`;
  const breadcrumbs = [
    { name: "Home", url: routes.home },
    { name: "Chhattisgarh", url: "/chhattisgarh" },
    { name: place.name, url: `/chhattisgarh/${place.slug}` },
    { name: service.name, url: path },
  ];

  return (
    <>
      <JsonLd
        data={[
          buildServiceSchema(service.name, service.description, path),
          buildBreadcrumbSchema(breadcrumbs),
          buildFaqSchema(faqs),
        ]}
      />
      <PageHero
        eyebrow={`${place.name}, Chhattisgarh`}
        title={`${service.name} in ${place.name}, Chhattisgarh`}
        description={`${service.description} ${place.localContext}`}
        photo={getPrimaryServicePhoto(service.slug)}
        breadcrumbs={breadcrumbs.map((item) => ({ label: item.name, href: item.url }))}
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.5fr_0.7fr]">
          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-neutral-900">Short answers</h2>
              <dl className="mt-3 space-y-3">
                {answers.map((item) => (
                  <div key={item.q}>
                    <dt className="font-semibold text-neutral-900">{item.q}</dt>
                    <dd className="text-neutral-700">{item.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-neutral-900">Where it is used</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {APPLICATIONS.map((item) => (
                  <li key={item} className="rounded-full border border-neutral-200 px-3 py-1 text-sm">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-neutral-700">
                A grill or net is an added layer. It does not replace a sound railing, a window
                restrictor, or supervision.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-neutral-900">Materials</h2>
              <p className="mt-3 text-neutral-700">
                Invisible grills are quoted in SS304 stainless cable, with SS316 when corrosion
                exposure is higher. Safety nets use nylon or HDPE mesh. Cable diameter, mesh size,
                and anchors are written into the quote after measurement. They are not guessed from
                the town name.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-neutral-900">Installation</h2>
              <ol className="mt-3 list-decimal space-y-1 pl-5 text-neutral-700">
                {INSTALL_STEPS.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-neutral-900">What changes the price</h2>
              <p className="mt-3 text-neutral-700">
                Size, number of openings, material grade, access, fixing surface, and travel to{" "}
                {place.name}. No rate per square foot is published here.{" "}
                <Link href="/pricing" className="text-brand-700 hover:underline">
                  Pricing factors
                </Link>
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-neutral-900">{place.name}</h2>
              <p className="mt-3 text-neutral-700">{place.localContext}</p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-neutral-900">Questions</h2>
              <dl className="mt-4 space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.question}>
                    <dt className="font-semibold text-neutral-900">{faq.question}</dt>
                    <dd className="mt-1 text-neutral-700">{faq.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-neutral-900">Related pages</h2>
              <ul className="mt-3 space-y-1">
                {contextual.map((item) => (
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
            <p className="mt-2 text-sm text-neutral-600">
              Call, WhatsApp a photo, or send the opening size. The final figure needs a site check.
            </p>
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
