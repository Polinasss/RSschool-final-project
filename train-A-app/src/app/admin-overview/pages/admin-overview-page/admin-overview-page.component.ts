import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { StationFacade } from 'app/admin-overview/_state/station/station.facade';
import { StationsPageComponent } from '../stations-page/stations-page.component';

@Component({
  selector: 'app-admin-overview-page',
  standalone: true,
  imports: [MatDividerModule, MatListModule, CommonModule, StationsPageComponent],
  templateUrl: './admin-overview-page.component.html',
  styleUrl: './admin-overview-page.component.scss',
})
export class AdminOverviewPageComponent implements OnInit {
  selectedPanelItem: string = 'Stations';

  selectPanelItem(panelItem: string): void {
    this.selectedPanelItem = panelItem;
  }

  private stationFacade = inject(StationFacade);

  public ngOnInit(): void {
    this.stationFacade.loadStation();
  }
}
