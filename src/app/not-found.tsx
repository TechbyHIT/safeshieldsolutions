import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/layout/PageHero";
import { getInterleavedPhotos } from "@/config/photo-catalog";
import { routes } from "@/config/routes";

export const metadata: Metadata = {
  title: "Page not found | SafeShield Solutions",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const photos = getInterleavedPhotos(1);
  return (
    <>
      <PageHero
        eyebrow="404"
        title="Page not found"
        description="The page you are looking for does not exist or may have been moved. Browse services or return home."
        photo={photos[0]}
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Not found" },
        ]}
        showCtas={false}
      />
      <Section className="text-center">
        <div className="flex justify-center gap-4">
          <Button href="/">Go Home</Button>
          <Button href="/services" variant="outline">
            Browse Services
          </Button>
        </div>
      </Section>
    </>
  );
}
