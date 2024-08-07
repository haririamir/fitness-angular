import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { WorkoutDetailsFormComponent } from '../workout-details-root/workout-details-form/workout-details-form.component';
import { WorkoutFormComponent } from './workout-form/workout-form.component';

@Component({
  selector: 'app-workout-root',
  templateUrl: './workout-root.component.html',
  styleUrls: ['./workout-root.component.css'],
})
export class WorkoutRootComponent implements OnInit {
  constructor(private modalService: ModalService) {}
  openWorkoutDetailForm(): void {
    this.modalService.openModal({
      title: 'Workout Detail',
      component: WorkoutDetailsFormComponent,
      componentData: { message: 'Hello from AppComponent!' }
    });
  }
  openWorkoutForm(): void {
    this.modalService.openModal({
      title: 'Workout',
      component: WorkoutFormComponent,
      componentData: { message: 'Hello from AppComponent!' }
    });
  }
  ngOnInit(): void {}
}
