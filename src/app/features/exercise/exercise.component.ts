import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ExerciseService } from '../services/exercise.service';
import { IExersice } from 'src/app/types/exercise/exersice.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
})
export class ExerciseComponent implements OnInit {
  constructor(private exerciseService: ExerciseService) {}
  exercises = [] as IExersice[];

  ngOnInit(): void {
    this.exerciseService.exercises.subscribe((exs) => (this.exercises = exs));
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
