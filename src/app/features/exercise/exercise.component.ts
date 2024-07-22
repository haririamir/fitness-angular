import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IExersice } from 'src/app/types/exercise/exersice.model';
import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
})
export class ExerciseComponent implements OnInit, OnDestroy {
  constructor(private exerciseService: ExerciseService) {}

  exercises = [] as IExersice[];
  subs: Subscription = new Subscription();

  ngOnInit(): void {
    this.subs = this.exerciseService.exercises.subscribe(
      (exs) => (this.exercises = exs)
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  handleSubmit(formValue: NgForm) {
    this.exerciseService.addExercises([
      ...this.exercises,
      {
        id: Math.round(Math.random()),
        ...formValue.value,
      },
    ]);
    formValue.reset();
  }
}
