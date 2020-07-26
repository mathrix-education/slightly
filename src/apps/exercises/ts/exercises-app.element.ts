import { BridgeElement } from '../../../front/bridge-element';
import { Element } from '../../../front/element';
import { ExerciseQuestionElement } from './exercise-question.element';
import { ExerciseQuestionStatus } from './exercise-question.status';
import {
  ExerciseEvents,
  ExerciseResultEvent,
} from './exercise.events';

@Element('exercise-app')
export class ExercisesAppElement extends BridgeElement {
  private readonly $questions = this.$$<ExerciseQuestionElement>('exercise-question');

  constructor() {
    super();

    this.$questions.forEach($q =>
      $q.addEventListener('finished', () => {
        const ready = this.$questions.every($q => {
          return [ExerciseQuestionStatus.success, ExerciseQuestionStatus.failure].includes($q.status);
        });

        if (ready) {
          this.bridge.emit<ExerciseResultEvent>(ExerciseEvents.result, {
            score: this.$questions.filter($q => $q.status === ExerciseQuestionStatus.success).length,
            total: this.$questions.length,
          });
        }
      }),
    );
  }
}
