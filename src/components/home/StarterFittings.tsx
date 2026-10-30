import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { starterFittings } from "@/config/home-content";
import { routes } from "@/config/routes";
import { isIndexableInternalPath } from "@/lib/indexable-href";

export function StarterFittings() {
  return (
    <Section id="start-here" ariaLabel="Three fittings most homes start with">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-600">Start here</p>
      <h2 id="start-here-heading" className="mt-2 max-w-3xl font-display text-3xl font-semibold tracking-tight text-brand-950 md:text-4xl">
        Three fittings most Raipur homes start with
      </h2>
      <p className="mt-3 max-w-2xl text-neutral-600">
        A balcony net, a pigeon enclosure, and a cable grill solve different problems. The visit
        decides which one the opening actually needs.
      </p>

      <ul className="mt-10 grid gap-8 md:grid-cols-3">
        {starterFittings.map((item, index) => {
          const href = routes.service(item.slug);
          const content = (
            <>
              <span className="font-display text-4xl font-semibold text-brand-200" aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-4 font-display text-xl font-semibold text-brand-950">{item.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600 md:text-base">{item.description}</p>
              <span className="mt-5 inline-flex text-sm font-semibold text-accent-600">
                View service →
              </span>
            </>
          );

          return (
            <li key={item.slug} className="border-t border-brand-200 pt-6">
              {isIndexableInternalPath(href) ? (
                <Link href={href} className="group block transition hover:opacity-95">
                  {content}
                </Link>
              ) : (
                <div>{content}</div>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
