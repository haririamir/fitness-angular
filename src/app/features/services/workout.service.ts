import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { IPlan } from 'src/app/types/exercise/plan.model';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService extends DataService {
  plans: BehaviorSubject<IPlan[]> = new BehaviorSubject<IPlan[]>([]);

  constructor(http: HttpClient) {
    super(http, 'http://localhost:3000/api/workouts');
  }
}
