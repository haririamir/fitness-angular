import {
  Component,
  Inject,
  OnInit,
  ComponentRef,
  ViewChild,
  OnDestroy,
  Injector,
} from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { ComponentPortal, CdkPortalOutlet } from '@angular/cdk/portal';
import { MODAL_DATA } from './modal.tokens'; // Import the token

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit, OnDestroy {
  @ViewChild(CdkPortalOutlet, { static: true }) portalOutlet!: CdkPortalOutlet; // Use definite assignment assertion
  componentRef!: ComponentRef<any>;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private injector: Injector
  ) {}

  ngOnInit(): void {
    if (this.data.component) {
      const portal = new ComponentPortal(
        this.data.component,
        null,
        this.createInjector(this.data.componentData)
      );
      this.componentRef = this.portalOutlet.attach(portal);
    }
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  createInjector(data: any): Injector {
    return Injector.create({
      providers: [{ provide: MODAL_DATA, useValue: data }],
      parent: this.injector,
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
