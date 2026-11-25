import type { Recipe } from "../types";
import { u } from "../images";

export const fattoush: Recipe = {
  slug: "fattoush",
  title: "Fattoush Salad",
  arabic: "فتوش",
  category: "salads",
  summary: "A crunchy chopped salad with crisp pita chips and a tangy sumac–pomegranate dressing.",
  description:
    "Fattoush is the salad that makes use of yesterday's bread. Big chunks of cool, crunchy vegetables meet golden pita chips and a dressing that is sour from both lemon and sumac and a little sweet from pomegranate molasses. It is quick, forgiving and a perfect first Lebanese dish.",
  origin:
    "Fattoush is a peasant salad from northern Lebanon whose name comes from the Arabic 'fatt', meaning to crumble or break, after the broken bread in it. It is a fixture of the Ramadan table, when it is often served first to break the fast.",
  image: { src: u("photo-1688807450144-9d10de5eb913"), alt: "A white bowl filled with a chopped salad" },
  prepMinutes: 25,
  cookMinutes: 12,
  waitMinutes: 0,
  servings: 4,
  difficulty: "Easy",
  calories: 260,
  dietary: ["Vegetarian", "Vegan", "Dairy-Free", "Halal"],
  rating: 4.8,
  popularity: 6,
  featured: true,
  equipment: ["baking-sheet", "chef-knife", "cutting-board", "large-bowl", "salad-spinner", "measuring"],
  ingredients: [
    {
      title: "For the pita chips",
      items: [
        { id: "pita", name: "pita breads", qty: 2, unit: "", metric: { qty: 120, unit: "g" }, note: "day-old is best", aisle: "Bakery" },
        { id: "p-oil", name: "olive oil", qty: 2, unit: "tbsp", metric: { qty: 30, unit: "ml" }, aisle: "Pantry" },
        { id: "p-sumac", name: "sumac", qty: 0.5, unit: "tsp", metric: { qty: 1, unit: "g" }, aisle: "Spices" },
        { id: "p-salt", name: "fine sea salt", qty: 0.25, unit: "tsp", metric: { qty: 1, unit: "g" }, aisle: "Spices" },
      ],
    },
    {
      title: "For the salad",
      items: [
        { id: "romaine", name: "romaine heart", qty: 1, unit: "", metric: { qty: 250, unit: "g" }, aisle: "Produce" },
        { id: "tomatoes", name: "tomatoes", qty: 2, unit: "", metric: { qty: 300, unit: "g" }, note: "medium", aisle: "Produce" },
        { id: "cucumbers", name: "Persian cucumbers", qty: 3, unit: "", metric: { qty: 300, unit: "g" }, aisle: "Produce" },
        { id: "radishes", name: "radishes", qty: 5, unit: "", metric: { qty: 100, unit: "g" }, aisle: "Produce" },
        { id: "onions", name: "green onions", qty: 3, unit: "", metric: { qty: 45, unit: "g" }, aisle: "Produce" },
        { id: "pepper-g", name: "green bell pepper", qty: 0.5, unit: "", metric: { qty: 80, unit: "g" }, aisle: "Produce", optional: true },
        { id: "parsley", name: "flat-leaf parsley leaves", qty: 0.5, unit: "cup", metric: { qty: 15, unit: "g" }, aisle: "Produce" },
        { id: "mint", name: "fresh mint leaves", qty: 0.25, unit: "cup", metric: { qty: 8, unit: "g" }, aisle: "Produce" },
        { id: "purslane", name: "purslane (baqleh)", qty: 1, unit: "cup", metric: { qty: 40, unit: "g" }, aisle: "Produce", optional: true },
      ],
    },
    {
      title: "For the dressing",
      items: [
        { id: "garlic", name: "garlic", qty: 1, unit: "clove", metric: { qty: 4, unit: "g" }, note: "small, grated", aisle: "Produce" },
        { id: "lemon", name: "fresh lemon juice", qty: 3, unit: "tbsp", metric: { qty: 45, unit: "ml" }, aisle: "Produce" },
        { id: "molasses", name: "pomegranate molasses", qty: 1, unit: "tbsp", metric: { qty: 20, unit: "g" }, aisle: "Pantry" },
        { id: "sumac", name: "sumac", qty: 1, unit: "tbsp", metric: { qty: 7, unit: "g" }, aisle: "Spices" },
        { id: "dmint", name: "dried mint", qty: 0.5, unit: "tsp", metric: { qty: 1, unit: "g" }, aisle: "Spices" },
        { id: "salt", name: "fine sea salt", qty: 0.75, unit: "tsp", metric: { qty: 4, unit: "g" }, aisle: "Spices" },
        { id: "oil", name: "extra-virgin olive oil", qty: 0.33, unit: "cup", metric: { qty: 80, unit: "ml" }, aisle: "Pantry" },
      ],
    },
  ],
  steps: [
    {
      title: "Bake the pita chips",
      minutes: 15,
      timer: { label: "Bake pita chips", seconds: 10 * 60 },
      uses: [{ id: "pita" }, { id: "p-oil" }, { id: "p-sumac" }, { id: "p-salt" }],
      body: [
        "Heat the oven to 375°F (190°C). Tear or cut the pita into bite-size pieces, about 1 inch (2.5 cm). If your pitas have pockets, split them open into two thin layers first.",
        "Toss with the olive oil, sumac and salt on a baking sheet and spread out in one layer. Bake for 8–12 minutes, shaking the tray halfway.",
      ],
      cue: "Golden brown and completely crisp — they should snap, not bend, once they cool for a minute.",
      tip: "For the most traditional flavour, shallow-fry the pita in ½ inch of oil for 1–2 minutes instead. It is richer and stays crunchy longer in the dressing.",
      mistake: "Pulling them out while still pale in the centre. Soft spots turn soggy the moment they meet the dressing.",
    },
    {
      title: "Whisk the dressing",
      minutes: 3,
      uses: [{ id: "garlic" }, { id: "lemon" }, { id: "molasses" }, { id: "sumac" }, { id: "dmint" }, { id: "salt" }, { id: "oil" }],
      body: [
        "In the bottom of your large salad bowl, whisk the grated garlic, lemon juice, pomegranate molasses, sumac, dried mint and salt.",
        "Whisk in the olive oil until it comes together.",
      ],
      cue: "A deep ruby-brown dressing, glossy and slightly thick. It should taste very sour and a little sweet — stronger than you would eat on its own.",
      tip: "Making the dressing in the salad bowl itself means one less dish to wash.",
      mistake: "Using pomegranate juice instead of molasses. Molasses is thick, intensely tart and is what gives fattoush its signature taste.",
    },
    {
      title: "Chop the vegetables into big, chunky pieces",
      minutes: 15,
      uses: [{ id: "romaine" }, { id: "tomatoes" }, { id: "cucumbers" }, { id: "radishes" }, { id: "onions" }, { id: "pepper-g" }, { id: "parsley" }, { id: "mint" }, { id: "purslane" }],
      body: [
        "Wash and dry the lettuce and herbs. Cut the romaine into 1-inch (2.5 cm) ribbons.",
        "Cut the tomatoes into bite-size chunks, the cucumbers into half-moons about ¼ inch (5 mm) thick, and the radishes into thin slices. Slice the green onions and pepper. Leave parsley and mint leaves whole or roughly torn.",
      ],
      cue: "A colourful pile of chunky pieces you could pick up with a fork, unlike the fine chop of tabbouleh.",
      tip: "Dry the lettuce really well in a salad spinner. Water on the leaves stops the dressing sticking.",
      mistake: "Chopping everything tiny. Fattoush is meant to be chunky and crunchy.",
    },
    {
      title: "Toss and add the chips at the last moment",
      minutes: 2,
      body: [
        "Add the vegetables and herbs to the bowl with the dressing and toss well.",
        "Right before serving, add the pita chips, toss once more and sprinkle with a little extra sumac.",
      ],
      cue: "Glistening vegetables tinged red from sumac, with crisp golden chips scattered through.",
      tip: "Save a handful of chips to scatter on top so every serving has a crunchy bite.",
      mistake: "Adding the pita chips in advance. They go soggy within 15 minutes.",
    },
  ],
  video: { youtubeId: "2VwJwYxK5IM", creator: "Feelgoodfoodie", title: "Fattoush Salad // Best Lebanese Recipe" },
  videoSummary:
    "We start by turning pita into crisp chips seasoned with sumac. While they bake, we whisk the dressing right in the salad bowl: lemon, garlic, pomegranate molasses, plenty of sumac, dried mint, salt and olive oil. We chop romaine, tomatoes, cucumbers, radishes and green onions into generous chunks and add whole herb leaves. Everything gets tossed in the dressing, and the pita chips go in only at the very end so they stay crunchy.",
  notes: {
    substitutions: [
      "No pomegranate molasses? Use 2 tsp balsamic vinegar plus 1 tsp honey (not vegan) or maple syrup.",
      "No sumac? Add extra lemon zest and a little more lemon juice; the colour and flavour will be milder.",
      "Gluten-free: use toasted gluten-free pita or skip the bread and add crunchy toasted chickpeas.",
    ],
    storage: "Store undressed, chopped vegetables for up to 1 day and pita chips in an airtight container for up to 1 week. Dressing keeps 1 week in the fridge.",
    makeAhead: "Make the chips and the dressing a few days ahead. Chop the vegetables up to 4 hours ahead and keep them covered in the fridge. Toss just before eating.",
    serving: "Serve as a starter or alongside grilled meats, kibbeh or shawarma.",
    pairsWith: ["chicken-shawarma", "kafta", "baked-kibbeh", "shorbat-adas"],
  },
};
