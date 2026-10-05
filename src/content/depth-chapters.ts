/**
 * Extra stored chapters so a composed page can clear 1,500 words.
 * Technical manual text. No prices, no invented ratings, no town-name swapping.
 */

export interface DepthChapter {
  id: string;
  heading: string;
  paragraphs: string[];
}

function chapter(id: string, heading: string, paragraphs: string[]): DepthChapter {
  return { id, heading, paragraphs };
}

const GRILL: DepthChapter[] = [
  chapter("grill-manual-purpose", "What the cable line is for", [
    "An invisible grill is a cable infill. The cables run between a head fixing and a bottom fixing, or through a channel on each side, so the opening keeps its view and its airflow while a person cannot simply walk through the gap. The product is chosen when a household wants that infill to be slimmer than a traditional mild-steel grill. It is not chosen because a slogan said the balcony would become safe. The railing, the wall, or the slab edge still has to be sound. The cables do not repair cracked concrete, and they do not add the missing height if the existing guard is already too low.",
    "Read the opening before you read a catalogue. A balcony with a solid parapet needs a different top line from a balcony that has only a tubular handrail. A window needs the shutter path kept clear. A stair void needs the cables to follow the rake, not a rectangle traced off a photo. If those three cases are quoted as one square-foot rate, the quote is hiding the work. This manual stays on the decisions that change the specification: span, edge condition, whether any bay opens, grade of metal, and how the cables are terminated.",
  ]),
  chapter("grill-manual-measure", "Measurement that can be built from", [
    "Measure the clear width at the top, at mid-height, and at the bottom. Write all three numbers down. Openings in occupied buildings are often out of square by more than a cable diameter, and a channel cut to the widest figure will not sit on the narrow end. Measure the height from the finished floor, or from the sill, to the top fixing line, and note what that line actually is. A beam, a parapet, and a loose handrail are not interchangeable.",
    "Mark obstructions on the same sketch: split air-conditioner pipes, washing outlets, planter brackets, sliding tracks, and any shutter that crosses the line. Each one either moves the channel or forces a joint. If part of the bay must open for drying clothes or for a door, mark the clear width that panel needs before the material is cut. A panel that is designed after the channels are already made is how the latch side ends up with a gap. Take the measurements in millimetres. A rounded foot dimension is not accurate enough for a pre-cut channel.",
  ]),
  chapter("grill-manual-edges", "Edges, channels, and terminations", [
    "The cable is the part people notice. The channel, the end post, and the anchor are the parts that decide whether the line stays put. A channel spreads the pull along a sound edge. A row of small eyes screwed into plaster does not. Before any hole is drilled, the fixer should know the material behind the surface: dense concrete, brick, hollow block, or a thin steel flat. Hollow block needs a fixing that reaches something solid, or a different bracket that lands on the slab.",
    "Terminations are where cables slip. A swage, a ferrule, or a turnbuckle has to match the cable construction. Mixing a lightweight decorative terminal with a cable that will be leaned on is a common cheapening of the spec. The quote should name the termination, not only the word stainless. At corners, do not assume the cable can be bent around a tight radius and still hold an even gap. A corner post or a separate bay keeps the spacing the drawing showed on the straight run.",
  ]),
  chapter("grill-manual-use", "How the opening is used after fitting", [
    "A fixed bay and an openable bay are different assemblies. The fixed bay is cables in a channel. The openable bay is a frame with hinges or a slide, a latch, and a stop so the frame cannot be pushed past the cable line. Most balconies need one opening, not a row of doors. Decide that opening from how people actually pass: a bucket, a washing machine, a service door. Guessing the width on installation day wastes the frame.",
    "After handover, the household will clean, dry clothes, and sometimes hang things they should not hang. The cables are not a clothesline, not a swing, and not a support for a planter. Say that at handover. Also say that a slight settle in the first weeks is a reason to look at the terminations, not a reason to crank one turnbuckle until the channel bows. Over-tension pulls the anchor out of a weak edge. Even tension across the bay is the target.",
  ]),
  chapter("grill-manual-metal", "Metal grade without invented strength numbers", [
    "SS304 is the usual specification for cables and fittings on these jobs. It is an austenitic stainless family. Chromium is what lets the surface keep a protective film. SS316 is the upgrade when the opening stays wet or faces heavier corrosive splash. The grade is not a colour and not a strength certificate. A particular cable’s breaking load depends on its diameter, its construction, and the termination. Those numbers belong to the product being supplied. They are not printed here as if every brand were the same.",
    "Ask for the grade of the cable and the grade of the screws. A 304 cable held by ordinary mild-steel fasteners starts staining at the fastener. The middle of the wire will still look bright. That pattern is a materials mismatch, not proof that stainless cable fails in rain. Tea-staining also follows contamination and a lack of washing. A rinse with water and a mild detergent is the normal clean. Steel wool and abrasive powder scratch the surface and make the next stain easier.",
  ]),
  chapter("grill-manual-limits", "Limits, checks, and what the quote must list", [
    "This infill does not replace a structurally sound railing. It does not certify a balcony. It does not make an opening childproof, and no page on this site should say that it does. Children are still supervised. A determined climb is still a climb. The honest description is a cable grid across a measured opening, fixed to a sound edge, with a stated grade and a stated way of opening if any bay opens.",
    "The quote lists width and height as measured, the grade, which bay opens, the fixing type, and what is excluded. It does not list a single rate that pretends every floor, every railing, and every span are the same job. Society rules on drilling hours and facade colour are the household’s to clear before the material is cut. The installer can show a sample finish. The installer cannot grant permission the building has not given.",
  ]),
];

