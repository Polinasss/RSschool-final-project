import { createFeature, createReducer, on } from '@ngrx/store';
import { TripState, initialTripState } from './search.state';
import { searchActions } from './search.action';

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
});
