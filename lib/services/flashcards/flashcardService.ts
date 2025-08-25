import Flashcard from "@/lib/types/Flashcard";
import { uploadImages } from "../images/imageService";
import { deleteImages } from "../images/imageService";
import { v4 } from "uuid";

/**
 * Creates a new flashcard
 * @param cardData
 * @returns
 */
export async function postCard(cardData: {
  front: string | undefined;
  back: string | undefined;
  frontImage: File | undefined;
  backImage: File | undefined;
  setId: string;
}): Promise<Response | null> {
  const uniqueId = v4();

  const { frontUrl, backUrl } = await uploadImages(
    cardData.frontImage,
    cardData.backImage,
    cardData.setId,
    uniqueId
  );

  const body = {
    set_id: cardData.setId,
    front: cardData.front,
    front_image: frontUrl,
    back: cardData.back,
    back_image: backUrl,
  };

  try {
    const response = await fetch("/api/flashcards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error creating flashcard:", errorData);
      return null;
    }

    return response;
  } catch (error) {
    console.error("Failed to create flashcard:", error);
    return null;
  }
}

/**
 * Updates a flashcard with new content and images
 */
export async function updateFlashcard(
  card: Flashcard,
  updates: {
    front: string;
    back: string;
    frontImage: File | undefined;
    backImage: File | undefined;
    isNewFrontImage: boolean;
    isNewBackImage: boolean;
    ease_factor: number;
    interval: number;
    repetitions: number;
    last_review_date: string;
    next_review_date: string | null;
  }
): Promise<Response | null> {

  console.log(updates);
  const {
    front,
    back,
    frontImage,
    backImage,
    isNewFrontImage,
    isNewBackImage,
    interval,
    ease_factor,
    repetitions,
    last_review_date,
    next_review_date
  } = updates;

  // Determine which images need to be deleted
  const paths = [];
  if (isNewFrontImage && card.front_image) paths.push(card.front_image);
  if (isNewBackImage && card.back_image) paths.push(card.back_image);

  let body: Partial<Flashcard>;

  // Handle image updates
  if (frontImage || backImage || isNewFrontImage || isNewBackImage) {
    // Delete old images if necessary
    if (paths.length > 0) {
      console.log("Deleting old images:", paths);
      await deleteImages(paths);
    }
    // Upload new images
    const { frontUrl, backUrl } = await uploadImages(
      frontImage,
      backImage,
      card.set_id,
      card.id
    );

    body = {
      front,
      back,
      front_image: frontUrl,
      back_image: backUrl,
      interval,
      ease_factor,
      repetitions,
      last_review_date,
      next_review_date: next_review_date ?? undefined
    };
  } else {
    body = {
      front,
      back,
      front_image: card.front_image,
      back_image: card.back_image,
      interval,
      ease_factor: card.ease_factor,
      repetitions,
      last_review_date,
      next_review_date: next_review_date ?? undefined
    };
  }

  try {
    const response = await fetch(`/api/flashcards/${card.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error updating flashcard:", errorData);
      return null;
    }

    return response;
  } catch (error) {
    console.error("Failed to update flashcard:", error);
    return null;
  }
}

/**
 * Deletes a flashcard and its associated images
 */
export async function deleteFlashcard(card: Flashcard): Promise<boolean> {
  try {
    // Delete the flashcard from the database
    const response = await fetch(`/api/flashcards/${card.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.error("Failed to delete flashcard");
      return false;
    }

    // If the flashcard had images, delete them
    const paths = [card.front_image, card.back_image].filter(Boolean);
    await deleteImages(paths);

    return true;
  } catch (error) {
    console.error("Error deleting flashcard:", error);
    return false;
  }
}
