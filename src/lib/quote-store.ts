import fs from "node:fs";
import path from "node:path";
import { indianMobile, validateQuote, type QuoteRequest } from "@/lib/quote-lead";

export function leadFilePath(): string {
  return path.join(process.cwd(), ".data", "quote-leads.jsonl");
}

export function saveQuoteLead(input: QuoteRequest, file: string = leadFilePath()) {
  const errors = validateQuote(input);
  if (Object.keys(errors).length > 0) return { ok: false as const, errors };
  const phone = indianMobile(input.phone);
  const record = {
    at: new Date().toISOString(),
    name: input.name.trim(),
    phone,
    place: input.place.trim(),
    service: input.service.trim(),
    width: input.width?.trim() ?? "",
    height: input.height?.trim() ?? "",
    note: input.note.trim(),
  };
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.appendFileSync(file, `${JSON.stringify(record)}\n`, "utf8");
  return { ok: true as const };
}
