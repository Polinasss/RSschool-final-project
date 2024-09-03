import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ride } from 'app/home/models/trip';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  constructor(private http: HttpClient) {}

  getTripDetails(rideId: number): Observable<Ride> {
    return this.http.get<Ride>(`/api/search/${rideId}`);
  }
}
