import { createActionGroup, props } from '@ngrx/store';
import { ServerError } from 'app/shared/models/error';
import { Trip } from '../models/trip';

export const searchActions = createActionGroup({
  source: 'SEARCH',
  events: {
    loadTrip: props<{ [param: string]: number | string }>(),
    loadTripSuccess: props<{ trip: Trip }>(),
    loadTripFailure: props<{ error: ServerError }>(),
  },
});
