import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { PhoneIcon } from "@/components/ui/SocialIcons";
import { homeCatalogServices, materialGrades } from "@/config/home-content";
import { business } from "@/config/business";
import { getHeroPhoto, getPrimaryServicePhoto } from "@/config/photo-catalog";
import { routes } from "@/config/routes";

const telUrl = `tel:${business.phone.replace(/\s/g, "")}`;

export function PopularServices() {
  return (
    <Section className="bg-neutral-50" ariaLabel="Our services">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent-600">Our services</p>
        <h2 className="mt-2 text-3xl font-bold text-neutral-900 md:text-4xl">
          Complete home & building safety solutions
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-neutral-600">
          Invisible grills, safety nets, pigeon nets and child protection — fitted in SS304 or
          marine-grade SS316 quality, from one trusted team.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {materialGrades.map((item) => (
          <div key={item.grade} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-wide text-accent-600">{item.grade} quality</p>
            <h3 className="mt-1 text-lg font-bold text-neutral-900">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {homeCatalogServices.map((service, index) => {
          const photo = getPrimaryServicePhoto(service.slug) ?? getHeroPhoto();
          return (
            <article
              key={`${service.slug}-${service.title}`}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-card"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={85}
                  priority={index < 3}
                  className="object-cover object-center"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-bold text-neutral-900">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">
                  {service.description}
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Link
                    href={routes.service(service.slug)}
                    className="inline-flex items-center justify-center gap-1 rounded-full bg-brand-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800"
                  >
                    View Details
                    <span aria-hidden>→</span>
                  </Link>
                  <a
                    href={telUrl}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 transition hover:border-brand-900 hover:text-brand-900"
                  >
                    <PhoneIcon className="h-4 w-4" />
                    Call
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <p className="mt-10 text-center">
        <Link
          href={routes.services}
          className="inline-flex items-center justify-center rounded-full bg-brand-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
        >
          View All Services →
        </Link>
      </p>
    </Section>
  );
}
