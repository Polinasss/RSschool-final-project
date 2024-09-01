import { Component, inject } from '@angular/core';
import { CarriageFacade } from 'app/admin-overview/_state/carriage/carriage.facade';
import { CarriagesItemComponent } from 'app/admin-overview/components/carriages-item/carriages-item.component';
import { AsyncPipe, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CarriagesPanelService } from 'app/admin-overview/services/carriages-panel/carriages-panel.service';
import { CreateButtonComponent } from 'app/shared/components/create-button/create-button.component';
import { CarriagesFormComponent } from 'app/admin-overview/components/carriages-form/carriages-form.component';
import { CarriagesPanelComponent } from '../../components/carriages-panel/carriages-panel.component';

@Component({
  selector: 'app-carriages-page',
  standalone: true,
  imports: [
    CarriagesPanelComponent,
    CarriagesItemComponent,
    CarriagesFormComponent,
    AsyncPipe,
    MatProgressSpinnerModule,
    NgFor,
    NgIf,
    NgTemplateOutlet,
    CreateButtonComponent,
  ],
  templateUrl: './carriages-page.component.html',
  styleUrl: './carriages-page.component.scss',
})
export class CarriagesPageComponent {
  private carriageFacade = inject(CarriageFacade);

  private panelService = inject(CarriagesPanelService);

  readonly carriages$ = this.carriageFacade.carriage$;

  readonly error$ = this.carriageFacade.error$;

  readonly isLoading$ = this.carriageFacade.isLoading$;

  readonly formState$ = this.panelService.panelState$;

  public openForm() {
    this.panelService.togglePanel('panel', 'create');
  }
}
