import { Section } from "@/components/ui/Section";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { PageHero } from "@/components/layout/PageHero";
import { PagePhotoStrip } from "@/components/layout/PagePhotoStrip";
import { getHeroPhoto, getInterleavedPhotos, getPhotosForFolder } from "@/config/photo-catalog";
import { business } from "@/config/business";
import { routes } from "@/config/routes";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "About SafeShield Solutions | Chhattisgarh Installation",
  description:
    "SafeShield Solutions surveys and fits invisible grills and safety nets in Chhattisgarh. Raipur is listed first. Free site survey and a 5-year warranty on the written job.",
  path: "/about",
});

const whyPoints = [
  {
    title: "Measured around your opening",
    body: "We plan around fixing points, daily use, and local exposure — not generic kit sizes.",
  },
  {
    title: "Written specifications",
    body: "Cable grade, mesh type, anchors, included labour, and warranty terms are confirmed before work starts.",
  },
  {
    title: "Chhattisgarh coverage",
    body: "Raipur is listed first. Every other listed town in Chhattisgarh has its own pages.",
  },
  {
    title: "After-sales support",
    body: "Reach us by phone or WhatsApp for tension checks, adjustments, and warranty support.",
  },
];

export default function AboutPage() {
  const photos = [
    ...getPhotosForFolder("balcony-invisible-grills", 4),
    ...getPhotosForFolder("safety-nets", 4),
    ...getPhotosForFolder("pigeon-safety-nets", 4),
    ...getInterleavedPhotos(8),
  ].slice(0, 12);

  return (
    <>
      <PageHero
        eyebrow="About SafeShield Solutions"
        title={`Why Choose ${business.name}`}
        description={business.description}
        photo={getHeroPhoto()}
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "About" },
        ]}
      />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2">
          {whyPoints.map((point) => (
            <div key={point.title} className="rounded-xl border border-neutral-200 p-5">
              <h2 className="font-semibold text-neutral-900">{point.title}</h2>
              <p className="mt-1 text-sm text-neutral-600">{point.body}</p>
            </div>
          ))}
        </div>
        <p className="prose-content mt-8 max-w-3xl">
          {business.name} surveys the opening, then writes the specification. The quote
          covers cable or mesh grade, fixing, labour, and a {business.trustSignals.warrantyYears} year
          warranty. Town pages describe Chhattisgarh service areas. They do not claim a local branch.
        </p>
      </Section>
      <PagePhotoStrip
        photos={photos}
        heading="Work from our installation teams"
        description="Invisible grills, balcony nets, pigeon nets and cloth hangers from completed projects."
        columns={4}
      />
      <ProcessSteps />
    </>
  );
}
