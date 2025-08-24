import { createClient } from "@/lib/supabase/server";
import { StorageError } from "@supabase/storage-js";

export const uploadImage = async (
  file: File,
  path: string
): Promise<{ error: StorageError | null }> => {
  const supabase = await createClient();
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (!sessionData || sessionError) {
    throw new Error("Invalid session.");
  }

  const { error } = await supabase.storage
    .from("flashcards")
    .upload(path, file);

  return { error };
};

export const deleteImage = async (
  paths: string[]
): Promise<{ error: StorageError | null }> => {
  const supabase = await createClient();
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (!sessionData || sessionError) {
    throw new Error("Invalid session.");
  }

  const { error } = await supabase.storage.from("flashcards").remove(paths);
  if (error) {
    console.error("Supabase delete error:", error);
  }
  return { error };
};
