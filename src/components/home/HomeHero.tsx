import Image from "next/image";
import Link from "next/link";
import { business } from "@/config/business";
import { homeHero } from "@/config/home-content";
import { trustBadges } from "@/config/mega-menu";
import { getHeroPhoto } from "@/config/photo-catalog";
import { routes } from "@/config/routes";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";

const whatsappUrl = `https://wa.me/${business.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
  "Hi SafeShield Solutions, I need a free site survey for invisible grills / safety nets.",
)}`;
const telUrl = `tel:${business.phone.replace(/\s/g, "")}`;

const pillBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-transform active:scale-[0.98] md:text-base";

const brandPillars = [
  { title: "Safe Living", note: "Child, pet and balcony protection", tone: "text-brand-700" },
  { title: "Smart Comfort", note: "Nets, screens and hangers that stay usable", tone: "text-shield-700" },
  { title: "Stylish Spaces", note: "Slim SS304 finish that keeps the view", tone: "text-accent-600" },
  { title: "Strong Protection", note: "Measured install with written warranty", tone: "text-brand-900" },
] as const;

export function HomeHero() {
  const photo = getHeroPhoto();

  return (
    <section
      className="relative isolate overflow-hidden pb-36 md:pb-28"
      aria-label="Hero"
    >
      <div className="relative min-h-[min(720px,88vh)] md:min-h-[min(640px,82vh)]">
        <Image
          src={photo.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-brand-950/92 via-brand-900/78 to-shield-900/35"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-transparent to-brand-950/30" aria-hidden />

        <div className="container relative z-10 flex min-h-[min(720px,88vh)] flex-col justify-center py-10 md:min-h-[min(640px,82vh)] md:py-14">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wide text-shield-400 md:text-base">
              {homeHero.eyebrow}
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              {homeHero.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-200 md:text-lg">
              {homeHero.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={routes.contact}
                className={`${pillBase} bg-accent-500 text-white shadow-cta hover:bg-accent-400`}
              >
                Get Free Quote
                <span aria-hidden>→</span>
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${pillBase} bg-shield-600 text-white hover:bg-shield-500`}
              >
                <WhatsAppIcon className="h-5 w-5" />
                WhatsApp Now
              </a>
              <a
                href={telUrl}
                className={`${pillBase} bg-brand-700 text-white hover:bg-brand-600`}
              >
                <PhoneIcon className="h-5 w-5" />
                Call Now
              </a>
            </div>
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 lg:gap-3">
            {trustBadges.map((badge) => (
              <li
                key={badge}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-brand-950/35 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm"
              >
                <span className="text-shield-400" aria-hidden>
                  ✓
                </span>
                {badge}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 translate-y-1/3 px-4 md:translate-y-1/4">
        <div className="container">
          <ul className="grid gap-px overflow-hidden rounded-2xl bg-neutral-200 shadow-card sm:grid-cols-2 lg:grid-cols-4">
            {brandPillars.map((pillar) => (
              <li key={pillar.title} className="bg-white px-5 py-5">
                <p className={`text-sm font-bold uppercase tracking-wide ${pillar.tone}`}>{pillar.title}</p>
                <p className="mt-2 text-sm text-neutral-600">{pillar.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
