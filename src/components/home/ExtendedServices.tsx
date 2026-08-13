import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { extendedServices } from "@/config/home-content";
import { HOME_CITIES } from "@/config/home-seo-links";
import { routes } from "@/config/routes";

export function ExtendedServices() {
  return (
    <Section ariaLabel="More services">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-neutral-900">
          Premium invisible grills, terrace nets & cloth hangers near me
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-neutral-600">
          Best dealers and installers for balcony grills, terrace safety, sports nets, and
          construction covering — with near-me pages in every city.
        </p>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {extendedServices.map((service) => (
          <article
            key={service.slug}
            className="rounded-xl border border-neutral-200 bg-white p-5 transition hover:border-brand-200 hover:shadow-md"
          >
            <Link href={routes.service(service.slug)}>
              <h3 className="font-semibold text-neutral-900">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                {service.description}
              </p>
            </Link>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {HOME_CITIES.slice(0, 2).map((city) => (
                <li key={city.slug}>
                  <Link
                    href={routes.cityService(city.slug, `${service.slug}-near-me`)}
                    className="text-xs font-medium text-brand-700 hover:underline"
                  >
                    Near me · {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="mt-8 text-center">
        <Link href={routes.services} className="font-semibold text-brand-700 hover:underline">
          View all premium services & near-me hubs →
        </Link>
      </p>
    </Section>
  );
}
