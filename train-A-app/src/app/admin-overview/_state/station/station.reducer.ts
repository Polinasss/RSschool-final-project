import { createFeature, createReducer, on } from '@ngrx/store';
import { initialStationState, StationState } from './station.state';
import { stationActions } from './station.action';

export const stationFeature = createFeature({
  name: 'station',
  reducer: createReducer<StationState>(
    initialStationState,
    on(
      stationActions.loadAllStation,
      (state): StationState => ({
        ...state,
        isLoading: true,
      }),
    ),
    on(
      stationActions.loadAllStationSuccess,
      (state, { station }): StationState => ({
        ...state,
        station: [...station],
        isLoading: false,
      }),
    ),
    on(
      stationActions.loadAllStationFailure,
      (state, { error }): StationState => ({
        ...state,
        error: error.message,
        isLoading: false,
      }),
    ),
    on(
      stationActions.addNewStationToStore,
      (state, { newStation }): StationState => ({
        ...state,
        station: [...state.station, newStation],
        error: null,
      }),
    ),
    on(
      stationActions.createNewStationFailure,
      (state, { error }): StationState => ({
        ...state,
        error: error.message,
        isLoading: false,
      }),
    ),
    on(
      stationActions.deleteStationInStore,
      (state, { id }): StationState => ({
        ...state,
        station: [...state.station.filter((item) => item.id !== id)],
        error: null,
      }),
    ),
    on(
      stationActions.deleteStationFailure,
      (state, { error }): StationState => ({
        ...state,
        error: error.message,
        isLoading: false,
      }),
    ),
  ),
});
