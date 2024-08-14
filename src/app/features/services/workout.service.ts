import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from 'src/app/services/entity.service';
import { IWorkout } from 'src/app/types/exercise/workout.model';

@Injectable({
  providedIn: 'any',
})
export class WorkoutService extends EntityService<IWorkout> {
  constructor(http: HttpClient) {
    super(http, 'http://localhost:3000/api/workouts');
  }
}
