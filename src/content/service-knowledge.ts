/**
 * Stored technical modules. Pages are composed from these at render time.
 * Nothing here is fetched from an AI API, and nothing is copied from Wikipedia.
 * Figures that are not measured on site (cable diameter, load, price, lifespan)
 * are described as variable, not invented.
 */

export interface SourceReference {
  title: string;
  url: string;
  publisher: string;
  accessedAt: string;
  usedFor: string;
}

export interface KnowledgeFaq {
  question: string;
  answer: string;
}

export interface KnowledgeModule {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  faqs: KnowledgeFaq[];
}

export interface CategoryKnowledge {
  category: string;
  modules: KnowledgeModule[];
  sources: SourceReference[];
}

const ACCESSED = "2026-10-05";

const STEEL_SOURCE: SourceReference = {
  title: "Stainless steel",
  url: "https://en.wikipedia.org/wiki/Stainless_steel",
  publisher: "Wikipedia",
  accessedAt: ACCESSED,
  usedFor: "Background on chromium-bearing stainless grades. Page text is original.",
};

const HDPE_SOURCE: SourceReference = {
  title: "High-density polyethylene",
  url: "https://en.wikipedia.org/wiki/High-density_polyethylene",
  publisher: "Wikipedia",
  accessedAt: ACCESSED,
  usedFor: "Background that HDPE is a polyethylene used in nets and mesh. Page text is original.",
};

const NYLON_SOURCE: SourceReference = {
  title: "Nylon",
  url: "https://en.wikipedia.org/wiki/Nylon",
  publisher: "Wikipedia",
  accessedAt: ACCESSED,
  usedFor: "Background that nylon is a polyamide family used in some meshes. Page text is original.",
};

function m(
  id: string,
  heading: string,
  paragraphs: string[],
  faqs: KnowledgeFaq[],
  bullets?: string[],
): KnowledgeModule {
  return { id, heading, paragraphs, faqs, bullets };
}