const NET: DepthChapter[] = [
  chapter("net-manual-use", "Name the use before the mesh", [
    "A net quote that only says nylon is incomplete. The use decides the mesh. A child or pet balcony net closes a fall path. A pigeon net closes a volume birds fly into, such as a duct, a shaft, or the space above an outdoor air-conditioner. A terrace or stair net follows a void that is larger and windier than a bedroom window. A debris net on a construction edge is a different product again. Using one mesh for all of those jobs is how the wrong hole size gets installed.",
    "The thing you are stopping has to be larger than the mesh opening, with a margin. A tighter mesh blocks more and holds more dust. A wider mesh is easier to see through and wrong when the gap must stop a smaller bird or a child’s hand. Write the use on the quote in words: child balcony, pet, pigeon duct, terrace, or stair. If two uses exist on the same flat, they are two lines. A pigeon net is not the child barrier. A child net is not a cricket net.",
  ]),
  chapter("net-manual-edge", "Borders, anchors, and the gaps people skip", [
    "Nets fail at the edge. A border rope or tape has to run the full perimeter and return to anchors in sound material. Tying the net to a loose railing wire loads the weakest object on the balcony. If the rail moves when you push it, the anchors move to the slab or the wall, or the rail is repaired first. Joints belong where one piece cannot cover the opening, and they are finished as overlaps with a border, not as a few cable ties across a fall path.",
    "The opening that matters is often not the rectangle in the photo. It is the triangle under a sloping handrail, the hole around a split-unit pipe, and the slit at the top of a duct. Measure those. A net that covers the tidy rectangle and leaves the pipe gap does not finish the job. Cut and re-border around the pipe, or add a small separate panel. A raw hole is an open edge. Also decide how the net will be washed later. A duct that can only be reached from a neighbour’s flat will not be maintained unless that access is agreed.",
  ]),
  chapter("net-manual-polymer", "Polymer, sun, and replacement", [
    "HDPE and nylon are both used for these meshes. They are different polymers. Both need a UV stabiliser if they face the sun, and the stabiliser slows ageing. It does not make the cord permanent. A net that has gone chalky, brittle, or torn at the knots is replaced. Washing does not put flexibility back into a degraded cord. Dust in the dry months adds weight and hides tears, so a rinse and a look at the borders is ordinary maintenance, not an extra product.",
    "Do not publish a year count for life. Sun, dust, polymer, mesh opening, and whether the border stays tight all change it. Do not patch a long tear with household tape. A small tie-off is only a stopgap before the next session if the net is a practice cage. On a balcony child net, an open tear is a reason to replace the panel before anyone relies on it. Grease over a kitchen duct is a separate load. Grease plus dust becomes a sheet. That sheet is cleaned while the cord is still flexible, and it is a replacement trigger once the cord has stiffened.",
  ]),
  chapter("net-manual-fit", "Fitting order and the limits of a mesh", [
    "The order is measure the true perimeter, choose the mesh for the named use, set anchors in sound material, tension the border, then close the corners. A net that is stapled first and pulled afterwards tears at the first anchor. Work at height needs a place to stand. A household ladder on a wet balcony is not a method statement. If the outside face of a duct needs a cradle or a long ladder, that access is written into the quote before the day.",
    "A net is not a railing and not a fall-arrest harness. It will not be described on this site as able to hold a running adult. It also will not stop pigeons if a corner gap remains. No price per square foot is printed, because area, access, mesh, and the number of pipes change the scope. When the household is really asking for a slim view across a railed balcony, the relevant product may be a cable grill instead. The survey should say which problem each product is for, so the cheaper word does not win by accident.",
  ]),
  chapter("net-manual-clean", "Cleaning, checks, and the information a quote needs", [
    "Brush dry dust off, then rinse. A hard brush on a tired cord finishes the tear. Do not use solvents. A strong jet at close range can pull a border off its anchors. A rinse is enough unless the fixing was specified to take more. Twice a year, walk the perimeter. Every edge should meet an anchor or a finished overlap. Red rust on a screw means the fastener is ordinary steel. A frayed border is replaced, not taped and forgotten.",
    "When you ask for a price, send the use, the width and height, the odd gaps, the floor, and how the installer reaches the outside. A photo of each edge is useful. A photo does not replace the measurement. If the duct opens into a neighbour’s light well, that neighbour’s access is arranged before the visit is booked. The written scope names the polymer, the UV note, whether the net is one piece, and what is excluded. Two quotes can be compared only when those lines match.",
  ]),
  chapter("net-manual-stairs", "Stairs, terraces, and pipes", [
    "Stair voids and terrace edges are larger spans. The border has to be continuous, and the anchors have to be in the slab or a sound wall, not in a tile alone. A net that crosses the walking line will be cut by the household. The closure follows the void. Stretching one rectangle across a stair and a balcony usually leaves a gap at the turn. Treat them as two closures when the geometry turns.",
    "Pipes and rails that already pass through the opening are part of the measurement, not a surprise. The net is split and re-bordered, or a sleeve panel is made. Leaving the cord raw against a hot split-unit line is a melt and a hole. Note the pipe diameter and whether the unit will be serviced, because a panel that cannot be opened for a filter clean will be sliced by the next technician. That operating need belongs on the sketch.",
  ]),
];

