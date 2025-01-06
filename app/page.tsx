import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const sections = [
  {
    title: "Desayunos",
    description: "Opciones nutritivas para comenzar el día",
    href: "/desayunos",
    icon: "🍳",
  },
  {
    title: "Media Mañana",
    description: "Tentempiés saludables entre comidas",
    href: "/media-manana",
    icon: "🥪",
  },
  {
    title: "Comidas",
    description: "Platos principales equilibrados y sabrosos",
    href: "/comidas",
    icon: "🍽️",
  },
  {
    title: "Meriendas",
    description: "Opciones ligeras para la tarde",
    href: "/meriendas",
    icon: "🍎",
  },
  {
    title: "Cenas",
    description: "Cenas ligeras y nutritivas",
    href: "/cenas",
    icon: "🥗",
  },
  {
    title: "Recomendaciones",
    description: "Guías y consejos nutricionales",
    href: "/recomendaciones",
    icon: "📋",
  },
  {
    title: "Planificador Semanal",
    description: "Organiza tus comidas para toda la semana",
    href: "/planificador",
    icon: "📅",
  },
];

export default function HomePage() {
  return (
    <div className='container mx-auto py-10'>
      <div className='text-center mb-10'>
        <h1 className='text-4xl font-bold mb-4'>
          Plan Nutricional Personalizado
        </h1>
        <p className='text-xl text-gray-600'>
          Descubre recetas saludables y recomendaciones nutricionales adaptadas
          a tus necesidades
        </p>
      </div>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {sections.map((section) => (
          <Link key={section.href} href={section.href}>
            <Card className='h-full hover:shadow-lg transition-shadow'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <span className='text-2xl'>{section.icon}</span>
                  {section.title}
                </CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-sm text-gray-600'>
                  Explora las opciones disponibles en esta sección
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
