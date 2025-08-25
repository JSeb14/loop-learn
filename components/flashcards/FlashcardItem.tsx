"use client";

import Flashcard from "@/lib/types/Flashcard";
import React, { useState } from "react";
import Image from "next/image";
import edit_icon2 from "@/app/assets/icons/edit_icon.svg";
import delete_icon from "@/app/assets/icons/delete_icon.svg";
import { useFlashcards } from "@/lib/hooks/useFlashcards";
import {
  deleteFlashcard,
} from "@/lib/services/flashcards/flashcardService";
import { useSignedUrl } from "@/lib/hooks/useSignedUrl";
import UpdateCard from "./UpdateCard";

export default function FlashcardItem({ card }: { card: Flashcard }) {
  const { flashcards, setFlashcards } = useFlashcards();
  const [isEditing, setIsEditing] = useState(false);

  const { url: frontImageUrl } = useSignedUrl(card.front_image || null);
  const { url: backImageUrl } = useSignedUrl(card.back_image || null);

  return (
    <>
      {!isEditing ? (
        <div className="flex flex-row w-full gap-3">
          <div className="bg-[#1E1E1E] rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-200 w-full flex flex-col items-center text-center">
            <h3 className="bg-[#1E1E1E] rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-200 w-full flex flex-col items-center text-center">
              {card?.front}
              {frontImageUrl && (
                <Image
                  src={frontImageUrl as string}
                  alt={card?.front}
                  width={250}
                  height={250}
                  className="mx-auto mt-2"
                />
              )}
            </h3>
            <h3 className="text-gray-400 mt-2 text-center">
              {card?.back}
              {backImageUrl && (
                <Image
                  src={backImageUrl as string}
                  alt={card?.back}
                  width={250}
                  height={250}
                  className="mx-auto mt-2"
                />
              )}
            </h3>
          </div>
          <div className={"flex flex-col gap-3 justify-center"}>
            <button
              onClick={() => {
                setIsEditing(true);
              }}
            >
              <Image src={edit_icon2} alt="Edit card" width={30} />
            </button>
            <button
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you'd like to delete this flashcard?"
                  )
                ) {
                  deleteFlashcard(card).then((result) => {
                    if (result) {
                      // Update local state after successful flashcard deletion
                      const cardSet = flashcards.filter(
                        (c) => c.id !== card.id
                      );
                      setFlashcards(cardSet);
                    }
                  });
                }
              }}
            >
              <Image src={delete_icon} alt="Delete card" width={30} />
            </button>
          </div>
        </div>
      ) : (
        <UpdateCard card={card} frontImageUrl={frontImageUrl} backImageUrl={backImageUrl} setIsEditing={setIsEditing} />
      )}
    </>
  );
}
