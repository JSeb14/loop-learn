import z from "zod";

const fileSchema = z.custom<FileList>((val) => {
  return val instanceof FileList && val.length <= 1;
});

export const flashcardSchema = z
  .object({
    front: z
      .string()
      .max(200, { message: "Front side must be 200 characters or fewer" }),
    back: z
      .string()
      .max(200, { message: "Back side must be 200 characters or fewer" }),
    frontImage: fileSchema,
    backImage: fileSchema,
  })
  .refine(
    (data) => data.front.trim().length > 0 || data.frontImage.length > 0,
    {
      message: "Front side is required if no front image is provided",
      path: ["front"],
    }
  )
  .refine((data) => data.back.trim().length > 0 || data.backImage.length > 0, {
    message: "Back side is required if no back image is provided",
    path: ["back"],
  });

export type FlashcardFormValues = z.infer<typeof flashcardSchema>;
