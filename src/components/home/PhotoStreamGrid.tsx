"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ProjectPhoto } from "@/config/photo-catalog";

export interface PhotoStreamItem {
  photo: ProjectPhoto;
  href: string;
  caption: string;
}

const INITIAL = 36;
const STEP = 36;

export function PhotoStreamGrid({ items }: { items: PhotoStreamItem[] }) {
  const [visible, setVisible] = useState(Math.min(INITIAL, items.length));
  const shown = items.slice(0, visible);
  const remaining = items.length - visible;

  return (
    <>
      <div className="mt-10 columns-2 gap-4 md:columns-3 lg:columns-4 xl:columns-5">
        {shown.map((item) => (
          <Link
            key={item.photo.src}
            href={item.href}
            className="group mb-4 block break-inside-avoid overflow-hidden rounded-xl bg-neutral-200"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={item.photo.src}
                alt={`${item.caption} — ${item.photo.alt}`}
                title={item.photo.title}
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                quality={80}
                className="object-cover object-center transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-950/70 to-transparent pt-10" />
              <p className="absolute bottom-0 left-0 right-0 p-3 text-xs font-medium leading-snug text-white md:text-sm">
                {item.caption}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {remaining > 0 && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setVisible((count) => Math.min(count + STEP, items.length))}
            className="rounded-lg bg-brand-900 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-800"
          >
            Show more photos ({remaining} remaining)
          </button>
        </div>
      )}
    </>
  );
}
