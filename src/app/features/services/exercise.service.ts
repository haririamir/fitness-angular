import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IExersice } from 'src/app/types/exercise/exersice.model';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  exercises = new Subject<IExersice[]>();

  constructor() {}

  getExercises() {
    this.exercises.next([
      { name: 'Crunch', id: 1 },
      { name: 'Scott', id: 2 },
      { name: 'Long', id: 3 },
    ]);
  }

  addExercises(exercise: IExersice[]) {
    this.exercises.next(exercise);
  }
}
