import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { IWorkout } from 'src/app/types/exercise/workout.model';
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

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.workoutService.workouts.subscribe((res) => (this.workouts = res));
  }

  ngOnDestroy(): void {
    this.workoutService.workouts.unsubscribe();
  }

  onRowAction(event: { action: string; row: any }) {
    switch (event.action) {
      case 'edit':
        console.log(event.row);
        break;
      case 'delete':
        console.log(event.row);
        break;
      default:
        console.log(event.row);
    }
  }
}
