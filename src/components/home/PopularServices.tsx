import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SplitFeature } from "@/components/layout/SplitFeature";
import { popularServices } from "@/config/home-content";
import { getHeroPhoto, getPrimaryServicePhoto } from "@/config/photo-catalog";
import { HOME_CITIES } from "@/config/home-seo-links";
import { routes } from "@/config/routes";

export function PopularServices() {
  return (
    <>
      <Section className="bg-white pb-8" ariaLabel="Popular services">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            Premium installation work
          </p>
          <h2 className="mt-2 text-3xl font-bold text-neutral-900">
            Real project photos — the same layout on every service
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-neutral-600">
            Each block uses a high-definition installation photograph, not a placeholder graphic.
            Open the service page for city and near-me options.
          </p>
        </div>
      </Section>

      {popularServices.map((service, index) => {
        const photo = getPrimaryServicePhoto(service.slug) ?? getHeroPhoto();
        return (
          <SplitFeature
            key={service.slug}
            eyebrow={service.tag}
            title={service.title}
            description={service.description}
            photo={photo}
            href={routes.service(service.slug)}
            hrefLabel={`${service.title} details`}
            reverse={index % 2 === 1}
            headingLevel="h3"
          />
        );
      })}

      <Section className="bg-neutral-50 pt-8" ariaLabel="City near-me links">
        <ul className="flex flex-wrap justify-center gap-2">
          {HOME_CITIES.map((city) => (
            <li key={city.slug}>
              <Link
                href={routes.city(city.slug)}
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-brand-800 shadow-sm ring-1 ring-neutral-200 hover:bg-brand-50"
              >
                {city.name} services
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
