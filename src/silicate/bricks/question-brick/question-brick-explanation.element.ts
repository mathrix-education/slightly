import { Element } from '../../../front/element';

@Element('silicate-question-brick-explanation')
export class QuestionBrickExplanationElement extends HTMLElement {
  private readonly $successBtn = this.querySelector<HTMLButtonElement>('.question-brick__evaluation-success');
  private readonly $failureBtn = this.querySelector<HTMLButtonElement>('.question-brick__evaluation-failure');

  constructor() {
    super();

    this.$successBtn.addEventListener('click', () => (this.success = true));
    this.$failureBtn.addEventListener('click', () => (this.success = false));
  }

  get success(): boolean {
    if (this.dataset.success === undefined) {
      return null;
    }

    return this.dataset?.success === 'true';
  }

  set success(newSuccess: boolean) {
    if (newSuccess === undefined) {
      delete this.dataset.success;
    } else {
      this.dataset.success = newSuccess.toString();
    }
    this.dispatchEvent(new Event('success'));
  }

  get points(): number {
    return this.dataset.points ? parseInt(this.dataset.points, 10) : 10;
  }

  get score(): number {
    return this.success ? this.points : 0;
  }
}
