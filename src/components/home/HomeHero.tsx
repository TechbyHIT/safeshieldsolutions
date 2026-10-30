import Image from "next/image";
import Link from "next/link";
import { business } from "@/config/business";
import { homeHero } from "@/config/home-content";
import { getHeroPhoto } from "@/config/photo-catalog";
import { routes } from "@/config/routes";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";

const whatsappUrl = `https://wa.me/${business.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
  "Hi SafeShield Solutions, I need a free site survey for invisible grills / safety nets in Raipur.",
)}`;
const telUrl = `tel:${business.phone.replace(/\s/g, "")}`;

export function HomeHero() {
  const photo = getHeroPhoto();

  return (
    <section aria-label="Hero" className="relative isolate min-h-[88vh] overflow-hidden bg-brand-950">
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover object-center animate-hero-ken"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/88 to-brand-950/45"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-brand-950/30"
        aria-hidden
      />

      <div className="container relative flex min-h-[88vh] flex-col justify-end pb-14 pt-28 md:justify-center md:pb-20 md:pt-24">
        <div className="max-w-2xl animate-fade-up">
          <p className="font-display text-2xl font-semibold tracking-tight text-accent-400 sm:text-3xl md:text-4xl">
            {homeHero.brand}
          </p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-shield-300 sm:text-sm">
            {homeHero.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-3xl font-semibold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            {homeHero.title}
          </h1>
          <p data-speakable className="mt-5 max-w-xl text-base leading-relaxed text-neutral-200 md:text-lg">
            {homeHero.description}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={routes.contact}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-accent-500 px-6 py-3.5 text-sm font-semibold text-white shadow-cta transition hover:bg-accent-400 active:scale-[0.98] md:text-base"
            >
              Get free site survey
              <span aria-hidden>→</span>
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#20bd5a] active:scale-[0.98] md:text-base"
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp
            </a>
            <a
              href={telUrl}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15 active:scale-[0.98] md:text-base"
            >
              <PhoneIcon className="h-5 w-5" />
              {business.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
