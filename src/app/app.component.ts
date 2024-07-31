import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'fitness-angular';
  users: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // this.http.get<any[]>('http://localhost:3000/users').subscribe((data) => {
    //   this.users = data;
    // });
  }
}
