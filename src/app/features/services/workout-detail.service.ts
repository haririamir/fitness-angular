import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from 'src/app/services/entity.service';
import { IWorkoutDetail } from 'src/app/types/exercise/workout.model';

@Injectable({
  providedIn: 'root',
})
export class WorkoutDetailService extends EntityService<IWorkoutDetail> {
  constructor(http: HttpClient) {
    super(http, 'http://localhost:3000/api/workouts/details');
  }
}
