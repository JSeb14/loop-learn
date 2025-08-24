import { createClient } from "@/lib/supabase/server";
import { StorageError } from "@supabase/storage-js";

export const createSignedUrl = async (
  path: string
): Promise<{
  data: {
    signedUrl: string;
  } | null;
  error: StorageError | null;
}> => {
  const supabase = await createClient();
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (!sessionData || sessionError) {
    throw new Error("Invalid session.");
  }

  const { data, error } = await supabase.storage
    .from("flashcards")
    .createSignedUrl(path, 60 * 60 * 2);

  return { data, error };
};
