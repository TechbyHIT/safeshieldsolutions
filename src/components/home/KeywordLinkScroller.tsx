"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { KeywordLinkItem } from "@/config/home-seo-links";

interface KeywordLinkScrollerProps {
  links: KeywordLinkItem[];
  heading: string;
  description: string;
  initialCount?: number;
  batchSize?: number;
  id?: string;
}

export function KeywordLinkScroller({
  links,
  heading,
  description,
  initialCount = 48,
  batchSize = 48,
  id,
}: KeywordLinkScrollerProps) {
  const [visible, setVisible] = useState(initialCount);
  const [filter, setFilter] = useState("");

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return links;
    return links.filter(
      (l) => l.label.toLowerCase().includes(q) || l.href.toLowerCase().includes(q),
    );
  }, [links, filter]);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  return (
    <section id={id} className="border-t border-neutral-200 bg-white py-14">
      <div className="container">
        <h2 className="text-2xl font-bold text-neutral-900 md:text-3xl">{heading}</h2>
        <p className="mt-3 max-w-4xl text-sm leading-relaxed text-neutral-600 md:text-base">
          {description}
        </p>

        <label className="mt-6 block max-w-md">
          <span className="sr-only">Filter local pages</span>
          <input
            type="search"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setVisible(initialCount);
            }}
            placeholder="Filter by area, service, or intent…"
            className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-accent-500/25"
          />
        </label>

        <p className="mt-3 text-xs text-neutral-500">
          {filtered.length.toLocaleString()} indexed local pages
          {filter ? ` matching “${filter}”` : ""}
        </p>

        <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {shown.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded-lg border border-neutral-200 px-3 py-2 text-xs text-brand-700 transition hover:border-accent-500 hover:bg-neutral-100 hover:text-brand-900 md:text-sm"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {filtered.length === 0 && (
          <p className="mt-6 text-sm text-neutral-500">No pages match your filter.</p>
        )}

        {hasMore && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setVisible((v) => v + batchSize)}
              className="rounded-lg bg-brand-900 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-800"
            >
              Load more local pages ({filtered.length - visible} remaining)
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
