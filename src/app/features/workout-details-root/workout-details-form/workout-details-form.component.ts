import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExerciseService } from '../../services/exercise.service';
import { IExersice } from 'src/app/types/exercise/exersice.model';
import { WorkoutService } from '../../services/workout.service';
import { IWorkout } from 'src/app/types/exercise/workout.model';
import { WorkoutDetailService } from '../../services/workout-detail.service';

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
    private workoutService: WorkoutService,
    private workoutDetailService: WorkoutDetailService
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      exercise_id: '',
      sets: 0,
      reps: 0,
      base_weight: 0,
      workout_id: '',
      workout: {},
      exercise: {},
    });
    this.exerciseService.getAll().subscribe((res) => (this.exercises = res));
    this.workoutService.currentData.subscribe((data) => (this.workouts = data));
  }

  handleSubmit() {
    this.workoutDetailService
      .create({
        ...this.myForm.value,
        base_weight: parseFloat(this.myForm.value.base_weight),
      })
      .subscribe((res) => console.log(res));
  }
}
