import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../../services/exercise.service';
import { IExersice } from 'src/app/types/exercise/exersice.model';

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

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.exerciseService.getAll().subscribe((exs) => {
      this.exercises = exs;
    });
  }

  onDelete(element: IExersice) {
    this.exerciseService.delete(element.exercise_id).subscribe({
      next: (res) => {
        this.exercises = this.exercises.filter(
          (i) => i.exercise_id !== element.exercise_id
        );
      },
    });
  }

  onEditClicked(element: any) {
    this.isEdit = true;
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
