import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IExersice } from 'src/app/types/exercise/exersice.model';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  exercises: BehaviorSubject<IExersice[]> = new BehaviorSubject<IExersice[]>([
    { name: 'Crunch', id: 1 },
    { name: 'Scott', id: 2 },
    { name: 'Long', id: 3 },
  ]);
  constructor() {}

    addExercises(exercise: IExersice[]) {
    this.exercises.next(exercise);
  }
}
