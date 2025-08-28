import SetClient from "@/components/sets/SetClient";
import { getCardsBySet } from "@/lib/controllers/flashcards/flashcardsController";
import { getSetById } from "@/lib/controllers/sets/setsController";
import { Fragment } from "react";

export default async function Set({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: setId } = await params;

  const { set, error: setError } = await getSetById(setId);
  if (!set || setError) {
    // Error boundary will catch this automatically
    throw new Error("Failed to load set details.");
  }

  const { data: flashcards, error: flashcardsError } = await getCardsBySet(
    setId
  );

  if (!flashcards || flashcardsError) {
    // Error boundary will catch this automatically
    throw new Error("Failed to load flashcards for this set.");
  }

  return <SetClient initialSet={set} initialCards={flashcards} setId={setId} />;
}
