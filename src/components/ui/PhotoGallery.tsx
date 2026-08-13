import Image from "next/image";
import type { ProjectPhoto } from "@/config/photo-catalog";

interface ProjectPhotoProps {
  photo: ProjectPhoto;
  className?: string;
  sizes?: string;
  fill?: boolean;
  priority?: boolean;
}

export function ProjectPhotoImage({
  photo,
  className = "",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  fill = false,
  priority = false,
}: ProjectPhotoProps) {
  if (fill) {
    return (
      <Image
        src={photo.src}
        alt={photo.alt}
        title={photo.title}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <figure className={className}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100">
        <Image
          src={photo.src}
          alt={photo.alt}
          title={photo.title}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition hover:scale-105"
        />
      </div>
      <figcaption className="mt-2 text-center text-xs text-neutral-500">
        {photo.title}
      </figcaption>
    </figure>
  );
}

interface PhotoGalleryProps {
  photos: ProjectPhoto[];
  columns?: 2 | 3 | 4;
  showCaptions?: boolean;
}

export function PhotoGallery({
  photos,
  columns = 3,
  showCaptions = true,
}: PhotoGalleryProps) {
  if (photos.length === 0) return null;

  const colClass =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid gap-4 ${colClass}`}>
      {photos.map((photo) => (
        <figure key={photo.src} className="group overflow-hidden rounded-2xl bg-neutral-100">
          <div className="relative aspect-[4/3]">
            <Image
              src={photo.src}
              alt={photo.alt}
              title={photo.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition duration-300 group-hover:scale-105"
            />
          </div>
          {showCaptions && (
            <figcaption className="bg-white px-3 py-2 text-xs text-neutral-600">
              {photo.title}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
