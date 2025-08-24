import { create } from "zustand";
import FlashcardSet from "../types/FlashcardSet";

export type SetStoreState = {
  sets: FlashcardSet[]; // List of user's available sets
};

export type SetStoreActions = {
  setSets: (data: FlashcardSet[]) => void;
};

export type SetStore = SetStoreState & SetStoreActions;

const useSetStore = create<SetStore>((set) => ({
  sets: [],

  setSets: (data: FlashcardSet[]) => set({ sets: data }),
}));

export default useSetStore;
