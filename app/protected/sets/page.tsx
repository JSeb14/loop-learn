import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import FlashcardSetList from "@/components/ui/flashcard-set-list";

export default async function Sets() {
  const supabase = await createClient();

  type SessionResponse = Awaited<ReturnType<typeof supabase.auth.getSession>>;

  const { data: sessionData, error: sessionError }: SessionResponse =
    await supabase.auth.getSession();

  if (!sessionData || sessionError) {
    redirect("/auth/login");
  }

  const { data, error } = await supabase.from("flashcard_set").select("*");

  return <FlashcardSetList sets={data} />;
}
