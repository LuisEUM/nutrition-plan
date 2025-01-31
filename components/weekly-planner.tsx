"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Recipe } from "@/lib/data/types";
import { Dialog } from "@/components/ui/dialog";
import { RecipeSelector } from "@/components/recipe-selector";
import { ShoppingList } from "@/components/shopping-list";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

  const renderMobileView = () => (
    <div className='space-y-4'>
      {days.map((day) => (
        <Accordion type='single' collapsible key={day}>
          <AccordionItem value={day}>
            <AccordionTrigger className='text-lg font-semibold capitalize'>
              {day}
            </AccordionTrigger>
            <AccordionContent>
              <div className='space-y-4'>
                {meals.map(({ type, label }) => {
                  const meal = getMealForSlot(day, type);
                  return (
                    <div
                      key={`${day}-${type}`}
                      className='flex flex-col sm:flex-row sm:items-center gap-2 rounded-lg border p-4'
                    >
                      <span className='font-medium min-w-[120px]'>{label}</span>
                      {meal ? (
                        <div className='flex flex-1 flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
                          <span className='text-sm line-clamp-2'>
                            {meal.title}
                          </span>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => handleAddMeal(day, type)}
                            className='shrink-0'
                          >
                            Cambiar
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => handleAddMeal(day, type)}
                          className='shrink-0'
                        >
                          <Plus className='mr-2 h-4 w-4' />
                          Añadir
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );

  const renderDesktopView = () => (
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
                className='col-span-1 min-h-[120px] rounded-lg border p-2'
              >
                {meal ? (
                  <div className='flex h-full flex-col justify-between'>
                    <div className='text-sm font-medium line-clamp-3'>
                      {meal.title}
                    </div>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='mt-2 w-full'
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
  );

  return (
    <div className='space-y-8'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
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

      <div className='hidden md:block'>{renderDesktopView()}</div>
      <div className='md:hidden'>{renderMobileView()}</div>

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
