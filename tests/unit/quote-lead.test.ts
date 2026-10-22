import { describe, expect, it } from "vitest";
import {
  conversionReport,
  indianMobile,
  landingTest,
  leadEvent,
  quoteMessage,
  telHref,
  validateQuote,
  whatsappHref,
} from "@/lib/quote-lead";

const valid = {
  name: "Asha Rao",
  phone: "9876543210",
  place: "Raipur",
  service: "Invisible Grills",
  note: "Third-floor balcony",
};

describe("quote lead funnel", () => {
  it("accepts an Indian mobile and builds a tel and WhatsApp link", () => {
    expect(indianMobile("+91 98765 43210")).toBe("9876543210");
    expect(indianMobile("09876543210")).toBe("9876543210");
    expect(indianMobile("12345")).toBeNull();
    expect(telHref("+91-8977235565")).toBe("tel:+918977235565");
    expect(whatsappHref("Hello", "8977235565")).toContain("https://wa.me/918977235565?text=");
  });

  it("rejects an incomplete quote and prepares a complete one", () => {
    expect(validateQuote({ ...valid, name: "A", phone: "111" }).name).toBeTruthy();
    expect(validateQuote({ ...valid, phone: "111" }).phone).toBeTruthy();
    expect(validateQuote(valid)).toEqual({});
    expect(quoteMessage(valid)).toContain("Invisible Grills");
    expect(quoteMessage(valid)).toContain("Raipur");
    expect(quoteMessage(valid)).not.toContain("undefined");
  });

  it("tracks the channel without a conversion rate when no events exist", () => {
    const event = leadEvent({ channel: "whatsapp", page: "/contact", service: "Safety Nets", place: "Bhilai", at: "2026-10-22T00:00:00.000Z" });
    expect(event).not.toHaveProperty("phone");
    expect(conversionReport().source).toBe("none");
    expect(conversionReport([event]).byChannel.whatsapp).toBe(1);
    expect(landingTest().active).toBe(false);
  });
});
