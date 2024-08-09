import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() onChangeMenu = new EventEmitter<boolean>();
  isOpen = false as boolean;
  constructor(private auth: AuthService, private router: Router) {}
  isAuth: boolean = false;

  logout() {
    this.auth.logout();
  }

  createTrain() {
    this.router.navigate(['/exercises']);
  }

  createPlan() {
    this.router.navigate(['/plans']);
  }

  createWorkouts() {
    this.router.navigate(['/workouts']);
  }
  ngOnInit(): void {
    this.auth.authChange.subscribe((statusUser) => (this.isAuth = statusUser));
  }

  onChangeStatus() {
    this.isOpen = !this.isOpen;
    this.onChangeMenu.emit(this.isOpen);
  }
}
