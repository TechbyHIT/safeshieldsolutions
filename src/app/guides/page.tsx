import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { guideArticles, allGuideServiceLinks, guideAreaLinks } from "@/config/guides-content";
import { buildPageMetadata } from "@/lib/metadata";
import { routes } from "@/config/routes";

export const revalidate = 86400;

export const metadata = buildPageMetadata({
  title: "Installation Guides | Invisible Grills, Safety Nets & Pigeon Nets Near Me",
  description:
    "Premium installation guides for invisible grills, safety nets, pigeon nets, mosquito nets, cloth hangers, and bird spikes — near-me tips for Chennai, Hyderabad, Coimbatore & Kochi.",
  path: "/guides",
  keywords: [
    "invisible grills guide",
    "safety nets near me guide",
    "pigeon net installation checklist",
    "premium SS304 grills",
  ],
});

export default function GuidesPage() {
  const serviceLinks = allGuideServiceLinks();

  return (
    <Section>
      <h1 className="text-3xl font-bold text-neutral-900 md:text-4xl">
        Premium Installation Guides — Near Me, Price & Dealers
      </h1>
      <p className="prose-content mt-4 max-w-3xl">
        Expert guides for invisible grills, safety nets, pigeon protection, mosquito nets, cloth
        hangers, sports nets, and bird spikes. Each guide links to 1,991 neighbourhood pages with
        installation, price, dealers, best, and premium intent variants across Chennai, Hyderabad,
        Coimbatore, and Kochi.
      </p>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {guideArticles.map((guide) => (
          <article
            key={guide.slug}
            id={guide.slug}
            className="rounded-2xl border border-neutral-200 p-6"
          >
            <h2 className="text-xl font-bold text-neutral-900">{guide.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">{guide.summary}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {guide.keywords.map((kw) => (
                <span
                  key={kw}
                  className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-800"
                >
                  {kw}
                </span>
              ))}
            </div>
            <Link
              href={routes.guide(guide.slug)}
              className="mt-4 inline-block text-sm font-semibold text-brand-700 hover:underline"
            >
              Read full guide →
            </Link>
            <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-neutral-800">
              Local near-me pages for this guide
            </h3>
            <ul className="mt-3 columns-1 gap-x-4 space-y-1.5 sm:columns-2">
              {guideAreaLinks(guide, 12).map((link) => (
                <li key={link.href} className="break-inside-avoid">
                  <Link href={link.href} className="text-xs text-brand-700 hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <section className="mt-16 border-t border-neutral-200 pt-12">
        <h2 className="text-2xl font-bold text-neutral-900">All services near me by city</h2>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {serviceLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded-lg border border-neutral-200 px-3 py-2 text-sm text-brand-700 hover:bg-brand-50"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Section>
  );
}
