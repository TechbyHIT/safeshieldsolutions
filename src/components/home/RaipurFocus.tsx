import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { isIndexableInternalPath } from "@/lib/indexable-href";
import { routes } from "@/config/routes";
import {
  RAIPUR_LOCALITY_LINKS,
  RAIPUR_SERVICE_LINKS,
  raipurHubFaqs,
  raipurHubSections,
} from "@/config/raipur-seo";

export function RaipurFocus() {
  const sections = raipurHubSections();
  const faqs = raipurHubFaqs();

  return (
    <Section className="bg-white" ariaLabel="Raipur invisible grills and safety nets">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Raipur first</p>
      <h2 className="mt-2 max-w-3xl text-3xl font-bold text-neutral-900">
        Invisible grills, safety nets and pigeon nets in Raipur
      </h2>
      <p className="mt-3 max-w-3xl text-neutral-700">
        Raipur pages are the priority: citywide service pages, then Shankar Nagar, Naya Raipur,
        Telibandha, Civil Lines, and the other Raipur localities. Each page covers installation,
        price, dealers, and a free residential survey.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {RAIPUR_SERVICE_LINKS.map((service) => (
          <Link
            key={service.slug}
            href={routes.areaService("chhattisgarh", "raipur", service.slug)}
            className="rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-800 hover:border-brand-500"
          >
            {service.name} in Raipur
          </Link>
        ))}
      </div>

      <div className="mt-10 space-y-8">
        {sections.map((section) => (
          <article key={section.id} className="max-w-3xl">
            <h3 className="text-xl font-bold text-neutral-900">{section.heading}</h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-700 md:text-base">{section.body}</p>
          </article>
        ))}
      </div>

      <h3 className="mt-10 text-xl font-bold text-neutral-900">Raipur localities</h3>
      <ul className="mt-4 flex flex-wrap gap-2">
        {RAIPUR_LOCALITY_LINKS.map((area) => {
          const href =
            area.slug === "raipur"
              ? "/chhattisgarh/raipur"
              : `/chhattisgarh/raipur/areas/${area.slug}`;
          if (!isIndexableInternalPath(href)) return null;
          return (
            <li key={area.slug}>
              <Link
                href={href}
                className="rounded-full border border-neutral-200 px-3 py-1.5 text-sm text-brand-800 hover:border-brand-500"
              >
                {area.name}
              </Link>
            </li>
          );
        })}
      </ul>

      <dl className="mt-10 max-w-3xl space-y-4">
        {faqs.map((faq) => (
          <div key={faq.question} className="rounded-xl border border-neutral-200 bg-neutral-50 p-5">
            <dt className="font-semibold text-neutral-900">{faq.question}</dt>
            <dd className="mt-2 text-sm text-neutral-700">{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
