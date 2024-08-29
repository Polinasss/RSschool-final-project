import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { StationBody } from 'app/admin-overview/models/station';
import { StationState } from './station.state';
import { stationFeature } from './station.reducer';
import { stationActions } from './station.action';

@Injectable({ providedIn: 'root' })
export class StationFacade {
  private readonly store = inject<Store<StationState>>(Store);

  readonly station$ = this.store.select(stationFeature.selectStation);

  readonly error$ = this.store.select(stationFeature.selectError);

  readonly isLoading$ = this.store.select(stationFeature.selectIsLoading);

  loadStation() {
    this.store.dispatch(stationActions.loadAllStation());
  }

  addStation(newStation: Omit<StationBody, 'id'>) {
    this.store.dispatch(stationActions.createNewStation({ station: newStation }));
  }

  deleteStation(stationId: number) {
    this.store.dispatch(stationActions.deleteStation({ id: stationId }));
  }
}
