import { PhotoGallery } from "@/components/ui/PhotoGallery";
import { Section } from "@/components/ui/Section";
import type { ProjectPhoto } from "@/config/photo-catalog";

interface PagePhotoStripProps {
  photos: ProjectPhoto[];
  heading?: string;
  description?: string;
  columns?: 2 | 3 | 4;
}

export function PagePhotoStrip({
  photos,
  heading = "Real installation photos",
  description = "Completed invisible grill, safety net, pigeon net and cloth hanger work from our South India teams.",
  columns = 3,
}: PagePhotoStripProps) {
  if (photos.length === 0) return null;

  return (
    <Section className="border-t border-neutral-200 bg-neutral-50" ariaLabel={heading}>
      <h2 className="text-2xl font-bold text-neutral-900">{heading}</h2>
      <p className="mt-2 max-w-2xl text-sm text-neutral-600">{description}</p>
      <div className="mt-8">
        <PhotoGallery photos={photos} columns={columns} />
      </div>
    </Section>
  );
}
