import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { IWorkout } from 'src/app/types/exercise/workout.model';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css'],
})
export class WorkoutListComponent implements OnInit, OnDestroy {
  @ViewChild(MatTable) table = {} as MatTable<IWorkout>;
  workouts = [] as IWorkout[];

  displayedColumns: string[] = ['name', 'description'];

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.workoutService.fetching();
    this.workoutService.currentData.subscribe((data) => (this.workouts = data));
  }

  ngOnDestroy(): void {}

  async handleDelete(row: IWorkout) {
    await this.workoutService
      .delete(row.workout_id)
      .subscribe((e) =>
        this.workoutService.changeData(
          this.workouts.filter((i) => i.workout_id !== row.workout_id)
        )
      );
  }

  onRowAction(event: { action: string; row: IWorkout }) {
    switch (event.action) {
      case 'edit':
        // this.workoutService.deleteItem(event.row.workout_id);
        break;
      case 'delete':
        this.handleDelete(event.row);
        break;
      default:
        console.log(event.row);
    }
  }
}
