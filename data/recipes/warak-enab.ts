import type { Recipe } from "../types";
import { u } from "../images";

export const warakEnab: Recipe = {
  slug: "warak-enab",
  title: "Warak Enab (Stuffed Grape Leaves)",
  arabic: "ورق عنب بزيت",
  category: "mezze",
  summary: "Tender grape leaves rolled around a lemony rice, tomato and herb filling, slow-cooked in olive oil.",
  description:
    "Rolling grape leaves is a family activity in Lebanon — put on some music or call a friend to help. This vegetarian version (bi zeit, 'with oil') is served cool as part of a mezze spread, and it gets better the next day. Every fold is explained below; after the first ten rolls you will have the rhythm.",
  origin:
    "Stuffed vine leaves are made from the Balkans to Iran, but the Lebanese bi zeit version is distinguished by its sharp lemon, generous olive oil and a fresh herb and tomato filling. A meatier version, warak enab bi lahmeh, is cooked over lamb chops and served hot as a main course.",
  image: { src: u("photo-1786174045070-be6a0da3a39d"), alt: "Stuffed grape leaves with lemon slices, tomato and lettuce in a white bowl" },
  prepMinutes: 75,
  cookMinutes: 75,
  waitMinutes: 30,
  waitLabel: "Cooling in the pot",
  servings: 8,
  difficulty: "Advanced",
  calories: 240,
  dietary: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Halal"],
  rating: 4.8,
  popularity: 13,
  equipment: ["large-bowl", "saucepan", "colander", "chef-knife", "cutting-board", "heavy-pot", "plate-weight"],
  ingredients: [
    {
      title: "For the leaves",
      items: [
        { id: "leaves", name: "jarred grape leaves in brine", qty: 1, unit: "jar", metric: { qty: 450, unit: "g" }, note: "16 oz jar, about 60 leaves", aisle: "Pantry" },
      ],
    },
    {
      title: "For the filling",
      items: [
        { id: "rice", name: "short- or medium-grain rice (Egyptian or Calrose)", qty: 1, unit: "cup", metric: { qty: 200, unit: "g" }, aisle: "Pantry" },
        { id: "tomatoes", name: "tomatoes", qty: 2, unit: "", metric: { qty: 300, unit: "g" }, note: "medium, finely diced", aisle: "Produce" },
        { id: "parsley", name: "flat-leaf parsley", qty: 1.5, unit: "cup", metric: { qty: 45, unit: "g" }, note: "finely chopped", aisle: "Produce" },
        { id: "mint", name: "fresh mint", qty: 0.25, unit: "cup", metric: { qty: 8, unit: "g" }, note: "finely chopped", aisle: "Produce" },
        { id: "onions", name: "green onions", qty: 4, unit: "", metric: { qty: 60, unit: "g" }, note: "finely sliced", aisle: "Produce" },
        { id: "f-oil", name: "extra-virgin olive oil", qty: 0.25, unit: "cup", metric: { qty: 60, unit: "ml" }, aisle: "Pantry" },
        { id: "f-lemon", name: "fresh lemon juice", qty: 0.25, unit: "cup", metric: { qty: 60, unit: "ml" }, aisle: "Produce" },
        { id: "salt", name: "fine sea salt", qty: 1.5, unit: "tsp", metric: { qty: 9, unit: "g" }, aisle: "Spices" },
        { id: "dmint", name: "dried mint", qty: 1, unit: "tsp", metric: { qty: 1, unit: "g" }, aisle: "Spices" },
        { id: "seven", name: "Lebanese seven spice", qty: 0.5, unit: "tsp", metric: { qty: 1, unit: "g" }, aisle: "Spices" },
        { id: "pepper", name: "black pepper", qty: 0.5, unit: "tsp", metric: { qty: 1, unit: "g" }, aisle: "Spices" },
      ],
    },
    {
      title: "For the pot",
      items: [
        { id: "potato", name: "potato or 2 tomatoes, sliced into rounds", qty: 1, unit: "", metric: { qty: 250, unit: "g" }, note: "large", aisle: "Produce" },
        { id: "p-oil", name: "extra-virgin olive oil", qty: 0.25, unit: "cup", metric: { qty: 60, unit: "ml" }, aisle: "Pantry" },
        { id: "p-lemon", name: "fresh lemon juice", qty: 0.25, unit: "cup", metric: { qty: 60, unit: "ml" }, aisle: "Produce" },
        { id: "p-water", name: "hot water", qty: 1.5, unit: "cup", metric: { qty: 350, unit: "ml" }, aisle: "Pantry" },
        { id: "p-salt", name: "fine sea salt", qty: 0.5, unit: "tsp", metric: { qty: 3, unit: "g" }, aisle: "Spices" },
      ],
    },
  ],
  steps: [
    {
      title: "Rinse and soften the grape leaves",
      minutes: 10,
      uses: [{ id: "leaves" }],
      body: [
        "Carefully unroll the leaves from the jar and put them in a colander. Rinse under cold water to remove the brine.",
        "Bring a saucepan of water to a boil, drop in the leaves, and boil for 2 minutes. Drain, rinse with cold water and leave in the colander to drain. Snip off any stems with scissors.",
      ],
      cue: "Soft, pliable, olive-green leaves that fold without cracking and no longer taste very salty.",
      tip: "Sort the leaves into three piles: perfect medium ones for rolling, very large ones to cut in half, and torn ones for lining the pot.",
      mistake: "Skipping the rinse. Brined leaves are very salty and will over-season the dish.",
      image: { src: u("photo-1784043436733-6c567dc133bc"), alt: "A pile of fresh vine leaves" },
    },
    {
      title: "Make the raw rice filling",
      minutes: 15,
      uses: [{ id: "rice" }, { id: "tomatoes" }, { id: "parsley" }, { id: "mint" }, { id: "onions" }, { id: "f-oil" }, { id: "f-lemon" }, { id: "salt" }, { id: "dmint" }, { id: "seven" }, { id: "pepper" }],
      body: [
        "Rinse the rice in a sieve until the water runs clear, then drain well.",
        "In a large bowl, mix the rice with the diced tomatoes and their juice, parsley, mint, green onions, olive oil, lemon juice, salt, dried mint, seven spice and pepper.",
      ],
      cue: "A wet, juicy, colourful mixture with the rice still raw and hard. It should taste bright, salty and strongly lemony — over-seasoned, because the rice will absorb it.",
      tip: "Do not cook the rice first. It cooks inside the leaves and soaks up all the flavour.",
      mistake: "Draining away the tomato juice. That liquid is what flavours the rice as it cooks.",
    },
    {
      title: "Roll the grape leaves",
      minutes: 50,
      body: [
        "Lay one leaf on the board shiny side down, veins facing up, with the stem end closest to you.",
        "Put a heaped teaspoon of filling in a short line just above the stem. Fold the bottom of the leaf up over the filling, then fold in the left and right sides like an envelope.",
        "Roll away from you tightly, keeping the sides tucked in, to make a neat cigar about the size of your finger. Put it seam-side down on a tray. Repeat with the rest.",
      ],
      cue: "Firm, even rolls about 3 inches (7–8 cm) long and as thick as your finger, that do not unroll when set down seam-side down.",
      tip: "Use only a little filling. The rice swells as it cooks, and overstuffed rolls burst.",
      mistake: "Rolling too loosely. Loose rolls unravel in the pot and the filling escapes.",
      image: { src: u("photo-1759679134771-835a874351fe"), alt: "Hands arranging stuffed grape leaves in a pot" },
    },
    {
      title: "Line the pot and pack the rolls",
      minutes: 10,
      uses: [{ id: "potato" }],
      body: [
        "Lay the potato (or tomato) slices over the bottom of a heavy pot, then cover them with any torn leftover leaves. This stops the rolls burning.",
        "Pack the rolls seam-side down in tight circles, working from the outside in, with no gaps. Start a second layer going the opposite direction if needed.",
      ],
      cue: "Snug layers with no space between rolls, so nothing can move or float.",
      tip: "Tight packing is what keeps the rolls from unwrapping as the rice swells.",
      mistake: "Skipping the potato layer. The bottom rolls stick and scorch.",
    },
    {
      title: "Add the liquid and weigh them down",
      minutes: 3,
      uses: [{ id: "p-oil" }, { id: "p-lemon" }, { id: "p-water" }, { id: "p-salt" }],
      body: [
        "Mix the olive oil, lemon juice, hot water and salt and pour it over the rolls.",
        "Place a heat-safe plate upside down directly on top of the rolls to weigh them down. Add more hot water if needed so the liquid just reaches the plate.",
      ],
      cue: "The liquid comes up to the top layer of rolls and the plate sits flat, holding everything in place.",
      tip: "The plate is the secret weapon — it stops the rolls bobbing and unrolling.",
      mistake: "Drowning the rolls in water. Too much liquid makes the rice mushy.",
    },
    {
      title: "Simmer gently",
      minutes: 75,
      timer: { label: "Simmer grape leaves", seconds: 70 * 60 },
      body: [
        "Cover the pot, bring to a boil over medium heat, then turn it to low. Simmer gently for 60–75 minutes.",
        "Check after 60 minutes: lift the plate, take out a roll and taste it.",
      ],
      cue: "The rice inside is completely tender with no hard bite, the leaves are soft enough to cut with a fork, and most of the liquid is absorbed.",
      tip: "If the pot looks dry before the rice is cooked, add ½ cup of hot water down the side.",
      mistake: "Simmering on high. The bottom burns and the rolls split.",
    },
    {
      title: "Cool in the pot, then serve",
      minutes: 5,
      timer: { label: "Cool in the pot", seconds: 30 * 60 },
      body: [
        "Turn off the heat and leave the rolls to cool in the pot, with the plate still on top, for at least 30 minutes. They firm up as they cool.",
        "Lay a large platter upside down over the pot and flip it over in one confident move, or lift the rolls out gently with a spoon. Serve at room temperature with lemon wedges.",
      ],
      cue: "Glossy, tightly wrapped rolls that hold their shape and taste tangy, herby and rich with olive oil.",
      tip: "They taste even better the next day, served cool from the fridge with a fresh squeeze of lemon.",
      mistake: "Moving them while hot. Hot rolls are fragile and fall apart.",
    },
  ],
  video: { youtubeId: "S-cgvS4h4sY", creator: "Eva's Lebanese Cooking", title: "Lebanese Stuffed Grape Leaves Recipe" },
  videoSummary:
    "We rinse and blanch jarred grape leaves to soften them and wash off the brine, then mix a raw rice filling with diced tomato, parsley, mint, green onion, olive oil, lemon and spice. Each leaf is laid shiny-side down, filled with a little line of rice, folded like an envelope and rolled tight. We line a pot with potato slices, pack the rolls snugly in circles, pour over lemon, oil and water, weigh them down with a plate and simmer gently for about an hour, then let them cool in the pot before serving.",
  notes: {
    substitutions: [
      "Fresh grape leaves: use young, tender leaves, blanched for 1–2 minutes in salted boiling water.",
      "Meat version (bi lahmeh): replace half the rice with ½ lb (225 g) ground lamb or beef, skip the tomatoes and line the pot with lamb chops. Serve hot.",
      "No green onions? Use ½ small yellow onion, very finely chopped.",
    ],
    storage: "Keeps 5 days in the fridge in a container with a little of the cooking liquid. Freezes for 2 months, though the leaves soften slightly.",
    makeAhead: "Make them 1–2 days ahead; the flavour improves. Serve cool or at room temperature.",
    serving: "Serve as part of a mezze spread with lemon wedges, plain yogurt or labneh, hummus and tabbouleh.",
    pairsWith: ["classic-creamy-hummus", "tabbouleh", "labneh", "baba-ghanoush"],
  },
};
