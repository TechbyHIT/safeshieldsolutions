import { evaluateSeoPath } from "@/lib/seo-quality-gate";

export function normalizeInternalPath(href: string): string | null {
  if (!href.startsWith("/") || href.startsWith("//")) return null;
  const noHash = href.split("#")[0] ?? href;
  const noQuery = noHash.split("?")[0] ?? noHash;
  if (!noQuery || noQuery.startsWith("/api/") || noQuery.startsWith("/_next/")) return null;
  if (/\.(xml|png|jpe?g|webp|gif|svg|ico|js|css|map|json)$/i.test(noQuery)) return null;
  return noQuery.length > 1 ? noQuery.replace(/\/+$/, "") : noQuery;
}

/** True only when the URL is HTTP 200, indexable, and self-canonical. */
export function isIndexableInternalPath(href: string): boolean {
  const path = normalizeInternalPath(href);
  if (!path) return false;
  const gate = evaluateSeoPath(path);
  return gate.index && gate.canonicalPath === path;
}

export function filterIndexableLinks<T extends { href: string }>(links: T[]): T[] {
  return links.filter((link) => isIndexableInternalPath(link.href));
}
