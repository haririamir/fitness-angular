import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IWorkout } from 'src/app/types/exercise/workout.model';
import { WorkoutService } from '../../services/workout.service';
import { ModalService } from 'src/app/services/modal.service';
import { WorkoutFormComponent } from '../workout-form/workout-form.component';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css'],
})
export class WorkoutListComponent implements OnInit, OnDestroy {
  @ViewChild(MatTable) table = {} as MatTable<IWorkout>;
  workouts = [] as IWorkout[];

  displayedColumns: string[] = ['name', 'description'];
  labels: string[] = ['Name', 'Description'];

  constructor(
    private workoutService: WorkoutService,
    private modalService: ModalService
  ) {}

  openWorkoutForm(formData: IWorkout): void {
    this.modalService.openModal({
      title: 'Workout',
      component: WorkoutFormComponent,
      componentData: { formData },
    });
  }

  ngOnInit(): void {
    this.workoutService.entities$.subscribe((res) => (this.workouts = res));
    this.workoutService.fetchEntities();
  }

  ngOnDestroy(): void {}

  async handleDelete(row: IWorkout) {
    this.workoutService.deleteEntity(row.id);
  }

  onRowAction(event: { action: string; row: IWorkout }) {
    switch (event.action) {
      case 'edit':
        this.openWorkoutForm(event.row);
        break;
      case 'delete':
        this.handleDelete(event.row);
        break;
      default:
        console.log(event.row);
    }
  }
}
