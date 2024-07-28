import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPlan } from 'src/app/types/exercise/plan.model';
import { ExerciseService } from './exercise.service';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';

@Injectable({
  providedIn: 'root',
})
export class PlanService extends DataService {
  plans: BehaviorSubject<IPlan[]> = new BehaviorSubject<IPlan[]>([]);

  constructor(http: HttpClient) {
    super(http, 'http://localhost:3000/api/plans');
  }
}
