export enum FlashcardEvents {
  result = 'result',
  exit = 'exit',
}

/**
 * Emitted when the user finishes a series of flashcards.
 */
export class FlashcardResultEvent {
  /** The total number of flashcards. */
  total: number;
  /** The number of valid flashcards specified by the user (always <= total). */
  score: number;
}


/**
 * Emitted when the user pressed the exit button on the result screen.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FlashcardExitEvent {
  // To be defined later if necessary
}