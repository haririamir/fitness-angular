import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/types/auth/user.model';
import { IWorkout } from 'src/app/types/exercise/workout.model';

@Injectable({
  providedIn: 'root',
})
export class UserService extends DataService {
  private users = new BehaviorSubject<User[]>([]);
  currentData = this.users.asObservable();

  constructor(http: HttpClient) {
    super(http, 'http://localhost:3000/api/users');
  }

  fetching() {
    this.getAll().subscribe((res) => this.users.next(res));
  }

  changeData(data: User[]) {
    this.users.next(data);
  }

  getData() {
    return this.users.getValue();
  }
}
