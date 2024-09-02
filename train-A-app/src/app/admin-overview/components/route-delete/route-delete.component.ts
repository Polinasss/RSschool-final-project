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
import { RouteFacade } from 'app/admin-overview/_state/route/route.facade';

@Component({
  selector: 'app-route-delete',
  standalone: true,
  imports: [MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatButtonModule],
  templateUrl: './route-delete.component.html',
  styleUrl: './route-delete.component.scss',
})
export class RouteDeleteComponent {
  readonly dialogRef = inject(MatDialogRef<RouteDeleteComponent>);

  private routeFacade = inject(RouteFacade);

  private data = inject(MAT_DIALOG_DATA);

  public deleteRoute() {
    const routeId = this.data.id;
    this.routeFacade.deleteRoute(routeId);
  }
}