const BIRD: DepthChapter[] = [
  chapter("bird-manual-ledge", "Spikes follow the landing edge", [
    "A bird spike is a row of projections on a base, fixed where pigeons actually stand: a coping, a signboard top, an air-conditioner hood, a beam. The length of the job is the length of that edge. It is not the floor area of the flat. A square-foot rate for a spike job is the wrong unit and usually means the landing line was never walked. The strip has to sit on the line the birds use. A strip placed beside that line leaves the perch intact, and the birds return.",
    "Spikes do not close a balcony, a duct, or a shaft. Those are net jobs. Spikes do not replace a cable grill. If droppings are on a narrow coping, specify spikes. If birds are inside a light well, specify a net. If both are true, the quote has two lines. Selling a spike kit for a shaft wastes money and leaves the shaft open. The survey should point at the surface. A photo of the balcony floor is not a photo of the coping.",
  ]),
  chapter("bird-manual-fix", "Surface, adhesive, and screws", [
    "The base has to stay attached when the ledge is hot and then wet. Adhesive on dust, flaking paint, or a soft coping lets go. Clean back to a sound surface. Add screws where the substrate can take them. A plastic base and a stainless base are different products, and the quote should say which. Spikes that stand higher than the landing zone can be bent by a ladder or by someone leaning on them. The height is chosen for the bird, not for a dramatic silhouette.",
    "Outside faces of signboards and high parapets are not the same visit as a ground-floor sill. If a cradle or a long ladder is required, write it down before the day. Some ledges can be reached safely from inside. Many cannot. Do not promise an inside-only fit for an outside beam. Access is part of the specification because it changes the time and the method, even though this page still does not print a price.",
  ]),
  chapter("bird-manual-clear", "Nests, droppings, and upkeep", [
    "Spikes do not remove a nest that is already there. Clear the nest and the droppings first. Dry droppings should be wetted before they are lifted, so they are not brushed into the air. Then the strip goes on the landing line. The product does not poison birds and should not be described as if it did. It is a physical deterrent on one edge. Neighbouring ledges are a different job. Treating one coping does not empty the neighbourhood of pigeons.",
    "After the monsoon, look along the strip. A lifted base, a bent spike, or a gap between two lengths is a refix. Do not glue a loose section back onto the old failed adhesive. Clean the ledge again. Leaves and plastic bags caught in the spikes become a new perch and should be lifted off. If the birds have moved to the next untreated beam, that beam is a new measurement, not a complaint that the first strip failed.",
  ]),
  chapter("bird-manual-scope", "What belongs on the spike quote", [
    "Send the length of the landing edge if you know it, the material of that edge, the floor, and a photo taken along the ledge. Say whether a duct also needs a net. Those scopes should not be blended into one vague bird-control line. The written quote names the base material, whether the fixing is adhesive, screws, or both, and how the outside face will be reached.",
    "No bird count is promised. No phrase such as completely pigeon free belongs on the page. The treated edge is harder to stand on if the strip stays fixed and continuous. Untreated edges nearby remain available. That limit is the reason a survey walks the actual ledge instead of selling a box of spikes from a room photo. If the ledge is too narrow, too rounded, or too soft to hold a base, the survey says so and does not force the product.",
  ]),
  chapter("bird-manual-compare", "Spike, net, and grill are not substitutes", [
    "People ask for the cheapest of the three. The cheapest product on the wrong surface does not solve the complaint. A grill is a cable infill across an opening people use. A balcony net closes a gap or a fall path with mesh. A pigeon net closes a volume. A spike treats a narrow perch. Quoting them against each other as if they were the same safety item produces the wrong fit and a second visit.",
    "It is normal for one building to need two of them. A coping above a window may need spikes while the duct beside the toilet needs a net. The window itself may need a cable grill if the shutter line is what the household is worried about for children. The sketch should separate those three lines so the mesh grade is not stretched across the coping and the spike strip is not screwed across the duct.",
  ]),
  chapter("bird-manual-limits", "Limits of a ledge treatment", [
    "Spikes do not seal a building, do not stop nesting inside a false ceiling, and are not a health treatment. They do not replace cleaning. They do not make a legal claim about disease. They are a ledge treatment. If the complaint is noise from a tree, or birds on a neighbour’s tank, this product does not reach that place. Say so rather than extending the strip onto a surface it cannot hold.",
    "Warranty language, if any, belongs on the written quote for the fixing that was used. A glued strip on a dusty beam will not be described here as permanent. A screwed strip on sound concrete is a different specification. Because those conditions vary, this manual does not print a single life in years or a rate per foot. The survey is what turns the manual into a job.",
  ]),
];

