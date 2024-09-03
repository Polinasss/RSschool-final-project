import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { RouteService } from 'app/admin-overview/services/route/route.service';
import { Route } from 'app/admin-overview/models/route';
import { NotificationService } from 'app/core/services/notification/notification.service';
import { routeActions } from './route.action';

@Injectable()
export class RoutesEffects {
  private readonly actions$ = inject(Actions);

  private readonly routeService = inject(RouteService);

  private readonly notificationService = inject(NotificationService);

  getRoutesList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routeActions.loadAllRoutes),
      exhaustMap(() =>
        this.routeService.loadRoutes().pipe(
          map((routes: Route[]) => routeActions.loadAllRoutesSuccess({ routes })),
          catchError((error) => of(routeActions.loadAllRoutesFailure({ error }))),
        ),
      ),
    );
  });

  createItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routeActions.createNewRoute),
      switchMap((action) =>
        this.routeService.addRoute(action.route).pipe(
          tap(() => this.notificationService.openSuccessSnackBar('Route successfully added!')),
          map((response) =>
            routeActions.createNewRouteSuccess({
              id: response.id,
              route: action.route,
            }),
          ),
          catchError((error) => of(routeActions.createNewRouteFailure({ error }))),
        ),
      ),
    );
  });

  addItemToStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routeActions.createNewRouteSuccess),
      switchMap((action) => {
        const newItem: Route = { ...action.route, id: action.id };
        return of(routeActions.addNewRouteToStore({ newRoute: newItem }));
      }),
    );
  });

  updateItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routeActions.updateRoute),
      mergeMap((action) =>
        this.routeService.updateRoute(action.route).pipe(
          tap(() => this.notificationService.openSuccessSnackBar('Route successfully updated!')),
          map(() =>
            routeActions.updateRouteSuccess({
              route: action.route,
            }),
          ),
          catchError((error) => of(routeActions.updateRouteFailure({ error }))),
        ),
      ),
    );
  });

  updateItemInStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routeActions.updateRouteSuccess),
      mergeMap((action) => {
        return of(routeActions.updateRouteInStore({ updateRoute: action.route }));
      }),
    );
  });

  deleteItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routeActions.deleteRoute),
      mergeMap((action) =>
        this.routeService.deleteRoute(action.id).pipe(
          tap(() => this.notificationService.openSuccessSnackBar('Route successfully removed!')),
          map(() =>
            routeActions.deleteRouteSuccess({
              id: action.id,
            }),
          ),
          catchError((error) => of(routeActions.deleteRouteFailure({ error }))),
        ),
      ),
    );
  });

  deleteItemFromStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routeActions.deleteRouteSuccess),
      mergeMap((action) => {
        return of(routeActions.deleteRouteFromStore({ id: action.id }));
      }),
    );
  });
}
