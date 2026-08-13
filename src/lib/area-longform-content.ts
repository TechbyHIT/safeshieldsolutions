import type { ContentSection } from "@/lib/content";
import { getAreaZoneForCity } from "@/config/area-zones";
import { getAreasForCity } from "@/data/areas";
import { AREA_PAGE_SERVICES, getSeoService } from "@/data/seo-services";
import {
  buildCategoryFaqs,
  buildCategorySeoSections,
} from "@/lib/category-seo-content";
import { contentSeed, pickMany, pickVariant } from "@/lib/content-seed";
import { slugify } from "@/lib/slug";

const SEARCH_INTENT_SUFFIXES = [
  "",
  " installation",
  " price",
  " company",
  " dealers",
  " contractors",
  " near me",
  " cost",
  " suppliers",
  " manufacturers",
  " best",
  " premium",
  " affordable",
  " quote",
  " quotation",
  " repair",
  " maintenance",
  " booking",
  " warranty",
] as const;

const MAX_INTENT_SECTIONS = 45;

const PROPERTY_SCENARIOS = [
  "2BHK apartment balcony",
  "3BHK corner flat with extended sit-out",
  "penthouse terrace with open edges",
  "independent house with front windows",
  "villa courtyard and staircase void",
  "gated community tower with society rules",
  "commercial shop-front with large openings",
  "institutional building with safety compliance",
  "duplex villa with internal voids",
  "builder floor with shared facade",
] as const;

