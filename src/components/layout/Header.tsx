"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { navigation } from "@/config/navigation";
import { business } from "@/config/business";
import { routes } from "@/config/routes";
import { Button } from "@/components/ui/Button";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";
import { TopBar } from "@/components/layout/TopBar";
import { MegaMenuDropdown, useMegaMenu } from "@/components/layout/MegaMenu";

const whatsappHref = `https://wa.me/${business.whatsapp.replace(/\D/g, "")}`;
const telHref = `tel:${business.phone.replace(/\s/g, "")}`;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const mega = useMegaMenu();

  const simpleLinks = navigation.main.filter(
    (item) => item.label !== "Services" && item.label !== "Locations",
  );

  return (
    <header className="sticky top-0 z-50 bg-neutral-50 shadow-sm">
      <TopBar />
      <div className="relative border-b border-neutral-200 bg-[rgba(255,253,248,0.94)] backdrop-blur">
        <div className="container flex h-16 items-center justify-between gap-3">
          <Link href="/" className="flex min-w-0 shrink items-center">
            <Image
              src="/images/logo.png"
              alt="Safe Shield Solutions"
              width={280}
              height={64}
              priority
              className="h-12 w-auto max-w-[min(240px,48vw)] object-contain object-left sm:max-w-[320px] lg:max-w-[400px]"
            />
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
            {simpleLinks.slice(0, 2).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-100 hover:text-brand-700"
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              aria-expanded={mega.active === "services"}
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-100 hover:text-brand-700 aria-expanded:text-brand-600"
              onClick={() => mega.toggle("services")}
            >
              Services
              <span aria-hidden className="text-xs">▾</span>
            </button>
            <button
              type="button"
              aria-expanded={mega.active === "areas"}
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-100 hover:text-brand-700 aria-expanded:text-brand-600"
              onClick={() => mega.toggle("areas")}
            >
              Areas
              <span aria-hidden className="text-xs">▾</span>
            </button>
            {simpleLinks.slice(2).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-100 hover:text-brand-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition hover:bg-[#20bd5a] sm:h-11 sm:w-11"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
            <a
              href={telHref}
              className="inline-flex items-center gap-2 rounded-full bg-brand-900 px-3 py-2 text-xs font-bold text-[#FFFDF8] shadow-cta transition hover:bg-brand-800 sm:px-5 sm:py-2.5 sm:text-sm"
            >
              <PhoneIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Call Now</span>
              <span className="sm:hidden">Call</span>
            </a>
            <button
              type="button"
              className="rounded-lg p-2 text-neutral-800 lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="sr-only">Toggle menu</span>
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        <MegaMenuDropdown type={mega.active} onClose={mega.close} />
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="border-t border-neutral-200 bg-neutral-50 px-4 py-4 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navigation.main.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg px-3 py-2 text-neutral-800 hover:bg-neutral-100 hover:text-brand-700"
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
