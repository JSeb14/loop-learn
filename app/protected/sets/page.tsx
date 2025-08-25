import { getAllSets } from "@/lib/controllers/sets/setsController";
import FlashcardSetList from "@/components/sets/SetList";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Sets() {
  const supabase = await createClient();
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (!sessionData || sessionError) {
    redirect("/auth/login");
  }

  const {sets} = await getAllSets();    

  return <FlashcardSetList initialSets={sets} />;
}
