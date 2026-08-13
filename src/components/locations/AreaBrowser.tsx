"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { routes } from "@/config/routes";

export interface AreaBrowserItem {
  slug: string;
  name: string;
}

interface AreaBrowserProps {
  citySlug: string;
  cityName: string;
  areas: AreaBrowserItem[];
  /** Default service slug for area links */
  serviceSlug?: string;
  pageSize?: number;
}

export function AreaBrowser({
  citySlug,
  cityName,
  areas,
  serviceSlug = "invisible-grills",
  pageSize = 48,
}: AreaBrowserProps) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return areas;
    return areas.filter((a) => a.name.toLowerCase().includes(q));
  }, [areas, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const visible = filtered.slice(start, start + pageSize);

  function handleSearch(value: string) {
    setQuery(value);
    setPage(1);
  }

  return (
    <div className="mt-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-neutral-600">
          {filtered.length.toLocaleString()} areas in {cityName}
          {query ? ` matching “${query}”` : ""}
        </p>
        <label className="relative w-full sm:max-w-xs">
          <span className="sr-only">Search areas in {cityName}</span>
          <input
            type="search"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={`Search ${cityName} localities…`}
            className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </label>
      </div>

      <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((area) => (
          <li key={area.slug}>
            <Link
              href={routes.areaService(citySlug, area.slug, serviceSlug)}
              className="block rounded-lg border border-neutral-200 px-3 py-2.5 text-sm text-brand-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-900"
            >
              {area.name}
            </Link>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="mt-6 text-sm text-neutral-500">No areas match your search.</p>
      )}

      {totalPages > 1 && (
        <nav
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
          aria-label={`${cityName} area pagination`}
        >
          <button
            type="button"
            disabled={safePage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm disabled:opacity-40"
          >
            Previous
          </button>
          <span className="px-2 text-sm text-neutral-600">
            Page {safePage} of {totalPages}
          </span>
          <button
            type="button"
            disabled={safePage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm disabled:opacity-40"
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
}
