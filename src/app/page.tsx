import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { StarterFittings } from "@/components/home/StarterFittings";
import { RaipurFocus } from "@/components/home/RaipurFocus";
import { OpeningDecides } from "@/components/home/OpeningDecides";
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
      <StarterFittings />
      <RaipurFocus />
      <OpeningDecides />
      <EstimateFactors />
      <MaterialsHonest />
      <WhySafeShield />
      <PopularServices />
      <ProcessSteps />
      <ProjectGalleryPreview />
      <Testimonials />
      <FaqSection faqs={homeFaqs} />
      <FinalCta />
    </>
  );
}
