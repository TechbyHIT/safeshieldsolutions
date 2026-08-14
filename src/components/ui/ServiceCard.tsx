import Image from "next/image";
import Link from "next/link";

import { getHeroPhoto, getPrimaryServicePhoto } from "@/config/photo-catalog";

interface ServiceCardProps {
  name: string;
  slug: string;
  description?: string | null;
  imageSlug?: string | null;
  photoSrc?: string | null;
  photoAlt?: string | null;
  href: string;
}

export function ServiceCard({
  name,
  slug,
  description,
  photoSrc,
  photoAlt,
  href,
}: ServiceCardProps) {
  const photo = getPrimaryServicePhoto(slug) ?? getHeroPhoto();
  const imgSrc = photoSrc ?? photo.src;
  const alt = photoAlt ?? photo.alt;

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-card transition hover:border-accent-500 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
        <Image
          src={imgSrc}
          alt={alt}
          title={name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          quality={85}
          className="object-cover object-center transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-brand-900">
          {name}
        </h3>
        {description && (
          <p className="mt-2 line-clamp-2 text-sm text-neutral-600">{description}</p>
        )}
        <span className="mt-auto pt-4 text-sm font-medium text-brand-700">
          Learn more →
        </span>
      </div>
    </Link>
  );
}
