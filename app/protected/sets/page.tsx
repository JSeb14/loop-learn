import { getAllSets } from "@/app/controllers/sets/sets_controller";
import FlashcardSetList from "@/components/sets/flashcard-set-list";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Sets() {
  const supabase = await createClient();
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (!sessionData || sessionError) {
    redirect("/auth/login");
  }

  const {sets, error} = await getAllSets();    

  return <FlashcardSetList initialSets={sets} />;
}
