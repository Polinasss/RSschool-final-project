import { Component, inject } from '@angular/core';
import { CarriageFacade } from 'app/admin-overview/_state/carriage/carriage.facade';
import { CarriagesItemComponent } from 'app/admin-overview/components/carriages-item/carriages-item.component';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CarriagesPanelComponent } from '../../components/carriages-panel/carriages-panel.component';

@Component({
  selector: 'app-carriages-page',
  standalone: true,
  imports: [
    CarriagesPanelComponent,
    CarriagesItemComponent,
    AsyncPipe,
    MatProgressSpinnerModule,
    NgFor,
    NgIf,
  ],
  templateUrl: './carriages-page.component.html',
  styleUrl: './carriages-page.component.scss',
})
export class CarriagesPageComponent {
  private carriageFacade = inject(CarriageFacade);

  readonly carriages$ = this.carriageFacade.carriage$;

  readonly error$ = this.carriageFacade.error$;

  readonly isLoading$ = this.carriageFacade.isLoading$;
}
