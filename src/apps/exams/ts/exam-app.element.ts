import {Element} from '../../../front/element';
import {QuestionBrickElement} from '../../../silicate/bricks/question-brick/question-brick.element';
import {ExamPhases} from './exam.phases';

@Element('exam-app')
export class ExamAppElement extends HTMLElement {
  $questions = this.querySelectorAll<QuestionBrickElement>('silicate-question-brick');
  $timer = this.querySelector<HTMLSpanElement>('.exam__timer-remaining-time');
  tick;

  $startBtn = this.querySelector<HTMLButtonElement>('.exam__start-btn');
  $endBtn = this.querySelector<HTMLButtonElement>('.exam__end-btn');
  $debriefBtn = this.querySelector<HTMLButtonElement>('.exam__debriefing-btn');
  $correctionBtn = this.querySelector<HTMLButtonElement>('.exam__correction-btn');
  $retryBtn = this.querySelector<HTMLButtonElement>('.exam__retry-btn');
  $score = this.querySelector<HTMLSpanElement>('.exam__score');


  constructor() {
    super();

    this.$questions.forEach($question => $question.parent = this);

    this.$startBtn.addEventListener('click', () => this.phase = ExamPhases.playing);
    this.$endBtn.addEventListener('click', () => this.phase = ExamPhases.correction);
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
      this.tick = setInterval(() => this.timer--, 1000);
    } else if (this.phase === ExamPhases.correction) {
      if (this.tick) {
        clearInterval(this.tick);
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
      clearInterval(this.tick);
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
    return parseInt(this.dataset.total, 10);
  }

  get success(): boolean {
    return this.dataset.success === 'true';
  }

  set success(newSuccess: boolean) {
    this.dataset.success = newSuccess.toString();
  }

  reset() {
    this.phase = ExamPhases.startup;
    this.score = 0;
    this.success = false;
    this.$questions.forEach($question => {
      $question.reveal = false;
    });
  }

  recompute(): void {
    const finish = Array.from(this.$questions).every($question => {
      return Array.from($question.$explanations).every($explanation => $explanation.success !== null);
    });

    this.score = Array.from(this.$questions).reduce((total, $question) => {
      return Array.from($question.$explanations).reduce((totalQuestion, $explanation) => {
        return totalQuestion + $explanation.score;
      }, 0);
    }, 0);

    if (finish) {
      this.success = this.score >= this.total / 2;
      this.$debriefBtn.disabled = false;
    }
  }
}