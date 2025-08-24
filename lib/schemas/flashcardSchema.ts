import z from "zod";

// Custom validation for file inputs
const fileSchema = z
  .custom<File | undefined>((val) => {
    if (!val || (val instanceof FileList && val.length === 0)) {
      return true;
    }

    if (val instanceof FileList) {
      return val.length > 0;
    }

    return val instanceof File;
  })
  .optional();

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
    (data) =>
      (data.frontImage === undefined &&
        data.front &&
        data.front.length === 0), {
        message: "Front side is required if no front image is provided",
        path: ["front"],
      }
  )
  .refine(
    (data) =>
      (data.backImage === undefined && data.back && data.back.length === 0), {
        message: "Back side is required if no back image is provided",
        path: ["back"],
      }
  );

export type FlashcardFormValues = z.infer<typeof flashcardSchema>;
