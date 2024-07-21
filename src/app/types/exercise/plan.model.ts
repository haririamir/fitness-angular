import { IExersice } from './exersice.model';

export interface IPlan {
  id: number;
  name: string;
  delay: number;
  exercise: IExersice;
}
