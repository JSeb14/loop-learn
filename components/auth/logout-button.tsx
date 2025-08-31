"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import useFlashcardStore from "@/lib/stores/flashcardStore";
import useSetStore from "@/lib/stores/setStore";
import useCurrentSetStore from "@/lib/stores/currentSetStore";
import signedUrlStore from "@/lib/stores/signedUrlStore";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();

    // Clear any local or session storage data
    localStorage.clear();
    sessionStorage.clear();

    // Clear Zustand stores
    useFlashcardStore.getState().clearFlashcards();
    useSetStore.getState().clearSets();
    useCurrentSetStore.getState().clearCurrentSet();
    signedUrlStore.getState().clearCache();

    // Sign out from Supabase
    await supabase.auth.signOut();

    // Redirect to login
    router.push("/auth/login");
  };

  return <Button onClick={logout}>Logout</Button>;
}
