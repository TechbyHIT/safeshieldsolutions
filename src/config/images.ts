import { getPrimaryServicePhoto } from "./photo-catalog";

export interface ImageAsset {
  slug: string;
  src: string;
  alt: string;
  title: string;
  caption?: string;
  width: number;
  height: number;
  priority?: boolean;
  keywords: string[];
}

const base = (filename: string) => `/images/${filename}`;

export const imageCatalog: Record<string, ImageAsset> = {
  hero: {
    slug: "hero",
    src: base("hero.svg"),
    alt: "Professional invisible grill and safety net installation on a modern apartment balcony in Hyderabad",
    title: "Premium Invisible Grills & Safety Solutions",
    caption: "SS304 invisible grills with unobstructed views and child-safe balcony protection",
    width: 1200,
    height: 760,
    priority: true,
    keywords: ["invisible grills", "balcony safety", "apartment protection", "Hyderabad"],
  },
  "invisible-grills": {
    slug: "invisible-grills",
    src: base("invisible-grills.svg"),
    alt: "SS304 stainless steel invisible grills installed on apartment windows for child safety",
    title: "Invisible Grills Installation",
    width: 1200,
    height: 760,
    keywords: ["invisible grills", "SS304", "window grills", "child safety"],
  },
  "balcony-invisible-grills": {
    slug: "balcony-invisible-grills",
    src: base("balcony-invisible-grills.svg"),
    alt: "Balcony invisible grill installation with clear city skyline views in Hyderabad",
    title: "Balcony Invisible Grills",
    width: 1200,
    height: 760,
    keywords: ["balcony invisible grills", "balcony safety", "Hyderabad"],
  },
  "window-invisible-grills": {
    slug: "window-invisible-grills",
    src: base("window-invisible-grills.svg"),
    alt: "Window invisible grill system with horizontal SS304 cables for ventilation and security",
    title: "Window Invisible Grills",
    width: 1200,
    height: 760,
    keywords: ["window invisible grills", "window safety", "ventilation"],
  },
  "stainless-steel-invisible-grills": {
    slug: "stainless-steel-invisible-grills",
    src: base("stainless-steel-invisible-grills.svg"),
    alt: "Close-up of premium SS304 stainless steel invisible grill cables and mounting hardware",
    title: "Stainless Steel Invisible Grills",
    width: 1200,
    height: 760,
    keywords: ["SS304 invisible grills", "stainless steel grills", "rust proof"],
  },
  "child-safety-grills": {
    slug: "child-safety-grills",
    src: base("child-safety-grills.svg"),
    alt: "Child-safe invisible grill installation preventing falls from high-rise apartment balconies",
    title: "Child Safety Grills",
    width: 1200,
    height: 760,
    keywords: ["child safety grills", "balcony child safety", "fall protection"],
  },
  "safety-nets": {
    slug: "safety-nets",
    src: base("safety-nets.svg"),
    alt: "Heavy-duty balcony safety net installation for apartments and high-rise buildings",
    title: "Safety Nets",
    width: 1200,
    height: 760,
    keywords: ["safety nets", "balcony safety nets", "fall protection nets"],
  },
  "terrace-safety-nets": {
    slug: "terrace-safety-nets",
    src: base("terrace-safety-nets.svg"),
    alt: "Terrace safety net installation with UV-resistant nylon mesh for rooftop protection",
    title: "Terrace Safety Nets",
    width: 1200,
    height: 760,
    keywords: ["terrace safety nets", "rooftop safety", "UV resistant nets"],
  },
  "pigeon-safety-nets": {
    slug: "pigeon-safety-nets",
    src: base("pigeon-safety-nets.svg"),
    alt: "Pigeon safety net installed on building facade to prevent bird nesting and droppings",
    title: "Pigeon Safety Nets",
    width: 1200,
    height: 760,
    keywords: ["pigeon nets", "bird control nets", "pigeon protection"],
  },
  "construction-safety-nets": {
    slug: "construction-safety-nets",
    src: base("construction-safety-nets.svg"),
    alt: "Construction safety net system for building sites and worker fall protection",
    title: "Construction Safety Nets",
    width: 1200,
    height: 760,
    keywords: ["construction safety nets", "building site nets", "worker safety"],
  },
  "industrial-safety-nets": {
    slug: "industrial-safety-nets",
    src: base("industrial-safety-nets.svg"),
    alt: "Industrial safety net installation for warehouses and factory perimeters",
    title: "Industrial Safety Nets",
    width: 1200,
    height: 760,
    keywords: ["industrial safety nets", "factory safety", "warehouse nets"],
  },
  "bird-protection-nets": {
    slug: "bird-protection-nets",
    src: base("bird-protection-nets.svg"),
    alt: "Bird protection net covering open areas to prevent bird entry without harming wildlife",
    title: "Bird Protection Nets",
    width: 1200,
    height: 760,
    keywords: ["bird protection nets", "anti bird nets", "humane bird control"],
  },
  "mosquito-nets": {
    slug: "mosquito-nets",
    src: base("mosquito-nets.svg"),
    alt: "Frameless mosquito net installation on windows for insect-free ventilation",
    title: "Mosquito Nets",
    width: 1200,
    height: 760,
    keywords: ["mosquito nets", "window mosquito nets", "insect screens"],
  },
  "sliding-mosquito-nets": {
    slug: "sliding-mosquito-nets",
    src: base("sliding-mosquito-nets.svg"),
    alt: "Sliding mosquito net system for large balcony and door openings",
    title: "Sliding Mosquito Nets",
    width: 1200,
    height: 760,
    keywords: ["sliding mosquito nets", "balcony mosquito nets", "door nets"],
  },
  "openable-mosquito-nets": {
    slug: "openable-mosquito-nets",
    src: base("openable-mosquito-nets.svg"),
    alt: "Openable mosquito net with easy-access mechanism for cleaning and maintenance",
    title: "Openable Mosquito Nets",
    width: 1200,
    height: 760,
    keywords: ["openable mosquito nets", "removable mosquito nets"],
  },
  "cloth-hangers": {
    slug: "cloth-hangers",
    src: base("cloth-hangers.svg"),
    alt: "Ceiling-mounted cloth drying hanger system for apartments with space-saving design",
    title: "Cloth Hangers",
    width: 1200,
    height: 760,
    keywords: ["cloth hangers", "ceiling cloth hangers", "drying hangers"],
  },
  "ceiling-cloth-hangers": {
    slug: "ceiling-cloth-hangers",
    src: base("ceiling-cloth-hangers.svg"),
    alt: "Ceiling cloth hanger with pulley system for easy raising and lowering of laundry",
    title: "Ceiling Cloth Hangers",
    width: 1200,
    height: 760,
    keywords: ["ceiling cloth hangers", "pulley cloth hangers", "laundry drying"],
  },
  "balcony-cloth-hangers": {
    slug: "balcony-cloth-hangers",
    src: base("balcony-cloth-hangers.svg"),
    alt: "Balcony cloth drying hanger installed with rust-proof SS304 rods",
    title: "Balcony Cloth Hangers",
    width: 1200,
    height: 760,
    keywords: ["balcony cloth hangers", "balcony drying rack"],
  },
  "foldable-cloth-hangers": {
    slug: "foldable-cloth-hangers",
    src: base("foldable-cloth-hangers.svg"),
    alt: "Foldable wall-mounted cloth hanger that saves space when not in use",
    title: "Foldable Cloth Hangers",
    width: 1200,
    height: 760,
    keywords: ["foldable cloth hangers", "wall mounted hangers"],
  },
  "sports-nets": {
    slug: "sports-nets",
    src: base("sports-nets.svg"),
    alt: "Sports practice net installation for cricket and multi-sport training areas",
    title: "Sports Nets",
    width: 1200,
    height: 760,
    keywords: ["sports nets", "practice nets", "cricket nets"],
  },
  "cricket-nets": {
    slug: "cricket-nets",
    src: base("cricket-nets.svg"),
    alt: "Cricket practice net enclosure with durable knotless mesh for batting and bowling",
    title: "Cricket Nets",
    width: 1200,
    height: 760,
    keywords: ["cricket nets", "cricket practice nets", "batting nets"],
  },
  "cricket-box-grass": {
    slug: "cricket-box-grass",
    src: base("cricket-nets.svg"),
    alt: "Premium artificial cricket box grass and turf installation for box cricket courts",
    title: "Cricket Box Grass",
    width: 1200,
    height: 760,
    keywords: ["cricket box grass", "box cricket turf", "artificial grass for box cricket"],
  },
  "zip-screens": {
    slug: "zip-screens",
    src: base("mosquito-nets.svg"),
    alt: "Zip screens and zip screen blinds for balcony weather protection",
    title: "Zip Screens",
    width: 1200,
    height: 760,
    keywords: ["zip screens", "balcony zip screens", "outdoor zip screens"],
  },
  "motorized-zip-screens": {
    slug: "motorized-zip-screens",
    src: base("mosquito-nets.svg"),
    alt: "Motorized automatic zip screens with remote control for balconies and patios",
    title: "Motorized Zip Screens",
    width: 1200,
    height: 760,
    keywords: ["motorized zip screens", "automatic zip screens", "smart zip screens"],
  },
  "mesh-doors": {
    slug: "mesh-doors",
    src: base("mosquito-nets.svg"),
    alt: "Mosquito mesh doors and insect mesh door installation",
    title: "Mesh Doors",
    width: 1200,
    height: 760,
    keywords: ["mesh doors", "mosquito mesh doors", "insect mesh doors"],
  },
  "sliding-mesh-doors": {
    slug: "sliding-mesh-doors",
    src: base("sliding-mosquito-nets.svg"),
    alt: "Sliding mesh doors and mosquito sliding doors for wide openings",
    title: "Sliding Mesh Doors",
    width: 1200,
    height: 760,
    keywords: ["sliding mesh doors", "sliding mosquito mesh doors", "sliding screen doors"],
  },
  "apartment-safety-solutions": {
    slug: "apartment-safety-solutions",
    src: base("apartment-safety-solutions.svg"),
    alt: "Complete apartment safety solution combining invisible grills, safety nets and mosquito nets",
    title: "Apartment Safety Solutions",
    width: 1200,
    height: 760,
    keywords: ["apartment safety", "home protection", "high-rise safety"],
  },
  about: {
    slug: "about",
    src: base("about.svg"),
    alt: "SafeShield Solutions team providing professional home safety installations",
    title: "About SafeShield Solutions",
    width: 1200,
    height: 760,
    keywords: ["about us", "installation team", "safety experts"],
  },
  contact: {
    slug: "contact",
    src: base("contact.svg"),
    alt: "Contact SafeShield Solutions for free site survey and quotation",
    title: "Contact Us",
    width: 1200,
    height: 760,
    keywords: ["contact", "free survey", "quotation"],
  },
  cta: {
    slug: "cta",
    src: base("cta.svg"),
    alt: "Get a free quote for invisible grills and safety net installation today",
    title: "Get Free Quote",
    width: 1200,
    height: 760,
    keywords: ["free quote", "book installation", "call now"],
  },
  process: {
    slug: "process",
    src: base("process.svg"),
    alt: "Four-step installation process: survey, design, installation and warranty support",
    title: "Our Installation Process",
    width: 1200,
    height: 760,
    keywords: ["installation process", "site survey", "warranty"],
  },
  safety: {
    slug: "safety",
    src: base("safety.svg"),
    alt: "Safety standards and quality materials used in every SafeShield Solutions installation",
    title: "Safety Standards",
    width: 1200,
    height: 760,
    keywords: ["safety standards", "quality materials", "SS304"],
  },
  why: {
    slug: "why",
    src: base("why.svg"),
    alt: "Why choose SafeShield Solutions: 12+ years experience, 8500+ projects, 5-year warranty",
    title: "Why Choose SafeShield Solutions",
    width: 1200,
    height: 760,
    keywords: ["why choose us", "trusted installer", "warranty"],
  },
  testimonials: {
    slug: "testimonials",
    src: base("testimonials.svg"),
    alt: "Customer testimonials for invisible grill and safety net installations",
    title: "Customer Testimonials",
    width: 1200,
    height: 760,
    keywords: ["testimonials", "customer reviews", "ratings"],
  },
  gallery: {
    slug: "gallery",
    src: base("gallery.svg"),
    alt: "Gallery of completed invisible grill and safety net projects across Hyderabad and Chennai",
    title: "Project Gallery",
    width: 1200,
    height: 760,
    keywords: ["gallery", "completed projects", "before after"],
  },
};

