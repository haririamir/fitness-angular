import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { IPlan } from 'src/app/types/exercise/plan.model';
import { IWorkout } from 'src/app/types/exercise/workout.model';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService extends DataService {
  workouts: BehaviorSubject<IWorkout[]> = new BehaviorSubject<IWorkout[]>([]);

  constructor(http: HttpClient) {
    super(http, 'http://localhost:3000/api/workouts');
    this.getAll().subscribe((res) => this.workouts.next(res));
  }
}
