/**
 * Validate JSON-LD builders used on indexable pages (in-repo Rich Results checks).
 * Run: npm run schema:audit
 */
import { getCgPlace } from "../src/data/cg-local-seo";
import { getSeoService } from "../src/data/seo-services";
import { buildServiceEntityGraph } from "../src/lib/entity-seo";
import { buildLocalLandingCopy } from "../src/lib/local-landing-content";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildCourseSchema,
  buildEventSchema,
  buildFaqSchema,
  buildJobPostingSchema,
  buildLocalBusinessSchema,
  buildOrganizationSchema,
  buildProductSchema,
  buildRecipeSchema,
  buildServiceSchema,
  buildVideoObjectSchema,
  buildWebPageSchema,
  buildWebsiteSchema,
} from "../src/lib/schema";
import { validateStructuredData } from "../src/lib/technical-seo";

const errors: string[] = [];

function check(label: string, value: unknown) {
  if (value == null) return;
  const issues = validateStructuredData(value);
  if (issues.length) {
    errors.push(`${label}: ${issues.join("; ")}`);
  }
}

check("Organization", buildOrganizationSchema());
check("WebSite", buildWebsiteSchema());
check("LocalBusiness", buildLocalBusinessSchema("Raipur"));
check(
  "Service",
  buildServiceSchema("Invisible Grills", "Measured cable infill.", "/services/invisible-grills"),
);
check(
  "WebPage",
  buildWebPageSchema("Invisible Grills in Raipur", "Survey-led quote.", "/chhattisgarh/raipur/invisible-grills"),
);
check(
  "BreadcrumbList",
  buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Chhattisgarh", url: "/chhattisgarh" },
    { name: "Raipur", url: "/chhattisgarh/raipur" },
  ]),
);
check(
  "FAQPage",
  buildFaqSchema([
    { question: "How is the quote calculated?", answer: "After the opening is measured on site." },
  ]),
);
check(
  "Article",
  buildArticleSchema({
    kind: "Article",
    headline: "How to compare invisible grill quotes",
    description: "What the survey checks.",
    path: "/guides/how-to-compare-invisible-grill-quotes",
  }),
);
check(
  "BlogPosting",
  buildArticleSchema({
    kind: "BlogPosting",
    headline: "Invisible grills in Raipur",
    description: "A measured note.",
    path: "/blog/example",
    datePublished: "2026-10-22",
  }),
);

const place = getCgPlace("raipur")!;
const service = getSeoService("invisible-grills")!;
const local = buildLocalLandingCopy(place, service, "general");
check(
  `Service graph @ ${local.path}`,
  buildServiceEntityGraph({
    service,
    place,
    path: local.path,
    title: local.h1,
    description: local.description,
  }),
);

if (buildProductSchema({ name: "Invisible Grills", path: "/services/invisible-grills" }) !== null) {
  errors.push("Product schema should be omitted without a real offer record");
}
if (
  buildVideoObjectSchema({
    name: "Install",
    contentUrl: "https://safeshieldsolutions.in/video.mp4",
    thumbnailUrl: "https://safeshieldsolutions.in/images/photos/balcony-invisible-grills/168.webp",
    uploadDate: "2026-10-22",
    transcript: "",
  }) !== null
) {
  errors.push("VideoObject should be omitted without a transcript");
}
if (buildEventSchema({}) !== null) errors.push("Event schema should be omitted");
if (buildJobPostingSchema({}) !== null) errors.push("JobPosting schema should be omitted");
if (buildRecipeSchema({ name: "Cable mix", recipeIngredient: ["SS304"] }) !== null) {
  errors.push("Recipe schema should be omitted");
}
if (buildCourseSchema({ name: "Install training", description: "A class." }) !== null) {
  errors.push("Course schema should be omitted");
}

console.log("SCHEMA AUDIT\n");
console.log(`  Blocks checked: 10+`);
console.log(`  Validation errors: ${errors.length}`);

if (errors.length) {
  console.log("\nFAILED:");
  for (const line of errors) console.log(`  - ${line}`);
  process.exit(1);
}

console.log("\nPASS — JSON-LD builders validate (run Google Rich Results Test on live URLs before launch).");