const COMPARISON_TOPICS = [
  {
    id: "dealer-vs-direct",
    heading: "Dealer vs direct manufacturer-installer in {area}",
    templates: [
      "When you search for {serviceLower} dealers in {area}, you often contact resellers who add margin on materials sourced from fabricators. SafeShield Solutions operates as a direct manufacturer-installer for {locality}, which means measurements, material grade, production, and fitting stay under one quality standard. Dealers may quote lower headline rates but exclude anchor upgrades, openable sections, or post-install tension checks. A written scope after site survey in {area} lets you compare like-for-like across dealers, contractors, and direct teams.",
      "Contractors in {locality} sometimes sub-contract daily labour without documenting cable grade, mesh GSM, or warranty terms. For {serviceLower}, the fixing method matters as much as the product—especially on high-rise slabs in {zoneLabel}. Direct installation teams document SS304 or UV-spec materials, spacing for child safety, and included hardware before work starts. This transparency is why many {area} societies prefer a single vendor for full-tower projects rather than floor-by-floor dealer jobs.",
      "Price searches for {serviceLower} in {area} should always include: site visit charges, edge treatment, corner returns, transport, GST, and warranty registration. Middlemen may omit these until after measurement. We itemise every line so {locality} homeowners can negotiate from facts, not guesses. Bulk apartment packages in {area} often beat per-window dealer quotes when production is batched with consistent cable tensioning and channel alignment.",
    ],
  },
  {
    id: "material-grades",
    heading: "Material grades and specifications for {serviceName} in {locality}",
    templates: [
      "Not every {serviceLower} quote in {area} uses the same steel grade, mesh density, or pulley rating. SS304 stainless is standard for invisible grills in {zoneLabel} humidity; SS316 suits coastal exposure or pool-adjacent balconies. Safety nets need knotless construction with UV stabilisation for terrace and duct applications in {locality}. Cloth hanger systems should specify pulley load rating and SS304 rods for {area} monsoon seasons. Always ask for grade proof and included scope—not just per-sq-ft headline numbers.",
      "Cheaper alternatives in {area} markets may use MS powder-coated channels, lower GSM nets, or thin cables with wider spacing. For child safety openings in {locality}, spacing and anchor pull-out strength matter more than saving ₹20 per sq ft. Our {area} surveys note substrate condition—soft brick, old MS railing, uPVC frame—and recommend anchors that match. The right specification prevents rust streaks, sagging nets, and society complaints about facade inconsistency across {zoneLabel} towers.",
      "Sports nets and bird control in {locality} need span planning for wind load and pigeon pressure. A {serviceLower} package should state mesh size, border rope thickness, and fixing interval. Hanger installations in {area} apartments must respect ceiling height, pulley smoothness, and wall anchor depth in concrete vs brick. Documenting these details upfront avoids rework when building managers in {area} inspect exterior modifications.",
    ],
  },
  {
    id: "diy-vs-pro",
    heading: "Professional installation vs DIY for {serviceLower} in {area}",
    templates: [
      "Some {area} homeowners consider DIY kits for {serviceLower} after watching online tutorials. High-rise balconies in {locality} require harness access, correct anchor spacing, and tension tools most households lack. Incorrect fixing on {zoneLabel} concrete can crack edges or fail under child-load scenarios. Professional teams carry insurance, society NOC coordination, and warranty registration—critical for apartment towers in {area} where management rejects amateur facade changes.",
      "DIY may work for ground-floor windows with easy access, but {area} projects often involve 10th-floor sit-outs, L-shaped balconies, and openable sections needing alignment. Labour-only contractors without factory spec may under-tension cables or overlap nets visibly from the street—common rejection reasons in {locality} gated communities. Factory-cut {serviceLower} with measured channels fits faster and looks uniform across multiple units in the same {area} building.",
      "For {serviceName} in {locality}, the cost of rework exceeds professional installation when dealers omit edge sealing or use mismatched components. We train installers on {area}-typical floor plans: narrow utility balconies, full-length sliding windows, and terrace cricket cages. One-day professional completion with cleanup is usually cheaper than two DIY weekends plus material waste.",
    ],
  },
  {
    id: "timing-booking",
    heading: "Best time to book {serviceName} in {area}",
    templates: [
      "Demand for {serviceLower} in {locality} peaks before school reopenings and festival seasons when families prioritise child safety. Monsoon months in {zoneLabel} require dry windows for anchor curing and net tensioning—booking surveys 2–3 weeks ahead secures slots. Post-monsoon is ideal for invisible grill tension checks and net cleaning across {area} high-rises. Early booking also helps batch routes with nearby {zoneLabel} localities for faster installation.",
      "New possession phases in {area} townships create bulk demand; societies that coordinate tower-wide {serviceLower} packages get consistent facade lines and better pricing. Renovation seasons in {locality} often combine invisible grills with net and hanger work—schedule one survey to plan phased installation without repeated scaffold setup. Winter months offer stable weather for sports net and terrace projects in {area}.",
      "Urgent child-safety cases in {locality} are prioritised when openings are actively used by toddlers or pets. Mention floor level and society name when calling from {area} so routing assigns the nearest crew. Same-week surveys are common in {zoneLabel} for standard residential sizes; custom spans or heritage facades in {area} may need extra design time before production.",
    ],
  },
] as const;

