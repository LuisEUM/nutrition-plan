import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { portions, generalGuidelines } from "@/lib/data/guidelines";

export default function RecommendationsPage() {
  return (
    <div className='container mx-auto py-10'>
      <h1 className='text-4xl font-bold mb-8'>Recomendaciones Nutricionales</h1>

      <Tabs defaultValue='portions' className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='portions'>Porciones Personalizadas</TabsTrigger>
          <TabsTrigger value='guidelines'>
            Recomendaciones Generales
          </TabsTrigger>
        </TabsList>

        <TabsContent value='portions'>
          <div className='grid gap-6 md:grid-cols-2'>
            {portions.map((person) => (
              <Card key={person.id}>
                <CardHeader>
                  <CardTitle>Porciones para {person.name}</CardTitle>
                  <CardDescription>
                    Cantidades recomendadas para cada grupo de alimentos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <dl className='space-y-4'>
                    {Object.entries(person.portions).map(([key, value]) => (
                      <div key={key} className='flex justify-between'>
                        <dt className='font-medium capitalize'>{key}:</dt>
                        <dd className='text-gray-600'>{value}</dd>
                      </div>
                    ))}
                  </dl>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value='guidelines'>
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {generalGuidelines.map((guideline) => (
              <Card key={guideline.id}>
                <CardHeader>
                  <CardTitle>{guideline.title}</CardTitle>
                  <CardDescription className='capitalize'>
                    {guideline.category}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className='text-gray-600'>{guideline.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
