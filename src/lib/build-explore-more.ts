import { CITIES } from "@/data/cities";
import { AREA_PAGE_SERVICES } from "@/data/seo-services";
import { getAreasForCity } from "@/data/areas";
import { routes } from "@/config/routes";
import { PAGE_INTENT_SUFFIXES } from "@/lib/area-page-slugs-types";
import { contentSeed, pickMany } from "@/lib/content-seed";
import { guideArticles, blogPosts } from "@/config/guides-content";
import {
  APPLICATION_PHRASES,
  BUILDING_TYPE_LINKS,
  IT_PARKS_BY_CITY,
  LANDMARKS_BY_CITY,
  MATERIAL_PHRASES,
} from "@/config/explore-more-pools";
import type {
  ExploreMoreCardData,
  ExploreMoreContext,
  ExploreMoreLink,
  ExploreMoreSectionData,
} from "@/lib/explore-more-types";
import { business } from "@/config/business";

const LINKS_PER_CARD = 10;

function pageSeed(ctx: ExploreMoreContext): number {
  const key = [ctx.pageType, ctx.citySlug, ctx.areaSlug ?? "", ctx.pageSlug].join(":");
  return contentSeed(key, ctx.serviceSlug);
}

function shuffleOrder<T>(items: T[], seed: number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = (seed + i * 17) % (i + 1);
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy;
}

function takeUnique(
  candidates: ExploreMoreLink[],
  count: number,
  used: Set<string>,
): ExploreMoreLink[] {
  const out: ExploreMoreLink[] = [];
  for (const link of candidates) {
    if (used.has(link.href)) continue;
    used.add(link.href);
    out.push(link);
    if (out.length >= count) break;
  }
  return out;
}

function areaHref(ctx: ExploreMoreContext, areaSlug: string, slug: string): string {
  return routes.areaService(ctx.citySlug, areaSlug, slug);
}

function cityHref(ctx: ExploreMoreContext, slug: string): string {
  return routes.cityService(ctx.citySlug, slug);
}

