import { describe, expect, it } from "vitest";
import { publicationGate } from "@/lib/publication-gate";
import { snapshotLocalService } from "@/lib/on-page-seo";

function fromSnapshot(intent: "general" | "near-me" = "general") {
  const page = snapshotLocalService("raipur", "invisible-grills", intent, true)!;
  return publicationGate({
    path: page.path,
    title: page.title,
    description: page.description,
    h1: page.h1,
    headings: page.headings,
    body: page.body,
    wordCount: page.wordCount,
    imageAlt: page.imageAlt,
    links: page.links,
    schemaTypes: page.schemaTypes,
    conversionLabel: page.conversionLabel,
  });
}

describe("publication gate", () => {
  it("publishes the Raipur invisible-grill page", () => {
    const decision = fromSnapshot();
    expect(decision.failures).toEqual([]);
    expect(decision.status).toBe("publish");
    expect(decision.index).toBe(true);
    expect(decision.canonicalPath).toBe("/chhattisgarh/raipur/invisible-grills");
  });

  it("blocks a price doorway and a misleading local claim", () => {
    const published = fromSnapshot();
    const doorway = publicationGate({
      path: "/chhattisgarh/raipur/invisible-grills-price",
      title: published.canonicalPath,
      description: "A price page that repeats the town page.",
      h1: "Invisible Grills price in Raipur",
      headings: ["Price", "Scope"],
      body: "The quote follows a measurement. We have an office in Raipur.",
      wordCount: 1600,
      imageAlt: "Invisible Grills fitted on a measured opening",
      links: [{ href: "/chhattisgarh/raipur/invisible-grills", anchor: "Invisible Grills in Raipur" }],
      schemaTypes: ["Service"],
      conversionLabel: "Request a measured quote",
    });
    expect(doorway.status).toBe("block");
    expect(doorway.index).toBe(false);
    expect(doorway.canonicalPath).not.toBe("/chhattisgarh/raipur/invisible-grills-price");
    expect(doorway.failures.some((failure) => failure.includes("misleading") || failure.includes("distinct") || failure.includes("intent"))).toBe(true);
  });

  it("holds a thin but honest page for review instead of indexing it", () => {
    const page = snapshotLocalService("raipur", "invisible-grills", "general", true)!;
    const decision = publicationGate({
      path: page.path,
      title: page.title,
      description: page.description,
      h1: page.h1,
      headings: page.headings,
      body: page.body,
      wordCount: 900,
      imageAlt: page.imageAlt,
      links: page.links,
      schemaTypes: page.schemaTypes,
      conversionLabel: page.conversionLabel,
    });
    expect(decision.status).toBe("review");
    expect(decision.index).toBe(false);
  });
});
