import { BridgeElement } from '../../../front/bridge-element';
import { Element } from '../../../front/element';
import {
  FlashcardEvents,
  FlashcardExitEvent, FlashcardRedoEvent,
  FlashcardResultEvent,
} from './flashcard.events';

enum FlashcardPhase {
  training = 'training',
  revision = 'revision',
  result = 'result',
}

@Element('flashcard-app')
export class FlashcardAppElement extends BridgeElement {
  private readonly $progress = this.$<HTMLDivElement>('.flashcard__progress-buffer');
  private readonly $flashcards = this.$$<HTMLDivElement>('.flashcard');
  private readonly $trainingBtn = this.$<HTMLButtonElement>('.flashcard__training-trigger');
  private readonly $revisionBtn = this.$<HTMLButtonElement>('.flashcard__revision-trigger');
  private readonly $revealBtn = this.$<HTMLButtonElement>('.flashcard__reveal-btn');
  private readonly $wrongBtn = this.$<HTMLButtonElement>('.flashcard__wrong-btn');
  private readonly $rightBtn = this.$<HTMLButtonElement>('.flashcard__right-btn');
  private readonly $retryBtn = this.$<HTMLButtonElement>('.flashcard__retry-btn');
  private readonly $exitBtn = this.$<HTMLButtonElement>('.flashcard__exit-btn');
  private readonly $score = this.$<HTMLSpanElement>('.flashcard__score-percent');

  constructor() {
    super();

    // Setup data
    this.current = 0;
    this.flipped = false;
    this.score = 0;
    this.phase = FlashcardPhase.revision;

    // Revision phase
    this.$trainingBtn.addEventListener('click', () => (this.phase = FlashcardPhase.training));

    this.$flashcards.forEach($flashcard => {
      $flashcard.addEventListener('click', () => this.flip());
    });
    this.$revealBtn.addEventListener('click', () => this.flip());

    this.$rightBtn.addEventListener('click', () => {
      // Right answer, increment score and go to next flashcard
      this.score++;
      this.current++;
    });
    this.$wrongBtn.addEventListener('click', () => {
      // Wrong answer, DO NOT increment score and go to next flashcard
      this.current++;
    });

    // Training phase
    this.$revisionBtn.addEventListener('click', () => (this.phase = FlashcardPhase.revision));

    // Result screen
    this.$retryBtn.addEventListener('click', () => {
      this.phase = FlashcardPhase.revision;
      this.bridge.emit<FlashcardRedoEvent>(FlashcardEvents.redo, {});
      this.reset();
    });
    this.$exitBtn.addEventListener('click', () => {
      this.bridge.emit<FlashcardExitEvent>(FlashcardEvents.exit, {});
    });
  }

  private get phase(): FlashcardPhase {
    return (this.dataset.phase as FlashcardPhase) ?? FlashcardPhase.revision;
  }

  private set phase(newPhase: FlashcardPhase) {
    this.dataset.phase = newPhase;

    if (this.phase === FlashcardPhase.result) {
      this.bridge.emit<FlashcardResultEvent>('flashcard.result', {
        score: this.score,
        total: this.size,
      });
    }
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

    // Update progress
    this.$progress.style.width = ((newCurrent * 100) / this.size).toFixed(2) + '%';

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

  private get score(): number {
    return parseInt(this.dataset.score, 10);
  }

  private set score(newScore: number) {
    this.dataset.score = newScore.toString(10);
    this.$score.textContent = ((this.score * 100) / this.size).toFixed(0).toString();
  }

  /**
   * Reset the data.
   */
  private reset(): void {
    this.current = 0;
    this.flipped = false;
    this.score = 0;
  }

  /**
   * Flip the current flashcard.
   */
  private flip(): void {
    this.flipped = !this.flipped;
  }
}
