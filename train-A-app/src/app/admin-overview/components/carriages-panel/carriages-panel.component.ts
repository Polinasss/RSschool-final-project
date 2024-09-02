import { AfterViewInit, Component, inject, OnDestroy, ViewChild } from '@angular/core';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { Carriage, CarriageFormEditMode } from 'app/admin-overview/models/carriage';
import { Subscription } from 'rxjs';
import { CarriagesFormComponent } from '../carriages-form/carriages-form.component';
import { CarriagesPanelService } from '../../services/carriages-panel/carriages-panel.service';

@Component({
  selector: 'app-carriages-panel',
  standalone: true,
  imports: [MatExpansionModule, CarriagesFormComponent],
  templateUrl: './carriages-panel.component.html',
  styleUrl: './carriages-panel.component.scss',
})
export class CarriagesPanelComponent implements AfterViewInit, OnDestroy {
  @ViewChild('panel') panel!: MatExpansionPanel;

  private panelService = inject(CarriagesPanelService);

  public editMode: CarriageFormEditMode = 'create';

  public carriageForUpdating: Carriage | null = null;

  public subscriptions: Subscription = new Subscription();

  ngAfterViewInit() {
    this.subscriptions.add(
      this.panelService.panelState$.subscribe((updateInfo) => {
        if (updateInfo.panelId === 'panel') {
          if (this.panel.expanded && updateInfo.editMode === 'save') {
            this.panel.close();
          } else {
            this.panel.open();
          }
        }
      }),
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
