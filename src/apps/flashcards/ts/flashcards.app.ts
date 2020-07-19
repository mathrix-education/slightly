import {App} from '../../app';
import {FlashcardsEvents} from './flashcards.events';
import {FlashcardMode} from './flashcards.mode';
import {FlashcardsState} from './flashcards.state';
import {FlashcardsStatus} from './flashcards.status';

export class FlashcardsApp extends App {
  private readonly $progress = this.$<HTMLDivElement>('.flashcard__progress-buffer');
  private readonly $flashcards = this.$state.querySelectorAll<HTMLDivElement>('.flashcard');
  private readonly $trainingBtn = this.$<HTMLButtonElement>('.flashcard__training-btn');
  private readonly $revisionBtn = this.$<HTMLButtonElement>('.flashcard__revision-btn');
  private readonly $revealBtn = this.$<HTMLButtonElement>('.flashcard__reveal-btn');
  private readonly $wrongBtn = this.$<HTMLButtonElement>('.flashcard__wrong-btn');
  private readonly $rightBtn = this.$<HTMLButtonElement>('.flashcard__right-btn');
  private readonly $retryBtn = this.$<HTMLButtonElement>('.flashcard__retry-btn');
  private readonly $endBtn = this.$<HTMLButtonElement>('.flashcard__end-btn');
  private readonly $score = this.$<HTMLSpanElement>('.flashcard__score-percent');

  constructor() {
    super();

    this.bind();
    this.initializeRevisionMode(true);
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

  get status(): FlashcardsStatus {
    return this.$state.dataset.status as FlashcardsStatus ?? FlashcardsStatus.playing;
  }

  set status(newStatus: FlashcardsStatus) {
    this.$state.dataset.status = newStatus;
  }

  get mode(): FlashcardMode {
    return this.$state.dataset.mode as FlashcardMode ?? FlashcardMode.revision;
  }

  set mode(newMode: FlashcardMode) {
    this.$state.dataset.mode = newMode;
  }

  get size(): number {
    return this.$flashcards.length;
  }

  get current(): number {
    return parseInt(this.$state.dataset.current, 10);
  }

  set current(index: number) {
    // Bound index to [0, n]
    if (index < 0) {
      index = 0;
    } else if (index > this.size) {
      index = this.size - 1;
    }

    this.$state.dataset.current = index.toString(10);
    this.$flashcards.forEach(($flashcard) => $flashcard.classList.remove('active'));

    if (index !== this.size) {
      this.$flashcards.item(index).classList.add('active');
    }
    this.flipped = false;

    // Update progress
    this.$progress.style.width = (index * 100 / this.size).toFixed(2) + '%';

    if (index === this.size) {
      // This is the end
      this.status = FlashcardsStatus.end;
      this.bridge.emit(FlashcardsEvents.end, this.state);
    }
  }

  get flipped(): boolean {
    return this.$state.dataset.flipped === 'true';
  }

  set flipped(isFlipped: boolean) {
    this.$state.dataset.flipped = isFlipped ? 'true' : 'false';
  }

  get score(): number {
    return parseInt(this.$state.dataset.score, 10);
  }

  set score(newScore: number) {
    this.$state.dataset.score = newScore.toString(10);
    this.$score.textContent = (this.score * 100 / this.size).toFixed(0).toString();
  }

  get state(): FlashcardsState {
    return {
      mode: this.mode,
      status: this.status,
      current: this.current,
      flipped: this.flipped,
      score: this.score,
      size: this.size,
    };
  }

  initializeRevisionMode(reset = true): void {
    this.mode = FlashcardMode.revision;
    this.status = FlashcardsStatus.playing;

    if (reset) {
      this.current = 0;
      this.flipped = false;
      this.score = 0;
    }

    this.bridge.emit(FlashcardsEvents.mode, this.state);
  }

  initializeTrainingMode(): void {
    this.mode = FlashcardMode.training;
    this.bridge.emit(FlashcardsEvents.mode, this.state);
  }

  reveal(): void {
    this.flipped = !this.flipped;
    this.bridge.emit(FlashcardsEvents.reveal, this.state);
  }
}