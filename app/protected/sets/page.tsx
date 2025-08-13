import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import add_icon from "@/app/assets/add_icon.svg";
import Image from "next/image";
import Link from "next/link";
import FlashcardSetList from "@/components/ui/flashcard-set-list";
import { unstable_noStore } from "next/cache";

export default async function Sets() {
  const supabase = await createClient();

  type SessionResponse = Awaited<ReturnType<typeof supabase.auth.getSession>>;

  const { data: sessionData, error: sessionError }: SessionResponse =
    await supabase.auth.getSession();

  if (!sessionData || sessionError) {
    redirect("/auth/login");
  }

  const { data, error } = await supabase.from("flashcard_set").select("*");

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-row gap-5 items-center">
        <h2 className="font-bold text-2xl">Your flashcard sets</h2>
        <Link href="/protected/sets/create">
          <div className="flex flex-row gap-2 items-center border-2 border-solid">
            <div className="ml-2">New Set</div>
            <Image src={add_icon} width={50} alt="Create flashcard set" />
          </div>
        </Link>
      </div>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
      <FlashcardSetList sets={data} />
    </div>
  );
}
