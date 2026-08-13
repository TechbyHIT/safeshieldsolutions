import type { ExploreMoreSectionData } from "@/lib/explore-more-types";
import { ExploreMoreSection } from "@/components/content/explore-more";
import type { InternalLinkGroup } from "@/lib/page-internal-links";

interface PageInternalLinksProps {
  /** Legacy flat groups — prefer `exploreMore` on programmatic pages */
  groups?: InternalLinkGroup[];
  exploreMore?: ExploreMoreSectionData;
}

/** Enterprise “Explore more” hub; falls back to legacy grid when only groups provided. */
export function PageInternalLinks({ groups, exploreMore }: PageInternalLinksProps) {
  if (exploreMore) {
    return <ExploreMoreSection data={exploreMore} />;
  }

  if (!groups?.length) return null;

  return (
    <section className="mt-12 border-t border-neutral-200 pt-10" aria-label="Related pages">
      <h2 className="text-2xl font-bold text-neutral-900">Explore related pages</h2>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {groups.map((group) => (
          <div key={group.heading}>
            <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-800">
              {group.heading}
            </h3>
            <ul className="mt-3 space-y-2">
              {group.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-brand-700 hover:underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
