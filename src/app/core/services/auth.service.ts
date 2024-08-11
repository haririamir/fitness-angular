import { Injectable } from '@angular/core';
import { AuthModel } from '../../types/auth/auth.model';
import { User } from '../../types/auth/user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User | null = null;
  authChange = new Subject<boolean>();

  constructor(private route: Router) {}

  login(auth: AuthModel) {
    this.user = {
      email: auth.username,
      password: auth.username,
      name: auth.username,
      username: auth.username,
      id: Math.round(Math.random() * 1000).toString(),
    };
    this.authChange.next(true);
    this.route.navigate(['/']);
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.route.navigate(['/login']);
  }

  getUser() {
    return this.user;
  }
  isAuth() {
    return this.user?.id != null;
  }
}
