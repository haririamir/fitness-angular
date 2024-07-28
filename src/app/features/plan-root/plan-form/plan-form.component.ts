import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExerciseService } from '../../services/exercise.service';
import { NgForm } from '@angular/forms';
import { PlanService } from '../../services/plan.service';
import { IExersice } from 'src/app/types/exercise/exersice.model';

@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.css'],
})
export class PlanFormComponent implements OnInit {
  exercises = [] as IExersice[];

  constructor(
    private exerciseService: ExerciseService,
    private planService: PlanService
  ) {}

  ngOnInit(): void {
    this.exerciseService.getAll().subscribe((res) => (this.exercises = res));
  }

  handleSubmit(formValue: NgForm) {}
}
