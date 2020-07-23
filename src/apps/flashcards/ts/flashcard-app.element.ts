import {BridgeElement} from '../../../front/bridge-element';
import {Element} from '../../../front/element';
import {FlashcardsEvents} from './flashcards.events';
import {FlashcardPhase} from './flashcards.mode';
import {FlashcardsState} from './flashcards.state';

@Element('flashcard-app')
export class FlashcardAppElement extends BridgeElement {
  private readonly $progress = this.querySelector<HTMLDivElement>('.flashcard__progress-buffer');
  private readonly $flashcards = this.querySelectorAll<HTMLDivElement>('.flashcard');
  private readonly $trainingBtn = this.querySelector<HTMLButtonElement>('.flashcard__training-trigger');
  private readonly $revisionBtn = this.querySelector<HTMLButtonElement>('.flashcard__revision-trigger');
  private readonly $revealBtn = this.querySelector<HTMLButtonElement>('.flashcard__reveal-btn');
  private readonly $wrongBtn = this.querySelector<HTMLButtonElement>('.flashcard__wrong-btn');
  private readonly $rightBtn = this.querySelector<HTMLButtonElement>('.flashcard__right-btn');
  private readonly $retryBtn = this.querySelector<HTMLButtonElement>('.flashcard__retry-btn');
  private readonly $endBtn = this.querySelector<HTMLButtonElement>('.flashcard__end-btn');
  private readonly $score = this.querySelector<HTMLSpanElement>('.flashcard__score-percent');

  constructor() {
    super();

    this.bind();

    this.phase = FlashcardPhase.result;
    this.current = 0;
    this.flipped = false;
    this.score = 0;
  }

  protected bind(): void {
    this.$trainingBtn.addEventListener('click', () => this.initializeTrainingMode());

    this.$revisionBtn.addEventListener('click', () => this.initializeRevisionMode(false));

    this.$flashcards.forEach($flashcard => {
      $flashcard.addEventListener('click', () => {
        this.reveal();
      });
    });

    this.$revealBtn.addEventListener('click', () => this.reveal());

    this.$rightBtn.addEventListener('click', () => {
      this.score++;
      this.current++;
    });

    this.$wrongBtn.addEventListener('click', () => this.current++);

    this.$retryBtn.addEventListener('click', () => {
      this.initializeRevisionMode(true);
    });

    this.$endBtn.addEventListener('click', () => {
      this.bridge.emit(FlashcardsEvents.end, this.state);
    });
  }

  get phase(): FlashcardPhase {
    return this.dataset.phase as FlashcardPhase ?? FlashcardPhase.revision;
  }

  set phase(newPhase: FlashcardPhase) {
    this.dataset.phase = newPhase;
  }

  get size(): number {
    return this.$flashcards.length;
  }

  get current(): number {
    return parseInt(this.dataset.current, 10);
  }

  set current(index: number) {
    // Bound index to [0, n]
    if (index < 0) {
      index = 0;
    } else if (index > this.size) {
      index = this.size - 1;
    }

    this.dataset.current = index.toString(10);
    this.$flashcards.forEach(($flashcard) => $flashcard.classList.remove('active'));

    if (index !== this.size) {
      this.$flashcards.item(index).classList.add('active');
    }
    this.flipped = false;

    // Update progress
    this.$progress.style.width = (index * 100 / this.size).toFixed(2) + '%';

    if (index === this.size) {
      // This is the end
      this.phase = FlashcardPhase.result;
      this.bridge.emit(FlashcardsEvents.end, this.state);
    }
  }

  get flipped(): boolean {
    return this.dataset.flipped === 'true';
  }

  set flipped(isFlipped: boolean) {
    this.dataset.flipped = isFlipped ? 'true' : 'false';
  }

  get score(): number {
    return parseInt(this.dataset.score, 10);
  }

  set score(newScore: number) {
    this.dataset.score = newScore.toString(10);
    this.$score.textContent = (this.score * 100 / this.size).toFixed(0).toString();
  }

  get state(): FlashcardsState {
    return {
      phase: this.phase,
      current: this.current,
      flipped: this.flipped,
      score: this.score,
      size: this.size,
    };
  }

  initializeRevisionMode(reset = true): void {
    this.phase = FlashcardPhase.revision;

    if (reset) {
      this.current = 0;
      this.flipped = false;
      this.score = 0;
    }

    this.bridge.emit(FlashcardsEvents.mode, this.state);
  }

  initializeTrainingMode(): void {
    this.phase = FlashcardPhase.training;
    this.bridge.emit(FlashcardsEvents.mode, this.state);
  }

  reveal(): void {
    this.flipped = !this.flipped;
    this.bridge.emit(FlashcardsEvents.reveal, this.state);
  }
}