# BABAI Programmatic SEO Platform

Production-ready Next.js programmatic SEO website for invisible grills, safety nets, and home protection services in Hyderabad and Chennai.

## Stack

- Next.js 14 App Router, React, TypeScript (strict)
- Tailwind CSS, PostgreSQL, Prisma ORM, Zod
- Vitest (unit), Playwright (e2e)

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit DATABASE_URL and NEXT_PUBLIC_SITE_URL

# 3. Set up database
npm run prisma:generate
npm run prisma:migrate
npm run db:seed

# 4. Start development
npm run dev
```

## Key Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint |
| `npm run test` | Unit tests |
| `npm run db:seed` | Seed services, locations, pages |
| `npm run pages:count` | Page count report |
| `npm run pages:publish` | Publish pages by phase |
| `npm run seo:audit` | SEO indexability audit |

## Project Structure

```
src/
  app/           # App Router pages & routes
  components/    # UI, layout, SEO components
  config/        # Business, site, SEO, images, routes
  lib/           # Core logic (content, metadata, schema, queries)
prisma/          # Database schema & seed
scripts/         # Page management & audit scripts
public/images/   # HD SVG assets (43 images)
```

## URL Patterns

- `/services/[slug]` — Service pages
- `/locations/[slug]` — City pages
- `/[city]/[service]` — City + service combinations
- `/[city]/[area]/[service]` — Area + service combinations

## Images

43 HD SVG assets are in `public/images/` with SEO alt text, titles, and captions defined in `src/config/images.ts`.

## Publishing Phases

1. **Phase 1** (5,000 URLs): Core services, cities, top areas
2. **Phase 2** (15,000 URLs): City-service combinations
3. **Phase 3** (25,000 URLs): Area-service combinations
4. **Phase 4** (5,000 URLs): Guides, blog, authority content

Run `npm run pages:publish -- 1` to publish phase 1 pages.

## License

Private – All rights reserved.
