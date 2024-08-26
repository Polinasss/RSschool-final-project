import { Injectable } from '@angular/core';
import { Carriage, CarriageFormEditMode } from 'app/admin-overview/models/carriage';
import { Subject } from 'rxjs';

interface CarriageUpdate {
  panelId: string;
  editMode: CarriageFormEditMode;
  carriage?: Carriage;
}

@Injectable({
  providedIn: 'root',
})
export class CarriagesPanelService {
  private panelStateSubject = new Subject<CarriageUpdate>();

  panelState$ = this.panelStateSubject.asObservable();

  togglePanel(panelId: string, editMode: CarriageFormEditMode) {
    this.panelStateSubject.next({ panelId, editMode });
  }

  togglePanelAndUpdateItem(panelId: string, editMode: CarriageFormEditMode, carriage: Carriage) {
    this.panelStateSubject.next({ panelId, editMode, carriage });
  }
}