const CASE_STUDY_TEMPLATES = [
  {
    title: "Full-tower invisible grill package",
    body:
      "A 14-floor apartment in {area} needed uniform {serviceLower} on all front-facing balconies without altering the builder's exterior colour scheme. Our team phased work by tower wing, coordinated lift and terrace access with the society office in {locality}, and used low-profile channels matched to railing paint. Each floor received documented cable spacing for child safety, openable sections on utility balconies, and post-install tension logs. The project finished in twelve working days with zero facade complaints— a common requirement in {zoneLabel} gated communities.",
  },
  {
    title: "Villa terrace sports and safety combination",
    body:
      "An independent villa near {landmark} required cricket practice netting on the terrace plus {serviceLower} on staircase voids and window openings. We surveyed wind exposure on the top floor in {area}, specified border rope and anchor intervals for net spans, and aligned grill spacing with the family's view preferences. Installation happened before monsoon so anchors cured in dry weather. The {locality} client booked maintenance reminders for post-season tension checks—typical for large outdoor spans in {zoneLabel}.",
  },
  {
    title: "Shop-front bird control retrofit",
    body:
      "A ground-floor commercial unit in {area} faced pigeon roosting above signage and nesting in duct areas. We installed bird control netting with discreet fixing along the fascia, preserving visibility for customers in {locality}. Work occurred after business hours to avoid disruption. The solution included mesh access panels for AC servicing—often overlooked in quick dealer quotes across {zoneLabel}. Follow-up after six months confirmed reduced droppings and intact anchors despite rain exposure.",
  },
  {
    title: "Society-mandated child safety upgrade",
    body:
      "After an internal safety audit, a {area} society required {serviceLower} on balconies above the second floor. We provided specification sheets for the management committee in {locality}, matching wire grade and spacing across 48 units. Bulk pricing beat individual dealer visits, and installation batches minimised lift downtime. Handover included warranty cards and care instructions in English and Telugu—helpful for mixed resident profiles common in {zoneLabel} towers.",
  },
  {
    title: "Renovation with uPVC window integration",
    body:
      "A renovated 3BHK in {area} replaced windows with uPVC frames before installing {serviceLower}. We measured after frame curing, used frame-compatible anchors, and avoided drilling into weakened old brick edges. The {locality} homeowner wanted openable grill sections aligned with sliding window tracks—requiring custom channel bends. Same visit covered cloth hanger rods on two balconies, reducing repeated scaffold costs typical in {zoneLabel} apartment renovations.",
  },
  {
    title: "High-rise corner flat with L-shaped balcony",
    body:
      "Corner flats in {area} often have L-shaped sit-outs with two exposure sides. Cable tension and corner returns differ from standard straight balconies; template quotes from {locality} dealers frequently under-estimate labour here. Our survey mapped both legs, recommended SS304 channels following the bend, and scheduled harness work for the outer edge facing {zoneLabel} wind. Result: even spacing, no visible sag, and society approval on the first inspection—important for premium towers in {area}.",
  },
] as const;

const FAQ_ANSWER_OPENERS = [
  "In {locality},",
  "For most {area} homes,",
  "Based on weekly installs across {zoneLabel},",
  "After surveying hundreds of openings in {area},",
  "Residents in {locality} often ask:",
  "Our {area} team typically finds that",
  "When comparing quotes in {locality},",
  "Society rules in {area} usually mean",
] as const;

const FAQ_TOPICS = [
  "pricing and hidden charges",
  "installation timeline and scheduling",
  "material grade verification",
  "society NOC and facade rules",
  "child and pet safety spacing",
  "monsoon performance and rust",
  "cleaning and maintenance intervals",
  "warranty claims and service visits",
  "openable vs fixed sections",
  "comparison with traditional grills",
  "bulk discounts for apartments",
  "GST and invoice documentation",
  "emergency repairs after storms",
  "pigeon and bird pressure on nets",
  "sports net wind load",
  "hanger pulley load limits",
  "colour and aesthetic matching",
  "access without scaffold",
  "insurance and liability",
  "post-install inspection checklists",
] as const;

export interface LongformContext {
  serviceName: string;
  serviceSlug: string;
  serviceLower: string;
  category: string;
  areaName: string;
  areaSlug: string;
  cityName: string;
  citySlug: string;
  locality: string;
  intentLabel?: string;
}

function fill(template: string, ctx: LongformContext, extra: Record<string, string> = {}): string {
  const zone = getAreaZoneForCity(ctx.citySlug, ctx.areaSlug);
  const vars: Record<string, string> = {
    serviceName: ctx.serviceName,
    serviceLower: ctx.serviceLower,
    area: ctx.areaName,
    city: ctx.cityName,
    locality: ctx.locality,
    zoneLabel: zone.label,
    category: ctx.category,
    ...extra,
  };
  return template.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? `{${key}}`);
}

function paragraphBlock(templates: readonly string[], ctx: LongformContext, seed: number, index: number): string {
  const chosen = pickMany(templates, seed, 3, index);
  return chosen.map((t) => fill(t, ctx)).join("\n\n");
}

