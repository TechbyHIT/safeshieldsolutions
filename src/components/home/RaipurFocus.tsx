import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { isIndexableInternalPath } from "@/lib/indexable-href";
import { routes } from "@/config/routes";
import { business } from "@/config/business";
import {
  RAIPUR_SERVICE_LINKS,
  raipurHubFaqs,
  raipurHubSections,
  raipurLocalityLinks,
} from "@/config/raipur-seo";

export function RaipurFocus() {
  const sections = raipurHubSections();
  const faqs = raipurHubFaqs();
  const areas = raipurLocalityLinks().filter((area) => isIndexableInternalPath(area.href));

  return (
    <Section className="bg-white" ariaLabel="Raipur invisible grills and safety nets">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-600">Raipur first</p>
      <h2 className="mt-2 max-w-3xl font-display text-3xl font-semibold tracking-tight text-brand-950 md:text-4xl">
        Invisible grills, safety nets and pigeon nets in Raipur
      </h2>
      <p className="mt-3 max-w-3xl text-neutral-700">
        Raipur is the priority service area: citywide pages for each fitting, then a page for every
        listed locality. Open the neighbourhood you live in, or start with a citywide service page.
        Residential surveys in Raipur are free; the quote is written after measurement.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {RAIPUR_SERVICE_LINKS.map((service) => {
          const href = routes.areaService("chhattisgarh", "raipur", service.slug);
          if (!isIndexableInternalPath(href)) return null;
          return (
            <Link
              key={service.slug}
              href={href}
              className="rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-800 hover:border-brand-500"
            >
              {service.name} in Raipur
            </Link>
          );
        })}
      </div>

      <div className="mt-10 space-y-8">
        {sections.map((section) => (
          <article key={section.id} className="max-w-3xl">
            <h3 className="text-xl font-bold text-neutral-900">{section.heading}</h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-700 md:text-base">{section.body}</p>
          </article>
        ))}
      </div>

      <h3 className="mt-10 text-xl font-bold text-neutral-900">Raipur areas with their own pages</h3>
      <p className="mt-2 max-w-3xl text-sm text-neutral-600">
        These are survey neighbourhoods, not claimed branch offices. Each hub links to the fittings
        measured there.
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {areas.map((area) => (
          <li key={area.slug}>
            <Link
              href={area.href}
              className="rounded-full border border-neutral-200 px-3 py-1.5 text-sm text-brand-800 hover:border-brand-500"
            >
              {area.name}
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-sm text-neutral-700">
        <a href={`tel:${business.phone.replace(/\s/g, "")}`} className="font-semibold text-brand-800 hover:underline">
          Call {business.phone}
        </a>
        {" for a Raipur site survey · "}
        <Link href={routes.contact} className="text-brand-700 hover:underline">
          Request a written quote
        </Link>
      </p>

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
