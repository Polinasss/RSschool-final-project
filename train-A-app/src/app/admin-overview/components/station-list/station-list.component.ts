import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Station } from '../../models/station';

@Component({
  selector: 'app-station-list',
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardContent, MatIcon, CommonModule],
  templateUrl: './station-list.component.html',
  styleUrl: './station-list.component.scss',
})
export class StationListComponent {
  @Input() stations!: Station[];

  @Output() stationDeleted = new EventEmitter<number>();

  public getCityNameById(id: number): string {
    const station = this.stations.find((stationEl) => stationEl.id === id);
    return station ? station.city : 'Unknown City';
  }

  public deleteStation(stationId: number) {
    this.stationDeleted.emit(stationId);
  }
}
