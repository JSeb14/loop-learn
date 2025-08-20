import { FlashcardSet } from "@/app/util/flashcardStore";
import { createClient } from "@/lib/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";

export const getAllSets = async (): Promise<{
  sets: FlashcardSet[] | null;
  error: PostgrestError | null;
}> => {
  const supabase = await createClient();
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (!sessionData || sessionError) {
    throw new Error("Invalid session.");
  }

  const { data, error } = await supabase.from("flashcard_set").select("*");

  return { sets: data as FlashcardSet[] | null, error };
};
