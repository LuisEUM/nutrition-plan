"use client";

import { useState, useMemo, useEffect } from "react";
import { Recipe } from "@/lib/data/types";
import { SearchRecipes } from "@/components/search-recipes";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { breakfastRecipes } from "@/lib/data/breakfasts";
import { lunchRecipes } from "@/lib/data/lunches";
import { dinnerRecipes } from "@/lib/data/dinners";
import { snackRecipes } from "@/lib/data/snacks";

interface RecipeSelectorProps {
  onSelect: (recipe: Recipe) => void;
  category?: "breakfast" | "lunch" | "dinner" | "snack";
}

export function RecipeSelector({ onSelect, category }: RecipeSelectorProps) {
  const availableRecipes = useMemo(() => {
    switch (category) {
      case "breakfast":
        return breakfastRecipes;
      case "lunch":
        return lunchRecipes;
      case "dinner":
        return dinnerRecipes;
      case "snack":
        return snackRecipes;
      default:
        return [
          ...breakfastRecipes,
          ...lunchRecipes,
          ...dinnerRecipes,
          ...snackRecipes,
        ];
    }
  }, [category]);

  const [filteredRecipes, setFilteredRecipes] =
    useState<Recipe[]>(availableRecipes);

  useEffect(() => {
    setFilteredRecipes(availableRecipes);
  }, [availableRecipes]);

  return (
    <DialogContent className='max-w-3xl'>
      <DialogHeader>
        <DialogTitle>
          {category
            ? `Seleccionar ${
                category === "breakfast"
                  ? "Desayuno"
                  : category === "lunch"
                    ? "Almuerzo/Comida"
                    : category === "dinner"
                      ? "Cena"
                      : "Merienda"
              }`
            : "Seleccionar Receta"}
        </DialogTitle>
      </DialogHeader>

      <div className='space-y-4'>
        <SearchRecipes
          recipes={availableRecipes}
          onSearch={setFilteredRecipes}
        />

        <ScrollArea className='h-[500px] pr-4'>
          <div className='grid grid-cols-2 gap-4'>
            {filteredRecipes.map((recipe) => (
              <Card
                key={recipe.id}
                className='cursor-pointer transition-colors hover:bg-muted/50'
                onClick={() => onSelect(recipe)}
              >
                <CardHeader>
                  <CardTitle className='text-lg'>{recipe.title}</CardTitle>
                  <CardDescription>
                    {recipe.preparationTime} · {recipe.servingSize}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-2 text-sm'>
                    <div>
                      <span className='font-medium'>Ingredientes:</span>{" "}
                      {recipe.ingredients.length}
                    </div>
                    <div className='line-clamp-2'>
                      <span className='font-medium'>Beneficios:</span>{" "}
                      {recipe.benefits.join(", ")}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </DialogContent>
  );
}
