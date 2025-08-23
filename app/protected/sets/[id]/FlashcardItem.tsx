"use client";

import Flashcard from "@/lib/types/Flashcard";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import edit_icon2 from "@/app/assets/icons/edit_icon.svg";
import check_icon from "@/app/assets/icons/check_icon.svg";
import delete_icon from "@/app/assets/icons/delete_icon.svg";
import { uploadImages } from "@/app/util/upload";
import { useFlashcards } from "@/lib/hooks/UseFlashcards";

export default function FlashcardItem({ card }: { card: Flashcard }) {

  const {flashcards, setFlashcards} = useFlashcards();

  const [front, setFront] = useState(card.front);
  const [back, setBack] = useState(card.back);
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [isNewFrontImage, setIsNewFrontImage] = useState(false);
  const [isNewBackImage, setIsNewBackImage] = useState(false);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [frontImageUrl, setFrontImageUrl] = useState<string | null>(null);
  const [backImageUrl, setBackImageUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSignedUrl() {
      if (card.front_image) {
        const response = await fetch("/api/signed_url", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ path: card.front_image }),
        });
        if (response.ok) {
          const data = await response.json();
          if (data?.signedUrl) setFrontImageUrl(data.signedUrl);
        }
      }
      if (card.back_image) {
        const response = await fetch("/api/signed_url", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ path: card.back_image }),
        });
        if (response.ok) {
          const data = await response.json();
          if (data?.signedUrl) setBackImageUrl(data.signedUrl);
        }
      }
    }
    fetchSignedUrl();
  }, [card.front_image, card.back_image]);

  async function deleteImages(paths: (string | null)[]) {
    if (paths.length > 0) {
      try {
        const imgResponse = await fetch("/api/images", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ paths }),
        });
        if (!imgResponse.ok) {
          console.error("Error deleting images");
        }
      } catch (err) {
        console.error("Error deleting images", err);
      }
    }
  }

  async function updateCard() {
    const paths = [];
    if (isNewFrontImage) paths.push(card.front_image);
    if (isNewBackImage) paths.push(card.back_image);

    // First delete old images if necessary
    deleteImages(paths);

    // Now upload new images
    const { frontUrl, backUrl } = await uploadImages(
      frontImage,
      backImage,
      card.set_id
    );

    try {
      const response = await fetch(`/api/flashcards/${card.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          front,
          back,
          front_image: frontUrl,
          back_image: backUrl,
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
    if (!window.confirm("Are you sure you'd like to delete this flashcard?")) {
      return;
    }

    // First, delete the flashcard from the database
    const response = await fetch(`/api/flashcards/${card.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      alert("Failed to delete flashcard.");
      return;
    }

    // If the flashcard had images, attempt to delete them
    const paths = [card.front_image, card.back_image].filter(Boolean);
    deleteImages(paths);

    // Update local state after successful flashcard deletion
    const cardSet = flashcards.filter((c) => c.id !== card.id);
    setFlashcards(cardSet);
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
                  deleteCard();
                }
              }}
            >
              <Image src={delete_icon} alt="Delete card" width={30} />
            </button>
          </div>
        </div>
      ) : (
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
            <label htmlFor="frontImage">Attach an image</label>
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFrontImage(e.target.files[0]);
                  setIsNewFrontImage(true);
                }
              }}
            />
            {(frontImage || typeof frontImageUrl === "string") && (
              <Image
                src={
                  frontImage
                    ? URL.createObjectURL(frontImage)
                    : (frontImageUrl as string)
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
            <input
              value={back}
              type="text"
              placeholder="Card back..."
              onChange={(e) => {
                setBack(e.target.value);
              }}
            />
            <label htmlFor="backImage">Attach an image</label>
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setBackImage(e.target.files[0]);
                  setIsNewBackImage(true);
                }
              }}
            />
            {(backImage || typeof backImageUrl === "string") && (
              <Image
                src={
                  backImage
                    ? URL.createObjectURL(backImage)
                    : (backImageUrl as string)
                }
                alt={card?.back}
                width={250}
                height={250}
                className="mx-auto mt-2"
              />
            )}
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
      )}
    </>
  );
}