const GRILL: CategoryKnowledge = {
  category: "Grills",
  sources: [STEEL_SOURCE],
  modules: [
    m(
      "balcony-measure",
      "Measuring a balcony before any cable is specified",
      [
        "A balcony cable grill is specified from the opening, not from a photograph. Measure the clear width at the top, the middle, and the bottom, because older concrete and MS railings are rarely parallel. Record the height from the finished floor to the top fixing line, and note whether the top line is a beam, a parapet, or only a handrail. A handrail that moves when you push it is not a structural fixing line.",
        "Write down obstructions: split AC pipes, washing-machine outlets, planter brackets, and sliding-door tracks. Each one changes where a channel can sit. If the family uses the balcony for drying clothes, an openable section has to be planned at the access side before the channels are cut. The written quote should list these measurements. A single square-foot number hides them.",
      ],
      [
        {
          question: "Can a balcony grill be ordered from a photo?",
          answer:
            "A photo helps identify the railing type. The cut length still comes from measurements at more than one height, because openings are often out of square.",
        },
      ],
    ),
    m(
      "channels",
      "Channels, end posts, and how the cables are held",
      [
        "The visible part of an invisible grill is the cable. The part that decides whether it stays tight is the channel or the end post. A channel spreads the load along a sound edge. Individual eye bolts into weak plaster do not. Before a channel is drilled, the fixer should know what is behind the surface: concrete, brick, a hollow block, or a thin MS flat.",
        "Cables are threaded and locked so the line cannot be pushed out by hand at mid-span. Openable panels use a frame that swings or slides, and that frame needs its own hinges and a stop. A fixed bay and an openable bay are different assemblies. Treating them as the same extrusion is how gaps appear at the lock side.",
      ],
      [
        {
          question: "Is the cable the structural part?",
          answer:
            "The cable is the infill. The channel, anchors, and the wall or railing they fix to are what carry the load. A sound railing is still required.",
        },
      ],
    ),
    m(
      "spacing",
      "Cable spacing and what it does not guarantee",
      [
        "Spacing is chosen for the opening and the people who use it. A wider gap keeps more of the view and is easier to clean. A closer gap is harder for a small child or a pet to pass, but it is still not a claim that the opening is childproof. No cable grid replaces supervision or a railing that already meets the building’s own guard requirement.",
        "Corners and returns need their own spacing check. A grid that looks even on a straight bay can open up at a 90-degree return if the cables are simply bent around a short radius. The specification should say how the corner is made: a post, a rounded channel, or a separate bay.",
      ],
      [
        {
          question: "Is there one correct cable gap?",
          answer:
            "No. Gap, cable grade, and span are chosen together after the opening is measured. A number copied from another flat is not a specification.",
        },
      ],
    ),
    m(
      "grades",
      "SS304 and SS316, without invented strength numbers",
      [
        "The usual cable and fitting grade on these jobs is SS304, an austenitic stainless family that relies on chromium for its corrosion film. SS316 is the upgrade when the opening stays wet, faces heavy monsoon splash, or sits in a more corrosive exposure. The grade is a material choice, not a decoration. It does not, by itself, tell you the breaking load of a particular cable. That depends on the product’s diameter, construction, and how it is terminated.",
        "Do not accept a quote that says “stainless” with no grade. Ask whether the channel, the screws, and the cable are the same family. A 304 cable on ordinary mild-steel screws starts rusting at the fastener, not in the middle of the wire.",
      ],
      [
        {
          question: "Should every opening be SS316?",
          answer:
            "No. SS304 is the normal specification. SS316 is for higher corrosion exposure. The survey should say which one and why.",
        },
      ],
    ),
    m(
      "anchors",
      "Anchors and existing railings",
      [
        "Drilling into an existing MS railing can be the right fixing, or it can weaken a rail that was already loose. The check is simple and physical: does the rail move, is the weld cracked, is the base plate rusted through. If the rail fails that look, the grill is not installed on it. The railing is repaired or the channel moves to the concrete edge.",
        "Concrete anchors need enough edge distance. A hole drilled at the very corner of a thin parapet blows out the cover. The installer should move the line or use a different bracket rather than forcing the hole. Chemical anchors and mechanical anchors behave differently in hollow block. The quote should name the fixing, not only the cable.",
      ],
      [
        {
          question: "Can cables be fixed to any balcony railing?",
          answer:
            "Only if the railing is sound. A loose or rusted rail is repaired or bypassed. The grill does not strengthen a failed railing.",
        },
      ],
    ),
    m(
      "tension",
      "Tension, sag, and the first-month check",
      [
        "Cables relax slightly after they are loaded and after the first temperature cycle. A line that looks tight on handover day can show a shallow sag later. The handover should include a look at mid-span and at the terminations, and the household should know who comes back if a line goes slack. Slack is a termination or a tension issue. It is not solved by painting the cable.",
        "Over-tensioning is the opposite mistake. Cranking a turnbuckle until the channel bows pulls the fixing out of a weak edge. Tension is even across the bay, not maximum on the first cable.",
      ],
      [
        {
          question: "Why does a new grill look slightly loose later?",
          answer:
            "Cables settle. A planned check of terminations is part of the job. A large sag means the termination or the anchor needs a look, not a new city page.",
        },
      ],
    ),
    m(
      "openable",
      "Fixed bays and openable panels",
      [
        "Most of a balcony can be fixed. The part people walk through needs an openable panel with a positive latch, not a cable that is unhooked and left hanging. The latch should close with one hand and should not depend on a knot. Hinges take the weight of the frame. If the frame drops when the latch is open, the hinge side was underbuilt.",
        "Openable panels are also where gaps appear. The meeting stile needs a stop so a child cannot push the frame past the cable line. Specify the clear opening width the household actually needs for a bucket or a washing machine. Guessing that width on site, after the frame is cut, is how the panel ends up too narrow.",
      ],
      [
        {
          question: "Can the whole balcony be openable?",
          answer:
            "It can, but each panel is a frame with hinges and a latch. It costs more and needs more alignment than a fixed bay. The survey should mark which part actually opens.",
        },
      ],
    ),
    m(
      "windows",
      "Window openings are not small balconies",
      [
        "A window grill is usually a shorter span with a sill and a lintel, often next to a shutter or a sliding sash. The cables must clear the sash. If they sit in the sash path, the window stops closing. Measure with the sash fully open and fully closed before the channel position is marked.",
        "Child-use windows are often the reason for the job. The grill reduces the chance of a fall through that opening. It does not lock the shutter, it does not stop a child climbing a bed pushed against the wall, and it does not change a window that opens onto a common corridor where the fixing is the neighbour’s frame. Those limits belong in the quote conversation.",
      ],
      [
        {
          question: "Will a window grill block the shutter?",
          answer:
            "It will if the channel is placed in the sash path. The measurement includes the shutter in both positions.",
        },
      ],
    ),
    m(
      "replace-ms",
      "Replacing a heavy MS grill",
      [
        "Households often want the MS grill removed because it blocks light and rusts. Removal is a separate decision from the cable specification. The MS frame may be the only thing currently acting as a barrier. Take it off only when the new system is ready to go in the same visit, and only when the slab edge it was welded to is still sound.",
        "Old weld scars and chipped plaster need to be made good. A cable channel will not hide a broken corner. If the MS grill was fixed into a window shutter, the shutter may not close after the bars are cut. Note that before cutting.",
      ],
      [
        {
          question: "Should the old grill come off first?",
          answer:
            "Not days before the new system is fitted. The opening should not be left without a barrier while material is being made.",
        },
      ],
    ),
    m(
      "compare-net",
      "Cable grill or a balcony net",
      [
        "A cable grill and a balcony net solve different problems. The cable line is a rigid infill in a channel, used where the household wants the opening to stay visible and ventilated. A net is a mesh closure, used where the need is to stop a fall through a larger void, to close a gap under a railing, or to keep pigeons out of a duct. Using a pigeon net as a child barrier, or a child net as a bird spike, is a product mismatch.",
        "Some balconies need both: cables on the open front, and a small net where a split-AC pipe leaves a hole the cables cannot close. The survey should separate those lines on the quote so the mesh grade is not applied to the whole elevation.",
      ],
      [
        {
          question: "Which one is safer?",
          answer:
            "Neither is universally safer. Each is fit for a different opening. A sound railing plus the right infill matters more than the product name.",
        },
      ],
    ),
    m(
      "maintenance",
      "Cleaning and what wear actually looks like",
      [
        "Dust and kitchen film collect on horizontal cables. Wash with water and a mild detergent. Abrasive powder and steel wool scratch the surface and can start tea-staining. Coastal or continuously wet openings need a more frequent rinse. That is maintenance, not a defect in the grade.",
        "Look twice a year at terminations, the latch on any openable panel, and the anchors at the ends. Red rust at a screw means the fastener is not the same grade as the cable. A frayed cable is replaced, not taped. Do not hang a full-size swing or a heavy planter from the cables.",
      ],
      [
        {
          question: "How should the cables be cleaned?",
          answer:
            "Water and a mild detergent. Avoid steel wool and harsh powder. Check latches and end fittings on the same visit.",
        },
      ],
    ),
    m(
      "limits",
      "What a cable grill does not do",
      [
        "It does not replace a structurally sound railing. It does not make a balcony legal if the guard height is already wrong. It does not stop a determined climb, and it is not a certified fall-arrest system. It is an infill. The household still supervises children. Any sentence that says the product is completely childproof or unbreakable is advertising, not a specification.",
        "Load capacity, warranty years, and a single price per square foot are not stated here because they change with span, diameter, grade, anchors, and access. Those belong on a written quote after measurement.",
      ],
      [
        {
          question: "Is the grill childproof?",
          answer:
            "No product on this site is described as childproof. The grill is an added infill. Supervision and a sound railing still matter.",
        },
      ],
    ),
    m(
      "quote",
      "What to send when you ask for a quote",
      [
        "Send the city, the floor, and whether the opening is a balcony, a window, or a stair. Add the width and height if you have them, plus a photo of the fixing edge. Say if an old MS grill is still in place and if any part must open. Mention society timing if the building restricts drilling hours.",
        "The reply should be a scope: grade, what opens, fixing type, and what is excluded. A single rate with no scope is not comparable to another vendor’s single rate.",
      ],
      [
        {
          question: "Why is there no price list on this page?",
          answer:
            "Width, height, access, grade, and the fixing surface change the figure. The survey produces a written scope instead of a flat rate.",
        },
      ],
    ),
    m(
      "monsoon",
      "Monsoon, dust, and the finish",
      [
        "Chhattisgarh openings take hot dry months and a hard monsoon. Water sits on the bottom channel if the channel has no way to drain. Ask how the bottom edge is detailed. Tea-staining on stainless is usually contamination or a mild-steel fastener, not proof that stainless “does not work” in rain.",
        "Dust from main roads sticks to the cables. A rinse schedule belongs in the handover, especially on balconies that face a busy corridor. This is a climate note, not a claim about a particular neighbourhood’s rainfall total.",
      ],
      [
        {
          question: "Does rain damage SS304?",
          answer:
            "Rain alone is not a reason to reject SS304. Standing water, mild-steel fasteners, and no cleaning are the usual causes of staining.",
        },
      ],
    ),
    m(
      "society",
      "Society rules and the working hour",
      [
        "Apartment jobs stop and start on the building’s rules: drilling hours, lift booking, and whether the facade must stay one colour. The channel finish should be chosen with that rule in mind. A crew that arrives without a lift slot loses half a day and the household pays for the return.",
        "Get the society’s yes before the material is cut if the building has rejected other facade work. The installer cannot override a managing committee. The quote can include a second visit. It cannot include permission the household has not asked for.",
      ],
      [
        {
          question: "Do you need society permission?",
          answer:
            "If the building controls facade work or drilling hours, yes. That permission is the household’s to obtain. The survey can list what the committee usually asks to see.",
        },
      ],
    ),
    m(
      "checklist",
      "Checklist before, during, and after fitting",
      [
        "Use this as a job sheet, not as a guarantee. If a line cannot be ticked, the specification is not finished.",
      ],
      [
        {
          question: "What should be checked at handover?",
          answer:
            "Even tension, latch operation, anchor seating, and a clear note of what was excluded. The household should be able to open any moving panel once before the crew leaves.",
        },
      ],
      [
        "Width and height at more than one point",
        "Railing or wall condition",
        "Sash clearance on windows",
        "Which bay opens, and how wide",
        "Grade of cable and of the fasteners",
        "Anchor type named on the quote",
        "Even tension, no bowed channel",
        "Latch closes and the frame does not drop",
        "Cleaning note and who returns if a line settles",
      ],
    ),
  ],
};

