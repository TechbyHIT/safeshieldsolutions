"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { business } from "@/config/business";
import { routes } from "@/config/routes";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";

const whatsappUrl = `https://wa.me/${business.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
  "Hi SafeShield Solutions, I need a free site survey for invisible grills / safety nets.",
)}`;
const telUrl = `tel:${business.phone.replace(/\s/g, "")}`;

function ArrowUpIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4v-4z" />
    </svg>
  );
}

const fabBase =
  "flex h-14 w-14 shrink-0 items-center justify-center rounded-full shadow-lg ring-2 ring-white/90 transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2";

/**
 * Mobile floating circle buttons (Call, WhatsApp, quote) + scroll-to-top after hero.
 */
export function FloatingActionButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const onScroll = useCallback(() => {
    setShowScrollTop(window.scrollY > 420);
  }, []);

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 md:hidden"
      role="group"
      aria-label="Quick contact"
    >
      <div
        className="pointer-events-auto ml-auto flex w-fit flex-col items-center gap-3 pr-3"
        style={{
          paddingBottom: "max(0.75rem, env(safe-area-inset-bottom, 0px))",
        }}
      >
        <div
          className={`flex flex-col items-center gap-3 transition-all duration-300 ease-out ${
            showScrollTop
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-4 opacity-0"
          }`}
        >
          <button
            type="button"
            onClick={scrollToTop}
            className={`${fabBase} bg-neutral-800 text-white hover:bg-neutral-900`}
            aria-label="Scroll to top"
            tabIndex={showScrollTop ? 0 : -1}
          >
            <ArrowUpIcon />
          </button>
        </div>

        <Link
          href={routes.contact}
          className={`${fabBase} bg-brand-900 text-[#FFFDF8] hover:bg-brand-800`}
          aria-label="Free quote"
        >
          <QuoteIcon />
        </Link>

        <a
          href={telUrl}
          className={`${fabBase} bg-accent-500 text-neutral-950 hover:bg-accent-400`}
          aria-label={`Call ${business.phone}`}
        >
          <PhoneIcon />
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${fabBase} h-[3.75rem] w-[3.75rem] bg-[#25D366] text-white shadow-[0_4px_14px_rgba(37,211,102,0.45)] hover:bg-[#20bd5a]`}
          aria-label="Chat on WhatsApp"
        >
          <WhatsAppIcon />
        </a>
      </div>
    </div>
  );
}
