import { useCallback } from "react";
import useFlashcardStore from "../stores/flashcardStore";

export function useFlashcards() {
  const { flashcards, setFlashcards } = useFlashcardStore();

  const getFlashcards = useCallback(
    async (setId: string) => {
      try {
        const response = await fetch(`/api/sets/${setId}/flashcards`);
        const data = await response.json();

        setFlashcards(data);
        return data;
      } catch (error) {
        console.error(`Failed to load flashcards for set ${setId}:`, error);
        return [];
      }
    },
    [setFlashcards]
  );

  return {
    flashcards,
    setFlashcards,
    getFlashcards,
  };
}
