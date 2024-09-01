import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CarriageFormEditMode } from '../../models/carriage';
import { Route } from '../../models/route';

interface RouteUpdate {
  panelId: string;
  editMode: CarriageFormEditMode;
  route?: Route;
}

@Injectable({
  providedIn: 'root',
})
export class RoutePanelService {
  private panelStateSubject = new Subject<RouteUpdate>();

  panelState$ = this.panelStateSubject.asObservable();

  togglePanel(panelId: string, editMode: CarriageFormEditMode) {
    this.panelStateSubject.next({ panelId, editMode });
  }

  togglePanelAndUpdateRoute(panelId: string, editMode: CarriageFormEditMode, route: Route) {
    this.panelStateSubject.next({ panelId, editMode, route });
  }
}
