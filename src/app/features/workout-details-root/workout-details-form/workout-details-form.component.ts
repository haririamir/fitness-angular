import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IExersice } from 'src/app/types/exercise/exersice.model';
import { IPlan } from 'src/app/types/exercise/plan.model';
import { ExerciseService } from '../../services/exercise.service';
import { PlanService } from '../../services/plan.service';
import { WorkoutDetailService } from '../../services/workout-detail.service';

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
      plan_id: null,
      exercise_id: null,
    });

    this.exerciseService.entities$.subscribe((res) => (this.exercises = res));
    this.planService.entities$.subscribe((data) => (this.plans = data));

    this.exerciseService.fetchEntities();
    this.planService.fetchEntities();
  }

  handleSubmit() {
    this.workoutDetailService.addEntity({
      ...this.myForm.value,
      base_weight: parseFloat(this.myForm.value.base_weight),
    });
    this.myForm.reset();
  }
}
