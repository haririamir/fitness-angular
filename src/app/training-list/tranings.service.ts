import { Injectable } from '@angular/core';
import { IPlan } 
from '../types/exercise/plan.model';

@Injectable({
  providedIn: 'root',
})
export class TraningsService {
  trainigs = [] as IPlan[];

  constructor() {}

  addTrain(train:IPlan){
    this.trainigs.push(train)
  }
  getTrainings(){
    return this.trainigs
  }
}
