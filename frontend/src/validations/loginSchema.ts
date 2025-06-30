import { z } from "zod";
import { emailSchema, passwordSchema } from "./sharedValidationSchemas";

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type UserType = z.infer<typeof loginSchema>;