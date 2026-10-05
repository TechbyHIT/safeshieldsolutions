import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import { isCgPriorityPlace } from "@/data/cg-local-seo";
import { parentCityForArea } from "@/lib/local-seo-catalog";

export const revalidate = 86400;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string; area: string }>;
}

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, area } = await params;
  if (slug === "chhattisgarh") {
    const dest = isCgPriorityPlace(area)
      ? `/chhattisgarh/${area}`
      : `/chhattisgarh/${parentCityForArea(area)}`;
    permanentRedirect(dest);
  }
  notFound();
}

/** Legacy locations URLs consolidate to the Chhattisgarh place page. */
export default async function AreaHubPage({ params }: PageProps) {
  const { slug, area } = await params;
  if (slug === "chhattisgarh") {
    const dest = isCgPriorityPlace(area)
      ? `/chhattisgarh/${area}`
      : `/chhattisgarh/${parentCityForArea(area)}`;
    permanentRedirect(dest);
  }
  notFound();
}
