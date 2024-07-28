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

@NgModule({
  declarations: [
    ExerciseComponent,
    PlanFormComponent,
    PlanListComponent,
    PlanRootComponent,
    CustomColPipe,
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
  ],
})
export class FeaturesModule {}
