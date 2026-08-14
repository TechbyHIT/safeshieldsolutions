import { Section } from "@/components/ui/Section";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { PageHero } from "@/components/layout/PageHero";
import { PagePhotoStrip } from "@/components/layout/PagePhotoStrip";
import { getHeroPhoto, getInterleavedPhotos, getPhotosForFolder } from "@/config/photo-catalog";
import { business } from "@/config/business";
import { routes } from "@/config/routes";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Why Choose Us | Trusted Safety Installation Experts",
  description:
    "12+ years experience, 8500+ projects, SS304 invisible grills and safety nets. Free site survey, transparent pricing, 5-year warranty in Hyderabad & Chennai.",
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
    title: "Local teams in two cities",
    body: "Hyderabad and Chennai installation teams for faster response and area-specific expertise.",
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
          With over {business.trustSignals.yearsExperience} years of experience and{" "}
          {business.trustSignals.projectsCompleted.toLocaleString()}+ completed projects,
          we help families compare the right safety solution before installation —
          invisible grills, safety nets, mosquito nets, cloth hangers, and sports nets.
        </p>
        <h2 className="mt-10 text-2xl font-semibold text-neutral-900">Our Certifications</h2>
        <ul className="prose-content mt-4 list-disc pl-6">
          {business.certifications.map((cert) => (
            <li key={cert}>{cert}</li>
          ))}
        </ul>
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
