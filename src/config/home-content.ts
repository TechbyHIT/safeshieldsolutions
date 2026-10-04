import { routes } from "./routes";

export const heroBullets = [
  "Premium SS304 invisible grills, SS316 marine-grade options & UV-stable safety nets",
  "Cricket box grass, zip screens, mesh doors & 36 service lines",
  "Near-me pages for 208 Chhattisgarh areas — Raipur first, then every other town",
  "Free site survey across Chhattisgarh — Raipur, Bhilai, Durg, Bilaspur & district towns",
  "20,000+ word local guides on every area × service page",
];

export const homeHero = {
  eyebrow:
    "#1 for Invisible Grills & Safety Nets in Chhattisgarh — Raipur, Bhilai, Durg, Bilaspur",
  title: "SafeShield Solutions – Premium Invisible Grills & Safety Nets",
  description:
    "Professional installation of invisible grills, safety nets, pigeon nets, mosquito nets, zip screens, mesh doors, cricket box grass, cloth hangers, and bird protection. We use SS304 stainless steel as standard and SS316 marine-grade cables for coastal or high-humidity openings.",
};

export const problemCategories = [
  {
    id: "view",
    title: "Keep the view open",
    description:
      "Compare slim invisible grills and low-visibility nets for front-facing balconies, windows, and high-rise views.",
    links: [
      { label: "Invisible Grills", href: routes.service("invisible-grills") },
      { label: "Balcony Invisible Grills", href: routes.service("balcony-invisible-grills") },
      { label: "Window Invisible Grills", href: routes.service("window-invisible-grills") },
    ],
  },
  {
    id: "children",
    title: "Protect children or pets",
    description:
      "Start with the opening and how it is used — balcony railing, staircase side, window, terrace edge, or pet corner.",
    links: [
      { label: "Child Safety Grills", href: routes.service("child-safety-grills") },
      { label: "Safety Nets", href: routes.service("safety-nets") },
      { label: "Terrace Safety Nets", href: routes.service("terrace-safety-nets") },
    ],
  },
  {
    id: "birds",
    title: "Stop birds returning",
    description:
      "Use full-opening nets for balconies and ducts, or targeted bird spikes for narrow ledges where birds perch.",
    links: [
      { label: "Pigeon Safety Nets", href: routes.service("pigeon-safety-nets") },
      { label: "Bird Spikes", href: routes.service("bird-spikes") },
      { label: "Bird Protection Nets", href: routes.service("bird-protection-nets") },
    ],
  },
  {
    id: "price",
    title: "Understand the price",
    description:
      "A useful estimate should account for measured opening, net or grill type, access, fixing surface, and finish.",
    links: [
      { label: "See price factors", href: "#price-guide" },
      { label: "Request an estimate", href: routes.contact },
    ],
  },
];

export const popularServices = [
  {
    slug: "safety-nets",
    tag: "Safer everyday balconies",
    title: "Balcony Safety Nets",
    description:
      "A practical choice when children, pets, or daily balcony use need safer edges. The net is measured to your railing and wall points so the balcony stays usable, airy, and easier to maintain.",
  },
  {
    slug: "pigeon-safety-nets",
    tag: "Cleaner bird-free openings",
    title: "Pigeon Safety Nets",
    description:
      "Useful for balconies, ledges, shafts, and window gaps where pigeons keep sitting or nesting. We close the open points neatly so cleaning becomes easier and the space feels usable again.",
  },
  {
    slug: "invisible-grills",
    tag: "Protection with a clear view",
    title: "Invisible Grills",
    description:
      "Best for families who want balcony safety without closing the view. We fit SS304 stainless-steel invisible grill cables with neat spacing, firm anchoring, and a clean finish for apartments and high-rise balconies.",
  },
  {
    slug: "child-safety-grills",
    tag: "An added family safety layer",
    title: "Children Safety Grills",
    description:
      "Planned for open balconies, windows, staircases, and terrace edges in homes with young children. The fitting focuses on firm support points, comfortable visibility, and day-to-day safety.",
  },
  {
    slug: "mosquito-nets",
    tag: "Insect-free ventilation",
    title: "Mosquito Nets",
    description:
      "Frameless, sliding, and openable mosquito net systems for windows and balcony doors across Raipur and the rest of Chhattisgarh.",
  },
  {
    slug: "cricket-nets",
    tag: "Safer practice and ball control",
    title: "Cricket Practice Nets",
    description:
      "For terraces, coaching spaces, schools, and home practice areas. The netting helps contain balls, protect nearby surfaces, and create a safer setup for regular batting or bowling practice.",
  },
];

