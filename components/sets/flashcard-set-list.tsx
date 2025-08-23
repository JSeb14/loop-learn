"use client";

import Link from "next/link";
import Image from "next/image";
import delete_icon from "@/app/assets/icons/delete_icon.svg";
import FlashcardSet from "@/lib/types/FlashcardSet";
import add_icon from "@/app/assets/icons/add_icon.svg";
import { useEffect } from "react";
import { useSets } from "@/lib/hooks/UseSets";

export default function FlashcardSetList({
  initialSets,
}: {
  initialSets: FlashcardSet[] | null;
}) {
  const { sets, setSets, loadSets } = useSets();

  useEffect(() => {
    if (initialSets) setSets(initialSets);
    else loadSets();
  }, [loadSets, initialSets, setSets]);

  async function deleteSet(setId: string) {
    if (window.confirm("Are you sure you'd like to delete this set?")) {
      const response = await fetch(`/api/sets/${setId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        alert("Failed to delete set.");
      } else {
        if (sets) {
          const updatedSets = sets.filter((set) => set.id !== setId);
          setSets(updatedSets);
        }
      }
    }
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-row gap-5 items-center">
        <h2 className="font-bold text-2xl">Your flashcard sets</h2>
        <Link href="/protected/sets/create">
          <div className="flex flex-row gap-2 items-center border-2 border-solid">
            <div className="ml-2">New Set</div>
            <Image src={add_icon} width={50} alt="Create flashcard set" />
          </div>
        </Link>
      </div>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
      <div className="flex flex-col gap-2 text-center items-center">
        {sets &&
          sets?.map((set: FlashcardSet, index) => {
            return (
              <div key={index} className="flex flex-row gap-2">
                <Link href={`/protected/sets/${set.id}`}>
                  <u>{set.name}</u>
                </Link>
                <button
                  onClick={() => {
                    deleteSet(set.id);
                  }}
                >
                  <Image src={delete_icon} alt="Delete set" />
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
