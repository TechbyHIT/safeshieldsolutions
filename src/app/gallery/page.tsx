import { Section } from "@/components/ui/Section";
import { PhotoGallery } from "@/components/ui/PhotoGallery";
import { getAllGalleryPhotos, totalPhotoCount } from "@/config/photo-catalog";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Project Gallery | Real Installation Photos",
  description:
    `Browse ${totalPhotoCount} real photos of completed invisible grill, safety net, mosquito net, cloth hanger, cricket net and bird spike installations in Hyderabad and Chennai.`,
  path: "/gallery",
});

export default function GalleryPage() {
  const categories = getAllGalleryPhotos();

  return (
    <>
      <Section>
        <h1 className="text-3xl font-bold text-neutral-900 md:text-4xl">
          Project Gallery — Real Installation Photos
        </h1>
        <p className="prose-content mt-4 max-w-3xl">
          Browse {totalPhotoCount} real project photos from our Hyderabad and Chennai
          teams. Review cable spacing, edge fixing, balcony corners, mesh quality, and
          finish details before choosing your safety solution.
        </p>
      </Section>

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
