import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouteFacade } from 'app/admin-overview/_state/route/route.facade';
import { RouteItemComponent } from 'app/admin-overview/components/route-item/route-item.component';

@Component({
  selector: 'app-routes-page',
  standalone: true,
  imports: [NgIf, NgFor, MatProgressSpinnerModule, AsyncPipe, RouteItemComponent],
  templateUrl: './routes-page.component.html',
  styleUrl: './routes-page.component.scss',
})
export class RoutesPageComponent {
  private routeFacade = inject(RouteFacade);

  // private panelService = inject(CarriagesPanelService);

  readonly routes$ = this.routeFacade.routes$;

  readonly error$ = this.routeFacade.error$;

  readonly isLoading$ = this.routeFacade.isLoading$;

  // readonly formState$ = this.panelService.panelState$;

  // public openForm() {
  //   this.panelService.togglePanel('panel', 'create');
  // }
}
