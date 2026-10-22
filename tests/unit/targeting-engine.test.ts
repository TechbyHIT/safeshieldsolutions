import { describe, expect, it } from "vitest";
import { targetForPath } from "@/lib/targeting-engine";

describe("targeting engine", () => {
  it("targets a Raipur service page by product, place, audience, and quote", () => {
    const target = targetForPath("/chhattisgarh/raipur/invisible-grills");
    expect(target).toMatchObject({
      service: { slug: "invisible-grills", name: "Invisible Grills" },
      location: { state: "Chhattisgarh", place: "Raipur", placeSlug: "raipur" },
      category: "Grills",
      subcategory: "Invisible Grills",
      intent: "transactional",
      funnel: "consideration",
      conversion: { action: "quote-form", href: "/contact" },
    });
    expect(target?.audience).toContain("Apartment and house owners");
    expect(target?.entities).toEqual(expect.arrayContaining(["Invisible Grills", "Raipur", "Invisible grills"]));
    expect(target?.device.primary).toBe("mobile");
    expect(target?.objective).toContain("site survey");
  });

  it("treats near-me as the decision step and a price doorway as the pricing page", () => {
    const near = targetForPath("/chhattisgarh/raipur/invisible-grills-near-me");
    expect(near?.funnel).toBe("decision");
    expect(near?.conversion.action).toBe("call");
    expect(near?.conversion.href).toMatch(/^tel:\+91/);
    const price = targetForPath("/chhattisgarh/raipur/invisible-grills-price");
    expect(price?.path).toBe("/pricing/invisible-grills");
    expect(price?.intent).toBe("commercial");
    expect(price?.funnel).toBe("consideration");
  });

  it("sends a child-safety page and a guide to different audiences and stages", () => {
    const child = targetForPath("/chhattisgarh/raipur/child-safety-nets");
    expect(child?.audience).toContain("children or pets");
    expect(child?.category).toBe("Nets");
    const guide = targetForPath("/guides/invisible-grills-near-me-guide");
    expect(guide?.intent).toBe("informational");
    expect(guide?.funnel).toBe("awareness");
    expect(guide?.conversion).toEqual({ action: "service-page", href: "/services/invisible-grills", label: "Invisible Grills" });
    const contact = targetForPath("/contact");
    expect(contact?.funnel).toBe("decision");
    expect(contact?.conversion.action).toBe("quote-form");
  });
});
