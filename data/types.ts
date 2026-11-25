/**
 * Shared data model for every recipe on the site.
 * To add a recipe: create a file in data/recipes/, export a `Recipe`,
 * and add it to the list in data/recipes.ts. Every page picks it up automatically.
 */

export type Img = { src: string; alt: string };

export type CategoryId = "mezze" | "mains" | "breads" | "salads" | "soups" | "desserts";

export type Difficulty = "Easy" | "Medium" | "Advanced";

export type Dietary = "Vegetarian" | "Vegan" | "Gluten-Free" | "Dairy-Free" | "Halal";

/** Store section, used to group the shopping list. */
export type Aisle = "Produce" | "Meat" | "Dairy" | "Spices" | "Pantry" | "Bakery" | "Frozen";

/**
 * US units. Count items (an onion, a lemon) use "" and put the size in the name.
 * Units that pluralise ("cup" → "cups") are handled in lib/format.ts.
 */
export type UsUnit =
  | ""
  | "cup"
  | "tbsp"
  | "tsp"
  | "lb"
  | "oz"
  | "clove"
  | "bunch"
  | "can"
  | "jar"
  | "sheet"
  | "pinch"
  | "qt";

export type MetricUnit = "g" | "kg" | "ml" | "l";

export interface Ingredient {
  /** Unique within the recipe; steps refer to ingredients by this id. */
  id: string;
  name: string;
  qty: number | null; // null = "to taste" / "for serving"
  unit: UsUnit;
  metric?: { qty: number; unit: MetricUnit };
  /** Short preparation note shown after the name, e.g. "finely chopped". */
  note?: string;
  aisle: Aisle;
  optional?: boolean;
}

export interface IngredientGroup {
  title: string;
  /** If set, this group is only needed for one cooking method. */
  method?: string;
  items: Ingredient[];
}

export interface StepUse {
  id: string;
  /** Fraction of the ingredient used in this step (e.g. 0.5 for half). Defaults to all of it. */
  part?: number;
}

export interface Step {
  title: string;
  /** If set, the step only shows when this cooking method is chosen. */
  method?: string;
  /** Rough hands-on minutes for this step. */
  minutes: number;
  /** Adds a timer button to the step. */
  timer?: { label: string; seconds: number };
  /** Plain-language instructions, one paragraph per entry. */
  body: string[];
  /** Ingredients used in this step; amounts are shown and scaled with the serving size. */
  uses?: StepUse[];
  /** What it should look, smell, sound or feel like when the step is done right. */
  cue: string;
  tip: string;
  mistake: string;
  image?: Img;
}

export type EquipmentId =
  | "food-processor"
  | "blender"
  | "large-bowl"
  | "mixing-bowls"
  | "baking-sheet"
  | "baking-pan"
  | "saucepan"
  | "large-pot"
  | "heavy-pot"
  | "skillet"
  | "chef-knife"
  | "cutting-board"
  | "fine-sieve"
  | "cheesecloth"
  | "colander"
  | "salad-spinner"
  | "grill"
  | "skewers"
  | "pastry-brush"
  | "rolling-pin"
  | "thermometer"
  | "measuring"
  | "box-grater"
  | "immersion-blender"
  | "spider"
  | "plate-weight"
  | "kitchen-towels"
  | "citrus-juicer"
  | "tongs";

export interface CookingMethod {
  id: string;
  label: string;
  description: string;
}

export interface Recipe {
  slug: string;
  title: string;
  /** Name in Arabic script. */
  arabic: string;
  category: CategoryId;
  /** One-sentence card description. */
  summary: string;
  /** Longer page introduction. */
  description: string;
  /** Origin and history, 2–3 sentences. */
  origin: string;
  image: Img;
  prepMinutes: number;
  cookMinutes: number;
  /** Hands-off waiting: soaking, marinating, straining, chilling, cooling. */
  waitMinutes: number;
  waitLabel?: string;
  servings: number;
  /** What one "serving" means, e.g. "pieces" or "wraps". Defaults to "servings". */
  servingsLabel?: string;
  difficulty: Difficulty;
  /** Approximate calories per serving. */
  calories: number;
  dietary: Dietary[];
  /** Kitchen-tested rating out of 5, set by the recipe editor. */
  rating: number;
  /** Lower is more popular; drives the "Most popular" sort. */
  popularity: number;
  featured?: boolean;
  methods?: CookingMethod[];
  equipment: EquipmentId[];
  ingredients: IngredientGroup[];
  steps: Step[];
  video?: { youtubeId: string; creator: string; title: string };
  /** Teacher-style summary of the video lesson, shown under the player. */
  videoSummary: string;
  notes: {
    substitutions: string[];
    storage: string;
    makeAhead: string;
    serving: string;
    pairsWith: string[]; // slugs of other recipes
  };
}
