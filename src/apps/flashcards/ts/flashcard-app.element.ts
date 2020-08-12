import { BridgeElement } from '../../../front/bridge-element';
import { Element } from '../../../front/element';
import {
  FlashcardEvents,
  FlashcardNextEvent,
  FlashcardRedoEvent,
  FlashcardRevealEvent,
  FlashcardReviseEvent,
} from './flashcard.events';

export enum FlashcardPhase {
  training = 'training',
  revision = 'revision',
  result = 'result',
}

@Element('flashcard-app')
export class FlashcardAppElement extends BridgeElement {
  private readonly $flashcards = this.$$<HTMLDivElement>('.flashcard');

  constructor() {
    super();

    // Setup data
    this.current = 0;
    this.flipped = false;
    this.phase = FlashcardPhase.revision;
    this.phase = FlashcardPhase.training;



    this.$flashcards.forEach($flashcard => {
      $flashcard.addEventListener('click', () => {
        this.flip();
        this.bridge.emit(FlashcardEvents.reveal, {});
      });
    });

    this.bridge.on<FlashcardRevealEvent>(FlashcardEvents.reveal, () => this.flip());

    this.bridge.on<FlashcardNextEvent>(FlashcardEvents.next, () => {
      this.current++;
    });

    this.bridge.on<FlashcardReviseEvent>(FlashcardEvents.revise, () => {
      this.phase = FlashcardPhase.revision;
    });

    this.bridge.on<FlashcardReviseEvent>(FlashcardEvents.training, () => {
      this.phase = FlashcardPhase.training;
    });

    this.bridge.on<FlashcardRedoEvent>(FlashcardEvents.redo, () => {
      this.phase = FlashcardPhase.revision;
      this.reset();
    });
  }

  private set phase(newPhase: FlashcardPhase) {
    this.dataset.phase = newPhase;
  }

  private get size(): number {
    return this.$flashcards.length;
  }

  private get current(): number {
    return parseInt(this.dataset.current, 10);
  }

  private set current(newCurrent: number) {
    // Bound index to [0, n]
    if (newCurrent < 0) {
      newCurrent = 0;
    } else if (newCurrent > this.size) {
      newCurrent = this.size - 1;
    }

    this.dataset.current = newCurrent.toString(10);
    this.$flashcards.forEach($flashcard => $flashcard.classList.remove('active'));

    if (newCurrent !== this.size) {
      this.$flashcards[newCurrent].classList.add('active');
    }
    this.flipped = false;


    if (newCurrent === this.size) {
      // This is the end
      this.phase = FlashcardPhase.result;
    }
  }

  private get flipped(): boolean {
    return this.dataset.flipped === 'true';
  }

  private set flipped(isFlipped: boolean) {
    this.dataset.flipped = isFlipped ? 'true' : 'false';
  }

  /**
   * Reset the data.
   */
  private reset(): void {
    this.current = 0;
    this.flipped = false;
  }

  /**
   * Flip the current flashcard.
   */
  private flip(): void {
    this.flipped = !this.flipped;
  }
}
