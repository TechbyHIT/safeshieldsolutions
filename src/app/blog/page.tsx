import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { blogPosts, blogRelatedLinks } from "@/config/guides-content";
import { HOME_CITIES } from "@/config/home-seo-links";
import { buildPageMetadata } from "@/lib/metadata";
import { routes } from "@/config/routes";

export const revalidate = 86400;

export const metadata = buildPageMetadata({
  title: "Local Project Blog | Invisible Grills & Safety Nets Near Me",
  description:
    "Premium installation stories and near-me tips for invisible grills, safety nets, and pigeon nets in Chennai, Hyderabad, Coimbatore, and Kochi localities.",
  path: "/blog",
  keywords: [
    "safety nets blog",
    "invisible grills near me",
    "local installation tips",
    "premium home safety",
  ],
});

export default function BlogPage() {
  return (
    <Section>
      <h1 className="text-3xl font-bold text-neutral-900 md:text-4xl">
        Local Installation Blog — Premium Near-Me Tips by City
      </h1>
      <p className="prose-content mt-4 max-w-3xl">
        Real locality-focused articles linking to full 20,000+ word SEO pages. Browse project tips
        for Gachibowli, Kakkanad, Peelamedu, Adyar, and more — each post connects to installation,
        price, dealers, and near-me variants.
      </p>

      <div className="mt-12 space-y-10">
        {blogPosts.map((post) => (
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

      <section className="mt-16 border-t border-neutral-200 pt-12">
        <h2 className="text-2xl font-bold text-neutral-900">Browse by city</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_CITIES.map((city) => (
            <Link
              key={city.slug}
              href={routes.city(city.slug)}
              className="rounded-xl border border-neutral-200 p-5 hover:border-accent-500 hover:bg-neutral-100"
            >
              <h3 className="font-bold text-neutral-900">{city.name} near me</h3>
              <p className="mt-2 text-sm text-neutral-600">
                All localities, services, and premium installation pages
              </p>
            </Link>
          ))}
        </div>
      </section>
    </Section>
  );
}
