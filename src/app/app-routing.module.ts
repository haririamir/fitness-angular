import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, PermissionService } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { TrainingListComponent } from './training-list/training-list.component';
import { FormComponent } from './training/form/form.component';
import { TrainingComponent } from './training/training.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [PermissionService],
})
export class AppRoutingModule {}
