import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { getIndexableLocalitiesForCity } from "@/data/cg-hierarchy";
import { business } from "@/config/business";
import { routes } from "@/config/routes";
import {
  CG_CORE_SERVICE_SLUGS,
  CG_PRIORITY_PLACES,
  getCgPlace,
} from "@/data/cg-local-seo";
import { getSeoService } from "@/data/seo-services";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { getPrimaryServicePhoto } from "@/config/photo-catalog";

interface ChhattisgarhPlacePageProps {
  placeSlug: string;
  placeName: string;
  stateName: string;
}

export function ChhattisgarhPlacePage({
  placeSlug,
  placeName,
  stateName,
}: ChhattisgarhPlacePageProps) {
  const profile = getCgPlace(placeSlug);
  const nearby = (profile?.nearby ?? [])
    .map((slug) => CG_PRIORITY_PLACES.find((place) => place.slug === slug))
    .filter((place): place is (typeof CG_PRIORITY_PLACES)[number] => Boolean(place));
  const services = CG_CORE_SERVICE_SLUGS.map((slug) => getSeoService(slug)).filter(
    (service): service is NonNullable<typeof service> => Boolean(service),
  );
  const localities = getIndexableLocalitiesForCity(placeSlug);
  const breadcrumbs = [
    { name: "Home", url: routes.home },
    { name: "Chhattisgarh", url: "/chhattisgarh" },
    { name: placeName, url: `/chhattisgarh/${placeSlug}` },
  ];

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      <PageHero
        eyebrow={`${stateName} · ${placeName}`}
        title={`Invisible grills and safety nets in ${placeName}`}
        description={
          profile?.localContext ??
          `${placeName} is listed as a Chhattisgarh service area. Measurement is done on site before any quote.`
        }
        photo={getPrimaryServicePhoto("invisible-grills")}
        breadcrumbs={breadcrumbs.map((item) => ({ label: item.name, href: item.url }))}
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Where these are used</h2>
              <p className="mt-3 text-neutral-700">
                Apartments, independent houses, balconies, windows, and terraces in {placeName}. A
                net or grill is an added layer. It does not replace a sound railing or supervision.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Materials we specify</h2>
              <p className="mt-3 text-neutral-700">
                Invisible grills are quoted in SS304 as the standard grade, with SS316 when the
                opening is exposed to heavier corrosion. Safety nets are specified by mesh and use
                — child, pet, pigeon, terrace, or duct — after the opening is measured.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">What affects the quote</h2>
              <p className="mt-3 text-neutral-700">
                Width, height, number of openings, fixing surface, access, material grade, and
                whether the job is a balcony, window, or terrace. We do not publish a flat rate.
                The survey produces a written scope.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Services in {placeName}</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={routes.areaService("chhattisgarh", placeSlug, service.slug)}
                      className="text-brand-700 hover:underline"
                    >
                      {service.name} in {placeName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {nearby.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">Nearby towns</h2>
                <ul className="mt-4 flex flex-wrap gap-3">
                  {nearby.map((place) => (
                    <li key={place.slug}>
                      <Link href={`/chhattisgarh/${place.slug}`} className="text-brand-700 hover:underline">
                        {place.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {localities.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">Localities</h2>
                <ul className="mt-4 flex flex-wrap gap-3">
                  {localities.map((area) => (
                    <li key={area.slug}>
                      <Link
                        href={`/chhattisgarh/${placeSlug}/areas/${area.slug}`}
                        className="text-brand-700 hover:underline"
                      >
                        {area.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <aside className="h-fit rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
            <h2 className="text-lg font-bold text-neutral-900">Request a measurement</h2>
            <p className="mt-2 text-sm text-neutral-600">
              Call or WhatsApp with a photo of the opening. Final scope needs a site check.
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <a
                href={`tel:${business.phone.replace(/\s/g, "")}`}
                className="rounded-xl bg-brand-900 px-6 py-3 text-center font-semibold text-white"
              >
                Call {business.phone}
              </a>
              <Link
                href={routes.contact}
                className="rounded-xl bg-shield-600 px-6 py-3 text-center font-semibold text-white"
              >
                Get a written quote
              </Link>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
