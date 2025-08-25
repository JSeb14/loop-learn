"use client";

import Flashcard from "@/lib/types/Flashcard";
import FlashcardSet from "@/lib/types/FlashcardSet";
import { Fragment, ReactElement, useEffect, useState } from "react";
import UpdateSet from "./UpdateSetForm";
import Image from "next/image";
import edit_icon from "@/app/assets/icons/edit_doc_icon.svg";
import FlashcardItem from "../flashcards/FlashcardItem";
import add_icon from "@/app/assets/icons/add_icon.svg";
import dynamic from "next/dynamic";
import { useCurrentSet } from "@/lib/hooks/useCurrentSet";
import { useFlashcards } from "@/lib/hooks/useFlashcards";

const DynamicCreateCard = dynamic(
  () => import("@/components/flashcards/CreateCard"),
  {
    ssr: false,
  }
);

export default function SetClient({
  initialSet,
  initialCards,
  setId,
}: {
  initialSet: FlashcardSet | null;
  initialCards: Flashcard[] | null;
  setId: string;
}): ReactElement {
  const { currentSet, setCurrentSet, getSet } = useCurrentSet();
  const { flashcards, setFlashcards, getFlashcards } = useFlashcards();

  const [isMounted, setIsMounted] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isUpdatingSet, setIsUpdatingSet] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (initialSet) setCurrentSet(initialSet);
    else getSet(setId);
    if (initialCards) setFlashcards(initialCards);
    else getFlashcards(setId);
    setIsHydrated(true);
  }, [
    initialSet,
    initialCards,
    setCurrentSet,
    setFlashcards,
    getSet,
    setId,
    getFlashcards,
  ]);

  if (!isMounted || !isHydrated) {
    return <Fragment />;
  }

  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <>
        {!isUpdatingSet ? (
          <>
            <h1>{currentSet?.name}</h1>
            <h2>{currentSet?.description}</h2>
            <h3>{currentSet?.subject}</h3>
            <button
              className="flex flex-row gap-2 border-2 border-solid p-2"
              onClick={() => {
                setIsUpdatingSet(true);
              }}
            >
              <p>Edit Set Details</p>
              <Image src={edit_icon} alt="Edit set properties" />
            </button>
          </>
        ) : (
          <UpdateSet
            set={currentSet}
            setId={setId}
            setIsUpdating={setIsUpdatingSet}
          />
        )}
      </>

      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-4" />
      <div className="w-full flex flex-col gap-4">
        {flashcards?.map((flashcard) => {
          return (
            <FlashcardItem key={`flashcard-${flashcard.id}`} card={flashcard} />
          );
        })}
      </div>
      <>
        <button
          onClick={() => {
            setIsAdding(true);
          }}
        >
          <div className="flex flex-row gap-2 border-2 border-solid p-2">
            <p>Add flashcard</p>
            <Image src={add_icon} alt="Add new flashcard" />
          </div>
        </button>
        {!!isAdding && (
          <DynamicCreateCard
            setId={setId}
            card={null}
            setIsAdding={setIsAdding}
          />
        )}
      </>
    </div>
  );
}
