/**
 * Stable entity names, topic clusters, and the links between them.
 * Anchors use the catalogue name plus the place. Related products do not share a name.
 */
import { site } from "@/config/site";
import type { CgPlaceProfile } from "@/data/cg-local-seo";
import { getSeoService, type SeoService } from "@/data/seo-services";
import { cityServiceSlugsForPlace } from "@/lib/local-seo-catalog";

export interface TopicCluster {
  id: string;
  name: string;
  pillarSlug: string;
  categories: readonly SeoService["category"][];
}

export const TOPIC_CLUSTERS: readonly TopicCluster[] = [
  { id: "grills", name: "Invisible grills", pillarSlug: "invisible-grills", categories: ["Grills"] },
  { id: "nets", name: "Safety nets", pillarSlug: "safety-nets", categories: ["Nets"] },
  { id: "bird-control", name: "Bird control", pillarSlug: "bird-spikes", categories: ["Bird Control"] },
  { id: "screens", name: "Zip screens", pillarSlug: "zip-screens", categories: ["Screens"] },
  { id: "doors", name: "Mesh doors", pillarSlug: "mesh-doors", categories: ["Doors"] },
  { id: "hangers", name: "Cloth hangers", pillarSlug: "cloth-hangers", categories: ["Hangers"] },
  { id: "sports", name: "Sports nets", pillarSlug: "sports-nets", categories: ["Sports"] },
  { id: "turf", name: "Cricket box grass", pillarSlug: "cricket-box-grass", categories: ["Turf"] },
];

export interface EntityAttribute {
  name: string;
  value: string;
}

export interface EntityLink {
  href: string;
  anchor: string;
  relationship: "pillar" | "sibling" | "disambiguation" | "place";
}

export interface FanOutQuery {
  query: string;
  answer: string;
  href: string;
  anchor: string;
}

export interface EntitySection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface EntityProfile {
  entityId: string;
  name: string;
  cluster: TopicCluster;
  attributes: EntityAttribute[];
  disambiguation: { slug: string; name: string; href: string; difference: string }[];
  links: EntityLink[];
  fanOut: FanOutQuery[];
  section: EntitySection;
}

const ATTRIBUTES: Record<SeoService["category"], EntityAttribute[]> = {
  Grills: [
    { name: "Material", value: "SS304 stainless steel cable" },
    { name: "Upgrade", value: "SS316 where corrosion exposure is higher" },
    { name: "Opening", value: "Balcony, window, or stair opening" },
    { name: "Role", value: "Cable infill on an existing edge, not a replacement railing" },
  ],
  Nets: [
    { name: "Material", value: "Nylon or HDPE mesh, chosen after the opening is seen" },
    { name: "Opening", value: "Balcony, window, duct, or terrace" },
    { name: "Role", value: "Mesh closure for a measured opening" },
  ],
  "Bird Control": [
    { name: "Form", value: "Ledge spike strip or a mesh closure, depending on the product" },
    { name: "Role", value: "Stops landing or closes a gap birds use. It is not a child fall net by default" },
  ],
  Screens: [
    { name: "Form", value: "Retractable screen in side tracks" },
    { name: "Variants", value: "Manual or motorized, quoted as separate parts" },
  ],
  Doors: [
    { name: "Form", value: "Mesh door or sliding mesh door" },
    { name: "Role", value: "Insect screen on a doorway, not a balcony cable grill" },
  ],
  Hangers: [
    { name: "Form", value: "Ceiling, pulley, balcony, or wall-mounted drying line" },
    { name: "Material", value: "Stainless steel where the catalogue service says so" },
  ],
  Sports: [
    { name: "Role", value: "Ball containment for a practice area" },
    { name: "Opening", value: "Terrace, court, or academy bay after measurement" },
  ],
  Turf: [
    { name: "Role", value: "Playing surface for a box-cricket area" },
    { name: "Scope", value: "Surface, base, and infill are separate lines on the quote" },
  ],
};

