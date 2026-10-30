import { routes } from "./routes";

export const homeHero = {
  brand: "SafeShield Solutions",
  eyebrow: "Raipur first · then served Chhattisgarh towns",
  title: "Invisible grills and safety nets in Raipur, fitted to the opening you actually use",
  description:
    "Balcony nets, pigeon protection, and slim cable grills for Raipur homes — then Bhilai, Durg, Bilaspur, and the other towns we serve. The plan follows the opening, the view, and how the space is used every day.",
};

export const heroBullets = [
  "SS304 invisible grills by default; SS316 only where corrosion risk is higher",
  "UV-stable balcony and pigeon nets measured to the railing and fix points",
  "Raipur localities first, then other served Chhattisgarh towns",
  "Free residential site survey where we serve",
  "Written quote after the opening is measured — not a statewide package rate",
];

/** Three fittings most Raipur homes start with — Sri Ganesha–style clarity, SafeShield voice. */
export const starterFittings = [
  {
    slug: "balcony-safety-nets",
    title: "Balcony Safety Nets",
    description:
      "Mesh from the balcony railing up to the slab, fitted to the shape of that balcony so children, pets, and daily use stay safer without closing the space.",
  },
  {
    slug: "pigeon-safety-nets",
    title: "Pigeon Nets",
    description:
      "A humane mesh barrier that stops pigeons nesting on balconies, ledges, and ducts — without poison, gel, or a solid wall look.",
  },
  {
    slug: "invisible-grills",
    title: "Invisible Grills",
    description:
      "Tensioned stainless cables for balconies and windows that keep the outlook open while closing the fall gap. Cable grade is named in the quote.",
  },
];

export const openingSteps = [
  {
    step: "01",
    title: "Show the space",
    description:
      "City or Raipur locality, a full photo of the opening, and closer photos of the top and side fixing surfaces.",
  },
  {
    step: "02",
    title: "Plan the fitting",
    description:
      "Size, grade, access, and what stays usable after the work — view, airflow, cleaning, or play.",
  },
  {
    step: "03",
    title: "Fit, check, hand over",
    description:
      "The line is installed, tension or mesh is checked, and you see how to clean or release an edge.",
  },
];

export const priceFactors = [
  {
    title: "Size",
    description: "Width, height, and the extra line around columns, pipes, AC units, and returns.",
  },
  {
    title: "Specification",
    description: "Mesh type, cable grade (SS304 or SS316), aperture, and colour agreed before cutting.",
  },
  {
    title: "Access",
    description: "Floor height, scaffolding, society hours, and how long the opening takes to reach.",
  },
  {
    title: "Included work",
    description: "Hooks, border finish, spikes on a ledge, or a drying line planned with the net.",
  },
];

export const materialGrades = [
  {
    grade: "SS304",
    title: "SS304 cable — everyday stainless",
    note: "Our default invisible-grill grade for most Raipur and inland Chhattisgarh apartments. Strong stainless that stays neat in everyday humidity. Named in the quote — not hidden behind “premium”.",
  },
  {
    grade: "SS316",
    title: "SS316 cable — higher corrosion resistance",
    note: "Considered for pool-facing or persistently damp openings. Better resistance where corrosion risk is higher. Not an automatic upsell on a dry inland balcony.",
  },
  {
    grade: "HDPE",
    title: "UV-stabilised HDPE mesh",
    note: "Balcony, terrace, duct, and bird mesh specified against Chhattisgarh sun. Aperture chosen for the job — fall protection and pigeon exclusion are not the same mesh by default.",
  },
  {
    grade: "Spikes",
    title: "Stainless bird spikes",
    note: "Parapets, ledges, and AC outdoor units. A deterrent, not a trap. Mechanical or adhesive fix to suit the surface — no poison or sticky gel where children play.",
  },
] as const;

export const whySafeShield = [
  {
    title: "Raipur first, then the state",
    body: "Citywide Raipur service pages and locality hubs come first. Bhilai, Durg, Bilaspur, and other served towns follow with their own pages — not a copied city-name swap.",
  },
  {
    title: "Measure before money",
    body: "Residential surveys in the towns we serve are free. The written quote follows the opening you have, not a package that pretends every balcony costs the same.",
  },
  {
    title: "Grades written down",
    body: "SS304, SS316, and mesh type are stated. Competitors often push SS316 as default or hide the grade behind marketing words. We name the metal.",
  },
  {
    title: "Climate treated honestly",
    body: "Most of Raipur and inland Chhattisgarh suit SS304. Pool splash and slow-drying sites can justify SS316. We say which one applies after the visit.",
  },
  {
    title: "Humane bird control",
    body: "Nets and spikes exclude birds. We do not quote poison or loose gels for family balconies.",
  },
  {
    title: "Five-year warranty on the work we fit",
    body: "Warranty length is stated on the quote for that job. Care after monsoon and what the system is not for are part of handover.",
  },
];

