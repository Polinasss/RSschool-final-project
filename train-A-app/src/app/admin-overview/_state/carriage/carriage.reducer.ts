import { createFeature, createReducer, on } from '@ngrx/store';
import { CarriageState, initialCarriageState } from './carriage.state';
import { carriageActions } from './carriage.action';

export const carriageFeature = createFeature({
  name: 'carriage',
  reducer: createReducer<CarriageState>(
    initialCarriageState,
    on(
      carriageActions.loadAllCarriage,
      (state): CarriageState => ({
        ...state,
        isLoading: true,
      }),
    ),
    on(
      carriageActions.loadAllCarriageSuccess,
      (state, { carriage }): CarriageState => ({
        ...state,
        carriage: [...carriage],
        isLoading: false,
      }),
    ),
    on(
      carriageActions.loadAllCarriageFailure,
      (state, { error }): CarriageState => ({
        ...state,
        error: error.message,
        isLoading: false,
      }),
    ),
  ),
});
