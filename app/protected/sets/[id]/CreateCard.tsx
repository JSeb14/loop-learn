"use client";

import { Flashcard, useFlashcardStore } from "@/app/util/flashcardStore";
import { createClient } from "@/lib/supabase/client";
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import check_icon from "@/app/assets/check_icon.svg";

export default function CreateCard({
  setId,
  setIsAdding,
}: {
  setId: string;
  setIsAdding: Dispatch<SetStateAction<boolean>>;
}) {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const cardStore = useFlashcardStore((s) => s.flashcards);
  const setCardStore = useFlashcardStore((s) => s.setFlashcards);
  const [isLoading, setLoading] = useState(false);

  async function postCard() {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("flashcard")
      .insert([{ set_id: setId, front: front, back: back }])
      .select();

    if (!data || error) {
      console.log(error);
      return;
    }

    const newCard: Flashcard = data[0];
    setCardStore([...cardStore, newCard]);
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
