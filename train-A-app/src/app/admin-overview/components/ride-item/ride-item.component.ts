import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Ride } from 'app/admin-overview/models/ride';
import { StationFacade } from 'app/admin-overview/_state/station/station.facade';
import { Station } from 'app/admin-overview/models/station';
import { combineLatest, map, Observable } from 'rxjs';
import { RidePriceComponent } from '../ride-price/ride-price.component';
import { RideTimeComponent } from '../ride-time/ride-time.component';

@Component({
  selector: 'app-ride-item',
  standalone: true,
  imports: [NgFor, NgIf, RideTimeComponent, RidePriceComponent, AsyncPipe],
  templateUrl: './ride-item.component.html',
  styleUrl: './ride-item.component.scss',
})
export class RideItemComponent implements OnInit {
  @Input() ride: Ride | null = null;

  public stationFacade = inject(StationFacade);

  public stations$: Observable<Station[]> = this.stationFacade.station$;

  public rideStations$!: Observable<string[]>;

  public ngOnInit(): void {
    if (this.ride) {
      const stationName: string[] = [];
      this.rideStations$ = combineLatest([this.stations$]).pipe(
        map(([stations]) => {
          this.ride?.path.forEach((item) => {
            const cityName = stations.find((city) => city.id === item);
            if (cityName) stationName.push(cityName?.city);
          });
          return stationName;
        }),
      );
    }
  }
}
