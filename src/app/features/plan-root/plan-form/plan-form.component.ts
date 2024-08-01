import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/types/auth/user.model';
import { IWorkout } from 'src/app/types/exercise/workout.model';
import { PlanService } from '../../services/plan.service';
import { UserService } from '../../services/users.service';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.css'],
})
export class PlanFormComponent implements OnInit {
  workouts = [] as IWorkout[];
  users = [] as User[];

  constructor(
    private workoutServive: WorkoutService,
    private userSerive: UserService,
    private planService: PlanService
  ) {}

  ngOnInit(): void {
    this.workoutServive.getAll().subscribe((res) => (this.workouts = res));
    this.userSerive.getAll().subscribe((res) => (this.users = res));
  }

  handleSubmit(formValue: NgForm) {
    this.planService
      .create(formValue.value)
      .subscribe((res) => console.log(res));
  }
}
