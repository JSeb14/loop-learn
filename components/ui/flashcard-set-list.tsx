"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import Image from "next/image";
import delete_icon from "@/app/assets/delete_icon.svg";
import { FlashcardSet } from "@/app/util/flashcardStore";

export default function FlashcardSetList({ sets }: { sets: FlashcardSet[] }) {
  async function deleteSet(setId: string) {
    if (window.confirm("Are you sure you'd like to delete this set?")) {

    const supabase = await createClient();
      const { error } = await supabase
        .from("flashcard_set")
        .delete()
        .eq("id", setId);

      if (error) {
      }

    }
  }

  return (
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
  );
}
