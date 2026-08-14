import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { serviceCities } from "@/config/home-content";
import { getHdPhotoSet } from "@/config/photo-catalog";
import { routes } from "@/config/routes";

export function CityShowcase() {
  const photos = getHdPhotoSet(4);

  return (
    <Section className="bg-brand-950 text-white" ariaLabel="Service cities">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-shield-400">
          Active service cities
        </p>
        <h2 className="mt-2 text-3xl font-bold">
          Best safety nets & invisible grills near me in your city
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-neutral-300">
          Premium near-me installation hubs for Chennai, Hyderabad, Coimbatore, and Kochi — each
          city links to 500+ locality pages with dealers, price, and free survey booking.
        </p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {serviceCities.map((city, index) => {
          const photo = photos[index];
          return (
            <article
              key={city.slug}
              className="overflow-hidden rounded-2xl border border-brand-800 bg-brand-900/50"
            >
              {photo && (
                <div className="relative aspect-[16/10] bg-brand-900">
                  <Image
                    src={photo.src}
                    alt={`${city.name} invisible grill and safety net installation`}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    quality={85}
                    className="object-cover object-center"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold">Safety Nets in {city.name}</h3>
                <p className="mt-3 text-neutral-300">{city.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {city.highlights.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-brand-800 px-3 py-1 text-xs font-medium text-brand-100"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <Link
                  href={routes.city(city.slug)}
                  className="mt-6 inline-flex font-semibold text-shield-400 hover:text-shield-300"
                >
                  Explore {city.name} areas and services →
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}

interface FaqSectionProps {
  faqs: { question: string; answer: string }[];
  id?: string;
}

export function FaqSection({ faqs, id = "faq" }: FaqSectionProps) {
  return (
    <Section id={id} ariaLabel="Frequently asked questions">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
          Helpful answers
        </p>
        <h2 className="mt-2 text-3xl font-bold text-neutral-900">
          Safety net questions worth asking before installation
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-neutral-600">
          These answers help you compare design, price, and purpose without
          relying on unsupported claims.
        </p>
      </div>
      <dl className="mx-auto mt-10 max-w-3xl space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.question}
            className="rounded-xl border border-neutral-200 bg-white p-5"
          >
            <dt className="font-semibold text-neutral-900">{faq.question}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-neutral-600">
              {faq.answer}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

export function FinalCta() {
  return (
    <Section className="bg-gradient-to-r from-brand-950 to-brand-800" ariaLabel="Contact">
      <div className="text-center text-white">
        <h2 className="text-3xl font-bold">
          Ready to compare the right safety solution for your space?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-neutral-300">
          Send the opening, your city, and the main concern — children, pets,
          birds, visibility, or sports use. That is enough to start a useful
          conversation.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/contact" size="lg" className="bg-accent-500 text-white hover:bg-accent-400">
            Send Photo for Estimate
          </Button>
          <Button
            href="/contact"
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white/10"
          >
            Call for Guidance
          </Button>
        </div>
      </div>
    </Section>
  );
}
