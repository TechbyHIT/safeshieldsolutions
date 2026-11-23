import { saveQuoteLead } from "@/lib/quote-store";
import type { QuoteRequest } from "@/lib/quote-lead";

export const runtime = "nodejs";

function asQuote(body: unknown): QuoteRequest {
  const value = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const text = (key: string) => (typeof value[key] === "string" ? value[key] : "");
  return {
    name: text("name"),
    phone: text("phone"),
    place: text("place"),
    service: text("service"),
    note: text("note"),
    width: text("width"),
    height: text("height"),
  };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, errors: { note: "The enquiry could not be read." } }, { status: 400 });
  }
  const result = saveQuoteLead(asQuote(body));
  if (!result.ok) return Response.json(result, { status: 422 });
  return Response.json({ ok: true });
}
