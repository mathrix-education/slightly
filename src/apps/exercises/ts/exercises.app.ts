import {App} from '../../app';
import {ExercisesElement} from './exercises.element';
import {ExercisesEvents} from './exercises.events';
import {ExercisesStatus} from './exercises.status';

export class ExercisesApp extends App {
  private readonly $linkBtns = this.$state.querySelectorAll<HTMLButtonElement>('.exercise__link');
  private readonly $exercises = this.$state.querySelectorAll<HTMLDivElement>('.exercise');
  private readonly exercises: ExercisesElement[] = [];

  constructor() {
    super();

    this.$exercises.forEach($exercise => this.exercises.push(new ExercisesElement(this, $exercise)));

    this.bind();
  }

  protected bind(): void {
    this.$linkBtns.forEach($linkBtn => {
      $linkBtn.addEventListener('click', () => {
        this.bridge.emit(ExercisesEvents.navigate, {
          id: $linkBtn.dataset.id,
        });
      });
    });
  }

  public onExerciseEnd() {
    const ready = this.exercises.every((exercise) => {
      return [ExercisesStatus.success, ExercisesStatus.failure].includes(exercise.state.status);
    });

    if (ready) {
      this.bridge.emit(ExercisesEvents.end, this.exercises.map(e => e.state));
    }
  }
}