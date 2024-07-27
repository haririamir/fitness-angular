import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authUser: AuthService, private route: Router) {}

  handleSubmit(formValue: NgForm) {
    this.authUser.login(formValue.value);
  }

  ngOnInit(): void {
    this.authUser.authChange.subscribe((statusAuth) => {
      if (statusAuth) {
        this.route.navigate(['/']);
      }
    });
  }
}
