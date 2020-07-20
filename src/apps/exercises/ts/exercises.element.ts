import {App} from '../../app';
import {ExercisesApp} from './exercises.app';
import {ExercisesState} from './exercises.state';
import {ExercisesStatus} from './exercises.status';

export class ExercisesElement extends App {
  $trigger = this.$state.querySelector<HTMLDivElement>('.exercise__hint-trigger');
  $choices = this.$state.querySelectorAll<HTMLButtonElement>('.exercise__choice');
  $explanation = this.$state.querySelector<HTMLDivElement>('.exercise__explanation');
  $hints = this.$state.querySelectorAll<HTMLDivElement>('.exercise__hint');

  constructor(private readonly app: ExercisesApp, $exercise) {
    super($exercise);

    this.hints = -1;
    this.bind();
  }

  protected bind(): void {
    this.$trigger.addEventListener('click', () => {
      if (this.hints < this.$hints.length - 2) {
        this.hints++;
      }
    });

    this.$choices.forEach($choice => {
      $choice.addEventListener('click', () => {
        $choice.dataset.clicked = 'true';

        if ($choice.dataset.valid === 'true') {
          this.status = ExercisesStatus.success;
        } else {
          this.status = ExercisesStatus.failure;
        }
      });
    });
  }

  get state(): ExercisesState {
    return {
      status: this.status,
    };
  }

  get hints(): number {
    return parseInt(this.$state.dataset.hints, 10);
  }

  set hints(newHints: number) {
    if (newHints < -1) {
      newHints = -1;
    } else if (newHints > this.$hints.length - 1) {
      newHints = this.$hints.length - 1;
    }

    this.$state.dataset.hints = newHints.toString(10);

    this.$explanation.style.display = this.hints !== -1 ? 'block' : 'none';

    if (this.hints >= this.$hints.length - 2) {
      this.$trigger.style.display = 'none';
    }

    this.$hints.forEach(($hint, index) => {
      $hint.style.display = index <= this.hints ? 'block' : 'none';
    });
  }

  get status(): ExercisesStatus {
    return this.$state.dataset.status as ExercisesStatus;
  }

  set status(newStatus: ExercisesStatus) {
    this.$state.dataset.status = newStatus;

    if (this.status === ExercisesStatus.success || this.status === ExercisesStatus.failure) {
      this.hints = Infinity;
      this.app.onExerciseEnd();
    }
  }
}