const HANGER: DepthChapter[] = [
  chapter("hanger-manual-path", "The load path is the anchor", [
    "A cloth hanger is a rod, a pulley line, or a ceiling rack. People look at the pole. The pole is not the structural part. The anchor into the slab or the wall is the structural part. A gypsum false ceiling cannot take a pulley. The fixing has to reach the concrete above, or the product has to be a wall-mounted rod on a sound wall. Tile and a thin screed are not an anchor depth. The fastener length has to get past them into the structure.",
    "Say on the quote whether the fixing is ceiling or wall, and name the fastener. A count of rods without that line cannot be compared with another vendor’s count of rods. Also mark the clear width. The rod is cut to the distance between the real fixing points, not to a catalogue length that looked close in a photo.",
  ]),
  chapter("hanger-manual-type", "Pulley, rod, and rain", [
    "A pulley drops the line to a reachable height. It suits a high ceiling that is actually covered. A fixed rod has fewer moving parts and is often the better specification on a small balcony. An open balcony that takes rain will rust a mild-steel wheel and then jam the cord. If the balcony is uncovered, specify a corrosion-resistant wheel or do not use a pulley. A rod with no moving parts avoids that failure.",
    "Do not place the line across the walking path. People will cut it or bend it. Intermediate brackets belong on long spans, because a rod held only at the ends bows once it carries wet clothes. Each bracket has to land on the wall or the slab. Mark those positions before the rod is cut. A hanger is for clothes. It is not a swing, not a support for a dish antenna, and not a child gym.",
  ]),
  chapter("hanger-manual-care", "What fails after the first wash", [
    "A wobble is an anchor problem. Tightening a decorative end cap does not pull a loose wall plug back into brick. A squeak is usually the wheel. Look at whether rain reaches it. A frayed cord is replaced. Knotting it and pulling harder finishes the break over someone’s head. End stops should stay on so clothes do not slide off the rod.",
    "No kilogram rating is printed here. Capacity follows the anchor and the slab, which are checked on site. The usual mistakes are fixing into tile only, ignoring a false ceiling, crossing the walkway, and adding extra point loads. None of those are solved by a thicker decorative pole. The specification is the fixing, the span, and whether the balcony is wet.",
  ]),
  chapter("hanger-manual-quote", "Information that changes the hanger", [
    "Send ceiling or wall, the clear width, whether a false ceiling exists, and if the balcony is open to rain. A photo of the slab edge is more useful than a photo of the clothes. If a pulley is wanted, say who will use it and how high the slab is. If the ceiling is boarded, assume the pulley is refused until someone confirms the fixing can reach structure.",
    "The written scope lists the type, the metal of the rod and of the wheel if there is one, the number of brackets, and what is excluded. Compare two quotes on those lines. A lower number that omits brackets on a long span is not a saving. It is a rod that will bow.",
  ]),
  chapter("hanger-manual-install", "Order of fitting", [
    "Find the structure first. Probe or measure past the tile and the board. Mark bracket centres so the span between them is short enough for wet clothes. Drill into the structure, set the anchors, then offer up the rod or the pulley. Do not cut the rod to a hopeful length and then discover the end bracket lands on a conduit.",
    "Check the line is level enough to run, that the cord or rod does not meet a shutter, and that a person can still open the balcony door. Operate a pulley through a full cycle before leaving. Leave a note that the line is not a support for anything except clothes. That handover sentence prevents the most common misuse.",
  ]),
  chapter("hanger-manual-limits", "Limits", [
    "A hanger does not stiffen a balcony and does not act as a barrier. It should not be tied into a cable grill as if the grill could carry the drying load. Keep the two specifications separate. If the slab is too weak or too unknown for a ceiling anchor, stop and use a wall rod, or do not fit the product. Forcing a plug into unknown material is how the rod comes down later.",
    "There is no standard price on this page. Width, fixing type, and whether a pulley is justified all change the job. There is no promised life. Rain on a mild-steel wheel shortens it. A stainless rod on sound anchors is a different product from a plated rod in tile. The quote has to say which one is being supplied.",
  ]),
];

