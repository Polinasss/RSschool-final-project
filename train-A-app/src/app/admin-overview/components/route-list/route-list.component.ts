import { AsyncPipe, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterOutlet } from '@angular/router';
import { RouteFacade } from 'app/admin-overview/_state/route/route.facade';
import { CreateButtonComponent } from 'app/shared/components/create-button/create-button.component';
import { combineLatest, map, Observable } from 'rxjs';
import { CarriageFacade } from 'app/admin-overview/_state/carriage/carriage.facade';
import { Route } from 'app/admin-overview/models/route';
import { StationFacade } from 'app/admin-overview/_state/station/station.facade';
import { RoutePanelService } from 'app/admin-overview/services/route-panel/route-panel.service';
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

  private stationFacade = inject(StationFacade);

  private panelService = inject(RoutePanelService);

  readonly formState$ = this.panelService.panelState$;

  readonly carriages$ = this.carriageFacade.carriage$;

  readonly routes$ = this.routeFacade.routes$;

  readonly stations$ = this.stationFacade.station$;

  readonly error$ = this.routeFacade.error$;

  readonly isLoading$ = this.routeFacade.isLoading$;

  public routesWithStationsAndCarriages$!: Observable<
    { route: Route; carriageName: string[]; stationName: string[] }[]
  >;

  public ngOnInit() {
    this.routeFacade.loadRoutes();
    this.routesWithStationsAndCarriages$ = combineLatest([
      this.routes$,
      this.carriages$,
      this.stations$,
    ]).pipe(
      map(([routes, carriages, stations]) => {
        return routes.map((route) => {
          const carriageName: string[] = [];
          const stationName: string[] = [];
          route.carriages.forEach((item) => {
            const carriageType = carriages.find((carriage) => carriage.code === item);
            if (carriageType) carriageName.push(carriageType?.name);
          });
          route.path.forEach((item) => {
            const cityName = stations.find((city) => city.id === item);
            if (cityName) stationName.push(cityName?.city);
          });

          return { route, carriageName, stationName };
        });
      }),
    );
  }

  public openForm() {
    this.panelService.togglePanel('panelRoute', 'create');
  }
}
