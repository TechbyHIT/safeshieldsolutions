import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found | SafeShield Solutions",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Section className="text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">404</p>
      <h1 className="mt-3 text-3xl font-bold text-neutral-900">Page not found</h1>
      <p className="mx-auto mt-4 max-w-md text-neutral-600">
        The page you are looking for does not exist or may have been moved.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Button href="/">Go Home</Button>
        <Button href="/services" variant="outline">
          Browse Services
        </Button>
      </div>
    </Section>
  );
}
