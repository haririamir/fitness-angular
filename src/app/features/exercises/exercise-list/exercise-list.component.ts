import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../../services/exercise.service';
import { IExersice } from 'src/app/types/exercise/exersice.model';
import { ModalService } from 'src/app/services/modal.service';
import { ExerciseFormComponent } from '../exercise-form/exercise-form.component';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css'],
})
export class ExerciseListComponent implements OnInit {
  labels: string[] = ['Exercise ID', 'Name', 'Category', 'Description'];
  displayedColumns: string[] = [
    'exercise_id',
    'name',
    'category',
    'description',
  ];

  exercises = [] as IExersice[];
  isEdit = false as boolean;

  constructor(
    private exerciseService: ExerciseService,
    private modalService: ModalService
  ) {}

  openExerciseModal(formData: IExersice): void {
    this.modalService.openModal({
      title: 'Exercise',
      component: ExerciseFormComponent,
      componentData: { formData },
    });
  }

  ngOnInit(): void {
    this.exerciseService.exercises.subscribe((res) => {
      this.exercises = res;
    });

    // Fetch users when the component is initialized
    this.exerciseService.fetchExercises();
  }

  onDelete(element: IExersice) {
    this.exerciseService.deleteExercise(element.exercise_id);
  }

  onEditClicked(element: IExersice) {
    this.openExerciseModal(element);
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
