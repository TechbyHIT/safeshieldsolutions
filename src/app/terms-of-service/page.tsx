import { Section } from "@/components/ui/Section";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Terms of Service | SafeShield Solutions",
  description: "Terms of service for SafeShield Solutions installation and warranty services.",
  path: "/terms-of-service",
});

export default function TermsPage() {
  return (
    <Section>
      <h1 className="text-3xl font-bold text-neutral-900">Terms of Service</h1>
      <div className="prose-content mt-6 max-w-3xl space-y-4">
        <p>
          Quotations from SafeShield Solutions are valid for the period stated on the written
          estimate. Installation scope, materials, and warranty terms are confirmed after on-site
          survey.
        </p>
        <p>
          Warranty coverage applies to manufacturing defects and installation workmanship as
          documented at handover. Normal wear, unauthorised modifications, and damage from misuse
          are excluded.
        </p>
        <p>
          Service availability covers published city and locality pages. Scheduling depends on crew
          availability and material lead times after quote approval.
        </p>
      </div>
    </Section>
  );
}
