import z from "zod";

export const setSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .min(2, { message: "Must be 2 or more characters long" })
    .max(100, { message: "Must be 100 or fewer characters long" }),
  description: z
    .string()
    .max(100, { message: "Must be 100 or fewer characters long" })
    .optional(),
  isPrivate: z.boolean(),
  subject: z.string().optional(),
});

export type SetFormValues = z.infer<typeof setSchema>;
