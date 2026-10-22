import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { PhotoStreamGrid, type PhotoStreamItem } from "@/components/home/PhotoStreamGrid";
import {
  getInterleavedPhotos,
  totalPhotoCount,
  type ProjectPhoto,
} from "@/config/photo-catalog";
import { isIndexableInternalPath } from "@/lib/indexable-href";
import { routes } from "@/config/routes";

const serviceFolderMap: Record<string, string> = {
  "balcony-invisible-grills": "invisible-grills",
  "window-invisible-grills": "window-invisible-grills",
  "safety-nets": "safety-nets",
  "child-safety-grills": "child-safety-grills",
  "pigeon-safety-nets": "pigeon-safety-nets",
  "bird-spikes": "bird-spikes",
  "mosquito-nets": "mosquito-nets",
  "cloth-hangers": "cloth-hangers",
  "cricket-nets": "cricket-nets",
  "pet-safety-nets": "pet-safety-nets",
};

function photoLink(photo: ProjectPhoto): { href: string; caption: string } {
  const serviceSlug = serviceFolderMap[photo.folder] ?? "invisible-grills";
  const candidates = [`/chhattisgarh/raipur/${serviceSlug}`, routes.service(serviceSlug)];
  const href = candidates.find((path) => isIndexableInternalPath(path)) ?? routes.gallery;
  return {
    href,
    caption: photo.caption,
  };
}

export function HomePhotoStream() {
  const items: PhotoStreamItem[] = getInterleavedPhotos().map((photo) => {
    const link = photoLink(photo);
    return { photo, ...link };
  });

  return (
    <Section className="bg-neutral-950 text-white" ariaLabel="Installation photo stream">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent-400">
          {totalPhotoCount} real project photos
        </p>
        <h2 className="mt-2 text-3xl font-bold">Finished installation photographs</h2>
        <p className="mx-auto mt-3 max-w-3xl text-neutral-300">
          Scroll through measured fittings. Each image opens the matching service page for Raipur
          when that page is published.
        </p>
      </div>

      <PhotoStreamGrid items={items} />

      <p className="mt-10 text-center">
        <Link
          href={routes.gallery}
          className="font-semibold text-accent-400 hover:text-accent-300"
        >
          View full gallery with category filters →
        </Link>
      </p>
    </Section>
  );
}
