import { NgFor, NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Route } from 'app/admin-overview/models/route';
import { CapitalizeFirstLetterPipe } from 'app/shared/pipe/capitalize-first-letter/capitalize-first-letter.pipe';
import { RoutePanelService } from 'app/admin-overview/services/route-panel/route-panel.service';
import { RouteDeleteComponent } from '../route-delete/route-delete.component';

@Component({
  selector: 'app-route-item',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    NgFor,
    NgIf,
    CapitalizeFirstLetterPipe,
    RouteDeleteComponent,
  ],
  templateUrl: './route-item.component.html',
  styleUrl: './route-item.component.scss',
})
export class RouteItemComponent {
  @Input() item!: Route;

  @Input() carriagesName!: string[];

  @Input() stationsName!: string[];

  private router: Router = inject(Router);

  private panelService = inject(RoutePanelService);

  readonly dialog = inject(MatDialog);

  public onUpdate() {
    this.panelService.togglePanelAndUpdateRoute('panelRoute', 'edit', this.item);
  }

  public onDelete(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(RouteDeleteComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { id: this.item.id },
    });
  }

  public assignRide() {
    this.router.navigate(['/admin-page/routes', this.item.id]);
  }
}
