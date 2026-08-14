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
  { title: "Stylish Spaces", note: "Slim SS304 / SS316 finish that keeps the view", tone: "text-accent-600" },
  { title: "Strong Protection", note: "Measured install with written warranty", tone: "text-brand-900" },
] as const;

export function HomeHero() {
  const photo = getHeroPhoto();

  return (
    <section aria-label="Hero">
      <div className="grid items-stretch bg-brand-950 lg:grid-cols-2">
        <div className="relative order-1 aspect-[16/10] w-full min-h-[260px] sm:min-h-[360px] lg:order-2 lg:aspect-auto lg:h-full lg:min-h-[620px]">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            priority
            quality={90}
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </div>

        <div className="order-2 flex flex-col justify-center border-l-4 border-accent-500 px-4 py-10 sm:px-6 lg:order-1 lg:border-l-0 lg:border-r-4 lg:px-12 lg:py-16">
          <div className="max-w-xl">
            <p className="text-sm font-bold uppercase tracking-wide text-shield-400 md:text-base">
              {homeHero.eyebrow}
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
              {homeHero.title}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-neutral-200 md:text-lg">
              {homeHero.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={routes.contact} className={`${pillBase} bg-accent-500 text-white shadow-cta hover:bg-accent-400`}>
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
              <a href={telUrl} className={`${pillBase} bg-brand-700 text-white hover:bg-brand-600`}>
                <PhoneIcon className="h-5 w-5" />
                Call Now
              </a>
            </div>
          </div>

          <ul className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {trustBadges.map((badge) => (
              <li
                key={badge}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white"
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

      <div className="border-b border-neutral-200 bg-white">
        <div className="container py-6 md:py-8">
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