export const problemCategories = [
  {
    id: "view",
    title: "Keep the view open",
    description:
      "Compare slim invisible grills and lower-visibility nets for front-facing balconies, windows, and high-rise outlooks.",
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
      "A useful estimate accounts for measured opening, net or grill type, access, fixing surface, and finish — not one rate for every Raipur balcony.",
    links: [
      { label: "See price factors", href: "#estimate-factors" },
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
      "Best for families who want balcony safety without closing the view. We fit SS304 stainless-steel invisible grill cables with neat spacing, firm anchoring, and a clean finish — SS316 only where corrosion risk is higher.",
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
      "Frameless, sliding, and openable mosquito net systems for windows and balcony doors — a different system from fall-safety nets, and we say so clearly.",
  },
  {
    slug: "cricket-nets",
    tag: "Safer practice and ball control",
    title: "Cricket Practice Nets",
    description:
      "For terraces, coaching spaces, schools, and home practice areas. The netting helps contain balls, protect nearby surfaces, and create a safer setup for regular batting or bowling practice.",
  },
];

/** Homepage catalog cards. */
export const homeCatalogServices = [
  {
    slug: "invisible-grills",
    title: "Invisible Grills",
    description:
      "SS304 cable systems that protect balconies and windows while keeping daylight and a clear outward view. SS316 when the opening needs it.",
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
    slug: "pigeon-safety-nets",
    title: "Pigeon Safety Nets",
    description: "Full-opening mesh for balconies, ducts, and ledges where pigeons perch or nest.",
  },
  {
    slug: "child-safety-grills",
    title: "Child Safety Grills",
    description:
      "Closer-spaced cable layouts for openings where toddlers use balconies, windows, or stair edges.",
  },
  {
    slug: "bird-spikes",
    title: "Bird Spikes",
    description: "Narrow-ledge fittings that discourage perching without covering the whole opening.",
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
      "Slim vertical SS304 cables, with SS316 where corrosion risk is higher, for windows that need child safety without blocking ventilation.",
  },
  {
    slug: "terrace-safety-nets",
    title: "Terrace Safety Nets",
    description: "UV-resistant terrace nets for rooftop edges, utility areas, and open sit-out spaces.",
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
    description: "Pulley-based ceiling hangers that raise and lower smoothly without using floor space.",
  },
  {
    slug: "sports-nets",
    title: "Sports Nets",
    description: "Multi-sport practice nets for home terraces, academies, and school grounds.",
  },
  {
    slug: "construction-safety-nets",
    title: "Construction Safety Nets",
    description: "Building covering nets for construction, painting, and exterior repair work areas.",
  },
  {
    slug: "industrial-safety-nets",
    title: "Industrial Safety Nets",
    description: "Warehouse and factory perimeter nets for worker safety and debris containment.",
  },
];

export const designComparisons = [
  {
    title: "Balcony safety net",
    use: "Family, pet, and everyday fall-risk openings",
    look: "Visible square mesh with flexible edge fixing",
    material: "UV-stabilised HDPE or nylon mesh",
  },
  {
    title: "Pigeon or anti-bird net",
    use: "Balconies, ducts, shafts, ledges, and bird-entry gaps",
    look: "Fine full-opening mesh planned around entry points",
    material: "Fine HDPE bird mesh",
  },
  {
    title: "Mosquito net",
    use: "Windows and doors needing insect protection with airflow",
    look: "Fine mesh in frameless, sliding, or openable systems",
    material: "Fibreglass or stainless insect mesh",
  },
  {
    title: "Invisible grill",
    use: "Modern balconies and windows needing a clear view",
    look: "Slim vertical stainless-steel cables in fixed channels",
    material: "SS304 cable; SS316 where damp or splash is constant",
  },
];

export const installSteps = [
  {
    step: "01",
    title: "Call or write",
    description:
      "Share the city or Raipur locality, the opening, and whether the worry is a fall, birds, drying, or sport.",
  },
  {
    step: "02",
    title: "Free site measurement",
    description:
      "We check size, substrate, access, and who uses the space before recommending a system.",
  },
  {
    step: "03",
    title: "Written quote",
    description:
      "Materials, grades, and labour are listed. No statewide rate pretending to fit every balcony.",
  },
  {
    step: "04",
    title: "Installation",
    description:
      "The team fits to the measured line, including corners, pipes, and the finish you were shown.",
  },
  {
    step: "05",
    title: "Handover",
    description:
      "You see how tension, a removable edge, or a pulley should look, and what to check after monsoon.",
  },
];

export const homeFaqs = [
  {
    question: "Do you use SS304 or SS316 steel?",
    answer:
      "We use both. SS304 is our standard grade for most Raipur apartments because it resists rust in normal humidity. SS316 costs more and suits pool-facing or always-damp openings. We check the exposure during the site visit and name the grade in your written quote.",
  },
  {
    question: "Which safety solution fits a balcony?",
    answer:
      "It depends on the problem you want to solve. A balcony safety net suits fall risk for children and pets. A pigeon net closes the gaps where birds enter. An invisible grill suits homes that want a clear view. We confirm the choice after checking the opening and anchor points.",
  },
  {
    question: "How much does a balcony safety net cost in Raipur?",
    answer:
      "There is no single honest price for every balcony. The cost depends on the measured area, mesh or cable type, floor height, fixing surface, and edge finish. We measure first, then give a written quote that lists materials, labour, and warranty, so you can compare quotes fairly.",
  },
  {
    question: "Is the site visit free?",
    answer:
      "Yes. Residential site visits are free in the Raipur localities and Chhattisgarh towns we serve. We measure the opening, check the wall or slab, and recommend a system. The written quote comes after that visit, and you are under no obligation to book the work.",
  },
  {
    question: "Do you publish one price for all of Chhattisgarh?",
    answer:
      "No. One rate cannot cover different opening sizes, steel grades, floor heights, and access needs. A small window in Raipur and a high balcony in Korba are very different jobs. We measure each opening first and then write the price for that specific job.",
  },
  {
    question: "Will a safety net block airflow or the balcony view?",
    answer:
      "Most safety nets still let in daylight and air. How visible a net looks depends on strand thickness, colour, mesh size, and lighting. If the view matters most, slim invisible grills are less noticeable. We can show you both options during the site visit before you decide.",
  },
  {
    question: "Are pigeon nets and children safety nets the same?",
    answer:
      "No, they do different jobs. A pigeon net is chosen to keep birds out. A child safety net must take a fall load, so its mesh strength, fixing, and edges differ. Neither one replaces a sound railing or adult supervision. We assess each need separately on site.",
  },
  {
    question: "What should I send for a clear installation estimate?",
    answer:
      "Send one full photo of the opening and one close photo of the top and side walls. Add the rough width and height if you know them, plus your locality or town. Then tell us the main concern: children, pets, birds, keeping the view, or sports use.",
  },
  {
    question: "Where should I start if I live in Raipur?",
    answer:
      "Start with our Raipur pages for invisible grills, safety nets, or pigeon nets. Then open your locality page. Shankar Nagar, Telibandha, VIP Road, Naya Raipur, and the other listed areas each have a page that shows the services we measure and fit there.",
  },
  {
    question: "Do you cover only Raipur?",
    answer:
      "Raipur is our main service area, but not the only one. We also survey and fit in Bhilai, Durg, Bilaspur, and other Chhattisgarh towns that have their own pages. For a town without a page, we confirm travel and a visit slot before booking the day.",
  },
  {
    question: "What warranty do you give?",
    answer:
      "We give a five-year warranty on the work we install. The warranty terms are written on the quote for your specific job. At handover we also explain basic care, what to check after the monsoon, and what the system is not designed to do.",
  },
  {
    question: "How quickly can installation happen after a quote?",
    answer:
      "Survey timing depends on your town and the photos you send. Once you approve the quote, we cut the material and schedule the installation. Many apartment societies also set working hours, which can affect the date. We confirm the installation slot with you in advance.",
  },
];

export const serviceCities = [
  {
    slug: "chhattisgarh",
    name: "Chhattisgarh",
    summary:
      "Raipur is listed first — Naya Raipur, Shankar Nagar, Telibandha, and VIP Road — then Bhilai, Durg, Bilaspur, Korba, and every other served Chhattisgarh area.",
    highlights: ["Raipur", "Invisible Grills", "Safety Nets"],
  },
];
