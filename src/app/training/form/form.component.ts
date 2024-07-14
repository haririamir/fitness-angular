import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exersice } from './exersice.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  constructor() {}
  exersices: Exersice[] = [
    { name: 'Crunch', id: 1, delay: 1000 },
    { name: 'Scott', id: 2, delay: 2000 },
    { name: 'Long', id: 1, delay: 3000 },
  ];
  
  ngOnInit(): void {}
  handleSubmit(formValue: NgForm) {
    console.log(formValue);
  }
}
