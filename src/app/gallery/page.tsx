import { Section } from "@/components/ui/Section";
import { PhotoGallery } from "@/components/ui/PhotoGallery";
import { PageHero } from "@/components/layout/PageHero";
import { getAllGalleryPhotos, totalPhotoCount } from "@/config/photo-catalog";
import { routes } from "@/config/routes";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Project Gallery | Real Installation Photos",
  description:
    `Browse ${totalPhotoCount} real photos of completed invisible grill, safety net, mosquito net, cloth hanger, cricket net and bird spike installations in Hyderabad and Chennai.`,
  path: "/gallery",
});

export default function GalleryPage() {
  const categories = getAllGalleryPhotos();
  const heroPhoto = categories[0]?.photos[0];

  return (
    <>
      <PageHero
        eyebrow="Completed work"
        title="Project Gallery — Real Installation Photos"
        description={`Browse ${totalPhotoCount} real project photos from our Hyderabad and Chennai teams. Review cable spacing, edge fixing, balcony corners, mesh quality, and finish details before choosing your safety solution.`}
        photo={heroPhoto}
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Gallery" },
        ]}
      />

      {categories.map((category) => (
        <Section
          key={category.folder}
          className="border-t border-neutral-200 bg-neutral-50"
          ariaLabel={category.label}
        >
          <h2 className="text-2xl font-bold text-neutral-900">{category.label}</h2>
          <p className="mt-2 text-sm text-neutral-600">
            {category.photos.length} completed project
            {category.photos.length === 1 ? "" : "s"}
          </p>
          <div className="mt-8">
            <PhotoGallery photos={category.photos} columns={4} />
          </div>
        </Section>
      ))}
    </>
  );
}
