import {Element} from '../../../front/element';
import {QuestionBrickElement} from './question-brick.element';

@Element('silicate-question-brick-explanation')
export class QuestionBrickExplanationElement extends HTMLElement {
  public parent: QuestionBrickElement;

  private readonly $successBtn = this.querySelector<HTMLButtonElement>('.question-brick__evaluation-success');
  private readonly $failureBtn = this.querySelector<HTMLButtonElement>('.question-brick__evaluation-failure');

  constructor() {
    super();

    this.$successBtn.addEventListener('click', () => this.success = true);
    this.$failureBtn.addEventListener('click', () => this.success = false);
  }

  get success(): boolean {
    if (this.dataset.success === undefined) {
      return null;
    }

    return this.dataset?.success === 'true';
  }

  set success(newSuccess: boolean) {
    this.dataset.success = newSuccess.toString();
    this.parent.parent.recompute();
  }

  get points(): number {
    return this.dataset.points ? parseInt(this.dataset.points, 10) : 10;
  }

  get score(): number {
    return this.success ? this.points : 0;
  }
}