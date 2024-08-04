import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Injectable({
  providedIn: 'root',
})
export class ExerciseCategoryService extends DataService {
  constructor(http: HttpClient) {
    super(http, 'http://localhost:3000/api/exercises/categories');
  }
}
