import Image from "next/image";
import Link from "next/link";
import { business } from "@/config/business";
import { routes } from "@/config/routes";
import { getHdPhoto, getHeroPhoto, type ProjectPhoto } from "@/config/photo-catalog";
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
  const image = photo?.folder ? getHdPhoto(photo.folder) : getHeroPhoto();
  const blurb = description.length > 280 ? `${description.slice(0, 277)}…` : description;

  return (
    <section className="bg-brand-950" aria-label="Page hero">
      <div className="grid items-stretch lg:grid-cols-2">
        <div className="relative order-1 aspect-[16/10] w-full min-h-[220px] sm:min-h-[300px] lg:order-2 lg:aspect-auto lg:h-full lg:min-h-[460px]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            quality={90}
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </div>

        <div className="order-2 flex flex-col justify-center border-l-4 border-accent-500 px-4 py-10 sm:px-6 lg:order-1 lg:border-l-0 lg:border-r-4 lg:px-12 lg:py-16">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-4">
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
          <h1
            className={`mt-2 max-w-xl font-bold leading-tight tracking-tight text-white ${
              compact ? "text-3xl sm:text-4xl" : "text-3xl sm:text-4xl md:text-5xl"
            }`}
          >
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-200 md:text-base">{blurb}</p>

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
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
              >
                <PhoneIcon className="h-5 w-5" />
                Call Now
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
