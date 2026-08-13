import type { ContentSection } from "@/lib/content";

export interface CategorySeoContext {
  serviceName: string;
  serviceLower: string;
  areaName: string;
  cityName: string;
  locality: string;
  zoneLabel: string;
}

/** Extra SEO sections by service category — turf, screens, doors, default. */
export function buildCategorySeoSections(
  category: string,
  ctx: CategorySeoContext,
): ContentSection[] {
  const { serviceName, serviceLower, areaName, locality, zoneLabel, cityName } = ctx;

  if (category === "Turf") {
    return [
      {
        id: "turf-spec",
        heading: `Cricket box grass specifications for ${locality}`,
        body: `Box cricket turf in ${areaName} must match playing style — shorter pile for quick bounce indoors, longer pile for outdoor academies in ${zoneLabel}. We specify infill (rubber/sand), shock pad, and seam welding for ${serviceLower} projects. Commercial box cricket grass near ${areaName} needs higher footfall ratings than residential terrace setups. Compare quotes on sq ft rate, base preparation, line marking, and warranty — not headline price alone.`,
        level: 2,
      },
      {
        id: "turf-indoor-outdoor",
        heading: `Indoor vs outdoor box cricket turf in ${cityName}`,
        body: `Indoor cricket turf near ${areaName} avoids UV grades but needs consistent bounce and drainage trays. Outdoor artificial grass for box cricket in ${locality} requires UV stabilisation for ${zoneLabel} sun and monsoon. Synthetic grass for box cricket installations should include edge anchoring and transition strips where turf meets concrete. Premium durable cricket turf grass lasts longer when infill is topped up annually.`,
        level: 2,
      },
      {
        id: "turf-pricing",
        heading: `${serviceName} price per sq ft in ${areaName}`,
        body: `"${serviceLower} price per sq ft" searches in ${locality} should list turf grade, infill type, labour, GST, and warranty. Dealers and contractors in ${areaName} sometimes omit base levelling or shock pad — compare itemised BOQs. Bulk commercial box cricket grass projects in ${cityName} reduce per-court cost when multiple lanes share the same material batch.`,
        level: 2,
      },
    ];
  }

  if (category === "Screens") {
    return [
      {
        id: "zip-weather",
        heading: `Weather protection zip screens in ${locality}`,
        body: `Zip screens and zip screen blinds in ${areaName} reduce rain ingress, block insects, and cut dust without closing the balcony completely. Wind-resistant zip screens need correct bottom bar weight and side track sealing — critical on upper floors in ${zoneLabel}. Transparent zip screens preserve views; mesh zip screens improve airflow. Waterproof outdoor zip screens suit patio and veranda openings in ${locality}.`,
        level: 2,
      },
      {
        id: "zip-motorized",
        heading: `Motorized and smart zip screens near ${areaName}`,
        body: `Motorized zip screens, automatic zip screens, and remote control zip screens add convenience for wide ${areaName} openings. Electric zip screens need motor torque matched to panel size — undersized motors fail in ${zoneLabel} wind. Smart home zip screens integrate with wall switches; automation service includes limit calibration. Compare motorized balcony screens on motor brand, warranty, and included programming.`,
        level: 2,
      },
      {
        id: "zip-pricing",
        heading: `${serviceName} cost per sq ft in ${areaName}`,
        body: `"${serviceLower} cost per sq ft" in ${locality} depends on mesh grade, track length, manual vs motorized drive, and fixing surface. Premium custom size zip screens cost more but fit irregular ${areaName} openings without visible gaps. Dealers and manufacturers in ${cityName} should specify included installation and edge sealing in writing.`,
        level: 2,
      },
    ];
  }

  if (category === "Doors") {
    return [
      {
        id: "mesh-door-types",
        heading: `Mesh door types for ${locality} homes`,
        body: `Mosquito mesh doors, insect mesh doors, and safety mesh doors serve different jobs in ${areaName} — fine weave for mosquitoes, stronger gauge for stair doors. Aluminium mesh doors and stainless steel mesh doors resist ${zoneLabel} humidity. Magnetic mesh doors suit pet-friendly ${locality} entrances. Pleated mesh doors fold compactly for main door mesh applications where space is tight.`,
        level: 2,
      },
      {
        id: "sliding-mesh",
        heading: `Sliding mesh doors and space-saving options in ${areaName}`,
        body: `Sliding mesh doors, sliding mosquito mesh doors, and double sliding mesh doors suit wide balcony openings in ${locality}. Smooth sliding tracks need level installation — uneven ${areaName} thresholds cause stuck panels. Patio sliding mesh doors and balcony sliding mesh doors often pair with zip screens for full opening protection. Repair service replaces mesh inserts without changing the full frame.`,
        level: 2,
      },
      {
        id: "mesh-door-pricing",
        heading: `${serviceName} price and dealers in ${areaName}`,
        body: `"${serviceLower} price" and "dealers near me" in ${locality} should compare frame material, mesh grade, single vs double door, and rust proof finishing. Premium custom size mesh doors fit non-standard heights common in older ${zoneLabel} buildings. Suppliers and manufacturers in ${cityName} must list GST and installation labour separately for fair comparison.`,
        level: 2,
      },
    ];
  }

  return [
    {
      id: "category-general",
      heading: `${serviceName} buying guide for ${locality}`,
      body: `Residents searching ${serviceLower} near ${areaName} want installation, price, dealers, and premium options in one place. ${zoneLabel} properties need materials suited to local climate — coastal salt, monsoon rain, or IT-corridor dust. We document scope before work so ${locality} customers compare quotes fairly across contractors and companies in ${cityName}.`,
      level: 2,
    },
  ];
}

