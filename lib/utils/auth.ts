import { createClient } from "@/lib/supabase/server";

/**
 * Validates user session and returns the user
 * @throws Error if session is invalid
 */
export async function validateSession() {
  const supabase = await createClient();
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

  if (!sessionData?.session || sessionError) {
    throw new Error("Authentication required");
  }

  return {
    supabase,
    user: sessionData.session.user,
    session: sessionData.session
  };
}
