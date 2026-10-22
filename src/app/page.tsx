import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { RaipurFocus } from "@/components/home/RaipurFocus";
import { RaipurEntryLinks } from "@/components/seo/RaipurEntryLinks";
import { ProblemSelector } from "@/components/home/ProblemSelector";
import { PopularServices } from "@/components/home/PopularServices";
import { ExtendedServices } from "@/components/home/ExtendedServices";
import { PriceGuide } from "@/components/home/PriceGuide";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { ProjectGalleryPreview } from "@/components/home/ProjectGalleryPreview";
import { HomePhotoStream } from "@/components/home/HomePhotoStream";
import { NearMeKeywordHub } from "@/components/home/NearMeKeywordHub";
import { AreaExplorer } from "@/components/home/AreaExplorer";
import {
  CityShowcase,
  FaqSection,
  FinalCta,
} from "@/components/home/CityShowcase";
import { Testimonials } from "@/components/home/Testimonials";
import { homeFaqs } from "@/config/home-content";
import { buildBrandKeywordPlan } from "@/lib/keyword-targeting";
import { buildPageMetadata } from "@/lib/metadata";
import { buildSearchSnippet } from "@/lib/search-snippets";
import { buildFaqSchema, buildLocalBusinessSchema, buildWebsiteSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

const brandPlan = buildBrandKeywordPlan();
const homeSnippet = buildSearchSnippet({ kind: "home" });

export const metadata: Metadata = buildPageMetadata({
  title: homeSnippet.title,
  description: homeSnippet.description,
  path: "/",
  keywords: brandPlan.metaKeywords,
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={[buildWebsiteSchema(), buildLocalBusinessSchema("Raipur"), buildFaqSchema(homeFaqs)]} />

      <HomeHero />
      <RaipurEntryLinks />
      <RaipurFocus />

      <ProblemSelector />
      <PopularServices />
      <ProjectGalleryPreview />
      <HomePhotoStream />
      <ExtendedServices />
      <AreaExplorer />
      <NearMeKeywordHub />
      <CityShowcase />
      <PriceGuide />
      <ProcessSteps />
      <Testimonials />
      <FaqSection faqs={homeFaqs} />
      <FinalCta />
    </>
  );
}
