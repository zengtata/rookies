import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .refine((val) => /[a-z]/.test(val) && /[A-Z]/.test(val), {
      message:
        "Password must contain at least one uppercase and one lowercase letter.",
    }),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .refine((val) => /[a-z]/.test(val) && /[A-Z]/.test(val), {
      message:
        "Password must contain at least one uppercase and one lowercase letter.",
    }),
});
