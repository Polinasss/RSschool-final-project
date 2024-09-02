import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { RideFacade } from 'app/admin-overview/_state/ride/ride.facade';

@Component({
  selector: 'app-ride-delete',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatButtonModule,
    NgIf,
  ],
  templateUrl: './ride-delete.component.html',
  styleUrl: './ride-delete.component.scss',
})
export class RideDeleteComponent {
  readonly dialogRef = inject(MatDialogRef<RideDeleteComponent>);

  private rideFacade = inject(RideFacade);

  public data = inject(MAT_DIALOG_DATA);

  public deleteRide() {
    const routeId = Number(this.data.routeId);
    const rideId = Number(this.data.rideId);
    const { status } = this.data;
    if (status === 'ok') {
      this.rideFacade.deleteRide(routeId, rideId);
    }
  }
}
