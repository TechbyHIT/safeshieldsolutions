import { PhotoGallery, ProjectPhotoImage } from "@/components/ui/PhotoGallery";
import { SeoImage } from "@/components/ui/SeoImage";
import { getServiceImage } from "@/config/images";
import { getPhotosForService, getPrimaryServicePhoto } from "@/config/photo-catalog";
import { Section } from "@/components/ui/Section";

interface ServicePhotosProps {
  serviceSlug: string;
  serviceName: string;
  cityName?: string;
}

export function ServicePhotoSidebar({ serviceSlug, serviceName }: ServicePhotosProps) {
  const primaryPhoto = getPrimaryServicePhoto(serviceSlug);

  return (
    <div className="lg:sticky lg:top-24 lg:self-start">
      {primaryPhoto ? (
        <ProjectPhotoImage photo={primaryPhoto} priority />
      ) : (
        <SeoImage image={getServiceImage(serviceSlug)} />
      )}
      <p className="mt-3 text-center text-sm text-neutral-500">
        Real {serviceName} installation photo
      </p>
    </div>
  );
}

export function ServicePhotoGallery({
  serviceSlug,
  serviceName,
  cityName,
}: ServicePhotosProps) {
  const photos = getPhotosForService(serviceSlug, 24);
  if (photos.length === 0) return null;

  return (
    <Section className="border-t border-neutral-200 bg-neutral-50" ariaLabel="Project photos">
      <h2 className="text-2xl font-bold text-neutral-900">
        Real {serviceName} Photos{cityName ? ` in ${cityName}` : ""}
      </h2>
      <p className="mt-3 max-w-2xl text-neutral-600">
        Completed installation photos — review cable spacing, edge fixing, mesh
        quality, and finish before booking your survey.
      </p>
      <div className="mt-8">
        <PhotoGallery photos={photos} columns={3} />
      </div>
    </Section>
  );
}
