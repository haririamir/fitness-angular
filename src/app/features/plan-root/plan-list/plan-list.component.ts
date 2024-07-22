import { Component, OnInit } from '@angular/core';
import { PlanService } from '../../services/plan.service';
import { Subscription } from 'rxjs';
import { IPlan } from 'src/app/types/exercise/plan.model';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.css'],
})
export class PlanListComponent implements OnInit {
  subs: Subscription = new Subscription();
  plans = [] as IPlan[];

  constructor(private planService: PlanService) {}

  ngOnInit(): void {
    this.subs = this.planService.plans.subscribe((exs) => (this.plans = exs));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
