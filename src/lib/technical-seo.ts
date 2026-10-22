/**
 * Single-hop URL normalization and structured-data checks.
 * The site is English (India) only, so hreflang points at the same canonical URL.
 */
export interface CrawlUrl {
  protocol: "http:" | "https:";
  host: string;
  pathname: string;
  search: string;
}

export function languageAlternates(canonical: string): Record<string, string> {
  return {
    "en-IN": canonical,
    "x-default": canonical,
  };
}

function isLocalHost(host: string): boolean {
  const name = host.split(":")[0] ?? host;
  return name === "localhost" || name === "127.0.0.1" || name === "[::1]";
}

/** Collapse slash, case, www, http, and query variants onto one URL. */
export function normalizeCrawlUrl(input: CrawlUrl, options?: { keepSearch?: boolean }): CrawlUrl {
  let protocol: CrawlUrl["protocol"] = input.protocol === "https:" ? "https:" : "http:";
  let host = input.host.trim().toLowerCase();
  let pathname = input.pathname || "/";
  if (!pathname.startsWith("/")) pathname = `/${pathname}`;
  if (pathname.length > 1) pathname = pathname.replace(/\/+$/, "") || "/";
  pathname = pathname.toLowerCase();
  if (host.startsWith("www.")) host = host.slice("www.".length);
  if (!isLocalHost(host)) protocol = "https:";
  return {
    protocol,
    host,
    pathname,
    search: options?.keepSearch ? input.search : "",
  };
}

export function crawlUrlChanged(before: CrawlUrl, after: CrawlUrl): boolean {
  return (
    before.protocol !== after.protocol ||
    before.host !== after.host ||
    before.pathname !== after.pathname ||
    before.search !== after.search
  );
}

export function validateStructuredData(data: unknown): string[] {
  const errors: string[] = [];
  const nodes = Array.isArray(data) ? data : [data];
  for (const node of nodes) errors.push(...validateNode(node, true));
  return errors;
}

function validateNode(node: unknown, requireContext: boolean): string[] {
  const errors: string[] = [];
  if (!node || typeof node !== "object" || Array.isArray(node)) {
    return ["Structured data node must be an object"];
  }
  const record = node as Record<string, unknown>;
  if (requireContext && record["@context"] !== "https://schema.org") {
    errors.push("Missing https://schema.org context");
  }
  if (Array.isArray(record["@graph"])) {
    for (const child of record["@graph"]) errors.push(...validateNode(child, false));
    return errors;
  }
  const type = record["@type"];
  if (typeof type !== "string" || type.length === 0) errors.push("Missing @type");
  if ("name" in record && (typeof record.name !== "string" || record.name.trim().length === 0)) {
    errors.push(`${type || "Node"} has an empty name`);
  }
  if (type === "Service" && (typeof record.name !== "string" || typeof record.serviceType !== "string")) {
    errors.push("Service needs a name and serviceType");
  }
  if (type === "FAQPage") errors.push(...validateFaq(record.mainEntity));
  if (type === "BreadcrumbList") errors.push(...validateBreadcrumbs(record.itemListElement));
  if (type === "ImageObject" && (typeof record.contentUrl !== "string" || typeof record.caption !== "string")) {
    errors.push("ImageObject needs contentUrl and caption");
  }
  return errors;
}

function validateFaq(mainEntity: unknown): string[] {
  if (!Array.isArray(mainEntity) || mainEntity.length === 0) return ["FAQPage needs questions"];
  const errors: string[] = [];
  for (const question of mainEntity) {
    if (!question || typeof question !== "object") {
      errors.push("FAQ question is empty");
      continue;
    }
    const record = question as Record<string, unknown>;
    if (record["@type"] !== "Question" || typeof record.name !== "string" || record.name.trim().length === 0) {
      errors.push("FAQ question needs a name");
    }
    const answer = record.acceptedAnswer;
    if (!answer || typeof answer !== "object") {
      errors.push("FAQ question needs an answer");
      continue;
    }
    const text = (answer as Record<string, unknown>).text;
    if (typeof text !== "string" || text.trim().length === 0) errors.push("FAQ answer is empty");
  }
  return errors;
}

function validateBreadcrumbs(items: unknown): string[] {
  if (!Array.isArray(items) || items.length === 0) return ["BreadcrumbList needs items"];
  const errors: string[] = [];
  items.forEach((item, index) => {
    if (!item || typeof item !== "object") {
      errors.push("Breadcrumb item is empty");
      return;
    }
    const record = item as Record<string, unknown>;
    if (record.position !== index + 1) errors.push(`Breadcrumb position ${String(record.position)} is out of order`);
    if (typeof record.name !== "string" || record.name.trim().length === 0) errors.push("Breadcrumb name is empty");
    if (typeof record.item !== "string" || !record.item.startsWith("https://")) {
      errors.push("Breadcrumb item must be an https URL");
    }
  });
  return errors;
}
