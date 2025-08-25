"use client";

import Flashcard from "@/lib/types/Flashcard";
import { useState } from "react";
import Image from "next/image";
import { useSignedUrl } from "@/lib/hooks/useSignedUrl";

export default function Slide({
  flashcard,
  startFront,
}: {
  flashcard: Flashcard;
  startFront: boolean;
}) {
  const [side, setSide] = useState<boolean>(startFront);
  const { url: frontImageUrl } = useSignedUrl(flashcard.front_image || null);
  const { url: backImageUrl } = useSignedUrl(flashcard.back_image || null);

  return (
    <div className="flex flex-col gap-4 items-center">
      <div
        className="flex border border-solid text-xl p-10 w-[400px] h-[300px] bg-gray-700 shadow-md rounded-lg cursor-pointer items-center text-center"
        onClick={() => {
          setSide(!side);
        }}
      >
        <>
          {side ? (
            <div className="flex flex-col gap-3 items-center w-full h-full justify-center">
              <h1>
                <b>{flashcard.front}</b>
              </h1>
              {frontImageUrl && (
                <Image
                  src={frontImageUrl}
                  alt={flashcard.front}
                  width={180}
                  height={180}
                  style={{ objectFit: "contain" }}
                />
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-3 items-center w-full h-full justify-center">
              <h1>{flashcard.back}</h1>
              {backImageUrl && (
                <Image
                  src={backImageUrl}
                  alt={flashcard.back}
                  width={180}
                  height={180}
                  style={{ objectFit: "contain" }}
                />
              )}
            </div>
          )}
        </>
      </div>
    </div>
  );
}
