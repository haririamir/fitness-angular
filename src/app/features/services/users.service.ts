import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EntityService } from 'src/app/services/entity.service';
import { User } from 'src/app/types/auth/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService extends EntityService<User> {
  private users = new BehaviorSubject<User[]>([]);
  currentData = this.users.asObservable();

  constructor(http: HttpClient) {
    super(http, 'http://localhost:3000/api/users');
  }
}
