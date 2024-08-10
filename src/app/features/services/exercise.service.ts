import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { IExersice } from 'src/app/types/exercise/exersice.model';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService extends DataService {
  exercisesSubject: BehaviorSubject<IExersice[]> = new BehaviorSubject<
    IExersice[]
  >([]);
  public exercises: Observable<IExersice[]> =
    this.exercisesSubject.asObservable();

  constructor(http: HttpClient) {
    super(http, 'http://localhost:3000/api/exercises');
  }

  fetchExercises(): void {
    this.getAll().subscribe((res) => {
      this.exercisesSubject.next(res);
    });
  }

  // Add a new exercise and update the shared state
  addExercise(newExercises: IExersice): void {
    this.create(newExercises).subscribe((res) => {
      const current = this.exercisesSubject.value;
      this.exercisesSubject.next([...current, { ...res, ...newExercises }]);
    });
  }

  // Delete a exercise and update the shared state
  deleteExercise(exerciseId: any): void {
    this.delete(exerciseId).subscribe(() => {
      const current = this.exercisesSubject.value.filter(
        (ex) => ex.exercise_id !== exerciseId
      );
      this.exercisesSubject.next(current);
    });
  }

  // Update a exercise and update the shared state
  updateExercise(exerciseId: any, updatedData: any): void {
    this.update(exerciseId, updatedData).subscribe(() => {
      const current = this.exercisesSubject.value.map((ex) =>
        ex.exercise_id === exerciseId ? updatedData : ex
      );
      this.exercisesSubject.next(current);
    });
  }
}
