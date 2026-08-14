import { Section } from "@/components/ui/Section";
import { PhotoGallery } from "@/components/ui/PhotoGallery";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/layout/PageHero";
import { PagePhotoStrip } from "@/components/layout/PagePhotoStrip";
import { business } from "@/config/business";
import { getPhotosForFolder, getInterleavedPhotos } from "@/config/photo-catalog";
import { routes } from "@/config/routes";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Contact Us | Free Site Survey & Quote",
  description:
    "Contact SafeShield Solutions for free invisible grill and safety net site survey in Hyderabad and Chennai. Send your opening photo for a clear estimate.",
  path: "/contact",
});

export default function ContactPage() {
  const samplePhotos = [
    ...getPhotosForFolder("balcony-invisible-grills", 6),
    ...getPhotosForFolder("safety-nets", 6),
    ...getPhotosForFolder("pigeon-safety-nets", 6),
  ];
  const extraPhotos = getInterleavedPhotos(8);

  return (
    <>
      <PageHero
        eyebrow="Free site survey"
        title="Contact Us"
        description="Get a free site survey and quotation for invisible grills, safety nets, and home protection solutions. Send a clear photo of your opening with your city — we respond within 2 hours during business hours."
        photo={samplePhotos[0]}
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Contact" },
        ]}
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="rounded-xl bg-brand-50 p-5">
              <p className="font-semibold text-brand-900">What to send for a clear estimate</p>
              <ul className="mt-3 space-y-2 text-sm text-brand-800">
                <li>• Full photo of the balcony, window, or terrace opening</li>
                <li>• Close-up of top and side fixing surfaces</li>
                <li>• Approximate width and height if known</li>
                <li>• Your city or neighbourhood</li>
                <li>• Main concern: children, pets, birds, or view-safe safety</li>
              </ul>
            </div>

            <dl className="mt-8 space-y-4">
              <div>
                <dt className="font-semibold text-neutral-900">Phone</dt>
                <dd>
                  <a href={`tel:${business.phone}`} className="text-brand-700 hover:underline">
                    {business.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-neutral-900">WhatsApp</dt>
                <dd>
                  <a
                    href={`https://wa.me/${business.whatsapp.replace(/\D/g, "")}`}
                    className="text-brand-700 hover:underline"
                  >
                    {business.whatsapp}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-neutral-900">Email</dt>
                <dd>
                  <a href={`mailto:${business.email}`} className="text-brand-700 hover:underline">
                    {business.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-neutral-900">Address</dt>
                <dd className="text-neutral-600">
                  {business.address.street}, {business.address.area}, {business.address.city} –{" "}
                  {business.address.pincode}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-neutral-900">Working Hours</dt>
                <dd className="text-neutral-600">
                  Mon–Fri: {business.workingHours.weekdays}
                  <br />
                  Sat: {business.workingHours.saturday}
                  <br />
                  Sun: {business.workingHours.sunday}
                </dd>
              </div>
            </dl>

            <Button
              href={`https://wa.me/${business.whatsapp.replace(/\D/g, "")}`}
              external
              size="lg"
              className="mt-8"
            >
              WhatsApp Your Opening Photo
            </Button>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">Sample completed work</h2>
            <p className="mt-2 text-sm text-neutral-600">
              Examples of the finish you can expect from our installation teams.
            </p>
            <div className="mt-4">
              <PhotoGallery photos={samplePhotos} columns={2} showCaptions={false} />
            </div>
          </div>
        </div>
      </Section>
      <PagePhotoStrip
        photos={extraPhotos}
        heading="More project photos"
        description="Share a similar opening photo on WhatsApp for a faster estimate."
        columns={4}
      />
    </>
  );
}
