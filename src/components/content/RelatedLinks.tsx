import Link from "next/link";
import type { InternalLink } from "@/lib/internal-links";

interface RelatedLinksProps {
  heading: string;
  links: InternalLink[];
}

export function RelatedLinks({ heading, links }: RelatedLinksProps) {
  if (links.length === 0) return null;

  return (
    <aside className="mt-12 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
      <h2 className="text-lg font-semibold text-neutral-900">{heading}</h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-brand-700 hover:underline"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
