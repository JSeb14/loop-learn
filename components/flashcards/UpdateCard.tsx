"use client";

import {
  FlashcardFormValues,
  flashcardSchema,
} from "@/lib/schemas/flashcardSchema";
import Flashcard from "@/lib/types/Flashcard";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import check_icon from "@/app/assets/icons/check_icon.svg";
import remove_selection_icon from "@/app/assets/icons/remove_selection.svg";
import { updateFlashcard } from "@/lib/services/flashcards/flashcardService";
import { useFlashcards } from "@/lib/hooks/useFlashcards";

export default function UpdateCard({
  card,
  frontImageUrl,
  backImageUrl,
  setIsEditing,
}: {
  card: Flashcard;
  frontImageUrl: string | null;
  backImageUrl: string | null;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}) {
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
      frontImage: undefined,
      backImage: undefined,
    },
  });

  // Populate frontImage field with a File object from frontImageUrl
  useEffect(() => {
    async function fetchAndSetFile(
      url: string,
      field: "frontImage" | "backImage"
    ) {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const filename = url.split("/").pop() || "image.jpg";
        const file = new File([blob], filename, { type: blob.type });
        const data = new DataTransfer();
        data.items.add(file);
        setValue(field, data.files);
      } catch (e) {}
    }

    if (frontImageUrl) {
      fetchAndSetFile(frontImageUrl, "frontImage");
    }
    if (backImageUrl) {
      fetchAndSetFile(backImageUrl, "backImage");
    } else {
      setValue("backImage", new DataTransfer().files);
    }
  }, [backImageUrl, frontImageUrl, setValue]);

  //   useEffect(() => {
  //     console.log("Current form values:", watch());
  //   }, [watch("front"), watch("back"), watch("frontImage"), watch("backImage")]);

  const removeFrontImage = () => {
    setFrontImageUrlDisplayed(null);
    setValue("frontImage", new DataTransfer().files);
    setIsNewFrontImage(true);
  };

  const removeBackImage = () => {
    setBackImageUrlDisplayed(null);
    setValue("backImage", new DataTransfer().files);
    setIsNewBackImage(true);
  };

  const onSubmit = (data: FlashcardFormValues) => {
    updateFlashcard(card, {
      front: data.front,
      back: data.back,
      frontImage: isNewFrontImage ? data.frontImage[0] : undefined,
      backImage: isNewBackImage ? data.backImage[0] : undefined,
      isNewFrontImage,
      isNewBackImage,
    }).then(async (response) => {
      if (response) {
        const data: Flashcard = await response.json();
        const cardSet = flashcards.filter((card) => card.id !== data.id);
        setFlashcards([...cardSet, data]);
      }
      setIsEditing(false);
    });
  };

  return (
    <div className="bg-[#1E1E1E] rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-200 text-center w-full">
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
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
          <div className="flex flex-row gap-3">
            <button type="button" onClick={removeFrontImage}>
              <Image src={remove_selection_icon} alt="Remove image" />
            </button>
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setValue("frontImage", e.target.files);
                  setIsNewFrontImage(true);
                }
              }}
            />
          </div>

          {errors.frontImage && (
            <p className="mt-1 text-xs text-red-500">
              {errors.frontImage.message}
            </p>
          )}
          {(watch("frontImage")?.[0] ||
            typeof frontImageUrlDisplayed === "string") && (
            <Image
              src={
                watch("frontImage")?.[0]
                  ? URL.createObjectURL(watch("frontImage")[0])
                  : (frontImageUrlDisplayed as string)
              }
              alt={card?.front}
              width={250}
              height={250}
              className="mx-auto mt-2"
            />
          )}
        </div>
        <div className="flex flex-col text-gray-400 mt-2 gap-1">
          <label htmlFor="back">Card Back</label>
          <input type="text" placeholder="Card back..." {...register("back")} />
          {errors.back && (
            <p className="mt-1 text-xs text-red-500">{errors.back.message}</p>
          )}

          <div className="flex flex-row gap-3">
            <button type="button" onClick={removeBackImage}>
              <Image src={remove_selection_icon} alt="Remove image" />
            </button>
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setValue("backImage", e.target.files);
                  setIsNewBackImage(true);
                }
              }}
            />
          </div>
          {(watch("backImage")?.[0] ||
            typeof backImageUrlDisplayed === "string") && (
            <Image
              src={
                watch("backImage")?.[0]
                  ? URL.createObjectURL(watch("backImage")[0])
                  : (backImageUrlDisplayed as string)
              }
              alt={card?.back}
              width={250}
              height={250}
              className="mx-auto mt-2"
            />
          )}
          {errors.backImage && (
            <p className="mt-1 text-xs text-red-500">
              {errors.backImage.message}
            </p>
          )}
        </div>

        <div className="flex flex-row justify-evenly mt-5">
          <button type="submit">
            <div className="flex flex-row gap-2">
              <p>Confirm</p>
              <Image src={check_icon} alt="Create card" />
            </div>
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
