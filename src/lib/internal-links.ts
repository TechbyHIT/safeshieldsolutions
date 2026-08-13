import { routes } from "@/config/routes";

export interface InternalLink {
  href: string;
  label: string;
  description?: string;
}

export function buildServiceBreadcrumbs(serviceName: string, serviceSlug: string) {
  return [
    { name: "Home", url: routes.home },
    { name: "Services", url: routes.services },
    { name: serviceName, url: routes.service(serviceSlug) },
  ];
}

export function buildAreaHubBreadcrumbs(
  cityName: string,
  citySlug: string,
  areaName: string,
  areaSlug: string,
) {
  return [
    { name: "Home", url: routes.home },
    { name: "Locations", url: routes.locations },
    { name: cityName, url: routes.city(citySlug) },
    { name: areaName, url: routes.area(citySlug, areaSlug) },
  ];
}

export function buildCityBreadcrumbs(cityName: string, citySlug: string) {
  return [
    { name: "Home", url: routes.home },
    { name: "Locations", url: routes.locations },
    { name: cityName, url: routes.city(citySlug) },
  ];
}

export function buildCityServiceBreadcrumbs(
  cityName: string,
  citySlug: string,
  serviceName: string,
  serviceSlug: string,
) {
  return [
    { name: "Home", url: routes.home },
    { name: cityName, url: routes.city(citySlug) },
    { name: serviceName, url: routes.cityService(citySlug, serviceSlug) },
  ];
}

export function buildAreaServiceBreadcrumbs(
  cityName: string,
  citySlug: string,
  areaName: string,
  areaSlug: string,
  serviceName: string,
  serviceSlug: string,
) {
  return [
    { name: "Home", url: routes.home },
    { name: cityName, url: routes.city(citySlug) },
    { name: areaName, url: routes.area(citySlug, areaSlug) },
    { name: serviceName, url: routes.areaService(citySlug, areaSlug, serviceSlug) },
  ];
}

export function buildServiceHubLinks(
  services: { slug: string; name: string }[],
): InternalLink[] {
  return services.map((s) => ({
    href: routes.service(s.slug),
    label: s.name,
  }));
}

export function buildCityServiceHubLinks(
  citySlug: string,
  services: { slug: string; name: string }[],
): InternalLink[] {
  return services.map((s) => ({
    href: routes.cityService(citySlug, s.slug),
    label: s.name,
  }));
}

export function buildAreaHubLinks(
  citySlug: string,
  areas: { slug: string; name: string }[],
): InternalLink[] {
  return areas.map((a) => ({
    href: routes.area(citySlug, a.slug),
    label: a.name,
  }));
}
