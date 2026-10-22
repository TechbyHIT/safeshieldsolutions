import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { homeCatalogServices, materialGrades } from "@/config/home-content";
import { routes } from "@/config/routes";

export function PopularServices() {
  return (
    <Section className="bg-neutral-50" ariaLabel="Our services">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent-600">Our services</p>
        <h2 className="mt-2 text-3xl font-bold text-neutral-900 md:text-4xl">
          Complete home and building safety fittings
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-neutral-600">
          Invisible grills, safety nets, pigeon nets, and child protection — specified in SS304
          or SS316 after the opening is measured.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {materialGrades.map((item) => (
          <div key={item.grade} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-wide text-accent-600">{item.grade} quality</p>
            <h3 className="mt-1 text-lg font-bold text-neutral-900">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {homeCatalogServices.map((service) => (
          <ServiceCard
            key={service.slug}
            name={service.title}
            slug={service.slug}
            description={service.description}
            href={routes.service(service.slug)}
            headingLevel={3}
          />
        ))}
      </div>

      <p className="mt-10 text-center">
        <Link
          href={routes.services}
          className="inline-flex items-center justify-center rounded-full bg-brand-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
        >
          Browse all services
        </Link>
      </p>
    </Section>
  );
}
