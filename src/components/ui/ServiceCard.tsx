import Image from "next/image";
import Link from "next/link";

import { getPrimaryServicePhoto } from "@/config/photo-catalog";
import { getServiceImage } from "@/config/images";

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
  imageSlug,
  photoSrc,
  photoAlt,
  href,
}: ServiceCardProps) {
  const photo = slug ? getPrimaryServicePhoto(slug) : null;
  const fallback = getServiceImage(imageSlug ?? slug ?? "invisible-grills");
  const imgSrc = photoSrc ?? photo?.src ?? fallback.src;
  const alt = photoAlt ?? photo?.alt ?? fallback.alt;

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