function buildIntentSections(ctx: LongformContext, seed: number): ContentSection[] {
  const seo = getSeoService(ctx.serviceSlug);
  const basePhrases = [
    ctx.serviceName,
    ctx.serviceLower,
    ...(seo?.searchPhrases ?? []).slice(0, 12),
  ];
  const uniquePhrases = [...new Set(basePhrases)];

  const sections: ContentSection[] = [];
  let idx = 0;

  for (const phrase of uniquePhrases) {
    for (const suffix of SEARCH_INTENT_SUFFIXES) {
      if (sections.length >= MAX_INTENT_SECTIONS) break;
      const term = `${phrase}${suffix}`.trim();
      const query = `${term} in ${ctx.areaName} ${ctx.cityName}`.replace(/\s+/g, " ");

      const bodyTemplates = [
        `Homeowners typing "${query}" in {locality} usually want three things: fair pricing, verified materials, and installers who respect society timings in {area}. {serviceName} is not a commodity SKU—span width, floor height, fixing surface, and exposure in {zoneLabel} change the correct specification. We publish this section so search engines and residents connect natural language queries to one canonical service page for {area}, covering survey, supply, and warranty-backed fitting.`,
        `If your search was "${query}", you are looking for the same professional outcome as someone who typed the shorter "{serviceLower} {area}" phrase. Dealers, contractors, companies, and direct manufacturers all appear in results; compare written scope after site visit, not headline rates alone. In {locality}, SS304 components, UV-stable nets where needed, and documented spacing separate durable work from quick jobs that fail after one monsoon.`,
        `Common follow-up questions after searching "${query}" include timeline, society approval, and maintenance. Our {area} crew completes most standard residential units in one day once materials are ready. We coordinate with building managers in {zoneLabel} for harness rules and lift access. Post-install, you receive care steps for {serviceLower}—tension checks, net cleaning, or pulley lubrication depending on category—so performance stays stable through {city} weather cycles.`,
        `Price-sensitive searches like "${query}" should note what is included: anchors, edge treatment, corner returns, transport, GST, and warranty registration. Omitting any line makes comparisons misleading across {locality} vendors. Bulk apartment packages in {area} often reduce per-opening cost when production batches share the same cable grade and channel colour—popular in {zoneLabel} townships with uniform facade guidelines.`,
      ];

      sections.push({
        id: `intent-${slugify(term).slice(0, 40)}-${idx}`,
        heading: `${term} in ${ctx.areaName} — what to expect`,
        body: paragraphBlock(bodyTemplates, ctx, seed, idx),
        level: 3,
      });
      idx++;
    }
    if (sections.length >= MAX_INTENT_SECTIONS) break;
  }

  return sections;
}

function buildPropertySections(ctx: LongformContext, seed: number): ContentSection[] {
  return PROPERTY_SCENARIOS.map((scenario, i) => {
    const templates = [
      `For a ${scenario} in {locality}, {serviceLower} specification starts with measuring clear opening width, usable height, and fixing substrate. {zoneLabel} buildings often have ${scenario.includes("apartment") ? "slab extensions and MS railings" : "mixed brick and concrete edges"}—each needs appropriate anchors. We note daily use: drying clothes, children playing near rails, sports practice, or pigeon roosting. The recommended {category} system follows from these facts, not from a generic catalogue.`,
      `Installation access for ${scenario} projects in {area} may require harness work or interior ladder setups. Societies in {locality} frequently restrict exterior work hours; we schedule accordingly. Material finish should match facade rules—low-profile grills, neutral net colours, or ceiling-mounted hangers as applicable. After fitting, we walk through warranty terms and cleaning intervals specific to ${scenario} usage patterns common across {zoneLabel}.`,
      `Pricing for ${scenario} in {area} reflects labour access, quantity, and custom bends. Dealer quotes that ignore corner returns or openable sections often escalate after survey. Our itemised estimates for {locality} include hardware, edge sealing, and tension verification. Many {area} clients combine multiple openings in one visit to save repeat mobilisation—especially in ${scenario} layouts with two or three vulnerable edges.`,
    ];
    return {
      id: `property-${i}`,
      heading: `${ctx.serviceName} for ${scenario} in ${ctx.locality}`,
      body: paragraphBlock(templates, ctx, seed, i + 40),
      level: 3,
    };
  });
}

