import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChosenRide, Ride } from 'app/home/models/trip';
import { Order, TripService } from 'app/trip/services/trip.service';
import { MatTabsModule } from '@angular/material/tabs';
import { Carriage, CarriageDataForSchema } from 'app/admin-overview/models/carriage';
import { Station } from 'app/admin-overview/models/station';
import { Subscription } from 'rxjs';
import { TripFacade } from 'app/home/_state/search.facade';
import { TripStationsComponent } from 'app/home/components/trip-stations/trip-stations.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CarriageFacade } from 'app/admin-overview/_state/carriage/carriage.facade';
import { CarriageSchemaComponent } from '../carriage-schema/carriage-schema.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    DatePipe,
    MatIcon,
    MatButtonModule,
    CarriageSchemaComponent,
  ],
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
})
export class TripComponent implements OnInit, OnDestroy {
  rideId: number = 0;

  fromStationId: number = 0;

  toStationId: number = 0;

  private carriageTypes: Carriage[] = [];

  stations: Station[] = [];

  tripDetails: Ride = {
    path: [],
    carriages: [],
    rideId: 0,
    schedule: { segments: [] },
  };

  startStopStations = { start: 0, stop: 0 };

  carriagePrices: { type: string; price: number; seats: number }[] = [];

  train: Carriage[] = [];

  middleStations = {
    second: 'err',
    penult: 'err',
  };

  ride: ChosenRide = {
    routeId: 0,
    fromCity: '',
    toCity: '',
    stations: [],
    carriages: [],
    occupiedSeats: [],
    schedule: [],
  };

  subscription: Subscription = new Subscription();

  carriageSchemas: { [type: string]: CarriageDataForSchema } = {};

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private tripFacade: TripFacade,
    private carriageFacade: CarriageFacade,
    private dialog: MatDialog,
    private router: Router,
  ) {
    this.carriageFacade.loadCarriage();
    this.carriageFacade.carriage$.subscribe((cs) => {
      this.carriageTypes = cs;
      cs.forEach((carriage) => {
        this.carriageSchemas[carriage.name] = {
          name: carriage.name,
          rows: String(carriage.rows),
          leftSeats: String(carriage.leftSeats),
          rightSeats: String(carriage.rightSeats),
        };
      });
    });
    this.tripFacade.ride$.subscribe((ride) => {
      this.ride = ride;
    });
  }

  ngOnInit(): void {
    this.rideId = Number(this.route.snapshot.paramMap.get('rideId')) || 0;
    this.route.queryParams.subscribe((params) => {
      this.fromStationId = Number(params['from']) || 0;
      this.toStationId = Number(params['to']) || 0;
      this.fetchTripDetails();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getCity(id: number) {
    return (
      this.stations.find((st) => {
        return st.id === this.tripDetails.path[id];
      })?.city ?? ''
    );
  }

  fetchTripDetails() {
    if (this.rideId) {
      this.tripService.getTripDetails(this.rideId).subscribe((data: Ride) => {
        this.tripDetails = data;
      });
    } else {
      console.warn('Missing parameters: Cannot fetch trip details');
    }
  }

  back() {
    this.router.navigate(['/home']);
  }

  letsBook() {
    const order: Order = {
      rideId: this.rideId,
      seat: Math.ceil(Math.random() * 100),
      stationStart: this.ride.stations[0].id,
      stationEnd: this.ride.stations[this.ride.stations.length - 1].id,
    };
    this.tripService.sendBooking(order).subscribe((order) => {
      console.log(order);
    });
  }

  openDialog(): void {
    this.dialog.open(TripStationsComponent, {
      width: '400px',
      data: {
        path: { stations: this.ride.stations, id: this.ride.routeId },
        schedule: this.ride.schedule,
        allStations: this.stations,
      },
    });
  }
}
