import { describe, it, expect } from "vitest";
import { isPageIndexable } from "@/lib/indexability";
import { slugify, countWords, truncate } from "@/lib/slug";

describe("slugify", () => {
  it("converts text to URL-safe slug", () => {
    expect(slugify("A.S. Rao Nagar")).toBe("as-rao-nagar");
    expect(slugify("Invisible Grills")).toBe("invisible-grills");
  });
});

describe("countWords", () => {
  it("counts words in plain text", () => {
    expect(countWords("hello world test")).toBe(3);
  });
});

describe("truncate", () => {
  it("truncates long text at word boundary", () => {
    const result = truncate("This is a very long title that needs truncation", 30);
    expect(result.length).toBeLessThanOrEqual(30);
    expect(result.endsWith("…")).toBe(true);
  });
});

describe("isPageIndexable", () => {
  const baseInput = {
    pageType: "SERVICE" as const,
    status: "PUBLISHED" as const,
    indexStatus: "INDEX" as const,
    wordCount: 900,
    contentScore: 0.85,
    isDuplicate: false,
    isThin: false,
    hasPlaceholder: false,
    metaTitle: "Test Title",
    metaDescription: "Test description for the page",
    h1: "Test H1",
    publishPhase: 1,
  };

  it("returns indexable for valid published page", () => {
    const result = isPageIndexable(baseInput);
    expect(result.indexable).toBe(true);
    expect(result.reasons).toHaveLength(0);
  });

  it("rejects thin content", () => {
    const result = isPageIndexable({ ...baseInput, isThin: true });
    expect(result.indexable).toBe(false);
    expect(result.reasons).toContain("Thin content detected");
  });

  it("rejects draft pages", () => {
    const result = isPageIndexable({ ...baseInput, status: "DRAFT" });
    expect(result.indexable).toBe(false);
    expect(result.reasons).toContain("Page is not published");
  });
});
