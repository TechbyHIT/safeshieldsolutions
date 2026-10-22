/**
 * Off-page records stay empty until an export is supplied.
 * Prospects are scored. Paid and unrelated links are refused.
 */
import { guideArticles } from "@/config/guides-content";
import { COMPARISONS } from "@/data/cg-local-seo";

export type AssetKind = "comparison" | "glossary" | "guide" | "local-page" | "about";

export interface LinkableAsset {
  path: string;
  title: string;
  kind: AssetKind;
  angle: string;
}

export function linkableAssets(): LinkableAsset[] {
  const comparisons: LinkableAsset[] = COMPARISONS.map((item) => ({
    path: `/compare/${item.slug}`,
    title: item.title,
    kind: "comparison",
    angle: item.summary,
  }));
  const guides: LinkableAsset[] = guideArticles.map((article) => ({
    path: `/guides/${article.slug}`,
    title: article.title,
    kind: "guide",
    angle: article.summary,
  }));
  return [
    {
      path: "/glossary",
      title: "Terms used on a quote",
      kind: "glossary",
      angle: "Defines SS304, SS316, mesh types, grills, nets, spikes, and zip screens without a published rate.",
    },
    {
      path: "/about",
      title: "SafeShield Solutions",
      kind: "about",
      angle: "Names the business, the Chhattisgarh service area, and the measurement-before-quote rule.",
    },
    {
      path: "/chhattisgarh/raipur/invisible-grills",
      title: "Invisible Grills in Raipur",
      kind: "local-page",
      angle: "Explains how a Raipur opening is specified. It does not claim a branch office.",
    },
    ...comparisons,
    ...guides,
  ];
}

export interface LinkProspect {
  url: string;
  kind: "editorial" | "directory" | "mention" | "spam";
  topicMatches: boolean;
  paid: boolean;
}

export function prospectDecision(prospect: LinkProspect): "review" | "ignore" {
  if (prospect.paid || prospect.kind === "spam" || !prospect.topicMatches) return "ignore";
  if (prospect.kind === "editorial" || prospect.kind === "directory" || prospect.kind === "mention") {
    return "review";
  }
  return "ignore";
}

/** Directories worth a manual check. Presence here is not a claim that the profile exists. */
export const DIRECTORY_CHECKS = [
  {
    name: "Google Business Profile",
    check: "The service area is Chhattisgarh and the address matches the published business record.",
  },
] as const;

export interface BrokenLinkRow {
  pageUrl: string;
  brokenUrl: string;
  httpStatus: number;
  topicMatches: boolean;
}

export function brokenLinkOpportunities(rows: BrokenLinkRow[] | undefined, assets: LinkableAsset[]): {
  source: "none" | "export";
  note: string;
  rows: { pageUrl: string; brokenUrl: string; suggest: string }[];
} {
  if (!rows || rows.length === 0) {
    return {
      source: "none",
      note: "No external crawl is loaded. Broken links on other sites are not invented.",
      rows: [],
    };
  }
  const suggest = assets.find((asset) => asset.kind === "comparison")?.path ?? "/glossary";
  return {
    source: "export",
    note: "A suggestion is the closest original page. It is not an automated outreach list.",
    rows: rows
      .filter((row) => row.httpStatus >= 400 && row.topicMatches)
      .map((row) => ({ pageUrl: row.pageUrl, brokenUrl: row.brokenUrl, suggest })),
  };
}

export interface CompetitorLinkRow {
  domain: string;
  competitorHas: boolean;
  weHave: boolean;
  kind: LinkProspect["kind"];
}

export function competitorLinkGap(rows?: CompetitorLinkRow[]): {
  source: "none" | "export";
  note: string;
  review: string[];
} {
  if (!rows || rows.length === 0) {
    return {
      source: "none",
      note: "No competitor link export is loaded. Referring domains are not guessed.",
      review: [],
    };
  }
  return {
    source: "export",
    note: "Only editorial or directory domains the competitor has, and this site does not, are listed for review.",
    review: rows
      .filter((row) => row.competitorHas && !row.weHave && row.kind !== "spam")
      .map((row) => row.domain),
  };
}

export interface MentionRow {
  source: string;
  url: string;
  namesBusiness: boolean;
}

export function mentionReport(rows?: MentionRow[]): {
  source: "none" | "export";
  note: string;
  named: MentionRow[];
} {
  if (!rows || rows.length === 0) {
    return {
      source: "none",
      note: "No mention export is loaded. Brand mentions are not invented.",
      named: [],
    };
  }
  return {
    source: "export",
    note: "Rows come from the supplied mention export.",
    named: rows.filter((row) => row.namesBusiness),
  };
}

export interface OwnedLinkRow {
  from: string;
  to: string;
  httpStatus: number;
}

export function linkQuality(rows?: OwnedLinkRow[]): {
  source: "none" | "export";
  note: string;
  broken: OwnedLinkRow[];
} {
  if (!rows || rows.length === 0) {
    return {
      source: "none",
      note: "No backlink monitor export is loaded. Domain authority is not estimated.",
      broken: [],
    };
  }
  return {
    source: "export",
    note: "Broken monitored links are the rows with an HTTP status of 400 or higher.",
    broken: rows.filter((row) => row.httpStatus >= 400),
  };
}
