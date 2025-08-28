"use client";

import Flashcard from "@/lib/types/Flashcard";
import { useState } from "react";
import Image from "next/image";
import { useSignedUrl } from "@/lib/hooks/useSignedUrl";

export default function Slide({
  flashcard,
  startFront,
  setIsSlideComplete,
}: {
  flashcard: Flashcard;
  startFront: boolean;
  setIsSlideComplete: ((value: boolean) => void) | null;
}) {
  const [side, setSide] = useState<boolean>(startFront);
  const { url: frontImageUrl } = useSignedUrl(flashcard.front_image || null);
  const { url: backImageUrl } = useSignedUrl(flashcard.back_image || null);

  return (
    <div className="flex flex-col items-center space-y-6 max-w-screen-sm">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div
          className={`w-2 h-2 rounded-full transition-colors duration-200 ${
            side ? "bg-primary" : "bg-muted"
          }`}
        />
        <span className={side ? "text-primary font-medium" : ""}>Front</span>
        <div
          className={`w-2 h-2 rounded-full transition-colors duration-200 ${
            !side ? "bg-accent" : "bg-muted"
          }`}
        />
        <span className={!side ? "text-accent font-medium" : ""}>Back</span>
      </div>

      <div
        className="relative group cursor-pointer w-full"
        onClick={() => {
          setSide(!side);
          if (setIsSlideComplete) setIsSlideComplete(true);
        }}
      >
        <div
          className={`relative card-modern p-8 min-h-[400px] min-w-[300px] flex flex-col items-center justify-center text-center transition-all duration-300 group-hover:shadow-2xl wrap-break-word${
            side
              ? "bg-gradient-to-br from-card to-primary/5 border-primary/20"
              : "bg-gradient-to-br from-card to-accent/5 border-accent/20"
          }`}
        >
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="flex items-center gap-1 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded-full">
              <span>Click to flip</span>
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
          </div>

          <div className="flex-col items-center justify-center space-y-6 w-full">
            {side ? (
              <>
                <p
                  className={`text-2xl font-semibold leading-relaxed break-words ${
                    side ? "text-primary" : "text-accent"
                  }`}
                >
                  {flashcard.front}
                </p>
                {frontImageUrl && (
                  <div className="relative">
                    <Image
                      src={frontImageUrl}
                      alt={flashcard.front}
                      width={200}
                      height={200}
                      className="rounded-lg shadow-md object-contain max-w-full h-auto"
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                <p
                  className={`text-2xl font-semibold leading-relaxed break-words ${
                    side ? "text-primary" : "text-accent"
                  }`}
                >
                  {flashcard.back}
                </p>
                {backImageUrl && (
                  <div className="relative">
                    <Image
                      src={backImageUrl}
                      alt={flashcard.back}
                      width={200}
                      height={200}
                      className="rounded-lg shadow-md object-contain max-w-full h-auto"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
