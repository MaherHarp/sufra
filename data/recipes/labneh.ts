import type { Recipe } from "../types";
import { u } from "../images";

export const labneh: Recipe = {
  slug: "labneh",
  title: "Labneh with Olive Oil & Za'atar",
  arabic: "لبنة",
  category: "mezze",
  summary: "Thick, tangy strained yogurt cheese, drizzled with olive oil and za'atar. Two ingredients, almost no work.",
  description:
    "Labneh is yogurt that has been salted and hung until the whey drips out, leaving a rich, tangy spread somewhere between Greek yogurt and cream cheese. You will spend five minutes on it; the fridge does the rest. It is the perfect first recipe to build confidence.",
  origin:
    "Straining yogurt to make it last longer is an ancient Levantine practice, and labneh is a staple of the Lebanese breakfast table. Thicker labneh is rolled into balls and preserved in olive oil (labneh mkabbaleh) to keep through the winter.",
  image: { src: u("photo-1637949385133-3de79e927ef3"), alt: "A white bowl of thick creamy spread with olives" },
  prepMinutes: 10,
  cookMinutes: 0,
  waitMinutes: 1440,
  waitLabel: "Straining in the fridge",
  servings: 6,
  difficulty: "Easy",
  calories: 180,
  dietary: ["Vegetarian", "Gluten-Free", "Halal"],
  rating: 4.9,
  popularity: 8,
  equipment: ["fine-sieve", "cheesecloth", "large-bowl", "measuring"],
  ingredients: [
    {
      title: "For the labneh",
      items: [
        { id: "yogurt", name: "plain whole-milk yogurt", qty: 4, unit: "cup", metric: { qty: 1, unit: "kg" }, note: "with no gelatin or thickeners", aisle: "Dairy" },
        { id: "salt", name: "fine sea salt", qty: 1, unit: "tsp", metric: { qty: 6, unit: "g" }, aisle: "Spices" },
      ],
    },
    {
      title: "For serving",
      items: [
        { id: "oil", name: "extra-virgin olive oil", qty: 3, unit: "tbsp", metric: { qty: 45, unit: "ml" }, aisle: "Pantry" },
        { id: "zaatar", name: "za'atar", qty: 1, unit: "tbsp", metric: { qty: 6, unit: "g" }, aisle: "Spices" },
        { id: "mint", name: "fresh mint leaves", qty: null, unit: "", aisle: "Produce", optional: true },
        { id: "olives", name: "olives, cucumbers and warm pita", qty: null, unit: "", aisle: "Produce", optional: true },
      ],
    },
  ],
  steps: [
    {
      title: "Salt the yogurt",
      minutes: 2,
      uses: [{ id: "yogurt" }, { id: "salt" }],
      body: ["In a bowl, stir the salt into the yogurt until fully mixed."],
      cue: "Smooth, evenly salted yogurt with no lumps of salt.",
      tip: "The salt helps draw out the whey and seasons the labneh all the way through.",
      mistake: "Using yogurt with gelatin, pectin or starch in the ingredients. It will not drain properly.",
    },
    {
      title: "Line a sieve with cheesecloth",
      minutes: 3,
      body: [
        "Set a fine sieve over a deep bowl so there are at least 2 inches (5 cm) of space below it for the whey to drip into.",
        "Line the sieve with two layers of cheesecloth (or a clean, thin cotton tea towel or a paper coffee filter), letting the edges hang over.",
      ],
      cue: "A stable setup with the cloth hanging over all sides and space under the sieve.",
      tip: "Rinse the cheesecloth in water and wring it out first so it sits flat.",
      mistake: "Letting the sieve touch the bottom of the bowl. Once the whey rises, the yogurt sits in it and stops draining.",
    },
    {
      title: "Strain in the fridge",
      minutes: 2,
      timer: { label: "Strain labneh", seconds: 24 * 3600 },
      body: [
        "Spoon the salted yogurt into the cloth, fold the edges over the top, and put the whole setup in the fridge.",
        "Leave it for 12 hours for a soft, spreadable labneh, or 24 hours for a thicker one. Pour off the whey that collects in the bowl once or twice.",
      ],
      cue: "About half the volume has dripped out as pale yellow-green whey. The labneh is thick like cream cheese and holds its shape on a spoon.",
      tip: "Twist the top of the cloth into a bundle and set something light on it, like a small plate, to speed things up.",
      mistake: "Straining on the counter. Always strain in the fridge to keep it fresh and safe.",
    },
    {
      title: "Spread and finish",
      minutes: 3,
      uses: [{ id: "oil" }, { id: "zaatar" }, { id: "mint" }, { id: "olives" }],
      body: [
        "Scrape the labneh into a bowl and stir until smooth. Spread it on a plate and use the back of a spoon to make swirls and dips.",
        "Pour over the olive oil, sprinkle the za'atar and add a few mint leaves. Serve with olives, cucumbers and warm pita.",
      ],
      cue: "Bright white and creamy with olive oil pooling in the swirls and green-brown za'atar on top.",
      tip: "Use your best olive oil here — you will really taste it.",
      mistake: "Being shy with the olive oil. Lebanese labneh is served with a generous pour.",
    },
  ],
  video: { youtubeId: "bjdYOB551y0", creator: "Unicorns in the Kitchen", title: "Easy Homemade Labneh Recipe" },
  videoSummary:
    "Labneh takes two ingredients and a little patience. We stir salt into plain whole-milk yogurt, spoon it into a cheesecloth-lined sieve set over a deep bowl, fold the cloth over and leave it in the fridge for 12 to 24 hours while the whey drips out. The longer it hangs, the thicker it gets. To serve, we swirl it onto a plate and finish it with plenty of olive oil, za'atar and fresh mint.",
  notes: {
    substitutions: [
      "Greek yogurt: use the same amount and strain for only 6–8 hours, as it is already thick.",
      "Goat's milk yogurt makes a tangier, very traditional labneh.",
      "No cheesecloth? Use a clean, thin cotton tea towel, a nut-milk bag or two paper coffee filters.",
    ],
    storage: "Keeps 1–2 weeks in a sealed container in the fridge. For labneh balls, strain for 48 hours, roll into balls with oiled hands, chill until firm, then cover with olive oil in a jar; they keep for several months in the fridge.",
    makeAhead: "Labneh is a make-ahead food by nature. Make it 1–3 days before you need it.",
    serving: "Breakfast with manakish, olives and tea; part of a mezze spread; or dolloped on lentil soup.",
    pairsWith: ["zaatar-manakish", "muhammara", "shorbat-adas", "classic-creamy-hummus"],
  },
};
