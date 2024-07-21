import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseComponent } from './exercise/exercise.component';
import { MaterialExampleModule } from '../material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ExerciseComponent],
  imports: [CommonModule, MaterialExampleModule, FormsModule],
  exports: [ExerciseComponent],
})
export class FeaturesModule {}
