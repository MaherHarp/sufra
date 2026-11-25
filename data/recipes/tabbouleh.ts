import type { Recipe } from "../types";
import { u } from "../images";

export const tabbouleh: Recipe = {
  slug: "tabbouleh",
  title: "Tabbouleh",
  arabic: "تبولة",
  category: "salads",
  summary: "A bright, lemony parsley salad with just a sprinkle of bulgur — the Lebanese way.",
  description:
    "Forget the grain salads labelled 'tabouli' in supermarkets. Lebanese tabbouleh is an herb salad: mountains of finely sliced parsley, a little mint, juicy tomato and only a spoonful of fine bulgur, all soaked in lemon and olive oil. The skill is in the knife work, and this lesson walks you through it.",
  origin:
    "Tabbouleh comes from the mountains of Lebanon and Syria, where parsley and bulgur were everyday staples. It is considered one of Lebanon's national dishes, and the first Saturday of July is celebrated there as National Tabbouleh Day.",
  image: { src: u("photo-1786174044919-c2119725afa1"), alt: "A bowl of tabbouleh salad with chopped tomatoes, parsley and lemon slices" },
  prepMinutes: 40,
  cookMinutes: 0,
  waitMinutes: 20,
  waitLabel: "Drying herbs and soaking bulgur",
  servings: 4,
  difficulty: "Easy",
  calories: 210,
  dietary: ["Vegetarian", "Vegan", "Dairy-Free", "Halal"],
  rating: 4.8,
  popularity: 2,
  featured: true,
  equipment: ["chef-knife", "cutting-board", "salad-spinner", "kitchen-towels", "large-bowl", "citrus-juicer"],
  ingredients: [
    {
      title: "For the salad",
      items: [
        { id: "parsley", name: "flat-leaf parsley", qty: 3, unit: "bunch", metric: { qty: 250, unit: "g" }, note: "large bunches", aisle: "Produce" },
        { id: "mint", name: "fresh mint leaves", qty: 0.5, unit: "cup", metric: { qty: 15, unit: "g" }, aisle: "Produce" },
        { id: "tomatoes", name: "firm ripe tomatoes", qty: 2, unit: "", metric: { qty: 300, unit: "g" }, note: "medium", aisle: "Produce" },
        { id: "onions", name: "green onions", qty: 4, unit: "", metric: { qty: 60, unit: "g" }, aisle: "Produce" },
        { id: "bulgur", name: "fine bulgur (#1)", qty: 0.25, unit: "cup", metric: { qty: 40, unit: "g" }, aisle: "Pantry" },
      ],
    },
    {
      title: "For the dressing",
      items: [
        { id: "lemon", name: "fresh lemon juice", qty: 0.33, unit: "cup", metric: { qty: 80, unit: "ml" }, aisle: "Produce" },
        { id: "oil", name: "extra-virgin olive oil", qty: 0.33, unit: "cup", metric: { qty: 80, unit: "ml" }, aisle: "Pantry" },
        { id: "salt", name: "fine sea salt", qty: 1, unit: "tsp", metric: { qty: 6, unit: "g" }, aisle: "Spices" },
        { id: "spice", name: "Lebanese seven spice or allspice", qty: 0.25, unit: "tsp", metric: { qty: 1, unit: "g" }, aisle: "Spices" },
        { id: "pepper", name: "black pepper", qty: 0.25, unit: "tsp", metric: { qty: 1, unit: "g" }, aisle: "Spices" },
      ],
    },
    {
      title: "For serving",
      items: [{ id: "lettuce", name: "romaine or cabbage leaves", qty: null, unit: "", aisle: "Produce", optional: true }],
    },
  ],
  steps: [
    {
      title: "Wash the herbs and dry them completely",
      minutes: 10,
      timer: { label: "Air-dry herbs", seconds: 15 * 60 },
      uses: [{ id: "parsley" }, { id: "mint" }],
      body: [
        "Fill a big bowl or clean sink with cold water. Swish the parsley and mint around, lift them out (the grit sinks), and repeat with fresh water until no sand is left at the bottom.",
        "Spin them in a salad spinner, then spread them on a clean kitchen towel, roll it up loosely and leave for 15 minutes.",
      ],
      cue: "The leaves feel dry to the touch, with no water droplets clinging to them, and they look bright and perky.",
      tip: "Dry herbs are the secret to a fluffy tabbouleh. Wet parsley turns into a soggy, dark green paste when you cut it.",
      mistake: "Chopping the herbs straight from the tap. The extra water dilutes the dressing and bruises the leaves.",
      image: { src: u("photo-1649317648581-0f045d1be778"), alt: "A close-up of a bunch of fresh green herbs" },
    },
    {
      title: "Dice the tomatoes and soak the bulgur in their juice",
      minutes: 6,
      timer: { label: "Bulgur soaks in tomato juice", seconds: 15 * 60 },
      uses: [{ id: "tomatoes" }, { id: "bulgur" }],
      body: [
        "Cut the tomatoes into small dice, about ¼ inch (5 mm). Put them, with every drop of juice from the board, into the bottom of your large serving bowl.",
        "Rinse the bulgur in a fine sieve under cold water for a few seconds, shake well, and sprinkle it in an even layer over the tomatoes. Leave it alone while you chop the herbs; it will soften in the tomato juice without becoming mushy.",
      ],
      cue: "After about 15 minutes, a grain of bulgur is tender with a slight chew, and has soaked up the pink tomato juice.",
      tip: "Use fine bulgur, labelled #1 or 'fine'. Coarse bulgur stays crunchy and takes over the salad.",
      mistake: "Boiling or cooking the bulgur. Tabbouleh bulgur is only ever soaked.",
    },
    {
      title: "Slice the parsley finely — without bruising it",
      minutes: 15,
      uses: [{ id: "parsley" }],
      body: [
        "Take one bunch at a time and line the leaves up in a tight bundle. Cut off the thick stems at the bottom (thin stems near the leaves are fine to keep).",
        "Hold the bundle firmly in a claw grip with your fingertips tucked in, and slice across it as thinly as you can with a sharp knife, moving your hand back a little after every cut. Cut each spot once — do not rock the knife back and forth over the pile.",
      ],
      cue: "A fluffy pile of fine, separate green threads that smells fresh and grassy. Your board should be green-tinted but not wet and puddled.",
      tip: "Sharpen your knife before you start. A dull blade crushes parsley and turns it black and bitter within minutes.",
      mistake: "Using a food processor or chopping back and forth over the same pile. Both pulverise the leaves into a wet, dark mush.",
    },
    {
      title: "Chop the mint and green onions",
      minutes: 4,
      uses: [{ id: "mint" }, { id: "onions" }],
      body: [
        "Stack the mint leaves, roll them into a tight cigar and slice thinly, the same way as the parsley.",
        "Trim the roots and the very top of the green onions, then slice them thinly, white and green parts both.",
      ],
      cue: "Thin ribbons of mint and little green-and-white rings of onion.",
      tip: "Cut mint last and right before mixing. It darkens faster than parsley once cut.",
      mistake: "Using too much mint. It is a supporting flavour here, not the star.",
    },
    {
      title: "Dress and toss just before serving",
      minutes: 4,
      uses: [{ id: "parsley" }, { id: "mint" }, { id: "onions" }, { id: "lemon" }, { id: "oil" }, { id: "salt" }, { id: "spice" }, { id: "pepper" }],
      body: [
        "Add the parsley, mint and green onions on top of the bulgur and tomatoes. Sprinkle over the salt, spice and pepper, then pour over the lemon juice and olive oil.",
        "Toss gently with two forks or your clean hands, lifting from the bottom so the bulgur mixes through.",
      ],
      cue: "Glossy, bright green and loose, with flecks of red tomato throughout. It should smell sharply of lemon and taste juicy, almost dripping.",
      tip: "Taste with a lettuce leaf. Lebanese tabbouleh is meant to be very lemony — if it is not slightly mouth-puckering, add more lemon and a pinch of salt.",
      mistake: "Dressing the salad hours ahead. The salt draws out water and the herbs wilt. Dress it within 30 minutes of eating.",
    },
    {
      title: "Serve it the Lebanese way",
      minutes: 1,
      uses: [{ id: "lettuce" }],
      body: [
        "Pile the tabbouleh into a shallow bowl and serve it with crisp romaine leaves or wedges of raw cabbage, which you use as a scoop instead of a fork.",
      ],
      cue: "A bright, fluffy mound with a little pool of lemony dressing at the bottom of the bowl.",
      tip: "Spoon some of the dressing from the bottom of the bowl over each serving — it is the best part.",
      mistake: "Serving it cold from the fridge. Room temperature lets the lemon and olive oil shine.",
    },
  ],
  videoSummary:
    "This lesson is all about the knife. We wash parsley and mint in several changes of water and dry them completely, because wet herbs turn mushy. We dice the tomatoes first and let a small amount of fine bulgur soften in their juice instead of cooking it. Then we slice the parsley in tight bundles, cutting each spot only once so it stays fluffy and green. Finally we add mint and green onions, dress everything generously with lemon, olive oil, salt and a pinch of seven spice, and serve it with lettuce leaves for scooping.",
  notes: {
    substitutions: [
      "Gluten-free: swap the bulgur for the same amount of cooked and cooled quinoa.",
      "No green onions? Use ¼ small white onion, very finely diced and rubbed with a pinch of salt and allspice.",
      "No seven spice? Use a pinch of allspice and a tiny pinch of cinnamon.",
    ],
    storage: "Best eaten the day it is made. Undressed, chopped herbs keep 1 day in the fridge in a container lined with paper towel; dressed tabbouleh keeps 1 day but softens.",
    makeAhead: "Wash, dry and slice the herbs up to 4 hours ahead and keep them in the fridge under a damp towel. Dice the tomatoes and mix everything only when you are ready to eat.",
    serving: "Serve at room temperature with romaine or cabbage leaves for scooping, alongside hummus, falafel or grilled kafta.",
    pairsWith: ["classic-creamy-hummus", "kafta", "crispy-falafel", "baked-kibbeh"],
  },
};
