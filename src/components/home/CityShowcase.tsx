import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { serviceCities } from "@/config/home-content";
import { getHdPhotoSet } from "@/config/photo-catalog";
import { business } from "@/config/business";
import { routes } from "@/config/routes";

export function CityShowcase() {
  const photos = getHdPhotoSet(5);

  return (
    <Section className="bg-brand-950 text-white" ariaLabel="Service cities">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-shield-400">
          Service area
        </p>
        <h2 className="mt-2 text-3xl font-bold">Towns we install in across Chhattisgarh</h2>
        <p className="mx-auto mt-3 max-w-2xl text-neutral-300">
          Raipur is listed first. Other served towns have their own pages. Quotes follow a site
          measurement — not a published flat rate.
        </p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {serviceCities.map((city, index) => {
          const photo = photos[index];
          const href = city.slug === "chhattisgarh" ? "/chhattisgarh" : routes.city(city.slug);
          return (
            <article
              key={city.slug}
              className="overflow-hidden rounded-2xl border border-brand-800 bg-brand-900/50"
            >
              {photo && (
                <div className="relative aspect-[16/10] bg-brand-900">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    quality={85}
                    className="object-cover object-center"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold">{city.name}</h3>
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
                  href={href}
                  className="mt-6 inline-flex font-semibold text-shield-400 hover:text-shield-300"
                >
                  Open {city.name} service pages
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
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-600">
          Before you book
        </p>
        <h2 className="mt-2 max-w-3xl font-display text-3xl font-semibold tracking-tight text-brand-950">
          Questions worth asking before installation
        </h2>
        <p className="mt-3 max-w-2xl text-neutral-600">
          Straight answers on grade, price, and Raipur coverage — without “best” or invented stats.
        </p>
      </div>
      <dl className="mx-auto mt-10 max-w-3xl divide-y divide-neutral-200 border-y border-neutral-200">
        {faqs.map((faq) => (
          <div key={faq.question} className="py-5">
            <dt className="font-display text-lg font-semibold text-brand-950">{faq.question}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-neutral-600 md:text-base">{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

export function FinalCta() {
  const telUrl = `tel:${business.phone.replace(/\s/g, "")}`;
  return (
    <Section className="bg-brand-950" ariaLabel="Contact">
      <div className="max-w-3xl text-white">
        <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Get a free site inspection in Raipur
        </h2>
        <p className="mt-4 max-w-2xl text-neutral-300">
          Tell us the locality, the opening, and the worry — children, pets, pigeons, drying, or a
          practice net. We answer with a visit slot where we serve.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href={routes.contact} size="lg" className="bg-accent-500 text-white hover:bg-accent-400">
            Send a photo for a quote
          </Button>
          <Button
            href={telUrl}
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white/10"
          >
            Call {business.phone}
          </Button>
        </div>
      </div>
    </Section>
  );
}
