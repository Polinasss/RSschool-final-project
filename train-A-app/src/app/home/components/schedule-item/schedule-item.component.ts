import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { ChosenRide, Schedule } from 'app/home/models/trip';
import { formatDuration } from 'app/shared/utils/datetime';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CarriageFacade } from 'app/admin-overview/_state/carriage/carriage.facade';
import { Carriage } from 'app/admin-overview/models/carriage';
import { Subscription } from 'rxjs';
import { Station } from 'app/admin-overview/models/station';
import { StationFacade } from 'app/admin-overview/_state/station/station.facade';
import { Router } from '@angular/router';
import { TripFacade } from 'app/home/_state/search.facade';
import { TripStationsComponent } from '../trip-stations/trip-stations.component';

@Component({
  selector: 'app-schedule-item',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCard,
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardContent,
    MatCardContent,
    MatDialogModule,
    DatePipe,
  ],
  templateUrl: './schedule-item.component.html',
  styleUrl: './schedule-item.component.scss',
})
export class ScheduleItemComponent implements OnInit, OnDestroy {
  @Input() way!: Schedule;

  @Input() fromCity: { stationId: number; city: string } = { stationId: 0, city: '' };

  @Input() toCity: { stationId: number; city: string } = { stationId: 0, city: '' };

  @Input() path: { stations: number[]; carriages: string[]; id: number } = {
    stations: [],
    carriages: [],
    id: 0,
  };

  stations: Station[] = [];

  departureTime = '';

  arrivalTime = '';

  duration: string | number = '';

  durationDateTime: number = 0;

  carriagePrices: { type: string; price: number; seats: number }[] = [];

  startStopStations = { start: 0, stop: 0 };

  middleStations = {
    second: 'err',
    penult: 'err',
  };

  subscription: Subscription = new Subscription();

  private carriageTypes: Carriage[] = [];

  constructor(
    private dialog: MatDialog,
    private carriageFacade: CarriageFacade,
    private stationFacade: StationFacade,
    private tripFacade: TripFacade,
    private router: Router,
  ) {
    this.stationFacade.station$.subscribe((stations) => {
      this.stations = stations;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openDialog(): void {
    const { start, stop } = this.startStopStations;
    this.dialog.open(TripStationsComponent, {
      width: '400px',
      data: {
        path: {
          stations: this.path.stations
            .slice(start, stop + 1)
            .map((stNum, i) => ({ id: stNum, city: this.getCity(start + i) })),
          id: this.path.id,
        },
        schedule: this.way.segments.slice(start, stop),
        allStations: this.stations,
      },
    });
  }

  getCity(id: number) {
    return (
      this.stations.find((st) => {
        return st.id === this.path.stations[id];
      })?.city ?? ''
    );
  }

  ngOnInit() {
    const start = this.path.stations.indexOf(this.fromCity.stationId);
    const stop = this.path.stations.indexOf(this.toCity.stationId, start);
    this.startStopStations.start = start > 0 ? start : 0;
    this.startStopStations.stop = stop > start ? stop : 0;
    const segments = this.way.segments.slice(start, stop);
    const second = segments.length > 2 ? start + 1 : start;
    const penult = segments.length > 2 ? stop - 1 : stop;
    this.middleStations = {
      second: this.getCity(second),
      penult: this.getCity(penult),
    };
    const segmentsPrices = segments.map((seg) => seg.price);
    const carriageTypes = Object.keys(segmentsPrices[0]);

    this.subscription = this.carriageFacade.carriage$.subscribe((carriages) => {
      this.carriageTypes = carriages;
      this.carriagePrices = carriageTypes.map((type) => {
        const carriage = this.carriageTypes.find((carriage) => carriage.name === type);
        let numberOfSeats = -1;
        if (carriage) {
          numberOfSeats = (carriage.leftSeats + carriage.rightSeats) * carriage.rows;
        }
        let numberOfAllSeats = 0;
        if (numberOfSeats > 0) {
          numberOfAllSeats =
            this.path.carriages.filter((carriage) => type === carriage).length * numberOfSeats;
        }
        return {
          type,
          price: segmentsPrices.reduce((acc, cur) => acc + cur[type], 0),
          seats: numberOfAllSeats,
        };
      });
    });

    const [dt] = [...segments[0].time];
    this.departureTime = dt;
    const [, at] = segments[segments.length - 1].time;
    this.arrivalTime = at;
    const arrivalTimeStamp = new Date(this.departureTime).getTime();
    const departureTimeStamp = new Date(this.arrivalTime).getTime();
    this.durationDateTime = departureTimeStamp - arrivalTimeStamp;
    this.duration = formatDuration(this.durationDateTime);
  }

  selectTrip() {
    const { start, stop } = this.startStopStations;
    const ride: ChosenRide = {
      routeId: this.path.id,
      fromCity: this.fromCity.city,
      toCity: this.toCity.city,
      stations: this.path.stations
        .slice(start, stop + 1)
        .map((stNum, i) => ({ id: stNum, city: this.getCity(start + i) })),
      carriages: [...this.carriagePrices],
      occupiedSeats: [],
      date: new Date(this.arrivalTime),
      schedule: this.way.segments.slice(start, stop),
    };
    this.tripFacade.saveRide(ride);
    console.log({ ride });

    this.router.navigate(['/trip', this.way.rideId], {
      queryParams: { from: this.startStopStations.start, to: this.startStopStations.stop },
    });
  }
}
