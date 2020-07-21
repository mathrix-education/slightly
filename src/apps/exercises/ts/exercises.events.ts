import {ExercisesState} from './exercises.state';

export enum ExercisesEvents {
  navigate = 'exercises.navigate',
  end = 'exercises.end',
}

export interface ExerciseNavigateEvent {
  /** The requested exercise id */
  id: number;
}

export interface ExerciseEndEvent {
  /** The exercise id */
  states: ExercisesState[];
}