const SCREEN: DepthChapter[] = [
  chapter("screen-manual-track", "A zip screen is a blind in side tracks", [
    "The cloth or mesh stays in side tracks so wind does not turn it into a loose curtain. It is for sun, dust, and insects on a balcony or patio. It is not an invisible grill and it is not a safety net. It does not stop a fall. If the household asked for fall protection, stop and specify a cable grill or a balcony net. Fitting a screen in that role is a category error.",
    "Manual and motorised versions differ in the headbox and the power. A motor needs a supply at the head, a decision about the switch or remote, and a way to reach the motor later without destroying the pelmet. The quote separates cloth, tracks, and motor. A single package price that hides a motor which cannot be serviced is incomplete.",
  ]),
  chapter("screen-manual-opening", "The opening has to accept a track", [
    "Tracks need a flat reveal. Out-of-square openings are common. The narrowest width is the one that matters, because the headbox and the tracks are made square. If the reveal is too shallow, a face-fix frame is used and it sticks out. The household should see that on a sketch before it is ordered. A round column cannot take a track directly. It needs a flat face or a separate frame.",
    "Measure with any existing grill in mind. The track and the cables compete for the same edge. If a shutter or a sliding door crosses the reveal, mark its path. A screen that meets a latch is a screen that will be forced. Width, height, and reveal depth are the three numbers. A photo of the view is not one of them.",
  ]),
  chapter("screen-manual-cloth", "Cloth choice and wind", [
    "Vision mesh, a darker sunscreen, and a clearer fabric do not block the same light or the same rain. The quote names the cloth. A photo from another building is not a specification. Track colour is a separate line, because some buildings reject a track that does not match the frames. Do not assume the cloth is a storm shutter. Side tracks hold better than a free blind, and they are still not a structural wall.",
    "In high wind the screen should be retracted if the note for that cloth says so. A screen left down and drumming walks out of the track. This page does not print a wind class, because that class belongs to the product being supplied. In a power cut a motorised screen stays where it was unless that model has a manual override. The quote should say which.",
  ]),
  chapter("screen-manual-care", "Tracks, motors, and cloth care", [
    "Grit in the side track is the usual reason a manual screen sticks. Brush or vacuum the track. Do not oil it unless the installer said that track is meant to be oiled. Wash the cloth with water and mild soap. Solvents attack some coatings. If the cloth has left the zip, stop pulling. A tug tears the edge. The refit puts the cloth back in the track.",
    "Motors fail in the motor or the limit switch more often than the cloth fails. The headbox has to stay reachable. A loose adapter is not a permanent supply. If the screen sticks halfway, clear the tracks first, then look at the limits. Replacing the cloth before clearing grit repeats the jam.",
  ]),
  chapter("screen-manual-quote", "What the screen quote lists", [
    "List width, height, reveal depth, manual or motor, the cloth, and whether a grill already occupies the opening. Say balcony or patio. If the building controls the facade colour, the track finish is confirmed before manufacture. The scope also says what happens when the power is off, if a motor is included, and whether the pelmet can be opened.",
    "There is no flat rate on this page. A narrow window and a wide patio are different headboxes. A face-fix frame is a different extrusion from a reveal fit. Compare quotes only when those choices are written. A cheaper number that omits the motor, or that assumes a reveal you do not have, is not the same job.",
  ]),
  chapter("screen-manual-limits", "Limits of a tracked blind", [
    "The screen will not be described as waterproof unless the specific cloth is specified that way on the quote. It will not be described as a safety barrier. It will not be given an invented wind rating. Fabric batches differ. If an exact performance is required, it has to be the manufacturer’s note for the cloth that is actually ordered, attached to the quote.",
    "Limits also include the building. A screen that the society will not allow on the facade should not be manufactured first. Confirm the rule, then order. The installer can advise on colours that have been accepted elsewhere. The installer cannot overrule the building.",
  ]),
];