function buildLandmarkSections(ctx: LongformContext, seed: number): ContentSection[] {
  const zone = getAreaZoneForCity(ctx.citySlug, ctx.areaSlug);
  return zone.landmarks.map((landmark, i) => {
    const templates = [
      `Properties near ${landmark} and ${ctx.areaName} share {zoneLabel} exposure patterns—sun, dust, and monsoon rain affecting {serviceLower} longevity. Residents from this corridor book surveys for apartments, villas, and commercial fronts with similar facade constraints. We route installation crews across {locality} to batch nearby pin codes, reducing wait times for landmarks-adjacent towers and independent homes alike.`,
      `Search visibility for {serviceName} near ${landmark} connects to the same {area} service team: measurement, factory-spec materials, and documented installation. Whether you live one street from ${landmark} or deeper inside ${ctx.areaName}, scope and warranty are identical. Compare quotes on anchor type, steel or mesh grade, and included labour—not distance from ${landmark} alone.`,
      `High-rise clusters around ${landmark} often require society NOC copies and harness compliance. Our {locality} projects include specification sheets management committees expect. Post-install photos help {area} residents in neighbouring towers choose consistent {serviceLower} spacing and channel colours—especially in premium {zoneLabel} developments near ${landmark}.`,
    ];
    return {
      id: `landmark-${slugify(landmark)}`,
      heading: `${ctx.serviceName} near ${landmark} (${ctx.areaName})`,
      body: paragraphBlock(templates, ctx, seed, i + 60),
      level: 3,
    };
  });
}

function buildNearbySections(ctx: LongformContext, seed: number): ContentSection[] {
  const zoneId = getAreaZoneForCity(ctx.citySlug, ctx.areaSlug).id;
  const neighbours = getAreasForCity(ctx.citySlug).filter(
    (a) => a.zone === zoneId && a.slug !== ctx.areaSlug,
  );
  if (neighbours.length === 0) return [];

  const count = Math.min(14, neighbours.length);
  const picked: typeof neighbours = [];
  for (let i = 0; i < count; i++) {
    picked.push(neighbours[(seed + i * 13) % neighbours.length]!);
  }

  return picked.map((near, i) => {
    const nearLocality = `${near.name}, ${ctx.cityName}`;
    const templates = [
      `From ${ctx.areaName} we regularly serve ${near.name} on shared installation routes across {zoneLabel}. {serviceName} specifications remain consistent—same SS304 or UV materials, same survey process—whether your pin code is ${ctx.areaName} or ${near.name}. Residents comparing "${ctx.serviceLower} ${near.name}" with "${ctx.serviceLower} ${ctx.areaName}" receive the same SafeShield Solutions scope and warranty.`,
      `Travel time between ${ctx.areaName} and ${near.name} is short enough for same-week survey slots when batches align. Technicians familiar with {locality} floor plans often work in ${near.name} the same day. Mention both areas when booking if your society sits on the border—routing optimises crew deployment across ${nearLocality} and ${ctx.locality}.`,
      `Internal linking between area pages helps search engines understand coverage: ${near.name} and ${ctx.areaName} are both part of our {zoneLabel} network. If ${near.name} is closer to your workplace but you live in ${ctx.areaName}, installation still happens at your registered address with local team support and post-install service from the same {city} hub.`,
    ];
    return {
      id: `nearby-${near.slug}`,
      heading: `${ctx.serviceName} in ${near.name} (near ${ctx.areaName})`,
      body: paragraphBlock(templates, { ...ctx, locality: nearLocality, areaName: near.name }, seed, i + 90),
      level: 3,
    };
  });
}

