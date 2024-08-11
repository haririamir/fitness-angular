import { IExersice } from './exersice.model';
import { IWorkout } from './workout.model';

export interface IPlan {
  id?: number;
  user_id: number;
  workout_id: number;
  start_date: string;
  end_date: string;
  workout: IWorkout;
}
