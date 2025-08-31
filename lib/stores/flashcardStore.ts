import { create } from "zustand";
import Flashcard from "../types/Flashcard";

export type FlashcardStoreState = {
  flashcards: Flashcard[]; // List of flashcards in the selected set
};

export type FlashcardStoreActions = {
  setFlashcards: (data: Flashcard[]) => void;
  clearFlashcards: () => void;
};

export type FlashcardStore = FlashcardStoreState & FlashcardStoreActions;

const useFlashcardStore = create<FlashcardStore>((set) => ({
  flashcards: [],

  setFlashcards: (data: Flashcard[]) => set({ flashcards: data }),
  clearFlashcards: () => set({ flashcards: [] }),
}));

export default useFlashcardStore;
