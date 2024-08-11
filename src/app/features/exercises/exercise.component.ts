import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from 'src/app/components/table/table.component';
import { ModalService } from 'src/app/services/modal.service';
import { ExerciseFormComponent } from './exercise-form/exercise-form.component';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
})
export class ExerciseComponent implements OnInit {
  constructor(private modalService: ModalService) {}

  openExerciseModal(): void {
    this.modalService.openModal({
      title: 'Exercise',
      component: ExerciseFormComponent,
      componentData: { message: 'Hello from AppComponent!' },
    });
  }

  ngOnInit(): void {}
}
