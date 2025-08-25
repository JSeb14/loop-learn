import Flashcard from "@/lib/types/Flashcard";
import { updateFlashcard } from "./flashcardService";

export async function updateFlashcardSM2(
  card: Flashcard,
  quality: number,
  today: Date = new Date()
): Promise<Flashcard> {
  let { repetitions, interval, ease_factor } = card;

  ease_factor =
    ease_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (ease_factor < 1.3) ease_factor = 1.3;

  if (quality < 3) {
    repetitions = 0;
    interval = 1;
  } else {
    repetitions += 1;
    if (repetitions === 1) {
      interval = 1;
    } else if (repetitions === 2) {
      interval = 6;
    } else {
      interval = Math.round(interval * ease_factor);
    }
  }

  const nextReviewDate = new Date(today);
  nextReviewDate.setDate(today.getDate() + interval);

  const response = await updateFlashcard(card, {
    front: card.front,
    back: card.back,
    frontImage: undefined,
    backImage: undefined,
    isNewFrontImage: false,
    isNewBackImage: false,
    interval,
    repetitions,
    ease_factor,
    last_review_date: today.toISOString(),
    next_review_date: nextReviewDate.toISOString(),
  });

  if (!response || !response.ok) {
    throw new Error("Failed to update flashcard");
  }

  return {
    ...card,
    repetitions,
    interval,
    ease_factor,
    last_review_date: today.toISOString(),
    next_review_date: nextReviewDate.toISOString(),
  };
}
