"use client";

import { useEffect, useState } from "react";
import chevron_forward_icon from "@/app/assets/icons/chevron_forward_icon.svg";
import chevron_backward_icon from "@/app/assets/icons/chevron_backward_icon.svg";
import chevron_backward_disabled_icon from "@/app/assets/icons/chevron_backward_disabled_icon.svg";
import chevron_forward_disabled_icon from "@/app/assets/icons/chevron_forward_disabled_icon.svg";
import Image from "next/image";
import StartingSideForm from "@/components/practice/StartingSideForm";
import Slide from "@/components/practice/Slide";
import { useFlashcards } from "@/lib/hooks/useFlashcards";
import { useParams } from "next/navigation";

export default function Practice() {
  const [startFront, setStartFront] = useState<boolean>(true);
  const [settingUp, setSettingUp] = useState<boolean>(true);
  const [index, setIndex] = useState(0);

  const params = useParams<{ id: string }>();
  const { flashcards, getFlashcards } = useFlashcards();

  useEffect(() => {
    if (!flashcards || flashcards.length === 0) getFlashcards(params.id);
  }, [flashcards, getFlashcards, params.id]);

  const incrementIndex = () => {
    if (index + 1 < flashcards.length) setIndex(index + 1);
  };

  const decrementIndex = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <>
      {settingUp ? (
        <StartingSideForm
          setStartFront={setStartFront}
          setSettingUp={setSettingUp}
        />
      ) : (
        <div className="flex flex-col items-center gap-4 w-full">
          <Slide
            key={flashcards[index].id}
            flashcard={flashcards[index]}
            startFront={startFront}
          />
          <div>
            <button disabled={index === 0} onClick={decrementIndex}>
              <Image
                src={
                  index === 0
                    ? chevron_backward_disabled_icon
                    : chevron_backward_icon
                }
                alt="Previous card"
                width={48}
              />
            </button>
            <button
              disabled={index === flashcards.length - 1}
              onClick={incrementIndex}
            >
              <Image
                src={
                  index === flashcards.length - 1
                    ? chevron_forward_disabled_icon
                    : chevron_forward_icon
                }
                alt="Next card"
                width={48}
              />
            </button>
          </div>
          <div>
            {index + 1} / {flashcards.length}
          </div>
        </div>
      )}
    </>
  );
}
