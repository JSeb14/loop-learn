"use client";

import { Flashcard, useFlashcardStore } from "@/app/util/flashcardStore";
import { useEffect, useState } from "react";
import Image from "next/image";
import edit_icon2 from "@/app/assets/edit_icon.svg";
import check_icon from "@/app/assets/check_icon.svg";
import delete_icon from "@/app/assets/delete_icon.svg";
import { createClient } from "@/lib/supabase/client";
import { deleteImage } from "@/app/controllers/images/image_controller";

export default function FlashcardItem({ card }: { card: Flashcard }) {
  const setFlashcards = useFlashcardStore((state) => state.setFlashcards);
  const flashcards: Flashcard[] = useFlashcardStore(
    (state) => state.flashcards
  );

  const [front, setFront] = useState(card.front);
  const [back, setBack] = useState(card.back);
  const [isEditing, setIsEditing] = useState(false);
  const [frontImageUrl, setFrontImageUrl] = useState<string | null>(null);
  const [backImageUrl, setBackImageUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSignedUrl() {
      if (card.front_image) {
        const supabase = createClient();
        const { data, error } = await supabase.storage
          .from("flashcards")
          .createSignedUrl(card.front_image, 60 * 60 * 2);
        if (data?.signedUrl) setFrontImageUrl(data.signedUrl);
      }
      if (card.back_image) {
        const supabase = createClient();
        const { data, error } = await supabase.storage
          .from("flashcards")
          .createSignedUrl(card.back_image, 60 * 60 * 2);
        if (data?.signedUrl) setBackImageUrl(data.signedUrl);
      }
    }
    fetchSignedUrl();
  }, [card.front_image, card.back_image]);

  async function updateCard() {
    setIsEditing(true);
    try {
      const response = await fetch(`/api/flashcards/${card.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          front,
          back,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating set:", errorData);
        return;
      }

      const data = await response.json();
      const updatedCard: Flashcard = data;
      const cardSet = flashcards.filter((card) => card.id !== updatedCard.id);
      setFlashcards([...cardSet, updatedCard]);
    } catch (error) {
      console.error("Failed to update set:", error);
    }

    setIsEditing(false);
  }

  async function deleteCard() {
    if (window.confirm("Are you sure you'd like to delete this flashcard?")) {
      const response = await fetch(`/api/flashcards/${card.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        alert("Failed to delete flashcard.");
      } else {
        if (card.front_image || card.back_image) {
          const response = await fetch("/api/images", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          body: JSON.stringify({
            paths: [card.front_image, card.back_image].filter(Boolean),
          }),
        });
        if (!response.ok) {
          console.error("Error deleting images");
        }

        const cardSet = flashcards.filter((c) => c.id !== card.id);
        setFlashcards(cardSet);
      }
    }
  }

  return (
    <>
      {!isEditing ? (
        <div className="flex flex-row w-full gap-3">
          <div className="bg-[#1E1E1E] rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-200 w-full flex flex-col items-center text-center">
            <h3 className="bg-[#1E1E1E] rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-200 w-full flex flex-col items-center text-center">
              {card?.front}
              {frontImageUrl && (
                <Image
                  src={frontImageUrl}
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
                  src={backImageUrl}
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
                  deleteCard();
                }
              }}
            >
              <Image src={delete_icon} alt="Delete card" width={30} />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-[#1E1E1E] rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-200 text-center w-full">
            <div className="flex flex-col gap-1 bg-[#1E1E1E] rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <label htmlFor="front">Card Front</label>
              <input
                value={front}
                type="text"
                placeholder="Card front..."
                onChange={(e) => {
                  setFront(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col text-gray-400 mt-2 gap-1">
              <label htmlFor="back">Card Back</label>
              <input
                value={back}
                type="text"
                placeholder="Card back..."
                onChange={(e) => {
                  setBack(e.target.value);
                }}
              />
            </div>

            <div className="flex flex-row justify-evenly mt-5">
              <button onClick={updateCard}>
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
          </div>
        </>
      )}
    </>
  );
}
