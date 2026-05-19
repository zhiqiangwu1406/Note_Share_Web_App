import * as z from "zod";

export const registerSchema = z.object({
  username: z.string().min(4).max(8).nonempty().toLowerCase().trim(),
  email: z.email().nonempty(),
  password: z.string().nonempty().min(6).max(12).trim(),
});
