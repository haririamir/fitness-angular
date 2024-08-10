import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AfterContentInit, Component, OnInit } from '@angular/core';
import { IPlan } from 'src/app/types/exercise/plan.model';
import { PlanService } from '../../services/plan.service';
import { WorkoutDetailService } from '../../services/workout-detail.service';

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
export class PlanListComponent implements OnInit, AfterContentInit {
  displayedColumns: string[] = ['plan_id', 'user', 'workout', 'actions'];
  labels: string[] = ['PlanID', 'User', 'Workout', 'Actions'];
  plans = [] as any[];
  expandedElement = {};

  constructor(
    private planService: PlanService,
    private workoutDetailService: WorkoutDetailService
  ) {}

  ngOnInit(): void {
    this.planService.entities$.subscribe((res) => (this.plans = res));
    this.planService.fetchEntities();
  }

  ngAfterContentInit(): void {}

  ngOnDestroy(): void {}

  handleDelete(row: IPlan) {
    this.planService.deleteEntity(row.plan_id);
  }

  handleDeleteDetail(id: number) {
    this.workoutDetailService.deleteEntity(id);
  }

  handleEdit(row: IPlan) {}
}
