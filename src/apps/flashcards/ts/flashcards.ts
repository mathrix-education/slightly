enum FlashcardMode {
  training = 'training',
  revision = 'revision',
}

enum FlashcardStatus {
  playing = 'playing',
  end = 'end',
}

export class Flashcards {
  private $state = this.$base.querySelector<HTMLDivElement>('#app');
  private $progress = this.$state.querySelector<HTMLDivElement>('.flashcard__progress-buffer');
  private $trainingBtn = this.$state.querySelector<HTMLButtonElement>('.flashcard__training-btn');
  private $revisionBtn = this.$state.querySelector<HTMLButtonElement>('.flashcard__revision-btn');
  private $flashcards = this.$state.querySelectorAll<HTMLDivElement>('.flashcard');
  private $revealBtn = this.$state.querySelector<HTMLButtonElement>('.flashcard__reveal-btn');
  private $wrongBtn = this.$state.querySelector<HTMLButtonElement>('.flashcard__wrong-btn');
  private $rightBtn = this.$state.querySelector<HTMLButtonElement>('.flashcard__right-btn');
  private $score = this.$state.querySelector<HTMLSpanElement>('.flashcard__score-percent');
  private rightCount = 0;

  constructor(private $base: ParentNode = document) {
    this.boot();
  }

  boot(): void {
    this.mode = FlashcardMode.revision;
    this.activeFlashcard = this.$flashcards.length - 1;
    this.flipped = true;

    this.$trainingBtn.addEventListener('click', () => this.mode = FlashcardMode.training);
    this.$revisionBtn.addEventListener('click', () => this.mode = FlashcardMode.revision);

    this.$flashcards.forEach($flashcard => {
      $flashcard.addEventListener('click', () => {
        this.reveal();
      });
    });

    this.$revealBtn.addEventListener('click', () => this.reveal());
    this.$rightBtn.addEventListener('click', () => this.right());
    this.$wrongBtn.addEventListener('click', () => this.wrong());
  }

  get status(): FlashcardStatus {
    return this.$state.dataset.status as FlashcardStatus ?? FlashcardStatus.playing;
  }

  set status(newStatus: FlashcardStatus) {
    this.$state.dataset.status = newStatus;
  }

  get mode(): FlashcardMode {
    return this.$state.dataset.mode as FlashcardMode ?? FlashcardMode.revision;
  }

  set mode(newMode: FlashcardMode) {
    this.$state.dataset.mode = newMode;

    if (newMode === FlashcardMode.revision) {
      this.initializeRevisionMode();
    } else {
      this.initializeTrainingMode();
    }
  }

  get activeFlashcard(): number {
    return parseInt(this.$state.dataset.current, 10);
  }

  set activeFlashcard(index: number) {
    // Bound index to [0, n]
    if (index === this.$flashcards.length) {
      // This is the end
      this.status = FlashcardStatus.end;
    } else if (index < 0) {
      index = 0;
    } else if (index > this.$flashcards.length) {
      index = this.$flashcards.length - 1;
    }

    this.$state.dataset.current = index.toString(10);
    this.$flashcards.forEach(($flashcard) => $flashcard.classList.remove('active'));

    if (index !== this.$flashcards.length) {
      this.$flashcards.item(index).classList.add('active');
    }
    this.flipped = false;

    // Update progress
    this.$progress.style.width = (index * 100 / this.$flashcards.length).toFixed(2) + '%';
  }

  get flipped(): boolean {
    return this.$state.dataset.flipped === 'true';
  }

  set flipped(isFlipped: boolean) {
    this.$state.dataset.flipped = isFlipped ? 'true' : 'false';
  }

  initializeRevisionMode(): void {
    this.$state.dataset.mode = FlashcardMode.revision;
  }

  reveal(): void {
    this.flipped = !this.flipped;
  }

  right(): void {
    this.activeFlashcard++;
    this.rightCount++;
    this.updateScore();
  }

  wrong(): void {
    this.activeFlashcard++;
  }

  updateScore() {
    this.$score.textContent = (this.rightCount / this.$flashcards.length).toFixed(0).toString();
  }

  initializeTrainingMode(): void {

  }
}