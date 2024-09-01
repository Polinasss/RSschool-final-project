import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ServerError } from 'app/shared/models/error';
import { Trip } from '../models/trip';
import { SearchParams } from '../services/search.service';

export const searchActions = createActionGroup({
  source: 'SEARCH',
  events: {
    loadTrip: props<{ params: SearchParams }>(),
    loadTripSuccess: props<{ trip: Trip }>(),
    loadTripFailure: props<{ error: ServerError }>(),
    getRoutes: emptyProps(),
    getAvailableDates: emptyProps(),
    getRoutesByStartTime: props<{ date: Date }>(),
  },
});