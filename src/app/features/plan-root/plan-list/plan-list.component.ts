import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { IPlan } from 'src/app/types/exercise/plan.model';
import { PlanService } from '../../services/plan.service';
import { WorkoutDetailService } from '../../services/workout-detail.service';
import { PlanFormComponent } from '../plan-form/plan-form.component';

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
  displayedColumns: string[] = ['id', 'user', 'workout', 'actions'];
  labels: string[] = ['PlanID', 'User', 'Workout', 'Actions'];
  plans = [] as any[];
  expandedElement = {};

  constructor(
    private planService: PlanService,
    private workoutDetailService: WorkoutDetailService,
    private modalService: ModalService
  ) {}

  openPlanModal(formData: IPlan): void {
    this.modalService.openModal({
      title: 'Exercise',
      component: PlanFormComponent,
      componentData: { formData },
    });
  }

  ngOnInit(): void {
    this.planService.entities$.subscribe((res) => (this.plans = res));
    this.planService.fetchEntities();
  }

  handleDelete(row: IPlan) {
    this.planService.deleteEntity(row.id);
  }

  handleDeleteDetail(id: number) {
    this.workoutDetailService.deleteEntity(id);
  }

  handleEdit(row: IPlan) {
    this.openPlanModal(row);
  }
}
