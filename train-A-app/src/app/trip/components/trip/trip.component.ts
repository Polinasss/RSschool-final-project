import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChosenRide, Ride } from 'app/home/models/trip';
import { TripService } from 'app/trip/services/trip.service';
import { MatTabsModule } from '@angular/material/tabs';
import { Carriage } from 'app/admin-overview/models/carriage';
import { Station } from 'app/admin-overview/models/station';
import { Subscription } from 'rxjs';
import { TripFacade } from 'app/home/_state/search.facade';
import { TripStationsComponent } from 'app/home/components/trip-stations/trip-stations.component';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CarriagesItemComponent } from 'app/admin-overview/components/carriages-item/carriages-item.component';
import { CarriageFacade } from 'app/admin-overview/_state/carriage/carriage.facade';

@Component({
  standalone: true,
  imports: [MatTabsModule, DatePipe, MatIcon, MatButtonModule, CarriagesItemComponent],
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

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private tripFacade: TripFacade,
    private carriageFacade: CarriageFacade,
    private dialog: MatDialog,
    private router: Router,
  ) {
    this.carriageFacade.carriage$.subscribe((cs) => {
      this.carriageTypes = cs;
    });
    this.tripFacade.saveRide({
      routeId: 2,
      fromCity: 'city1',
      toCity: 'city5',
      stations: [
        {
          id: 1,
          city: 'city1',
        },
        {
          id: 4,
          city: 'city4',
        },
        {
          id: 63,
          city: 'city63',
        },
        {
          id: 5,
          city: 'city5',
        },
      ],
      carriages: [
        {
          type: 'carriage3',
          price: 4985,
          seats: 32,
        },
        {
          type: 'carriage1',
          price: 3684,
          seats: 512,
        },
        {
          type: 'carriage4',
          price: 4197,
          seats: 112,
        },
        {
          type: 'carriage5',
          price: 3477,
          seats: 132,
        },
        {
          type: 'carriage2',
          price: 1608,
          seats: 144,
        },
      ],
      occupiedSeats: [],
      date: new Date('2024-09-12T21:51:18.424Z'),
      schedule: [
        {
          time: ['2024-09-03T15:53:18.424Z', '2024-09-06T00:17:18.424Z'],
          price: {
            carriage3: 1921,
            carriage1: 1523,
            carriage4: 573,
            carriage5: 2091,
            carriage2: 876,
          },
          occupiedSeats: [],
        },
        {
          time: ['2024-09-06T01:04:18.424Z', '2024-09-09T06:49:18.424Z'],
          price: {
            carriage3: 2268,
            carriage1: 757,
            carriage4: 1612,
            carriage5: 994,
            carriage2: 464,
          },
          occupiedSeats: [],
        },
        {
          time: ['2024-09-09T07:46:18.424Z', '2024-09-12T21:51:18.424Z'],
          price: {
            carriage3: 796,
            carriage1: 1404,
            carriage4: 2012,
            carriage5: 392,
            carriage2: 268,
          },
          occupiedSeats: [],
        },
      ],
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

  getCarriage(type: string) {
    return this.carriageTypes.find((car) => car.name === type) ?? this.carriageTypes[0];
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
        console.log({ data });
      });
    } else {
      console.warn('Missing parameters: Cannot fetch trip details');
    }
  }

  back() {
    this.router.navigate(['/home']);
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
