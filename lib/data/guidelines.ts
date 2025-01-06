import { GeneralRecommendation, PersonalizedPortion } from "./types";

export const portions: PersonalizedPortion[] = [
  {
    id: "portions-julia",
    name: "Julia",
    portions: {
      cereals: "60g en crudo",
      legumes: "60g en crudo",
      meat: "200g",
      fish: "200g",
      vegetables: "Sin límite",
      bread: "30g por ingesta",
      fruit: "2-3 piezas al día",
      oil: "10-15ml por comida principal",
    },
  },
  {
    id: "portions-luis",
    name: "Luis",
    portions: {
      cereals: "80g en crudo",
      legumes: "80g en crudo",
      meat: "250g",
      fish: "250g",
      vegetables: "Sin límite",
      bread: "30g por ingesta",
      fruit: "2-3 piezas al día",
      oil: "10-15ml por comida principal",
    },
  },
];

export const generalGuidelines: GeneralRecommendation[] = [
  {
    id: "aceite-oliva",
    title: "Uso del Aceite de Oliva",
    content:
      "Usar aceite de oliva virgen extra para cocinar y aliñar. Las cantidades recomendadas son 10-15ml por comida principal.",
    category: "cooking",
  },
  {
    id: "pan",
    title: "Consumo de Pan",
    content:
      "Limitar el pan a 30g por ingesta, preferiblemente integral. No es necesario en todas las comidas.",
    category: "portions",
  },
  {
    id: "fruta",
    title: "Ingesta de Fruta",
    content:
      "Consumir 2-3 piezas de fruta al día, preferiblemente de temporada. Evitar zumos, incluso naturales.",
    category: "nutrition",
  },
  {
    id: "hidratacion",
    title: "Hidratación",
    content:
      "Beber agua regularmente durante el día, especialmente entre comidas. Evitar bebidas azucaradas.",
    category: "hydration",
  },
  {
    id: "tecnicas-coccion",
    title: "Técnicas de Cocción",
    content:
      "Priorizar técnicas como plancha, horno, vapor o hervido. Evitar fritos y rebozados.",
    category: "cooking",
  },
  {
    id: "ejercicio",
    title: "Actividad Física",
    content:
      "Realizar actividad física moderada regularmente, como caminar 30-45 minutos al día.",
    category: "lifestyle",
  },
  {
    id: "verduras",
    title: "Consumo de Verduras",
    content:
      "Incluir verduras en comida y cena. No hay límite en su consumo, especialmente en verduras de hoja verde.",
    category: "nutrition",
  },
  {
    id: "proteinas",
    title: "Fuentes de Proteína",
    content:
      "Alternar entre carnes magras, pescado, huevos y legumbres. Respetar las porciones indicadas.",
    category: "nutrition",
  },
  {
    id: "cereales",
    title: "Cereales y Legumbres",
    content:
      "Preferir cereales integrales y legumbres. Seguir las porciones recomendadas según el individuo.",
    category: "nutrition",
  },
  {
    id: "snacks",
    title: "Tentempiés Saludables",
    content:
      "Elegir opciones saludables como fruta, yogur natural o frutos secos para media mañana y merienda.",
    category: "nutrition",
  },
];
