import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MODAL_DATA } from 'src/app/components/modal/modal.tokens';
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
    private workoutService: WorkoutService,
    @Inject(MODAL_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group(
      this.data.formData || {
        id: '',
        name: '',
        description: '',
      }
    );
  }

  ngOnDestroy(): void {}

  handleSubmit() {
    if (this.data.formData) {
      this.workoutService.updateEntity(this.myForm.value.id, {
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
