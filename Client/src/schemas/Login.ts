import * as z from "zod";

export const loginSchema = z.object({
  email: z.email().trim().nonempty(),
  password: z
    .string()
    .min(6, { message: "Password must contain at least 6 characters" })
    .trim()
    .nonempty({ message: "This field is required" }),
});
