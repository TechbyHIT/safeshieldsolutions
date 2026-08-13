/** Deterministic variation from area + service slugs (stable per URL). */
export function contentSeed(areaSlug: string, serviceSlug: string): number {
  let h = 0;
  const key = `${areaSlug}:${serviceSlug}`;
  for (let i = 0; i < key.length; i++) {
    h = (h << 5) - h + key.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function pickVariant<T>(items: readonly T[], seed: number, index: number): T {
  return items[(seed + index * 7) % items.length]!;
}

export function pickMany<T>(
  items: readonly T[],
  seed: number,
  count: number,
  startIndex = 0,
): T[] {
  const out: T[] = [];
  for (let i = 0; i < count; i++) {
    out.push(items[(seed + startIndex + i * 11) % items.length]!);
  }
  return out;
}