function buildRelatedServiceSections(ctx: LongformContext, seed: number): ContentSection[] {
  const others = AREA_PAGE_SERVICES.filter((s) => s.slug !== ctx.serviceSlug);
  const count = Math.min(12, others.length);
  const sections: ContentSection[] = [];

  for (let i = 0; i < count; i++) {
    const svc = others[(seed + i * 17) % others.length]!;
    const svcLower = svc.name.toLowerCase();
    const templates = [
      `Many ${ctx.areaName} households bundle ${svcLower} with ${ctx.serviceLower} after a single survey visit in ${ctx.locality}. Both fall under home safety and convenience upgrades common in {zoneLabel} apartments—reducing repeated scaffold setup and society coordination. Factory-direct pricing across services avoids stacking dealer margins on each line item.`,
      `Search demand for ${svc.name} in ${ctx.areaName} mirrors ${ctx.serviceName}: installation, price, dealers, and contractors keywords map to one canonical URL per service slug. If your property needs ${svcLower} on terrace plus ${ctx.serviceLower} on balconies, we phase work with one project manager for ${ctx.locality}. Material storage and access planning are shared for efficiency.`,
      `Cross-service expertise helps when ${svcLower} interacts structurally with ${ctx.serviceLower}—for example net and grill combinations on the same balcony, or hangers installed after grill channels in ${ctx.areaName}. Our {zoneLabel} installers document load paths and spacing so systems do not conflict. Warranty and service calls stay with one contact for all work completed in ${ctx.locality}.`,
    ];
    sections.push({
      id: `related-${svc.slug}`,
      heading: `${svc.name} in ${ctx.locality} (related to ${ctx.serviceName})`,
      body: paragraphBlock(templates, ctx, seed, i + 120),
      level: 3,
    });
  }

  return sections;
}

function buildComparisonSections(ctx: LongformContext, seed: number): ContentSection[] {
  return COMPARISON_TOPICS.map((topic, i) => ({
    id: topic.id,
    heading: fill(topic.heading, ctx),
    body: paragraphBlock(topic.templates, ctx, seed, i + 150),
    level: 2,
  }));
}

function buildCaseStudySections(ctx: LongformContext, _seed: number): ContentSection[] {
  const zone = getAreaZoneForCity(ctx.citySlug, ctx.areaSlug);
  return CASE_STUDY_TEMPLATES.map((cs, i) => ({
    id: `case-${i}`,
    heading: `${ctx.serviceName} project example in ${ctx.areaName}`,
    body: fill(cs.body, ctx, { landmark: zone.landmarks[i % zone.landmarks.length] ?? ctx.areaName }),
    level: 3,
  }));
}

function buildSeasonalSection(ctx: LongformContext, seed: number): ContentSection {
  const templates = [
    `{zoneLabel} weather shapes how {serviceLower} performs in {locality}. Pre-monsoon surveys in {area} should confirm drain paths near balcony edges and net sag allowances before heavy rain. SS304 grills tolerate humidity but benefit from annual channel cleaning to remove dust mixed with rain residue. UV-treated nets need inspection after storms for border rope tension—especially on terrace spans exposed to wind driving from open ORR corridors near {area}.`,
    `Post-monsoon is peak booking season in {area} when families assess rust spots on old MS grills or pigeon nesting in uncapped ducts. Scheduling {serviceName} early avoids December year-end rush in {locality}. Summer heat expands metal channels slightly; professional tension checks in {zoneLabel} high-rises keep cable grids firm. Winter months suit extended sports net projects on terraces when rain disruption is minimal across {city}.`,
    `Festive seasons in {locality} often trigger society safety drives—bulk {serviceLower} installs before holidays. Plan four to six weeks ahead for tower-wide work in {area}. Hanger systems see higher laundry load after monsoon; pulley service prevents stuck lines when {zoneLabel} humidity swells rope fibres. Document maintenance dates on handover sheets so {area} residents know when to book free warranty inspections.`,
  ];
  return {
    id: "seasonal-guide",
    heading: `Seasonal guide for ${ctx.serviceName} in ${ctx.locality}`,
    body: paragraphBlock(templates, ctx, seed, 200),
    level: 2,
  };
}

