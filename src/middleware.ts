import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CITIES } from "@/data/cities";
import { getAreasForCity } from "@/data/areas";
import { evaluateSeoPath } from "@/lib/seo-quality-gate";

const CITY_SLUGS = new Set(CITIES.map((c) => c.slug));
const AREA_SLUGS_BY_CITY = new Map(
  CITIES.map((city) => [city.slug, new Set(getAreasForCity(city.slug).map((area) => area.slug))]),
);

const APP_ROUTE_ROOTS = new Set([
  "services",
  "locations",
  "contact",
  "about",
  "gallery",
  "guides",
  "blog",
  "faq",
  "html-sitemap",
  "privacy-policy",
  "terms-of-service",
  "pricing",
  "compare",
  "seo-coverage",
  "api",
  "_next",
  "images",
]);

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  if (pathname.length > 1 && pathname.endsWith("/")) {
    url.pathname = pathname.replace(/\/+$/, "") || "/";
    return NextResponse.redirect(url, 301);
  }

  if (pathname !== pathname.toLowerCase()) {
    url.pathname = pathname.toLowerCase();
    return NextResponse.redirect(url, 301);
  }

  const host = request.headers.get("host") ?? "";
  if (host.startsWith("www.")) {
    const proto = request.headers.get("x-forwarded-proto") ?? "http";
    url.host = host.slice(4);
    url.protocol = `${proto}:`;
    return NextResponse.redirect(url, 301);
  }

  if (url.search && !pathname.startsWith("/api/")) {
    url.search = "";
    return NextResponse.redirect(url, 301);
  }

  const gate = evaluateSeoPath(pathname);
  if (!gate.index && gate.canonicalPath !== pathname && gate.canonicalPath.startsWith("/")) {
    url.pathname = gate.canonicalPath;
    return NextResponse.redirect(url, 301);
  }

  const parts = pathname.split("/").filter(Boolean);
  if (parts.length < 2) {
    return NextResponse.next();
  }

  const first = parts[0];
  if (first === "locations" && parts[1] && !CITY_SLUGS.has(parts[1])) {
    return NextResponse.rewrite(new URL("/not-found", request.url), { status: 404 });
  }
  if (first === "locations" && parts[1] && parts[2]) {
    const cityAreas = AREA_SLUGS_BY_CITY.get(parts[1]);
    if (!cityAreas?.has(parts[2])) {
      return NextResponse.rewrite(new URL("/not-found", request.url), { status: 404 });
    }
  }
  if (!first || APP_ROUTE_ROOTS.has(first)) {
    return NextResponse.next();
  }

  if (!CITY_SLUGS.has(first)) {
    return NextResponse.rewrite(new URL("/not-found", request.url), { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|favicon\\.png|icon\\.png|robots\\.txt|sitemap\\.xml|sitemap-[a-z0-9-]+\\.xml|.*\\.(?:png|jpe?g|gif|webp|svg|ico|webmanifest)$).*)",
  ],
};
