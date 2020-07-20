import {App} from '../../app';
import {ExercisesEvents} from './exercises.events';
import {ExercisesState} from './exercises.state';

export class ExercisesApp extends App {
  private readonly $linkBtns = this.$state.querySelectorAll<HTMLButtonElement>('.exercise__link');
  private readonly $hintTrigger = this.$<HTMLButtonElement>('.exercise__hint-trigger');
  private readonly $explanations = this.$<HTMLDivElement>('.exercise__explanation');
  private readonly $hints = this.$state.querySelectorAll<HTMLDivElement>('.exercise__hint');
  private readonly totalHints = this.$hints.length;

  constructor() {
    super();

    this.bind();
    this.init();
  }

  get state(): ExercisesState {
    return this.$state.dataset.state as ExercisesState;
  }

  set state(newState: ExercisesState) {
    this.$state.dataset.state = newState;
  }

  get hints() {
    return parseInt(this.$state.dataset.hints, 10);
  }

  set hints(newHints: number) {
    this.$state.dataset.hints = newHints.toString(10);

    if (this.hints >= this.totalHints - 2) {
      this.$hintTrigger.style.display = 'none';
    } else {
      delete this.$hintTrigger.style.display;
    }

    // Reveal hints accordingly
    this.$explanations.style.display = this.hints !== -1 ? 'block' : 'none';

    this.$hints.forEach(($hint, index) => {
      $hint.style.display = index <= this.hints ? 'block' : 'none';
    });
  }

  protected bind(): void {
    this.$linkBtns.forEach($linkBtn => {
      $linkBtn.addEventListener('click', () => {
        this.bridge.emit(ExercisesEvents.navigate, {
          id: $linkBtn.dataset.id,
        });
      });
    });

    this.$hintTrigger.addEventListener('click', () => this.hints++);
  }

  protected init() {
    this.state = ExercisesState.playing;
    this.hints = -1;
  }
}