const NET: CategoryKnowledge = {
  category: "Nets",
  sources: [HDPE_SOURCE, NYLON_SOURCE],
  modules: [
    m(
      "mesh-choice",
      "Choosing mesh for the job, not the label",
      [
        "A safety net, a pigeon net, and a debris net are different meshes. The child or pet balcony net is there to close a fall path. The pigeon net is there to stop birds entering a duct, a shaft, or an AC deck. A construction debris net is a site product and is not automatically a balcony child net. The quote should name the use. “Nylon net” is not a use.",
        "Mesh opening, cord, and border rope are chosen after the gap is measured. A tighter mesh blocks more and catches more dust. A wider mesh is wrong if the thing you are stopping is smaller than the hole. HDPE and nylon are both used in this trade. They age differently in sun. The specification should say which polymer and that it is UV-stabilised, not only the colour.",
      ],
      [
        {
          question: "Is every balcony net the same mesh?",
          answer:
            "No. Child, pet, pigeon, and debris uses are specified separately. One mesh grade stretched over every opening is how the wrong product gets installed.",
        },
      ],
    ),
    m(
      "borders",
      "Borders, ropes, and how the net is tied",
      [
        "The net fails at the edge more often than in the middle. A border rope or tape has to run the full perimeter and tie back to anchors that are in sound material. Tying a net to a loose railing wire transfers the load to the weakest object on the balcony.",
        "Overlaps and joints should be planned where one piece cannot cover the opening. A joint in the middle of a fall path, held by a few cable ties, is not a border. The quote should say whether the net is one piece and how the edge is finished.",
      ],
      [
        {
          question: "Can the net be tied to the existing railing wires?",
          answer:
            "Only if those wires and the rail are sound. Otherwise the anchors go into the structure, not into a decorative wire.",
        },
      ],
    ),
    m(
      "pigeon-vs-child",
      "Pigeon mesh is not a child barrier",
      [
        "Pigeon netting is sized and fitted to close roosting volumes: AC ledges, shafts, light wells. It is often installed from the outside of a grille or across a duct. It is the wrong product to rely on as the only barrier in front of a child on an open balcony. If both problems exist, they are two lines on the quote.",
        "Bird spikes are a third product. Spikes stop landing on a narrow ledge. They do not close a balcony. A page about nets should not quietly turn into a spike specification.",
      ],
      [
        {
          question: "Will a pigeon net stop a child falling?",
          answer:
            "Do not use a pigeon net as the child barrier. Specify the child or pet net for the fall path, and the pigeon net only for the bird opening.",
        },
      ],
    ),
    m(
      "gaps",
      "The gaps that get left out",
      [
        "The opening that matters is often not the rectangle of the balcony. It is the triangle under a sloping handrail, the hole around a split-AC pipe, and the slit above a false ceiling in a duct. Measure those. A net that covers the pretty rectangle and leaves the pipe gap does not finish the job.",
        "Access for the person who will wash the net later also matters. A duct net that can only be reached from a neighbour’s flat will not be maintained.",
      ],
      [
        {
          question: "What if the pipe already passes through the opening?",
          answer:
            "The net is cut and re-bordered around the pipe, or a separate small panel is made. Leaving a raw hole defeats the closure.",
        },
      ],
    ),
    m(
      "uv",
      "Sun, dust, and when a net is tired",
      [
        "Polyethylene and nylon meshes lose flexibility with sun exposure. UV stabiliser slows that. It does not make the net permanent. A net that has gone chalky, brittle, or torn at the knots is replaced. Washing does not restore a degraded cord.",
        "Dust load in a dry season adds weight and hides tears. A rinse and a look at the borders twice a year is the practical maintenance. Do not patch a long tear with household tape and call it repaired.",
      ],
      [
        {
          question: "How long does a net last?",
          answer:
            "There is no single life. Sun, dust, mesh polymer, and whether the border stays tight all change it. Brittle cord means replacement, not a promised year count.",
        },
      ],
    ),
    m(
      "install-net",
      "Fitting sequence for a balcony or duct net",
      [
        "The sequence is: measure the true perimeter including the odd gaps, choose the mesh for the use, set anchors in sound material, tension the border, then close the corners. A net that is stapled in a hurry and pulled tight afterwards tears at the first anchor.",
        "Work at height needs a plan for where the installer stands. A household ladder on a wet balcony is not a method. If the duct is only reachable from outside, that access is part of the quote, not a surprise on the day.",
      ],
      [
        {
          question: "Can the net be fitted without a site visit?",
          answer:
            "Cut size and anchor positions come from the opening. A visit or a measured sketch with photos of every edge is the minimum.",
        },
      ],
    ),
    m(
      "limits-net",
      "Limits of a net",
      [
        "A net is not a railing and not a fall-arrest harness. It is a mesh closure. It will not hold a running adult who throws their full weight at it, and it should not be sold that way. It also will not stop pigeons if a gap larger than the bird remains at a corner.",
        "No price per square foot is published here. Area, access, mesh, and the number of odd penetrations change the scope.",
      ],
      [
        {
          question: "Is a balcony net enough on its own?",
          answer:
            "Only for the gap it actually closes, and only as an added layer. It does not replace a sound guardrail.",
        },
      ],
    ),
    m(
      "compare-grill",
      "When a household should ask for cables instead",
      [
        "If the goal is a slim view across a balcony that already has a railing, a cable grill is usually the relevant product. If the goal is to close a duct, a light well, or a gap under a rail where mesh is enough, a net is the relevant product. Quoting both as “safety” and letting the cheaper word win is how the wrong one is fitted.",
        "The survey can recommend one. It should say what the other would have been for, so the household can see the choice.",
      ],
      [
        {
          question: "Which is cheaper, net or grill?",
          answer:
            "They are not substitutes, so a cheaper tag is not a comparison. The quote is for the product that matches the opening.",
        },
      ],
    ),
    m(
      "clean-net",
      "Cleaning a net without damaging the cord",
      [
        "Brush dry dust off, then rinse. A hard brush on a degraded cord finishes the tear. Do not use solvents. If the net sits over a kitchen duct, grease is the real load. Grease plus dust becomes a sheet. That sheet is a reason to clean, and eventually a reason to replace if the cord has swollen or stiffened.",
      ],
      [
        {
          question: "Can I pressure-wash the net?",
          answer:
            "A strong jet at close range can pull the border off its anchors. A rinse is enough unless the installer has said the fixing can take more.",
        },
      ],
    ),
    m(
      "quote-net",
      "Information that changes a net quote",
      [
        "State the use: child balcony, pet, pigeon duct, terrace, or debris. Give width, height, and the odd gaps. Say the floor and how the installer reaches the outside face. A duct that opens into a neighbour’s light well needs that neighbour’s access sorted before the visit is booked.",
      ],
      [
        {
          question: "What photos are useful?",
          answer:
            "One of the whole opening and one of each edge, including pipes and the railing base. Photos do not replace the measurement.",
        },
      ],
    ),
    m(
      "terrace",
      "Terrace and staircase nets",
      [
        "Terrace edges and stair voids are larger and windier than a bedroom window. The border has to be continuous, and the anchors have to be in the slab or a sound wall, not in a tile alone. A net used as a cricket backstop is a sports net, with a different impact, and should be specified as that.",
        "Stair voids need a look at how people pass. A net that crosses the walking line will be cut by the household within a month. The closure has to follow the void, not the shortest piece of material.",
      ],
      [
        {
          question: "Can one net cover a stair and a balcony?",
          answer:
            "Only if it is designed as two closures. Stretching one rectangle across both usually leaves a gap at the turn.",
        },
      ],
    ),
    m(
      "checklist-net",
      "Net checklist",
      [
        "Tick these before the crew leaves. An unticked border is an open edge.",
      ],
      [
        {
          question: "What is the last check?",
          answer:
            "Walk the perimeter. Every edge should meet an anchor or a finished overlap, with no raw hole around pipes.",
        },
      ],
      [
        "Use named: child, pet, pigeon, terrace, or duct",
        "Polymer and UV note on the quote",
        "Perimeter measured, including pipe gaps",
        "Anchors in sound material",
        "Border continuous",
        "No raw hole left around services",
        "Access for later cleaning agreed",
      ],
    ),
  ],
};

