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

  // Add a new user and update the shared state
  addExercise(newExercises: IExersice): void {
    this.create(newExercises).subscribe((res) => {
      const currentUsers = this.exercisesSubject.value;
      this.exercisesSubject.next([...currentUsers, newExercises]);
    });
  }

  // Delete a user and update the shared state
  // deleteUser(userId: any): void {
  //   this.delete(userId)
  //     .pipe(
  //       tap(() => {
  //         const currentUsers = this.usersSubject.value.filter(
  //           (user) => user.id !== userId
  //         );
  //         this.usersSubject.next(currentUsers);
  //       })
  //     )
  //     .subscribe();
  // }

  // // Update a user and update the shared state
  // updateUser(userId: any, updatedData: any): void {
  //   this.update(userId, updatedData)
  //     .pipe(
  //       tap((updatedUser) => {
  //         const currentUsers = this.usersSubject.value.map((user) =>
  //           user.id === userId ? updatedUser : user
  //         );
  //         this.usersSubject.next(currentUsers);
  //       })
  //     )
  //     .subscribe();
  // }
}