function buildCardPool(ctx: ExploreMoreContext, used: Set<string>): ExploreMoreCardData[] {
  const seed = pageSeed(ctx);
  const areas = getAreasForCity(ctx.citySlug);
  const otherAreas = areas.filter((a) => a.slug !== ctx.areaSlug);
  const otherCities = CITIES.filter((c) => c.slug !== ctx.citySlug);
  const otherServices = AREA_PAGE_SERVICES.filter((s) => s.slug !== ctx.serviceSlug);
  const intents = PAGE_INTENT_SUFFIXES.filter((s) => s !== "");
  const blogsForCity = blogPosts.filter((b) => b.citySlug === ctx.citySlug);
  const blogsRotated = shuffleOrder(blogsForCity.length ? blogsForCity : blogPosts, seed);

  const cards: ExploreMoreCardData[] = [];

  const currentLinks: ExploreMoreLink[] = PAGE_INTENT_SUFFIXES.map((suffix) => {
    const slug = `${ctx.serviceSlug}${suffix}`;
    const href =
      ctx.pageType === "area-service" && ctx.areaSlug
        ? areaHref(ctx, ctx.areaSlug, slug)
        : cityHref(ctx, slug);
    return {
      href,
      label: `${ctx.serviceName}${suffix ? suffix.replace(/-/g, " ") : ""} · ${ctx.areaName ?? ctx.cityName}`,
      isCurrent: href === ctx.currentPath,
    };
  });
  cards.push({
    id: "current-service",
    icon: "service",
    heading: `Current service · ${ctx.serviceName}`,
    description: `Intent variants and pricing paths for ${ctx.areaName ?? ctx.cityName}.`,
    links: takeUnique(currentLinks, LINKS_PER_CARD, used),
    viewAll: {
      href: cityHref(ctx, ctx.serviceSlug),
      label: `All ${ctx.serviceName} in ${ctx.cityName}`,
    },
    variant: "highlight",
    featured: true,
  });

  const relatedServiceLinks: ExploreMoreLink[] = shuffleOrder(otherServices, seed + 3)
    .slice(0, 20)
    .map((s) => ({
      href:
        ctx.pageType === "area-service" && ctx.areaSlug
          ? areaHref(ctx, ctx.areaSlug, `${s.slug}-near-me`)
          : cityHref(ctx, `${s.slug}-near-me`),
      label: `${s.name} near ${ctx.areaName ?? ctx.cityName}`,
    }));
  cards.push({
    id: "related-services",
    icon: "related",
    heading: "Related services",
    description: "Complementary safety, nets, screens, and drying solutions nearby.",
    links: takeUnique(relatedServiceLinks, LINKS_PER_CARD, used),
    viewAll: { href: routes.services, label: "Browse all services" },
  });

  if (ctx.pageType === "area-service" && ctx.areaSlug) {
    const nearby: ExploreMoreLink[] = [];
    for (let i = 0; i < 24; i++) {
      const area = otherAreas[(seed + i * 13) % otherAreas.length];
      if (!area) break;
      nearby.push({
        href: areaHref(ctx, area.slug, ctx.pageSlug),
        label: `${ctx.serviceName} in ${area.name}`,
      });
    }
    cards.push({
      id: "nearby-areas",
      icon: "area",
      heading: `Nearby areas · ${ctx.cityName}`,
      description: "Neighbouring localities residents compare before booking a survey.",
      links: takeUnique(nearby, LINKS_PER_CARD, used),
      viewAll: { href: routes.city(ctx.citySlug), label: `All ${ctx.cityName} areas` },
      featured: true,
    });
  } else {
    const areaLinks: ExploreMoreLink[] = [];
    for (let i = 0; i < 24; i++) {
      const area = areas[(seed + i * 9) % areas.length];
      if (!area) break;
      areaLinks.push({
        href: areaHref(ctx, area.slug, `${ctx.serviceSlug}-near-me`),
        label: `${ctx.serviceName} in ${area.name}`,
      });
    }
    cards.push({
      id: "nearby-areas",
      icon: "area",
      heading: `Popular localities · ${ctx.cityName}`,
      description: "High-intent neighbourhoods for this service across the city.",
      links: takeUnique(areaLinks, LINKS_PER_CARD, used),
      viewAll: { href: routes.city(ctx.citySlug), label: "Location hub" },
    });
  }

  const zones = [...new Set(areas.map((a) => a.zone))].filter(Boolean);
  if (zones.length > 1) {
    const districtLinks: ExploreMoreLink[] = shuffleOrder(zones, seed + 7)
      .slice(0, 12)
      .flatMap((zone) => {
        const inZone = areas.filter((a) => a.zone === zone);
        const area = inZone[(seed + zone.length) % inZone.length];
        if (!area) return [];
        const slug =
          ctx.pageType === "area-service" ? ctx.pageSlug : `${ctx.serviceSlug}-near-me`;
        return [
          {
            href: areaHref(ctx, area.slug, slug),
            label: `${ctx.serviceName} · ${zone} (${area.name})`,
          },
        ];
      });
    cards.push({
      id: "nearby-districts",
      icon: "district",
      heading: "Zones & districts",
      description: "Browse by city zone clusters and administrative belts.",
      links: takeUnique(districtLinks, LINKS_PER_CARD, used),
    });
  }

  const cityLinks: ExploreMoreLink[] = shuffleOrder(otherCities, seed + 11).map((c) => ({
    href: routes.cityService(c.slug, `${ctx.serviceSlug}-near-me`),
    label: `${ctx.serviceName} near me in ${c.name}`,
  }));
  cards.push({
    id: "nearby-cities",
    icon: "city",
    heading: "Nearby cities",
    description: "SafeShield coverage across South India — same team, local installers.",
    links: takeUnique(cityLinks, Math.min(LINKS_PER_CARD, otherCities.length), used),
    viewAll: { href: routes.locations, label: "All service cities" },
  });

  cards.push({
    id: "nearby-states",
    icon: "state",
    heading: "States we serve",
    description: "State-level hubs linking to city and locality pages.",
    links: takeUnique(
      CITIES.map((c) => ({
        href: routes.city(c.slug),
        label: `${c.state} · ${c.name} services`,
      })),
      LINKS_PER_CARD,
      used,
    ),
    viewAll: { href: routes.locations, label: "Explore locations" },
  });

  const popularSuffixes = pickMany(
    PAGE_INTENT_SUFFIXES.filter((s) => s !== ""),
    seed,
    12,
  );
  const popular: ExploreMoreLink[] = popularSuffixes.map((suffix) => ({
    href:
      ctx.pageType === "area-service" && ctx.areaSlug
        ? areaHref(ctx, ctx.areaSlug, `${ctx.serviceSlug}${suffix}`)
        : cityHref(ctx, `${ctx.serviceSlug}${suffix}`),
    label: `${ctx.serviceName}${suffix.replace(/-/g, " ")} · ${ctx.areaName ?? ctx.cityName}`,
  }));
  cards.push({
    id: "popular-searches",
    icon: "search",
    heading: "Popular searches",
    description: "High-converting queries mapped to dedicated landing pages.",
    links: takeUnique(popular, LINKS_PER_CARD, used),
  });

  const priceLinks: ExploreMoreLink[] = ["-price", "-cost", "-dealers", "-free-survey"].map((suffix) => ({
    href:
      ctx.pageType === "area-service" && ctx.areaSlug
        ? areaHref(ctx, ctx.areaSlug, `${ctx.serviceSlug}${suffix}`)
        : cityHref(ctx, `${ctx.serviceSlug}${suffix}`),
    label: `${ctx.serviceName}${suffix.replace(/-/g, " ")} · ${ctx.areaName ?? ctx.cityName}`,
  }));
  cards.push({
    id: "price-guides",
    icon: "price",
    heading: "Price & quote paths",
    description: "Transparent pricing intents — survey, itemised quote, no obligation.",
    links: takeUnique(priceLinks, LINKS_PER_CARD, used),
    viewAll: { href: routes.guides, label: "Price guides" },
  });

  const buyingGuides: ExploreMoreLink[] = shuffleOrder(guideArticles, seed + 19)
    .slice(0, 14)
    .map((g) => ({
      href: routes.guide(g.slug),
      label: g.title,
    }));
  cards.push({
    id: "buying-guides",
    icon: "buying",
    heading: "Buying guides",
    description: "Compare materials, society rules, and scope before you buy.",
    links: takeUnique(buyingGuides, LINKS_PER_CARD, used),
    viewAll: { href: routes.guides, label: "All guides" },
  });

  const installLinks: ExploreMoreLink[] = intents
    .filter((s) => s.includes("installation") || s.includes("contractors") || s.includes("dealers"))
    .map((suffix) => ({
      href:
        ctx.pageType === "area-service" && ctx.areaSlug
          ? areaHref(ctx, ctx.areaSlug, `${ctx.serviceSlug}${suffix}`)
          : cityHref(ctx, `${ctx.serviceSlug}${suffix}`),
      label: `${ctx.serviceName} ${suffix.replace(/-/g, " ")}`,
    }));
  cards.push({
    id: "installation-guides",
    icon: "install",
    heading: "Installation & dealers",
    description: "Certified fitting, access planning, and dealer comparisons.",
    links: takeUnique(installLinks, LINKS_PER_CARD, used),
  });

  const apps: ExploreMoreLink[] = pickMany(APPLICATION_PHRASES, seed, 12).map((phrase) => ({
    href:
      ctx.pageType === "area-service" && ctx.areaSlug
        ? areaHref(ctx, ctx.areaSlug, `${ctx.serviceSlug}-installation`)
        : cityHref(ctx, `${ctx.serviceSlug}-installation`),
    label: `${phrase} · ${ctx.areaName ?? ctx.cityName}`,
  }));
  cards.push({
    id: "applications",
    icon: "application",
    heading: "Applications",
    description: "Use-case landing paths for balconies, ducts, terraces, and sports.",
    links: takeUnique(apps, LINKS_PER_CARD, used),
  });

  const buildings: ExploreMoreLink[] = BUILDING_TYPE_LINKS.map((b) => ({
    href:
      ctx.pageType === "area-service" && ctx.areaSlug
        ? areaHref(ctx, ctx.areaSlug, `${ctx.serviceSlug}-premium`)
        : cityHref(ctx, `${ctx.serviceSlug}-premium`),
    label: `${ctx.serviceName} for ${b.label}`,
  }));
  cards.push({
    id: "building-types",
    icon: "building",
    heading: "Building types",
    description: "Apartments, villas, offices, and institutional installs.",
    links: takeUnique(buildings, LINKS_PER_CARD, used),
  });

  const materials: ExploreMoreLink[] = pickMany(MATERIAL_PHRASES, seed + 29, 10).map((m) => ({
    href: cityHref(ctx, `${ctx.serviceSlug}-best`),
    label: `${m} · ${ctx.serviceName}`,
  }));
  cards.push({
    id: "materials",
    icon: "material",
    heading: "Materials & specs",
    description: "Wire grade, mesh GSM, and coastal durability choices.",
    links: takeUnique(materials, LINKS_PER_CARD, used),
  });

  cards.push({
    id: "maintenance",
    icon: "maintenance",
    heading: "Maintenance",
    description: "Seasonal checks, tensioning, and cleaning access.",
    links: takeUnique(
      [
        {
          href: cityHref(ctx, `${ctx.serviceSlug}-premium`),
          label: `${ctx.serviceName} maintenance checklist · ${ctx.cityName}`,
        },
        ...pickMany(APPLICATION_PHRASES, seed + 31, 8).map((p) => ({
          href: routes.guides,
          label: `${p} maintenance tips`,
        })),
      ],
      LINKS_PER_CARD,
      used,
    ),
  });

  cards.push({
    id: "repair",
    icon: "repair",
    heading: "Repair & replacement",
    description: "When to repair cables, mesh, or tracks vs full replacement.",
    links: takeUnique(
      [
        {
          href:
            ctx.pageType === "area-service" && ctx.areaSlug
              ? areaHref(ctx, ctx.areaSlug, `${ctx.serviceSlug}-contractors`)
              : cityHref(ctx, `${ctx.serviceSlug}-contractors`),
          label: `${ctx.serviceName} contractors · ${ctx.areaName ?? ctx.cityName}`,
        },
        { href: routes.contact, label: "Request repair assessment" },
      ],
      LINKS_PER_CARD,
      used,
    ),
  });

  const faqLinks: ExploreMoreLink[] = shuffleOrder(intents, seed + 37)
    .slice(0, 10)
    .map((suffix) => ({
      href:
        ctx.pageType === "area-service" && ctx.areaSlug
          ? areaHref(ctx, ctx.areaSlug, `${ctx.serviceSlug}${suffix}`)
          : cityHref(ctx, `${ctx.serviceSlug}${suffix}`),
      label: `FAQ: ${ctx.serviceName} ${suffix.replace(/-/g, " ")}`,
    }));
  cards.push({
    id: "faqs",
    icon: "faq",
    heading: "FAQs & answers",
    description: "Common questions mapped to intent-specific pages.",
    links: takeUnique(faqLinks, LINKS_PER_CARD, used),
  });

  const projectLinks: ExploreMoreLink[] = shuffleOrder(blogsRotated, seed + 41)
    .slice(0, 12)
    .map((b) => ({
      href: routes.blogPost(b.slug),
      label: b.title,
    }));
  cards.push({
    id: "recent-projects",
    icon: "project",
    heading: "Recent projects",
    description: "Local installs and case notes from our blog.",
    links: takeUnique(projectLinks, LINKS_PER_CARD, used),
    viewAll: { href: routes.blog, label: "Project blog" },
  });

  cards.push({
    id: "gallery",
    icon: "gallery",
    heading: "Gallery",
    description: "Photos by service type — before/after and detail shots.",
    links: takeUnique(
      [
        { href: routes.gallery, label: "Full project gallery" },
        { href: routes.service(ctx.serviceSlug), label: `${ctx.serviceName} photos` },
        ...shuffleOrder(otherServices, seed + 43)
          .slice(0, 8)
          .map((s) => ({
            href: routes.service(s.slug),
            label: `${s.name} gallery`,
          })),
      ],
      LINKS_PER_CARD,
      used,
    ),
  });

  const blogLinks: ExploreMoreLink[] = shuffleOrder(blogsRotated, seed + 47)
    .slice(0, 12)
    .map((b) => ({
      href: routes.blogPost(b.slug),
      label: b.title,
    }));
  cards.push({
    id: "latest-blogs",
    icon: "blog",
    heading: "Latest blogs",
    description: "Neighbourhood-specific tips and install stories.",
    links: takeUnique(blogLinks, LINKS_PER_CARD, used),
    viewAll: { href: routes.blog, label: "All articles" },
  });

  const landmarks = LANDMARKS_BY_CITY[ctx.citySlug] ?? [];
  if (landmarks.length) {
    const landmarkLinks: ExploreMoreLink[] = pickMany(landmarks, seed, 10).map((name) => ({
      href:
        ctx.pageType === "area-service" && ctx.areaSlug
          ? areaHref(ctx, ctx.areaSlug, `${ctx.serviceSlug}-near-me`)
          : cityHref(ctx, `${ctx.serviceSlug}-near-me`),
      label: `${ctx.serviceName} near ${name}`,
    }));
    cards.push({
      id: "nearby-landmarks",
      icon: "landmark",
      heading: "Nearby landmarks",
      description: "Corridor and hub names searchers use alongside your area.",
      links: takeUnique(landmarkLinks, LINKS_PER_CARD, used),
    });
  }

  const aptAreas = shuffleOrder(areas, seed + 53).slice(0, 12);
  cards.push({
    id: "nearby-apartments",
    icon: "apartment",
    heading: "Apartment communities",
    description: "Society towers and gated layouts with frequent installs.",
    links: takeUnique(
      aptAreas.map((a) => ({
        href: areaHref(ctx, a.slug, `${ctx.serviceSlug}-premium`),
        label: `${a.name} apartments · ${ctx.serviceName}`,
      })),
      LINKS_PER_CARD,
      used,
    ),
  });

  cards.push({
    id: "nearby-commercial",
    icon: "commercial",
    heading: "Commercial areas",
    description: "Retail, office, and mixed-use zones.",
    links: takeUnique(
      shuffleOrder(areas, seed + 59)
        .slice(0, 12)
        .map((a) => ({
          href: areaHref(ctx, a.slug, `${ctx.serviceSlug}-dealers`),
          label: `${ctx.serviceName} dealers near ${a.name}`,
        })),
      LINKS_PER_CARD,
      used,
    ),
  });

  const parks = IT_PARKS_BY_CITY[ctx.citySlug] ?? [];
  if (parks.length) {
    cards.push({
      id: "nearby-it-parks",
      icon: "it-park",
      heading: "IT parks & business hubs",
      description: "Tech corridor searches with high install volume.",
      links: takeUnique(
        pickMany(parks, seed, 8).map((park) => ({
          href: cityHref(ctx, `${ctx.serviceSlug}-premium`),
          label: `${ctx.serviceName} near ${park}`,
        })),
        LINKS_PER_CARD,
        used,
      ),
    });
  }

  cards.push({
    id: "related-products",
    icon: "product",
    heading: "Related products",
    description: "Cross-sell paths within the same property.",
    links: takeUnique(relatedServiceLinks.slice(0, 14), LINKS_PER_CARD, used),
  });

  cards.push({
    id: "customer-reviews",
    icon: "review",
    heading: "Customer reviews",
    description: "Trusted installs — speak with a local project manager.",
    links: takeUnique(
      [
        { href: routes.contact, label: "Read testimonials & leave a review" },
        { href: routes.gallery, label: "See reviewed projects" },
        ...shuffleOrder(otherAreas.length ? otherAreas : areas, seed + 61)
          .slice(0, 8)
          .map((a) => ({
            href: areaHref(ctx, a.slug, `${ctx.serviceSlug}-best`),
            label: `Top-rated ${ctx.serviceName} in ${a.name}`,
          })),
      ],
      LINKS_PER_CARD,
      used,
    ),
  });

  cards.push({
    id: "contact",
    icon: "contact",
    heading: "Contact",
    description: "Call, WhatsApp, or email — response within business hours.",
    links: [
      { href: routes.contact, label: "Contact form & office details" },
      { href: `tel:${business.phone.replace(/\s/g, "")}`, label: `Call ${business.phone}` },
      {
        href: `https://wa.me/${business.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi, I need ${ctx.serviceName} in ${ctx.areaName ?? ctx.cityName}.`)}`,
        label: "WhatsApp quote",
      },
    ],
    variant: "cta",
  });

  cards.push({
    id: "book-inspection",
    icon: "inspection",
    heading: "Book free inspection",
    description: "On-site measurement and itemised quote — no obligation.",
    links: takeUnique(
      [
        { href: routes.contact, label: "Schedule free site survey" },
        {
          href:
            ctx.pageType === "area-service" && ctx.areaSlug
              ? areaHref(ctx, ctx.areaSlug, `${ctx.serviceSlug}-free-survey`)
              : cityHref(ctx, `${ctx.serviceSlug}-free-survey`),
          label: `${ctx.serviceName} free survey · ${ctx.areaName ?? ctx.cityName}`,
        },
        { href: cityHref(ctx, `${ctx.serviceSlug}-installation`), label: "Installation booking" },
      ],
      LINKS_PER_CARD,
      used,
    ),
    variant: "cta",
    featured: true,
  });

  return cards.filter((c) => c.links.length > 0);
}

export function buildExploreMoreSection(ctx: ExploreMoreContext): ExploreMoreSectionData {
  const seed = pageSeed(ctx);
  const used = new Set<string>();
  const pool = buildCardPool(ctx, used);

  const withoutCta = pool.filter((c) => c.variant !== "cta");
  const ctas = pool.filter((c) => c.variant === "cta");
  const shuffled = shuffleOrder(withoutCta, seed + 97);
  const count = 10 + (seed % 5);
  const selected = shuffled.slice(0, count);
  const ordered = shuffleOrder([...selected, ...ctas], seed + 101);

  return {
    pageKey: [ctx.citySlug, ctx.areaSlug, ctx.pageSlug].filter(Boolean).join("/"),
    title: "Explore more",
    subtitle: `Curated paths for ${ctx.serviceName} in ${ctx.areaName ? `${ctx.areaName}, ` : ""}${ctx.cityName} — unique to this page.`,
    cards: ordered,
  };
}
