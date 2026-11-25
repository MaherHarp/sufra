import type { Recipe } from "../types";
import { u } from "../images";

export const hummus: Recipe = {
  slug: "classic-creamy-hummus",
  title: "Classic Creamy Hummus",
  arabic: "حمص بطحينة",
  category: "mezze",
  summary: "Silky, lemony hummus made from dried chickpeas — the dish every Lebanese meal starts with.",
  description:
    "Real Lebanese hummus is smoother, brighter and lighter than most store-bought tubs. The secret is not a gadget: it is chickpeas cooked until they almost fall apart, a tahini base whipped with ice water, and patience at the food processor. Make it once and you will never buy it again.",
  origin:
    "Hummus bi tahini (chickpeas with tahini) has been eaten across the Levant for centuries, and in Lebanon it sits on nearly every mezze table. Lebanese cooks prize it smooth and pale, finished with a pool of olive oil rather than heavy spice.",
  image: { src: u("photo-1637949385162-e416fb15b2ce"), alt: "A bowl of creamy hummus with a garnish on top" },
  prepMinutes: 20,
  cookMinutes: 75,
  waitMinutes: 720,
  waitLabel: "Overnight soak",
  servings: 6,
  difficulty: "Easy",
  calories: 290,
  dietary: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Halal"],
  rating: 4.9,
  popularity: 1,
  featured: true,
  equipment: ["large-pot", "food-processor", "colander", "citrus-juicer", "measuring"],
  ingredients: [
    {
      title: "For the chickpeas",
      items: [
        { id: "chickpeas", name: "dried chickpeas", qty: 1, unit: "cup", metric: { qty: 200, unit: "g" }, aisle: "Pantry" },
        { id: "soda", name: "baking soda", qty: 1, unit: "tsp", metric: { qty: 5, unit: "g" }, note: "for cooking, not soaking", aisle: "Pantry" },
      ],
    },
    {
      title: "For the hummus",
      items: [
        { id: "lemon", name: "fresh lemon juice", qty: 0.25, unit: "cup", metric: { qty: 60, unit: "ml" }, note: "plus more to taste", aisle: "Produce" },
        { id: "garlic", name: "garlic", qty: 1, unit: "clove", metric: { qty: 5, unit: "g" }, aisle: "Produce" },
        { id: "salt", name: "fine sea salt", qty: 1, unit: "tsp", metric: { qty: 6, unit: "g" }, aisle: "Spices" },
        { id: "tahini", name: "tahini", qty: 0.5, unit: "cup", metric: { qty: 120, unit: "g" }, note: "stirred well", aisle: "Pantry" },
        { id: "ice", name: "ice water", qty: 5, unit: "tbsp", metric: { qty: 75, unit: "ml" }, aisle: "Pantry" },
        { id: "cumin", name: "ground cumin", qty: 0.25, unit: "tsp", metric: { qty: 1, unit: "g" }, aisle: "Spices", optional: true },
      ],
    },
    {
      title: "For the topping",
      items: [
        { id: "oil", name: "extra-virgin olive oil", qty: 2, unit: "tbsp", metric: { qty: 30, unit: "ml" }, aisle: "Pantry" },
        { id: "paprika", name: "paprika or sumac", qty: 1, unit: "pinch", aisle: "Spices" },
        { id: "parsley", name: "flat-leaf parsley", qty: 1, unit: "tbsp", metric: { qty: 4, unit: "g" }, note: "chopped", aisle: "Produce" },
      ],
    },
    {
      title: "For serving",
      items: [
        { id: "pita", name: "warm pita bread", qty: 4, unit: "", aisle: "Bakery" },
        { id: "veg", name: "cucumbers, radishes and pickles", qty: null, unit: "", aisle: "Produce", optional: true },
      ],
    },
  ],
  steps: [
    {
      title: "Soak the chickpeas overnight",
      minutes: 5,
      timer: { label: "Soak chickpeas", seconds: 12 * 3600 },
      uses: [{ id: "chickpeas" }],
      body: [
        "Tip the dried chickpeas onto a plate and pick out any shrivelled ones or tiny stones. Rinse them in a colander.",
        "Put them in a large bowl and cover with at least 3 inches (8 cm) of cold water — they will double in size. Leave them on the counter for 12 hours, or overnight.",
      ],
      cue: "After soaking, the chickpeas are twice as big, plump and smooth-skinned. If you bite one it is firm but no longer rock-hard.",
      tip: "Start this the night before when you clean up after dinner. Tomorrow's hummus is then mostly hands-off.",
      mistake: "Using too little water. The chickpeas drink it up and the top layer stays dry and hard.",
      image: { src: u("photo-1767875816994-88dd9d05ce2f"), alt: "A bowl of dried chickpeas" },
    },
    {
      title: "Cook the chickpeas until very soft",
      minutes: 75,
      timer: { label: "Simmer chickpeas", seconds: 60 * 60 },
      uses: [{ id: "soda" }],
      body: [
        "Drain the soaked chickpeas and rinse them. Put them in a large pot with the baking soda and stir over medium heat for 2–3 minutes. The baking soda helps the skins break down, which is what makes hummus silky.",
        "Pour in enough cold water to cover by 3 inches (8 cm). Bring to a boil, then lower the heat so it bubbles gently. Skim off the foam and any skins that float to the top with a spoon.",
        "Simmer for 60–90 minutes, topping up with hot water if they peek out. Start checking at 60 minutes.",
      ],
      cue: "A chickpea squashes completely between your thumb and finger with no resistance and no grainy centre. Many skins will be floating. This is softer than you would cook them for a salad — that is correct.",
      tip: "Save 1 cup of the cooking water before draining. A splash of it rescues hummus that ends up too thick.",
      mistake: "Stopping when the chickpeas are merely 'cooked'. Al dente chickpeas make gritty hummus no matter how long you blend.",
    },
    {
      title: "Drain and set aside a few for the top",
      minutes: 5,
      body: [
        "Drain the chickpeas in a colander and shake off the water. Set aside a small handful of the best-looking whole ones for decoration.",
        "Use the rest while they are still warm. Warm chickpeas blend much smoother than cold ones.",
      ],
      cue: "The chickpeas are steaming and soft, and some have slipped out of their skins.",
      tip: "For extra-smooth hummus, rub handfuls of chickpeas between your palms in a bowl of water; the loose skins float and can be poured off. It is optional with this method.",
      mistake: "Letting the chickpeas go cold in the fridge before blending. They firm up and blend grainy.",
    },
    {
      title: "Make the lemon–garlic base",
      minutes: 6,
      timer: { label: "Let garlic mellow in lemon", seconds: 5 * 60 },
      uses: [{ id: "lemon" }, { id: "garlic" }, { id: "salt" }],
      body: [
        "Put the lemon juice, peeled garlic clove and salt in the food processor. Blend for 30 seconds, until the garlic is finely chopped.",
        "Leave it to sit for 5 minutes. The lemon tames the raw bite of the garlic so it tastes fresh rather than harsh.",
      ],
      cue: "Cloudy lemon juice with tiny flecks of garlic, smelling sharp and bright.",
      tip: "Lebanese hummus uses only a little garlic. You can always add more at the end; you cannot take it out.",
      mistake: "Putting everything in at once. Blending garlic straight into thick tahini leaves raw chunks behind.",
    },
    {
      title: "Whip the tahini with ice water",
      minutes: 4,
      uses: [{ id: "tahini" }, { id: "ice", part: 0.6 }],
      body: [
        "Add the tahini to the lemon mixture and blend for 1 minute. It will turn thick, pale and almost stiff — this is normal and it means it is working.",
        "With the machine running, pour in the ice water a tablespoon at a time and keep blending until it loosens again.",
      ],
      cue: "Smooth, creamy and pale beige, like thick mayonnaise. It should hold a soft shape on a spoon.",
      tip: "Stir the jar of tahini really well before measuring. The oil separates on top and the solid paste at the bottom is too dry on its own.",
      mistake: "Panicking when the tahini seizes and goes clumpy. Keep going and add the ice water — it always comes back.",
    },
    {
      title: "Blend in the warm chickpeas — for longer than you think",
      minutes: 5,
      timer: { label: "Blend hummus", seconds: 4 * 60 },
      uses: [{ id: "chickpeas" }, { id: "ice", part: 0.4 }, { id: "cumin" }],
      body: [
        "Add the warm chickpeas (and cumin, if using) to the food processor. Blend for 2 full minutes.",
        "Stop, scrape down the sides and bottom with a spatula, then blend for another 2 minutes. If it looks stiff, add the rest of the ice water one spoonful at a time.",
      ],
      cue: "Completely smooth and creamy, with no chunks or grit when you rub a little between your fingers. It should fall off the spoon in a thick, soft ribbon.",
      tip: "Use a timer for this step. Four minutes feels long, but it is the single biggest difference between homemade and restaurant hummus.",
      mistake: "Adding olive oil to the blender to thin it. It makes hummus heavy and greasy; ice water keeps it light.",
    },
    {
      title: "Taste and adjust",
      minutes: 2,
      body: [
        "Taste with a piece of bread, not a spoon — that is how you will eat it.",
        "Needs more brightness? Add lemon. Tastes flat? A pinch of salt. Too thick? A spoonful of chickpea cooking water. Blend 10 seconds after each change.",
      ],
      cue: "Nutty from tahini, clearly lemony, gently savoury, with only a whisper of garlic.",
      tip: "Hummus thickens as it cools, so leave it slightly looser than you want to serve it.",
      mistake: "Adding lots of salt at once. Add a pinch, blend, taste again.",
    },
    {
      title: "Plate it the Lebanese way",
      minutes: 3,
      uses: [{ id: "oil" }, { id: "paprika" }, { id: "parsley" }],
      body: [
        "Spoon the hummus onto a shallow plate. Hold a spoon on top and turn the plate with your other hand to make a swirl with a raised rim and a well in the middle.",
        "Pour the olive oil into the well, scatter over the reserved chickpeas, a pinch of paprika or sumac and the parsley. Serve with warm pita and crunchy vegetables.",
      ],
      cue: "A smooth swirl with a golden pool of olive oil in the middle and a few whole chickpeas on top.",
      tip: "Serve the hummus at room temperature. Straight from the fridge it tastes muted.",
      mistake: "Skipping the olive oil on top. It is not decoration — it is part of the flavour.",
      image: { src: u("photo-1637949907734-d5583aa35b41"), alt: "A bowl of hummus with whole chickpeas on the side" },
    },
  ],
  video: { youtubeId: "WQlMXudBGT4", creator: "Inspired Taste", title: "How to Make Hummus That's Better Than Store-Bought" },
  videoSummary:
    "We start the night before by soaking dried chickpeas, then simmer them with a little baking soda until they are softer than you would ever cook them for a salad. While they are still warm we build the hummus in layers: lemon, garlic and salt first so the garlic mellows; then tahini, which seizes and turns stiff until we whip in ice water; and finally the chickpeas, blended for a full four minutes with a scrape-down halfway. We taste on bread, adjust lemon and salt, and plate it in a swirl with a pool of olive oil.",
  notes: {
    substitutions: [
      "In a hurry? Use two 15-oz (425 g) cans of chickpeas, drained and rinsed. Simmer them for 15 minutes with ½ tsp baking soda until very soft, then carry on from step 3.",
      "No tahini? There is no true substitute for hummus bi tahini. Smooth natural peanut or sunflower-seed butter works in a pinch, but the flavour will be different.",
      "No food processor? A high-speed blender works; add the ice water a little earlier so the blades keep moving.",
    ],
    storage: "Keeps 4–5 days in an airtight container in the fridge with a thin film of olive oil on top. Freezes for up to 3 months; thaw overnight in the fridge and stir well.",
    makeAhead: "Cook the chickpeas up to 3 days ahead and keep them in their cooking water in the fridge. Warm them for 2 minutes in the microwave before blending.",
    serving: "Serve at room temperature as part of a mezze spread with pita, pickles and fresh vegetables, or as a base under sliced chicken shawarma.",
    pairsWith: ["tabbouleh", "crispy-falafel", "chicken-shawarma", "fattoush"],
  },
};