function buildComplianceSection(ctx: LongformContext, seed: number): ContentSection {
  const templates = [
    `Apartment societies in {area} commonly require prior intimation before exterior fixing. We provide specification PDFs listing cable grade, spacing, and colour for {serviceLower} so {locality} committees can approve quickly. Harness certificates and worker ID are carried for high-rise jobs in {zoneLabel}. Noise-sensitive towers restrict drilling hours—typically mid-morning to early evening slots in {area}.`,
    `Fire and emergency access must stay clear: openable grill sections and net access panels are documented on handover for {locality} safety officers. Cantilever anchors are avoided on weak parapets—common inspection point in older {area} colonies. For heritage facades near {zoneLabel} commercial strips, low-profile fixing minimises visual impact while meeting fall-protection expectations.`,
    `GST invoices and warranty cards support {area} residents claiming society reimbursements where applicable. Bulk tower contracts include unit-wise serial numbers for traceability—useful when {locality} management audits exterior modifications. Our compliance pack reduces back-and-forth compared to unregistered contractors operating without documented materials in {city}.`,
  ];
  return {
    id: "compliance-society",
    heading: `Society compliance and documentation for ${ctx.serviceName} in ${ctx.areaName}`,
    body: paragraphBlock(templates, ctx, seed, 210),
    level: 2,
  };
}

function buildExtendedFaqs(ctx: LongformContext, seed: number): { question: string; answer: string }[] {
  const seo = getSeoService(ctx.serviceSlug);
  const phrases = [
    ctx.serviceName,
    ctx.serviceLower,
    ...(seo?.searchPhrases ?? []).slice(0, 8),
  ];
  const faqs: { question: string; answer: string }[] = [];
  let n = 0;

  for (const topic of FAQ_TOPICS) {
    for (const phrase of phrases) {
      if (faqs.length >= 55) break;
      const opener = pickVariant(FAQ_ANSWER_OPENERS, seed, n);
      const qVariants = [
        `How does ${phrase} handle ${topic} in ${ctx.areaName}?`,
        `What should I know about ${topic} when booking ${phrase} in ${ctx.locality}?`,
        `${phrase} in ${ctx.areaName}: ${topic}?`,
        `Is ${topic} covered for ${phrase} installations in ${ctx.locality}?`,
      ];
      const question = pickVariant(qVariants, seed, n);
      const answer = `${fill(opener, ctx)} ${ctx.serviceName} projects in ${ctx.locality} address ${topic} with documented scope before work starts. Technicians survey openings in ${ctx.areaName}, confirm ${ctx.category} materials suited to ${getAreaZoneForCity(ctx.citySlug, ctx.areaSlug).label} conditions, and explain warranty terms for ${topic}. Compare dealer quotes on the same checklist: anchor type, spacing, labour inclusion, GST, and post-install support. Bulk bookings in ${ctx.areaName} often standardise specifications across units so ${topic} is managed consistently for the entire tower. Call or WhatsApp to schedule a free site visit focused on ${topic} for your ${phrase} requirement in ${ctx.locality}.`;
      faqs.push({ question, answer });
      n++;
    }
    if (faqs.length >= 55) break;
  }

  const categoryFaqs = buildCategoryFaqs(ctx.category, {
    serviceName: ctx.serviceName,
    serviceLower: ctx.serviceLower,
    areaName: ctx.areaName,
    cityName: ctx.cityName,
    locality: ctx.locality,
    zoneLabel: getAreaZoneForCity(ctx.citySlug, ctx.areaSlug).label,
  });

  return [...categoryFaqs, ...faqs];
}

