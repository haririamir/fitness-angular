import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPlan } from 'src/app/types/exercise/plan.model';
import { ExerciseService } from './exercise.service';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  plans: BehaviorSubject<IPlan[]> = new BehaviorSubject<IPlan[]>([]);

  constructor(private exService: ExerciseService) {}

  addPlan(plan: IPlan) {
    this.plans.next([plan]);
  }
}
