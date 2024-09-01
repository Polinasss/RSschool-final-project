import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Route } from 'app/admin-overview/models/route';
import { RouteState } from './route.state';
import { routeFeature } from './route.reducer';
import { routeActions } from './route.action';

@Injectable({ providedIn: 'root' })
export class RouteFacade {
  private readonly store = inject<Store<RouteState>>(Store);

  readonly routes$ = this.store.select(routeFeature.selectRoutes);

  readonly error$ = this.store.select(routeFeature.selectError);

  readonly isLoading$ = this.store.select(routeFeature.selectIsLoading);

  loadRoutes() {
    this.store.dispatch(routeActions.loadAllRoutes());
  }

  addRoute(newRoute: Omit<Route, 'id'>) {
    this.store.dispatch(routeActions.createNewRoute({ route: newRoute }));
  }

  updateRoute(updateRoute: Route) {
    this.store.dispatch(routeActions.updateRoute({ route: updateRoute }));
  }

  deleteRoute(id: number) {
    this.store.dispatch(routeActions.deleteRoute({ id }));
  }
}
