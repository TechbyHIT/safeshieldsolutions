import { Section } from "@/components/ui/Section";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { PagePhotoStrip } from "@/components/layout/PagePhotoStrip";
import { routes } from "@/config/routes";
import { getInterleavedPhotos } from "@/config/photo-catalog";
import { buildPageMetadata } from "@/lib/metadata";
import { getActiveCities } from "@/lib/queries";

export const revalidate = 86400;

export const metadata = buildPageMetadata({
  title: "Service Locations | Chennai, Hyderabad, Coimbatore & Kochi",
  description:
    "SafeShield Solutions serves Chennai, Hyderabad, Coimbatore, and Kochi with invisible grills, safety nets, pigeon nets, cloth hangers, and home protection installations.",
  path: "/locations",
});

export default async function LocationsIndexPage() {
  const cities = await getActiveCities();
  const photos = getInterleavedPhotos(12);

  return (
    <>
      <PageHero
        eyebrow="Service cities"
        title="Our Locations"
        description="We provide invisible grills, safety nets, and home protection services across major cities in South India — Chennai, Hyderabad, Coimbatore, and Kochi."
        photo={photos[0]}
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Locations" },
        ]}
      />
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {cities.map((city, index) => {
            const photo = photos[index + 1] ?? photos[0];
            return (
              <Link
                key={city.slug}
                href={routes.city(city.slug)}
                className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-card transition hover:border-accent-500"
              >
                {photo && (
                  <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
                    <Image
                      src={photo.src}
                      alt={`${city.name} invisible grill and safety net installation`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-neutral-900">{city.name}</h2>
                  <p className="mt-3 text-neutral-600">
                    {city.description ??
                      `Professional invisible grills and safety solutions in ${city.name}.`}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>
      <PagePhotoStrip
        photos={photos.slice(0, 8)}
        heading="Installations across our cities"
        columns={4}
      />
    </>
  );
}
