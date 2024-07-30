import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseComponent } from './exercise/exercise.component';
import { MaterialExampleModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlanFormComponent } from './plan-root/plan-form/plan-form.component';
import { PlanListComponent } from './plan-root/plan-list/plan-list.component';
import { ExerciseService } from './services/exercise.service';
import { PlanService } from './services/plan.service';
import { PlanRootComponent } from './plan-root/plan-root.component';
import { CustomColPipe } from '../custom-col.pipe';
import { WorkoutRootComponent } from './workout-root/workout-root.component';
import { TableComponent } from '../components/table/table.component';
import { WorkoutListComponent } from './workout-root/workout-list/workout-list.component';
import { WorkoutFormComponent } from './workout-root/workout-form/workout-form.component';
import { WorkoutDetailsRootComponent } from './workout-details-root/workout-details-root.component';
import { WorkoutDetailsListComponent } from './workout-details-root/workout-details-list/workout-details-list.component';
import { WorkoutDetailsFormComponent } from './workout-details-root/workout-details-form/workout-details-form.component';

@NgModule({
  declarations: [
    ExerciseComponent,
    PlanFormComponent,
    PlanListComponent,
    PlanRootComponent,
    WorkoutRootComponent,
    WorkoutListComponent,
    WorkoutFormComponent,
    TableComponent,
    CustomColPipe,
    WorkoutDetailsRootComponent,
    WorkoutDetailsListComponent,
    WorkoutDetailsFormComponent,
  ],
  providers: [ExerciseService, PlanService],
  imports: [
    CommonModule,
    MaterialExampleModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ExerciseComponent,
    PlanFormComponent,
    PlanListComponent,
    PlanRootComponent,
    WorkoutRootComponent,
  ],
})
export class FeaturesModule {}
