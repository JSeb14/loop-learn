import SetClient from "./SetClient";
import { getCardsBySet } from "@/app/controllers/flashcards/flashcards_controller";
import { getSetById } from "@/app/controllers/sets/sets_controller";
import { Fragment } from "react";

export default async function Set({ params }: { params: { id: string } }) {
  const setId = (await params).id;

  const { set, error: setError } = await getSetById(setId);
  if (!set || setError) {
    console.log("Error loading set details");
    return <Fragment />;
  }

  const { data: flashcards, error: flashcardsError } = await getCardsBySet(
    setId
  );
  if (flashcardsError) {
    console.log("Error loading set details");
    return <Fragment />;
  }

  if (!flashcards || flashcardsError) {
    console.log("No sets found");
    return <Fragment />;
  }

  return <SetClient initialSet={set} initialCards={flashcards} setId={setId} />;
}
