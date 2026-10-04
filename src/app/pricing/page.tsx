import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { AreaEstimator } from "@/components/seo/AreaEstimator";
import { PRICING_PAGES } from "@/data/cg-local-seo";
import { routes } from "@/config/routes";
import { buildPageMetadata } from "@/lib/metadata";
import { getHeroPhoto } from "@/config/photo-catalog";

export const metadata: Metadata = buildPageMetadata({
  title: "Invisible Grill & Safety Net Pricing Factors",
  description:
    "What changes an invisible grill or safety net quote in Chhattisgarh: size, material, access, and fixing. No flat rate is published. Ask for a measured quote.",
  path: "/pricing",
});

const FACTORS = [
  { title: "Opening size", body: "Width, height, and how many openings are in the same visit." },
  { title: "Material", body: "SS304 is the usual grill grade. SS316 is specified when corrosion exposure is higher. Net mesh depends on the job: child, pet, pigeon, terrace, or duct." },
  { title: "Access", body: "Floor height, scaffolding, and whether the fixing is done from inside the flat." },
  { title: "Fixing surface", body: "Concrete, brick, aluminium frames, and society rules change the anchors." },
  { title: "Place", body: "Travel and local access differ between Raipur and other Chhattisgarh towns. The quote names the town." },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="What changes the quote"
        description="There is no published rate per square foot on this site. A written quote follows measurement of the opening."
        photo={getHeroPhoto()}
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Pricing" },
        ]}
      />
      <Section>
        <ul className="grid gap-4 md:grid-cols-2">
          {FACTORS.map((factor) => (
            <li key={factor.title} className="rounded-2xl border border-neutral-200 p-5">
              <h2 className="font-bold text-neutral-900">{factor.title}</h2>
              <p className="mt-2 text-sm text-neutral-700">{factor.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <AreaEstimator />
        </div>
        <ul className="mt-8 flex flex-wrap gap-3">
          {PRICING_PAGES.map((page) => (
            <li key={page.slug}>
              <Link href={`/pricing/${page.slug}`} className="text-brand-700 hover:underline">
                {page.name} price factors
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-neutral-700">
          Start with{" "}
          <Link href="/chhattisgarh/raipur/invisible-grills" className="text-brand-700 hover:underline">
            invisible grills in Raipur
          </Link>{" "}
          or{" "}
          <Link href="/chhattisgarh/raipur/safety-nets" className="text-brand-700 hover:underline">
            safety nets in Raipur
          </Link>{" "}
          or{" "}
          <Link href="/chhattisgarh/raipur/pigeon-safety-nets" className="text-brand-700 hover:underline">
            pigeon nets in Raipur
          </Link>
          , or send the opening photo from the{" "}
          <Link href={routes.contact} className="text-brand-700 hover:underline">
            contact page
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
