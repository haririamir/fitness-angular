import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExerciseService } from '../../services/exercise.service';
import { NgForm } from '@angular/forms';
import { PlanService } from '../../services/plan.service';

@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.css'],
})
export class PlanFormComponent implements OnInit, OnDestroy {
  exercises: any;
  private dataSubscription: Subscription = new Subscription();

  constructor(
    private exerciseService: ExerciseService,
    private planService: PlanService
  ) {}

  ngOnInit(): void {
    this.dataSubscription = this.exerciseService.exercises.subscribe(
      (data) => (this.exercises = data)
    );
  }
  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  handleSubmit(formValue: NgForm) {
    this.planService.addPlan(formValue.value);
  }
}