for (let i = 1; i <= 8; i++) {
  const slug = `gallery-${i}`;
  imageCatalog[slug] = {
    slug,
    src: base(`${slug}.svg`),
    alt: `Completed ${slug.replace("-", " ")} project – invisible grills and safety nets installation`,
    title: `Project Gallery ${i}`,
    width: 1200,
    height: 760,
    keywords: ["gallery", "project photos", "installation work"],
  };
}

for (let i = 1; i <= 6; i++) {
  const slug = `client-${i}`;
  imageCatalog[slug] = {
    slug,
    src: base(`${slug}.svg`),
    alt: `Trusted client and partner logo ${i} – SafeShield Solutions`,
    title: `Client ${i}`,
    width: 400,
    height: 200,
    keywords: ["clients", "partners", "trusted brands"],
  };
}

export function getImage(slug: string): ImageAsset | undefined {
  return imageCatalog[slug];
}

export function getServiceImage(serviceSlug: string): ImageAsset {
  const photo = getPrimaryServicePhoto(serviceSlug);
  if (photo) {
    return {
      slug: serviceSlug,
      src: photo.src,
      alt: photo.alt,
      title: photo.title,
      width: 1200,
      height: 760,
      keywords: [serviceSlug],
    };
  }
  return imageCatalog[serviceSlug] ?? imageCatalog["invisible-grills"]!;
}
