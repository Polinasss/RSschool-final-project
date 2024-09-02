import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ride } from 'app/home/models/trip';
import { TripService } from 'app/trip/services/trip.service';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
})
export class TripComponent implements OnInit {
  rideId: number = 0;

  fromStationId: number = 0;

  toStationId: number = 0;

  tripDetails: Ride = {
    path: [],
    carriages: [],
    rideId: 0,
    schedule: [],
  };

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService, // Inject your service
  ) {}

  ngOnInit(): void {
    this.rideId = Number(this.route.snapshot.paramMap.get('rideId')) || 0;
    this.route.queryParams.subscribe((params) => {
      this.fromStationId = Number(params['from']) || 0;
      this.toStationId = Number(params['to']) || 0;
      this.fetchTripDetails();
    });
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
}
