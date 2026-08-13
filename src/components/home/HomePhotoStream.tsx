import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import {
  getAllGalleryPhotos,
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
  "pet-safety-nets": "safety-nets",
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
  const categories = getAllGalleryPhotos();
  const allPhotos = categories.flatMap((c) => c.photos);

  return (
    <Section className="bg-neutral-950 text-white" ariaLabel="Installation photo stream">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-300">
          {totalPhotoCount}+ real project photos
        </p>
        <h2 className="mt-2 text-3xl font-bold">
          Premium invisible grills, safety nets & pigeon nets — completed work
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-brand-200">
          Scroll through every installation photo from Chennai, Hyderabad, Coimbatore, and Kochi
          projects. Each image links to a near-me locality page with full pricing, dealer, and
          installation guides.
        </p>
      </div>

      <div className="mt-10 columns-2 gap-4 md:columns-3 lg:columns-4 xl:columns-5">
        {allPhotos.map((photo, index) => {
          const { href, caption } = photoLink(photo, index);
          return (
            <Link
              key={photo.src}
              href={href}
              className="group mb-4 block break-inside-avoid overflow-hidden rounded-xl bg-brand-900"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={photo.src}
                  alt={`${caption} — ${photo.alt}`}
                  title={photo.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                <p className="absolute bottom-0 left-0 right-0 p-3 text-xs font-medium leading-snug text-white md:text-sm">
                  {caption}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

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
