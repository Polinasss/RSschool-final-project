import { createFeature, createReducer, on } from '@ngrx/store';
import { initialRouteState, RouteState } from './route.state';
import { routeActions } from './route.action';

export const routeFeature = createFeature({
  name: 'route',
  reducer: createReducer<RouteState>(
    initialRouteState,
    on(
      routeActions.loadAllRoutes,
      (state): RouteState => ({
        ...state,
        isLoading: true,
      }),
    ),
    on(
      routeActions.loadAllRoutesSuccess,
      (state, { routes }): RouteState => ({
        ...state,
        routes: [...routes],
        isLoading: false,
      }),
    ),
    on(
      routeActions.loadAllRoutesFailure,
      (state, { error }): RouteState => ({
        ...state,
        error: error.message,
        isLoading: false,
      }),
    ),
    on(
      routeActions.addNewRouteToStore,
      (state, { newRoute }): RouteState => ({
        ...state,
        routes: [newRoute, ...state.routes],
        error: null,
      }),
    ),
    on(
      routeActions.createNewRouteFailure,
      (state, { error }): RouteState => ({
        ...state,
        error: error.message,
        isLoading: false,
      }),
    ),
    on(
      routeActions.updateRouteInStore,
      (state, { updateRoute }): RouteState => ({
        ...state,
        routes: state.routes.map((item) =>
          item.id === updateRoute.id ? { ...item, ...updateRoute } : item,
        ),
        error: null,
      }),
    ),
    on(
      routeActions.updateRouteFailure,
      (state, { error }): RouteState => ({
        ...state,
        error: error.message,
        isLoading: false,
      }),
    ),
    on(
      routeActions.deleteRouteFromStore,
      (state, { id }): RouteState => ({
        ...state,
        routes: state.routes.filter((item) => item.id !== id),
        error: null,
      }),
    ),
    on(
      routeActions.deleteRouteFailure,
      (state, { error }): RouteState => ({
        ...state,
        error: error.message,
        isLoading: false,
      }),
    ),
  ),
});
