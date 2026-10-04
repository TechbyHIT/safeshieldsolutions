import { navigation } from "@/config/navigation";
import { guideArticles, blogPosts } from "@/config/guides-content";
import { CG_CORE_SERVICE_SLUGS, CG_PRIORITY_PLACES, COMPARISONS, PRICING_PAGES } from "@/data/cg-local-seo";
import { getIndexableLocalitiesForCity, LOCALITY_SERVICE_SLUGS } from "@/data/cg-hierarchy";
import { SEO_SERVICES } from "@/data/seo-services";
import { evaluateSeoPath } from "@/lib/seo-quality-gate";
import { linksForTownService } from "@/lib/seo-graph";
import {
  pageTypeForPath,
  RAIPUR_ENTRY_LINKS,
  type SeoPriority,
} from "@/lib/seo-priority";
import { getAllSitemapEntries, getSitemapExclusions, getSitemapGroups } from "@/lib/sitemap-urls";

export interface CrawlFinding {
  url: string;
  priority: SeoPriority;
  pageType: string;
  internalLinks: number;
  depth: number | null;
  recommendedParent: string;
  flag: "PASS" | "WARNING" | "ERROR";
  notes: string[];
}

function addLink(graph: Map<string, Set<string>>, from: string, to: string) {
  if (!to.startsWith("/") || to.includes("?") || to.startsWith("/api/")) return;
  const target = to.length > 1 && to.endsWith("/") ? to.replace(/\/+$/, "") : to;
  if (!graph.has(from)) graph.set(from, new Set());
  graph.get(from)!.add(target);
}

/** Outbound links that exist in navigation, hubs, and commercial templates. */
export function buildCrawlGraph(): Map<string, Set<string>> {
  const graph = new Map<string, Set<string>>();
  const sitewide = [
    ...navigation.main.map((item) => item.href),
    ...navigation.services.map((item) => item.href),
    ...navigation.cities.map((item) => item.href),
    ...navigation.footer.map((item) => item.href),
  ];

  const pages = new Set<string>(["/", "/chhattisgarh", "/services", "/guides", "/blog", "/pricing", "/compare", "/locations"]);
  for (const entry of getAllSitemapEntries()) pages.add(entry.path);
  for (const href of sitewide) pages.add(href);

  for (const page of pages) {
    for (const href of sitewide) addLink(graph, page, href);
  }

  for (const link of RAIPUR_ENTRY_LINKS) addLink(graph, "/", link.href);

  for (const place of CG_PRIORITY_PLACES) {
    addLink(graph, "/chhattisgarh", `/chhattisgarh/${place.slug}`);
  }
  for (const slug of CG_CORE_SERVICE_SLUGS) {
    addLink(graph, "/chhattisgarh", `/services/${slug}`);
    addLink(graph, "/chhattisgarh", `/chhattisgarh/${slug}`);
  }
  for (const link of RAIPUR_ENTRY_LINKS) addLink(graph, "/chhattisgarh", link.href);
  addLink(graph, "/chhattisgarh", "/pricing");
  addLink(graph, "/chhattisgarh", "/compare");
  addLink(graph, "/locations", "/chhattisgarh");

  for (const place of CG_PRIORITY_PLACES) {
    const placePath = `/chhattisgarh/${place.slug}`;
    addLink(graph, placePath, "/chhattisgarh");
    for (const slug of CG_CORE_SERVICE_SLUGS) {
      addLink(graph, placePath, `/chhattisgarh/${place.slug}/${slug}`);
    }
    for (const slug of place.nearby) addLink(graph, placePath, `/chhattisgarh/${slug}`);
    for (const area of getIndexableLocalitiesForCity(place.slug)) {
      const hub = `/chhattisgarh/${place.slug}/areas/${area.slug}`;
      addLink(graph, placePath, hub);
      addLink(graph, hub, placePath);
      addLink(graph, hub, "/chhattisgarh");
      for (const serviceSlug of LOCALITY_SERVICE_SLUGS) {
        addLink(graph, hub, `${hub}/${serviceSlug}`);
      }
    }
    for (const serviceSlug of ["invisible-grills", "safety-nets", "pigeon-safety-nets"]) {
      const servicePath = `/chhattisgarh/${place.slug}/${serviceSlug}`;
      for (const link of linksForTownService(place.slug, serviceSlug)) {
        addLink(graph, servicePath, link.href);
      }
    }
  }

  for (const service of SEO_SERVICES) {
    if (service.priority <= 0) continue;
    const path = `/services/${service.slug}`;
    addLink(graph, "/services", path);
    addLink(graph, path, "/chhattisgarh");
    for (const link of RAIPUR_ENTRY_LINKS) addLink(graph, path, link.href);
    const raipur = `/chhattisgarh/raipur/${service.slug}`;
    if (evaluateSeoPath(raipur).index) addLink(graph, path, raipur);
    const state = `/chhattisgarh/${service.slug}`;
    if (evaluateSeoPath(state).index) addLink(graph, path, state);
  }

  for (const guide of guideArticles) addLink(graph, "/guides", `/guides/${guide.slug}`);
  for (const post of blogPosts) addLink(graph, "/blog", `/blog/${post.slug}`);
  for (const page of PRICING_PAGES) addLink(graph, "/pricing", `/pricing/${page.slug}`);
  for (const item of COMPARISONS) addLink(graph, "/compare", `/compare/${item.slug}`);
  addLink(graph, "/pricing", "/chhattisgarh/raipur/pigeon-safety-nets");

  return graph;
}

