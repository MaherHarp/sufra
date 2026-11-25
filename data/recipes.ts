import type { CategoryId, Img, Recipe } from "./types";
import { u } from "./images";
import { hummus } from "./recipes/hummus";
import { tabbouleh } from "./recipes/tabbouleh";
import { shawarma } from "./recipes/shawarma";
import { falafel } from "./recipes/falafel";
import { kibbeh } from "./recipes/kibbeh";
import { manakish } from "./recipes/manakish";
import { fattoush } from "./recipes/fattoush";
import { babaGhanoush } from "./recipes/baba-ghanoush";
import { muhammara } from "./recipes/muhammara";
import { labneh } from "./recipes/labneh";
import { kafta } from "./recipes/kafta";
import { shorbatAdas } from "./recipes/shorbat-adas";
import { warakEnab } from "./recipes/warak-enab";
import { baklava } from "./recipes/baklava";

/** Every recipe on the site. Add new recipes here. */
export const recipes: Recipe[] = [
  hummus,
  tabbouleh,
  shawarma,
  falafel,
  kibbeh,
  manakish,
  fattoush,
  babaGhanoush,
  muhammara,
  labneh,
  kafta,
  shorbatAdas,
  warakEnab,
  baklava,
];

export const getRecipe = (slug: string) => recipes.find((r) => r.slug === slug);

export interface Category {
  id: CategoryId;
  name: string;
  blurb: string;
  image: Img;
}

export const categories: Category[] = [
  {
    id: "mezze",
    name: "Mezze & Appetizers",
    blurb: "Dips and small plates to share",
    image: { src: u("photo-1786174045055-1eb50942e273"), alt: "A platter of hummus, tabbouleh, falafel and grilled meats with pita" },
  },
  {
    id: "mains",
    name: "Mains",
    blurb: "Grilled, roasted and baked",
    image: { src: u("photo-1771285119318-b342c3ecc51c"), alt: "A large platter of grilled meats and vegetables" },
  },
  {
    id: "breads",
    name: "Breads & Flatbreads",
    blurb: "From the neighbourhood oven",
    image: { src: u("photo-1640625314547-aee9a7696589"), alt: "A pile of pita bread on a wooden cutting board" },
  },
  {
    id: "salads",
    name: "Salads",
    blurb: "Lemony, herby and crunchy",
    image: { src: u("photo-1786174044919-c2119725afa1"), alt: "A bowl of tabbouleh with tomatoes, parsley and lemon" },
  },
  {
    id: "soups",
    name: "Soups",
    blurb: "Warming bowls for cold nights",
    image: { src: u("photo-1764015939059-2c5dee249315"), alt: "A bowl of creamy orange soup with a herb garnish" },
  },
  {
    id: "desserts",
    name: "Desserts & Drinks",
    blurb: "Syrup, nuts and orange blossom",
    image: { src: u("photo-1778448806128-18e8354356e1"), alt: "Two pieces of baklava with pistachios and a glass of tea" },
  },
];

export const categoryName = (id: CategoryId) => categories.find((c) => c.id === id)?.name ?? id;

/** The guided path for first-time cooks, in order. */
export const beginnerPath: { slug: string; why: string }[] = [
  { slug: "labneh", why: "Two ingredients and five minutes of work. Pure confidence." },
  { slug: "classic-creamy-hummus", why: "Learn the tahini base that half of Lebanese cooking builds on." },
  { slug: "tabbouleh", why: "Your first real knife-skills lesson." },
  { slug: "shorbat-adas", why: "One pot, pantry staples, big flavour." },
  { slug: "chicken-shawarma", why: "Marinating, roasting and your first emulsion sauce." },
  { slug: "zaatar-manakish", why: "Your first yeast dough, start to finish." },
];
