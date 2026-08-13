import { Section } from "@/components/ui/Section";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Privacy Policy | SafeShield Solutions",
  description: "Privacy policy for SafeShield Solutions website and contact enquiries.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <Section>
      <h1 className="text-3xl font-bold text-neutral-900">Privacy Policy</h1>
      <div className="prose-content mt-6 max-w-3xl space-y-4">
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
  );
}
