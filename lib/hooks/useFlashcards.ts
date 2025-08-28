import { useCallback } from "react";
import useFlashcardStore from "../stores/flashcardStore";

export function useFlashcards() {
  const { flashcards, setFlashcards } = useFlashcardStore();

  const getFlashcards = useCallback(
    async (setId: string) => {
      const response = await fetch(`/api/sets/${setId}/flashcards`);
      
      if (!response.ok) {
        throw new Error(`Failed to load flashcards for set ${setId}`);
      }
      
      const data = await response.json();
      setFlashcards(data);
      return data;
    },
    [setFlashcards]
  );

  return {
    flashcards,
    setFlashcards,
    getFlashcards,
  };
}
