"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  serviceMegaMenu,
  cityAreaHighlights,
  type ServiceMegaCategory,
} from "@/config/mega-menu";
import { routes } from "@/config/routes";

interface MegaPanelProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function MegaPanel({ open, onClose, children }: MegaPanelProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="site-megamenu absolute left-0 right-0 top-full z-50 hidden border-b border-neutral-200 bg-white shadow-xl xl:block"
    >
      <div className="container py-8">{children}</div>
    </div>
  );
}

function ServicesMegaMenu({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {serviceMegaMenu.map((cat: ServiceMegaCategory) => (
          <div key={cat.title}>
            <p className="text-sm font-bold uppercase tracking-wide text-neutral-900">
              {cat.title}
            </p>
            <ul className="mt-3 space-y-2">
              {cat.links.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="text-sm text-neutral-600 hover:text-brand-900 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-between rounded-xl bg-brand-50 px-5 py-4">
        <p className="text-sm font-medium text-brand-900">
          Need help choosing the right solution?
        </p>
        <Link
          href={routes.services}
          onClick={onClose}
          className="text-sm font-semibold text-brand-700 hover:text-brand-900 hover:underline"
        >
          View all services →
        </Link>
      </div>
    </>
  );
}

function AreasMegaMenu({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {cityAreaHighlights.map((city) => (
          <div key={city.citySlug}>
            <Link
              href={routes.city(city.citySlug)}
              onClick={onClose}
              className="text-sm font-bold uppercase tracking-wide text-neutral-900 hover:text-brand-900"
            >
              {city.cityName}
            </Link>
            <ul className="mt-3 space-y-2">
              {city.areas.map((area) => (
                <li key={area.href}>
                  <Link
                    href={area.href}
                    onClick={onClose}
                    className="text-sm text-neutral-600 hover:text-brand-900 hover:underline"
                  >
                    {area.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={routes.city(city.citySlug)}
              onClick={onClose}
              className="mt-3 inline-block text-xs font-semibold text-brand-700 hover:text-brand-900 hover:underline"
            >
              All {city.cityName} areas →
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-between rounded-xl bg-neutral-50 px-5 py-4">
        <p className="text-sm font-medium text-neutral-800">
          2,000+ neighbourhoods · 20,000+ word local guides per page
        </p>
        <Link
          href={routes.locations}
          onClick={onClose}
          className="text-sm font-semibold text-brand-700 hover:text-brand-900 hover:underline"
        >
          Browse all locations →
        </Link>
      </div>
    </>
  );
}

export type MegaMenuType = "services" | "areas" | null;

interface MegaMenuDropdownProps {
  type: MegaMenuType;
  onClose: () => void;
}

export function MegaMenuDropdown({ type, onClose }: MegaMenuDropdownProps) {
  return (
    <MegaPanel open={type !== null} onClose={onClose}>
      {type === "services" && <ServicesMegaMenu onClose={onClose} />}
      {type === "areas" && <AreasMegaMenu onClose={onClose} />}
    </MegaPanel>
  );
}

export function useMegaMenu() {
  const [active, setActive] = useState<MegaMenuType>(null);
  return {
    active,
    open: (type: MegaMenuType) => setActive(type),
    close: () => setActive(null),
    toggle: (type: MegaMenuType) => setActive((cur) => (cur === type ? null : type)),
  };
}
