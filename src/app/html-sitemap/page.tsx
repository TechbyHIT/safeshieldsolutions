import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/layout/PageHero";
import { CITIES } from "@/data/cities";
import { getAreasForCity } from "@/data/areas";
import { SEO_SERVICES } from "@/data/seo-services";
import { guideArticles, blogPosts } from "@/config/guides-content";
import { getInterleavedPhotos } from "@/config/photo-catalog";
import { routes } from "@/config/routes";
import { buildPageMetadata } from "@/lib/metadata";
import { getTotalUrlCount } from "@/lib/sitemap-urls";

export const revalidate = 86400;

export const metadata = buildPageMetadata({
  title: "HTML Sitemap | All Services, Cities & Guides",
  description:
    "Human sitemap for SafeShield Solutions — services, city hubs, popular localities, guides, and the XML sitemap index for search engines.",
  path: routes.htmlSitemap,
});

const HUB_LINKS = [
  { href: routes.home, label: "Home" },
  { href: routes.services, label: "All services" },
  { href: routes.locations, label: "All locations" },
  { href: routes.guides, label: "Guides" },
  { href: routes.blog, label: "Blog" },
  { href: routes.faq, label: "FAQ" },
  { href: routes.gallery, label: "Gallery" },
  { href: routes.about, label: "About" },
  { href: routes.contact, label: "Contact" },
  { href: routes.sitemap, label: "XML sitemap index" },
];

export default function HtmlSitemapPage() {
  const total = getTotalUrlCount();
  const photos = getInterleavedPhotos(1);

  return (
    <>
    <PageHero
      eyebrow="Sitemap"
      title="HTML sitemap"
      description={`Crawl hubs for every published section. ${total.toLocaleString("en-IN")} indexable URLs are listed in the XML sitemap index. Locality pages live under each city hub to keep this page useful and shallow.`}
      photo={photos[0]}
      breadcrumbs={[
        { label: "Home", href: routes.home },
        { label: "HTML Sitemap" },
      ]}
      showCtas={false}
    />
    <Section>

      <h2 className="mt-12 text-xl font-bold text-neutral-900">Primary hubs</h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {HUB_LINKS.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-brand-700 hover:underline">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="mt-12 text-xl font-bold text-neutral-900">Services</h2>
      <ul className="mt-4 columns-1 gap-x-8 sm:columns-2 lg:columns-3">
        {SEO_SERVICES.map((svc) => (
          <li key={svc.slug} className="break-inside-avoid py-1">
            <Link href={routes.service(svc.slug)} className="text-sm text-brand-700 hover:underline">
              {svc.name}
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="mt-12 text-xl font-bold text-neutral-900">Cities & sample localities</h2>
      <div className="mt-4 grid gap-8 md:grid-cols-2">
        {CITIES.map((city) => {
          const areas = getAreasForCity(city.slug).slice(0, 12);
          return (
            <article key={city.slug}>
              <h3 className="font-semibold text-neutral-900">
                <Link href={routes.city(city.slug)} className="text-brand-800 hover:underline">
                  {city.name}
                </Link>
              </h3>
              <ul className="mt-2 space-y-1">
                {areas.map((area) => (
                  <li key={area.slug}>
                    <Link
                      href={routes.area(city.slug, area.slug)}
                      className="text-sm text-brand-700 hover:underline"
                    >
                      {area.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-sm">
                <Link href={routes.city(city.slug)} className="font-medium text-neutral-700 hover:underline">
                  All {city.name} areas →
                </Link>
              </p>
            </article>
          );
        })}
      </div>

      <h2 className="mt-12 text-xl font-bold text-neutral-900">Guides</h2>
      <ul className="mt-4 space-y-2">
        {guideArticles.map((g) => (
          <li key={g.slug}>
            <Link href={routes.guide(g.slug)} className="text-sm text-brand-700 hover:underline">
              {g.title}
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="mt-12 text-xl font-bold text-neutral-900">Blog</h2>
      <ul className="mt-4 space-y-2">
        {blogPosts.map((p) => (
          <li key={p.slug}>
            <Link href={routes.blogPost(p.slug)} className="text-sm text-brand-700 hover:underline">
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
    </>
  );
}
