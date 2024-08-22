import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { StationsPageComponent } from '../stations-page/stations-page.component';

@Component({
  selector: 'app-admin-overview-page',
  standalone: true,
  imports: [MatDividerModule, MatListModule, CommonModule, StationsPageComponent],
  templateUrl: './admin-overview-page.component.html',
  styleUrl: './admin-overview-page.component.scss',
})
export class AdminOverviewPageComponent {
  selectedPanelItem: string = 'Stations';

  selectPanelItem(panelItem: string): void {
    this.selectedPanelItem = panelItem;
  }
}
