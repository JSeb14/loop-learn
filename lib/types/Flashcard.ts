type Flashcard = {
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

export default Flashcard;