/** Hiranaya-style 3×3 homepage catalog cards. */
export const homeCatalogServices = [
  {
    slug: "invisible-grills",
    title: "Invisible Grills",
    description:
      "SS304 and SS316 cable systems that protect balconies and windows while keeping daylight and a clear outward view.",
  },
  {
    slug: "balcony-invisible-grills",
    title: "Balcony Invisible Grills",
    description:
      "Measured cable layouts for front and side balcony returns, including corners and AC outdoor-unit cut-outs.",
  },
  {
    slug: "window-invisible-grills",
    title: "Window Invisible Grills",
    description:
      "Slim cable barriers for bedroom and hall windows where child safety matters without darkening the room.",
  },
  {
    slug: "invisible-grills",
    title: "Invisible Grills for Apartments",
    description:
      "High-rise balcony and window packages planned around society working hours and facade rules.",
  },
  {
    slug: "child-safety-grills",
    title: "Invisible Grills for Child Safety",
    description:
      "Closer-spaced cable layouts for openings where toddlers use balconies, windows, or stair edges.",
  },
  {
    slug: "invisible-grills",
    title: "Invisible Grill Installation",
    description:
      "Site measurement, written quotation, neat SS304 or SS316 fitting, and handover checks for apartments and villas.",
  },
  {
    slug: "safety-nets",
    title: "Safety Nets",
    description:
      "UV-stable mesh systems that add a protective plane across balcony, terrace, and utility openings.",
  },
  {
    slug: "balcony-safety-nets",
    title: "Balcony Safety Nets",
    description:
      "Fitted across balcony openings to reduce fall risk for family use while keeping the space airy and usable.",
  },
  {
    slug: "child-safety-nets",
    title: "Kids Safety Nets",
    description:
      "Closer-spaced mesh planned for toddler balconies and window openings, alongside adult supervision.",
  },
];

export const extendedServices = [
  {
    slug: "balcony-invisible-grills",
    title: "Balcony Invisible Grills",
    description:
      "Fixed and openable balcony cable systems measured to your railing, society rules, and view line.",
  },
  {
    slug: "window-invisible-grills",
    title: "Window Invisible Grills",
    description:
      "Slim vertical SS304 cables, with SS316 for coastal exposure, for windows that need child safety without blocking ventilation.",
  },
  {
    slug: "terrace-safety-nets",
    title: "Terrace Safety Nets",
    description:
      "UV-resistant terrace nets for rooftop edges, utility areas, and open sit-out spaces.",
  },
  {
    slug: "cloth-hangers",
    title: "Cloth Hangers",
    description:
      "Ceiling and balcony cloth hanger systems with pulleys and SS304 rods for space-saving laundry drying.",
  },
  {
    slug: "ceiling-cloth-hangers",
    title: "Ceiling Cloth Hangers",
    description:
      "Pulley-based ceiling hangers that raise and lower smoothly without using floor space.",
  },
  {
    slug: "sports-nets",
    title: "Sports Nets",
    description:
      "Multi-sport practice nets for home terraces, academies, and school grounds.",
  },
  {
    slug: "construction-safety-nets",
    title: "Construction Safety Nets",
    description:
      "Building covering nets for construction, painting, and exterior repair work areas.",
  },
  {
    slug: "industrial-safety-nets",
    title: "Industrial Safety Nets",
    description:
      "Warehouse and factory perimeter nets for worker safety and debris containment.",
  },
];

export const priceFactors = [
  {
    title: "Measured size and shape",
    description:
      "Width, height, corners, railing gaps, and separate openings affect the final quantity and fitting time.",
  },
  {
    title: "Purpose and material",
    description:
      "Child, pet, pigeon, transparent-net, and invisible-grill needs use different mesh grades, cable sizes, and spacing.",
  },
  {
    title: "Access and fixing surface",
    description:
      "Floor height, safe access, concrete, metal frames, cladding, and available anchor points change the work scope.",
  },
  {
    title: "Finish and aftercare",
    description:
      "Border rope, cable channels, removable access, colour, and written warranty terms should be itemised in every quote.",
  },
];

export const materialGrades = [
  {
    grade: "SS304",
    title: "SS304 quality — standard rust-resistant steel",
    note: "Our default invisible-grill and hardware grade for apartments and inland homes. Strong, food-grade stainless that stays neat in everyday humidity.",
  },
  {
    grade: "SS316",
    title: "SS316 quality — marine-grade for coastal homes",
    note: "Higher molybdenum content for salt-air or pool-facing openings. Recommended where corrosion risk is higher.",
  },
] as const;

