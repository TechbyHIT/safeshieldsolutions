import Image from "next/image";
import type { ImageAsset } from "@/config/images";

interface SeoImageProps {
  image: ImageAsset;
  className?: string;
  sizes?: string;
  fill?: boolean;
}

export function SeoImage({
  image,
  className = "",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  fill = false,
}: SeoImageProps) {
  if (fill) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        title={image.title}
        fill
        priority={image.priority}
        sizes={sizes}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <figure className={className}>
      <Image
        src={image.src}
        alt={image.alt}
        title={image.title}
        width={image.width}
        height={image.height}
        priority={image.priority}
        sizes={sizes}
        className="h-auto w-full rounded-2xl"
      />
      {image.caption && (
        <figcaption className="mt-2 text-center text-sm text-neutral-500">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}
