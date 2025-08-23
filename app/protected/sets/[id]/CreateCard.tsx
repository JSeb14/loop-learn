"use client";

import Flashcard from "@/lib/types/Flashcard";
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import check_icon from "@/app/assets/icons/check_icon.svg";
import { uploadImages } from "@/app/util/upload";
import { useFlashcards } from "@/lib/hooks/UseFlashcards";

export default function CreateCard({
  setId,
  setIsAdding,
}: {
  setId: string;
  setIsAdding: Dispatch<SetStateAction<boolean>>;
}) {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [isLoading, setLoading] = useState(false);

  const { flashcards, setFlashcards } = useFlashcards();

  async function postCard() {
    setLoading(true);
    const { frontUrl, backUrl } = await uploadImages(
      frontImage,
      backImage,
      setId
    );

    const body = {
      set_id: setId,
      front: front,
      front_image: frontUrl,
      back: back,
      back_image: backUrl,
    };

    const response = await fetch("/api/flashcards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data = await response.json();
      const newCard: Flashcard = data;
      setFlashcards([...flashcards, newCard]);
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.error}`);
    }
    setLoading(false);
    setIsAdding(false);
  }

  return (
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
            }
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
        <label htmlFor="backImage">Attach an image</label>
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setBackImage(e.target.files[0]);
            }
          }}
        />
      </div>

      <div className="flex flex-row justify-evenly mt-5">
        <button onClick={postCard}>
          <div className="flex flex-row gap-2">
            <p>Confirm</p>
            <Image src={check_icon} alt="Create card" />
          </div>
        </button>
        <button
          onClick={() => {
            setIsAdding(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