const DOOR: DepthChapter[] = [
  chapter("door-manual-role", "A mesh door is an insect screen", [
    "The frame holds a mesh across a doorway so the main door can stay open and insects stay out. It is not a security door. It is not a child gate unless the frame, the latch, and the mesh were specified and tested for that load. A light magnetic screen will not stop a dog. Say if a pet uses the door before the mesh is chosen. The bottom corner is where pets and feet meet the screen, and that is where a light mesh tears first.",
    "Hinged, sliding, and magnetic closes are different. Magnetic is convenient and weak. A hinged door with a latch is a positive close. A sliding door keeps the swing out of a narrow passage. Choose from how the doorway is used. A catalogue photo of a magnetic screen is not a decision for a house with a dog.",
  ]),
  chapter("door-manual-reveal", "Measure the clear opening", [
    "Measure the clear width and clear height with the main door open. The decorative slab is the wrong number. Reveal depth decides whether the mesh door can sit beside the main door. A swing that hits a switchboard is a measurement miss, and the swing direction has to be chosen on site before the frame is cut. Mark the swing on the floor with tape.",
    "A sliding door needs a straight track. A floor track collects water and grit. A top-hung panel avoids the floor track and needs a sound lintel. If the track is twisted, the panel drags. Do not plane the mesh to compensate. Realign the track or the hangers. The quote should say floor track or top-hung so two prices can be compared.",
  ]),
  chapter("door-manual-care", "Wear and repair", [
    "Keep a floor track clear. Lift a door that has dropped. A bent hinge throws the latch out of line. Realign the hinge before you replace the latch. Torn mesh is replaced as a panel if the frame is still square. Tape is not a repair on a hole a pet can push. Do not sand the mesh.",
    "The closer, if it is magnetic, weakens as a limit of the product, not as a surprise. If the household needs the door to stay shut against a pet or against wind, the specification should have been a latch. Changing from magnetic to hinged after manufacture is a new frame, not an adjustment.",
  ]),
  chapter("door-manual-quote", "Quote lines for a mesh door", [
    "Write clear width, clear height, reveal depth, hinged or sliding or magnetic, and whether a pet uses the opening. A photo with the main door open is the useful photo. The scope names the mesh and the frame material. It says it is an insect screen, not a security door, so the household is not buying a claim the product cannot keep.",
    "No rate is printed here. A single door and a pair of sliders are different frames. A pet-rated lower panel is an extra specification, not a free upgrade discovered after the tear. If that panel is required, it is a line. If it is excluded, the quote says excluded.",
  ]),
  chapter("door-manual-fit", "Fitting without fouling the main door", [
    "Hang or slide the mesh door so the main door still closes and the mesh door still closes. The two leaves need their own space in the reveal. If the reveal is too shallow for both, say so before manufacture and offer a different position, including a face frame if the household accepts the projection. Forcing both leaves into a shallow reveal bows the frame.",
    "Check the latch or the magnets with the main door open and closed. Check the bottom gap so insects are not given a slot and the panel does not scrape the floor. Leave the household with a sentence on cleaning the track and on not letting a pet use a magnetic screen as a gate.",
  ]),
  chapter("door-manual-limits", "Limits", [
    "Mesh doors do not provide forced-entry resistance. Do not describe them as security doors on the quote or on the page. They do not childproof a stair. They do not hold a large dog unless that load was the specification. Torn mesh and bent tracks are maintenance, not a reason to invent a longer life than the frame and the mesh can show.",
    "Colour batches and mesh grades vary by supplier. If a society wants a stated finish, match a sample before the frame is made. This manual does not name a fake standard or a fake price. The measurement and the close type are the specification.",
  ]),
];

const SPORTS: DepthChapter[] = [
  chapter("sports-manual-impact", "Practice nets are hit on purpose", [
    "A cricket or football practice net is an impact product. The mesh, the border, and the poles or the ceiling fixings take repeated hits. A balcony child net is not a cricket net. The lighter mesh tears, and the ball leaves the terrace. Specify a sports net for the sport, and say whether the job is one backstop or a full cage. A backstop is one face. A cage closes the sides and usually the top.",
    "Knotless mesh spreads impact without a hard knot against the ball. Knotted mesh is common and can be repaired in small tears. Neither word states the cord thickness. The quote names the mesh and the border. A line that only says cricket net is not a specification.",
  ]),
  chapter("sports-manual-structure", "Poles, sag, and the ceiling", [
    "Poles that are too far apart let the top rope sag into the hitting zone. Spacing is part of the cage, not a detail left to the day. Outdoor poles have to be anchored. A loose block is not a foundation. On a terrace, the base has to hold without pretending the tile is structure. Indoors, the ceiling fixing has to reach structure. A cage that sways is a fixing problem. Tightening the mesh does not stop the frame moving.",
    "Measure length, width, and height of the hitting zone, and note what sits behind the batter and the bowler. Glass, a neighbour below, and a parapet change whether a roof net is in scope. A stylish backstop that leaves the side open is unfinished if balls leave toward glass. The roof net is a line item when that path exists. It is not a default on every job.",
  ]),
  chapter("sports-manual-care", "Tears and misuse", [
    "Walk the border before a session. A tear at a pole tie grows. Tie it off only as a stopgap, and replace the panel if the cord has run. A hole in the hitting zone should not wait. Do not let people climb the net. It is not a playground frame, and the poles are not a swing set. Climbing loads the fixings in a direction they were not set for.",
    "Sun and dust age the cord the same way they age other outdoor meshes. There is still no year count on this page, because use dominates. A coaching cage used every evening is a different life from a home backstop used on weekends. The specification can be the same mesh and still wear differently. Say that when someone asks for a guaranteed life.",
  ]),
  chapter("sports-manual-quote", "Quote inputs for a cage", [
    "Send the sport, indoor or outdoor, the cage dimensions, and photos of the fixing points. Say backstop or full cage. Mention glass and the drop at the terrace edge. The scope lists mesh type, border, pole or ceiling frame, and whether a roof is included. Compare quotes on those lines. A lower price that omits the roof on a terrace above a neighbour is not comparable.",
    "No playing-standard certificate is printed here. No price per square foot is printed. Impact, span, and access change the job. If the terrace cannot take pole bases, the survey says the cage cannot be built as drawn, instead of drilling into a slab that was not checked.",
  ]),
  chapter("sports-manual-fit", "Setting the cage up", [
    "Set the supports first and check they do not move when you pull the top rope. Then attach the border, then tension so the hitting zone is free of sag. A net pulled tight against a leaning pole looks finished and is not. The pole has to be true before the mesh is used to hide it. Leave enough clearance that a person can enter without cutting a door into the mesh later.",
    "If an entry is required, make it a proper overlap or a framed opening, not a slit. A slit becomes the hole the ball finds. Mark the entry away from the main hitting line. Show the household which rope they must not untie to get a bag in.",
  ]),
  chapter("sports-manual-limits", "Limits", [
    "A practice net does not make a terrace a sports hall. It does not protect every window unless those faces are in the cage. It does not replace coaching supervision. Balls can still leave if a face is open. The drawing should show the open faces honestly.",
    "Balcony safety mesh stays off this specification. If the customer’s real problem is a child on a balcony, sell the balcony net or the cable grill. If the real problem is practice, sell the sports net. Mixing the names on one quote is how the light mesh ends up in the cage.",
  ]),
];

