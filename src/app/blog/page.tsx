import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/layout/PageHero";
import { PagePhotoStrip } from "@/components/layout/PagePhotoStrip";
import { blogPosts, blogRelatedLinks } from "@/config/guides-content";
import { HOME_CITIES } from "@/config/home-seo-links";
import { getInterleavedPhotos } from "@/config/photo-catalog";
import { buildPageMetadata } from "@/lib/metadata";
import { routes } from "@/config/routes";

export const revalidate = 86400;

export const metadata = buildPageMetadata({
  title: "Chhattisgarh Installation Notes",
  description:
    "Installation notes are listed here only when they are about towns SafeShield Solutions actually serves in Chhattisgarh. Out-of-state articles stay out of the index.",
  path: "/blog",
  keywords: ["SafeShield Solutions", "Chhattisgarh installation notes"],
});

export default function BlogPage() {
  const photos = getInterleavedPhotos(9);
  return (
    <>
    <PageHero
      eyebrow="Blog"
      title="Installation notes"
      description="Articles about towns outside Chhattisgarh are not service pages and are excluded from the index."
      photo={photos[0]}
      breadcrumbs={[
        { label: "Home", href: routes.home },
        { label: "Blog" },
      ]}
    />
    <Section>

      <div className="mt-12 space-y-10">
        {blogPosts.filter((post) => post.citySlug === "chhattisgarh").map((post) => (
          <article
            key={post.slug}
            className="rounded-2xl border border-neutral-200 p-6 md:p-8"
          >
            <time className="text-xs font-medium text-neutral-500">{post.date}</time>
            <h2 className="mt-2 text-2xl font-bold text-neutral-900">{post.title}</h2>
            <p className="mt-3 max-w-3xl text-neutral-600">{post.excerpt}</p>
            <Link
              href={routes.blogPost(post.slug)}
              className="mt-4 inline-block font-semibold text-brand-700 hover:underline"
            >
              Read article →
            </Link>
            <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-neutral-800">
              Related intent pages
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {blogRelatedLinks(post).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-800 hover:bg-brand-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {blogPosts.every((post) => post.citySlug !== "chhattisgarh") && (
        <p className="max-w-3xl text-neutral-700">
          There are no indexed articles yet. Service pages for Raipur and the other Chhattisgarh towns are the pages to use.
        </p>
      )}
      <section className="mt-16 border-t border-neutral-200 pt-12">
        <h2 className="text-2xl font-bold text-neutral-900">Chhattisgarh</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_CITIES.map((city) => (
            <Link
              key={city.slug}
              href={city.slug === "chhattisgarh" ? "/chhattisgarh" : routes.city(city.slug)}
              className="rounded-xl border border-neutral-200 p-5 hover:border-accent-500 hover:bg-neutral-100"
            >
              <h3 className="font-bold text-neutral-900">{city.name}</h3>
              <p className="mt-2 text-sm text-neutral-600">
                All localities, services, and premium installation pages
              </p>
            </Link>
          ))}
        </div>
      </section>
    </Section>
    <PagePhotoStrip photos={photos} heading="Project photos from the cities we write about" columns={3} />
    </>
  );
}