/** Long-form sections and FAQs targeting 20,000+ words per area×service page. */
export function buildAreaLongformExpansion(ctx: LongformContext): {
  sections: ContentSection[];
  faqs: { question: string; answer: string }[];
} {
  const seed = contentSeed(ctx.areaSlug, ctx.serviceSlug);

  const hubSection: ContentSection = {
    id: "longform-hub",
    heading: `Complete ${ctx.serviceName} guide for ${ctx.locality}`,
    body: [
      `This guide covers ${ctx.serviceName} in ${ctx.locality} in depth—pricing signals, materials, society rules, seasonal care, nearby areas, related services, and the search phrases ${ctx.areaName} residents actually type into Google. Whether you need installation, dealers, contractors, company contact, or price estimates in ${ctx.cityName}, one SafeShield Solutions team handles survey, supply, and warranty-backed fitting across ${getAreaZoneForCity(ctx.citySlug, ctx.areaSlug).label}.`,
      `Use the table of contents to jump to property-specific advice, landmark corridors near ${ctx.areaName}, comparison notes, and extended FAQs. Content is written for humans first: scannable headings, concrete checklists, and ${ctx.cityName}-specific context—not keyword stuffing. Every section ties back to measurable outcomes: correct specification, safe fixing, fair itemised quotes, and maintainable ${ctx.serviceLower} performance for years.`,
      `Internal links on this page connect to neighbouring localities and complementary services so you can plan whole-home safety upgrades in one schedule. For urgent child-safety openings in ${ctx.areaName}, mention priority when booking; for tower-wide projects, share society contact details during the survey request.`,
    ].join("\n\n"),
    level: 2,
  };

  const zone = getAreaZoneForCity(ctx.citySlug, ctx.areaSlug);
  const categorySections = buildCategorySeoSections(ctx.category, {
    serviceName: ctx.serviceName,
    serviceLower: ctx.serviceLower,
    areaName: ctx.areaName,
    cityName: ctx.cityName,
    locality: ctx.locality,
    zoneLabel: zone.label,
  });

  const sections: ContentSection[] = [
    hubSection,
    buildSeasonalSection(ctx, seed),
    buildComplianceSection(ctx, seed),
    {
      id: "category-hub",
      heading: `${ctx.serviceName} buying guide for ${ctx.locality}`,
      body: `Category-specific guidance for ${ctx.serviceLower} in ${ctx.areaName} — materials, pricing signals, and installation standards used across ${zone.label}. Sections below cover turf, screen, door, or general safety categories with local context for ${ctx.cityName}.`,
      level: 2,
    },
    ...categorySections,
    ...buildComparisonSections(ctx, seed),
    {
      id: "intent-hub",
      heading: `Popular ${ctx.serviceName} searches in ${ctx.areaName}`,
      body: `The following subsections explain what people mean when they search variant phrases for ${ctx.serviceLower} in ${ctx.locality}—installation, price, company, dealers, contractors, near me, cost, suppliers, manufacturers, best, premium, affordable, quote, quotation, repair, maintenance, booking, and warranty. All intents resolve to the same professional service: free survey, written quote, factory-spec materials, and trained installers.`,
      level: 2,
    },
    ...buildIntentSections(ctx, seed),
    {
      id: "property-hub",
      heading: `Property-specific ${ctx.serviceName} advice in ${ctx.locality}`,
      body: `Different homes in ${ctx.areaName} need different ${ctx.category} specifications. Review the property types below that match ${getAreaZoneForCity(ctx.citySlug, ctx.areaSlug).propertyTypes.join(", ")} and other common layouts in ${getAreaZoneForCity(ctx.citySlug, ctx.areaSlug).label}.`,
      level: 2,
    },
    ...buildPropertySections(ctx, seed),
    {
      id: "landmark-hub",
      heading: `${ctx.serviceName} coverage near ${ctx.areaName} landmarks`,
      body: `Landmark corridors help orient coverage; installers serving these routes also cover ${ctx.locality} pin codes.`,
      level: 2,
    },
    ...buildLandmarkSections(ctx, seed),
    {
      id: "nearby-hub",
      heading: `Nearby localities served from ${ctx.areaName}`,
      body: `If you are near the border of ${ctx.areaName}, these neighbouring areas share the same installation crews and pricing standards for ${ctx.serviceName} in ${ctx.cityName}.`,
      level: 2,
    },
    ...buildNearbySections(ctx, seed),
    {
      id: "related-hub",
      heading: `Related services in ${ctx.locality}`,
      body: `Homeowners in ${ctx.areaName} often combine ${ctx.serviceLower} with other SafeShield Solutions services during one survey visit.`,
      level: 2,
    },
    ...buildRelatedServiceSections(ctx, seed),
    {
      id: "case-hub",
      heading: `${ctx.serviceName} project examples in ${ctx.areaName}`,
      body: `Representative scenarios from ${getAreaZoneForCity(ctx.citySlug, ctx.areaSlug).label} illustrating scope, access, and society coordination—your home may match one or more patterns.`,
      level: 2,
    },
    ...buildCaseStudySections(ctx, seed),
  ];

  return {
    sections,
    faqs: buildExtendedFaqs(ctx, seed),
  };
}
