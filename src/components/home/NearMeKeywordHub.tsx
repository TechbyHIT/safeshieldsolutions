import Link from "next/link";
import { Section } from "@/components/ui/Section";
import {
  HOME_CITIES,
  HOME_CITY_AREAS,
  HOME_PRIMARY_INTENTS,
  HOME_TOP_SERVICES,
  buildAreaKeywordLinks,
  buildCityKeywordLinks,
  homeKeywordTags,
  homeSeoParagraphs,
} from "@/config/home-seo-links";
import { KeywordLinkScroller } from "@/components/home/KeywordLinkScroller";
import { routes } from "@/config/routes";

export function NearMeKeywordHub() {
  const cityLinks = HOME_CITIES.flatMap((city) =>
    buildCityKeywordLinks(city.slug, city.name, HOME_TOP_SERVICES.slice(0, 8), HOME_PRIMARY_INTENTS),
  );

  const chennaiLinks = buildAreaKeywordLinks(
    "chennai",
    HOME_CITY_AREAS.chennai ?? [],
    HOME_TOP_SERVICES.slice(0, 6),
    HOME_PRIMARY_INTENTS.slice(0, 5),
  );
  const hyderabadLinks = buildAreaKeywordLinks(
    "hyderabad",
    HOME_CITY_AREAS.hyderabad ?? [],
    HOME_TOP_SERVICES.slice(0, 6),
    HOME_PRIMARY_INTENTS.slice(0, 5),
  );
  const coimbatoreLinks = buildAreaKeywordLinks(
    "coimbatore",
    HOME_CITY_AREAS.coimbatore ?? [],
    HOME_TOP_SERVICES.slice(0, 6),
    HOME_PRIMARY_INTENTS.slice(0, 5),
  );
  const kochiLinks = buildAreaKeywordLinks(
    "kochi",
    HOME_CITY_AREAS.kochi ?? [],
    HOME_TOP_SERVICES.slice(0, 6),
    HOME_PRIMARY_INTENTS.slice(0, 5),
  );

  const allAreaLinks = [...chennaiLinks, ...hyderabadLinks, ...coimbatoreLinks, ...kochiLinks];

  return (
    <>
      <Section className="bg-brand-50" ariaLabel="Near me SEO content">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            Near me · Premium · Best · Dealers
          </p>
          <h2 className="mt-2 text-3xl font-bold text-neutral-900">
            Find invisible grills & safety nets near you
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-neutral-600">
            Every link opens a unique 20,000+ word local guide — installation, price, dealers,
            contractors, premium SS304 options, and free site survey booking across South India.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {homeKeywordTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-brand-200 bg-white px-3 py-1.5 text-xs font-medium text-brand-800"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-12 space-y-10">
          {homeSeoParagraphs.map((block) => (
            <article key={block.id} className="mx-auto max-w-4xl">
              <h3 className="text-xl font-bold text-neutral-900">{block.heading}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700 md:text-base">
                {block.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_CITIES.map((city) => (
            <div
              key={city.slug}
              className="rounded-2xl border border-brand-200 bg-white p-5 shadow-sm"
            >
              <h3 className="font-bold text-neutral-900">{city.name} near me</h3>
              <ul className="mt-3 space-y-1.5">
                {HOME_TOP_SERVICES.slice(0, 6).map((svc) => (
                  <li key={svc.slug}>
                    <Link
                      href={routes.cityService(city.slug, `${svc.slug}-near-me`)}
                      className="text-sm text-brand-700 hover:underline"
                    >
                      {svc.name} near me in {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={routes.city(city.slug)}
                className="mt-4 inline-block text-xs font-semibold text-accent-600 hover:underline"
              >
                All {(HOME_CITY_AREAS[city.slug] ?? []).length}+ {city.name} areas →
              </Link>
            </div>
          ))}
        </div>
      </Section>

      <KeywordLinkScroller
        id="city-keywords"
        heading="City-wide premium & near-me service pages"
        description="Best invisible grills, safety nets, pigeon nets, mosquito nets, cloth hangers, and bird spikes — city hubs with installation, price, dealers, and near-me intent variants."
        links={cityLinks}
        initialCount={64}
        batchSize={64}
      />

      <KeywordLinkScroller
        id="locality-keywords"
        heading="Locality pages — 2,400+ near-me links on this homepage"
        description="Hyper-local URLs for Adyar, Kakkanad, Gandhipuram, Gachibowli, Peelamedu, and 75+ more featured neighbourhoods. Load more to browse the full matrix."
        links={allAreaLinks}
        initialCount={96}
        batchSize={96}
      />
    </>
  );
}
