import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Ride } from 'app/admin-overview/models/ride';
import { StationFacade } from 'app/admin-overview/_state/station/station.facade';
import { Station } from 'app/admin-overview/models/station';
import { combineLatest, map, Observable } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { RidePriceComponent } from '../ride-price/ride-price.component';
import { RideTimeComponent } from '../ride-time/ride-time.component';
import { RideDeleteComponent } from '../ride-delete/ride-delete.component';

@Component({
  selector: 'app-ride-item',
  standalone: true,
  imports: [NgFor, NgIf, RideTimeComponent, RidePriceComponent, AsyncPipe, MatIcon],
  templateUrl: './ride-item.component.html',
  styleUrl: './ride-item.component.scss',
})
export class RideItemComponent implements OnInit {
  @Input() ride: Ride | null = null;

  public stationFacade = inject(StationFacade);

  public stations$: Observable<Station[]> = this.stationFacade.station$;

  public rideStations$!: Observable<string[]>;

  readonly dialog = inject(MatDialog);

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

  public onDelete(enterAnimationDuration: string, exitAnimationDuration: string, id: number) {
    const currentDate = new Date();
    const scheduleForRide = this.ride?.schedule.find((schedule) => schedule.rideId === id);
    const rideDate = scheduleForRide?.segments[0].time[0];
    if (rideDate) {
      const parsedRideDate = new Date(rideDate);
      if (parsedRideDate > currentDate) {
        this.dialog.open(RideDeleteComponent, {
          width: '300px',
          enterAnimationDuration,
          exitAnimationDuration,
          data: { status: 'ok', routeId: this.ride?.id, rideId: id },
        });
      } else {
        this.dialog.open(RideDeleteComponent, {
          width: '300px',
          enterAnimationDuration,
          exitAnimationDuration,
          data: { status: 'error', routeId: this.ride?.id, rideId: id },
        });
      }
    }
  }
}
