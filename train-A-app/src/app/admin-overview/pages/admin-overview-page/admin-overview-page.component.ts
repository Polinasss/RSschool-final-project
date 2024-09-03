import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { CarriageFacade } from 'app/admin-overview/_state/carriage/carriage.facade';
import { StationFacade } from 'app/admin-overview/_state/station/station.facade';
import { StationsPageComponent } from '../stations-page/stations-page.component';
import { CarriagesPageComponent } from '../carriages-page/carriages-page.component';
import { RoutesPageComponent } from '../routes-page/routes-page.component';

@Component({
  selector: 'app-admin-overview-page',
  standalone: true,
  imports: [
    MatDividerModule,
    MatListModule,
    CommonModule,
    StationsPageComponent,
    CarriagesPageComponent,
    RoutesPageComponent,
    RouterModule,
  ],
  templateUrl: './admin-overview-page.component.html',
  styleUrl: './admin-overview-page.component.scss',
})
export class AdminOverviewPageComponent implements OnInit {
  public selectedPanelItem: string = 'Stations';

  private router: Router = inject(Router);

  private stationFacade = inject(StationFacade);

  private carriageFacade = inject(CarriageFacade);

  public ngOnInit(): void {
    this.stationFacade.loadStation();
    this.carriageFacade.loadCarriage();
    const initialPath = this.router.url;
    this.selectedPanelItem = this.getPanelNameFromPath(initialPath);
  }

  public navigateTo(path: string): void {
    this.selectedPanelItem = this.getPanelNameFromPath(path);
    this.router.navigate([path]);
  }

  private getPanelNameFromPath(path: string): string {
    switch (path) {
      case '/admin-page/stations':
        return 'Stations';
      case '/admin-page/carriages':
        return 'Carriages';
      case '/admin-page/routes':
        return 'Routes';
      default:
        return '';
    }
  }

  selectPanelItem(panelItem: string): void {
    this.selectedPanelItem = panelItem;
  }
}
