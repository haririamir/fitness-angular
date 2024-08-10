import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from 'src/app/services/entity.service';
import { IExersice } from 'src/app/types/exercise/exersice.model';

@Injectable({
  providedIn: 'root',
})
export class ExerciseCategoryService extends EntityService<IExersice> {
  constructor(http: HttpClient) {
    super(http, 'http://localhost:3000/api/exercises/categories');
  }
}
