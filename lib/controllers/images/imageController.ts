import { validateSession } from "@/lib/utils/auth";
import { StorageError } from "@supabase/storage-js";

export const uploadImage = async (
  file: File,
  path: string
): Promise<{ error: StorageError | null }> => {
  const { supabase } = await validateSession();

  const { error } = await supabase.storage
    .from("flashcards")
    .upload(path, file);

  return { error };
};

export const deleteImage = async (
  paths: string[]
): Promise<{ error: StorageError | null }> => {
  const { supabase } = await validateSession();
  const { error } = await supabase.storage.from("flashcards").remove(paths);
  return { error };
};
