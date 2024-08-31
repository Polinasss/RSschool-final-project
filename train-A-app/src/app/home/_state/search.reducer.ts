import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { TripState, initialTripState } from './search.state';
import { searchActions } from './search.action';
import { Route, Schedule } from '../models/trip';

export const searchFeature = createFeature({
  name: 'search',
  reducer: createReducer<TripState>(
    initialTripState,
    on(
      searchActions.loadTrip,
      (state): TripState => ({
        ...state,
        isLoading: true,
      }),
    ),
    on(
      searchActions.loadTripSuccess,
      (state, { trip }): TripState => ({
        ...state,
        trip: { ...trip },
        isLoading: false,
      }),
    ),
    on(
      searchActions.loadTripFailure,
      (state, { error }): TripState => ({
        ...state,
        error: error.message,
        isLoading: false,
      }),
    ),
  ),
  extraSelectors: ({ selectTrip }) => {
    const selectRoutes = createSelector(selectTrip, (trip) => trip.routes);
    const selectRoutesByStartDay = (date: Date) =>
      createSelector(selectTrip, (trip) => {
        const routes: Route[] = [];
        trip.routes.forEach((route) => {
          const schedules: Schedule[] = [];
          let stationNumber = -1;
          if (trip.from?.stationId) {
            stationNumber = route.path.indexOf(trip.from?.stationId);
            if (stationNumber && stationNumber > 0) {
              route.schedule.forEach((sc) => {
                if (
                  new Date(sc.segments[stationNumber].time[0]).setHours(0, 0, 0, 0) ===
                  date.setHours(0, 0, 0, 0)
                ) {
                  const segm = new Date(sc.segments[stationNumber].time[0]).setHours(0, 0, 0, 0);
                  const d = date.setHours(0, 0, 0, 0);
                  console.log(
                    `routeId ${route.id} rideId: ${sc.rideId} stationNumber: ${stationNumber}`,
                  );

                  console.log(`segm: ${segm}  ${new Date(segm).toISOString()} `);
                  console.log(`date: ${d}  ${new Date(d).toISOString()} `);
                  routes.push({ ...route, schedule: [...schedules, sc] });
                }
              });
            }
          }
        });
        console.log({ routes });

        return routes;
      });
    return { selectRoutes, selectRoutesByStartDay };
  },
});
