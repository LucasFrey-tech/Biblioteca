import { z } from "zod";
import { emailSchema, passwordSchema, nameSchema, usernameSchema, telSchema } from "./sharedValidationSchemas";

export const profileSchema = z.object({
  firstname: nameSchema,
  lastname: nameSchema,
  username: usernameSchema,
  email: emailSchema,
  tel: telSchema,
  pass: passwordSchema.optional(),
});

export type ProfileType = z.infer<typeof profileSchema>;