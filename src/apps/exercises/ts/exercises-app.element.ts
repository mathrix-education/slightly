import {BridgeElement} from '../../../front/bridge-element';
import {Element} from '../../../front/element';
import {ExerciseQuestionElement} from './exercise-question.element';
import {
  ExerciseResultEvent,
  ExerciseEvents,
} from './exercise.events';
import {QuestionStatus} from './question.status';

@Element('exercise-app')
export class ExercisesAppElement extends BridgeElement {
  private readonly $questions = this.$$<ExerciseQuestionElement>('exercise-question');

  constructor() {
    super();

    this.$questions.forEach($q => $q.addEventListener('finished', () => {
      const ready = this.$questions.every(($q) => {
        return [QuestionStatus.success, QuestionStatus.failure].includes($q.status);
      });

      if (ready) {
        this.bridge.emit<ExerciseResultEvent>(ExerciseEvents.result, {
          score: this.$questions.filter($q => $q.status === QuestionStatus.success).length,
          total: this.$questions.length,
        });
      }
    }));
  }
}