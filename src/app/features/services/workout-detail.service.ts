import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Injectable({
  providedIn: 'root',
})
export class WorkoutDetailService extends DataService {
  constructor(http: HttpClient) {
    super(http, 'http://localhost:3000/api/workouts/details');
  }
}
