import { Recipe } from "./types";

export const snackRecipes: Recipe[] = [
  {
    id: "snack-hummus-crudites",
    title: "Hummus con Crudités",
    ingredients: [
      {
        name: "Hummus",
        amount: 50,
        unit: "g",
        category: "Legumbres",
      },
      {
        name: "Zanahorias",
        amount: 100,
        unit: "g",
        category: "Verduras",
      },
      {
        name: "Apio",
        amount: 50,
        unit: "g",
        category: "Verduras",
      },
      {
        name: "Pan Integral",
        amount: 30,
        unit: "g",
        category: "Cereales",
      },
    ],
    instructions: [
      "Lavar y cortar las verduras en bastones",
      "Servir con el hummus",
      "Acompañar con pan integral si se desea",
    ],
    benefits: [
      "Proteína vegetal del hummus",
      "Fibra de las verduras",
      "Vitaminas y minerales",
      "Carbohidratos complejos del pan",
    ],
    category: "snack",
    healthGoals: ["balanced", "lowCholesterol"],
    preparationTime: "5 minutos",
    servingSize: "1 porción",
  },
  {
    id: "snack-yogur-frutas",
    title: "Yogur con Frutas y Canela",
    ingredients: [
      {
        name: "Yogur Natural Desnatado Sin Azúcar",
        amount: 125,
        unit: "g",
        category: "Lácteos",
      },
      {
        name: "Fruta de Temporada",
        amount: 100,
        unit: "g",
        category: "Frutas",
      },
      {
        name: "Canela de Ceylán",
        amount: 1,
        unit: "pizca",
        category: "Condimentos",
      },
    ],
    instructions: [
      "Lavar y trocear la fruta",
      "Mezclar con el yogur",
      "Espolvorear canela al gusto",
    ],
    benefits: [
      "Probióticos del yogur",
      "Vitaminas de la fruta fresca",
      "Bajo en calorías",
      "Alto en proteínas",
    ],
    category: "snack",
    healthGoals: ["balanced", "immuneSystem"],
    preparationTime: "5 minutos",
    servingSize: "1 porción",
  },
  {
    id: "snack-frutos-secos",
    title: "Mix de Frutos Secos y Frutas Deshidratadas",
    ingredients: [
      {
        name: "Almendras Crudas",
        amount: 10,
        unit: "g",
        category: "Frutos Secos",
      },
      {
        name: "Nueces",
        amount: 10,
        unit: "g",
        category: "Frutos Secos",
      },
      {
        name: "Pasas",
        amount: 5,
        unit: "g",
        category: "Frutas",
      },
    ],
    instructions: [
      "Mezclar todos los ingredientes",
      "Consumir como snack entre horas",
    ],
    benefits: [
      "Grasas saludables",
      "Proteínas vegetales",
      "Minerales esenciales",
      "Energía sostenida",
    ],
    category: "snack",
    healthGoals: ["balanced"],
    preparationTime: "2 minutos",
    servingSize: "1 porción",
  },
  {
    id: "snack-batido-proteico",
    title: "Batido de Proteínas con Plátano",
    ingredients: [
      {
        name: "Leche Desnatada o Vegetal Sin Azúcar",
        amount: 250,
        unit: "ml",
        category: "Lácteos",
      },
      {
        name: "Plátano",
        amount: 1,
        unit: "unidad",
        category: "Frutas",
      },
      {
        name: "Canela de Ceylán",
        amount: 1,
        unit: "pizca",
        category: "Condimentos",
      },
    ],
    instructions: [
      "Pelar y trocear el plátano",
      "Batir con la leche",
      "Añadir canela al gusto",
    ],
    benefits: [
      "Proteínas de alta calidad",
      "Potasio del plátano",
      "Calcio de la leche",
      "Energía rápida y sostenida",
    ],
    category: "snack",
    healthGoals: ["balanced", "immuneSystem"],
    preparationTime: "5 minutos",
    servingSize: "1 porción",
  },
];