const BIRD: CategoryKnowledge = {
  category: "Bird Control",
  sources: [STEEL_SOURCE],
  modules: [
    m(
      "ledge",
      "Spikes are for landing edges, not for balconies",
      [
        "A bird spike is a row of projections on a base strip, fixed to a ledge where pigeons land: a parapet coping, a signboard, an AC hood, a beam. It makes that strip uncomfortable to stand on. It does not close an opening. It does not replace a balcony net or a cable grill. If the complaint is birds inside a duct, the product is usually a net. If the complaint is droppings on a 100 mm coping, the product is usually a spike.",
        "The strip length follows the landing edge, not the floor area of the flat. A quote in square feet for a spike job is the wrong unit.",
      ],
      [
        {
          question: "Will spikes keep pigeons off the whole balcony?",
          answer:
            "They protect the edge they are fixed to. The open balcony front is a different product.",
        },
      ],
    ),
    m(
      "base",
      "Base strip, adhesive, and screws",
      [
        "The base has to stay stuck or screwed when the ledge is hot and then wet. Adhesive alone on a dusty, painted, or flaking coping fails. The surface is cleaned back to something sound, and screws are added where the substrate allows. A plastic base and a stainless base are different products. The quote should say which.",
        "Spikes that are taller than the landing zone can be bent by a monkey or by a person leaning a ladder there. Height is chosen for the bird, not for appearance.",
      ],
      [
        {
          question: "Is glue enough?",
          answer:
            "Only on a sound, clean surface, and often not even then. Mechanical fixing is specified when the ledge can take a screw.",
        },
      ],
    ),
    m(
      "droppings",
      "Droppings, nests, and the wrong clean-up",
      [
        "Spikes do not remove an existing nest. The nest and the droppings are cleared first, with the household warned that dry droppings should not be brushed into the air without a simple mask and a wet-down. Then the strip goes on the landing line the birds were using. If the strip is placed beside the landing line, the birds return.",
        "A spike does not poison birds and should not be described as if it does. It is a physical deterrent on one edge.",
      ],
      [
        {
          question: "Do spikes remove the nest?",
          answer:
            "No. Clear the nest first. The strip is there so the same edge is harder to reoccupy.",
        },
      ],
    ),
    m(
      "net-or-spike",
      "Spike, net, or both",
      [
        "Use a spike on a narrow coping. Use a net across a volume birds fly into. Use both when the coping and the duct are separate problems. Selling a spike kit for a shaft wastes the household’s money and leaves the shaft open.",
        "The survey should point at the actual landing surface. A photo of the balcony floor is not that surface.",
      ],
      [
        {
          question: "Can I choose the cheaper of spike or net?",
          answer:
            "Only after the landing place is identified. The cheaper product on the wrong surface does not solve the complaint.",
        },
      ],
    ),
    m(
      "limits-bird",
      "Limits",
      [
        "Spikes do not seal a building, do not stop birds nesting inside a false ceiling, and are not a health treatment. They are a ledge treatment. No bird count, no “100% pigeon free” claim, and no price per foot is published here, because ledge length, substrate, and access change the job.",
      ],
      [
        {
          question: "Will the pigeons leave the neighbourhood?",
          answer:
            "No. They stop using the treated edge if the strip is on the landing line and stays fixed. Neighbouring ledges are a different job.",
        },
      ],
    ),
    m(
      "access-bird",
      "Access and the outside face",
      [
        "Signboards, high parapets, and AC decks are often reached from outside. The quote includes that access. A ground-floor coping and a seventh-floor beam are not the same visit. If a cradle or a long ladder is required, it is written down before the day.",
      ],
      [
        {
          question: "Can spikes be fitted from inside the flat?",
          answer:
            "Only when the ledge is reachable safely from inside. Outside faces need an access plan.",
        },
      ],
    ),
    m(
      "maintain-bird",
      "Checking a spike line",
      [
        "Look along the strip after the monsoon. A lifted base, a bent spike, or a gap where two strips do not meet is a re-fix, not a new species of product. Leaves and plastic bags caught in the spikes should be lifted off. They become a new perch.",
      ],
      [
        {
          question: "What if one section comes unstuck?",
          answer:
            "Clean the ledge and refix that section. Do not glue it onto dust or onto the old failed adhesive.",
        },
      ],
    ),
    m(
      "quote-bird",
      "What the spike quote needs",
      [
        "The length of the landing edge, the material of that edge, the floor, and a photo taken along the ledge rather than of the room. Say whether a net is also needed for a duct. Those are two scopes.",
      ],
      [
        {
          question: "Why not a rate per square foot?",
          answer:
            "The work follows the ledge length and the fixing, not the floor area.",
        },
      ],
    ),
  ],
};

