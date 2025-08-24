import { create } from "zustand";
import FlashcardSet from "../types/FlashcardSet";

export type CurrentSetStoreState = {
  currentSet: FlashcardSet | null; // Currently selected set
};

export type CurrentSetStoreActions = {
  setCurrentSet: (data: FlashcardSet | null) => void;
};

export type CurrentSetStore = CurrentSetStoreState & CurrentSetStoreActions;

const useCurrentSetStore = create<CurrentSetStore>((set) => ({
  currentSet: null,

  setCurrentSet: (data: FlashcardSet | null) => set({ currentSet: data }),
}));

export default useCurrentSetStore;
