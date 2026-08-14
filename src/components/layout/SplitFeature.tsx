import Image from "next/image";
import Link from "next/link";
import { business } from "@/config/business";
import { routes } from "@/config/routes";
import type { ProjectPhoto } from "@/config/photo-catalog";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";

const whatsappUrl = `https://wa.me/${business.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
  "Hi SafeShield Solutions, I need a free site survey for invisible grills / safety nets.",
)}`;
const telUrl = `tel:${business.phone.replace(/\s/g, "")}`;

interface SplitFeatureProps {
  eyebrow: string;
  title: string;
  description: string;
  photo: ProjectPhoto;
  href: string;
  hrefLabel?: string;
  reverse?: boolean;
  headingLevel?: "h2" | "h3";
}

export function SplitFeature({
  eyebrow,
  title,
  description,
  photo,
  href,
  hrefLabel = "View details",
  reverse = false,
  headingLevel = "h2",
}: SplitFeatureProps) {
  const Heading = headingLevel;

  return (
    <section className="bg-brand-950" aria-label={title}>
      <div className="grid items-stretch lg:grid-cols-2">
        <div
          className={`relative aspect-[16/10] min-h-[240px] w-full sm:min-h-[320px] lg:aspect-auto lg:h-full lg:min-h-[420px] ${
            reverse ? "order-1 lg:order-1" : "order-1 lg:order-2"
          }`}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            quality={90}
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </div>
        <div
          className={`flex flex-col justify-center border-l-4 border-accent-500 px-4 py-10 sm:px-6 lg:px-12 lg:py-16 ${
            reverse
              ? "order-2 border-l-4 lg:order-2 lg:border-l-4 lg:border-r-0"
              : "order-2 lg:order-1 lg:border-l-0 lg:border-r-4"
          }`}
        >
          <div className="max-w-xl">
            <p className="text-sm font-bold uppercase tracking-wide text-shield-400">{eyebrow}</p>
            <Heading className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              {title}
            </Heading>
            <p className="mt-4 text-sm leading-relaxed text-neutral-200 md:text-base">{description}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={href}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-white shadow-cta transition hover:bg-accent-400"
              >
                {hrefLabel}
                <span aria-hidden>→</span>
              </Link>
              <Link
                href={routes.contact}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
              >
                Get Free Quote
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#20bd5a]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                WhatsApp
              </a>
              <a
                href={telUrl}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <PhoneIcon className="h-5 w-5" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
