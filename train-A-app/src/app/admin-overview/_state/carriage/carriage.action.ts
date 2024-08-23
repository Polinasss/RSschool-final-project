import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Carriage } from '../../models/carriage';
import { ServerError } from '../../../shared/models/error';

export const carriageActions = createActionGroup({
  source: 'CARRIAGE',
  events: {
    loadAllCarriage: emptyProps(),
    loadAllCarriageSuccess: props<{ carriage: Carriage[] }>(),
    loadAllCarriageFailure: props<{ error: ServerError }>(),
    createNewCarriage: emptyProps(),
    createNewCarriageSuccess: props<{ code: string }>(),
    createNewCarriageFailure: props<{ error: ServerError }>(),
    updateCarriage: emptyProps(),
    updateCarriageSuccess: props<{ code: string }>(),
    updateCarriageFailure: props<{ error: ServerError }>(),
  },
});
