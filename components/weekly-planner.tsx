"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Recipe } from "@/lib/data/types";
import { Dialog } from "@/components/ui/dialog";
import { RecipeSelector } from "@/components/recipe-selector";
import { ShoppingList } from "@/components/shopping-list";

type MealType = "desayuno" | "media-manana" | "comida" | "merienda" | "cena";
type DayType =
  | "lunes"
  | "martes"
  | "miércoles"
  | "jueves"
  | "viernes"
  | "sábado"
  | "domingo";

interface MealPlan {
  [key: string]: {
    [key in MealType]?: Recipe;
  };
}

const mealTypeToCategory: Record<
  MealType,
  "breakfast" | "lunch" | "dinner" | "snack"
> = {
  desayuno: "breakfast",
  "media-manana": "snack",
  comida: "lunch",
  merienda: "snack",
  cena: "dinner",
};

export function WeeklyPlanner() {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [mealPlan, setMealPlan] = useState<MealPlan>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{
    day: DayType;
    meal: MealType;
  } | null>(null);

  const days: DayType[] = [
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
    "domingo",
  ];

  const meals: { type: MealType; label: string }[] = [
    { type: "desayuno", label: "Desayuno" },
    { type: "media-manana", label: "Media Mañana" },
    { type: "comida", label: "Comida" },
    { type: "merienda", label: "Merienda" },
    { type: "cena", label: "Cena" },
  ];

  const handleAddMeal = (day: DayType, meal: MealType) => {
    setSelectedSlot({ day, meal });
    setIsDialogOpen(true);
  };

  const handleRecipeSelect = (recipe: Recipe) => {
    if (selectedSlot) {
      const weekKey = `week-${currentWeek}`;
      const dayKey = `${weekKey}-${selectedSlot.day}`;

      setMealPlan((prev) => ({
        ...prev,
        [dayKey]: {
          ...prev[dayKey],
          [selectedSlot.meal]: recipe,
        },
      }));
    }
    setIsDialogOpen(false);
  };

  const getMealForSlot = (day: DayType, meal: MealType) => {
    const weekKey = `week-${currentWeek}`;
    const dayKey = `${weekKey}-${day}`;
    return mealPlan[dayKey]?.[meal];
  };

  const getAllRecipesForWeek = (): Recipe[] => {
    const recipes: Recipe[] = [];
    const weekKey = `week-${currentWeek}`;

    days.forEach((day) => {
      const dayKey = `${weekKey}-${day}`;
      const dayMeals = mealPlan[dayKey];
      if (dayMeals) {
        Object.values(dayMeals).forEach((recipe) => {
          if (recipe) {
            recipes.push(recipe);
          }
        });
      }
    });

    return recipes;
  };

  return (
    <div className='space-y-8'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold'>Planificador Semanal</h2>
        <div className='flex items-center gap-4'>
          <Button
            variant='outline'
            onClick={() => setCurrentWeek((prev) => Math.max(1, prev - 1))}
          >
            Semana Anterior
          </Button>
          <span className='font-medium'>Semana {currentWeek}</span>
          <Button
            variant='outline'
            onClick={() => setCurrentWeek((prev) => prev + 1)}
          >
            Siguiente Semana
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-8 gap-4'>
        <div className='col-span-1'></div>
        {days.map((day) => (
          <div
            key={day}
            className='col-span-1 text-center font-semibold capitalize'
          >
            {day}
          </div>
        ))}

        {meals.map(({ type, label }) => (
          <React.Fragment key={type}>
            <div className='col-span-1 font-semibold'>{label}</div>
            {days.map((day) => {
              const meal = getMealForSlot(day, type);
              return (
                <div
                  key={`${day}-${type}`}
                  className='col-span-1 aspect-[4/3] rounded-lg border p-2'
                >
                  {meal ? (
                    <div className='h-full space-y-2'>
                      <div className='text-sm font-medium'>{meal.title}</div>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='w-full'
                        onClick={() => handleAddMeal(day, type)}
                      >
                        Cambiar
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant='ghost'
                      className='h-full w-full'
                      onClick={() => handleAddMeal(day, type)}
                    >
                      <Plus className='h-6 w-6' />
                    </Button>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      <div className='mt-8'>
        <ShoppingList recipes={getAllRecipesForWeek()} />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <RecipeSelector
          onSelect={handleRecipeSelect}
          category={
            selectedSlot ? mealTypeToCategory[selectedSlot.meal] : undefined
          }
        />
      </Dialog>
    </div>
  );
}
