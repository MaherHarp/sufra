import {
  Blend,
  Box,
  CircleDot,
  Citrus,
  CookingPot,
  Cylinder,
  Disc,
  Filter,
  Flame,
  Grid3x3,
  Layers,
  Paintbrush,
  Ruler,
  Scissors,
  Slice,
  Soup,
  Square,
  Thermometer,
  Utensils,
  Waves,
  Wind,
  type LucideIcon,
} from "lucide-react";
import type { EquipmentId } from "@/data/types";

const EQUIPMENT: Record<EquipmentId, { label: string; icon: LucideIcon; note?: string }> = {
  "food-processor": { label: "Food processor", icon: Blend },
  blender: { label: "Blender", icon: Blend },
  "large-bowl": { label: "Large bowl", icon: Soup },
  "mixing-bowls": { label: "Mixing bowls", icon: Soup },
  "baking-sheet": { label: "Rimmed baking sheet", icon: Square },
  "baking-pan": { label: "9×13-inch baking pan", icon: Grid3x3 },
  saucepan: { label: "Small saucepan", icon: CookingPot },
  "large-pot": { label: "Large pot", icon: CookingPot },
  "heavy-pot": { label: "Heavy-bottomed pot", icon: CookingPot },
  skillet: { label: "Large skillet", icon: Disc },
  "chef-knife": { label: "Sharp chef's knife", icon: Slice },
  "cutting-board": { label: "Cutting board", icon: Box },
  "fine-sieve": { label: "Fine-mesh sieve", icon: Filter },
  cheesecloth: { label: "Cheesecloth", icon: Layers },
  colander: { label: "Colander", icon: Filter },
  "salad-spinner": { label: "Salad spinner", icon: CircleDot },
  grill: { label: "Grill, gas burner or broiler", icon: Flame },
  skewers: { label: "Flat skewers", icon: Utensils },
  "pastry-brush": { label: "Pastry brush", icon: Paintbrush },
  "rolling-pin": { label: "Rolling pin", icon: Cylinder },
  thermometer: { label: "Instant-read thermometer", icon: Thermometer },
  measuring: { label: "Measuring cups & spoons", icon: Ruler },
  "box-grater": { label: "Box grater", icon: Grid3x3 },
  "immersion-blender": { label: "Immersion blender", icon: Wind },
  spider: { label: "Slotted spoon or spider", icon: Utensils },
  "plate-weight": { label: "Heat-safe plate (to weigh down)", icon: Disc },
  "kitchen-towels": { label: "Clean kitchen towels", icon: Waves },
  "citrus-juicer": { label: "Citrus juicer", icon: Citrus },
  tongs: { label: "Tongs", icon: Scissors },
};

export function EquipmentList({ items }: { items: EquipmentId[] }) {
  return (
    <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
      {items.map((id) => {
        const e = EQUIPMENT[id];
        const Icon = e.icon;
        return (
          <li key={id} className="flex items-center gap-2.5 rounded-xl bg-linen/70 px-3 py-2.5 text-[0.95rem] leading-tight">
            <Icon className="h-5 w-5 shrink-0 text-olive" aria-hidden />
            {e.label}
          </li>
        );
      })}
    </ul>
  );
}
