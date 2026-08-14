"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { navigation } from "@/config/navigation";
import { business } from "@/config/business";
import { routes } from "@/config/routes";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";
import { TopBar } from "@/components/layout/TopBar";
import { MegaMenuDropdown, useMegaMenu } from "@/components/layout/MegaMenu";
import { MobileMenu } from "@/components/layout/MobileMenu";

const whatsappHref = `https://wa.me/${business.whatsapp.replace(/\D/g, "")}`;
const telHref = `tel:${business.phone.replace(/\s/g, "")}`;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const mega = useMegaMenu();

  const simpleLinks = navigation.main.filter(
    (item) => item.label !== "Services" && item.label !== "Locations",
  );

  const openMobile = () => {
    mega.close();
    setMenuOpen(true);
  };

  const closeMobile = () => setMenuOpen(false);

  return (
    <header className="site-header sticky top-0 z-50 bg-white shadow-sm">
      <TopBar />
      <div className="relative border-b border-neutral-200 bg-white/95 backdrop-blur">
        <div className="container flex h-[4.25rem] items-center justify-between gap-3">
          <Link href="/" className="flex min-w-0 shrink items-center">
            <Image
              src="/images/logo.png"
              alt="Safe Shield Solutions"
              width={280}
              height={64}
              priority
              className="h-12 w-auto max-w-[min(220px,46vw)] object-contain object-left sm:max-w-[320px] lg:max-w-[380px]"
            />
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-0.5 xl:flex">
            {simpleLinks.slice(0, 2).map((item) => (
              <Link key={item.href} href={item.href} className="site-header__link">
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              aria-expanded={mega.active === "services"}
              className="site-header__link site-header__link--btn"
              onClick={() => mega.toggle("services")}
            >
              Services
              <span aria-hidden className="text-[10px]">
                ▾
              </span>
            </button>
            <button
              type="button"
              aria-expanded={mega.active === "areas"}
              className="site-header__link site-header__link--btn"
              onClick={() => mega.toggle("areas")}
            >
              Locations
              <span aria-hidden className="text-[10px]">
                ▾
              </span>
            </button>
            {simpleLinks.slice(2).map((item) => (
              <Link key={item.href} href={item.href} className="site-header__link">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={telHref}
              className="hidden items-center gap-2 rounded-full bg-brand-900 px-4 py-2.5 text-sm font-bold text-white shadow-cta transition hover:bg-brand-800 md:inline-flex"
            >
              <PhoneIcon className="h-4 w-4" />
              {business.phone}
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition hover:bg-[#20bd5a] sm:h-11 sm:w-11"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
            <Link
              href={routes.contact}
              className="hidden rounded-full bg-accent-500 px-4 py-2.5 text-sm font-bold text-neutral-950 shadow-cta transition hover:bg-accent-400 lg:inline-flex"
            >
              Get Free Quote
            </Link>
            <button
              type="button"
              className="site-header__burger xl:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => (menuOpen ? closeMobile() : openMobile())}
            >
              <span aria-hidden>{menuOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>

        <MegaMenuDropdown type={mega.active} onClose={mega.close} />
      </div>

      <MobileMenu open={menuOpen} onClose={closeMobile} />
    </header>
  );
}
