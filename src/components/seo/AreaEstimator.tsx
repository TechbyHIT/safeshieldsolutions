"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CG_PRIORITY_PLACES } from "@/data/cg-local-seo";
import { routes } from "@/config/routes";

/**
 * Estimates opening area only. No rupee figure — that needs a site measurement.
 */
export function AreaEstimator() {
  const [city, setCity] = useState("raipur");
  const [width, setWidth] = useState("3");
  const [height, setHeight] = useState("1.2");
  const [openings, setOpenings] = useState("1");

  const area = useMemo(() => {
    const w = Number(width);
    const h = Number(height);
    const n = Number(openings);
    if (![w, h, n].every((value) => Number.isFinite(value) && value > 0)) return null;
    return w * h * n;
  }, [width, height, openings]);

  return (
    <form className="grid gap-4 rounded-2xl border border-neutral-200 p-5 sm:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
      <label className="text-sm font-medium text-neutral-800">
        Town
        <select
          className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        >
          {CG_PRIORITY_PLACES.map((place) => (
            <option key={place.slug} value={place.slug}>
              {place.name}
            </option>
          ))}
        </select>
      </label>
      <label className="text-sm font-medium text-neutral-800">
        Openings
        <input
          className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2"
          inputMode="decimal"
          value={openings}
          onChange={(event) => setOpenings(event.target.value)}
        />
      </label>
      <label className="text-sm font-medium text-neutral-800">
        Width (metres)
        <input
          className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2"
          inputMode="decimal"
          value={width}
          onChange={(event) => setWidth(event.target.value)}
        />
      </label>
      <label className="text-sm font-medium text-neutral-800">
        Height (metres)
        <input
          className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2"
          inputMode="decimal"
          value={height}
          onChange={(event) => setHeight(event.target.value)}
        />
      </label>
      <div className="sm:col-span-2">
        <p className="text-lg font-semibold text-neutral-900">
          {area === null ? "Enter width, height, and openings." : `About ${area.toFixed(2)} sq m`}
        </p>
        <p className="mt-1 text-sm text-neutral-600">
          This is area only, for {CG_PRIORITY_PLACES.find((place) => place.slug === city)?.name}. Material,
          access, and fixing are not included. The final quote needs a measurement.
        </p>
        <Link href={routes.contact} className="mt-3 inline-block font-medium text-brand-700 hover:underline">
          Send these sizes for a quote
        </Link>
      </div>
    </form>
  );
}
