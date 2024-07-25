import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { IExersice } from 'src/app/types/exercise/exersice.model';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService extends DataService {
  exercises: BehaviorSubject<IExersice[]> = new BehaviorSubject<IExersice[]>(
    []
  );
  constructor(http: HttpClient) {
    super(http, 'http://localhost:3000/api/exercises');
  }

  addExercises(exercise: IExersice[]) {
    this.exercises.next(exercise);
  }
}
