import { BridgeElement } from '../../../front/bridge-element';
import { Element } from '../../../front/element';
import { QuestionBrickExplanationElement } from '../../../silicate/bricks/question-brick/question-brick-explanation.element';
import { QuestionBrickElement } from '../../../silicate/bricks/question-brick/question-brick.element';
import { ExamEvents, ExamFinishEvent, ExamRestartEvent, ExamResultEvent } from './exam.events';
import { ExamPhases } from './exam.phases';

@Element('exam-app')
export class ExamAppElement extends BridgeElement {
  $questions = this.$$<QuestionBrickElement>('silicate-question-brick');
  $explanations = this.$$<QuestionBrickExplanationElement>('silicate-question-brick-explanation');

  constructor() {
    super();
    this.bridge.on<ExamFinishEvent>(ExamEvents.finish, () => (this.phase = ExamPhases.correction));
    this.bridge.on<ExamRestartEvent>(ExamEvents.restart, () => (this.reset()));

    this.$explanations.forEach($e => $e.addEventListener('success', () => this.recompute()));
    this.reset();
  }

  get phase(): ExamPhases {
    return this.dataset.phase as ExamPhases;
  }

  set phase(newPhase: ExamPhases) {
    this.dataset.phase = newPhase;

    if (this.phase === ExamPhases.correction) {
      this.$questions.forEach($question => {
        $question.reveal = true;
      });
    }
  }

  get score(): number {
    return parseInt(this.dataset.score, 10);
  }

  set score(newScore: number) {
    this.dataset.score = newScore.toString(10);
  }

  get total(): number {
    if (!this.dataset.total) {
      this.dataset.total = this.$explanations.reduce((sum, $e) => sum + $e.points, 0).toString(10);
    }

    return parseInt(this.dataset.total, 10);
  }

  get success(): boolean {
    return this.dataset.success === 'true';
  }

  set success(newSuccess: boolean) {
    this.dataset.success = newSuccess.toString();
  }

  reset(): void {
    this.phase = ExamPhases.startup;
    this.score = 0;
    this.success = false;
    this.$questions.forEach($question => {
      $question.reveal = false;
    });
  }

  recompute(): void {
    const finish = this.$explanations.every($e => $e.success !== null);
    this.score = this.$explanations.reduce((sum, $e) => sum + $e.score, 0);

    if (finish) {
      this.success = this.score >= this.total / 2;
      this.bridge.emit<ExamResultEvent>(ExamEvents.result, {
        score: this.score,
        total: this.total,
      });
    }
  }
}
