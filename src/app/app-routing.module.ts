import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, PermissionService } from './core/auth/auth.guard';
import { LoginComponent } from './core/auth/login/login.component';
import { ExerciseComponent } from './features/exercises/exercise.component';
import { PlanRootComponent } from './features/plan-root/plan-root.component';
import { WorkoutRootComponent } from './features/workout-root/workout-root.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: '', component: ExerciseComponent, canActivate: [AuthGuard] },
  {
    path: 'workouts',
    component: WorkoutRootComponent,
    canActivate: [AuthGuard],
  },
  { path: 'exercises', component: ExerciseComponent, canActivate: [AuthGuard] },
  { path: 'plans', component: PlanRootComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [PermissionService],
})
export class AppRoutingModule {}
