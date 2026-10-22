import { describe, expect, it } from "vitest";
import { auditOnPage, snapshotLocalService } from "@/lib/on-page-seo";

describe("on-page SEO", () => {
  it("passes the measured checks for the Raipur invisible-grill page", () => {
    const snapshot = snapshotLocalService("raipur", "invisible-grills", "general", true);
    expect(snapshot).not.toBeNull();
    const audit = auditOnPage(snapshot!);
    const failed = audit.checks.filter((check) => check.status === "fail").map((check) => `${check.id}: ${check.detail}`);
    expect(failed).toEqual([]);
    expect(audit.checks.find((check) => check.id === "web-vitals")?.status).toBe("unmeasured");
    expect(audit.score).toBe(100);
  });

  it("fails a duplicated title and a missing field vital that is over the limit", () => {
    const snapshot = snapshotLocalService("raipur", "invisible-grills", "general", true)!;
    const audit = auditOnPage({
      ...snapshot,
      duplicateTitle: "/chhattisgarh/bhilai/invisible-grills",
      fieldVitals: { lcpMs: 4000, inpMs: 50, cls: 0.02 },
    });
    expect(audit.checks.find((check) => check.id === "title")?.status).toBe("fail");
    expect(audit.checks.find((check) => check.id === "web-vitals")?.status).toBe("fail");
  });

  it("keeps near-me intent on the near-me H1", () => {
    const snapshot = snapshotLocalService("raipur", "invisible-grills", "near-me", true);
    const audit = auditOnPage(snapshot!);
    expect(audit.checks.find((check) => check.id === "intent")?.status).toBe("pass");
    expect(snapshot?.h1).toContain("Near Me");
  });
});
