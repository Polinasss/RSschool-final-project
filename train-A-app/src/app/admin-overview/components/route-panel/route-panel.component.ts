import { Component, inject, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { CarriageFormEditMode } from 'app/admin-overview/models/carriage';
import { Route } from 'app/admin-overview/models/route';
import { RoutePanelService } from 'app/admin-overview/services/route-panel/route-panel.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-route-panel',
  standalone: true,
  imports: [MatExpansionModule],
  templateUrl: './route-panel.component.html',
  styleUrl: './route-panel.component.scss',
})
export class RoutePanelComponent implements AfterViewInit, OnDestroy {
  @ViewChild('panelRoute') panel!: MatExpansionPanel;

  private panelService = inject(RoutePanelService);

  public editMode: CarriageFormEditMode = 'create';

  public routeForUpdating: Route | null = null;

  public subscriptions: Subscription = new Subscription();

  ngAfterViewInit() {
    this.subscriptions.add(
      this.panelService.panelState$.subscribe((updateInfo) => {
        if (updateInfo.panelId === 'panelRoute') {
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
