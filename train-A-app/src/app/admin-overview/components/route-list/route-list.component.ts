import { AsyncPipe, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterOutlet } from '@angular/router';
import { RouteFacade } from 'app/admin-overview/_state/route/route.facade';
import { CreateButtonComponent } from 'app/shared/components/create-button/create-button.component';
import { RoutePanelService } from 'app/admin-overview/services/route-panel.service';
import { combineLatest, map, Observable } from 'rxjs';
import { CarriageFacade } from 'app/admin-overview/_state/carriage/carriage.facade';
import { Route } from 'app/admin-overview/models/route';
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

  private carriageFacade = inject(CarriageFacade);

  private panelService = inject(RoutePanelService);

  readonly formState$ = this.panelService.panelState$;

  readonly carriages$ = this.carriageFacade.carriage$;

  readonly routes$ = this.routeFacade.routes$;

  readonly error$ = this.routeFacade.error$;

  readonly isLoading$ = this.routeFacade.isLoading$;

  public routesWithStationsAndCarriages$!: Observable<{ route: Route; carriageName: string[] }[]>;

  public ngOnInit() {
    this.routeFacade.loadRoutes();
    this.routesWithStationsAndCarriages$ = combineLatest([this.routes$, this.carriages$]).pipe(
      map(([routes, carriages]) => {
        return routes.map((route) => {
          const routeCarriageCodes = route.carriages.map((carriage) => carriage);
          const carriageName = carriages
            .filter((carriage) => routeCarriageCodes.includes(carriage.code))
            .map((carriage) => carriage.name);

          return { route, carriageName };
        });
      }),
    );
  }

  public openForm() {
    this.panelService.togglePanel('panelRoute', 'create');
  }
}