export const designComparisons = [
  {
    title: "Balcony safety net",
    use: "Family, pet, and everyday fall-risk openings",
    look: "Visible square mesh with flexible edge fixing",
  },
  {
    title: "Pigeon or anti-bird net",
    use: "Balconies, ducts, shafts, ledges, and bird-entry gaps",
    look: "Fine full-opening mesh planned around entry points",
  },
  {
    title: "Mosquito net",
    use: "Windows and doors needing insect protection with airflow",
    look: "Fine mesh in frameless, sliding, or openable systems",
  },
  {
    title: "Invisible grill",
    use: "Modern balconies and windows needing a clear view",
    look: "Slim vertical SS304 or SS316 stainless-steel cables in fixed channels",
  },
];

export const installSteps = [
  {
    step: "01",
    title: "Share the opening",
    description:
      "Send a clear photo, your city, and what you need to protect — children, pets, birds, or view-safe safety.",
  },
  {
    step: "02",
    title: "Measure and check",
    description:
      "We confirm dimensions, access, fixing points, society rules, and how the space is used every day.",
  },
  {
    step: "03",
    title: "Compare the estimate",
    description:
      "Review the material specification, fitting scope, price unit, included installation, and warranty terms.",
  },
  {
    step: "04",
    title: "Install and inspect",
    description:
      "Fit the chosen option, check edges and tension, and review basic care instructions at handover.",
  },
];

export const homeFaqs = [
  {
    question: "Do you use SS304 or SS316 steel?",
    answer:
      "Both. SS304 is the standard rust-resistant grade for most apartments. SS316 is marine-grade steel for sea-facing and pool-adjacent openings. The survey recommends the grade after the exposure is checked.",
  },
  {
    question: "Which safety solution is best for a balcony?",
    answer:
      "The best choice depends on the job. A balcony or child-safety net suits fall-risk openings, a pigeon net closes bird-entry gaps, and an invisible grill suits homes where a clear view is the priority. The opening and anchor points still need to be checked before fitting.",
  },
  {
    question: "How much does a balcony safety net cost?",
    answer:
      "The final price depends on measured area, material or cable type, mesh specification, access, fixing surface, border finish, minimum job charge, and warranty terms. Ask for the price unit and included installation work in writing so quotes can be compared fairly.",
  },
  {
    question: "How do I find safety nets near me?",
    answer:
      "Open Raipur first, or pick another Chhattisgarh town. Each area page covers near-me, installation, price, and dealers. Send a photo and pin code before booking.",
  },
  {
    question: "Will a safety net block airflow or the balcony view?",
    answer:
      "Most mesh still allows daylight and airflow, but visibility changes with strand thickness, colour, mesh size, distance, and lighting. Transparent nets and slim invisible grills reduce visual weight when the view is especially important.",
  },
  {
    question: "Are pigeon nets and children safety nets the same?",
    answer:
      "No. Bird-control and fall-risk needs should be assessed separately because mesh, strength, fixing, edge treatment, and expected loads can differ. A net is an added protective layer and does not replace a sound railing or adult supervision.",
  },
  {
    question: "What should I send for a clear installation estimate?",
    answer:
      "Send a full photo of the opening, one closer photo of the top and side fixing surfaces, approximate width and height if known, your city or neighbourhood, and whether the priority is children, pets, birds, visibility, or sports use.",
  },
  {
    question: "Where can I find premium invisible grills near me?",
    answer:
      "Open the Chhattisgarh locations page and start with Raipur, Naya Raipur, Shankar Nagar, or another town. Each area page covers installation, price, and dealers.",
  },
  {
    question: "Who are the best pigeon net dealers near me in Raipur?",
    answer:
      "Start with the Raipur, Naya Raipur, Shankar Nagar, and Telibandha pages, including the dealers and near-me versions. Quotes include mesh, anchors, and fitting — compare the written scope.",
  },
  {
    question: "Do you offer affordable safety nets with premium materials?",
    answer:
      "Yes. Affordable packages often combine multiple openings in one visit. Premium does not mean overpriced — it means SS304 as standard, SS316 for coastal or pool-facing openings, correct knotless GSM for bird nets, and documented installation.",
  },
  {
    question: "How many local pages does SafeShield Solutions publish?",
    answer:
      "Chhattisgarh only: 208 areas and 36 services. Raipur locality pages are listed first in the sitemap, then every other area in the state, including installation, price, near-me, and dealer versions.",
  },
  {
    question: "Can I book same-day invisible grill installation near me?",
    answer:
      "Same-day survey slots are available in many corridors when you share photos early. Installation typically follows within 24–48 hours after quote approval and material cut. Check your area page for local crew coverage and society timing rules.",
  },
];

export const serviceCities = [
  {
    slug: "chhattisgarh",
    name: "Chhattisgarh",
    summary:
      "Raipur is listed first — Naya Raipur, Shankar Nagar, Telibandha, and VIP Road — then Bhilai, Durg, Bilaspur, Korba, and every other Chhattisgarh area.",
    highlights: ["Raipur", "Invisible Grills", "Safety Nets"],
  },
];
