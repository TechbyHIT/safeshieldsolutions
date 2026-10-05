/** Word shingles for duplicate detection. Not a ranking signal. */

export function normalizeForCompare(text: string, placeNames: string[] = []): string {
  let value = text.toLowerCase();
  const names = [...placeNames].sort((a, b) => b.length - a.length);
  for (const name of names) {
    value = value.replaceAll(name.toLowerCase(), "town");
  }
  return value
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function shingles(text: string, size = 8): Set<string> {
  const words = text.split(" ").filter(Boolean);
  const out = new Set<string>();
  if (words.length < size) {
    if (words.length) out.add(words.join(" "));
    return out;
  }
  for (let i = 0; i <= words.length - size; i += 1) {
    out.add(words.slice(i, i + size).join(" "));
  }
  return out;
}

export function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 1;
  let intersection = 0;
  const [small, large] = a.size < b.size ? [a, b] : [b, a];
  for (const item of small) {
    if (large.has(item)) intersection += 1;
  }
  const union = a.size + b.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

export function wordCount(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean);
  return words.length;
}
