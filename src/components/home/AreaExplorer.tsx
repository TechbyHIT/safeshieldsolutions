import { trustBadges, cityAreaHighlights } from "@/config/mega-menu";
import Link from "next/link";
import { routes } from "@/config/routes";

export function TrustBadges() {
  return (
    <div className="flex flex-wrap gap-2">
      {trustBadges.map((badge) => (
        <span
          key={badge}
          className="rounded-full border border-white/30 bg-black/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm"
        >
          {badge}
        </span>
      ))}
    </div>
  );
}

export function AreaExplorer() {
  return (
    <section className="bg-white py-16" aria-label="Explore service areas">
      <div className="container">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            2,000+ neighbourhoods
          </p>
          <h2 className="mt-2 text-3xl font-bold text-neutral-900">
            Premium invisible grills & safety nets near me — 1,991 neighbourhoods
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-neutral-600">
            Best installation, price, dealers, and near-me pages for every locality — Chennai,
            Hyderabad, Coimbatore, and Kochi. Click any area for 20,000+ words of local SEO content.
          </p>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {cityAreaHighlights.map((city) => (
            <article
              key={city.citySlug}
              className="rounded-2xl border border-neutral-200 p-6 hover:border-brand-200 hover:shadow-md"
            >
              <h3 className="text-lg font-bold text-neutral-900">{city.cityName}</h3>
              <ul className="mt-4 space-y-2">
                {city.areas.map((area) => (
                  <li key={area.href}>
                    <Link
                      href={area.href}
                      className="text-sm text-brand-700 hover:underline"
                    >
                      {area.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={routes.city(city.citySlug)}
                className="mt-4 inline-block text-sm font-semibold text-accent-600 hover:underline"
              >
                View all {city.cityName} pages →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
