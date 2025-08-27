"use client";

import { useEffect, useState } from "react";
import chevron_forward from "@/app/assets/icons/chevron_forward.svg";
import chevron_backward from "@/app/assets/icons/chevron_backward.svg";
import chevron_backward_disabled from "@/app/assets/icons/chevron_backward_disabled.svg";
import chevron_forward_disabled from "@/app/assets/icons/chevron_forward_disabled.svg";
import Image from "next/image";
import StartingSideForm from "@/components/practice/StartingSideForm";
import Slide from "@/components/practice/Slide";
import { useFlashcards } from "@/lib/hooks/useFlashcards";
import { useParams } from "next/navigation";

export default function Deck() {
  const [startFront, setStartFront] = useState<boolean>(true);
  const [settingUp, setSettingUp] = useState<boolean>(true);
  const [index, setIndex] = useState(0);

  const params = useParams<{ id: string }>();
  const { flashcards, getFlashcards } = useFlashcards();

  useEffect(() => {
    if (!flashcards || flashcards.length === 0) getFlashcards(params.id);
  }, [flashcards, getFlashcards, settingUp, settingUp, params.id]);

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
        <>
          {flashcards.length > 0 && (
            <div className="flex flex-col items-center gap-6 w-full">
              <div>
                {index + 1} / {flashcards.length}
              </div>
              <Slide
                key={flashcards[index].id}
                flashcard={flashcards[index]}
                startFront={startFront}
                setIsSlideComplete={null}
              />
              <div>
                <button disabled={index === 0} onClick={decrementIndex}>
                  <Image
                    src={
                      index === 0 ? chevron_backward_disabled : chevron_backward
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
                        ? chevron_forward_disabled
                        : chevron_forward
                    }
                    alt="Next card"
                    width={48}
                  />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
