import { ExamAppElement } from '../../../apps/exams/ts/exam-app.element';
import { Element } from '../../../front/element';
import { QuestionBrickExplanationElement } from './question-brick-explanation.element';

@Element('silicate-question-brick')
export class QuestionBrickElement extends HTMLElement {
  public parent: ExamAppElement;
  public readonly $explanations = this.querySelectorAll<QuestionBrickExplanationElement>(
    'silicate-question-brick-explanation',
  );

  constructor() {
    super();

    this.reveal = false;
  }

  get reveal() {
    return this.dataset.reveal === 'true';
  }

  set reveal(newReveal: boolean) {
    this.dataset.reveal = newReveal.toString();
  }
}
