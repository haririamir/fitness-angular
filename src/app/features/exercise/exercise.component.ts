import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IExersice } from 'src/app/types/exercise/exersice.model';
import { ExerciseService } from '../services/exercise.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
  animations: [
    trigger('list1', [
      state(
        'enter',
        style({
          transform: 'translateX(0)',
        })
      ),
      transition('void=> *', [
        style({
          transform: 'translateX(-100px)',
        }),
        animate(500),
      ]),
    ]),
    trigger('list2', [
      state(
        'exit',
        style({
          transform: 'translateX(0)',
        })
      ),
      transition('* <=> void', [
        style({
          transform: 'translateX(-100px)',
        }),
        animate(500),
      ]),
    ]),
  ],
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
