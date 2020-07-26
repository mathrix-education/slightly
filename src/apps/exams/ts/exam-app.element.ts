import {BridgeElement} from '../../../front/bridge-element';
import {Element} from '../../../front/element';
import {QuestionBrickExplanationElement} from '../../../silicate/bricks/question-brick/question-brick-explanation.element';
import {QuestionBrickElement} from '../../../silicate/bricks/question-brick/question-brick.element';
import {
  ExamEvents,
  ExamPauseEvent,
  ExamResultEvent,
  ExamResumeEvent,
} from './exam.events';
import {ExamPhases} from './exam.phases';

@Element('exam-app')
export class ExamAppElement extends BridgeElement {
  $questions = this.$$<QuestionBrickElement>('silicate-question-brick');
  $explanations = this.$$<QuestionBrickExplanationElement>('silicate-question-brick-explanation');

  // Start phase
  $startBtn = this.$<HTMLButtonElement>('.exam__start-btn');

  // Playing phase
  $timer = this.$<HTMLSpanElement>('.exam__timer-remaining-time');
  tick;
  $pauseBtn = this.$<HTMLSpanElement>('.exam__timer-pause');
  $endBtn = this.$<HTMLButtonElement>('.exam__end-btn');

  // Correction phase
  $debriefBtn = this.$<HTMLButtonElement>('.exam__debriefing-btn');

  // Result phase
  $score = this.$<HTMLSpanElement>('.exam__score');
  $total = this.$<HTMLSpanElement>('.exam__total');
  $correctionBtn = this.$<HTMLButtonElement>('.exam__correction-btn');
  $retryBtn = this.$<HTMLButtonElement>('.exam__retry-btn');


  constructor() {
    super();

    this.$startBtn.addEventListener('click', () => this.phase = ExamPhases.playing);
    this.$pauseBtn.addEventListener('click', () => this.pause());
    this.bridge.on<ExamResumeEvent>(ExamEvents.resume, () => this.resume());
    this.$endBtn.addEventListener('click', () => this.phase = ExamPhases.correction);

    this.$explanations.forEach($e => $e.addEventListener('success', () => this.recompute()));
    this.$debriefBtn.addEventListener('click', () => this.phase = ExamPhases.debriefing);
    this.$correctionBtn.addEventListener('click', () => this.phase = ExamPhases.correction);
    this.$retryBtn.addEventListener('click', () => this.reset());

    this.reset();
  }

  get phase(): ExamPhases {
    return this.dataset.phase as ExamPhases;
  }

  set phase(newPhase: ExamPhases) {
    this.dataset.phase = newPhase;

    if (this.phase === ExamPhases.playing) {
      this.timer = parseInt(this.dataset.duration);
      this.resume();
    } else if (this.phase === ExamPhases.correction) {
      if (this.tick) {
        this.pause();
        delete this.tick;
      }

      this.$questions.forEach($question => {
        $question.reveal = true;
      });
    }
  }

  get timer(): number {
    return parseInt(this.dataset.timer, 10);
  }

  set timer(newTimer: number) {
    this.dataset.timer = newTimer.toString(10);

    const minutes = Math.floor(this.timer / 60);
    const seconds = this.timer % 60;

    this.$timer.textContent = minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);

    if (this.timer <= 0) {
      this.pause();
      this.phase = ExamPhases.correction;
    }
  }

  get score(): number {
    return parseInt(this.dataset.score, 10);
  }

  set score(newScore: number) {
    this.dataset.score = newScore.toString(10);
    this.$score.textContent = newScore.toString(10);
  }

  get total(): number {
    if (!this.dataset.total) {
      this.dataset.total = this.$explanations.reduce((sum, $e) => sum + $e.points, 0).toString(10);
    }

    return parseInt(this.dataset.total, 10);
  }

  set total(newTotal: number) {
    this.$total.textContent = newTotal.toString(10);
  }

  get success(): boolean {
    return this.dataset.success === 'true';
  }

  set success(newSuccess: boolean) {
    this.dataset.success = newSuccess.toString();
  }

  reset(): void {
    this.total = this.total;
    this.phase = ExamPhases.startup;
    this.score = 0;
    this.success = false;
    this.$questions.forEach($question => {
      $question.reveal = false;
    });
  }

  pause(): void {
    clearInterval(this.tick);
    this.bridge.emit<ExamPauseEvent>(ExamEvents.pause, {});
  }

  resume(): void {
    this.tick = setInterval(() => this.timer--, 1000);
  }

  recompute(): void {
    const finish = this.$explanations.every($e => $e.success !== null);
    this.score = this.$explanations.reduce((sum, $e) => sum + $e.score, 0);

    if (finish) {
      this.success = this.score >= this.total / 2;
      this.$debriefBtn.disabled = false;
      this.bridge.emit<ExamResultEvent>(ExamEvents.result, {
        score: this.score,
        total: this.total,
      });
    }
  }
}