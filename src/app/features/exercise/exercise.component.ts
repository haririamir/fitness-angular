import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTable } from '@angular/material/table';
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
      transition('void=>*', [
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
      transition('*=>void', [
        style({ opacity: 1, backgroundColor: 'red' }),
        animate(
          '.5s',
          keyframes([
            style({ opacity: 1, offset: 0 }),
            style({ opacity: 0.75, offset: 0.2 }),
            style({ opacity: 0.5, offset: 0.3 }),
            style({ opacity: 0.25, offset: 0.4 }),
            style({ opacity: 0, offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class ExerciseComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'exercise_id',
    'name',
    'description',
    'category',
    'actions',
  ];
  myForm = {} as FormGroup;

  @ViewChild(MatTable) table = {} as MatTable<IExersice>;

  constructor(
    private exerciseService: ExerciseService,
    private fb: FormBuilder
  ) {}

  exercises = [] as IExersice[];
  exercise = {} as IExersice;
  subs: Subscription = new Subscription();
  isEdit = false as boolean;

  ngOnInit(): void {
    this.myForm = this.fb.group({
      exercise_id: '',
      name: '',
      description: '',
      category: '',
    });
    this.subs = this.exerciseService.getAll().subscribe((exs) => {
      this.exercises = exs;
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onRowClicked(element: IExersice) {
    this.exerciseService.delete(element.exercise_id).subscribe({
      next: (res) => {
        this.exercises = this.exercises.filter(
          (i) => i.exercise_id !== element.exercise_id
        );
      },
    });
  }

  onEditClicked(element: IExersice) {
    this.isEdit = true;
    this.myForm = this.fb.group(element);
  }

  handleSubmit() {
    console.log(this.myForm);

    if (this.isEdit) {
      this.isEdit = true;
      this.exerciseService
        .update(this.myForm.value.exercise_id, {
          name: this.myForm.value.name,
          description: this.myForm.value.description,
          category: this.myForm.value.category,
        })
        .subscribe({
          next: (res) => {
            const idx = this.exercises.findIndex(
              (i) => i.exercise_id === res.exercise_id
            );

            this.exercises[idx] = res;
            this.table.renderRows();
            this.myForm.reset();
          },
        });
      return;
    }

    this.exerciseService
      .create({
        name: this.myForm.value.name,
        description: this.myForm.value.description,
        category: this.myForm.value.category,
      })
      .subscribe({
        next: (res) => {
          this.exercises = [{ ...res }, ...this.exercises];
          this.myForm.reset();
        },
      });
  }
}
