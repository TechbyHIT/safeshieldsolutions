import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { saveQuoteLead } from "@/lib/quote-store";

describe("quote store", () => {
  it("rejects an incomplete enquiry and appends a valid one", () => {
    const file = path.join(os.tmpdir(), `quote-${Date.now()}.jsonl`);
    const rejected = saveQuoteLead(
      { name: "A", phone: "111", place: "Raipur", service: "Invisible Grills", note: "" },
      file,
    );
    expect(rejected.ok).toBe(false);
    expect(fs.existsSync(file)).toBe(false);

    const saved = saveQuoteLead(
      {
        name: "Asha Rao",
        phone: "9876543210",
        place: "Shankar Nagar",
        service: "Balcony Safety Nets",
        note: "Third floor",
        width: "10",
        height: "4",
      },
      file,
    );
    expect(saved.ok).toBe(true);
    const line = JSON.parse(fs.readFileSync(file, "utf8").trim()) as { phone: string; place: string };
    expect(line.phone).toBe("9876543210");
    expect(line.place).toBe("Shankar Nagar");
    fs.unlinkSync(file);
  });
});
