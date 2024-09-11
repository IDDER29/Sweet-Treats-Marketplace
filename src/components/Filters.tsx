"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

export default function Filters({
  priceRange,
  setPriceRange,
  selectedCategory,
  setSelectedCategory,
  dietaryPreferences,
  setDietaryPreferences,
}) {
  return (
    <div className="flex flex-wrap gap-4">
      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Categories</SelectItem>
          <SelectItem value="Cakes">Cakes</SelectItem>
          <SelectItem value="Pastries">Pastries</SelectItem>
          <SelectItem value="Candies">Candies</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </span>
        <Slider
          min={0}
          max={50}
          step={1}
          value={priceRange}
          onValueChange={setPriceRange}
          className="w-[200px]"
        />
      </div>

      <div className="flex items-center space-x-4">
        <label className="flex items-center space-x-2">
          <Checkbox
            checked={dietaryPreferences["gluten-free"]}
            onCheckedChange={(checked) =>
              setDietaryPreferences((prev) => ({
                ...prev,
                "gluten-free": checked,
              }))
            }
          />
          <span>Gluten-free</span>
        </label>
        <label className="flex items-center space-x-2">
          <Checkbox
            checked={dietaryPreferences["vegan"]}
            onCheckedChange={(checked) =>
              setDietaryPreferences((prev) => ({ ...prev, vegan: checked }))
            }
          />
          <span>Vegan</span>
        </label>
      </div>
    </div>
  );
}
