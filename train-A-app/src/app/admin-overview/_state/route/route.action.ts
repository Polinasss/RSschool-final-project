import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Route } from 'app/admin-overview/models/route';
import { ServerError } from '../../../shared/models/error';

export const routeActions = createActionGroup({
  source: 'ROUTE',
  events: {
    loadAllRoutes: emptyProps(),
    loadAllRoutesSuccess: props<{ routes: Route[] }>(),
    loadAllRoutesFailure: props<{ error: ServerError }>(),
    createNewRoute: props<{ route: Omit<Route, 'id'> }>(),
    createNewRouteSuccess: props<{ id: number; route: Omit<Route, 'id'> }>(),
    createNewRouteFailure: props<{ error: ServerError }>(),
    addNewRouteToStore: props<{ newRoute: Route }>(),
    updateRoute: props<{ route: Route }>(),
    updateRouteSuccess: props<{ route: Route }>(),
    updateRouteFailure: props<{ error: ServerError }>(),
    updateRouteInStore: props<{ updateRoute: Route }>(),
    deleteRoute: props<{ id: number }>(),
    deleteRouteSuccess: props<{ id: number }>(),
    deleteRouteFailure: props<{ error: ServerError }>(),
    deleteRouteFromStore: props<{ id: number }>(),
  },
});
