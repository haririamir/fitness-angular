import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}
  isAuth: boolean = false;

  logout() {
    this.auth.logout();
  }

  createTrain() {
    this.router.navigate(['/training/create']);
  }
  ngOnInit(): void {
    this.auth.authChange.subscribe((statusUser) => (this.isAuth = statusUser));
  }
}
