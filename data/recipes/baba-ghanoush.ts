import type { Recipe } from "../types";
import { u } from "../images";

export const babaGhanoush: Recipe = {
  slug: "baba-ghanoush",
  title: "Baba Ghanoush",
  arabic: "متبّل / بابا غنوج",
  category: "mezze",
  summary: "Smoky charred eggplant whipped with tahini, lemon and garlic.",
  description:
    "This dip lives or dies by smoke. Eggplants are charred whole until they collapse, the soft flesh is drained so the dip is not watery, then mashed by hand with tahini and lemon. It is one of the easiest dishes on the site and teaches you a technique you will use again and again.",
  origin:
    "Outside Lebanon, 'baba ghanoush' usually means this smoky eggplant and tahini dip. In Lebanon itself the tahini version is usually called mutabbal, while baba ghanouj often refers to a chopped smoky eggplant salad with tomato, onion and pomegranate — so do not be surprised to see both names on a Beirut menu.",
  image: { src: u("photo-1767114915974-3481fa23cbb0"), alt: "An assortment of Middle Eastern dips with flatbread" },
  prepMinutes: 15,
  cookMinutes: 25,
  waitMinutes: 20,
  waitLabel: "Steaming and draining",
  servings: 6,
  difficulty: "Easy",
  calories: 150,
  dietary: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Halal"],
  rating: 4.7,
  popularity: 7,
  equipment: ["grill", "baking-sheet", "tongs", "large-bowl", "colander", "measuring"],
  ingredients: [
    {
      title: "For the dip",
      items: [
        { id: "eggplant", name: "large globe eggplants", qty: 2, unit: "", metric: { qty: 900, unit: "g" }, aisle: "Produce" },
        { id: "tahini", name: "tahini", qty: 0.33, unit: "cup", metric: { qty: 80, unit: "g" }, aisle: "Pantry" },
        { id: "lemon", name: "fresh lemon juice", qty: 3, unit: "tbsp", metric: { qty: 45, unit: "ml" }, aisle: "Produce" },
        { id: "garlic", name: "garlic", qty: 1, unit: "clove", metric: { qty: 5, unit: "g" }, note: "grated", aisle: "Produce" },
        { id: "salt", name: "fine sea salt", qty: 0.75, unit: "tsp", metric: { qty: 4, unit: "g" }, aisle: "Spices" },
      ],
    },
    {
      title: "For the topping",
      items: [
        { id: "oil", name: "extra-virgin olive oil", qty: 2, unit: "tbsp", metric: { qty: 30, unit: "ml" }, aisle: "Pantry" },
        { id: "pomegranate", name: "pomegranate seeds", qty: 2, unit: "tbsp", metric: { qty: 20, unit: "g" }, aisle: "Produce", optional: true },
        { id: "parsley", name: "flat-leaf parsley", qty: 1, unit: "tbsp", metric: { qty: 4, unit: "g" }, note: "chopped", aisle: "Produce" },
      ],
    },
  ],
  steps: [
    {
      title: "Char the eggplants until they collapse",
      minutes: 25,
      timer: { label: "Char eggplants", seconds: 20 * 60 },
      uses: [{ id: "eggplant" }],
      body: [
        "Prick each eggplant 4 or 5 times with a fork so steam can escape.",
        "Gas stove or grill: set the eggplants directly on the flame or grates over medium-high heat. Turn them with tongs every 4–5 minutes for 15–25 minutes.",
        "No flame? Put them on a foil-lined baking sheet 4 inches (10 cm) under a hot broiler and turn every 5 minutes for 25–30 minutes.",
      ],
      cue: "The skin is black, blistered and papery all over, the eggplant has slumped and wrinkled, and a knife slides into the thickest part like butter. It smells smoky, like a campfire.",
      tip: "Lay foil under the burner grate before you start — the eggplant drips and this saves a lot of cleaning.",
      mistake: "Stopping when only the skin is black. If the centre is still firm, the dip will be stringy and taste raw.",
      image: { src: u("photo-1528826007177-f38517ce9a8a"), alt: "A whole purple eggplant" },
    },
    {
      title: "Steam, peel and drain",
      minutes: 8,
      timer: { label: "Drain eggplant", seconds: 10 * 60 },
      body: [
        "Put the hot eggplants in a bowl and cover with a plate for 10 minutes. The steam loosens the skin.",
        "Split each eggplant open and scoop the flesh out with a spoon, leaving the charred skin behind. A few black flecks are good for flavour.",
        "Put the flesh in a colander over the sink for 10 minutes and let the bitter brown liquid drain away.",
      ],
      cue: "Soft, pale-gold flesh with smoky streaks, and a small puddle of brown liquid under the colander.",
      tip: "Pull out any large clusters of seeds — they can taste bitter.",
      mistake: "Skipping the draining. That liquid makes the dip watery and bitter.",
    },
    {
      title: "Mix the tahini dressing",
      minutes: 2,
      uses: [{ id: "tahini" }, { id: "lemon" }, { id: "garlic" }, { id: "salt" }],
      body: ["In a mixing bowl, stir the tahini, lemon juice, grated garlic and salt. It will thicken — that is normal."],
      cue: "A thick, pale paste that smells nutty and tangy.",
      tip: "Mixing the dressing first means it blends into the eggplant evenly.",
      mistake: "Adding water here. The eggplant brings plenty of moisture.",
    },
    {
      title: "Mash by hand",
      minutes: 4,
      body: [
        "Add the drained eggplant to the tahini mixture and mash with a fork until it is mostly creamy with some small pieces left.",
        "Taste with bread and add more lemon or salt if needed.",
      ],
      cue: "Creamy but with some texture and streaks of smoky eggplant. Light beige, and it holds a soft shape on a spoon.",
      tip: "Let it sit for 20 minutes before serving if you can. The smoke and garlic flavours deepen.",
      mistake: "Using a blender. It turns the dip gluey and loses the lovely texture.",
    },
    {
      title: "Plate and garnish",
      minutes: 2,
      uses: [{ id: "oil" }, { id: "pomegranate" }, { id: "parsley" }],
      body: ["Spread it on a plate with a swirl, pour the olive oil into the grooves, and scatter pomegranate seeds and parsley on top."],
      cue: "A soft swirl glistening with olive oil, flecked red and green.",
      tip: "Serve at room temperature for the fullest smoky flavour.",
      mistake: "Garnishing hours ahead — the pomegranate seeds bleed and the parsley wilts.",
    },
  ],
  video: { youtubeId: "ShUtJuzvwqo", creator: "The Cooking Foodie", title: "The Best Baba Ganoush Recipe" },
  videoSummary:
    "Everything starts with charring whole eggplants over an open flame or under the broiler until the skins are black and the insides collapse. We let them steam in a covered bowl, scoop out the soft flesh, and drain it for ten minutes so the dip is not watery or bitter. Then we stir tahini with lemon juice, garlic and salt, fold in the eggplant and mash it by hand for a creamy-but-textured dip, finished with olive oil, pomegranate and parsley.",
  notes: {
    substitutions: [
      "Creamier version: stir in 2 tbsp plain yogurt (no longer vegan or dairy-free).",
      "No open flame and want more smoke? Add ¼ tsp smoked paprika, though real charring is best.",
      "No tahini? Use extra olive oil and a spoonful of yogurt for a lighter, tahini-free eggplant dip.",
    ],
    storage: "Keeps 4 days in the fridge in an airtight container. Not suitable for freezing — it turns watery.",
    makeAhead: "Char and drain the eggplant up to 2 days ahead and keep it in the fridge. Mix with the tahini on the day.",
    serving: "Serve with warm pita, as part of a mezze spread, or as a sauce for grilled kafta and chicken.",
    pairsWith: ["kafta", "classic-creamy-hummus", "muhammara", "fattoush"],
  },
};
