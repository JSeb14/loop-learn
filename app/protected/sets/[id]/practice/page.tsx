"use client";

import { useEffect, useState } from "react";
import chevron_forward from "@/app/assets/icons/chevron_forward.svg";
import Image from "next/image";
import StartingSideForm from "@/components/practice/StartingSideForm";
import Slide from "@/components/practice/Slide";
import { useFlashcards } from "@/lib/hooks/useFlashcards";
import { useParams } from "next/navigation";
import ConfidenceRating from "@/components/practice/ConfidenceRating";
import Flashcard from "@/lib/types/Flashcard";
import { updateFlashcardSM2 } from "@/lib/services/flashcards/sm2Service";

export default function Practice() {
  const params = useParams<{ id: string }>();
  const { flashcards, getFlashcards, setFlashcards } = useFlashcards();

  const [startFront, setStartFront] = useState<boolean>(true);
  const [settingUp, setSettingUp] = useState<boolean>(true);
  const [index, setIndex] = useState(0);
  const [sessionSet, setSessionSet] = useState<Flashcard[]>([]);

  const [rating, setRating] = useState<number>(3);

  useEffect(() => {
    if (!flashcards || flashcards.length === 0) getFlashcards(params.id);
  }, [flashcards, getFlashcards, settingUp, settingUp, params.id]);

  useEffect(() => {
    console.log("Flashcards updated:");
    const dueCards = flashcards.filter((card) => {
      const today = new Date();
      const nextReviewedDate = card.next_review_date
        ? new Date(card.next_review_date)
        : new Date(0);
      return nextReviewedDate <= today;
    });
    setSessionSet(dueCards);
  }, []);

  useEffect(() => {
    setRating(3);
  }, [index]);

  const incrementIndex = () => {
    if (index + 1 < sessionSet.length) setIndex(index + 1);
    else setSessionSet([]);
  };

  const handleSubmit = async () => {
    // Reinsert flashcard into the session set if low rating
    if (rating < 3) setSessionSet([...sessionSet, sessionSet[index]]);

    // Update flashcard using SM2 algorithm
    try {
      const updatedCard = await updateFlashcardSM2(sessionSet[index], rating);
      console.log("Updated card:", updatedCard);
      const otherCards = flashcards.filter(
        (card) => card.id !== sessionSet[index].id
      );
      setFlashcards([...otherCards, updatedCard]);
      incrementIndex();
    } catch (error) {
      console.error("Failed to update flashcard:", error);
    }
  };

  return (
    <>
      {settingUp ? (
        <StartingSideForm
          setStartFront={setStartFront}
          setSettingUp={setSettingUp}
        />
      ) : (
        <div className="flex flex-col items-center gap-6 w-full">
          {sessionSet.length > 0 ? (
            <>
              <div>
                {index + 1} / {sessionSet.length}
              </div>
              <Slide
                key={sessionSet[index].id}
                flashcard={sessionSet[index]}
                startFront={startFront}
              />
              <div className="mt-4">
                <ConfidenceRating rating={rating} setRating={setRating} />
              </div>
              <button
                className="border border-solid bg-gray-500 rounded-md mt-2 p-3 w-1/5"
                onClick={handleSubmit}
              >
                <div className="flex items-center justify-center">
                  <p>Next</p>
                  <Image
                    src={chevron_forward}
                    alt="Next card"
                    width={24}
                    height={24}
                  />
                </div>
              </button>
            </>
          ) : (
            <div>There are no flashcards to practice at this time. Hooray!</div>
          )}
        </div>
      )}
    </>
  );
}
