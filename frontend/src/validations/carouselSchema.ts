import { z } from "zod";

export const carouselSchema = z.object({
  idBook: z.number({ required_error: "El ID del libro es requerido" }).min(1, "El ID del libro debe ser mayor a 0"),
  image: z
    .union([
      z.instanceof(File, { message: "La imagen debe ser un archivo" }).refine(
        (file) => ['image/jpeg', 'image/png'].includes(file.type),
        "La imagen debe ser un archivo JPEG o PNG"
      ),
      z.string().optional(),
    ])
    .optional(),
});

export type CarouselType = z.infer<typeof carouselSchema>;