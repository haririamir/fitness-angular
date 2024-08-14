import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
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
import { ModalComponent } from './components/modal/modal.component';
import { MODAL_DATA } from './components/modal/modal.tokens';  // Import the token

@NgModule({ declarations: [AppComponent, ModalComponent],
    bootstrap: [AppComponent], imports: [CoreModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MaterialExampleModule,
        FeaturesModule,
        ReactiveFormsModule], providers: [AuthService, ExerciseService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
