"use client";

import Flashcard from "@/lib/types/Flashcard";
import { Dispatch, SetStateAction, useEffect } from "react";
import Image from "next/image";
import check_icon from "@/app/assets/icons/check_icon.svg";
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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FlashcardFormValues>({
    resolver: zodResolver(flashcardSchema),
    mode: "all",
    defaultValues: {
      front: "",
      back: "",
      frontImage: undefined,
      backImage: undefined,
    },
  });

  
    useEffect(() => {
      console.log("Current form values:", watch());
    }, [watch("front"), watch("back"), watch("frontImage"), watch("backImage")]);

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

  const { flashcards, setFlashcards } = useFlashcards();

  return (
    <div className="bg-[#1E1E1E] rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-200 text-center w-full">
      <form encType="multipart/form-data">
        <div className="flex flex-col gap-1 bg-[#1E1E1E] rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <label htmlFor="front">Card Front</label>
          <input
            type="text"
            placeholder="Card front..."
            {...register("front")}
          />
          {errors.front && (
            <p className="mt-1 text-xs text-red-500">{errors.front.message}</p>
          )}
          <label htmlFor="frontImage">Attach an image</label>
          <input type="file" {...register("frontImage")} />
          {errors.frontImage && (
            <p className="mt-1 text-xs text-red-500">
              {errors.frontImage.message}
            </p>
          )}
        </div>
        <div className="flex flex-col text-gray-400 mt-2 gap-1">
          <label htmlFor="back">Card Back</label>
          <input type="text" placeholder="Card back..." {...register("back")} />
          {errors.back && (
            <p className="mt-1 text-xs text-red-500">{errors.back.message}</p>
          )}
          <label htmlFor="backImage">Attach an image</label>
          <input type="file" {...register("backImage")} />
          {errors.backImage && (
            <p className="mt-1 text-xs text-red-500">
              {errors.backImage.message}
            </p>
          )}
        </div>

        <div className="flex flex-row justify-evenly mt-5">
          <button type="button" onClick={handleSubmit(onSubmit)}>
            <div className="flex flex-row gap-2">
              <p>Confirm</p>
              <Image src={check_icon} alt="Create card" />
            </div>
          </button>
          <button
            type="button"
            onClick={() => {
              setIsAdding(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