const OTHER: Record<string, CategoryKnowledge> = {
  Hangers: {
    category: "Hangers",
    sources: [STEEL_SOURCE],
    modules: [
      m(
        "hanger-fix",
        "What the hanger is actually fixed to",
        [
          "A cloth hanger is a rod, a pulley line, or a ceiling-mounted rack. The load path is the anchor into the slab or the wall, not the pole the clothes hang on. A ceiling that is only gypsum board cannot take a pulley. The fixing has to reach the concrete above, or the product has to be a wall-mounted rod on a sound wall.",
          "Balcony slabs in apartments sometimes have a tile finish and a thin screed. The anchor length has to get past that. The quote should name ceiling or wall, and the fastener, not only the number of rods.",
        ],
        [
          {
            question: "Can a pulley be fixed to a false ceiling?",
            answer: "No. The anchor has to reach a structural slab, or the hanger is wall-mounted instead.",
          },
        ],
      ),
      m(
        "hanger-use",
        "Pulley lines versus a fixed rod",
        [
          "A pulley drops the line to a reachable height and is useful where the ceiling is high. A fixed rod is simpler and has fewer moving parts. The choice follows who will use it and whether the balcony is exposed to rain. A pulley left out in the monsoon rusts at the wheel if the wheel is not a corrosion-resistant grade.",
        ],
        [
          {
            question: "Which hanger should a small balcony use?",
            answer:
              "Usually a wall or ceiling rod sized to the clear width, not a long pulley that crosses the walking line.",
          },
        ],
      ),
      m(
        "hanger-limits",
        "Limits",
        [
          "A hanger is not a swing and not a fall barrier. Do not hang from it. Capacity depends on the anchor and the slab, so this page does not print a kilogram rating. Rain, mild-steel fasteners, and a gypsum ceiling are the usual reasons a hanger fails.",
        ],
        [
          {
            question: "Is there a standard load?",
            answer: "No figure is published here. The anchor and the slab decide it, and they are checked on site.",
          },
        ],
      ),
      m(
        "hanger-quote",
        "What to tell us",
        [
          "Ceiling or wall, clear width, whether a false ceiling exists, and if the balcony is open to rain. A photo of the slab edge is more useful than a photo of the clothes.",
        ],
        [
          {
            question: "Do you need the balcony width?",
            answer: "Yes. The rod is cut to the clear width between the walls or the brackets.",
          },
        ],
      ),
      m(
        "hanger-rain",
        "Open balconies and the wheel",
        [
          "A pulley left in an uncovered balcony takes rain on the wheel and the cord. If the wheel is mild steel, it rusts and the line starts to squeal and then jam. Specify a corrosion-resistant wheel or move the line under a slab that actually covers it. A rod with no moving parts is often the better specification on a fully open drying balcony.",
        ],
        [
          {
            question: "Should an open balcony get a pulley?",
            answer: "Only if the wheel and cord are specified for rain. Otherwise use a fixed rod.",
          },
        ],
      ),
      m(
        "hanger-brackets",
        "Bracket spacing",
        [
          "A long rod that is held only at the two ends will bow once it is loaded with wet clothes. Intermediate brackets belong on long spans. The bracket has to land on the wall or the slab, not on a loose tile. Mark the bracket positions on the sketch so the rod is not cut before the fixing points are agreed.",
        ],
        [
          {
            question: "Why does a new rod bend?",
            answer: "The span is too long for two end brackets, or the anchors have pulled out of a weak fixing.",
          },
        ],
      ),
      m(
        "hanger-care",
        "Looking after the line",
        [
          "Replace a frayed cord. Do not knot it and keep pulling. Check that end caps are still on so clothes do not slide off, and that the wall anchors have not worked loose. A hanger that wobbles is an anchor problem. Tightening the decorative finial does nothing.",
        ],
        [
          {
            question: "The pulley squeaks. What failed?",
            answer: "Usually the wheel, not the rod. Look at the wheel material and whether rain reaches it.",
          },
        ],
      ),
      m(
        "hanger-mistakes",
        "Mistakes that show up after the first wash",
        [
          "Fixing into tile only, ignoring a false ceiling, and placing the line across the walking path are the three that come back as complaints. The fourth is using the hanger as a support for a swing or a satellite dish. It is a drying line.",
        ],
        [
          {
            question: "Can the line double as a support for other fittings?",
            answer: "No. It is specified for clothes, not for extra point loads.",
          },
        ],
      ),
    ],
  },
  Screens: {
    category: "Screens",
    sources: [],
    modules: [
      m(
        "zip-how",
        "How a zip screen closes an opening",
        [
          "A zip screen is a fabric or mesh blind whose edges run in side tracks, so the cloth stays in the track in wind instead of flapping like a loose curtain. It is used on balconies and patios for sun, dust, and insects. It is not an invisible grill and it is not a safety net. It does not stop a fall.",
          "Manual and motorised versions differ in the headbox and the power point. A motor needs a supply at the head, a decision about the switch, and a way to reach the motor later. The quote should separate the cloth, the tracks, and the motor.",
        ],
        [
          {
            question: "Does a zip screen replace a grill?",
            answer: "No. It is a blind in side tracks. Fall protection is a different specification.",
          },
        ],
      ),
      m(
        "zip-measure",
        "Measuring for tracks",
        [
          "Tracks need a flat side reveal. An out-of-square opening is common. The narrowest width is the one that matters, because the headbox and the tracks are made square. If the reveal is too shallow, a face-fix frame is used instead. That sticks out. The household should see that on a sketch before it is ordered.",
        ],
        [
          {
            question: "Can tracks go on a round column?",
            answer: "Not directly. The track needs a flat fixing face or a separate frame.",
          },
        ],
      ),
      m(
        "zip-limits",
        "Limits",
        [
          "Wind ratings and fabric grades vary by manufacturer. This page does not invent a wind class. A screen left down in a storm because the motor failed is a maintenance event. It is not a structural wall.",
        ],
        [
          {
            question: "Is the screen waterproof?",
            answer:
              "Treat it as sun, dust, and insect control unless the specific cloth is specified otherwise on the quote. Do not assume a storm rating.",
          },
        ],
      ),
      m(
        "zip-quote",
        "Quote inputs",
        [
          "Width, height, reveal depth, manual or motor, and whether the opening is a balcony or a patio. Mention if a grill is already in the reveal, because the track and the grill compete for the same edge.",
        ],
        [
          {
            question: "What if a grill is already fitted?",
            answer: "The track position has to be chosen so it does not foul the cables or the latch.",
          },
        ],
      ),
      m(
        "zip-cloth",
        "Cloth, mesh, and what the quote must name",
        [
          "The sheet can be a vision mesh, a darker sunscreen, or a clearer fabric. They do not block the same amount of light or rain. The quote has to name the cloth. A sample photo from another building is not a specification. Side-track colour is a separate line, because societies reject a track that does not match the frame.",
        ],
        [
          {
            question: "Will any zip cloth block rain?",
            answer: "Do not assume that. Ask which cloth is being supplied and what it is for: sun, insects, or a stated weather performance.",
          },
        ],
      ),
      m(
        "zip-motor",
        "Motors and how they are reached later",
        [
          "A motorised screen fails in the motor or the limit switch more often than in the cloth. The headbox has to be reachable without destroying the pelmet. The power point has to be dedicated enough that a loose adapter is not the permanent supply. If the household wants a remote, that is specified. It is not assumed.",
        ],
        [
          {
            question: "What happens in a power cut?",
            answer: "The screen stays where it was unless the model has a manual override. The quote should say which.",
          },
        ],
      ),
      m(
        "zip-wind",
        "Wind and when the screen should be up",
        [
          "Side tracks hold the cloth better than a free blind, but they are not a storm shutter. In high wind the screen should be retracted if the manufacturer’s note for that cloth says so. A screen left down and drumming will walk out of the track. This page does not print a wind class, because that belongs to the product being supplied.",
        ],
        [
          {
            question: "Can the screen stay down in a storm?",
            answer: "Only if that cloth and track are specified for it. Otherwise retract it.",
          },
        ],
      ),
      m(
        "zip-care",
        "Tracks and cloth care",
        [
          "Grit in the side track is the usual reason a manual screen starts to stick. Vacuum or brush the track. Do not oil it unless the installer said the track is meant to be oiled. Wash the cloth with water and mild soap. Solvents attack some coatings. A cloth that has come out of the zip needs a refit, not a tug.",
        ],
        [
          {
            question: "The screen sticks halfway. What should I check?",
            answer: "Clear the side tracks first. If the cloth has left the zip, stop pulling and book a refit.",
          },
        ],
      ),
    ],
  },
  Doors: {
    category: "Doors",
    sources: [],
    modules: [
      m(
        "mesh-door",
        "What a mesh door is for",
        [
          "A mesh door is an insect screen in a frame: hinged, sliding, or magnetic. It lets air through a doorway that would otherwise be shut. It is not a security door and not a child gate unless it is specified and latched as one. Pet damage is usually at the bottom corner, so the frame and the mesh grade at that corner matter more than the colour.",
        ],
        [
          {
            question: "Will it stop a dog?",
            answer:
              "Only if the frame, latch, and mesh are chosen for that impact. A light magnetic screen will not.",
          },
        ],
      ),
      m(
        "sliding-mesh",
        "Sliding tracks and the floor",
        [
          "A sliding mesh door needs a straight track. A floor track collects dust and water. A top-hung panel avoids the floor track but needs a sound lintel. Measure the clear opening with the main door open, because the mesh door often sits in the same reveal.",
        ],
        [
          {
            question: "Can it share the main door frame?",
            answer: "Sometimes. The reveal has to be deep enough for both leaves. The measurement decides it.",
          },
        ],
      ),
      m(
        "door-limits",
        "Limits",
        [
          "Mesh doors do not provide forced-entry resistance. Do not describe them as security doors. Torn mesh is replaced. Bent tracks are realigned or replaced. No generic price is listed, because opening size and the sliding or hinged choice change the frame.",
        ],
        [
          {
            question: "Is a mesh door a security door?",
            answer: "No. It is an insect screen with a frame.",
          },
        ],
      ),
      m(
        "door-quote",
        "Quote inputs",
        [
          "Clear width, clear height, hinged or sliding, and whether a pet uses the door. A photo of the reveal with the main door open is the useful one.",
        ],
        [
          {
            question: "Do you need the main door size?",
            answer: "The clear opening and the reveal depth matter more than the decorative door slab.",
          },
        ],
      ),
      m(
        "door-magnetic",
        "Magnetic, hinged, and sliding choices",
        [
          "A magnetic close is convenient and weak. It suits a light insect screen that people walk through. It does not suit a pet that pushes. A hinged door with a latch is a frame with a positive close. A sliding door keeps the swing out of a narrow passage. Pick from how the doorway is used, not from a catalogue photo.",
        ],
        [
          {
            question: "Why not always choose magnetic?",
            answer: "Because the close is only as strong as the magnets. Pets and wind push them open.",
          },
        ],
      ),
      m(
        "door-pet",
        "Pets and the bottom corner",
        [
          "Dogs and cats load the bottom corner and the latch side. A lighter mesh tears there first. If a pet uses the door, say so before the mesh is chosen. A closer bar or a stronger mesh at the lower half is a specification, not an accessory to be remembered later.",
        ],
        [
          {
            question: "The mesh tore at the bottom. Is that normal wear?",
            answer: "It is the usual place a pet or a foot meets the screen. The repair is a mesh or panel replacement, not tape.",
          },
        ],
      ),
      m(
        "door-care",
        "Tracks, hinges, and mesh",
        [
          "Keep the bottom track clear if there is one. Lift a door that is dragging. Do not sand the mesh. A bent hinge throws the latch out of line. Realign the hinge before replacing the latch. Torn mesh is replaced as a panel if the frame is still square.",
        ],
        [
          {
            question: "The latch no longer meets. What moved?",
            answer: "Usually the hinge or a dropped sliding panel, not the latch itself.",
          },
        ],
      ),
      m(
        "door-mistakes",
        "Measurement mistakes",
        [
          "Measuring the decorative door slab instead of the clear opening, forgetting the reveal depth, and ordering a swing that hits a switchboard are the usual errors. Measure with the main door open. Mark the swing on the floor with tape before the frame is made.",
        ],
        [
          {
            question: "The new door hits the switchboard. Whose error is that?",
            answer: "It was missed at measurement. The swing direction has to be chosen on site before the frame is cut.",
          },
        ],
      ),
    ],
  },
  Sports: {
    category: "Sports",
    sources: [NYLON_SOURCE, HDPE_SOURCE],
    modules: [
      m(
        "sports-use",
        "Practice nets are impact products",
        [
          "A cricket or football practice net is hit repeatedly. The mesh, the border, and the poles or ceiling fixings have to take that impact. A balcony child net is not a cricket net. Using the lighter mesh because it is cheaper ends with a tear in the first week and a ball in the neighbour’s yard.",
        ],
        [
          {
            question: "Can a balcony safety net be used as a cricket net?",
            answer: "No. Specify a sports net for impact. The balcony net is a different mesh and a different fixing.",
          },
        ],
      ),
      m(
        "sports-fix",
        "Poles, ceilings, and the ball path",
        [
          "Outdoor nets need poles or a frame that is anchored, not a few ropes to a tree. Indoor and terrace cages need a ceiling that can take the pulley or the frame. Measure the cage, the height of the hitting zone, and where misfit balls go. The neighbour’s glass is part of the design if the terrace is tight.",
        ],
        [
          {
            question: "What should be measured?",
            answer: "Length, width, height of the cage, and what sits behind the batter and the bowler.",
          },
        ],
      ),
      m(
        "sports-limits",
        "Limits",
        [
          "No net makes a terrace a certified sports hall. Impact, pole spacing, and mesh are specified per cage. This page does not print a fake IS rating or a price per square foot.",
        ],
        [
          {
            question: "Is there a standard cricket-net price?",
            answer: "No. Cage size, mesh, and whether poles or a ceiling frame are used change the quote.",
          },
        ],
      ),
      m(
        "sports-quote",
        "Quote inputs",
        [
          "Sport, indoor or outdoor, cage dimensions, and photos of the fixing points. Say if the net is a backstop only or a full cage.",
        ],
        [
          {
            question: "Is a backstop the same as a cage?",
            answer: "No. A backstop is one face. A cage closes the sides and usually the top.",
          },
        ],
      ),
      m(
        "sports-mesh",
        "Knotted and knotless sports mesh",
        [
          "Knotless mesh spreads impact without a hard knot against the ball. Knotted mesh is common and repairable in small tears. Neither label tells you the cord thickness. The quote should name the mesh and the border. A sample that is only “cricket net” is not a specification.",
        ],
        [
          {
            question: "Is knotless always better?",
            answer: "It feels different on impact. It is not automatically the right cord size. Specify both.",
          },
        ],
      ),
      m(
        "sports-poles",
        "Pole spacing and the ceiling",
        [
          "Poles that are too far apart let the top rope sag into the hitting zone. Spacing is part of the cage design. On a terrace, the pole base has to be anchored without pretending a loose block is a foundation. Indoors, the ceiling fixing has to reach structure. A cage that sways is a fixing problem, not a mesh problem.",
        ],
        [
          {
            question: "The top of the net sags. What is wrong?",
            answer: "The span between supports is too long, or the top rope was never tensioned. It is not solved by a tighter mesh alone.",
          },
        ],
      ),
      m(
        "sports-care",
        "Checking a practice net",
        [
          "Walk the border. A tear at a pole tie grows. Tie it off only as a stopgap and replace the panel if the cord has run. Do not let kids climb the net. It is not a playground climbing frame, and the poles are not designed as a swing set.",
        ],
        [
          {
            question: "Can a small tear wait?",
            answer: "A tear at the border should be closed before the next session. A hole in the hitting zone should not wait.",
          },
        ],
      ),
      m(
        "sports-neighbours",
        "Balls, glass, and the edge of the terrace",
        [
          "If the cage is on a terrace with glass or a neighbour below, the design has to close the face that currently leaks balls. A stylish backstop that leaves the side open is not finished. Say which sides have glass or a drop. That decides height and whether a roof net is in scope.",
        ],
        [
          {
            question: "Do we need a roof net?",
            answer: "When balls leave over the top toward glass or another flat. It is a scope item, not a default.",
          },
        ],
      ),
    ],
  },
  Turf: {
    category: "Turf",
    sources: [],
    modules: [
      m(
        "turf-base",
        "The base matters more than the pile photo",
        [
          "Cricket-box grass is an artificial surface over a prepared base. The pile photograph is the least important part. Drainage, levels, and what the base is made of decide whether the surface ponds and whether the seams open. A quote that only names a pile height is incomplete.",
        ],
        [
          {
            question: "Can turf be laid on an existing concrete slab?",
            answer:
              "Sometimes, if the slab drains and is level enough. That is a site judgement, not a catalogue default.",
          },
        ],
      ),
      m(
        "turf-use",
        "Indoor and outdoor boxes",
        [
          "Outdoor boxes take rain and sun. Indoor boxes take different wear and need a base that does not trap damp against a floor the building did not design as a wet area. The specification should say which. Shock pad, infill, and pile are separate lines if they are in the scope. If they are not in the scope, the quote should say so.",
        ],
        [
          {
            question: "Does the quote include the base?",
            answer: "Only if it is written. Ask. A supply-only carpet over an unprepared floor is a different job.",
          },
        ],
      ),
      m(
        "turf-limits",
        "Limits",
        [
          "No playing-life in years is promised here. Use, UV, infill, and the base change it. This is not a certified sports-surface declaration.",
        ],
        [
          {
            question: "How many years will the grass last?",
            answer: "No year count is published. Use and the base decide it, and they are not known from a product photo.",
          },
        ],
      ),
      m(
        "turf-quote",
        "Quote inputs",
        [
          "Length, width, indoor or outdoor, and whether a base already exists. Photos of the drain points matter more than a logo on the pile.",
        ],
        [
          {
            question: "What measurement is essential?",
            answer: "The plan size and the levels. A sloped terrace needs a drainage note before the carpet is ordered.",
          },
        ],
      ),
      m(
        "turf-seams",
        "Seams and the direction of play",
        [
          "Seams should not sit in the main running line if the layout can avoid it. They are glued or joined as the product requires, on a base that is not still damp. A seam that opens is usually a base or a joining problem, not a reason to blame the pile colour. The quote should say who prepares the base.",
        ],
        [
          {
            question: "Why do seams open?",
            answer: "Movement in the base, damp, or a joint that was not made as the product requires. Look at the base before replacing the whole carpet.",
          },
        ],
      ),
      m(
        "turf-infill",
        "Infill, pile, and what was excluded",
        [
          "Some systems use infill. Some do not. Infill changes how the surface plays and how it drains. If the quote is supply-only carpet, say that infill and the shock pad are excluded. Households compare two quotes that are not the same scope and then argue about the cheaper number.",
        ],
        [
          {
            question: "Is infill included?",
            answer: "Only when the quote lists it. Ask before comparing prices.",
          },
        ],
      ),
      m(
        "turf-care",
        "Brushing and what not to do",
        [
          "Brush the pile in the direction the product asks for, and keep drains clear. Do not park a vehicle on a cricket-box surface. Do not assume a garden hose replaces a blocked drain under the carpet. Standing water is a base problem.",
        ],
        [
          {
            question: "The surface holds water. Should the carpet be replaced?",
            answer: "Check the drain and the levels first. Replacing the pile on a surface that does not drain repeats the pond.",
          },
        ],
      ),
      m(
        "turf-mistakes",
        "Mistakes before the carpet arrives",
        [
          "Ordering from a pile photo, ignoring slope, and laying over a slab that has no outlet are the three that get expensive. Measure levels. Find the drain. Then choose the pile.",
        ],
        [
          {
            question: "Can the pile be chosen first?",
            answer: "You can look at samples. The order should wait until the base and the drain are understood.",
          },
        ],
      ),
    ],
  },
};

export function knowledgeForCategory(category: string): CategoryKnowledge {
  if (category === "Grills") return GRILL;
  if (category === "Nets") return NET;
  if (category === "Bird Control") return BIRD;
  return OTHER[category] ?? NET;
}
