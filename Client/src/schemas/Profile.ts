import z from "zod";

export const ProfileSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must contain at least 4 characters." })
    .max(8)
    .toLowerCase()
    .trim()
    .nonempty(),
  email: z.email().nonempty(),
  password: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 6, {
      message: "Password must contain at least 6 character(s)",
    }),
});