export function buildCategoryFaqs(
  category: string,
  ctx: CategorySeoContext,
): { question: string; answer: string }[] {
  const { areaName, locality, cityName } = ctx;

  if (category === "Turf") {
    return [
      {
        question: `What is box cricket grass price per sq ft in ${areaName}?`,
        answer: `Box cricket turf and cricket box grass pricing in ${locality} depends on pile height, infill, base work, and indoor vs outdoor grade. We measure the court in ${areaName} and share an itemised quotation covering commercial or premium specifications.`,
      },
      {
        question: `Do you install indoor cricket turf in ${locality}?`,
        answer: `Yes. Indoor cricket turf and box cricket flooring for ${areaName} academies and societies are scoped separately from outdoor synthetic grass — bounce, drainage, and UV requirements differ.`,
      },
      {
        question: `Who are the best box cricket grass dealers near ${areaName}?`,
        answer: `Compare dealers and contractors in ${locality} on written scope: turf GSM, infill type, seam method, warranty, and included labour. SafeShield Solutions supplies and installs directly in ${cityName} without middleman markup.`,
      },
    ];
  }

  if (category === "Screens") {
    return [
      {
        question: `Are balcony zip screens wind resistant in ${areaName}?`,
        answer: `Wind-resistant zip screens in ${locality} need correct bottom bar weight, track sealing, and mesh tensile strength. We specify grades for ${areaName} floor height and exposure during free survey.`,
      },
      {
        question: `How much do motorized zip screens cost in ${locality}?`,
        answer: `Motorized zip screens price in ${areaName} includes motor, controls, tracks, mesh, and installation. Automation service and smart home integration are quoted separately when required.`,
      },
      {
        question: `Can I get transparent zip screens near ${areaName}?`,
        answer: `Yes. Transparent and mesh zip screens for ${locality} balconies preserve views while reducing rain and insect entry. Custom size panels are measured on site in ${areaName}.`,
      },
    ];
  }

  if (category === "Doors") {
    return [
      {
        question: `Do you repair sliding mesh doors in ${areaName}?`,
        answer: `We repair and replace mesh panels, rollers, and tracks on many aluminium sliding mesh doors in ${locality}. Send photos for a repair quotation before ordering new frames.`,
      },
      {
        question: `Which mesh doors are best for pets in ${locality}?`,
        answer: `Pet-friendly magnetic mesh doors and sturdy safety mesh doors suit ${areaName} homes with dogs or cats. We recommend mesh gauge and frame strength during survey in ${locality}.`,
      },
      {
        question: `What is the price of mosquito mesh doors in ${areaName}?`,
        answer: `Mosquito mesh door price in ${locality} varies by frame material (aluminium vs SS), size, and sliding vs hinged design. Itemised quotes after measurement in ${areaName} include installation and GST.`,
      },
    ];
  }

  return [];
}
