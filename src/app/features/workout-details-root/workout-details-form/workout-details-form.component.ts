import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExerciseService } from '../../services/exercise.service';
import { IExersice } from 'src/app/types/exercise/exersice.model';
import { WorkoutService } from '../../services/workout.service';
import { IWorkout } from 'src/app/types/exercise/workout.model';
import { WorkoutDetailService } from '../../services/workout-detail.service';
import { PlanService } from '../../services/plan.service';
import { IPlan } from 'src/app/types/exercise/plan.model';

@Component({
  selector: 'app-workout-details-form',
  templateUrl: './workout-details-form.component.html',
  styleUrls: ['./workout-details-form.component.css'],
})
export class WorkoutDetailsFormComponent implements OnInit {
  myForm = {} as FormGroup;
  exercises = [] as IExersice[];
  plans = [] as IPlan[];
  constructor(
    private fb: FormBuilder,
    private exerciseService: ExerciseService,
    private planService: PlanService,
    private workoutDetailService: WorkoutDetailService
  ) {}
  

  ngOnInit(): void {
    this.myForm = this.fb.group({
      sets: null,
      reps: null,
      base_weight: null,
      plan: {},
      exercise: {},
    });
    this.exerciseService.getAll().subscribe((res) => (this.exercises = res));
    this.planService.getAll().subscribe((data) => (this.plans = data));
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