const DIFFERENCES: { from: SeoService["category"]; slug: string; difference: string }[] = [
  {
    from: "Grills",
    slug: "safety-nets",
    difference: "Safety Nets close an opening with mesh. An invisible grill is a cable line and does not stop small birds by itself.",
  },
  {
    from: "Grills",
    slug: "bird-spikes",
    difference: "Bird Spikes sit on a landing edge. They are not a balcony cable grill.",
  },
  {
    from: "Nets",
    slug: "invisible-grills",
    difference: "Invisible Grills are a cable infill. A safety net is the mesh that closes the opening.",
  },
  {
    from: "Nets",
    slug: "bird-spikes",
    difference: "Bird Spikes do not close a balcony. A safety net does.",
  },
  {
    from: "Bird Control",
    slug: "safety-nets",
    difference: "Safety Nets are a fall or debris closure. Bird control products are specified for where birds land or fly through.",
  },
  {
    from: "Bird Control",
    slug: "pigeon-safety-nets",
    difference: "Pigeon Safety Nets close a gap. Bird Spikes only stop a bird landing on a narrow ledge.",
  },
  {
    from: "Bird Control",
    slug: "bird-spikes",
    difference: "Bird Spikes treat the landing edge. A pigeon net is the mesh over the opening the birds use.",
  },
  {
    from: "Screens",
    slug: "mosquito-nets",
    difference: "Mosquito Nets are mesh fixed to a window or door. Zip Screens are a retractable screen in side tracks.",
  },
  {
    from: "Doors",
    slug: "zip-screens",
    difference: "Zip Screens cover a wide opening from a headbox. Mesh Doors are the screen on the doorway itself.",
  },
  {
    from: "Sports",
    slug: "safety-nets",
    difference: "Sports Nets contain a ball. Safety Nets are a fall or debris closure for a building opening.",
  },
  {
    from: "Turf",
    slug: "cricket-nets",
    difference: "Cricket Box Grass is the playing surface. Cricket Nets are the containment around the bay.",
  },
];

function origin(): string {
  return site.url.replace(/\/$/, "");
}

export function entityId(kind: "service" | "place" | "topic" | "organization" | "state", slug = ""): string {
  const suffix = slug ? `-${slug}` : "";
  return `${origin()}/#${kind}${suffix}`;
}

export function clusterFor(service: SeoService): TopicCluster {
  return TOPIC_CLUSTERS.find((cluster) => cluster.categories.includes(service.category)) ?? TOPIC_CLUSTERS[0]!;
}

export function canonicalEntityName(slug: string): string | undefined {
  return getSeoService(slug)?.name;
}

function serviceHref(placeSlug: string, serviceSlug: string): string {
  return `/chhattisgarh/${placeSlug}/${serviceSlug}`;
}

function anchor(name: string, placeName: string): string {
  return `${name} in ${placeName}`;
}

