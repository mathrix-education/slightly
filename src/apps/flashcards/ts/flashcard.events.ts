export enum FlashcardEvents {
  revise = 'flashcard.revise',
  training = 'flashcard.training',
  reveal = 'flashcard.reveal',
  next = 'flashcard.nest',
  redo = 'flashcard.redo',
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FlashcardReviseEvent {
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FlashcardNextEvent {
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FlashcardRevealEvent {
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FlashcardRedoEvent {
}
