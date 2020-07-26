export enum ExamEvents {
  pause = 'exam.pause',
  resume = 'exam.resume',
  result = 'exam.result',
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ExamPauseEvent {
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ExamResumeEvent {
}

export interface ExamResultEvent {
  score: number;
  total: number;
}