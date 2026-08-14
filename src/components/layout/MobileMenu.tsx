"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cityAreaHighlights, serviceMegaMenu } from "@/config/mega-menu";
import { navigation } from "@/config/navigation";
import { business } from "@/config/business";
import { routes } from "@/config/routes";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";

const whatsappHref = `https://wa.me/${business.whatsapp.replace(/\D/g, "")}`;
const telHref = `tel:${business.phone.replace(/\s/g, "")}`;

const simpleLinks = navigation.main.filter(
  (item) => item.label !== "Services" && item.label !== "Locations",
);

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [servicesOpen, setServicesOpen] = useState(true);
  const [openCategory, setOpenCategory] = useState<string | null>(serviceMegaMenu[0]?.title ?? null);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [openCity, setOpenCity] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="site-mobile-nav lg:hidden" role="dialog" aria-modal="true" aria-label="Site menu">
      <button type="button" className="site-mobile-nav__backdrop" aria-label="Close menu" onClick={onClose} />
      <div id="mobile-menu" className="site-mobile-nav__panel">
        <div className="site-mobile-nav__head">
          <p className="text-lg font-bold text-neutral-900">Menu</p>
          <button type="button" className="site-mobile-nav__close" aria-label="Close menu" onClick={onClose}>
            ✕
          </button>
        </div>

        <nav className="site-mobile-nav__body" aria-label="Mobile navigation">
          {simpleLinks.slice(0, 1).map((item) => (
            <Link key={item.href} href={item.href} className="site-mobile-nav__link" onClick={onClose}>
              {item.label}
            </Link>
          ))}

          <div className="site-mobile-nav__group">
            <button
              type="button"
              className="site-mobile-nav__accordion"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((value) => !value)}
            >
              Services
              <span aria-hidden className="site-mobile-nav__chevron">
                {servicesOpen ? "▴" : "▾"}
              </span>
            </button>
            {servicesOpen && (
              <div className="site-mobile-nav__sub">
                {serviceMegaMenu.map((category) => {
                  const expanded = openCategory === category.title;
                  return (
                    <div key={category.title} className="site-mobile-nav__nested">
                      <button
                        type="button"
                        className="site-mobile-nav__accordion site-mobile-nav__accordion--nested"
                        aria-expanded={expanded}
                        onClick={() => setOpenCategory(expanded ? null : category.title)}
                      >
                        {category.title}
                        <span aria-hidden className="site-mobile-nav__chevron">
                          {expanded ? "▴" : "▾"}
                        </span>
                      </button>
                      {expanded && (
                        <ul className="site-mobile-nav__list">
                          {category.links.map((link) => (
                            <li key={link.href + link.label}>
                              <Link href={link.href} className="site-mobile-nav__child" onClick={onClose}>
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
                <Link href={routes.services} className="site-mobile-nav__all" onClick={onClose}>
                  View all services
                </Link>
              </div>
            )}
          </div>

          <div className="site-mobile-nav__group">
            <button
              type="button"
              className="site-mobile-nav__accordion"
              aria-expanded={locationsOpen}
              onClick={() => setLocationsOpen((value) => !value)}
            >
              Locations
              <span aria-hidden className="site-mobile-nav__chevron">
                {locationsOpen ? "▴" : "▾"}
              </span>
            </button>
            {locationsOpen && (
              <div className="site-mobile-nav__sub">
                {cityAreaHighlights.map((city) => {
                  const expanded = openCity === city.citySlug;
                  return (
                    <div key={city.citySlug} className="site-mobile-nav__nested">
                      <button
                        type="button"
                        className="site-mobile-nav__accordion site-mobile-nav__accordion--nested"
                        aria-expanded={expanded}
                        onClick={() => setOpenCity(expanded ? null : city.citySlug)}
                      >
                        {city.cityName}
                        <span aria-hidden className="site-mobile-nav__chevron">
                          {expanded ? "▴" : "▾"}
                        </span>
                      </button>
                      {expanded && (
                        <ul className="site-mobile-nav__list">
                          <li>
                            <Link
                              href={routes.city(city.citySlug)}
                              className="site-mobile-nav__child"
                              onClick={onClose}
                            >
                              All {city.cityName} areas
                            </Link>
                          </li>
                          {city.areas.map((area) => (
                            <li key={area.href}>
                              <Link href={area.href} className="site-mobile-nav__child" onClick={onClose}>
                                {area.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
                <Link href={routes.locations} className="site-mobile-nav__all" onClick={onClose}>
                  View all locations
                </Link>
              </div>
            )}
          </div>

          {simpleLinks.slice(1).map((item) => (
            <Link key={item.href} href={item.href} className="site-mobile-nav__link" onClick={onClose}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-mobile-nav__actions">
          <Link href={routes.contact} className="site-mobile-nav__cta site-mobile-nav__cta--quote" onClick={onClose}>
            Get Quote
          </Link>
          <a href={telHref} className="site-mobile-nav__cta site-mobile-nav__cta--call">
            <PhoneIcon className="h-4 w-4" />
            {business.phone}
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="site-mobile-nav__cta site-mobile-nav__cta--wa"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
