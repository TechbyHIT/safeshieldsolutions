import { business } from "@/config/business";

export function TopBar() {
  return (
    <div className="hidden border-b border-brand-950 bg-brand-950 text-sm text-brand-100 md:block">
      <div className="container flex h-9 items-center justify-between gap-4">
        <p className="truncate font-medium">
          Premium Invisible Grills & Safety Nets across South India
        </p>
        <div className="flex shrink-0 items-center gap-5">
          <a href={`mailto:${business.email}`} className="hover:text-white">
            {business.email}
          </a>
          <a href={`tel:${business.phone}`} className="font-semibold text-white hover:text-accent-400">
            {business.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
