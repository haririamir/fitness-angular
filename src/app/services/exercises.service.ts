import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExercisesService extends DataService {
  constructor(http: HttpClient) {
    super(http, 'http://localhost:3000/users');
  }
}
