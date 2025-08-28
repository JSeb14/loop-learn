import FlashcardSet from "@/lib/types/FlashcardSet";
import { validateSession } from "@/lib/utils/auth";
import { PostgrestError } from "@supabase/supabase-js";

export const getAllSets = async (): Promise<{
  sets: FlashcardSet[] | null;
  error: PostgrestError | null;
}> => {
  const { supabase } = await validateSession();
  const { data, error } = await supabase.from("flashcard_set").select("*");
  return { sets: data as FlashcardSet[] | null, error };
};

export const getSetById = async (
  id: string
): Promise<{
  set: FlashcardSet | null;
  error: PostgrestError | null;
}> => {
  const { supabase } = await validateSession();
  const { data, error } = await supabase
    .from("flashcard_set")
    .select("*")
    .eq("id", id)
    .single();

  return { set: data as FlashcardSet | null, error };
};

export const updateSet = async (
  id: string,
  updates: Partial<FlashcardSet>
): Promise<{ data: FlashcardSet | null; error: PostgrestError | null }> => {
  const { supabase } = await validateSession();

  const { data, error } = await supabase
    .from("flashcard_set")
    .update({
      name: updates.name,
      description: updates.description,
      isPrivate: updates.isPrivate,
      subject: updates.subject,
    })
    .eq("id", id)
    .select();

  return { data: data && data[0] ? (data[0] as FlashcardSet) : null, error };
};

export const deleteSet = async (
  id: string
): Promise<{ error: PostgrestError | null }> => {
  const { supabase } = await validateSession();
  const { error } = await supabase.from("flashcard_set").delete().eq("id", id);
  return { error };
};

export const createSet = async (
  set: FlashcardSet
): Promise<{ data: FlashcardSet | null; error: PostgrestError | null }> => {
  const { supabase } = await validateSession();

  const { data, error } = await supabase
    .from("flashcard_set")
    .insert([
      {
        name: set.name,
        description: set.description,
        isPrivate: set.isPrivate,
        subject: set.subject,
      },
    ])
    .select();

  return { data: data && data[0] ? (data[0] as FlashcardSet) : null, error };
};
