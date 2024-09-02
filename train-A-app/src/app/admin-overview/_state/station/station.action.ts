import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Station, StationBody } from 'app/admin-overview/models/station';
import { ServerError } from 'app/shared/models/error';

export const stationActions = createActionGroup({
  source: 'STATION',
  events: {
    loadAllStation: emptyProps(),
    loadAllStationSuccess: props<{ station: Station[] }>(),
    loadAllStationFailure: props<{ error: ServerError }>(),
    createNewStation: props<{ station: Omit<StationBody, 'id'> }>(),
    createNewStationSuccess: props<{ id: number; station: Omit<Station, 'id'> }>(),
    createNewStationFailure: props<{ error: ServerError }>(),
    addNewStationToStore: props<{ newStation: Station }>(),
    updateStoreAfterAdd: props<{ stationId: number; connectedStationId: number }>(),
    deleteStation: props<{ id: number }>(),
    deleteStationSuccess: props<{ id: number }>(),
    deleteStationFailure: props<{ error: ServerError }>(),
    deleteStationInStore: props<{ stations: Station[] }>(),
    updateStoreAfterDelete: props<{ id: number }>(),
  },
});
