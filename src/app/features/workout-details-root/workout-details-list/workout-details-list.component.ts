import { Component, OnInit } from '@angular/core';
import { WorkoutDetailService } from '../../services/workout-detail.service';

@Component({
  selector: 'app-workout-details-list',
  templateUrl: './workout-details-list.component.html',
  styleUrls: ['./workout-details-list.component.css'],
})
export class WorkoutDetailsListComponent implements OnInit {
  constructor(private workoutDetailService: WorkoutDetailService) {}

  ngOnInit(): void {
    this.workoutDetailService.getAll().subscribe((res) => {
      console.log(res);
    });
  }
}
