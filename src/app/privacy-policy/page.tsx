import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/layout/PageHero";
import { getInterleavedPhotos } from "@/config/photo-catalog";
import { routes } from "@/config/routes";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Privacy Policy | SafeShield Solutions",
  description: "Privacy policy for SafeShield Solutions website and contact enquiries.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  const photos = getInterleavedPhotos(1);
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="How SafeShield Solutions uses contact information submitted through the website, phone, or WhatsApp."
        photo={photos[0]}
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Privacy Policy" },
        ]}
        showCtas={false}
      />
      <Section>
        <div className="prose-content max-w-3xl space-y-4">
          <p>
            SafeShield Solutions collects contact information you submit through our website forms,
            phone, or WhatsApp to provide quotations and schedule site surveys for invisible grills,
            safety nets, and related installation services.
          </p>
          <p>
            We do not sell personal data. Information is used solely for service delivery, follow-up
            on installation enquiries, and warranty support in Chennai, Hyderabad, Coimbatore, and
            Kochi service areas.
          </p>
          <p>
            For data requests or deletion, contact us through the phone number listed on our contact
            page.
          </p>
        </div>
      </Section>
    </>
  );
}
