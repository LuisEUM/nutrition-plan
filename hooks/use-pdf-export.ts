import { useCallback } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export function usePdfExport() {
  const exportToPdf = useCallback(
    async (elementId: string, filename: string) => {
      try {
        const element = document.getElementById(elementId);
        if (!element) {
          throw new Error("Element not found");
        }

        // Capturar el contenido como imagen
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          logging: false,
        });

        // Crear el PDF
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });

        // Calcular las dimensiones para ajustar la imagen al PDF
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const pageHeight = 297; // A4 height in mm

        let heightLeft = imgHeight;
        let position = 0;

        // Añadir la primera página
        pdf.addImage(
          canvas.toDataURL("image/jpeg", 1.0),
          "JPEG",
          0,
          position,
          imgWidth,
          imgHeight
        );
        heightLeft -= pageHeight;

        // Añadir páginas adicionales si es necesario
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(
            canvas.toDataURL("image/jpeg", 1.0),
            "JPEG",
            0,
            position,
            imgWidth,
            imgHeight
          );
          heightLeft -= pageHeight;
        }

        // Guardar el PDF
        pdf.save(filename);
      } catch (error) {
        console.error("Error al exportar a PDF:", error);
      }
    },
    []
  );

  return { exportToPdf };
}
