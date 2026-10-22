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
  headingLevel?: 2 | 3;
}

export function ServiceCard({
  name,
  slug,
  description,
  photoSrc,
  photoAlt,
  href,
  headingLevel = 3,
}: ServiceCardProps) {
  const photo = getPrimaryServicePhoto(slug) ?? getHeroPhoto();
  const imgSrc = photoSrc ?? photo.src;
  const alt = photoAlt ?? photo.alt;
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <article>
      <Link
        href={href}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-card transition hover:border-accent-500 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
          <Image
            src={imgSrc}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            quality={85}
            className="object-cover object-center transition duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <Heading className="text-lg font-semibold text-neutral-900 group-hover:text-brand-900">
            {name}
          </Heading>
          {description && (
            <p className="mt-2 line-clamp-3 text-sm text-neutral-600">{description}</p>
          )}
          <span className="mt-auto pt-4 text-sm font-medium text-brand-700">
            {name} details
            <span aria-hidden> →</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
