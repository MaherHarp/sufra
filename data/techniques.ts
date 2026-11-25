import type { Img } from "./types";
import { u } from "./images";

export interface Technique {
  slug: string;
  title: string;
  summary: string;
  minutes: number;
  image: Img;
  why: string;
  steps: { title: string; text: string }[];
  checks: string[]; // signs you got it right
  fixes: { problem: string; fix: string }[];
  video?: { youtubeId: string; creator: string; title: string };
  related: string[]; // recipe slugs
}

export const techniques: Technique[] = [
  {
    slug: "perfect-tahini-sauce",
    title: "How to make perfect tahini sauce",
    summary: "The pale, creamy sauce that goes on falafel, fish, shawarma and roast vegetables.",
    minutes: 5,
    image: { src: u("photo-1673960854897-749f9d9ebafc"), alt: "A bowl of creamy dip next to garlic" },
    why: "Tahini sauce (tarator) does something strange: when you add lemon and water it first goes thick and lumpy, then suddenly turns smooth. Knowing that this is normal is most of the skill.",
    steps: [
      { title: "Start with well-stirred tahini", text: "Stir the jar until the oil on top is mixed back in. Measure ½ cup (120 g) into a bowl." },
      { title: "Add lemon, garlic and salt", text: "Add ¼ cup (60 ml) lemon juice, 1 small grated garlic clove and ½ tsp salt. Stir. It will seize into a thick, grainy paste — keep going." },
      { title: "Whisk in cold water slowly", text: "Add cold water 1 tablespoon at a time, whisking well after each. After about 4 tablespoons it turns smooth and pale. Keep adding until it pours like heavy cream (usually 6–8 tablespoons in total)." },
      { title: "Taste and balance", text: "It should taste nutty and clearly lemony. Add lemon if it tastes flat, salt if it tastes dull, and water if it is too thick." },
    ],
    checks: ["Pale beige, almost white", "Pours slowly from a spoon like heavy cream", "No bitterness — just nutty and tangy"],
    fixes: [
      { problem: "It looks curdled and lumpy", fix: "This is normal. Keep whisking and adding water a spoonful at a time." },
      { problem: "Too thin", fix: "Whisk in another tablespoon of tahini." },
      { problem: "Tastes bitter", fix: "Your tahini may be old or very dark. Add a little more lemon and a pinch of salt, and buy a fresh, light-coloured jar next time." },
    ],
    related: ["crispy-falafel", "classic-creamy-hummus", "baba-ghanoush"],
  },
  {
    slug: "chop-parsley-without-bruising",
    title: "How to chop parsley for tabbouleh without bruising it",
    summary: "Fluffy, bright green, separate strands — not a dark, wet paste.",
    minutes: 10,
    image: { src: u("photo-1636647511729-6703539ba71f"), alt: "A cook chopping vegetables on a cutting board" },
    why: "Every time a blade crushes parsley instead of slicing it, the leaf bleeds water and darkens. Tabbouleh needs dry leaves, a sharp knife and a slicing motion where each spot is cut only once.",
    steps: [
      { title: "Wash and dry completely", text: "Swish the parsley in a bowl of cold water, lift it out, repeat until no grit remains. Spin it dry, then roll it in a towel for 15 minutes. It must feel dry to the touch." },
      { title: "Sharpen your knife", text: "Use your sharpest chef's knife. A few strokes on a honing steel or sharpener makes a big difference." },
      { title: "Bunch the leaves tightly", text: "Gather a handful of parsley and line the leaves up in a tight bundle. Cut off the thick stems at the bottom." },
      { title: "Slice thinly, once", text: "Hold the bundle in a claw grip, fingertips tucked under your knuckles. Slice across as thinly as you can, moving your hand back a fraction after each cut. Do not go back over the pile." },
    ],
    checks: ["Separate, fluffy green threads", "Fresh, grassy smell", "The board is barely damp"],
    fixes: [
      { problem: "The parsley turned dark and wet", fix: "It was wet or the knife was dull. Dry the next batch better and sharpen the knife." },
      { problem: "It is too coarse", fix: "Re-bunch it tightly and slice again in a single pass — do not rock-chop." },
    ],
    related: ["tabbouleh", "fattoush", "kafta"],
  },
  {
    slug: "roll-grape-leaves",
    title: "How to roll grape leaves",
    summary: "Tight, even little cigars that hold together in the pot.",
    minutes: 15,
    image: { src: u("photo-1759679134771-835a874351fe"), alt: "Hands arranging stuffed grape leaves in a pot" },
    why: "Rolling is all about small amounts and tight folds. The rice swells as it cooks, so a loose or overstuffed roll will burst or unravel.",
    steps: [
      { title: "Position the leaf", text: "Lay the leaf shiny side down, veins facing up, stem end towards you. Snip off the stem." },
      { title: "Add a little filling", text: "Put about a heaped teaspoon of filling in a short line just above where the stem was, leaving a margin on both sides." },
      { title: "Fold the bottom, then the sides", text: "Fold the bottom of the leaf up over the filling. Fold the left and right sides in towards the centre, like an envelope." },
      { title: "Roll tightly", text: "Roll away from you, keeping the sides tucked and pulling gently back on the roll to keep it snug. Place seam-side down." },
    ],
    checks: ["Finger-thick and about 3 inches (7–8 cm) long", "Sides fully sealed", "Does not unroll when placed seam-side down"],
    fixes: [
      { problem: "The leaf tears", fix: "Patch it with a small piece of another leaf underneath before adding the filling." },
      { problem: "Rolls come out different sizes", fix: "Use a measuring teaspoon for the filling until your eye is trained." },
      { problem: "Leaf is huge", fix: "Cut it in half along the central vein and use each half." },
    ],
    video: { youtubeId: "S-cgvS4h4sY", creator: "Eva's Lebanese Cooking", title: "Lebanese Stuffed Grape Leaves Recipe" },
    related: ["warak-enab"],
  },
  {
    slug: "crispy-falafel",
    title: "How to get crispy falafel",
    summary: "Deep brown and crunchy outside, fluffy and green inside.",
    minutes: 8,
    image: { src: u("photo-1593001872095-7d5b3868fb1d"), alt: "Fried falafel in a white bowl" },
    why: "Crispy falafel depends on three things: uncooked soaked chickpeas, a coarse grind, and oil hot enough to seal the outside immediately.",
    steps: [
      { title: "Use soaked, raw chickpeas", text: "Soak dried chickpeas for 18–24 hours. Never use canned or cooked chickpeas — they are too wet and fall apart." },
      { title: "Grind coarse, not smooth", text: "Pulse in the food processor until it looks like damp couscous. A smooth paste fries up dense and heavy." },
      { title: "Chill, then add baking soda", text: "Chill the mixture 30 minutes. Stir in the baking soda only right before shaping so it gives maximum lift." },
      { title: "Fry at 350°F (175°C), in small batches", text: "Use a thermometer. Fry 5–6 at a time for 3–4 minutes until deep brown, and let the oil come back up to temperature between batches." },
    ],
    checks: ["Deep mahogany brown, not golden", "Crackles when you bite it", "Bright green and fluffy inside"],
    fixes: [
      { problem: "Falafel falls apart in the oil", fix: "The mixture is too wet. Mix in 1–2 tbsp chickpea or all-purpose flour, chill longer, and squeeze the balls firmly." },
      { problem: "Greasy and heavy", fix: "The oil was too cool. Wait for it to return to 350°F (175°C) before every batch." },
      { problem: "Burnt outside, raw inside", fix: "The oil is too hot or the falafel too big. Lower the heat and make them about 1½ inches (4 cm) wide." },
    ],
    video: { youtubeId: "Qa85BSvCsyc", creator: "Healthy Breakfast", title: "How To Make Lebanese Falafel" },
    related: ["crispy-falafel"],
  },
  {
    slug: "fluffy-pita",
    title: "How to make fluffy pita",
    summary: "Soft pocket bread that puffs up like a balloon in the oven.",
    minutes: 25,
    image: { src: u("photo-1592837613828-4b65deb44f15"), alt: "A person holding a wooden rolling pin" },
    why: "Pita puffs because very high heat turns the water in the dough to steam all at once, pushing the top and bottom apart. Even thickness, a smooth surface and a very hot oven do the work.",
    steps: [
      { title: "Make a soft dough", text: "Mix 3 cups (375 g) flour, 2 tsp instant yeast, 1 tsp sugar, 1½ tsp salt, 1 cup + 2 tbsp (270 ml) warm water and 2 tbsp olive oil. Knead 8 minutes until smooth and springy. Let it rise 1 hour, until doubled." },
      { title: "Heat the oven as hot as it goes", text: "Put a baking sheet upside down (or a pizza stone) on the lowest rack and heat the oven to 475–500°F (245–260°C) for at least 30 minutes." },
      { title: "Divide, rest and roll evenly", text: "Divide into 8 balls and rest 10 minutes covered. Roll each into a 6-inch (15 cm) round about ¼ inch (5 mm) thick. Keep the thickness even and do not let the surface tear or fold." },
      { title: "Bake fast", text: "Place 2–3 rounds directly on the hot sheet. Bake 3–5 minutes until puffed and pale with a few light-brown spots. Wrap them in a towel straight away so they stay soft." },
    ],
    checks: ["Balloons up fully within 2–3 minutes", "Pale with just a few golden spots", "Soft and foldable once wrapped"],
    fixes: [
      { problem: "It did not puff", fix: "The oven or baking sheet was not hot enough, or the dough was rolled unevenly or creased. Heat longer and roll evenly." },
      { problem: "It puffed but went hard", fix: "It baked too long. Pull it out as soon as it puffs and wrap it in a towel." },
      { problem: "No oven?", fix: "Cook in a very hot dry cast-iron pan for 1 minute, flip, and press gently with a towel; it will puff on the second side." },
    ],
    related: ["zaatar-manakish", "fattoush", "chicken-shawarma"],
  },
  {
    slug: "balance-lemon-salt-garlic",
    title: "How to balance lemon, salt and garlic",
    summary: "The three-part seasoning that makes Lebanese food taste Lebanese.",
    minutes: 5,
    image: { src: u("photo-1774857244194-b2c66ac93e43"), alt: "Whole lemons and a lemon cut in half" },
    why: "Most Lebanese mezze rely on the same trio. Lemon brings brightness, salt makes every flavour louder, and garlic adds depth. Learning to taste and adjust them is more useful than any single recipe.",
    steps: [
      { title: "Taste the way you will eat it", text: "Taste dips on bread and salads on a lettuce leaf. Food tastes different on a spoon than on bread." },
      { title: "Adjust one thing at a time", text: "Ask: does it taste flat? Add a pinch of salt. Heavy or dull? Add lemon. Missing depth? A tiny bit of grated garlic. Change one thing, mix, taste again." },
      { title: "Tame raw garlic with lemon or salt", text: "Grate or crush garlic and let it sit in lemon juice or with salt for 5 minutes before adding. It becomes sweeter and less harsh." },
      { title: "Season, then wait", text: "Flavours change as dishes rest. Garlic gets stronger, lemon fades, salt spreads out. Taste again after 10 minutes before serving." },
    ],
    checks: ["You notice the brightness first", "No single flavour shouts over the others", "You want another bite"],
    fixes: [
      { problem: "Too salty", fix: "Add more of the main ingredient (chickpeas, eggplant, herbs) rather than more lemon — sourness does not cancel salt." },
      { problem: "Too sour", fix: "A little more olive oil or tahini, and a tiny pinch of salt, rounds it out." },
      { problem: "Too garlicky", fix: "You cannot remove it. Make a little extra of the dish without garlic and mix it in. Next time, start with less." },
    ],
    related: ["classic-creamy-hummus", "tabbouleh", "fattoush", "baba-ghanoush"],
  },
];
