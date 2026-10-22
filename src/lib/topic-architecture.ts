/**
 * Hub-and-spoke map for one topic cluster.
 * FAQs stay on the landing page. Case studies stay unpublished.
 * A spoke is added only when its intent is different from the hub.
 */
import { guideArticles } from "@/config/guides-content";
import { COMPARISONS, getCgPlace } from "@/data/cg-local-seo";
import { SEO_SERVICES } from "@/data/seo-services";
import { TOPIC_CLUSTERS } from "@/lib/entity-seo";
import { cityServiceSlugsForPlace } from "@/lib/local-seo-catalog";

export type SpokeRole = "service" | "location" | "near-me" | "guide" | "comparison" | "faq-section";

export interface Spoke {
  path: string;
  role: SpokeRole;
  intent: string;
  subtopic: string;
  linksTo: string[];
}

export interface ContentGap {
  subtopic: string;
  home: string;
  reason: string;
}

export interface ClusterArchitecture {
  id: string;
  subject: string;
  marketHub: string;
  hub: { path: string; intent: string };
  spokes: Spoke[];
  gaps: ContentGap[];
  consolidate: { from: string; to: string; reason: string }[];
}

function members(clusterId: string) {
  const cluster = TOPIC_CLUSTERS.find((item) => item.id === clusterId);
  if (!cluster) return [];
  return SEO_SERVICES.filter((service) => cluster.categories.includes(service.category) && service.priority > 0);
}

export function clusterArchitecture(clusterId: string, placeSlug = "raipur"): ClusterArchitecture | null {
  const cluster = TOPIC_CLUSTERS.find((item) => item.id === clusterId);
  const place = getCgPlace(placeSlug);
  if (!cluster || !place) return null;

  const services = members(clusterId);
  const offered = new Set(cityServiceSlugsForPlace(place.slug));
  const hubPath = `/services/${cluster.pillarSlug}`;
  const pillarLocation = `/chhattisgarh/${place.slug}/${cluster.pillarSlug}`;
  const spokes: Spoke[] = [];

  for (const service of services) {
    if (service.slug !== cluster.pillarSlug) {
      spokes.push({
        path: `/services/${service.slug}`,
        role: "service",
        intent: `${service.name} detail`,
        subtopic: service.name,
        linksTo: [hubPath],
      });
    }
    if (!offered.has(service.slug)) continue;
    const local = `/chhattisgarh/${place.slug}/${service.slug}`;
    spokes.push({
      path: local,
      role: "location",
      intent: `${service.name} in ${place.name}`,
      subtopic: service.name,
      linksTo: [hubPath, `/chhattisgarh/${place.slug}`],
    });
    spokes.push({
      path: `${local}-near-me`,
      role: "near-me",
      intent: `${service.name} near me in ${place.name}`,
      subtopic: service.name,
      linksTo: [local],
    });
  }

  const firstGuide = new Map<string, string>();
  const extraGuides: { from: string; to: string }[] = [];
  for (const guide of guideArticles) {
    if (!services.some((service) => service.slug === guide.serviceSlug)) continue;
    const existing = firstGuide.get(guide.serviceSlug);
    if (existing) {
      extraGuides.push({ from: `/guides/${guide.slug}`, to: `/guides/${existing}` });
      continue;
    }
    firstGuide.set(guide.serviceSlug, guide.slug);
    spokes.push({
      path: `/guides/${guide.slug}`,
      role: "guide",
      intent: `How to judge ${getName(guide.serviceSlug)}`,
      subtopic: getName(guide.serviceSlug),
      linksTo: [`/services/${guide.serviceSlug}`],
    });
  }

  for (const comparison of COMPARISONS) {
    if (!services.some((service) => comparison.slug.includes(service.slug))) continue;
    spokes.push({
      path: `/compare/${comparison.slug}`,
      role: "comparison",
      intent: comparison.title,
      subtopic: comparison.title,
      linksTo: [hubPath],
    });
  }

  spokes.push({
    path: pillarLocation,
    role: "faq-section",
    intent: "Questions on the location page",
    subtopic: "Buyer questions",
    linksTo: [hubPath],
  });

  const gaps: ContentGap[] = [
    {
      subtopic: "Verified case study",
      home: pillarLocation,
      reason: "No job record is verified. Gallery photos stay photos. A case-study URL is not created to fill a quota.",
    },
  ];
  if (!firstGuide.has(cluster.pillarSlug)) {
    gaps.push({
      subtopic: `${cluster.name} buying notes`,
      home: hubPath,
      reason: "The how-to stays on the service page until it has a distinct question of its own.",
    });
  }

  const consolidate = [
    { from: `${pillarLocation}-price`, to: pillarLocation, reason: "Price wording uses the location page." },
    { from: `${pillarLocation}-dealers`, to: pillarLocation, reason: "Dealer wording uses the location page." },
    { from: `${pillarLocation}-installation`, to: pillarLocation, reason: "Installation wording uses the location page." },
    ...extraGuides.map((item) => ({ ...item, reason: "A second guide for the same service repeats the same intent." })),
  ];

  return {
    id: cluster.id,
    subject: cluster.name,
    marketHub: "/chhattisgarh",
    hub: { path: hubPath, intent: `${cluster.name} service detail` },
    spokes,
    gaps,
    consolidate,
  };
}

function getName(slug: string): string {
  return SEO_SERVICES.find((service) => service.slug === slug)?.name ?? slug;
}

export function siteArchitecture(placeSlug = "raipur"): { marketHub: string; clusters: ClusterArchitecture[] } {
  return {
    marketHub: "/chhattisgarh",
    clusters: TOPIC_CLUSTERS.map((cluster) => clusterArchitecture(cluster.id, placeSlug)).filter(
      (cluster): cluster is ClusterArchitecture => Boolean(cluster),
    ),
  };
}

export function clusterPerformance(
  clusterId: string,
  rows?: { path: string; clicks: number; impressions: number }[],
  placeSlug = "raipur",
): { source: "none" | "export"; note: string; clicks: number; impressions: number } {
  const architecture = clusterArchitecture(clusterId, placeSlug);
  if (!architecture || !rows || rows.length === 0) {
    return {
      source: "none",
      note: "No Search Console export is loaded. Cluster clicks and impressions are not invented.",
      clicks: 0,
      impressions: 0,
    };
  }
  const paths = new Set([architecture.hub.path, ...architecture.spokes.map((spoke) => spoke.path)]);
  const matched = rows.filter((row) => paths.has(row.path));
  return {
    source: "export",
    note: "Totals count only the supplied rows whose URL is in this cluster.",
    clicks: matched.reduce((sum, row) => sum + row.clicks, 0),
    impressions: matched.reduce((sum, row) => sum + row.impressions, 0),
  };
}
