import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from 'src/app/services/entity.service';
import { IPlan } from 'src/app/types/exercise/plan.model';

@Injectable({
  providedIn: 'root',
})
export class PlanService extends EntityService<IPlan> {
  constructor(http: HttpClient) {
    super(http, 'http://localhost:3000/api/plans');
  }
}
