import { Section } from "@/components/ui/Section";
import { PhotoGallery } from "@/components/ui/PhotoGallery";
import { getPhotosForService } from "@/config/photo-catalog";

export function Testimonials() {
  const balconyPhotos = getPhotosForService("invisible-grills", 6);
  if (balconyPhotos.length === 0) return null;

  return (
    <Section ariaLabel="Installation photos">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
          Installation photos
        </p>
        <h2 className="mt-2 text-3xl font-bold text-neutral-900">
          Finished invisible-grill work
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-neutral-600">
          These are installation photographs. They are not customer reviews, and they are not case studies.
        </p>
      </div>
      <div className="mt-10">
        <PhotoGallery photos={balconyPhotos} columns={3} showCaptions={false} />
      </div>
    </Section>
  );
}
