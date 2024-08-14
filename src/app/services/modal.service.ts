import { Injectable } from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'any'
})
export class ModalService {
  constructor(private dialog: MatDialog) {}

  openModal(data: { title: string; component: any; componentData?: any }): void {
    this.dialog.open(ModalComponent, {
      width: '400px',
      data: data
    });
  }
}
