import { createClient } from "@/lib/supabase/server";
import SetClient from "./SetClient";

export default async function Set({ params }: { params: { id: string } }) {
  const setId = (await params).id;

  const supabase = await createClient();

  const { data: flashcardSet, error: setError } = await supabase
    .from("flashcard_set")
    .select("*")
    .eq("id", setId)
    .limit(1);
  if (!flashcardSet || setError) {
    console.log("Error loading set details");
    return;
  }

  const { data: flashcards, error } = await supabase
    .from("flashcard")
    .select("*")
    .eq("set_id", setId);
  if (error) {
    console.log("Error loading set details");
  }

  return (
    <SetClient
      initialSet={flashcardSet[0]}
      initialCards={flashcards}
      setId={setId}
    />
  );
}
