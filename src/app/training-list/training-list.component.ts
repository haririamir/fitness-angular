import { Component, OnInit } from '@angular/core';
import { TraningsService } from './tranings.service';
import { IPlan } from '../types/exercise/plan.model';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.css']
})
export class TrainingListComponent implements OnInit {

  trainings = [] as IPlan[];
  constructor(private trainingsService: TraningsService) {}

  ngOnInit(): void {
    this.trainings=this.trainingsService.getTrainings()
  }
}
