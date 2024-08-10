import { Component, OnInit } from '@angular/core';
import { IWorkoutDetail } from 'src/app/types/exercise/workout.model';
import { WorkoutDetailService } from '../../services/workout-detail.service';

@Component({
  selector: 'app-workout-details-list',
  templateUrl: './workout-details-list.component.html',
  styleUrls: ['./workout-details-list.component.css'],
})
export class WorkoutDetailsListComponent implements OnInit {
  workoutDetails: IWorkoutDetail[] = [];
  constructor(private workoutDetailService: WorkoutDetailService) {}

  ngOnInit(): void {
    this.workoutDetailService.entities$.subscribe((res) => {
      this.workoutDetails = res;
    });
  }
}
