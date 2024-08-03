import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IExersice } from 'src/app/types/exercise/exersice.model';
import { ExerciseService } from '../services/exercise.service';
import { TableComponent } from 'src/app/components/table/table.component';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
})
export class ExerciseComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'exercise_id',
    'name',
    'description',
    'category',
  ];
  myForm = {} as FormGroup;
  exercises = [] as IExersice[];
  exercise = {} as IExersice;
  subs: Subscription = new Subscription();
  isEdit = false as boolean;

  @ViewChild(TableComponent) table!: TableComponent;

  constructor(
    private exerciseService: ExerciseService,
    private fb: FormBuilder
  ) {}

  updateTable() {
    this.table.updateTable();
  }

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

  onDelete(element: IExersice) {
    this.exerciseService.delete(element.exercise_id).subscribe({
      next: (res) => {
        this.exercises = this.exercises.filter(
          (i) => i.exercise_id !== element.exercise_id
        );
        this.updateTable();
      },
    });
  }

  onEditClicked(element: IExersice) {
    this.isEdit = true;
    this.myForm = this.fb.group(element);
  }

  handleSubmit() {
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
            this.myForm.reset();
            this.updateTable();
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

  onRowAction(event: { action: string; row: any }) {
    switch (event.action) {
      case 'edit':
        this.onEditClicked(event.row);
        break;
      case 'delete':
        this.onDelete(event.row);
        break;
      default:
        console.log(event.row);
    }
  }
}
