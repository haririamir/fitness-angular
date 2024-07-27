import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IExersice } from 'src/app/types/exercise/exersice.model';
import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
  animations: [
    trigger('list2', [
      state(
        'exit',
        style({
          opacity: 1,
        })
      ),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(
          '.5s',
          keyframes([
            style({ opacity: 0, offset: 0 }),
            style({ opacity: 0.25, offset: 0.2 }),
            style({ opacity: 0.5, offset: 0.3 }),
            style({ opacity: 0.75, offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class ExerciseComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['exercise_id', 'name', 'description', 'category'];

  constructor(private exerciseService: ExerciseService) {}

  exercises = [] as IExersice[];
  subs: Subscription = new Subscription();

  ngOnInit(): void {
    this.subs = this.exerciseService.getAll().subscribe((exs) => {
      this.exercises = exs;
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  handleSubmit(formValue: NgForm) {
    this.exerciseService.create(formValue.value).subscribe({
      next: (res) => {
        this.exercises = [{ ...res }, ...this.exercises];
        formValue.reset();
      },
    });
  }
}
