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
import { Button } from "@/components/ui/Button";

export default function Practice() {
  const params = useParams<{ id: string }>();
  const { flashcards, getFlashcards, setFlashcards } = useFlashcards();

  const [startFront, setStartFront] = useState<boolean>(true);
  const [settingUp, setSettingUp] = useState<boolean>(true);
  const [sessionSet, setSessionSet] = useState<Flashcard[]>([]);
  const [isSlideComplete, setIsSlideComplete] = useState(false);

  const [rating, setRating] = useState<number>(3);

  // Fetch flashcards if not available
  useEffect(() => {
    if (!flashcards || flashcards.length === 0) getFlashcards(params.id);
  }, [flashcards, getFlashcards, settingUp, settingUp, params.id]);

  // Set session set based on due cards
  useEffect(() => {
    const dueCards = flashcards.filter((card) => {
      const today = new Date();
      const nextReviewedDate = card.next_review_date
        ? new Date(card.next_review_date)
        : new Date(0);
      return nextReviewedDate <= today;
    });
    setSessionSet(dueCards);
  }, []);

  // Reset rating and slide completion state when session set changes
  useEffect(() => {
    setRating(3);
    setIsSlideComplete(false);
  }, [sessionSet]);

  const handleSubmit = async () => {
    const currentCard = sessionSet[0];
    
    // Update flashcard using SM2 algorithm
    try {
      const updatedCard = await updateFlashcardSM2(currentCard, rating);
      const otherCards = flashcards.filter(
        (card) => card.id !== currentCard.id
      );
      setFlashcards([...otherCards, updatedCard]);
      
      // Remove the current card from the session set
      const remainingCards = sessionSet.slice(1);
      
      // Reinsert flashcard into the session set if low rating
      if (rating < 3) {
        setSessionSet([...remainingCards, updatedCard]);
      } else {
        setSessionSet(remainingCards);
      }
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
                Cards remaining: {sessionSet.length}
              </div>
              <Slide
                key={sessionSet[0].id}
                flashcard={sessionSet[0]}
                startFront={startFront}
                setIsSlideComplete={setIsSlideComplete}
              />

              {!!isSlideComplete && (
                <div className="flex flex-col gap-5 items-center">
                  <div className="mt-4">
                    <ConfidenceRating rating={rating} setRating={setRating} />
                  </div>
                  <Button onClick={handleSubmit} className="w-1/2 mt-3">
                    <div className="flex items-center justify-center">
                      <p>Next</p>
                      <Image
                        src={chevron_forward}
                        alt="Next card"
                        width={24}
                        height={24}
                      />
                    </div>
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div>There are no flashcards to practice at this time. Hooray!</div>
          )}
        </div>
      )}
    </>
  );
}
