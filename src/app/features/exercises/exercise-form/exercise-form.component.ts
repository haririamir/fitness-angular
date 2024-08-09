import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExerciseService } from '../../services/exercise.service';
import { ExerciseCategoryService } from '../../services/exercise-category.service';

@Component({
  selector: 'app-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.css'],
})
export class ExerciseFormComponent implements OnInit {
  myForm = {} as FormGroup;
  isEdit = false as boolean;
  categories = [] as any;

  constructor(
    private fb: FormBuilder,
    private exerciseService: ExerciseService,
    private exersiceCategory: ExerciseCategoryService
  ) {
    this.myForm = this.fb.group({
      exercise_id: null,
      category_id: null,
      name: '',
      description: '',
    });
  }

  ngOnInit(): void {
    this.exersiceCategory.getAll().subscribe((res) => {
      this.categories = res;
    });
  }

  handleSubmit() {
    if (this.isEdit) {
      this.isEdit = true;
      this.exerciseService
        .update(this.myForm.value.exercise_id, {
          name: this.myForm.value.name,
          description: this.myForm.value.description,
          category: this.myForm.value.category,
          category_id: this.myForm.value.category_id,
        })
        .subscribe({
          next: (res) => {
            // this.updateTable();
          },
        });
      return;
    }

    this.exerciseService
      .create({
        name: this.myForm.value.name,
        description: this.myForm.value.description,
        category_id: this.myForm.value.category_id,
      })
      .subscribe({
        next: (res) => {
          this.myForm.reset();
          // this.updateTable();
        },
      });
  }
}
