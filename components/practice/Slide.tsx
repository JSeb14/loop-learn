"use client";

import Flashcard from "@/lib/types/Flashcard";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Slide({
  flashcard,
  startFront,
}: {
  flashcard: Flashcard;
  startFront: boolean;
}) {
  const [side, setSide] = useState<boolean>(startFront);
  const [frontImageUrl, setFrontImageUrl] = useState<string | null>(null);
  const [backImageUrl, setBackImageUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSignedUrl() {
      if (flashcard.front_image) {
        const response = await fetch("/api/signed_url", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ path: flashcard.front_image }),
        });
        if (response.ok) {
          const data = await response.json();
          if (data?.signedUrl) setFrontImageUrl(data.signedUrl);
        }
      }
      if (flashcard.back_image) {
        const response = await fetch("/api/signed_url", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ path: flashcard.back_image }),
        });
        if (response.ok) {
          const data = await response.json();
          if (data?.signedUrl) setBackImageUrl(data.signedUrl);
        }
      }
    }
    fetchSignedUrl();
  }, [flashcard.front_image, flashcard.back_image]);

  return (
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
  );
}
