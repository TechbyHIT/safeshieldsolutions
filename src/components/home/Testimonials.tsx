import { Section } from "@/components/ui/Section";
import { PhotoGallery } from "@/components/ui/PhotoGallery";
import { getPhotosForService } from "@/config/photo-catalog";

const testimonials = [
  {
    name: "Priya R.",
    location: "Gachibowli, Hyderabad",
    service: "invisible-grills",
    text: "Invisible grills on our balcony keep the view open and feel much safer for our children. The team measured carefully and finished neatly.",
  },
  {
    name: "Karthik M.",
    location: "Anna Nagar, Chennai",
    service: "pigeon-safety-nets",
    text: "Pigeon net installation solved a long-standing mess problem on our duct area. Clear quotation and professional fitting.",
  },
  {
    name: "Anitha S.",
    location: "A.S. Rao Nagar, Hyderabad",
    service: "cloth-hangers",
    text: "Ceiling cloth hanger with pulley works smoothly every day. SS304 rods look neat and the survey was free.",
  },
];

export function Testimonials() {
  const balconyPhotos = getPhotosForService("invisible-grills", 6);

  return (
    <Section ariaLabel="Customer testimonials">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
          Customer stories
        </p>
        <h2 className="mt-2 text-3xl font-bold text-neutral-900">
          Trusted by homeowners across Hyderabad and Chennai
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-neutral-600">
          Real feedback from families who compared options, received a measured
          quotation, and chose the fitting that matched their opening and daily use.
        </p>
      </div>

      {balconyPhotos.length > 0 && (
        <div className="mt-10">
          <PhotoGallery photos={balconyPhotos} columns={3} showCaptions={false} />
        </div>
      )}

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {testimonials.map((item) => (
          <blockquote
            key={item.name}
            className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-card"
          >
            <p className="text-sm leading-relaxed text-neutral-700">
              &ldquo;{item.text}&rdquo;
            </p>
            <footer className="mt-4">
              <cite className="not-italic font-semibold text-neutral-900">
                {item.name}
              </cite>
              <p className="text-xs text-neutral-500">{item.location}</p>
            </footer>
          </blockquote>
        ))}
      </div>
    </Section>
  );
}