const TURF: DepthChapter[] = [
  chapter("turf-manual-base", "The base is the job", [
    "Cricket-box grass and similar surfaces fail in the base more often than in the pile photograph. Drainage, levels, and what the base is made of decide whether water ponds and whether seams open. A quote that only names a pile height is incomplete. Ask whether a base already exists, whether it drains, and whether it is level enough. A sloped terrace needs a drainage note before the carpet is ordered.",
    "Laying over a slab with no outlet repeats the pond under a new pile. Concrete can accept a surface when it drains and the levels are suitable. That is a site judgement. It is not a catalogue default. The quote should say who prepares the base. Supply-only carpet over an unprepared floor is a different job from a surfaced box.",
  ]),
  chapter("turf-manual-system", "Pile, infill, and seams", [
    "Some systems use infill. Some do not. Infill changes how the surface plays and how it drains. A shock pad, if it is in scope, is its own line. If the quote is supply-only, say that infill and the pad are excluded. Households compare two numbers that are not the same scope and then argue about the cheaper one.",
    "Seams should stay off the main running line when the layout allows. They are joined as the product requires, on a base that is not still damp. An open seam is usually the base or the joint, not the pile colour. Look at the base before you replace the whole carpet. The direction of the pile is set when the rolls are laid. Brushing later follows that direction. It does not invent a new one.",
  ]),
  chapter("turf-manual-place", "Indoor and outdoor boxes", [
    "Outdoor boxes take rain and sun. Indoor boxes take different wear and must not trap damp against a floor the building did not design as a wet area. The specification says which. A carpet that suited an open terrace can be the wrong build-up in a closed hall if the base cannot dry. Say where the box sits before the pile is chosen.",
    "Edges against walls and nets need a finish so the carpet does not curl into a trip. If a practice net will stand on the same floor, the pole bases and the carpet have to be designed together. A pole foot that punches the pile is a base detail, not a surprise after the glue has set.",
  ]),
  chapter("turf-manual-care", "Water, brushing, and misuse", [
    "Keep drains clear. Brush as the product asks. Do not park a vehicle on a cricket-box surface. Do not assume a garden hose replaces a blocked drain under the carpet. Standing water is a base problem. Replacing the pile on a surface that does not drain repeats the pond. If water sits, find the outlet and the levels first.",
    "No playing life in years is published. Use, UV, infill, and the base change it. A heavily used coaching box wears the pile faster than a seldom-used terrace. That is use, not a broken promise. Deep burns, oil, and heavy point loads are outside normal play and are assessed as damage, not as warranty poetry.",
  ]),
  chapter("turf-manual-quote", "What to send before the pile is ordered", [
    "Send length, width, indoor or outdoor, and whether a base exists. Photos of the drains matter more than a logo on a sample. Note the slope if you can feel it. The scope lists pile, whether infill is included, whether a shock pad is included, who builds the base, and how seams will run. Without those lines the price cannot be compared.",
    "Order the pile after the base and the drain are understood. Samples can be looked at earlier. Cutting the carpet before the outlet is confirmed is how offcuts get wasted on a surface that still ponds. If the area is not a simple rectangle, measure the notches. A rectangle drawn over an L-shaped terrace is the wrong area.",
  ]),
  chapter("turf-manual-limits", "Limits of a surfaced box", [
    "The surface is not a certified stadium system because a brochure used sporting language. It is a specified carpet and base for the use written on the quote. It does not correct a building that has no drainage. It does not make an indoor hall legal for an event. It does not include line marking, goals, or lighting unless those items are written.",
    "Seams, pile direction, and infill are maintenance as well as supply. A household that will not brush or will not keep the drain open should be told the surface will not stay as it looked on day one. That is a use limit, not a defect to be buried in adjectives. The survey writes the limit down.",
  ]),
];

