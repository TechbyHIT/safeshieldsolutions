import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { RAIPUR_ENTRY_LINKS } from "@/lib/seo-priority";

/** One-click path from the homepage to the Raipur commercial URLs. */
export function RaipurEntryLinks() {
  return (
    <Section className="bg-white" ariaLabel="Raipur and Chhattisgarh">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Start here</p>
      <h2 className="mt-2 text-2xl font-bold text-neutral-900">Chhattisgarh, with Raipur first</h2>
      <p className="mt-2 max-w-2xl text-sm text-neutral-600">
        The Raipur pages are the main service area. Pigeon net searches use the pigeon safety net page.
      </p>
      <ul className="mt-4 flex flex-wrap gap-3">
        {RAIPUR_ENTRY_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-800 hover:border-brand-500"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
