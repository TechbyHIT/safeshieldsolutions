import { notFound, permanentRedirect } from "next/navigation";
import { evaluateSeoPath } from "@/lib/seo-quality-gate";

/** Indexable pages continue. Duplicates 301 to the canonical. Invalid URLs 404. */
export function enforceIndexablePath(path: string) {
  const gate = evaluateSeoPath(path);
  if (gate.index && gate.canonicalPath === path) return gate;
  if (gate.canonicalPath !== path) {
    permanentRedirect(gate.canonicalPath);
  }
  notFound();
}
