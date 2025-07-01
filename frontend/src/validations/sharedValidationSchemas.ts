import { z } from "zod";

export const emailSchema = z
    .string({
        required_error: "Email es requerido",
    })
    .email("Formato de email inválido")
    .refine((val) => val.includes("@") && val.includes(".com"), {
        message: "Tu email debe contener '@' y '.com'",
    });

export const passwordSchema = z
    .string({
        required_error: "La contraseña es requerida",
    })
    .min(6, "Tu contraseña debe tener al menos 6 caracteres");

export const nameSchema = z
    .string({
        required_error: "Nombre es requerido",
    })
    .min(3, "Tu nombre tiene que tener al menos 3 caracteres");

export const usernameSchema = z
    .string({
        required_error: "Nombre de usuario es requerido",
    })
    .min(3, "Tu nombre de usuario tiene que tener al menos 3 caracteres");

export const telSchema = z
    .number({
        required_error: "Número de teléfono es requerido",
        invalid_type_error: "El número de teléfono debe ser un número",
    })
    .int("El número de teléfono debe ser un número entero")
    .positive("El número de teléfono debe ser positivo")
    .optional();
