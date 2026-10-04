import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { routes } from "@/config/routes";
import { CG_CORE_SERVICE_SLUGS, CG_PRIORITY_PLACES } from "@/data/cg-local-seo";
import { getSeoService } from "@/data/seo-services";
import { buildPageMetadata } from "@/lib/metadata";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { getPrimaryServicePhoto } from "@/config/photo-catalog";
import { RAIPUR_ENTRY_LINKS } from "@/lib/seo-priority";

export const metadata: Metadata = buildPageMetadata({
  title: "Safety Nets & Invisible Grills in Chhattisgarh",
  description:
    "Safety nets, pigeon nets, and invisible grills in Chhattisgarh. Raipur is listed first, then Bhilai, Durg, Bilaspur, and the other served towns.",
  path: "/chhattisgarh",
});

export default function ChhattisgarhStatePage() {
  const services = CG_CORE_SERVICE_SLUGS.map((slug) => getSeoService(slug)).filter(
    (service): service is NonNullable<typeof service> => Boolean(service),
  );
  const breadcrumbs = [
    { name: "Home", url: routes.home },
    { name: "Chhattisgarh", url: "/chhattisgarh" },
  ];

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      <PageHero
        eyebrow="Chhattisgarh"
        title="Safety nets and invisible grills in Chhattisgarh"
        description="Raipur is listed first. Bhilai, Durg, Bilaspur, Korba, and the other towns below are the places with their own service pages. Quotes follow a site measurement."
        photo={getPrimaryServicePhoto("safety-nets")}
        breadcrumbs={breadcrumbs.map((item) => ({ label: item.name, href: item.url }))}
      />
      <Section>
        <h2 className="text-2xl font-bold text-neutral-900">Raipur first</h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {RAIPUR_ENTRY_LINKS.filter((link) => link.href !== "/chhattisgarh").map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-800 hover:border-brand-500"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <h2 className="mt-12 text-2xl font-bold text-neutral-900">Towns</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CG_PRIORITY_PLACES.map((place) => (
            <li key={place.slug} className="rounded-2xl border border-neutral-200 p-4">
              <Link href={`/chhattisgarh/${place.slug}`} className="font-semibold text-brand-800 hover:underline">
                {place.name}
              </Link>
              <p className="mt-2 text-sm text-neutral-600">{place.localContext}</p>
            </li>
          ))}
        </ul>
        <h2 className="mt-12 text-2xl font-bold text-neutral-900">Services</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {services.map((service) => (
            <li key={service.slug}>
              <Link href={routes.service(service.slug)} className="text-brand-700 hover:underline">
                {service.name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-neutral-600">
          <Link href="/pricing" className="font-medium text-brand-700 hover:underline">
            What affects price
          </Link>
          {" · "}
          <Link href="/compare" className="font-medium text-brand-700 hover:underline">
            Comparisons
          </Link>
        </p>
      </Section>
    </>
  );
}
