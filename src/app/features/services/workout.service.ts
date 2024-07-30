import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { IWorkout } from 'src/app/types/exercise/workout.model';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService extends DataService {
  private workouts = new BehaviorSubject<IWorkout[]>([]);
  currentData = this.workouts.asObservable();

  constructor(http: HttpClient) {
    super(http, 'http://localhost:3000/api/workouts');
  }

  fetching() {
    this.getAll().subscribe((res) => this.workouts.next(res));
  }

  changeData(data: IWorkout[]) {
    this.workouts.next(data);
  }

  getData() {
    return this.workouts.getValue();
  }
}
