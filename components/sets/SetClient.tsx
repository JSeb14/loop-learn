"use client";

import Flashcard from "@/lib/types/Flashcard";
import FlashcardSet from "@/lib/types/FlashcardSet";
import { Fragment, ReactElement, useEffect, useState } from "react";
import Image from "next/image";
import edit from "@/app/assets/icons/edit_doc.svg";
import FlashcardItem from "../flashcards/FlashcardItem";
import add_circle from "@/app/assets/icons/add_circle.svg";
import dynamic from "next/dynamic";
import { useCurrentSet } from "@/lib/hooks/useCurrentSet";
import { useFlashcards } from "@/lib/hooks/useFlashcards";
import SetForm from "./SetForm";

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
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="card-modern p-8 text-center">
        {!isUpdatingSet ? (
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gradient">
                {currentSet?.name || "Untitled Set"}
              </h1>
              
              {currentSet?.description && (
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  {currentSet.description}
                </p>
              )}
              
              {currentSet?.subject && (
                <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm font-medium text-secondary-foreground">
                    {currentSet.subject}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-8 pt-6 border-t border-border/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {flashcards?.length || 0}
                </div>
                <div className="text-sm text-muted-foreground">Cards</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">
                  {currentSet?.subject || "General"}
                </div>
                <div className="text-sm text-muted-foreground">Subject</div>
              </div>
            </div>

            <button
              onClick={() => setIsUpdatingSet(true)}
              className="btn-secondary inline-flex items-center gap-2 group"
            >
              <Image 
                src={edit} 
                alt="Edit set properties"
                width={16}
                height={16}
                className="group-hover:scale-110 transition-transform duration-200"
              />
              <span>Edit Set Details</span>
            </button>
          </div>
        ) : (
          <SetForm
            set={currentSet}
            setId={setId}
            onCancelClick={() => setIsUpdatingSet(false)}
            setIsUpdating={setIsUpdatingSet}
            from="update"
          />
        )}
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground">
            Flashcards
          </h2>
          <span className="text-muted-foreground">
            {flashcards?.length || 0} cards
          </span>
        </div>

        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full card-modern p-6 border-2 border-dashed border-border hover:border-primary/50 transition-colors duration-200 group"
          >
            <div className="flex items-center justify-center gap-3 text-muted-foreground group-hover:text-primary transition-colors duration-200">
              <div className="bg-muted group-hover:bg-primary/10 rounded-full p-3 transition-colors duration-200">
                <Image 
                  src={add_circle} 
                  alt="Add new flashcard"
                  width={20}
                  height={20}
                  className="group-hover:scale-110 transition-transform duration-200"
                />
              </div>
              <span className="text-lg font-medium">Add New Flashcard</span>
            </div>
          </button>
        )}

        {isAdding && (
          <div className="card-modern p-6">
            <DynamicCreateCard
              setId={setId}
              setIsAdding={setIsAdding}
            />
          </div>
        )}

        {flashcards && flashcards.length > 0 ? (
          <div className="space-y-4">
            {flashcards.map((flashcard) => (
              <div key={`flashcard-${flashcard.id}`} className="card-modern p-0 overflow-hidden">
                <FlashcardItem card={flashcard} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Image 
                  src={add_circle} 
                  width={32} 
                  height={32}
                  alt="No cards"
                  className="opacity-50"
                />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No flashcards yet
              </h3>
              <p className="text-muted-foreground mb-6">
                Start building your study set by adding your first flashcard!
              </p>
              <button
                onClick={() => setIsAdding(true)}
                className="btn-primary inline-flex items-center gap-2"
              >
                <Image 
                  src={add_circle} 
                  width={16} 
                  height={16}
                  alt="Create"
                  className="filter brightness-0 invert"
                />
                Add Your First Card
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
