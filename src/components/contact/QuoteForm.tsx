"use client";

import { useState, type FormEvent } from "react";
import { business } from "@/config/business";
import {
  leadEvent,
  quoteMessage,
  telHref,
  validateQuote,
  whatsappHref,
  type LeadEvent,
  type QuoteErrors,
  type QuoteRequest,
} from "@/lib/quote-lead";

const SERVICES = [
  "Balcony Safety Nets",
  "Pigeon Safety Nets",
  "Invisible Grills",
  "Balcony Invisible Grills",
  "Window Invisible Grills",
  "Children Safety Nets",
  "Pet Safety Nets",
  "Cricket Practice Nets",
  "Box Cricket Nets",
  "Construction Safety Nets",
  "Bird Spikes",
  "Balcony Cloth Hangers",
  "Mosquito Nets",
  "Other",
] as const;

const empty: QuoteRequest = {
  name: "",
  phone: "",
  place: "Raipur",
  service: "Balcony Safety Nets",
  note: "",
  width: "",
  height: "",
};

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-sm text-red-700">
      {message}
    </p>
  );
}

export function QuoteForm() {
  const [values, setValues] = useState<QuoteRequest>(empty);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [ready, setReady] = useState<QuoteRequest | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "failed">("idle");

  function update<K extends keyof QuoteRequest>(key: K, value: QuoteRequest[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setReady(null);
    setStatus("idle");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validateQuote(values);
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setReady(null);
      setStatus("idle");
      return;
    }
    setStatus("saving");
    const lead: LeadEvent = leadEvent({
      channel: "form",
      page: "/contact",
      service: values.service,
      place: values.place,
    });
    window.dispatchEvent(new CustomEvent("safeshield:lead", { detail: lead }));
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json()) as { ok?: boolean; errors?: QuoteErrors };
      if (!response.ok || !data.ok) {
        setErrors(data.errors ?? {});
        setStatus("failed");
        setReady(values);
        return;
      }
      setStatus("saved");
      setReady(values);
    } catch {
      setStatus("failed");
      setReady(values);
    }
  }

  const message = ready ? quoteMessage(ready) : "";

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm" aria-labelledby="quote-heading">
      <h2 id="quote-heading" className="text-lg font-semibold text-neutral-900">
        Enquiry details
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600">
        Free site survey. A {business.trustSignals.warrantyYears} year warranty on the written job. We reply during{" "}
        {business.workingHours.weekdays} on weekdays.
      </p>
      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="quote-name" className="text-sm font-medium text-neutral-900">
            Name
          </label>
          <input
            id="quote-name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "quote-name-error" : undefined}
            className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-3 text-base"
          />
          <FieldError id="quote-name-error" message={errors.name} />
        </div>
        <div>
          <label htmlFor="quote-phone" className="text-sm font-medium text-neutral-900">
            Mobile
          </label>
          <input
            id="quote-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "quote-phone-error" : undefined}
            className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-3 text-base"
          />
          <FieldError id="quote-phone-error" message={errors.phone} />
        </div>
        <div>
          <label htmlFor="quote-place" className="text-sm font-medium text-neutral-900">
            Town or neighbourhood
          </label>
          <input
            id="quote-place"
            name="place"
            autoComplete="address-level2"
            value={values.place}
            onChange={(event) => update("place", event.target.value)}
            aria-invalid={Boolean(errors.place)}
            aria-describedby={errors.place ? "quote-place-error" : undefined}
            className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-3 text-base"
          />
          <FieldError id="quote-place-error" message={errors.place} />
        </div>
        <div>
          <label htmlFor="quote-service" className="text-sm font-medium text-neutral-900">
            Work needed
          </label>
          <select
            id="quote-service"
            name="service"
            value={values.service}
            onChange={(event) => update("service", event.target.value)}
            className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-3 text-base"
          >
            {SERVICES.map((service) => (
              <option key={service}>{service}</option>
            ))}
          </select>
          <FieldError id="quote-service-error" message={errors.service} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="quote-width" className="text-sm font-medium text-neutral-900">
              Width in feet <span className="font-normal text-neutral-500">(optional)</span>
            </label>
            <input
              id="quote-width"
              name="width"
              inputMode="decimal"
              value={values.width ?? ""}
              onChange={(event) => update("width", event.target.value)}
              aria-invalid={Boolean(errors.width)}
              aria-describedby={errors.width ? "quote-width-error" : undefined}
              className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-3 text-base"
            />
            <FieldError id="quote-width-error" message={errors.width} />
          </div>
          <div>
            <label htmlFor="quote-height" className="text-sm font-medium text-neutral-900">
              Height in feet <span className="font-normal text-neutral-500">(optional)</span>
            </label>
            <input
              id="quote-height"
              name="height"
              inputMode="decimal"
              value={values.height ?? ""}
              onChange={(event) => update("height", event.target.value)}
              aria-invalid={Boolean(errors.height)}
              aria-describedby={errors.height ? "quote-height-error" : undefined}
              className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-3 text-base"
            />
            <FieldError id="quote-height-error" message={errors.height} />
          </div>
        </div>
        <div>
          <label htmlFor="quote-note" className="text-sm font-medium text-neutral-900">
            Opening, floor, and what it is for
          </label>
          <textarea
            id="quote-note"
            name="note"
            rows={4}
            value={values.note}
            onChange={(event) => update("note", event.target.value)}
            aria-invalid={Boolean(errors.note)}
            aria-describedby={errors.note ? "quote-note-error" : "quote-note-help"}
            className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-3 text-base"
          />
          <p id="quote-note-help" className="mt-1 text-sm text-neutral-500">
            Add the floor and what the opening is for. Attach a photo when WhatsApp opens. The size is only a guide — the written quote follows a site measurement.
          </p>
          <FieldError id="quote-note-error" message={errors.note} />
        </div>
      </div>
      <button
        type="submit"
        disabled={status === "saving"}
        className="mt-5 w-full rounded-md bg-brand-900 px-6 py-3 text-base font-semibold text-white disabled:opacity-70"
      >
        {status === "saving" ? "Saving the enquiry…" : "Send enquiry"}
      </button>
      {status === "failed" && (
        <p className="mt-3 text-sm text-red-700" role="alert">
          The enquiry was not saved on the server. You can still send it on WhatsApp.
        </p>
      )}
      {ready && (
        <div className="mt-4 space-y-3 rounded-xl bg-brand-50 p-4" role="status">
          <p className="text-sm text-brand-900">
            {status === "saved"
              ? "Enquiry saved. Send it on WhatsApp as well so the survey team sees it on the phone."
              : "Send the same details on WhatsApp, or call."}
          </p>
          <a
            href={whatsappHref(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-full bg-[#25D366] px-4 py-3 text-center text-sm font-semibold text-white"
          >
            Send on WhatsApp
          </a>
          <a href={telHref()} className="block rounded-full bg-brand-800 px-4 py-3 text-center text-sm font-semibold text-white">
            Call {business.phone}
          </a>
        </div>
      )}
    </form>
  );
}
