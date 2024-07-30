import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExerciseService } from '../../services/exercise.service';
import { IExersice } from 'src/app/types/exercise/exersice.model';
import { WorkoutService } from '../../services/workout.service';
import { IWorkout } from 'src/app/types/exercise/workout.model';

@Component({
  selector: 'app-workout-details-form',
  templateUrl: './workout-details-form.component.html',
  styleUrls: ['./workout-details-form.component.css'],
})
export class WorkoutDetailsFormComponent implements OnInit {
  myForm = {} as FormGroup;
  exercises = [] as IExersice[];
  workouts = [] as IWorkout[];
  constructor(
    private fb: FormBuilder,
    private exerciseService: ExerciseService,
    private workoutService: WorkoutService
  ) {}

  ngOnInit(): void {
    this.exerciseService.getAll().subscribe((res) => (this.exercises = res));
    this.workouts = this.workoutService.getData();
  }

  handleSubmit() {}
}
