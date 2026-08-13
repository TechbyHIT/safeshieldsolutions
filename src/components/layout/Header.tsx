"use client";

import Link from "next/link";
import { useState } from "react";
import { navigation } from "@/config/navigation";
import { business } from "@/config/business";
import { routes } from "@/config/routes";
import { Button } from "@/components/ui/Button";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";
import { TopBar } from "@/components/layout/TopBar";
import { MegaMenuDropdown, useMegaMenu } from "@/components/layout/MegaMenu";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const mega = useMegaMenu();

  const simpleLinks = navigation.main.filter(
    (item) => item.label !== "Services" && item.label !== "Locations",
  );

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <TopBar />
      <div className="relative border-b border-neutral-200 bg-white/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-white shadow-sm"
              aria-hidden
            >
              SS
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-bold uppercase tracking-wide text-neutral-900">
                {business.name}
              </span>
              <span className="hidden text-[10px] font-medium uppercase tracking-wider text-neutral-500 sm:block">
                Quality · Trust · Growth
              </span>
            </span>
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
            {simpleLinks.slice(0, 2).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:text-brand-700"
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              aria-expanded={mega.active === "services"}
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:text-brand-700"
              onClick={() => mega.toggle("services")}
            >
              Services
              <span aria-hidden className="text-xs">▾</span>
            </button>
            <button
              type="button"
              aria-expanded={mega.active === "areas"}
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:text-brand-700"
              onClick={() => mega.toggle("areas")}
            >
              Areas
              <span aria-hidden className="text-xs">▾</span>
            </button>
            {simpleLinks.slice(2).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:text-brand-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`https://wa.me/${business.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition hover:bg-[#20bd5a]"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="h-6 w-6" />
            </a>
            <a
              href={`tel:${business.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full bg-accent-400 px-5 py-2.5 text-sm font-bold text-neutral-950 shadow-cta transition hover:bg-accent-300"
            >
              <PhoneIcon className="h-4 w-4" />
              Call Now
            </a>
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-neutral-700 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        <MegaMenuDropdown type={mega.active} onClose={mega.close} />
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="border-t border-neutral-200 bg-white px-4 py-4 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navigation.main.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg px-3 py-2 text-neutral-700 hover:bg-neutral-50"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <p className="px-3 text-xs font-semibold uppercase text-neutral-500">Quick areas</p>
              {navigation.cities.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="block px-3 py-2 text-sm text-brand-700"
                  onClick={() => setMenuOpen(false)}
                >
                  {c.label}
                </Link>
              ))}
            </li>
            <li className="pt-2">
              <Button href={routes.contact} className="w-full">
                Free Quote
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
