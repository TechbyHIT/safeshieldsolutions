import { Section } from "@/components/ui/Section";
import { ProjectPhotoImage } from "@/components/ui/PhotoGallery";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { getHeroPhoto } from "@/config/photo-catalog";
import { business } from "@/config/business";
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
  const image = getHeroPhoto();

  return (
    <>
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 md:text-4xl">
              Why Choose {business.name}
            </h1>
            <p className="prose-content mt-4">{business.description}</p>
            <p className="prose-content mt-4">
              With over {business.trustSignals.yearsExperience} years of experience and{" "}
              {business.trustSignals.projectsCompleted.toLocaleString()}+ completed projects,
              we help families compare the right safety solution before installation —
              invisible grills, safety nets, mosquito nets, cloth hangers, and sports nets.
            </p>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {whyPoints.map((point) => (
                <div
                  key={point.title}
                  className="rounded-xl border border-neutral-200 p-4"
                >
                  <dt className="font-semibold text-neutral-900">{point.title}</dt>
                  <dd className="mt-1 text-sm text-neutral-600">{point.body}</dd>
                </div>
              ))}
            </dl>
            <h2 className="mt-10 text-2xl font-semibold text-neutral-900">
              Our Certifications
            </h2>
            <ul className="prose-content mt-4 list-disc pl-6">
              {business.certifications.map((cert) => (
                <li key={cert}>{cert}</li>
              ))}
            </ul>
          </div>
          <ProjectPhotoImage photo={image} priority />
        </div>
      </Section>
      <ProcessSteps />
    </>
  );
}
