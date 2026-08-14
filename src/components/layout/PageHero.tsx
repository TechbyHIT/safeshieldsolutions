import Image from "next/image";
import Link from "next/link";
import { business } from "@/config/business";
import { routes } from "@/config/routes";
import { getHeroPhoto, type ProjectPhoto } from "@/config/photo-catalog";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";

const whatsappUrl = `https://wa.me/${business.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
  "Hi SafeShield Solutions, I need a free site survey for invisible grills / safety nets.",
)}`;
const telUrl = `tel:${business.phone.replace(/\s/g, "")}`;

export interface HeroCrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  description: string;
  eyebrow?: string;
  photo?: ProjectPhoto | null;
  breadcrumbs?: HeroCrumb[];
  compact?: boolean;
  showCtas?: boolean;
}

export function PageHero({
  title,
  description,
  eyebrow,
  photo,
  breadcrumbs,
  compact = true,
  showCtas = true,
}: PageHeroProps) {
  const image = photo ?? getHeroPhoto();
  const blurb = description.length > 320 ? `${description.slice(0, 317)}…` : description;
  const minH = compact
    ? "min-h-[320px] md:min-h-[400px]"
    : "min-h-[min(780px,92vh)] md:min-h-[min(680px,88vh)]";

  return (
    <section className={`relative isolate overflow-hidden ${minH}`} aria-label="Page hero">
      <Image
        src={image.src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-brand-950/92 via-brand-900/78 to-shield-900/40"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-brand-950/35" aria-hidden />

      <div className={`container relative z-10 flex ${minH} flex-col justify-center py-10 md:py-14`}>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1 text-xs text-white/70 md:text-sm">
              {breadcrumbs.map((item, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <li key={`${item.label}-${index}`} className="flex items-center gap-1">
                    {index > 0 && <span aria-hidden>/</span>}
                    {isLast || !item.href ? (
                      <span aria-current={isLast ? "page" : undefined} className="font-medium text-white">
                        {item.label}
                      </span>
                    ) : (
                      <Link href={item.href} className="hover:text-accent-400 hover:underline">
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}

        {eyebrow && (
          <p className="text-sm font-bold uppercase tracking-wide text-shield-400">{eyebrow}</p>
        )}
        <h1 className="mt-2 max-w-4xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-200 md:text-base">{blurb}</p>

        {showCtas && (
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={routes.contact}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-white shadow-cta transition hover:bg-accent-400"
            >
              Get Free Quote
              <span aria-hidden>→</span>
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#20bd5a]"
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp Now
            </a>
            <a
              href={telUrl}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              <PhoneIcon className="h-5 w-5" />
              Call Now
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
