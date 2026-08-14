import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { popularServices } from "@/config/home-content";
import { HOME_CITIES } from "@/config/home-seo-links";
import { getPrimaryServicePhoto } from "@/config/photo-catalog";
import { routes } from "@/config/routes";

export function PopularServices() {
  return (
    <Section className="bg-neutral-50" ariaLabel="Popular services">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
          Premium safety net services near me
        </p>
        <h2 className="mt-2 text-3xl font-bold text-neutral-900">
          Best invisible grills, pigeon nets & safety nets — find installers near you
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-neutral-600">
          Six high-intent services with near-me, installation, price, and dealer pages in every
          city. Each card links to the service hub plus city near-me variants.
        </p>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {popularServices.map((service) => {
          const photo = getPrimaryServicePhoto(service.slug);
          const imgSrc = photo?.src ?? "/images/photos/balcony-invisible-grills/01.webp";
          const imgAlt =
            photo?.alt ??
            `Premium ${service.title} installation near me — Chennai, Hyderabad, Coimbatore, Kochi`;

          return (
            <article
              key={service.slug}
              className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-card"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                <Image
                  src={imgSrc}
                  alt={imgAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={85}
                  className="object-cover object-center transition duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent-600">
                  {service.tag}
                </p>
                <h3 className="mt-2 text-xl font-bold text-neutral-900">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  {service.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                  <Link
                    href={routes.service(service.slug)}
                    className="text-sm font-semibold text-brand-700 hover:text-brand-900 hover:underline"
                  >
                    {service.title} guide →
                  </Link>
                  <Link
                    href={routes.service(service.slug)}
                    className="text-sm text-brand-700 hover:text-brand-900 hover:underline"
                  >
                    Premium {service.title.toLowerCase()} →
                  </Link>
                </div>
                <ul className="mt-4 flex flex-wrap gap-2 border-t border-neutral-100 pt-4">
                  {HOME_CITIES.map((city) => (
                    <li key={city.slug}>
                      <Link
                        href={routes.cityService(city.slug, `${service.slug}-near-me`)}
                        className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-800 hover:bg-brand-100"
                      >
                        {service.title} near me · {city.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
