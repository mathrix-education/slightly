export enum ExamEvents {
  finished = 'exam.finished',
  review = 'exam.review',
  restart = 'exam.restart',
  result = 'exam.result',
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ExamFinishedEvent {
}



// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ExamRestartEvent {
}

export interface ExamResultEvent {
  score: number;
  total: number;
}
