import { BridgeElement } from '../../../front/bridge-element';
import { Element } from '../../../front/element';
import { ExerciseQuestionStatus } from './exercise-question.status';

@Element('exercise-question')
export class ExerciseQuestionElement extends BridgeElement {
  $trigger = this.$<HTMLDivElement>('.exercise__hint-trigger');
  $choices = this.$$<HTMLButtonElement>('.exercise__choice');
  $explanation = this.$<HTMLDivElement>('.exercise__explanation');
  $hints = this.$$<HTMLDivElement>('.exercise__hint');
  private locked = false;

  constructor() {
    super();

    this.hints = -1;
    this.status = ExerciseQuestionStatus.unknown;

    this.$trigger.addEventListener('click', () => {
      if (this.hints < this.$hints.length - 2) {
        this.hints++;
      }
    });

    this.$choices.forEach($choice => {
      $choice.addEventListener('click', () => {
        if (this.locked) {
          return;
        }

        this.locked = true;
        $choice.dataset.clicked = true.toString();

        if ($choice.dataset.valid === 'true') {
          this.status = ExerciseQuestionStatus.success;
        } else {
          this.status = ExerciseQuestionStatus.failure;
        }
      });
    });
  }

  get hints(): number {
    return parseInt(this.dataset.hints, 10);
  }

  set hints(newHints: number) {
    if (newHints < -1) {
      newHints = -1;
    } else if (newHints > this.$hints.length - 1) {
      newHints = this.$hints.length - 1;
    }

    this.dataset.hints = newHints.toString(10);

    this.$explanation.style.display = this.hints !== -1 ? 'block' : 'none';

    if (this.hints >= this.$hints.length - 2) {
      this.$trigger.style.display = 'none';
    }

    this.$hints.forEach(($hint, index) => {
      $hint.style.display = index <= this.hints ? 'block' : 'none';
    });
  }

  get status(): ExerciseQuestionStatus {
    return this.dataset.status as ExerciseQuestionStatus;
  }

  set status(newStatus: ExerciseQuestionStatus) {
    this.dataset.status = newStatus;

    if (this.status === ExerciseQuestionStatus.success || this.status === ExerciseQuestionStatus.failure) {
      this.hints = Infinity;
      this.dispatchEvent(new Event('finished'));
      window.scrollTo({
        top: this.$choices[0].parentElement.offsetTop - 16,
        behavior: 'smooth',
      });
    }
  }
}
