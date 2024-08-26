import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { Carriage, CarriageFormEditMode } from 'app/admin-overview/models/carriage';
import { CarriagesFormComponent } from '../carriages-form/carriages-form.component';
import { CarriagesPanelService } from '../../services/carriages-panel/carriages-panel.service';

@Component({
  selector: 'app-carriages-panel',
  standalone: true,
  imports: [MatExpansionModule, CarriagesFormComponent],
  templateUrl: './carriages-panel.component.html',
  styleUrl: './carriages-panel.component.scss',
})
export class CarriagesPanelComponent implements AfterViewInit {
  @ViewChild('panel') panel!: MatExpansionPanel;

  private panelService = inject(CarriagesPanelService);

  public editMode: CarriageFormEditMode = 'create';

  public carriageForUpdating: Carriage | null = null;

  ngAfterViewInit() {
    this.panelService.panelState$.subscribe((updateInfo) => {
      if (updateInfo.panelId === 'panel') {
        if (this.panel.expanded && updateInfo.editMode === 'save') {
          this.panel.close();
        } else if (this.panel.expanded && updateInfo.editMode === 'edit') {
          this.editMode = updateInfo.editMode;
          this.carriageForUpdating = this.ensureCarriage(updateInfo.carriage);
        } else {
          this.panel.open();
          this.carriageForUpdating = this.ensureCarriage(updateInfo.carriage);
        }
      }
    });
  }

  private ensureCarriage(carriage?: Partial<Carriage>): Carriage {
    return {
      code: carriage?.code ?? '',
      name: carriage?.name ?? '',
      rows: carriage?.rows ?? 0,
      leftSeats: carriage?.leftSeats ?? 0,
      rightSeats: carriage?.rightSeats ?? 0,
    };
  }
}
