import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface ListMenu {
  id: number;
  name: string;
  link: string;
  icon: string;
}
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  listMenu: ListMenu[] = [
    {
      id: 1,
      name: 'Exercises',
      link: '/exercises',
      icon: 'fitness_center',
    },
    {
      id: 2,
      name: 'Plans',
      link: '/plans',
      icon: 'fitness_center',
    },
    {
      id: 3,
      name: 'Workouts',
      link: '/workouts',
      icon: 'fitness_center',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}
}
