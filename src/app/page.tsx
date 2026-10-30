import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeContents } from "@/components/home/HomeContents";
import { StarterFittings } from "@/components/home/StarterFittings";
import { RaipurFocus } from "@/components/home/RaipurFocus";
import { OpeningDecides } from "@/components/home/OpeningDecides";
import { CompareSystems } from "@/components/home/CompareSystems";
import { EstimateFactors } from "@/components/home/EstimateFactors";
import { MaterialsHonest } from "@/components/home/MaterialsHonest";
import { WhySafeShield } from "@/components/home/WhySafeShield";
import { PopularServices } from "@/components/home/PopularServices";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { ProjectGalleryPreview } from "@/components/home/ProjectGalleryPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { FaqSection, FinalCta } from "@/components/home/CityShowcase";
import { homeFaqs } from "@/config/home-content";
import { buildBrandKeywordPlan } from "@/lib/keyword-targeting";
import { buildPageMetadata } from "@/lib/metadata";
import { buildSearchSnippet } from "@/lib/search-snippets";
import { HOME_CONTENT_UPDATED_ISO } from "@/lib/seo-freshness";
import {
  buildFaqSchema,
  buildLocalBusinessSchema,
  buildWebPageSchema,
  buildWebsiteSchema,
} from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

const brandPlan = buildBrandKeywordPlan();
const homeSnippet = buildSearchSnippet({ kind: "home" });

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: homeSnippet.title,
    description: homeSnippet.description,
    path: "/",
    keywords: brandPlan.metaKeywords,
  }),
  other: {
    "geo.region": "IN-CT",
    "geo.placename": "Raipur, Chhattisgarh",
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          buildWebsiteSchema(),
          buildWebPageSchema(homeSnippet.title, homeSnippet.description, "/", HOME_CONTENT_UPDATED_ISO),
          buildLocalBusinessSchema("Raipur"),
          buildFaqSchema(
            homeFaqs,
            "Answers about invisible grills, safety nets, steel grades, pricing, coverage, and warranty from SafeShield Solutions.",
          ),
        ]}
      />

      <HomeHero />
      <HomeContents />
      <StarterFittings />
      <RaipurFocus />
      <OpeningDecides />
      <CompareSystems />
      <EstimateFactors />
      <MaterialsHonest />
      <WhySafeShield />
      <PopularServices />
      <ProcessSteps />
      <ProjectGalleryPreview />
      <Testimonials />
      <FaqSection faqs={homeFaqs} updatedIso={HOME_CONTENT_UPDATED_ISO} />
      <FinalCta />
    </>
  );
}
