import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { User } from 'src/app/types/auth/user.model';
import { IWorkout } from 'src/app/types/exercise/workout.model';
import { PlanService } from '../../services/plan.service';
import { UserService } from '../../services/users.service';
import { WorkoutService } from '../../services/workout.service';
import { MODAL_DATA } from 'src/app/components/modal/modal.tokens';

@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.css'],
})
export class PlanFormComponent implements OnInit {
  workouts = [] as IWorkout[];
  users = [] as User[];
  myForm = {} as FormGroup;

  constructor(
    private fb: FormBuilder,
    private workoutServive: WorkoutService,
    private userSerive: UserService,
    private planService: PlanService,
    @Inject(MODAL_DATA) public data: any
  ) {
    this.myForm = this.fb.group(
      this.data.formData || {
        user_id: null,
        workout_id: null,
        start_date: '',
        end_date: '',
      }
    );
  }

  ngOnInit(): void {
    this.workoutServive.entities$.subscribe((res) => (this.workouts = res));
    this.userSerive.entities$.subscribe((res) => (this.users = res));

    this.userSerive.fetchEntities();
    this.workoutServive.fetchEntities();
  }

  handleSubmit() {
    if (this.data.formData) {
      this.planService.updateEntity(this.data.formData.id, this.myForm.value);
      this.myForm.reset();
      return;
    }
    this.planService.addEntity(this.myForm.value);
    this.myForm.reset();
  }
}
