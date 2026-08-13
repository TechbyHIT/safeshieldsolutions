/**
 * Programmatic SEO search phrases for turf, zip screens, and mesh door services.
 * City/area tokens are resolved at render time in content — URLs use phrase + intent suffixes.
 */

function uniq(phrases: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const p of phrases) {
    const key = p.trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(p.trim());
  }
  return out;
}

/** Core bases + high-intent long-tail modifiers per product line */
function expandBases(bases: readonly string[], extras: readonly string[]): string[] {
  const phrases: string[] = [];
  for (const base of bases) {
    phrases.push(base);
    phrases.push(`${base} near me`);
    phrases.push(`${base} installation`);
    phrases.push(`${base} installers near me`);
    phrases.push(`${base} price`);
    phrases.push(`${base} company`);
    phrases.push(`${base} contractors`);
    phrases.push(`${base} dealers`);
    phrases.push(`${base} suppliers`);
    phrases.push(`${base} quotation`);
    phrases.push(`best ${base}`);
    phrases.push(`premium ${base}`);
    for (const extra of extras) {
      phrases.push(`${extra} ${base}`.replace(/\s+/g, " ").trim());
      phrases.push(`${base} ${extra}`.replace(/\s+/g, " ").trim());
    }
  }
  return uniq(phrases);
}

const CRICKET_BOX_GRASS_BASES = [
  "cricket box grass",
  "box cricket grass",
  "box cricket turf",
  "artificial grass for box cricket",
  "synthetic grass for box cricket",
  "cricket turf grass",
  "cricket ground artificial grass",
  "indoor cricket turf",
  "outdoor cricket turf",
  "box cricket flooring",
] as const;

export const CRICKET_BOX_GRASS_PHRASES = expandBases(CRICKET_BOX_GRASS_BASES, [
  "price per sq ft",
  "commercial",
  "durable",
  "manufacturers",
]);

const ZIP_SCREEN_BASES = [
  "zip screens",
  "zip screen blinds",
  "outdoor zip screens",
  "balcony zip screens",
  "patio zip screens",
  "veranda zip screens",
  "weather protection zip screens",
  "transparent zip screens",
  "mesh zip screens",
  "manual zip screens",
] as const;

export const ZIP_SCREEN_PHRASES = expandBases(ZIP_SCREEN_BASES, [
  "cost per sq ft",
  "manufacturers",
  "custom size",
  "waterproof",
  "wind resistant",
]);

const MOTORIZED_ZIP_SCREEN_BASES = [
  "motorized zip screens",
  "automatic zip screens",
  "remote control zip screens",
  "electric zip screens",
  "motorized outdoor screens",
  "motorized balcony screens",
  "automatic balcony zip screens",
  "smart zip screens",
  "motorized patio screens",
  "motorized mesh zip screens",
] as const;

export const MOTORIZED_ZIP_SCREEN_PHRASES = expandBases(MOTORIZED_ZIP_SCREEN_BASES, [
  "automation service",
  "smart home",
  "remote operated",
  "weatherproof",
]);

const MESH_DOOR_BASES = [
  "mesh doors",
  "mosquito mesh doors",
  "insect mesh doors",
  "safety mesh doors",
  "aluminium mesh doors",
  "stainless steel mesh doors",
  "magnetic mesh doors",
  "pleated mesh doors",
  "balcony mesh doors",
  "main door mesh",
] as const;

export const MESH_DOOR_PHRASES = expandBases(MESH_DOOR_BASES, [
  "manufacturers",
  "custom size",
  "rust proof",
  "pet friendly",
]);

const SLIDING_MESH_DOOR_BASES = [
  "sliding mesh doors",
  "mosquito sliding doors",
  "sliding mosquito mesh doors",
  "aluminium sliding mesh doors",
  "sliding insect screen doors",
  "balcony sliding mesh doors",
  "patio sliding mesh doors",
  "double sliding mesh doors",
  "sliding screen doors",
  "sliding net doors",
] as const;

export const SLIDING_MESH_DOOR_PHRASES = expandBases(SLIDING_MESH_DOOR_BASES, [
  "repair",
  "custom size",
  "smooth sliding",
  "space saving",
]);

export const NEW_PROGRAMMATIC_SERVICE_SLUGS = [
  "cricket-box-grass",
  "zip-screens",
  "motorized-zip-screens",
  "mesh-doors",
  "sliding-mesh-doors",
] as const;
