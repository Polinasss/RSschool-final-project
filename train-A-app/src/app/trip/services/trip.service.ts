import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ride } from 'app/home/models/trip';

export interface Order {
  rideId: number;
  seat: number;
  stationStart: number;
  stationEnd: number;
}

@Injectable({
  providedIn: 'root',
})
export class TripService {
  constructor(private http: HttpClient) {}

  getTripDetails(rideId: number): Observable<Ride> {
    return this.http.get<Ride>(`/api/search/${rideId}`);
  }

  sendBooking(order: Order): Observable<Ride> {
    return this.http.post<Ride>(`/api/order/`, { ...order });
  }
}
