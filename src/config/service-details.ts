export interface ServiceDetail {
  overview: string;
  issuesSolved: string[];
  whereWorksBest: string[];
  materials: string[];
  priceFactors: string[];
  installSteps: { title: string; description: string }[];
  maintenance: string;
  extraSections: { heading: string; body: string }[];
  extraFaqs: { question: string; answer: string }[];
  priceGuide?: string;
}

const defaultInstallSteps = [
  {
    title: "Site survey and measurement",
    description:
      "We measure the complete opening, check fixing surfaces, and note access, society rules, and daily use patterns.",
  },
  {
    title: "Specification and quotation",
    description:
      "You receive a written scope covering material grade, mesh or cable size, anchors, included labour, and warranty terms.",
  },
  {
    title: "Professional installation",
    description:
      "Trained technicians fit the system with correct edge treatment, tension, and a clean finish aligned to the opening.",
  },
  {
    title: "Inspection and handover",
    description:
      "We check edges, locks, and tension together, then share basic care instructions and warranty registration details.",
  },
];

export const serviceDetails: Record<string, ServiceDetail> = {
  "invisible-grills": {
    overview:
      "Invisible grills use slim SS304 stainless-steel cables in fixed or openable channels to add fall protection for balconies, windows, and high-rise openings while preserving the view. The right specification depends on measured span, cable grade, spacing, anchor strength, and exposure to sun and rain.",
    issuesSolved: [
      "Open balcony or window edges used by children or pets",
      "Need for safety without blocking city or garden views",
      "Replacing bulky traditional grills in modern apartments",
      "High-rise towers where railing height alone is not enough",
    ],
    whereWorksBest: [
      "Apartment balconies and extended sit-outs",
      "Sliding and casement windows in high-rise buildings",
      "Staircase sides and utility openings",
      "Gated communities needing a consistent facade finish",
    ],
    materials: [
      "SS304 or SS316 marine-grade stainless steel cables",
      "Nylon-coated options for coastal and humid conditions",
      "Aluminium or SS base channels with corrosion-resistant anchors",
      "Spacing planned for child safety and local wind exposure",
    ],
    priceFactors: [
      "Total measured area in square feet",
      "Bare cable diameter (2mm, 2.5mm, 3mm) and verified steel grade",
      "Cable spacing, corner returns, and channel material",
      "Fixed vs openable sections and irregular opening shapes",
      "Floor height, exterior access, and minimum job charge",
    ],
    installSteps: [
      {
        title: "Channel or anchor installation",
        description:
          "Base channels or anchor points are fixed to sound structural edges after confirming wall or railing condition.",
      },
      {
        title: "Cable threading and tensioning",
        description:
          "Cables are threaded, locked at corners, and tensioned evenly so the grid stays firm without visible sag.",
      },
      {
        title: "Finish alignment and inspection",
        description:
          "Spacing, view line, and edge covers are checked before handover. Openable sections are tested for smooth operation.",
      },
    ],
    maintenance:
      "Periodic cable tension checks, cleaning of base channels, and inspection of corner locks keep invisible grills neat with low routine upkeep. When stainless grade and coating are chosen correctly for your exposure, the system stays stable for years.",
    extraSections: [
      {
        heading: "Types of invisible grill designs",
        body: "Fixed-frame systems suit standard balcony rails and window openings. Openable sections help where cleaning or emergency access is needed. L-shaped balconies, extended sit-outs, and full-glass windows need site-specific planning rather than a one-size package.",
      },
      {
        heading: "What to check before choosing invisible grills",
        body: "Confirm the fixing surface, society facade rules, cable specification in writing, included installation scope, spacing for your use case, and warranty terms. Two quotes with the same per-sq-ft rate may include very different materials and finishing work.",
      },
    ],
    extraFaqs: [
      {
        question: "What is the invisible grill price per sq ft?",
        answer:
          "For standard balcony and window openings in Hyderabad and Chennai, installed invisible grills generally fall around ₹130–180 per sq ft depending on cable grade, spacing, channel type, access, and total area. Irregular openings and premium specifications need a site quotation.",
      },
      {
        question: "Do invisible grills block the view?",
        answer:
          "Slim vertical cables preserve most of the view compared to traditional grills. Visibility depends on cable diameter, spacing, lighting, and viewing distance. We plan spacing to balance safety with the clearest practical view line.",
      },
    ],
    priceGuide:
      "Budget around ₹130–180/sq ft for standard SS304 balcony and window systems. Premium 2.5mm–3mm cables, closer spacing, openable frames, and difficult high-floor access are quoted separately after measurement.",
  },
  "safety-nets": {
    overview:
      "Balcony safety nets add a practical protective layer for everyday fall-risk openings while keeping daylight, airflow, and usability. They are measured to railing and wall fixing points rather than sold as generic roll sizes.",
    issuesSolved: [
      "Children playing near balcony rails",
      "Pets leaning on open edges",
      "Temporary safety before permanent grill installation",
      "Older railings with wider gaps than current standards",
    ],
    whereWorksBest: [
      "Residential balconies and terrace edges",
      "Duplex internal openings with rail gaps",
      "School and office staircases with open sides",
      "Utility balconies used daily for drying or storage",
    ],
    materials: [
      "UV-stabilised nylon or HDPE mesh for outdoor exposure",
      "Border rope and stainless eyelets for edge strength",
      "Anchor selection based on concrete, MS railing, or cladding",
      "Mesh size chosen for fall-risk vs visibility needs",
    ],
    priceFactors: [
      "Measured width and height of each opening",
      "Mesh type, thickness, and colour",
      "Number of corners and separate panels",
      "Access difficulty and fixing surface condition",
      "Border finish and warranty coverage",
    ],
    installSteps: defaultInstallSteps,
    maintenance:
      "Occasional washing with mild soap and water, checking border tension after heavy wind, and inspecting anchors once a year keeps safety nets reliable. Replace nets that show fraying or UV brittleness.",
    extraSections: [
      {
        heading: "Balcony safety net vs invisible grill",
        body: "Safety nets suit flexible edge fixing and quick protective layers. Invisible grills suit owners who want a permanent, low-visual cable system. Many homes compare both before deciding based on view, budget, and society rules.",
      },
    ],
    extraFaqs: [
      {
        question: "How strong are balcony safety nets?",
        answer:
          "Residential safety nets use knotless mesh with reinforced borders designed for everyday fall-risk reduction. Final strength depends on mesh grade, border rope, and anchor quality — all confirmed during site survey.",
      },
    ],
  },
  "pigeon-safety-nets": {
    overview:
      "Pigeon safety nets close the open points where birds enter, nest, and create mess on balconies, ducts, shafts, and window gaps. The fitting is planned around bird entry paths rather than only the visible floor area.",
    issuesSolved: [
      "Pigeons nesting on balcony rails",
      "Bird droppings on windows and AC ledges",
      "Duct and shaft entry points in apartments",
      "Recurring cleaning costs from bird activity",
    ],
    whereWorksBest: [
      "Apartment balconies and service ducts",
      "Window gaps and AC compressor ledges",
      "Terrace parapet tops and open shafts",
      "Commercial building facade gaps",
    ],
    materials: [
      "Fine mesh sizes to block pigeons without heavy visual weight",
      "UV-resistant nylon for long outdoor life",
      "Stainless fixtures for coastal Chennai properties",
      "Removable access panels where maintenance is needed",
    ],
    priceFactors: [
      "Total enclosed area and number of entry points",
      "Mesh grade and colour",
      "Duct or irregular shapes requiring extra labour",
      "Height access and scaffolding needs",
    ],
    installSteps: defaultInstallSteps,
    maintenance:
      "Light cleaning to remove dust and cobwebs, plus inspection of corners where birds may peck, keeps pigeon nets effective. Any loose edge should be tightened promptly.",
    extraSections: [
      {
        heading: "Pigeon nets vs bird spikes",
        body: "Full-opening nets suit balconies and ducts. Bird spikes suit narrow ledges where birds perch but do not nest inside large openings. Many buildings use both on different areas.",
      },
    ],
    extraFaqs: [
      {
        question: "Are pigeon nets humane?",
        answer:
          "Yes. Pigeon nets block entry without harming birds. They are a standard building hygiene and maintenance solution used across residential and commercial properties.",
      },
    ],
  },
  "mosquito-nets": {
    overview:
      "Mosquito nets keep insects out while preserving ventilation and daylight. Frameless, sliding, and openable systems are measured to each window or door opening for smooth daily use.",
    issuesSolved: [
      "Mosquitoes entering through open windows",
      "Need for airflow without insect screens blocking the view",
      "Hard-to-fit sliding doors and large balcony openings",
      "Cleaning and maintenance of older fixed screens",
    ],
    whereWorksBest: [
      "Bedroom and living room windows",
      "Balcony sliding doors",
      "Kitchen utility windows",
      "Villa casement and French windows",
    ],
    materials: [
      "Fiberglass or polyester mesh with clear visibility",
      "Aluminium frames with powder coating",
      "Magnetic or zipper access for openable panels",
      "SS304 hardware for humid coastal zones",
    ],
    priceFactors: [
      "Opening width, height, and frame type",
      "Fixed, sliding, or openable mechanism",
      "Number of panels and mesh quality",
      "Colour and custom sizing",
    ],
    installSteps: defaultInstallSteps,
    maintenance:
      "Wipe frames and wash mesh gently to remove dust. Check rollers and magnets on sliding or openable systems every few months.",
    extraSections: [
      {
        heading: "Which mosquito net type fits your opening?",
        body: "Frameless nets suit standard windows. Sliding systems suit balcony doors. Openable panels help where AC units or frequent cleaning access is needed. We recommend the type after measuring daily use.",
      },
    ],
    extraFaqs: [
      {
        question: "Do mosquito nets reduce airflow?",
        answer:
          "Fine mesh blocks insects while allowing most natural airflow. Openable and sliding designs let you adjust ventilation when needed.",
      },
    ],
  },
  "cloth-hangers": {
    overview:
      "Ceiling and balcony cloth hanger systems free floor space and simplify daily drying. Pulley-based SS304 rods and brackets are fitted for smooth raising and lowering.",
    issuesSolved: [
      "Limited balcony floor space for drying",
      "Need for sturdy rods that handle full laundry loads",
      "Rust on older hangers in humid weather",
      "Low ceiling clearance in utility areas",
    ],
    whereWorksBest: [
      "Apartment balconies and utility areas",
      "Bathrooms and dry balconies with ceiling height",
      "Villa outdoor drying spaces",
      "Gated community flats with uniform fittings",
    ],
    materials: [
      "SS304 rods and pulleys for corrosion resistance",
      "Nylon or SS cables rated for daily load",
      "Ceiling anchors matched to slab or beam structure",
      "Optional wall-mounted foldable variants",
    ],
    priceFactors: [
      "Number of rods and total span",
      "Ceiling height and anchor accessibility",
      "Pulley quality and load rating",
      "Custom colour or multi-line setups",
    ],
    installSteps: defaultInstallSteps,
    maintenance:
      "Occasional pulley lubrication and checking anchor points keeps cloth hangers smooth. Wipe rods to prevent dust buildup on cables.",
    extraSections: [
      {
        heading: "Ceiling vs balcony cloth hangers",
        body: "Ceiling pulley systems suit covered utility areas. Balcony-mounted rods suit open drying with stronger wind exposure. Foldable wall units help where ceiling fixing is limited.",
      },
    ],
    extraFaqs: [
      {
        question: "How much weight can cloth hangers hold?",
        answer:
          "Standard residential systems handle a full daily laundry load when correctly anchored. We confirm slab condition and recommend rod count during survey.",
      },
    ],
  },
  "cricket-nets": {
    overview:
      "Cricket practice nets contain balls, protect nearby property, and create safer training spaces on terraces, in schools, and at coaching centres. Net height, mesh strength, and pole fixing are planned for your practice type.",
    issuesSolved: [
      "Balls breaking windows or hitting neighbours",
      "Need for home terrace practice without travel",
      "School and academy safety requirements",
      "Multi-lane coaching setups",
    ],
    whereWorksBest: [
      "Home terraces and backyards",
      "School and college grounds",
      "Sports academies and clubs",
      "Commercial rooftop practice areas",
    ],
    materials: [
      "Knotless HDPE mesh in heavy-duty gauges",
      "Galvanised or SS poles and tension cables",
      "UV-stabilised nets for outdoor year-round use",
      "Optional divider nets for multi-bay lanes",
    ],
    priceFactors: [
      "Lane length, width, and height",
      "Mesh gauge and pole structure",
      "Ground or terrace fixing method",
      "Number of practice bays",
    ],
    installSteps: defaultInstallSteps,
    maintenance:
      "Inspect mesh for cuts after heavy use, tighten tension cables seasonally, and check pole bases for rust or loosening.",
    extraSections: [
      {
        heading: "Home vs academy cricket nets",
        body: "Home terraces use compact lanes with lighter poles where possible. Academies need heavier mesh, taller poles, and multi-lane dividers. We scope each project separately.",
      },
    ],
    extraFaqs: [
      {
        question: "Can cricket nets be installed on a terrace?",
        answer:
          "Yes, when structural fixing points and height clearance allow. We check wind exposure, slab strength, and neighbour boundaries during survey.",
      },
    ],
  },
  "cricket-box-grass": {
    overview:
      "Cricket box grass and artificial turf systems create durable playing surfaces for box cricket courts, academies, rooftops, and commercial sports venues. We supply and install premium synthetic grass with correct pile height, infill, and edge finishing for indoor and outdoor use.",
    issuesSolved: [
      "Worn or muddy natural turf on box cricket pitches",
      "Need for all-weather playable surfaces",
      "Indoor box cricket flooring requirements",
      "Commercial box cricket turf with heavy footfall",
    ],
    whereWorksBest: [
      "Box cricket arenas and sports complexes",
      "School and college cricket grounds",
      "Rooftop and terrace box cricket setups",
      "Residential society sports courts",
    ],
    materials: [
      "UV-stabilised synthetic grass with cricket-spec pile height",
      "Rubber or sand infill systems for bounce and grip",
      "Shock-pad underlay where required",
      "Commercial-grade edge binding and line marking",
    ],
    priceFactors: [
      "Court length, width, and total sq ft",
      "Grass pile height and fibre density",
      "Indoor vs outdoor exposure grade",
      "Base preparation, infill type, and line marking",
    ],
    installSteps: defaultInstallSteps,
    maintenance:
      "Brush turf periodically, top up infill as needed, and inspect seams and edges after monsoon or heavy use.",
    extraSections: [
      {
        heading: "Indoor vs outdoor box cricket turf",
        body: "Indoor courts prioritise consistent bounce and lower UV grades. Outdoor turf needs stronger UV stabilisation and drainage planning. We specify pile height and infill for your playing style.",
      },
    ],
    extraFaqs: [
      {
        question: "What is cricket box grass price per sq ft?",
        answer:
          "Price depends on turf grade, infill system, base work, and court size. We provide itemised quotations after site measurement — compare on sq ft rate, included preparation, and warranty.",
      },
    ],
    priceGuide:
      "Box cricket turf typically ranges by grade and base work — request a measured quote for commercial, premium, and durable specifications.",
  },
  "zip-screens": {
    overview:
      "Zip screens and zip screen blinds add weather protection, insect control, and privacy for balconies, patios, and verandas while preserving ventilation. Manual systems use track-guided mesh fabric that seals at the edges when closed.",
    issuesSolved: [
      "Sun, rain, and dust on open balconies",
      "Insects entering through large openings",
      "Need for transparent weather protection without blocking views",
      "Wind exposure on high-rise outdoor sit-outs",
    ],
    whereWorksBest: [
      "Balcony and patio openings",
      "Veranda and pergola sides",
      "Restaurant and cafe outdoor sections",
      "Premium apartments needing wind-resistant shading",
    ],
    materials: [
      "PVC-coated or fibreglass mesh in transparent and sunscreen grades",
      "Aluminium side tracks and bottom weight bars",
      "Wind-resistant zip closure systems",
      "Custom sizes for irregular openings",
    ],
    priceFactors: [
      "Opening width, height, and shape",
      "Mesh type — transparent, sunscreen, or insect mesh",
      "Manual vs prepared motorized track",
      "Number of panels and fixing surface",
    ],
    installSteps: defaultInstallSteps,
    maintenance:
      "Clean mesh with mild soap, inspect zip tracks seasonally, and lubricate moving parts per manufacturer guidance.",
    extraSections: [
      {
        heading: "Balcony vs patio zip screens",
        body: "Balcony systems prioritise wind resistance and society aesthetics. Patio installations may span wider openings with heavier bottom bars. We measure on site before production.",
      },
    ],
    extraFaqs: [
      {
        question: "Are zip screens waterproof and wind resistant?",
        answer:
          "Quality zip screens reduce rain ingress and block most wind-blown dust when fully closed. Specification depends on mesh grade, track sealing, and exposure — we recommend grades for your floor height and orientation.",
      },
    ],
  },
  "motorized-zip-screens": {
    overview:
      "Motorized zip screens automate balcony and patio shading with remote control, smart-home integration, or wall switches. Electric motors drive the same track-guided mesh used in manual systems for premium convenience.",
    issuesSolved: [
      "Hard-to-reach large balcony openings",
      "Desire for one-touch weather protection",
      "Smart home automation for outdoor living spaces",
      "Commercial venues needing quick enclosure",
    ],
    whereWorksBest: [
      "Premium apartments and penthouses",
      "Motorized balcony and patio enclosures",
      "Hotels, cafes, and outdoor dining areas",
      "Smart home projects with automation hubs",
    ],
    materials: [
      "Somfy or equivalent tubular motors with overload protection",
      "Remote, wall switch, or smart-home control options",
      "Heavy-duty side tracks for motorized tension",
      "Weatherproof motor housings for outdoor exposure",
    ],
    priceFactors: [
      "Motor brand and torque rating",
      "Opening size and panel count",
      "Control type — remote, smart home, or multi-channel",
      "Automation service and programming scope",
    ],
    installSteps: defaultInstallSteps,
    maintenance:
      "Annual motor and limit-switch checks, track cleaning, and firmware updates for smart controllers extend reliable operation.",
    extraSections: [
      {
        heading: "Remote control vs smart home zip screens",
        body: "Remote systems suit straightforward daily use. Smart-home integration adds scheduling, voice control, and sensor triggers — useful for sun-facing balconies and commercial patios.",
      },
    ],
    extraFaqs: [
      {
        question: "Can existing manual zip tracks be motorized?",
        answer:
          "Sometimes. We inspect track condition, width, and motor compatibility during survey. Many projects need motorized-spec tracks for safe automation service.",
      },
    ],
  },
  "mesh-doors": {
    overview:
      "Mesh doors keep insects out while allowing airflow through main entrances, balcony doors, and utility openings. Options include mosquito mesh, magnetic self-closing panels, pleated folds, and SS or aluminium frames.",
    issuesSolved: [
      "Mosquitoes entering through open main doors",
      "Need for pet-friendly ventilation at entrances",
      "Rust on old mesh door frames in coastal cities",
      "Safety mesh for stair and utility doors",
    ],
    whereWorksBest: [
      "Main door and balcony door openings",
      "Kitchen and utility back doors",
      "Commercial kitchens and shop fronts",
      "Homes with pets needing fresh air",
    ],
    materials: [
      "Aluminium or stainless steel frames",
      "Fibreglass or stainless insect mesh",
      "Magnetic catch and pleated fold systems",
      "Custom sizes for non-standard door heights",
    ],
    priceFactors: [
      "Door width, height, and frame material",
      "Mesh grade and mesh door type",
      "Single vs double door configuration",
      "Magnetic, pleated, or fixed panel design",
    ],
    installSteps: defaultInstallSteps,
    maintenance:
      "Wipe mesh monthly, check magnetic seals, and lubricate hinges on pleated systems.",
    extraSections: [
      {
        heading: "Mosquito mesh vs safety mesh doors",
        body: "Insect mesh prioritises fine weave for mosquitoes. Safety mesh uses stronger gauge for stair and child-risk doors. We specify separately — do not assume one mesh suits both jobs.",
      },
    ],
    extraFaqs: [
      {
        question: "Are mesh doors rust proof and pet friendly?",
        answer:
          "Aluminium and SS304 frames resist rust in Chennai, Kochi, and coastal belts. Pet-friendly magnetic mesh doors allow pets to push through and re-seal — specify during quotation.",
      },
    ],
  },
  "sliding-mesh-doors": {
    overview:
      "Sliding mesh doors suit wide balcony openings, patio doors, and double-door entrances where hinged mesh is impractical. Smooth sliding tracks, space-saving stacks, and repair-friendly frames suit daily use.",
    issuesSolved: [
      "Wide balcony doors needing insect protection",
      "Space constraints where hinged doors won't fit",
      "Sticky or damaged old sliding mesh tracks",
      "Double-door openings needing paired panels",
    ],
    whereWorksBest: [
      "Balcony sliding door openings",
      "Patio and veranda wide spans",
      "Double sliding entrance configurations",
      "Renovations replacing worn sliding screens",
    ],
    materials: [
      "Aluminium sliding tracks and rollers",
      "Fine mosquito mesh or insect screen fabric",
      "Multi-panel stack configurations",
      "Replaceable mesh inserts for repair service",
    ],
    priceFactors: [
      "Track length and number of sliding panels",
      "Single vs double sliding mesh doors",
      "Mesh type and frame colour finish",
      "Repair vs new installation scope",
    ],
    installSteps: defaultInstallSteps,
    maintenance:
      "Clean tracks, adjust rollers for smooth sliding, and replace mesh panels when torn rather than full frame replacement.",
    extraSections: [
      {
        heading: "Space saving sliding mesh doors",
        body: "Stacked panels slide behind each other to maximise clear opening width — ideal for balcony dining and patio access. We measure stack depth and headroom before ordering.",
      },
    ],
    extraFaqs: [
      {
        question: "Do you repair sliding mesh doors?",
        answer:
          "Yes. We replace mesh panels, rollers, and tracks on many aluminium sliding mesh door systems. Send photos of the existing frame for a repair quotation.",
      },
    ],
  },
};

export function getServiceDetail(slug: string): ServiceDetail {
  return (
    serviceDetails[slug] ?? {
      overview:
        "Professional measured installation with SS304-grade materials, trained technicians, and a 5-year warranty. Every project starts with a free site survey and written quotation.",
      issuesSolved: [
        "Everyday safety and convenience needs for homes and offices",
        "Bird, insect, or fall-risk openings that need a measured fit",
        "Replacing old or rusted installations with durable materials",
      ],
      whereWorksBest: [
        "Apartments and gated communities",
        "Independent houses and villas",
        "Commercial and institutional buildings",
      ],
      materials: [
        "SS304 stainless steel and UV-stabilised nets",
        "Corrosion-resistant anchors and hardware",
        "Specifications chosen for Hyderabad and Chennai climate",
      ],
      priceFactors: [
        "Measured opening size and shape",
        "Material grade and finish",
        "Access and fixing surface condition",
        "Warranty and included installation scope",
      ],
      installSteps: defaultInstallSteps,
      maintenance:
        "Periodic inspection of anchors, borders, and moving parts keeps the installation safe and neat for years.",
      extraSections: [],
      extraFaqs: [],
    }
  );
}
