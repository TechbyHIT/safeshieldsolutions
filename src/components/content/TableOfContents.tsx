import type { ContentSection } from "@/lib/content";

interface TableOfContentsProps {
  sections: ContentSection[];
  faqCount: number;
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function TableOfContents({ sections, faqCount }: TableOfContentsProps) {
  const h2Sections = sections.filter((s) => s.level !== 3);
  if (h2Sections.length < 4) return null;

  return (
    <nav
      aria-label="On this page"
      className="mt-8 rounded-xl border border-neutral-200 bg-neutral-50 p-5 md:p-6"
    >
      <p className="text-sm font-semibold uppercase tracking-wide text-neutral-600">
        On this page
      </p>
      <ol className="mt-3 columns-1 gap-x-8 space-y-2 text-sm md:columns-2">
        {h2Sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="text-brand-700 hover:text-brand-900 hover:underline"
            >
              {section.heading}
            </a>
          </li>
        ))}
        {faqCount > 0 && (
          <li>
            <a
              href="#faq-heading"
              className="text-brand-700 hover:text-brand-900 hover:underline"
            >
              Common questions ({faqCount})
            </a>
          </li>
        )}
      </ol>
    </nav>
  );
}

export function sectionAnchorId(section: ContentSection): string {
  return section.id || slugifyHeading(section.heading);
}