const BY_CATEGORY: Record<string, DepthChapter[]> = {
  Grills: GRILL,
  Nets: NET,
  "Bird Control": BIRD,
  Hangers: HANGER,
  Screens: SCREEN,
  Doors: DOOR,
  Sports: SPORTS,
  Turf: TURF,
};

export function depthChaptersForCategory(category: string): DepthChapter[] {
  return BY_CATEGORY[category] ?? NET;
}

export function readingTheSpecification(serviceName: string, category: string): DepthChapter {
  return chapter("reading-the-specification", `How to read a ${serviceName} specification`, [
    `${serviceName} is specified after the opening is measured. The category is ${category.toLowerCase()}. A brochure photo is not a specification. The written quote is the specification. It should be possible to hand that quote to a second fitter and have them build the same job. If the quote only says premium ${serviceName.toLowerCase()} and a single number, it cannot be built from and it cannot be compared. Ask for the lines below before you accept the number.`,
    `Start with the opening. Width and height are recorded at more than one point because occupied buildings are rarely square. The quote repeats those figures and says which edge they were taken from: the clear opening, the outer frame, or the inside of an old grill. A single rounded foot dimension is not enough for a pre-cut part. Note the floor, because access changes the method even when the opening size stays the same. Note what the fixing surface is: concrete, brick, hollow block, tile over a slab, a steel railing, or a gypsum board that cannot take a load. The surface decides the anchor. The anchor is part of the product, not a free extra discovered on the day.`,
    `Name the material in words a second person can check. For metal, that means the grade of the visible part and the grade of the fasteners, not the word stainless on its own. For mesh, that means the polymer, whether it is UV-stabilised, and the use the mesh is meant for. For a tracked blind, that means the cloth and whether the unit is manual or motorised. For a turf surface, that means whether the base, the infill, and the pile are all in the price. If a line is missing, write excluded next to it. Two quotes are comparable only when the excluded lines match. A lower number that leaves out the base, the motor, the border rope, or the anchors is a different job.`,
    `Installation order belongs on the quote in plain language. Measure, check the surface, set the anchors, then fit, then inspect. Skipping the surface check is how a cable is fixed to a loose rail, a net is tied to a weak wire, a pulley is screwed into board, or a carpet is laid over a slab that does not drain. The fitter should be able to refuse a surface. That refusal is a result of the survey, not a delay. If part of the job opens — a balcony panel, a mesh door, a zip screen — the quote says which part opens, how wide, and how it latches. An opening designed after the parts are cut leaves a gap.`,
    `Handover is a check, not a speech. Tension or border continuity, latch or track operation, and anchor seating are looked at together. The household is told what the product does not do. A cable grill is not a new railing. A net is not a harness. A spike strip is not a sealed building. A mesh door is not a security door. A practice net is not a balcony child net. A turf carpet is not a certified stadium. Those limits stay on the page because they stop a specification being sold as a guarantee. No breaking load, no year of life, and no price per unit is printed in this manual, because those figures change with the product that is actually supplied and with the opening that was measured.`,
    `Keep the quote, the sketch, and the photographs together. When something is adjusted later — a slack cable, a lifted spike base, a torn mesh corner, a sticking track — the original lines show what was fitted. A repair that swaps the metal grade, the mesh use, or the fixing type is a new specification and should be written again. Cleaning is ordinary: water and a mild detergent on metal and mesh, tracks kept free of grit, drains kept open under a turf base. Abrasives, solvents, and steel wool are not maintenance. If a cord has gone brittle or a fastener is ordinary steel and staining, the part is replaced rather than painted over.`,
    `When you ask for the visit, send the city and the floor, the type of opening, the width and height if you have them, and a photograph of the fixing edge rather than of the view. Say if an old grill, an old net, or an old track is still in place, and if any part must open. Mention if the building restricts drilling hours or facade colour. The reply should come back as a scope. Accept the scope or correct it. Do not accept a rate that cannot be rebuilt from the lines above. That is the whole of the specification for ${serviceName.toLowerCase()}: a measured opening, a named material, a named fixing, a named use, and a written list of what is not included.`,
  ]);
}

