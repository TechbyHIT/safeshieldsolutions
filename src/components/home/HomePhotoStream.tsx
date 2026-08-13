import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { PhotoStreamGrid, type PhotoStreamItem } from "@/components/home/PhotoStreamGrid";
import {
  getInterleavedPhotos,
  totalPhotoCount,
  type ProjectPhoto,
} from "@/config/photo-catalog";
import {
  HOME_CITIES,
  HOME_CITY_AREAS,
  HOME_TOP_SERVICES,
} from "@/config/home-seo-links";
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

function photoLink(photo: ProjectPhoto, index: number): { href: string; caption: string } {
  const serviceSlug = serviceFolderMap[photo.folder] ?? "invisible-grills";
  const service = HOME_TOP_SERVICES.find((s) => s.slug === serviceSlug);
  const city = HOME_CITIES[index % HOME_CITIES.length]!;
  const areas = HOME_CITY_AREAS[city.slug] ?? [];
  const area = areas[index % areas.length];

  if (area) {
    return {
      href: routes.areaService(city.slug, area.slug, `${serviceSlug}-near-me`),
      caption: `Premium ${service?.name ?? "installation"} near ${area.name}, ${city.name}`,
    };
  }
  return {
    href: routes.cityService(city.slug, `${serviceSlug}-near-me`),
    caption: `Best ${service?.name ?? "installation"} near me in ${city.name}`,
  };
}

export function HomePhotoStream() {
  const items: PhotoStreamItem[] = getInterleavedPhotos().map((photo, index) => {
    const link = photoLink(photo, index);
    return { photo, ...link };
  });

  return (
    <Section className="bg-neutral-950 text-[#FFF9F4]" ariaLabel="Installation photo stream">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent-400">
          {totalPhotoCount} real project photos
        </p>
        <h2 className="mt-2 text-3xl font-bold">
          Premium invisible grills, safety nets & pigeon nets — completed work
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-[#D0C4BE]">
          Scroll through installation photos from Chennai, Hyderabad, Coimbatore, and Kochi
          projects. Each image links to a near-me locality page with pricing, dealer, and
          installation guides.
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
