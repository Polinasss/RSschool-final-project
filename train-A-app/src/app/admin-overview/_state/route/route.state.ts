import { Route } from 'app/admin-overview/models/route';

export type RouteState = {
  routes: Route[];
  isLoading: boolean;
  error: string | null;
};

export const initialRouteState: RouteState = {
  routes: [],
  isLoading: false,
  error: null,
};
