class Flashcards {
  private $progress: HTMLDivElement = document.querySelector('.flashcards-progress__buffer');
  private $modeButton: HTMLButtonElement = document.querySelector('.flashcard-mode-button');
  private $container: HTMLDivElement = document.querySelector('.flashcards-container');
  private $flashcards = document.querySelectorAll('.flashcard');
  private $revealButton: HTMLButtonElement = document.querySelector('.flashcard-reveal-button');
  private $wrongButton: HTMLButtonElement = document.querySelector('.flashcard-wrong__button');
  private $rightButton: HTMLButtonElement = document.querySelector('.flashcard-right__button');

  constructor() {
    this.boot();
  }

  boot() {
    this.$modeButton.addEventListener('click', () => {
      this.toggleMode();
    });

    this.$revealButton.addEventListener('click', () => {
      this.reveal();
    });

    this.$rightButton.addEventListener('click', () => {
      this.right();
    });

    this.$wrongButton.addEventListener('click', () => {
      this.wrong();
    });

    this.mode = this.mode;
  }

  toggleMode() {
    this.mode = this.mode === 'revision' ? 'training' : 'revision';
  }

  get mode() {
    return this.$container.dataset.mode ?? 'revision';
  }

  set mode(newMode: string) {
    if (newMode === 'revision') {
      this.$container.dataset.mode = 'revision';
      this.initializeRevisionMode();
    } else {
      this.$container.dataset.mode = 'training';
      this.initializeTrainingMode();
    }
  }

  get activeFlashcard() {
    return parseInt(this.$container.dataset.current, 10);
  }

  set activeFlashcard(index: number) {
    this.$container.dataset.current = index.toString(10);
    this.$flashcards.forEach(($flashcard) => $flashcard.classList.remove('active'));
    this.$flashcards.item(index).classList.add('active');

    // Update progress
    this.$progress.style.width = (index * 100 / this.$flashcards.length).toFixed(2) + '%';
  }

  initializeRevisionMode() {
    this.$container.dataset.mode = 'revision';
    this.activeFlashcard = 0;
  }

  reveal() {
    this.$flashcards.item(this.activeFlashcard).classList.toggle('flipped');
  }

  right() {
    this.activeFlashcard++;
  }

  wrong() {
    this.activeFlashcard++;
  }

  initializeTrainingMode() {

  }
}

new Flashcards();