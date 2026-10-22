/**
 * Quote requests are validated here, then handed to call or WhatsApp.
 * The public event has no name or phone number. Rates are not invented.
 */
import { business } from "@/config/business";

export interface QuoteRequest {
  name: string;
  phone: string;
  place: string;
  service: string;
  note: string;
}

export interface QuoteErrors {
  name?: string;
  phone?: string;
  place?: string;
  service?: string;
  note?: string;
}

export type LeadChannel = "form" | "call" | "whatsapp";

export interface LeadEvent {
  channel: LeadChannel;
  page: string;
  service: string;
  place: string;
  at: string;
}

const PHONE = /^[6-9]\d{9}$/;

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

export function indianMobile(value: string): string | null {
  let digits = digitsOnly(value);
  if (digits.startsWith("91") && digits.length === 12) digits = digits.slice(2);
  if (digits.startsWith("0") && digits.length === 11) digits = digits.slice(1);
  return PHONE.test(digits) ? digits : null;
}

export function telHref(phone: string = business.phone): string {
  const mobile = indianMobile(phone);
  return mobile ? `tel:+91${mobile}` : `tel:${digitsOnly(phone)}`;
}

export function whatsappHref(text: string, phone: string = business.whatsapp): string {
  const mobile = indianMobile(phone) ?? digitsOnly(phone);
  return `https://wa.me/91${mobile.replace(/^91/, "")}?text=${encodeURIComponent(text)}`;
}

export function validateQuote(input: QuoteRequest): QuoteErrors {
  const errors: QuoteErrors = {};
  if (input.name.trim().length < 2) errors.name = "Enter the name we should ask for.";
  if (!indianMobile(input.phone)) errors.phone = "Enter a 10-digit Indian mobile number.";
  if (input.place.trim().length < 2) errors.place = "Enter the town or neighbourhood.";
  if (input.service.trim().length < 2) errors.service = "Choose the work you need.";
  if (input.note.trim().length > 500) errors.note = "Keep the note under 500 characters.";
  return errors;
}

export function quoteMessage(input: QuoteRequest): string {
  const phone = indianMobile(input.phone) ?? input.phone.trim();
  const lines = [
    `Quote request for ${input.service.trim()}`,
    `Name: ${input.name.trim()}`,
    `Phone: +91${phone}`,
    `Place: ${input.place.trim()}`,
  ];
  if (input.note.trim()) lines.push(`Opening: ${input.note.trim()}`);
  lines.push("Please arrange a free site survey.");
  return lines.join("\n");
}

export function leadEvent(input: {
  channel: LeadChannel;
  page: string;
  service: string;
  place: string;
  at?: string;
}): LeadEvent {
  return {
    channel: input.channel,
    page: input.page,
    service: input.service.trim(),
    place: input.place.trim(),
    at: input.at ?? new Date().toISOString(),
  };
}

export interface ConversionReport {
  source: "none" | "events";
  note: string;
  total: number;
  byChannel: Record<LeadChannel, number>;
}

export function conversionReport(events?: LeadEvent[]): ConversionReport {
  const byChannel: Record<LeadChannel, number> = { form: 0, call: 0, whatsapp: 0 };
  if (!events || events.length === 0) {
    return {
      source: "none",
      note: "No lead events were supplied. This report does not invent a conversion rate.",
      total: 0,
      byChannel,
    };
  }
  for (const event of events) byChannel[event.channel] += 1;
  return {
    source: "events",
    note: "Counts are the supplied lead events. They are not a sample of all visitors.",
    total: events.length,
    byChannel,
  };
}

/** One control funnel. A second landing page is not in the live test. */
export function landingTest(): { active: false; control: string; note: string } {
  return {
    active: false,
    control: "quote-form",
    note: "No landing-page test is running. Every quote request uses the same form.",
  };
}
