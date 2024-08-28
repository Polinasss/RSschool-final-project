import { AsyncPipe, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterOutlet } from '@angular/router';
import { RouteFacade } from 'app/admin-overview/_state/route/route.facade';
import { CreateButtonComponent } from 'app/shared/components/create-button/create-button.component';
import { RoutePanelService } from 'app/admin-overview/services/route-panel.service';
import { RouteItemComponent } from '../route-item/route-item.component';
import { RouteFormComponent } from '../route-form/route-form.component';
import { RoutePanelComponent } from '../route-panel/route-panel.component';

@Component({
  selector: 'app-route-list',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatProgressSpinnerModule,
    AsyncPipe,
    RouteItemComponent,
    NgTemplateOutlet,
    RouterOutlet,
    CreateButtonComponent,
    RoutePanelComponent,
    RouteFormComponent,
  ],
  templateUrl: './route-list.component.html',
  styleUrl: './route-list.component.scss',
})
export class RouteListComponent implements OnInit {
  private routeFacade = inject(RouteFacade);

  private panelService = inject(RoutePanelService);

  readonly formState$ = this.panelService.panelState$;

  readonly routes$ = this.routeFacade.routes$;

  readonly error$ = this.routeFacade.error$;

  readonly isLoading$ = this.routeFacade.isLoading$;

  public ngOnInit() {
    this.routeFacade.loadRoutes();
  }

  public openForm() {
    this.panelService.togglePanel('panelRoute', 'create');
  }
}
