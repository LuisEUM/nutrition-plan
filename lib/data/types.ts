export interface GeneralRecommendation {
  id: string;
  title: string;
  content: string;
  category: "cooking" | "portions" | "nutrition" | "hydration" | "lifestyle";
}

export interface PersonalizedPortion {
  id: string;
  name: string;
  portions: {
    cereals: string;
    legumes: string;
    meat: string;
    fish: string;
    vegetables: string;
    bread: string;
    fruit: string;
    oil: string;
  };
}

export type IngredientCategory =
  | "Carnes"
  | "Frutas"
  | "Verduras"
  | "Cereales"
  | "Condimentos"
  | "Lácteos"
  | "Legumbres"
  | "Pescados"
  | "Aceites"
  | "Frutos Secos"
  | "Huevos"
  | "Otros";

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  category: IngredientCategory;
}

export interface Recipe {
  id: string;
  title: string;
  ingredients: Ingredient[];
  instructions: string[];
  preparationTime: string;
  servingSize: string;
  benefits: string[];
  category: "breakfast" | "lunch" | "dinner" | "snack";
  healthGoals?: string[];
  cookingTips?: string[];
}

export interface GroupedIngredient extends Ingredient {
  recipes: string[];
}

export function mergeIngredients(
  ingredients: Ingredient[],
  recipeTitle: string
): GroupedIngredient[] {
  const grouped = new Map<string, GroupedIngredient>();

  ingredients.forEach((ingredient) => {
    const key = `${ingredient.name}-${ingredient.unit}-${ingredient.category}`;
    if (grouped.has(key)) {
      const existing = grouped.get(key)!;
      existing.amount += ingredient.amount;
      if (!existing.recipes.includes(recipeTitle)) {
        existing.recipes.push(recipeTitle);
      }
    } else {
      grouped.set(key, {
        ...ingredient,
        recipes: [recipeTitle],
      });
    }
  });

  return Array.from(grouped.values());
}

export function sortIngredientsByCategory(
  ingredients: GroupedIngredient[]
): Record<IngredientCategory, GroupedIngredient[]> {
  const categorized: Record<IngredientCategory, GroupedIngredient[]> = {
    Carnes: [],
    Frutas: [],
    Verduras: [],
    Cereales: [],
    Condimentos: [],
    Lácteos: [],
    Legumbres: [],
    Pescados: [],
    Aceites: [],
    "Frutos Secos": [],
    Huevos: [],
    Otros: [],
  };

  ingredients.forEach((ingredient) => {
    if (ingredient.category in categorized) {
      categorized[ingredient.category].push(ingredient);
    } else {
      categorized.Otros.push(ingredient);
    }
  });

  // Ordenar alfabéticamente dentro de cada categoría
  Object.keys(categorized).forEach((category) => {
    categorized[category as IngredientCategory].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  });

  return categorized;
}
