"use client";

import Flashcard from "@/lib/types/Flashcard";
import React, { useState } from "react";
import Image from "next/image";
import edit2 from "@/app/assets/icons/edit.svg";
import delete_icon from "@/app/assets/icons/delete.svg";
import { useFlashcards } from "@/lib/hooks/useFlashcards";
import {
  deleteFlashcard,
} from "@/lib/services/flashcards/flashcardService";
import { useSignedUrl } from "@/lib/hooks/useSignedUrl";
import UpdateCard from "./UpdateCard";

export default function FlashcardItem({ card }: { card: Flashcard }) {
  const { flashcards, setFlashcards } = useFlashcards();
  const [isEditing, setIsEditing] = useState(false);

  const { url: frontImageUrl } = useSignedUrl(card.front_image || null);
  const { url: backImageUrl } = useSignedUrl(card.back_image || null);

  return (
    <>
      {!isEditing ? (
        <div className="group relative">
          <div className="bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:items-stretch">
              
              <div className="space-y-3 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-primary rounded-full" />
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Front</span>
              </div>
              <div className="bg-secondary/30 rounded-lg p-4 min-h-[120px] flex flex-col justify-center flex-1">
                <p className="text-foreground text-lg leading-relaxed text-center">
                {card?.front}
                </p>
                {frontImageUrl && (
                <div className="mt-4 flex justify-center">
                  <Image
                  src={frontImageUrl as string}
                  alt={card?.front}
                  width={200}
                  height={200}
                  className="rounded-lg shadow-md max-w-full h-auto"
                  />
                </div>
                )}
              </div>
              </div>

              <div className="space-y-3 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-accent rounded-full" />
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Back</span>
              </div>
              <div className="bg-accent/10 rounded-lg p-4 min-h-[120px] flex flex-col justify-center flex-1">
                <p className="text-foreground text-lg leading-relaxed text-center">
                {card?.back}
                </p>
                {backImageUrl && (
                <div className="mt-4 flex justify-center">
                  <Image
                  src={backImageUrl as string}
                  alt={card?.back}
                  width={200}
                  height={200}
                  className="rounded-lg shadow-md max-w-full h-auto"
                  />
                </div>
                )}
              </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-border/50">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 rounded-lg hover:bg-secondary/50 transition-colors duration-200 group/edit"
                title="Edit flashcard"
              >
                <Image 
                  src={edit2} 
                  alt="Edit card" 
                  width={18} 
                  height={18}
                  className="group-hover/edit:scale-110 transition-transform duration-200"
                />
              </button>
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you'd like to delete this flashcard?"
                    )
                  ) {
                    deleteFlashcard(card).then((result) => {
                      if (result) {
                        // Update local state after successful flashcard deletion
                        const cardSet = flashcards.filter(
                          (c) => c.id !== card.id
                        );
                        setFlashcards(cardSet);
                      }
                    });
                  }
                }}
                className="p-2 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-all duration-200 group/delete"
                title="Delete flashcard"
              >
                <Image 
                  src={delete_icon} 
                  alt="Delete card" 
                  width={18} 
                  height={18}
                  className="group-hover/delete:filter group-hover/delete:brightness-0 group-hover/delete:sepia group-hover/delete:hue-rotate-[315deg] group-hover/delete:saturate-[5] transition-all duration-200"
                />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl p-6">
          <UpdateCard 
            card={card} 
            frontImageUrl={frontImageUrl} 
            backImageUrl={backImageUrl} 
            setIsEditing={setIsEditing} 
          />
        </div>
      )}
    </>
  );
}
