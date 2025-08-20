import { Flashcard } from "@/app/util/flashcardStore";
import { createClient } from "@/lib/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";

export const getCardsBySet = async (
  setId: string
): Promise<{ data: Flashcard[] | null; error: PostgrestError | null }> => {
  const supabase = await createClient();
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (!sessionData || sessionError) {
    throw new Error("Invalid session.");
  }

  const { data, error } = await supabase
    .from("flashcard")
    .select("*")
    .eq("set_id", setId);

  return { data: data as Flashcard[] | null, error };
};
