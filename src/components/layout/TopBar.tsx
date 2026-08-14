import { business } from "@/config/business";

const whatsappHref = `https://wa.me/${business.whatsapp.replace(/\D/g, "")}`;

export function TopBar() {
  return (
    <div className="border-b border-brand-950 bg-brand-950 text-xs text-brand-100 sm:text-sm">
      <div className="container flex h-9 items-center justify-between gap-3">
        <p className="truncate font-medium">
          Professional Invisible Grills & Safety Nets across South India
        </p>
        <div className="flex shrink-0 items-center gap-3 sm:gap-5">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#25D366] px-2.5 py-0.5 text-[11px] font-semibold text-white hover:bg-[#20bd5a] sm:hidden"
          >
            WhatsApp
          </a>
          <a href={`mailto:${business.email}`} className="hidden hover:text-white md:inline">
            {business.email}
          </a>
          <a href={`tel:${business.phone}`} className="hidden font-semibold text-white hover:text-accent-400 sm:inline">
            {business.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
