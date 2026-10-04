import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
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
import { homeKeywordTags } from "@/config/home-seo-links";
import { buildPageMetadata } from "@/lib/metadata";
import { buildFaqSchema, buildLocalBusinessSchema, buildWebsiteSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildPageMetadata({
  title:
    "Invisible Grills in Chhattisgarh | Safety Nets Raipur, Bhilai, Bilaspur",
  description:
    "Invisible grills, safety nets and pigeon nets in Chhattisgarh. Raipur pages are listed first, then every other Chhattisgarh area. Free site survey, SS304.",
  path: "/",
  keywords: [...homeKeywordTags],
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={[buildWebsiteSchema(), buildLocalBusinessSchema(), buildFaqSchema(homeFaqs)]} />

      <HomeHero />
      <RaipurEntryLinks />

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
