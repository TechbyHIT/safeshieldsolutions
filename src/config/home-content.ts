import { routes } from "./routes";

export const heroBullets = [
  "Premium SS304 invisible grills, SS316 marine-grade options & UV-stable safety nets",
  "Cricket box grass, zip screens, mesh doors & 36 service lines",
  "Near-me pages for 1,991 neighbourhoods — installation, price, dealers, best",
  "Free site survey in Chennai, Hyderabad, Coimbatore & Kochi",
  "20,000+ word local guides on every area × service page",
];

export const homeHero = {
  eyebrow:
    "#1 for Invisible Grills & Safety Nets in Chennai, Hyderabad, Coimbatore & Kochi",
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
      "Frameless, sliding, and openable mosquito net systems for windows and balcony doors. Keeps insects out while preserving airflow across Chennai, Hyderabad, Coimbatore, and Kochi.",
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
    note: "Higher molybdenum content for Chennai, Kochi, and other salt-air or pool-facing openings. Recommended where corrosion risk is higher.",
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
      "Both. SS304 is our standard rust-resistant grade for most apartments and inland homes. SS316 is marine-grade steel with extra corrosion resistance for Chennai, Kochi, sea-facing, and pool-adjacent openings. The survey recommends the grade after we see the exposure.",
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
      "Open our Locations page, choose Chennai, Hyderabad, Coimbatore, or Kochi, then select your neighbourhood. Each area page covers near-me, installation, price, dealers, premium, and best intent searches with 20,000+ words of local guidance. Send a photo and pin code before booking.",
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
      "Browse city near-me hubs or search your locality on the homepage keyword sections. Premium SS304 and SS316 invisible grill pages explain cable spacing, channel finish, society compliance, and warranty for high-rises in Gachibowli, Peelamedu, Kakkanad, Adyar, and 1,900+ other areas.",
  },
  {
    question: "Who are the best pigeon net dealers near me in Coimbatore or Kochi?",
    answer:
      "Use locality pages like Gandhipuram, Saravanampatti, Edappally, or Vyttila with the dealers or near-me suffix. We operate as manufacturer-installer so quotes include factory-spec mesh, anchors, and fitting — compare written scope, not headline rates alone.",
  },
  {
    question: "Do you offer affordable safety nets with premium materials?",
    answer:
      "Yes. Affordable packages often combine multiple openings in one visit. Premium does not mean overpriced — it means SS304 as standard, SS316 for coastal or pool-facing openings, correct knotless GSM for bird nets, and documented installation.",
  },
  {
    question: "How many local pages does SafeShield Solutions publish?",
    answer:
      "Over 700,000 indexable URLs across 1,991 neighbourhoods and 36 core services, with high-intent variants like installation, price, near-me, dealers, best, and premium on every locality page.",
  },
  {
    question: "Can I book same-day invisible grill installation near me?",
    answer:
      "Same-day survey slots are available in many corridors when you share photos early. Installation typically follows within 24–48 hours after quote approval and material cut. Check your area page for local crew coverage and society timing rules.",
  },
];

export const serviceCities = [
  {
    slug: "chennai",
    name: "Chennai",
    summary:
      "Balcony nets, pigeon protection, invisible grills, and cloth hangers planned for Chennai homes and coastal exposure.",
    highlights: ["Balcony Nets", "Mosquito Nets", "Invisible Grills"],
  },
  {
    slug: "hyderabad",
    name: "Hyderabad",
    summary:
      "Measured balcony, bird-control, child-safety, invisible grill, and mosquito net fitting across Hyderabad service areas.",
    highlights: ["Invisible Grills", "Safety Nets", "Pigeon Nets"],
  },
  {
    slug: "coimbatore",
    name: "Coimbatore",
    summary:
      "Invisible grills and safety nets for Peelamedu IT corridor, Saibaba Colony, RS Puram, Singanallur, and Pollachi belt homes.",
    highlights: ["Invisible Grills", "Sports Nets", "Bird Nets"],
  },
  {
    slug: "kochi",
    name: "Kochi",
    summary:
      "Coastal-grade SS304 grills and UV nets for Kakkanad, Edappally, Vyttila, Fort Kochi, and Aluva apartments.",
    highlights: ["Safety Nets", "Pigeon Nets", "Cloth Hangers"],
  },
];
