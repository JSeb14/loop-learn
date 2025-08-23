type FlashcardSet = {
  id: string;
  created_at: string;
  name: string;
  description: string;
  isPrivate: boolean;
  subject: string;
  cover_image: string | null;
  user_id: string;
};

export default FlashcardSet;
