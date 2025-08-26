"use client";

import Flashcard from "@/lib/types/Flashcard";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import check from "@/app/assets/icons/check.svg";
import remove_selection from "@/app/assets/icons/remove_selection.svg";
import { useFlashcards } from "@/lib/hooks/useFlashcards";
import { postCard } from "@/lib/services/flashcards/flashcardService";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FlashcardFormValues,
  flashcardSchema,
} from "@/lib/schemas/flashcardSchema";
import { useForm } from "react-hook-form";

export default function CreateCard({
  setId,
  setIsAdding,
}: {
  setId: string;
  setIsAdding: Dispatch<SetStateAction<boolean>>;
}) {
  const { flashcards, setFlashcards } = useFlashcards();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FlashcardFormValues>({
    resolver: zodResolver(flashcardSchema),
    mode: "all",
    defaultValues: {
      front: "",
      back: "",
      frontImage: new DataTransfer().files,
      backImage: new DataTransfer().files,
    },
  });

  const onSubmit = (data: FlashcardFormValues) => {
    const frontImageFile =
      data.frontImage instanceof FileList
        ? data.frontImage[0]
        : data.frontImage;

    const backImageFile =
      data.backImage instanceof FileList ? data.backImage[0] : data.backImage;

    postCard({
      front: data.front,
      back: data.back,
      frontImage: frontImageFile,
      backImage: backImageFile,
      setId,
    }).then(async (response) => {
      if (response) {
        // Handle successful card creation
        const data = await response.json();
        const newCard: Flashcard = data;
        setFlashcards([...flashcards, newCard]);
      }
      setIsAdding(false);
    });
  };

  const removeFrontImage = () => {
    setValue("frontImage", new DataTransfer().files);
    const input = document.getElementById(
      "frontImageInput"
    ) as HTMLInputElement | null;
    if (input) input.value = "";
  };

  const removeBackImage = () => {
    setValue("backImage", new DataTransfer().files);
    const input = document.getElementById(
      "backImageInput"
    ) as HTMLInputElement | null;
    if (input) input.value = "";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <div className="group relative">
        <div className="bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:items-stretch">
            <div className="space-y-3 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-primary rounded-full" />
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Front
                </span>
              </div>
              <div className="bg-secondary/30 rounded-lg p-4 min-h-[120px] flex flex-col flex-1">
                <input
                  type="text"
                  placeholder="Card front..."
                  className="border border-border rounded-md p-2 bg-background"
                  {...register("front")}
                />
                {errors.front && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.front.message}
                  </p>
                )}

                <div className="flex flex-col mt-6 items-center content-center justify-center">
                  <label
                    className="text-sm font-medium text-muted-foreground uppercase"
                    htmlFor="frontImage"
                  >
                    Attach an image
                  </label>
                  <div className="flex flex-col gap-3 my-3 items-center">
                    <input
                      id="frontImageInput"
                      type="file"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setValue("frontImage", e.target.files);
                        }
                      }}
                    />
                    {watch("frontImage")?.[0] && (
                      <button type="button" onClick={removeFrontImage}>
                        <Image src={remove_selection} alt="Remove image" />
                      </button>
                    )}

                    {watch("frontImage")?.[0] && (
                      <Image
                        src={URL.createObjectURL(watch("frontImage")[0])}
                        alt={watch("front")}
                        width={250}
                        height={250}
                        className="mx-auto mt-2"
                      />
                    )}
                  </div>
                </div>

                {errors.frontImage && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.frontImage.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-3 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-accent rounded-full" />
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Back
                </span>
              </div>
              <div className="bg-accent/10 rounded-lg p-4 min-h-[120px] flex flex-col flex-1">
                <input
                  type="text"
                  placeholder="Card back..."
                  className="border border-border rounded-md p-2 bg-background"
                  {...register("back")}
                />
                {errors.back && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.back.message}
                  </p>
                )}

                <div className="flex flex-col mt-6 items-center content-center justify-center">
                  <label
                    className="text-sm font-medium text-muted-foreground uppercase"
                    htmlFor="backImage"
                  >
                    Attach an image
                  </label>
                  <div className="flex flex-col gap-3 my-3 items-center">
                    <input
                      id="backImageInput"
                      type="file"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setValue("backImage", e.target.files);
                        }
                      }}
                    />
                    {watch("backImage")?.[0] && (
                      <button type="button" onClick={removeBackImage}>
                        <Image src={remove_selection} alt="Remove image" />
                      </button>
                    )}

                    {watch("backImage")?.[0] && (
                      <Image
                        src={URL.createObjectURL(watch("backImage")[0])}
                        alt={watch("back")}
                        width={250}
                        height={250}
                        className="mx-auto mt-2"
                      />
                    )}
                  </div>
                </div>

                {errors.frontImage && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.frontImage.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-evenly mt-5">
        <button type="submit">
          <div className="flex flex-row gap-2">
            <p>Confirm</p>
            <Image src={check} alt="Create card" />
          </div>
        </button>
        <button type="button" onClick={() => setIsAdding(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
}
