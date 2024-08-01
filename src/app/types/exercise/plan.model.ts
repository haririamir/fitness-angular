import { IExersice } from './exersice.model';

export interface IPlan {
  plan_id: number;
  user_id: number;
  workout_id: number;
  start_date: string;
  end_date: string;
}
