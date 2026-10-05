import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { PageContentRenderer } from "@/components/content/PageContentRenderer";
import { RelatedLinks } from "@/components/content/RelatedLinks";
import { ServicePhotoGallery, ServicePhotoSidebar } from "@/components/content/ServicePhotos";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/layout/PageHero";
import { getPrimaryServicePhoto } from "@/config/photo-catalog";
import { buildCityServiceContent } from "@/lib/content";
import {
  buildCityServiceMetadata,
  buildPageMetadata,
} from "@/lib/metadata";
import { ChhattisgarhPlacePage } from "@/components/seo/ChhattisgarhPlacePage";
import { LocalServicePage } from "@/components/seo/LocalServicePage";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceSchema,
} from "@/lib/schema";
import { resolveAreaPageSlug } from "@/lib/area-page-slugs";
import { getSeoService } from "@/data/seo-services";
import { getCgPlace, SERVICE_SLUG_ALIASES } from "@/data/cg-local-seo";
import { generateCatchAllStaticParams } from "@/lib/ssg-priority";
import {
  getCityBySlug,
  getAreaBySlugs,
  getServiceBySlug,
  getRelatedCityServicePages,
} from "@/lib/queries";
import { enforceIndexablePath } from "@/lib/seo-enforce";
import { buildLocalLandingCopy, type LocalIntent } from "@/lib/local-landing-content";
import { getDistrictForCity } from "@/data/cg-hierarchy";

export const revalidate = 86400;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ city: string; segments: string[] }>;
}

/** High-priority HTML only. Other valid URLs still render on demand (ISR). */
export function generateStaticParams() {
  return generateCatchAllStaticParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city, segments } = await params;
  const path = `/${city}/${segments.join("/")}`;
  const gate = enforceIndexablePath(path);
  const cityData = await getCityBySlug(city);
  if (!cityData || segments.length === 0 || segments.length > 2) notFound();

  if (segments.length === 1) {
    const pageSlug = segments[0]!;
    const asPlace = await getAreaBySlugs(city, pageSlug);
    const resolved = resolveAreaPageSlug(pageSlug, city);
    if (asPlace && !resolved) {
      const district = getDistrictForCity(pageSlug);
      return buildPageMetadata({
        title: `Invisible Grills & Safety Nets in ${asPlace.name}, Chhattisgarh`,
        description: `Safety nets, pigeon nets, bird spikes, and invisible grills in ${asPlace.name}${district ? `, ${district.name} district` : ""}. Free site survey and a written quote.`,
        path,
        canonicalPath: path,
        robots: { index: true, follow: true },
        keywords: [asPlace.name, "Chhattisgarh", "invisible grills", "safety nets", "bird spikes"],
      });
    }
    const serviceSlug = resolved?.serviceSlug ?? pageSlug;
    const serviceData = await getServiceBySlug(serviceSlug);
    if (!serviceData || (!resolved && !getSeoService(pageSlug))) notFound();
    return buildCityServiceMetadata(
      serviceData.name,
      cityData.name,
      city,
      pageSlug,
      resolved?.intentLabel,
      resolved?.serviceSlug,
    );
  }

  const place = getCgPlace(segments[0]!);
  const resolved = resolveAreaPageSlug(segments[1]!, city);
  if (!place || !resolved) notFound();
  const catalogue = getSeoService(resolved.serviceSlug);
  if (!catalogue) notFound();
  const intent: LocalIntent = resolved.intentLabel === "near me" ? "near-me" : "general";
  const copy = buildLocalLandingCopy(place, catalogue, intent);
  return buildPageMetadata({
    title: copy.title,
    description: copy.description,
    path: copy.path,
    canonicalPath: copy.path,
    keywords: [catalogue.name, place.name, "Chhattisgarh", "installation"],
    robots: { index: gate.index, follow: true },
  });
}

export default async function CitySegmentPage({ params }: PageProps) {
  const { city, segments } = await params;
  const path = `/${city}/${segments.join("/")}`;
  enforceIndexablePath(path);
  const cityData = await getCityBySlug(city);
  if (!cityData || segments.length === 0 || segments.length > 2) notFound();

  if (segments.length === 1) {
    const pageSlug = segments[0]!;
    const asPlace = await getAreaBySlugs(city, pageSlug);
    const resolved = resolveAreaPageSlug(pageSlug, city);
    if (asPlace && !resolved) {
      return (
        <ChhattisgarhPlacePage
          placeSlug={pageSlug}
          placeName={asPlace.name}
          stateName={cityData.name}
        />
      );
    }
    const serviceSlug = resolved?.serviceSlug ?? pageSlug;
    const serviceData = await getServiceBySlug(serviceSlug);
    if (!serviceData || (!resolved && !getSeoService(pageSlug))) notFound();

    const content = buildCityServiceContent(
      {
        serviceName: serviceData.name,
        serviceSlug: serviceData.slug,
        serviceDescription: serviceData.description ?? serviceData.name,
        category: serviceData.category,
      },
      {
        locationName: cityData.name,
        locationSlug: cityData.slug,
        locationType: "CITY",
        cityName: cityData.name,
        citySlug: city,
        intentLabel: resolved?.intentLabel,
      },
    );

    const h1 = `${serviceData.name} in Chhattisgarh`;
    const breadcrumbs = [
      { name: "Home", url: "/" },
      { name: "Chhattisgarh", url: "/chhattisgarh" },
      { name: serviceData.name, url: path },
    ];
    const related = await getRelatedCityServicePages(city, serviceSlug);

    return (
      <>
        <JsonLd
          data={[
            buildServiceSchema(serviceData.name, serviceData.description ?? "", path),
            buildBreadcrumbSchema(breadcrumbs),
            buildFaqSchema(content.faqs.slice(0, 6)),
          ]}
        />
        <PageHero
          eyebrow="Chhattisgarh service"
          title={h1}
          description={content.intro}
          photo={getPrimaryServicePhoto(serviceData.slug)}
          breadcrumbs={breadcrumbs.map((b) => ({ label: b.name, href: b.url }))}
        />
        <Section>
          <div className="grid gap-10 lg:grid-cols-2">
            <PageContentRenderer content={content} h1={h1} hideH1 />
            <ServicePhotoSidebar serviceSlug={serviceData.slug} serviceName={serviceData.name} />
          </div>
          <RelatedLinks
            heading="Town pages"
            links={[
              {
                href: `/chhattisgarh/raipur/${serviceData.slug}`,
                label: `${serviceData.name} in Raipur`,
              },
              ...related.slice(0, 6).map((p) => ({
                href: p.path,
                label: p.service?.name ?? p.title,
              })),
            ]}
          />
        </Section>
        <ServicePhotoGallery
          serviceSlug={serviceData.slug}
          serviceName={serviceData.name}
          cityName="Chhattisgarh"
        />
      </>
    );
  }

  const areaSlug = segments[0]!;
  const pageSlug = segments[1]!;
  const alias = SERVICE_SLUG_ALIASES[pageSlug];
  if (alias) permanentRedirect(`/${city}/${areaSlug}/${alias}`);
  const resolved = resolveAreaPageSlug(pageSlug, city);
  const placeProfile = getCgPlace(areaSlug);
  const catalogue = resolved ? getSeoService(resolved.serviceSlug) : undefined;
  if (!placeProfile || !catalogue || !resolved) notFound();
  const intent: LocalIntent = resolved.intentLabel === "near me" ? "near-me" : "general";
  return <LocalServicePage place={placeProfile} service={catalogue} intent={intent} />;
}
