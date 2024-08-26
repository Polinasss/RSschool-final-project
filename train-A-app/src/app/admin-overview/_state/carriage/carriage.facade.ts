import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CarriageState } from './carriage.state';
import { carriageFeature } from './carriage.reducer';
import { carriageActions } from './carriage.action';
import { Carriage } from '../../models/carriage';

@Injectable({ providedIn: 'root' })
export class CarriageFacade {
  private readonly store = inject<Store<CarriageState>>(Store);

  readonly carriage$ = this.store.select(carriageFeature.selectCarriage);

  readonly error$ = this.store.select(carriageFeature.selectError);

  readonly isLoading$ = this.store.select(carriageFeature.selectIsLoading);

  loadCarriage() {
    this.store.dispatch(carriageActions.loadAllCarriage());
  }

  addCarriage(newCarriage: Omit<Carriage, 'code'>) {
    this.store.dispatch(carriageActions.createNewCarriage({ carriage: newCarriage }));
  }

  updateCarriage(updateCarriage: Carriage) {
    this.store.dispatch(carriageActions.updateCarriage({ carriage: updateCarriage }));
  }
}
