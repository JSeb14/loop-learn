"use client";

import {
  Flashcard,
  FlashcardSet,
  useFlashcardStore,
} from "@/app/util/flashcardStore";
import { Fragment, ReactElement, useEffect, useState } from "react";
import UpdateSet from "./UpdateSetForm";
import Image from "next/image";
import edit_icon from "@/app/assets/edit_doc_icon.svg";
import FlashcardItem from "./FlashcardItem";
import add_icon from "@/app/assets/add_icon.svg";
import dynamic from "next/dynamic";

const DynamicCreateCard = dynamic(() => import("./CreateCard"), {
  ssr: false,
});

export default function SetClient({
  initialSet,
  initialCards,
  setId,
}: {
  initialSet: FlashcardSet | null;
  initialCards: Flashcard[] | null;
  setId: string;
}): ReactElement {
  const setInfo = useFlashcardStore((state) => state.setInfo);
  const setSetInfo = useFlashcardStore((state) => state.setSetInfo);
  const setFlashcards = useFlashcardStore((state) => state.setFlashcards);
  const flashcards: Flashcard[] = useFlashcardStore(
    (state) => state.flashcards
  );

  const [isMounted, setIsMounted] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isUpdatingSet, setIsUpdatingSet] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (initialSet) setSetInfo(initialSet);
    if (initialCards) setFlashcards(initialCards);
    setIsHydrated(true);
  }, [initialSet, initialCards, setSetInfo, setFlashcards]);

  if (!isMounted || !isHydrated) {
    return <Fragment />;
  }

  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <>
        {!isUpdatingSet ? (
          <>
            <h1>{setInfo?.name}</h1>
            <h2>{setInfo?.description}</h2>
            <h3>{setInfo?.subject}</h3>
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
          <UpdateSet set={setInfo} setIsUpdating={setIsUpdatingSet} />
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
          <DynamicCreateCard setId={setId} setIsAdding={setIsAdding} />
        )}
      </>
    </div>
  );
}
