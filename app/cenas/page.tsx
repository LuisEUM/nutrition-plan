"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchRecipes } from "@/components/search-recipes";
import { dinnerRecipes } from "@/lib/data/dinners";
import { useState } from "react";
import { Recipe } from "@/lib/data/types";

export default function DinnersPage() {
  const [filteredRecipes, setFilteredRecipes] =
    useState<Recipe[]>(dinnerRecipes);

  // Group recipes by health goals
  const recipesByGoal = filteredRecipes.reduce(
    (acc, recipe) => {
      recipe.healthGoals?.forEach((goal) => {
        if (!acc[goal]) {
          acc[goal] = [];
        }
        acc[goal].push(recipe);
      });
      return acc;
    },
    {} as Record<string, typeof dinnerRecipes>
  );

  return (
    <div className='container mx-auto py-10'>
      <h1 className='text-4xl font-bold mb-8'>Opciones de Cena</h1>

      <SearchRecipes recipes={dinnerRecipes} onSearch={setFilteredRecipes} />

      <Tabs defaultValue='all' className='w-full'>
        <TabsList className='flex flex-wrap'>
          <TabsTrigger value='all'>Todas las Recetas</TabsTrigger>
          {Object.keys(recipesByGoal).map((goal) => (
            <TabsTrigger key={goal} value={goal} className='capitalize'>
              {goal === "balanced"
                ? "Equilibradas"
                : goal === "immuneSystem"
                  ? "Sistema Inmune"
                  : goal === "lowCholesterol"
                    ? "Bajo Colesterol"
                    : goal}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value='all'>
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </TabsContent>

        {Object.entries(recipesByGoal).map(([goal, recipes]) => (
          <TabsContent key={goal} value={goal}>
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>{recipe.title}</CardTitle>
        <CardDescription>
          {recipe.preparationTime} · {recipe.servingSize}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div>
            <h4 className='font-semibold mb-2'>Ingredientes:</h4>
            <ul className='list-disc pl-5 space-y-1'>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className='text-gray-600'>
                  {ingredient.amount} {ingredient.unit} de {ingredient.name}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className='font-semibold mb-2'>Instrucciones:</h4>
            <ol className='list-decimal pl-5 space-y-1'>
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className='text-gray-600'>
                  {instruction}
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h4 className='font-semibold mb-2'>Beneficios:</h4>
            <ul className='list-disc pl-5 space-y-1'>
              {recipe.benefits.map((benefit, index) => (
                <li key={index} className='text-gray-600'>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {recipe.cookingTips && (
            <div>
              <h4 className='font-semibold mb-2'>Consejos:</h4>
              <ul className='list-disc pl-5 space-y-1'>
                {recipe.cookingTips.map((tip, index) => (
                  <li key={index} className='text-gray-600'>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
