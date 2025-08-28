import { validateSession } from "@/lib/utils/auth";
import { StorageError } from "@supabase/storage-js";

export const createSignedUrl = async (
  path: string
): Promise<{
  data: {
    signedUrl: string;
  } | null;
  error: StorageError | null;
}> => {
  const { supabase } = await validateSession();

  const { data, error } = await supabase.storage
    .from("flashcards")
    .createSignedUrl(path, 60 * 60 * 2);

  return { data, error };
};
