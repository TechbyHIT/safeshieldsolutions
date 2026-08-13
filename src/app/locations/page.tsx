import { Section } from "@/components/ui/Section";
import Link from "next/link";
import { routes } from "@/config/routes";
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

  return (
    <Section>
      <h1 className="text-3xl font-bold text-neutral-900 md:text-4xl">Our Locations</h1>
      <p className="prose-content mt-4 max-w-3xl">
        We provide invisible grills, safety nets, and home protection services across major
        cities in South India.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {cities.map((city) => (
          <Link
            key={city.slug}
            href={routes.city(city.slug)}
            className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-card transition hover:border-accent-500"
          >
            <h2 className="text-2xl font-bold text-neutral-900">{city.name}</h2>
            <p className="mt-3 text-neutral-600">
              {city.description ??
                `Professional invisible grills and safety solutions in ${city.name}.`}
            </p>
          </Link>
        ))}
      </div>
    </Section>
  );
}
