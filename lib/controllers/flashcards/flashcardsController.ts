import Flashcard from "@/lib/types/Flashcard";
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

export const createCard = async (
  card: Flashcard
): Promise<{ data: Flashcard | null; error: PostgrestError | null }> => {
  const supabase = await createClient();
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (!sessionData || sessionError) {
    throw new Error("Invalid session.");
  }

  const { data, error } = await supabase
    .from("flashcard")
    .insert([
      {
        set_id: card.set_id,
        front: card.front,
        front_image: card.front_image,
        back: card.back,
        back_image: card.back_image,
      },
    ])
    .select();

  return { data: data && data[0] ? (data[0] as Flashcard) : null, error };
};

export const updateCard = async (
  id: string,
  updates: Partial<Flashcard>
): Promise<{ data: Flashcard | null; error: PostgrestError | null }> => {
  const supabase = await createClient();
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (!sessionData || sessionError) {
    throw new Error("Invalid session.");
  }

  const { data, error } = await supabase
    .from("flashcard")
    .update({
      front: updates.front,
      back: updates.back,
      front_image: updates.front_image,
      back_image: updates.back_image,
      ease_factor: updates.ease_factor,
      interval: updates.interval,
      repetitions: updates.repetitions,
      last_review_date: updates.last_review_date,
      next_review_date: updates.next_review_date,
    })
    .eq("id", id)
    .select();

  return { data: data && data[0] ? (data[0] as Flashcard) : null, error };
};

export const deleteCard = async (
  id: string
): Promise<{ error: PostgrestError | null }> => {
  const supabase = await createClient();
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (!sessionData || sessionError) {
    throw new Error("Invalid session.");
  }

  const { error } = await supabase.from("flashcard").delete().eq("id", id);

  return { error };
};
