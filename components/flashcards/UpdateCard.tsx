"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

import {
  FlashcardFormValues,
  flashcardSchema,
} from "@/lib/schemas/flashcardSchema";
import Flashcard from "@/lib/types/Flashcard";
import { updateFlashcard } from "@/lib/services/flashcards/flashcardService";
import { useFlashcards } from "@/lib/hooks/useFlashcards";

import check from "@/app/assets/icons/check.svg";
import remove_selection from "@/app/assets/icons/remove_selection.svg";

interface UpdateCardProps {
  card: Flashcard;
  frontImageUrl: string | null;
  backImageUrl: string | null;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

export default function UpdateCard({
  card,
  frontImageUrl,
  backImageUrl,
  setIsEditing,
}: UpdateCardProps) {
  const { flashcards, setFlashcards } = useFlashcards();

  const [isNewFrontImage, setIsNewFrontImage] = useState(false);
  const [isNewBackImage, setIsNewBackImage] = useState(false);
  const [frontImageUrlDisplayed, setFrontImageUrlDisplayed] = useState<
    string | null
  >(frontImageUrl);
  const [backImageUrlDisplayed, setBackImageUrlDisplayed] = useState<
    string | null
  >(backImageUrl);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FlashcardFormValues>({
    resolver: zodResolver(flashcardSchema),
    mode: "all",
    defaultValues: {
      front: card.front,
      back: card.back,
      frontImage: new DataTransfer().files,
      backImage: new DataTransfer().files,
    },
  });

  // Populate image fields with File objects from URLs
  useEffect(() => {
    const fetchAndSetFile = async (
      url: string,
      field: "frontImage" | "backImage"
    ) => {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const filename = url.split("/").pop() || "image.jpg";
        const file = new File([blob], filename, { type: blob.type });
        const data = new DataTransfer();
        data.items.add(file);
        setValue(field, data.files);
      } catch {
        // Silently handle fetch errors
      }
    };

    if (frontImageUrl) {
      fetchAndSetFile(frontImageUrl, "frontImage");
    }
    if (backImageUrl) {
      fetchAndSetFile(backImageUrl, "backImage");
    } else {
      setValue("backImage", new DataTransfer().files);
    }
  }, [backImageUrl, frontImageUrl, setValue]);

  const removeFrontImage = () => {
    setFrontImageUrlDisplayed(null);
    setValue("frontImage", new DataTransfer().files);
    setIsNewFrontImage(true);
    const input = document.getElementById(
      "frontImageInput"
    ) as HTMLInputElement | null;
    if (input) input.value = "";
  };

  const removeBackImage = () => {
    setBackImageUrlDisplayed(null);
    setValue("backImage", new DataTransfer().files);
    setIsNewBackImage(true);
    const input = document.getElementById(
      "backImageInput"
    ) as HTMLInputElement | null;
    if (input) input.value = "";
  };

  const onSubmit = async (data: FlashcardFormValues) => {
    try {
      const response = await updateFlashcard(card, {
        front: data.front,
        back: data.back,
        frontImage: isNewFrontImage ? data.frontImage[0] : undefined,
        backImage: isNewBackImage ? data.backImage[0] : undefined,
        isNewFrontImage,
        isNewBackImage,
        ease_factor: card.ease_factor,
        interval: card.interval,
        repetitions: card.repetitions,
        last_review_date: card.last_review_date,
        next_review_date: card.next_review_date,
      });

      if (response) {
        const updatedCard: Flashcard = await response.json();
        const filteredCards = flashcards.filter(
          (card) => card.id !== updatedCard.id
        );
        setFlashcards([...filteredCards, updatedCard]);
      }
    } finally {
      setIsEditing(false);
    }
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
                      type="file"
                      id="frontImageInput"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setValue("frontImage", e.target.files);
                          setIsNewFrontImage(true);
                        }
                      }}
                    />
                    {(watch("frontImage")?.[0] || frontImageUrlDisplayed) && (
                      <button type="button" onClick={removeFrontImage}>
                        <Image src={remove_selection} alt="Remove image" />
                      </button>
                    )}
                  </div>
                </div>

                {errors.frontImage && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.frontImage.message}
                  </p>
                )}

                {(watch("frontImage")?.[0] || frontImageUrlDisplayed) && (
                  <Image
                    src={
                      watch("frontImage")?.[0]
                        ? URL.createObjectURL(watch("frontImage")[0])
                        : (frontImageUrlDisplayed as string)
                    }
                    alt={card.front}
                    width={250}
                    height={250}
                    className="mx-auto mt-2"
                  />
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
                      type="file"
                      id="backImageInput"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setValue("backImage", e.target.files);
                          setIsNewBackImage(true);
                        }
                      }}
                    />
                    {(watch("backImage")?.[0] || backImageUrlDisplayed) && (
                      <button type="button" onClick={removeBackImage}>
                        <Image src={remove_selection} alt="Remove image" />
                      </button>
                    )}
                  </div>
                </div>

                {errors.backImage && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.backImage.message}
                  </p>
                )}

                {(watch("backImage")?.[0] || backImageUrlDisplayed) && (
                  <Image
                    src={
                      watch("backImage")?.[0]
                        ? URL.createObjectURL(watch("backImage")[0])
                        : (backImageUrlDisplayed as string)
                    }
                    alt={card.back}
                    width={250}
                    height={250}
                    className="mx-auto mt-2"
                  />
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
        <button type="button" onClick={() => setIsEditing(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
}
