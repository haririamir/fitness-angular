import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
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
import { IWorkoutDetail } from 'src/app/types/exercise/workout.model';
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
  subs: Subscription = new Subscription();
  displayedColumns: string[] = ['plan_id', 'user', 'workout', 'actions'];
  labels: string[] = ['PlanID', 'User', 'Workout', 'Actions'];
  plans = [] as any[];
  expandedElement = {};

  constructor(
    private planService: PlanService,
    private workoutDetailService: WorkoutDetailService
  ) {}

  ngOnInit(): void {
    this.planService.getAll().subscribe((res) => (this.plans = res));
  }
  ngAfterContentInit(): void {}
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  handleDelete(row: IPlan) {
    this.planService
      .delete(row.plan_id)
      .subscribe((res) =>
        this.plans.filter((item) => item.plan_id !== row.plan_id)
      );
  }
  handleDeleteDetail(id: number) {
    this.workoutDetailService.delete(id).subscribe((res) => {});
  }

  handleEdit(row: IPlan) {}
}
