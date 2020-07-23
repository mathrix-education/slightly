import {FlashcardPhase} from './flashcards.mode';

export interface FlashcardsState {
  phase: FlashcardPhase;
  current: number;
  flipped: boolean;
  score: number;
  size: number;
}