import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/layout/PageHero";
import { PagePhotoStrip } from "@/components/layout/PagePhotoStrip";
import { guideArticles, guideAreaLinks } from "@/config/guides-content";
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
  const guide = guideArticles.find((g) => g.slug === slug);
  if (!guide) notFound();
  return buildPageMetadata({
    title: guide.title,
    description: guide.summary,
    path: routes.guide(guide.slug),
    keywords: guide.keywords,
  });
}

export default async function GuideArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = guideArticles.find((g) => g.slug === slug);
  if (!guide) notFound();

  const breadcrumbs = [
    { name: "Home", url: routes.home },
    { name: "Guides", url: routes.guides },
    { name: guide.title, url: routes.guide(guide.slug) },
  ];
  const photos = getPhotosForService(guide.serviceSlug, 9);

  return (
    <>
      <JsonLd
        data={[
          buildWebPageSchema(guide.title, guide.summary, routes.guide(guide.slug)),
          buildBreadcrumbSchema(breadcrumbs),
        ]}
      />
      <PageHero
        eyebrow="Installation guide"
        title={guide.title}
        description={guide.summary}
        photo={getPrimaryServicePhoto(guide.serviceSlug)}
        breadcrumbs={breadcrumbs.map((b) => ({ label: b.name, href: b.url }))}
      />
      <Section>
        <p className="prose-content max-w-3xl">
          This guide covers buying, installation, and local intent searches for{" "}
          {guide.serviceSlug.replace(/-/g, " ")} across Chennai, Hyderabad, Coimbatore, and Kochi.
          Use the locality links below for neighbourhood-specific quotes and dealer pages.
        </p>
        <p className="mt-6">
          <Link
            href={routes.service(guide.serviceSlug)}
            className="font-semibold text-brand-700 hover:underline"
          >
            Open the {guide.serviceSlug.replace(/-/g, " ")} service hub →
          </Link>
        </p>
        <h2 className="mt-12 text-xl font-bold text-neutral-900">Local pages for this guide</h2>
        <ul className="mt-4 columns-1 gap-x-6 sm:columns-2">
          {guideAreaLinks(guide, 16).map((link) => (
            <li key={link.href} className="break-inside-avoid py-1">
              <Link href={link.href} className="text-sm text-brand-700 hover:underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10">
          <Link href={routes.guides} className="text-sm font-medium text-neutral-700 hover:underline">
            ← All guides
          </Link>
        </p>
      </Section>
      <PagePhotoStrip photos={photos} heading="Photos for this guide" columns={3} />
    </>
  );
}
