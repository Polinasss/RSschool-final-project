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
    on(
      carriageActions.addNewCarriageToStore,
      (state, { newCarriage }): CarriageState => ({
        ...state,
        carriage: [newCarriage, ...state.carriage],
        error: null,
      }),
    ),
    on(
      carriageActions.createNewCarriageFailure,
      (state, { error }): CarriageState => ({
        ...state,
        error: error.message,
        isLoading: false,
      }),
    ),
    on(
      carriageActions.updateCarriageInStore,
      (state, { updateCarriage }): CarriageState => ({
        ...state,
        carriage: state.carriage.map((item) =>
          item.code === updateCarriage.code ? { ...item, ...updateCarriage } : item,
        ),
        error: null,
      }),
    ),
    on(
      carriageActions.updateCarriageFailure,
      (state, { error }): CarriageState => ({
        ...state,
        error: error.message,
        isLoading: false,
      }),
    ),
  ),
});
