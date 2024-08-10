import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css'],
})
export class WorkoutFormComponent implements OnInit, OnDestroy {
  myForm = {} as FormGroup;
  isEdit = false as boolean;
  constructor(
    private fb: FormBuilder,
    private workoutService: WorkoutService
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      workout_id: '',
      name: '',
      description: '',
    });
  }

  ngOnDestroy(): void {}

  handleSubmit() {
    if (this.isEdit) {
      this.isEdit = true;
      this.workoutService.updateEntity(this.myForm.value.exercise_id, {
        name: this.myForm.value.name,
        description: this.myForm.value.description,
      });
      this.myForm.reset();

      return;
    }

    this.workoutService.addEntity({
      name: this.myForm.value.name,
      description: this.myForm.value.description,
    });
    this.myForm.reset();
  }
}
