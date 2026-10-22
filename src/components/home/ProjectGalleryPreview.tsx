import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { PhotoGallery } from "@/components/ui/PhotoGallery";
import { getAllGalleryPhotos, getHdPhoto, totalPhotoCount } from "@/config/photo-catalog";
import { routes } from "@/config/routes";

export function ProjectGalleryPreview() {
  const categories = getAllGalleryPhotos();
  const featured = categories
    .flatMap((c) => {
      const hd = getHdPhoto(c.folder);
      const rest = c.photos.filter((photo) => photo.src !== hd.src).slice(0, 5);
      return [hd, ...rest];
    })
    .slice(0, 40);

  return (
    <Section className="bg-white" ariaLabel="Project gallery">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
          Installation gallery
        </p>
        <h2 className="mt-2 text-3xl font-bold text-neutral-900">
          Completed invisible grill and safety net photos
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-neutral-600">
          Browse {totalPhotoCount}+ installation photos — cable spacing, edge fixing, mesh quality,
          and finish details from completed work.
        </p>
      </div>
      <div className="mt-10">
        <PhotoGallery photos={featured} columns={4} showCaptions />
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.folder}
            href={routes.gallery}
            className="rounded-full bg-neutral-100 px-4 py-1.5 text-sm font-medium text-neutral-700 transition hover:bg-brand-50 hover:text-brand-900"
          >
            {cat.label} ({cat.photos.length})
          </Link>
        ))}
      </div>
      <p className="mt-6 text-center">
        <Link href={routes.gallery} className="font-semibold text-brand-700 hover:underline">
          Open the full project gallery
        </Link>
      </p>
    </Section>
  );
}
