"use client";

import { Flashcard } from "@/app/util/flashcardStore";
import { useState } from "react";

export default function Slide({ flashcard, startFront }: { flashcard: Flashcard, startFront: boolean }) {
    const [side, setSide] = useState<boolean>(startFront);
    
    return (
      <div
        className="flex border border-solid justify-center items-center text-center w-1/2 h-36 text-xl p-3"
        onClick={() => {
          setSide(!side);
        }}
      >
        <>
          {side ? (
            <h1>
              <b>{flashcard.front}</b>
            </h1>
          ) : (
            <h1>{flashcard.back}</h1>
          )}
        </>
      </div>
    );
  }