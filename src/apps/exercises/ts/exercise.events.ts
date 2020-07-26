export enum ExerciseEvents {
  result = 'exercise.result',
}

/**
 * Emitted when the user finishes a series of flashcards.
 */
export interface ExerciseResultEvent {
  /** The total number of questions in the exercise. */
  total: number;
  /** The number of valid questions specified by the user (always <= total). */
  score: number;
}
