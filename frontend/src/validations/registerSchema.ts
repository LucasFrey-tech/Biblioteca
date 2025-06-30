import { z } from "zod";
import { emailSchema, passwordSchema, nameSchema, usernameSchema } from "./sharedValidationSchemas";

export const registerSchema = z
  .object({
    firstname: nameSchema,
    lastname: nameSchema,
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string({
      required_error: "Confirma tu contraseña",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Tus contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type RegisterType = z.infer<typeof registerSchema>;