export function buildEntityProfile(service: SeoService, place: CgPlaceProfile): EntityProfile {
  const cluster = clusterFor(service);
  const offered = new Set(cityServiceSlugsForPlace(place.slug));
  const attributes = ATTRIBUTES[service.category];
  const disambiguation = DIFFERENCES.filter(
    (item) => item.from === service.category && item.slug !== service.slug && offered.has(item.slug),
  )
    .map((item) => {
      const other = getSeoService(item.slug);
      if (!other) return null;
      return {
        slug: other.slug,
        name: other.name,
        href: serviceHref(place.slug, other.slug),
        difference: item.difference,
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .slice(0, 2);

  const links: EntityLink[] = [
    {
      href: `/chhattisgarh/${place.slug}`,
      anchor: place.name,
      relationship: "place",
    },
  ];

  if (cluster.pillarSlug !== service.slug && offered.has(cluster.pillarSlug)) {
    const pillar = getSeoService(cluster.pillarSlug);
    if (pillar) {
      links.push({
        href: serviceHref(place.slug, pillar.slug),
        anchor: anchor(pillar.name, place.name),
        relationship: "pillar",
      });
    }
  }

  for (const item of disambiguation) {
    links.push({
      href: item.href,
      anchor: anchor(item.name, place.name),
      relationship: "disambiguation",
    });
  }

  const siblingSlugs = cityServiceSlugsForPlace(place.slug).filter((slug) => {
    if (slug === service.slug || slug === cluster.pillarSlug) return false;
    if (disambiguation.some((item) => item.slug === slug)) return false;
    return getSeoService(slug)?.category === service.category;
  });
  for (const slug of siblingSlugs.slice(0, 2)) {
    const sibling = getSeoService(slug);
    if (!sibling) continue;
    links.push({
      href: serviceHref(place.slug, sibling.slug),
      anchor: anchor(sibling.name, place.name),
      relationship: "sibling",
    });
  }

  const selfHref = serviceHref(place.slug, service.slug);
  const fanOut: FanOutQuery[] = [
    {
      query: `What is ${service.name} specified with in ${place.name}?`,
      answer: `${service.name} in ${place.name} is specified with ${attributes.map((item) => item.value).join("; ")}. The quote follows a measurement.`,
      href: selfHref,
      anchor: anchor(service.name, place.name),
    },
  ];
  const contrast = disambiguation[0];
  if (contrast) {
    fanOut.push({
      query: `How is ${service.name} different from ${contrast.name} in ${place.name}?`,
      answer: `${contrast.difference} ${anchor(contrast.name, place.name)} is a separate page.`,
      href: contrast.href,
      anchor: anchor(contrast.name, place.name),
    });
  }

  const section: EntitySection = {
    id: "entity-context",
    heading: `What ${service.name} is, and what it is not`,
    paragraphs: [
      `${service.name} belongs to the ${cluster.name} topic. In ${place.name} the specification uses ${attributes.map((item) => `${item.name.toLowerCase()}: ${item.value}`).join("; ")}. ${place.localContext}`,
      disambiguation.map((item) => item.difference).join(" "),
    ].filter((paragraph) => paragraph.length > 0),
    bullets: links
      .filter((link) => link.relationship !== "place")
      .map((link) => `${link.anchor} (${link.relationship === "pillar" ? "topic pillar" : link.relationship === "sibling" ? "same topic" : "separate product"})`),
  };

  return {
    entityId: entityId("service", service.slug),
    name: service.name,
    cluster,
    attributes,
    disambiguation,
    links,
    fanOut,
    section,
  };
}

export function buildServiceEntityGraph(input: {
  service: SeoService;
  place: CgPlaceProfile;
  path: string;
  title: string;
  description: string;
}): Record<string, unknown> {
  const profile = buildEntityProfile(input.service, input.place);
  const pageUrl = `${origin()}${input.path.startsWith("/") ? input.path : `/${input.path}`}`;
  const serviceNode = entityId("service", input.service.slug);
  const placeNode = entityId("place", input.place.slug);
  const stateNode = entityId("state", "chhattisgarh");
  const topicNode = entityId("topic", profile.cluster.id);
  const orgNode = entityId("organization");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgNode,
        name: "SafeShield Solutions",
        url: origin(),
        knowsAbout: TOPIC_CLUSTERS.map((cluster) => cluster.name),
      },
      {
        "@type": "State",
        "@id": stateNode,
        name: "Chhattisgarh",
      },
      {
        "@type": "City",
        "@id": placeNode,
        name: input.place.name,
        containedInPlace: { "@id": stateNode },
      },
      {
        "@type": "Thing",
        "@id": topicNode,
        name: profile.cluster.name,
      },
      {
        "@type": "Service",
        "@id": serviceNode,
        name: input.service.name,
        serviceType: input.service.category,
        description: input.service.description,
        url: pageUrl,
        provider: { "@id": orgNode },
        areaServed: { "@id": placeNode },
        category: profile.cluster.name,
        additionalProperty: profile.attributes.map((item) => ({
          "@type": "PropertyValue",
          name: item.name,
          value: item.value,
        })),
        isRelatedTo: profile.disambiguation.map((item) => ({ "@id": entityId("service", item.slug) })),
      },
      {
        "@type": "WebPage",
        "@id": pageUrl,
        url: pageUrl,
        name: input.title,
        description: input.description,
        about: [{ "@id": serviceNode }, { "@id": placeNode }],
        mentions: [
          { "@id": topicNode },
          ...profile.disambiguation.map((item) => ({ "@id": entityId("service", item.slug), name: item.name })),
        ],
        mainEntity: { "@id": serviceNode },
      },
    ],
  };
}
