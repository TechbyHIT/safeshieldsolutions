export type ExploreMoreIconId =
  | "service"
  | "related"
  | "area"
  | "city"
  | "district"
  | "state"
  | "search"
  | "price"
  | "buying"
  | "install"
  | "application"
  | "building"
  | "material"
  | "maintenance"
  | "repair"
  | "faq"
  | "project"
  | "gallery"
  | "blog"
  | "landmark"
  | "apartment"
  | "commercial"
  | "it-park"
  | "product"
  | "review"
  | "contact"
  | "inspection";

export interface ExploreMoreLink {
  href: string;
  label: string;
  /** Marks the current page in the current-service card */
  isCurrent?: boolean;
}

export interface ExploreMoreCardData {
  id: string;
  icon: ExploreMoreIconId;
  heading: string;
  description: string;
  links: ExploreMoreLink[];
  viewAll?: { href: string; label: string };
  /** Featured card spans 2 columns on wide screens */
  featured?: boolean;
  /** Sticky CTA card */
  variant?: "default" | "cta" | "highlight";
}

export interface ExploreMoreSectionData {
  title: string;
  subtitle: string;
  cards: ExploreMoreCardData[];
  pageKey: string;
}

export interface ExploreMoreContext {
  pageType: "area-service" | "city-service";
  citySlug: string;
  cityName: string;
  stateName: string;
  serviceSlug: string;
  serviceName: string;
  pageSlug: string;
  currentPath: string;
  areaSlug?: string;
  areaName?: string;
}
