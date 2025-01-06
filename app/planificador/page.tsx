"use client";

import { WeeklyPlanner } from "@/components/weekly-planner";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { usePdfExport } from "@/hooks/use-pdf-export";

export default function PlannerPage() {
  const { exportToPdf } = usePdfExport();

  const handleExportPDF = async () => {
    await exportToPdf("planner-content", "plan-nutricional.pdf");
  };

  return (
    <div className='container mx-auto py-10'>
      <div className='mb-8 flex items-center justify-between'>
        <h1 className='text-4xl font-bold'>Planificador de Comidas</h1>
        <Button onClick={handleExportPDF}>
          <FileDown className='mr-2 h-4 w-4' />
          Exportar a PDF
        </Button>
      </div>

      <div id='planner-content'>
        <WeeklyPlanner />
      </div>
    </div>
  );
}
