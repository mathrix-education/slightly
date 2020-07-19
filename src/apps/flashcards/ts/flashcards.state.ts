import {FlashcardMode} from './flashcards.mode';
import {FlashcardsStatus} from './flashcards.status';

export interface FlashcardsState {
  mode: FlashcardMode;
  status: FlashcardsStatus;
  current: number;
  flipped: boolean;
  score: number;
  size: number;
}