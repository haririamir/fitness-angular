import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingListComponent } from './training-list/training-list.component';
import { FormComponent } from './training/form/form.component';
import { TrainingComponent } from './training/training.component';
import { LoginComponent } from './core/auth/login/login.component';
import { AuthGuard, PermissionService } from './core/auth/auth.guard';
import { ExerciseComponent } from './features/exercise/exercise.component';
import { PlanRootComponent } from './features/plan-root/plan-root.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: TrainingListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'trainings',
    component: TrainingListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'training/create',
    component: FormComponent,
    canActivate: [AuthGuard],
  },
  { path: 'training', component: TrainingComponent, canActivate: [AuthGuard] },
  { path: 'exercises', component: ExerciseComponent, canActivate: [AuthGuard] },
  { path: 'plans', component: PlanRootComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [PermissionService],
})
export class AppRoutingModule {}
