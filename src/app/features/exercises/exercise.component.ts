import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TableComponent } from 'src/app/components/table/table.component';
import { IExersice } from 'src/app/types/exercise/exersice.model';
import { ExerciseCategoryService } from '../services/exercise-category.service';
import { ExerciseService } from '../services/exercise.service';
import { ModalService } from 'src/app/services/modal.service';
import { ExerciseFormComponent } from './exercise-form/exercise-form.component';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
})
export class ExerciseComponent implements OnInit {
  @ViewChild(TableComponent) table!: TableComponent;

  constructor(private modalService: ModalService) {}

  openExerciseModal(): void {
    this.modalService.openModal({
      title: 'Exercise',
      component: ExerciseFormComponent,
      componentData: { message: 'Hello from AppComponent!' },
    });
  }

  updateTable() {
    this.table.updateTable();
  }

  ngOnInit(): void {}
}
