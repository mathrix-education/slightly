import {BridgeElement} from '../../../front/bridge-element';
import {Element} from '../../../front/element';
import {
  ExerciseEndEvent,
  ExerciseNavigateEvent,
  ExercisesEvents,
} from './exercises.events';
import {ExercisesStatus} from './exercises.status';
import {QuestionApp} from './question.app';

@Element('exercise-app')
export class ExercisesApp extends BridgeElement {
  private readonly $linkBtns = this.querySelectorAll<HTMLButtonElement>('.exercise__link');
  private readonly $exercises = this.querySelectorAll<HTMLDivElement>('.exercise');
  private readonly $nextBtn = this.querySelector<HTMLButtonElement>('.exercise__next-btn');
  private readonly exercises: QuestionApp[] = [];

  constructor() {
    super();

    this.$exercises.forEach($exercise => this.exercises.push(new QuestionApp(this, $exercise)));

    this.status = ExercisesStatus.playing;
    this.bind();
  }

  protected bind(): void {
    this.$linkBtns.forEach($linkBtn => {
      $linkBtn.addEventListener('click', () => {
        this.bridge.emit<ExerciseNavigateEvent>(ExercisesEvents.navigate, {
          id: parseInt($linkBtn.dataset.id, 10),
        });
      });
    });

    if (this.$nextBtn) {
      this.$nextBtn.addEventListener('click', () => {
        this.bridge.emit<ExerciseNavigateEvent>(ExercisesEvents.navigate, {
          id: parseInt(this.$nextBtn.dataset.id, 10),
        });
      });
    }
  }

  get status(): ExercisesStatus {
    return this.dataset.status as ExercisesStatus;
  }

  set status(newStatus: ExercisesStatus) {
    this.dataset.status = newStatus;
  }

  public onExerciseEnd(): void {
    this.status = this.exercises.reduce((acc, exercise): ExercisesStatus => {
      switch (acc) {
        case ExercisesStatus.playing:
        case ExercisesStatus.failure:
          return acc;
      }

      return exercise.status;
    }, this.exercises[0].status);

    const ready = this.exercises.every((exercise) => {
      return [ExercisesStatus.success, ExercisesStatus.failure].includes(exercise.state.status);
    });

    if (ready) {
      this.bridge.emit<ExerciseEndEvent>(ExercisesEvents.end, {
        states: this.exercises.map(e => e.state),
      });
    }
  }
}