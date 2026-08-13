import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
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
import { homeKeywordTags } from "@/config/home-seo-links";
import { buildPageMetadata } from "@/lib/metadata";
import { buildFaqSchema, buildLocalBusinessSchema, buildWebsiteSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildPageMetadata({
  title:
    "Invisible Grills Near Me | Safety Nets, Pigeon Nets & Premium Installation — Chennai, Hyderabad, Coimbatore, Kochi",
  description:
    "Best premium invisible grills, safety nets, pigeon nets, mosquito nets & cloth hangers near me. 700k+ local SEO pages, 120+ project photos, free site survey across Chennai, Hyderabad, Coimbatore & Kochi.",
  path: "/",
  keywords: [...homeKeywordTags],
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={[buildWebsiteSchema(), buildLocalBusinessSchema(), buildFaqSchema(homeFaqs)]} />

      <HomeHero />

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
