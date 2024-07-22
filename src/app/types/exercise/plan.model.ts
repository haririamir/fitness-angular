import { IExersice } from './exersice.model';

export interface IPlan {
  id: number;
  name: string;
  set: number;
  exercise: IExersice;
}
