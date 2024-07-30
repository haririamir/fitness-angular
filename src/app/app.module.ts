import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthService } from './core/services/auth.service';
import { FeaturesModule } from './features/features.module';
import { ExerciseService } from './features/services/exercise.service';
import { MaterialExampleModule } from './material.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MaterialExampleModule,
    FeaturesModule,
    HttpClientModule,
    ReactiveFormsModule,
    
  ],
  providers: [AuthService, ExerciseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