export function inboundCounts(graph: Map<string, Set<string>>): Map<string, number> {
  const counts = new Map<string, number>();
  for (const links of graph.values()) {
    for (const href of links) counts.set(href, (counts.get(href) ?? 0) + 1);
  }
  return counts;
}

export function crawlDepths(graph: Map<string, Set<string>>): Map<string, number> {
  const depth = new Map<string, number>([["/" , 0]]);
  const queue = ["/"];
  while (queue.length) {
    const current = queue.shift();
    if (!current) continue;
    const nextDepth = (depth.get(current) ?? 0) + 1;
    for (const href of graph.get(current) ?? []) {
      if (depth.has(href)) continue;
      depth.set(href, nextDepth);
      queue.push(href);
    }
  }
  return depth;
}

function recommendedParent(path: string): string {
  if (path.startsWith("/chhattisgarh/raipur/areas/") && path.split("/").length === 6) {
    return path.split("/").slice(0, 5).join("/");
  }
  if (path.startsWith("/chhattisgarh/raipur/areas/")) return "/chhattisgarh/raipur";
  if (path.startsWith("/chhattisgarh/raipur/")) return "/chhattisgarh/raipur";
  if (path.startsWith("/chhattisgarh/")) return "/chhattisgarh";
  if (path.startsWith("/services/")) return "/services";
  if (path.startsWith("/guides/")) return "/guides";
  if (path.startsWith("/blog/")) return "/blog";
  if (path.startsWith("/pricing/")) return "/pricing";
  if (path.startsWith("/compare/")) return "/compare";
  return "/";
}

export function auditIndexableUrls(): CrawlFinding[] {
  const graph = buildCrawlGraph();
  const inbound = inboundCounts(graph);
  const depth = crawlDepths(graph);
  return getAllSitemapEntries().map((entry) => {
    const links = inbound.get(entry.path) ?? 0;
    const hops = depth.get(entry.path) ?? null;
    const notes: string[] = [];
    const gate = evaluateSeoPath(entry.path);
    let flag: CrawlFinding["flag"] = "PASS";
    if (!gate.index || gate.canonicalPath !== entry.path) {
      flag = "ERROR";
      notes.push(gate.index ? `Canonical is ${gate.canonicalPath}` : "Not indexable");
    }
    if (links === 0) {
      flag = flag === "ERROR" ? "ERROR" : "WARNING";
      notes.push("No internal link");
    } else if ((entry.seoPriority === "P0" || entry.seoPriority === "P1") && links < 2) {
      flag = flag === "ERROR" ? "ERROR" : "WARNING";
      notes.push("Thin internal links");
    }
    if (hops !== null && entry.seoPriority === "P0" && hops > 2) {
      flag = flag === "ERROR" ? "ERROR" : "WARNING";
      notes.push(`Crawl depth ${hops}`);
    }
    if (hops !== null && entry.seoPriority === "P1" && hops > 3) {
      flag = flag === "ERROR" ? "ERROR" : "WARNING";
      notes.push(`Crawl depth ${hops}`);
    }
    if (notes.length === 0) notes.push("Self canonical, indexable, linked");
    return {
      url: entry.path,
      priority: entry.seoPriority,
      pageType: pageTypeForPath(entry.path),
      internalLinks: links,
      depth: hops,
      recommendedParent: recommendedParent(entry.path),
      flag,
      notes,
    };
  });
}

export function raipurDashboard() {
  const findings = auditIndexableUrls().filter((row) => row.url.startsWith("/chhattisgarh/raipur"));
  const groups = getSitemapGroups();
  const raipurFile = groups.find((group) => group.id === "raipur");
  return {
    total: findings.length,
    p0: findings.filter((row) => row.priority === "P0").length,
    inSitemap: raipurFile?.entries.length ?? 0,
    orphans: findings.filter((row) => row.internalLinks === 0),
    warnings: findings.filter((row) => row.flag !== "PASS"),
    errors: findings.filter((row) => row.flag === "ERROR"),
    findings,
  };
}

export function sitemapAuditSummary() {
  const entries = getAllSitemapEntries();
  const exclusions = getSitemapExclusions();
  const findings = auditIndexableUrls();
  const invalid = findings.filter((row) => row.flag === "ERROR");
  return {
    total: entries.length,
    indexable: entries.length,
    excluded: exclusions.length,
    invalid: invalid.length,
    groups: getSitemapGroups().map((group) => ({
      file: group.file,
      count: group.entries.length,
    })),
    exclusions,
    findings,
    orphans: findings.filter((row) => row.internalLinks === 0),
    raipur: raipurDashboard(),
  };
}
