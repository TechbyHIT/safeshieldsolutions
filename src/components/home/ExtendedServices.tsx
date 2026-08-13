import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { extendedServices } from "@/config/home-content";
import { HOME_CITIES } from "@/config/home-seo-links";
import { getPrimaryServicePhoto } from "@/config/photo-catalog";
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
        {extendedServices.map((service) => {
          const photo = getPrimaryServicePhoto(service.slug);
          return (
            <article
              key={service.slug}
              className="overflow-hidden rounded-xl border border-neutral-200 bg-white transition hover:border-accent-500 hover:shadow-md"
            >
              {photo && (
                <Link
                  href={routes.service(service.slug)}
                  className="relative block aspect-[16/10] bg-neutral-100"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover object-center"
                  />
                </Link>
              )}
              <div className="p-5">
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
              </div>
            </article>
          );
        })}
      </div>
      <p className="mt-8 text-center">
        <Link href={routes.services} className="font-semibold text-brand-700 hover:underline">
          View all premium services & near-me hubs →
        </Link>
      </p>
    </Section>
  );
}
