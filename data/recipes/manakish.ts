import type { Recipe } from "../types";
import { u } from "../images";

export const manakish: Recipe = {
  slug: "zaatar-manakish",
  title: "Za'atar Manakish",
  arabic: "منقوشة زعتر",
  category: "breads",
  summary: "Soft, chewy flatbreads topped with za'atar and olive oil — Lebanon's favourite breakfast.",
  description:
    "Manakish are what Lebanon eats for breakfast: warm, soft dough painted with a paste of za'atar and olive oil, baked until the edges blister. The dough is simple and forgiving, and this lesson shows you exactly how it should feel at every stage, so even a first-time bread maker can get it right.",
  origin:
    "The name comes from the Arabic for 'engraved', after the dimples pressed into the dough with fingertips. Traditionally families made the dough at home and carried it to the neighbourhood bakery to be baked in the communal oven; today manakish bakeries (furn) open at dawn across Lebanon.",
  image: { src: u("photo-1761315631999-6cf840d01e59"), alt: "A rustic flatbread with herb topping" },
  prepMinutes: 30,
  cookMinutes: 20,
  waitMinutes: 90,
  waitLabel: "Dough rising",
  servings: 6,
  servingsLabel: "flatbreads",
  difficulty: "Medium",
  calories: 430,
  dietary: ["Vegetarian", "Vegan", "Dairy-Free", "Halal"],
  rating: 4.8,
  popularity: 5,
  featured: true,
  equipment: ["large-bowl", "measuring", "rolling-pin", "baking-sheet", "kitchen-towels"],
  ingredients: [
    {
      title: "For the dough",
      items: [
        { id: "flour", name: "all-purpose flour", qty: 3, unit: "cup", metric: { qty: 375, unit: "g" }, note: "plus extra for dusting", aisle: "Pantry" },
        { id: "yeast", name: "instant yeast", qty: 2, unit: "tsp", metric: { qty: 6, unit: "g" }, aisle: "Pantry" },
        { id: "sugar", name: "sugar", qty: 1, unit: "tsp", metric: { qty: 4, unit: "g" }, aisle: "Pantry" },
        { id: "salt", name: "fine sea salt", qty: 1, unit: "tsp", metric: { qty: 6, unit: "g" }, aisle: "Spices" },
        { id: "water", name: "warm water", qty: 1.125, unit: "cup", metric: { qty: 270, unit: "ml" }, note: "about 105°F / 40°C", aisle: "Pantry" },
        { id: "d-oil", name: "olive oil", qty: 2, unit: "tbsp", metric: { qty: 30, unit: "ml" }, aisle: "Pantry" },
      ],
    },
    {
      title: "For the za'atar topping",
      items: [
        { id: "zaatar", name: "za'atar blend", qty: 0.5, unit: "cup", metric: { qty: 50, unit: "g" }, aisle: "Spices" },
        { id: "t-oil", name: "extra-virgin olive oil", qty: 0.5, unit: "cup", metric: { qty: 120, unit: "ml" }, aisle: "Pantry" },
      ],
    },
    {
      title: "For serving",
      items: [
        { id: "fresh", name: "tomatoes, cucumbers, mint and olives", qty: null, unit: "", aisle: "Produce", optional: true },
        { id: "labneh", name: "labneh", qty: null, unit: "", aisle: "Dairy", optional: true },
      ],
    },
  ],
  steps: [
    {
      title: "Mix the dough",
      minutes: 5,
      uses: [{ id: "flour" }, { id: "yeast" }, { id: "sugar" }, { id: "salt" }, { id: "water" }, { id: "d-oil" }],
      body: [
        "In a large bowl, whisk the flour, instant yeast, sugar and salt together.",
        "Pour in the warm water and olive oil and stir with a spoon, then your hand, until there is no dry flour left.",
      ],
      cue: "A shaggy, sticky dough with no dry patches. It will look rough — that is fine for now.",
      tip: "The water should feel comfortably warm on your wrist, like a baby's bath. Too hot kills the yeast.",
      mistake: "Adding lots of extra flour because it feels sticky. Slightly sticky dough makes softer bread.",
    },
    {
      title: "Knead until smooth",
      minutes: 8,
      timer: { label: "Knead dough", seconds: 8 * 60 },
      body: [
        "Tip the dough onto a lightly floured counter. Push it away from you with the heel of your hand, fold it back over itself, turn it a quarter turn and repeat.",
        "Keep going for about 8 minutes (or 5 minutes in a stand mixer with the dough hook on medium-low).",
      ],
      cue: "Smooth, soft and springy like an earlobe. When you poke it, the dent slowly fills back in.",
      tip: "If it sticks to your hands, oil them lightly instead of adding more flour.",
      mistake: "Stopping after 2–3 minutes. Under-kneaded dough tears when you roll it.",
    },
    {
      title: "Let it rise",
      minutes: 2,
      timer: { label: "First rise", seconds: 75 * 60 },
      body: ["Put the dough in an oiled bowl, turn it to coat, cover with a towel or plate and leave somewhere warm for 1 to 1½ hours."],
      cue: "Doubled in size, puffy and domed. A floured finger pressed in leaves a hole that barely springs back.",
      tip: "A switched-off oven with only the light on is a perfect warm spot.",
      mistake: "Going by the clock alone. In a cold kitchen it may need longer — go by how it looks.",
    },
    {
      title: "Mix the za'atar paste and heat the oven",
      minutes: 3,
      uses: [{ id: "zaatar" }, { id: "t-oil" }],
      body: [
        "Heat the oven to 475°F (245°C) with a large upside-down baking sheet (or a pizza stone) on the lowest rack. Let it heat for at least 20 minutes.",
        "Stir the za'atar and olive oil together in a small bowl.",
      ],
      cue: "A thick, glossy, spoonable paste — like loose pesto — that smells herby and lemony from the sumac.",
      tip: "If your za'atar is very dry and dusty, let the paste sit for 10 minutes; it will soften and taste better.",
      mistake: "Making the paste too dry. It burns in the oven instead of soaking into the dough.",
    },
    {
      title: "Divide and roll out the dough",
      minutes: 10,
      timer: { label: "Rest dough balls", seconds: 15 * 60 },
      body: [
        "Press the air out of the dough and cut it into 6 equal pieces. Roll each into a smooth ball, cover with a towel and rest 15 minutes so the dough relaxes.",
        "On a lightly floured surface, roll each ball into a round about 7–8 inches (18–20 cm) across and ¼ inch (5 mm) thick.",
      ],
      cue: "Even rounds that stay put when you lift the rolling pin, rather than shrinking back.",
      tip: "If a round keeps springing back, leave it for 5 more minutes and try again. The gluten just needs to relax.",
      mistake: "Rolling it too thin. Manakish should be soft and bready, not like a cracker.",
    },
    {
      title: "Dimple and spread the topping",
      minutes: 5,
      body: [
        "Place a round on a piece of parchment paper. Press your fingertips all over it to make deep dimples, leaving a plain ½-inch (1 cm) rim.",
        "Spoon about 1½ tablespoons of za'atar paste onto the dough and spread it into the dimples with the back of the spoon, staying inside the rim.",
      ],
      cue: "A dimpled, green-brown surface with oil pooled in the hollows and a clean pale edge all around.",
      tip: "The dimples (the 'engraving') stop the dough puffing up like a pita and hold the oil in place.",
      mistake: "Spreading the paste right to the edge. It drips off and burns on the tray.",
    },
    {
      title: "Bake hot and fast",
      minutes: 20,
      timer: { label: "Bake manakish", seconds: 8 * 60 },
      body: [
        "Slide the parchment with the manakish onto the hot baking sheet (two at a time if they fit). Bake for 7–9 minutes.",
        "Repeat with the rest. Stack baked manakish under a clean towel to keep them soft.",
      ],
      cue: "The rim is golden with a few darker blisters, the underside is light brown, and the topping is bubbling.",
      tip: "Bake on the lowest rack. The heat from below cooks the base properly before the za'atar has time to burn.",
      mistake: "Baking until the whole top is brown. The za'atar turns bitter — pull them when the edges are golden.",
    },
    {
      title: "Serve warm",
      minutes: 2,
      uses: [{ id: "fresh" }, { id: "labneh" }],
      body: ["Serve warm, folded in half, with sliced tomatoes, cucumbers, fresh mint, olives and a spoonful of labneh."],
      cue: "Soft enough to fold without cracking, with crisp edges.",
      tip: "Roll one up around labneh and cucumber — that is the classic Beirut breakfast.",
      mistake: "Leaving them uncovered. They dry out fast; keep them under a towel.",
    },
  ],
  video: { youtubeId: "08oqM3IurHU", creator: "Alphafoodie", title: "Manakish Za'atar, authentic Lebanese recipe" },
  videoSummary:
    "We mix a simple yeast dough with flour, water, olive oil, salt and a little sugar, knead it until it is smooth and springy, and let it double. Meanwhile the oven heats as hot as it goes with a baking sheet inside. We stir za'atar into olive oil to make a loose paste, divide the dough into six balls, rest them, and roll them into thick rounds. Then comes the signature move: pressing fingertips all over the dough before spreading the za'atar. They bake on the hot sheet for about eight minutes until the edges are golden.",
  notes: {
    substitutions: [
      "Active dry yeast: use the same amount, but first dissolve it in the warm water with the sugar and wait 10 minutes until foamy.",
      "Cheese manakish (jibneh): top with 1 cup shredded akkawi or a mix of mozzarella and feta instead of za'atar. Or do half and half ('nus w nus').",
      "Make your own za'atar: mix 3 tbsp dried thyme, 1 tbsp dried oregano, 1 tbsp sumac, 1 tbsp toasted sesame seeds and ¼ tsp salt.",
    ],
    storage: "Keep in a sealed bag at room temperature for 1 day, or freeze for up to 2 months. Reheat in a 350°F (175°C) oven for 4–5 minutes, sprinkled with a few drops of water.",
    makeAhead: "After kneading, the dough can rise slowly in the fridge overnight. Let it sit at room temperature for 45 minutes before dividing.",
    serving: "Breakfast or brunch with tea, labneh, tomatoes, cucumbers, mint and olives.",
    pairsWith: ["labneh", "classic-creamy-hummus", "shorbat-adas"],
  },
};
