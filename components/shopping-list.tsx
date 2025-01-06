"use client";

import {
  Recipe,
  mergeIngredients,
  sortIngredientsByCategory,
  IngredientCategory,
  GroupedIngredient,
} from "@/lib/data/types";

interface ShoppingListProps {
  recipes: Recipe[];
}

export function ShoppingList({ recipes }: ShoppingListProps) {
  // Obtener todos los ingredientes de todas las recetas y agruparlos por receta
  const allIngredients = recipes.flatMap((recipe) =>
    mergeIngredients(recipe.ingredients, recipe.title)
  );

  // Agrupar y sumar cantidades de ingredientes similares
  const mergedIngredients = allIngredients.reduce(
    (acc: GroupedIngredient[], curr) => {
      const existing = acc.find(
        (item) =>
          item.name === curr.name &&
          item.unit === curr.unit &&
          item.category === curr.category
      );

      if (existing) {
        existing.amount += curr.amount;
        curr.recipes.forEach((recipe) => {
          if (!existing.recipes.includes(recipe)) {
            existing.recipes.push(recipe);
          }
        });
        return acc;
      }

      return [...acc, curr];
    },
    []
  );

  // Ordenar por categoría y alfabéticamente
  const categorizedIngredients = sortIngredientsByCategory(mergedIngredients);

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-bold'>Lista de Compras</h2>
        <p className='text-muted-foreground'>
          Ingredientes necesarios para las recetas seleccionadas
        </p>
      </div>

      {Object.entries(categorizedIngredients).map(([category, ingredients]) => {
        if (ingredients.length === 0) return null;

        return (
          <div key={category} className='space-y-2'>
            <h3 className='text-lg font-semibold'>{category}</h3>
            <div className='divide-y rounded-lg border'>
              {ingredients.map((ingredient, index) => (
                <div
                  key={`${ingredient.name}-${index}`}
                  className='flex items-center justify-between p-3'
                >
                  <div className='flex-1'>
                    <span className='font-medium'>{ingredient.name}</span>
                    <div className='text-sm text-muted-foreground'>
                      Usado en: {ingredient.recipes.join(", ")}
                    </div>
                  </div>
                  <div className='text-right'>
                    <span className='font-medium'>
                      {ingredient.amount} {ingredient.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
