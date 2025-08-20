import SetClient from "./SetClient";
import { getCardsBySet } from "@/app/controllers/flashcards/flashcards_controller";
import { getAllSets } from "@/app/controllers/sets/sets_controller";

export default async function Set({ params }: { params: { id: string } }) {
  const setId = (await params).id;
  
  const {sets: sets, error: setError} = await getAllSets();
  if (setError) {
    console.log("Error loading set details");
    return;
  }
  console.log(sets);

  const {data: flashcards, error: flashcardsError} = await getCardsBySet(setId);
  if (flashcardsError) {
    console.log("Error loading set details");
    return;
  }

  return (
    <SetClient
      initialSet={sets[0]}
      initialCards={flashcards}
      setId={setId}
    />
  );
}
