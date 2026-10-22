import Link from "next/link";
import { Section } from "@/components/ui/Section";
import {
  HOME_CITIES,
  HOME_CITY_AREAS,
  HOME_PRIMARY_INTENTS,
  HOME_TOP_SERVICES,
  buildAreaKeywordLinks,
  buildCityKeywordLinks,
  homeSeoParagraphs,
} from "@/config/home-seo-links";
import { KeywordLinkScroller } from "@/components/home/KeywordLinkScroller";
import { CG_PRIORITY_PLACES } from "@/data/cg-local-seo";
import { isIndexableInternalPath } from "@/lib/indexable-href";

export function NearMeKeywordHub() {
  const cityLinks = HOME_CITIES.flatMap((city) =>
    buildCityKeywordLinks(city.slug, city.name, HOME_TOP_SERVICES.slice(0, 8), HOME_PRIMARY_INTENTS),
  );

  const allAreaLinks = HOME_CITIES.flatMap((city) =>
    buildAreaKeywordLinks(
      city.slug,
      HOME_CITY_AREAS[city.slug] ?? [],
      HOME_TOP_SERVICES.slice(0, 6),
      HOME_PRIMARY_INTENTS.slice(0, 5),
    ),
  );

  return (
    <>
      <Section className="bg-brand-50" ariaLabel="Town installation pages">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Chhattisgarh</p>
          <h2 className="mt-2 text-3xl font-bold text-neutral-900">
            Browse installation pages by town
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-neutral-600">
            Each town service page owns one primary query. Price, installation, and nearby wording
            stay on the URL that owns them.
          </p>
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

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CG_PRIORITY_PLACES.slice(0, 6).map((place) => {
            const hubHref = `/chhattisgarh/${place.slug}`;
            if (!isIndexableInternalPath(hubHref)) return null;
            return (
              <div
                key={place.slug}
                className="rounded-2xl border border-brand-200 bg-white p-5 shadow-sm"
              >
                <h3 className="font-bold text-neutral-900">{place.name}</h3>
                <ul className="mt-3 space-y-1.5">
                  {HOME_TOP_SERVICES.slice(0, 6).map((svc) => {
                    const href = `/chhattisgarh/${place.slug}/${svc.slug}`;
                    if (!isIndexableInternalPath(href)) return null;
                    return (
                      <li key={svc.slug}>
                        <Link href={href} className="text-sm text-brand-700 hover:underline">
                          {svc.name} in {place.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <Link
                  href={hubHref}
                  className="mt-4 inline-block text-xs font-semibold text-accent-600 hover:underline"
                >
                  All {place.name} pages
                </Link>
              </div>
            );
          })}
        </div>
      </Section>

      <KeywordLinkScroller
        id="city-keywords"
        heading="State-wide service pages"
        description="Invisible grills, safety nets, pigeon nets, mosquito nets, cloth hangers, and bird spikes. Each link uses the name of the page it opens."
        links={cityLinks}
        initialCount={64}
        batchSize={64}
      />

      <KeywordLinkScroller
        id="locality-keywords"
        heading="Served Chhattisgarh town pages"
        description="Raipur first, then Bhilai, Durg, Bilaspur, Korba, and the other listed towns. Every link is a live indexable page."
        links={allAreaLinks}
        initialCount={96}
        batchSize={96}
      />
    </>
  );
}
