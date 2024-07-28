import { Component, OnInit } from '@angular/core';
import { PlanService } from '../../services/plan.service';
import { Subscription } from 'rxjs';
import { IPlan } from 'src/app/types/exercise/plan.model';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class PlanListComponent implements OnInit {
  subs: Subscription = new Subscription();
  displayedColumns: string[] = ['plan_id', 'user', 'workout', 'workoutDetails'];
  plans = [] as any[];
  expandedElement = {};

  constructor(private planService: PlanService) {}

  ngOnInit(): void {
    this.planService.getAll().subscribe((res) => (this.plans = res));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
