import { z } from "zod";
import { nameSchema } from "./sharedValidationSchemas";

export const bookSchema = z.object({
    title: nameSchema.min(3, "El título debe tener al menos 3 caracteres"),
    description: z
        .string({ required_error: "La descripción es requerida" })
        .min(10, "La descripción debe tener al menos 10 caracteres"),
    anio: z
        .number({ required_error: "El año es requerido" })
        .int("El año debe ser un número entero")
        .min(1500, "El año debe ser posterior a 1500")
        .max(new Date().getFullYear(), `El año no puede ser posterior a ${new Date().getFullYear()}`),
    isbn: z
        .string({ required_error: "El ISBN es requerido" })
        .regex(
            /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/,
            "El ISBN debe ser un ISBN-10 o ISBN-13 válido"
        ),
    stock: z
        .number({ required_error: "El stock es requerido" })
        .int("El stock debe ser un número entero")
        .min(0, "El stock no puede ser negativo"),
    price: z
        .number({ required_error: "El precio es requerido" })
        .positive("El precio debe ser mayor a 0")
        .refine((val) => Number(val.toFixed(2)) === val, {
            message: "El precio debe tener hasta 2 decimales",
        }),
    author_id: z
        .number({ required_error: "El autor es requerido" })
        .int("El ID del autor debe ser un número entero")
        .positive("El ID del autor debe ser positivo"),
    genre: z
        .array(z.number().int().positive())
        .min(1, "Debe seleccionar al menos un género"),
    subscriber_exclusive: z.boolean(),
    image: z.instanceof(File).optional().refine(
        (file) => !file || ['image/jpeg', 'image/png'].includes(file.type),
        "La imagen debe ser un archivo JPEG o PNG"
    ),
    content: z.instanceof(File).optional().refine(
        (file) => !file || file.type === 'text/plain',
        "El contenido debe ser un archivo de texto (.txt)"
    ),
});

export type BookType = z.infer<typeof bookSchema>;