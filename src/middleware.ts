import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CITIES } from "@/data/cities";

const CITY_SLUGS = new Set(CITIES.map((c) => c.slug));

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
  "sitemaps",
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

  const parts = pathname.split("/").filter(Boolean);
  if (parts.length < 2) {
    return NextResponse.next();
  }

  const first = parts[0];
  if (!first || APP_ROUTE_ROOTS.has(first)) {
    return NextResponse.next();
  }

  if (!CITY_SLUGS.has(first)) {
    return NextResponse.rewrite(new URL("/not-found", request.url), { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
