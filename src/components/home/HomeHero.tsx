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

export function HomeHero() {
  const photo = getHeroPhoto();

  return (
    <section
      className="relative isolate min-h-[min(780px,92vh)] overflow-hidden pb-28 md:min-h-[min(680px,88vh)] md:pb-16"
      aria-label="Hero"
    >
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
        className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/75 to-neutral-950/45"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/30" aria-hidden />

      <div className="container relative z-10 flex min-h-[min(780px,92vh)] flex-col justify-center py-10 md:min-h-[min(680px,88vh)] md:py-14">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-wide text-accent-400 md:text-base">
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
              className={`${pillBase} bg-accent-400 text-neutral-950 shadow-cta hover:bg-accent-300`}
            >
              Get Free Quote
              <span aria-hidden>→</span>
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${pillBase} bg-[#25D366] text-white hover:bg-[#20bd5a]`}
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp Now
            </a>
            <a
              href={telUrl}
              className={`${pillBase} border border-white/25 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20`}
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
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm"
            >
              <span className="text-accent-400" aria-hidden>
                ✓
              </span>
              {badge}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
