import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { extendedServices } from "@/config/home-content";
import { routes } from "@/config/routes";

export function ExtendedServices() {
  return (
    <Section ariaLabel="More services">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-neutral-900">
          Balcony, terrace, and laundry fittings
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-neutral-600">
          Extra lines for windows, terraces, cloth drying, and sports practice — each with its
          own measured specification.
        </p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {extendedServices.map((service) => (
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
      <p className="mt-8 text-center">
        <Link href={routes.services} className="font-semibold text-brand-700 hover:underline">
          Browse the full service list
        </Link>
      </p>
    </Section>
  );
}
