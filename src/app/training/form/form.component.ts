import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IExersice } from '../../types/exercise/exersice.model';
import { TraningsService } from 'src/app/training-list/tranings.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  constructor(private traningsService: TraningsService) {}
  exersices: IExersice[] = [];

  ngOnInit(): void {}
  handleSubmit(formValue: NgForm) {
    this.traningsService.addTrain({
      name: formValue.value.name,
      exercise: this.exersices.find((i) => i.id === formValue.value.exercise)!,
      id: Math.random(),
      set: 1000,
    });
  }
}
