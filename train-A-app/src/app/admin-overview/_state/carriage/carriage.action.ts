import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Carriage } from '../../models/carriage';
import { ServerError } from '../../../shared/models/error';

export const carriageActions = createActionGroup({
  source: 'CARRIAGE',
  events: {
    loadAllCarriage: emptyProps(),
    loadAllCarriageSuccess: props<{ carriage: Carriage[] }>(),
    loadAllCarriageFailure: props<{ error: ServerError }>(),
    createNewCarriage: props<{ carriage: Omit<Carriage, 'code'> }>(),
    createNewCarriageSuccess: props<{ code: string; carriage: Omit<Carriage, 'code'> }>(),
    createNewCarriageFailure: props<{ error: ServerError }>(),
    addNewCarriageToStore: props<{ newCarriage: Carriage }>(),
    updateCarriage: props<{ carriage: Carriage }>(),
    updateCarriageSuccess: props<{ code: string; carriage: Carriage }>(),
    updateCarriageFailure: props<{ error: ServerError }>(),
    updateCarriageInStore: props<{ updateCarriage: Carriage }>(),
  },
});
