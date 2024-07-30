import { IExersice } from './exersice.model';
import { IPlan } from './plan.model';

export interface IWorkout {
  workout_id: number;
  name: string;
  description: string;
}

export interface IWorkoutDetail {
  sets: number;
  reps: number;
  bsae_weight: number;
  exercise: IExersice;
  plan: IPlan;
}
