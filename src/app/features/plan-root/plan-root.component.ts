import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { PlanFormComponent } from './plan-form/plan-form.component';

@Component({
  selector: 'app-plan-root',
  templateUrl: './plan-root.component.html',
  styleUrls: ['./plan-root.component.css'],
})
export class PlanRootComponent implements OnInit {
  constructor(private modalService: ModalService) {}

  openPlanModal(): void {
    this.modalService.openModal({
      title: 'Plan',
      component: PlanFormComponent,
      componentData: {},
    });
  }
  ngOnInit(): void {}
}
