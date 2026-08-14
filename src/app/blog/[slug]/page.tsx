import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/layout/PageHero";
import { PagePhotoStrip } from "@/components/layout/PagePhotoStrip";
import { blogPosts, blogRelatedLinks } from "@/config/guides-content";
import { getPhotosForService, getPrimaryServicePhoto } from "@/config/photo-catalog";
import { routes } from "@/config/routes";
import { buildPageMetadata } from "@/lib/metadata";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/schema";

export const revalidate = 86400;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();
  return buildPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: routes.blogPost(post.slug),
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const breadcrumbs = [
    { name: "Home", url: routes.home },
    { name: "Blog", url: routes.blog },
    { name: post.title, url: routes.blogPost(post.slug) },
  ];
  const photos = getPhotosForService(post.serviceSlug, 9);

  return (
    <>
      <JsonLd
        data={[
          buildWebPageSchema(post.title, post.excerpt, routes.blogPost(post.slug)),
          buildBreadcrumbSchema(breadcrumbs),
        ]}
      />
      <PageHero
        eyebrow={post.date}
        title={post.title}
        description={post.excerpt}
        photo={getPrimaryServicePhoto(post.serviceSlug)}
        breadcrumbs={breadcrumbs.map((b) => ({ label: b.name, href: b.url }))}
      />
      <Section>
        <p className="prose-content max-w-3xl">
          This locality note covers {post.serviceSlug.replace(/-/g, " ")} work in{" "}
          {post.areaSlug.replace(/-/g, " ")}, {post.citySlug}. Open the full area service page for
          materials, pricing signals, and installation process.
        </p>
        <p className="mt-6">
          <Link
            href={routes.areaService(post.citySlug, post.areaSlug, post.serviceSlug)}
            className="font-semibold text-brand-700 hover:underline"
          >
            Full {post.areaSlug.replace(/-/g, " ")} service page →
          </Link>
        </p>
        <h2 className="mt-12 text-xl font-bold text-neutral-900">Related intent pages</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
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
        <p className="mt-10">
          <Link href={routes.blog} className="text-sm font-medium text-neutral-700 hover:underline">
            ← All articles
          </Link>
        </p>
      </Section>
      <PagePhotoStrip photos={photos} heading="Related installation photos" columns={3} />
    </>
  );
}
