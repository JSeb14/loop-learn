"use client";

import { Flashcard, useFlashcardStore } from "@/app/util/flashcardStore";
import { useState } from "react";
import Image from "next/image";
import edit_icon2 from "@/app/assets/edit_icon.svg";
import check_icon from "@/app/assets/check_icon.svg";
import delete_icon from "@/app/assets/delete_icon.svg";

export default function FlashcardItem({ card }: { card: Flashcard }) {
  const setFlashcards = useFlashcardStore((state) => state.setFlashcards);
  const flashcards: Flashcard[] = useFlashcardStore(
    (state) => state.flashcards
  );

  const [front, setFront] = useState(card.front);
  const [back, setBack] = useState(card.back);
  const [isEditing, setIsEditing] = useState(false);

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
        const cardSet = flashcards.filter((c) => c.id !== card.id);
        setFlashcards(cardSet);
      }
    }
  }

  return (
    <>
      {!isEditing ? (
        <div className="flex flex-row w-full gap-3">
          <div className="bg-[#1E1E1E] rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-200 text-center w-full">
            <h3 className="bg-[#1E1E1E] rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-200">
              {card?.front}
            </h3>
            <h3 className="text-gray-400 mt-2">{card?.back}</h3>
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
