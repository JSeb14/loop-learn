import { create } from "zustand";

export type FlashcardSet = {
  id: string;
  created_at: string;
  name: string;
  description: string;
  isPrivate: boolean;
  subject: string | null;
  cover_image: string | null;
  user_id: string;
};

export type Flashcard = {
  id: string;
  created_at: string;
  user_id: string;
  set_id: string;
  front: string;
  back: string;
  front_image: string | null;
  back_image: string | null;
  ease_factor: number;
  interval: number;
  repititions: number;
  next_review_date: string;
  last_review_date: string | null;
};

export const useFlashcardStore = create((set) => ({
  flashcardSets: [],
  setFlashcardSets: (data: FlashcardSet[]) => set({ flashcardSets: data }),
  
  setInfo: null,
  setSetInfo: (data: FlashcardSet | null) => set({ setInfo: data }),
  
  flashcards: [],
  setFlashcards: (data: Flashcard[]) => set({ flashcards: data }),
}));
