import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MaterialExampleModule } from './material.module';
import { TrainingListComponent } from './training-list/training-list.component';
import { FormComponent } from './training/form/form.component';
import { TrainingComponent } from './training/training.component';
import { AuthService } from './core/services/auth.service';
import { FeaturesModule } from './features/features.module';

@NgModule({
  declarations: [
    AppComponent,
    TrainingListComponent,
    TrainingComponent,
    FormComponent,
  ],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MaterialExampleModule,
    FeaturesModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
