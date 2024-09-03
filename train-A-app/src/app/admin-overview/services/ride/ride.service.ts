import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Ride, RideResponse, Segment } from 'app/admin-overview/models/ride';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RideService {
  private http = inject(HttpClient);

  public loadRideById(id: number): Observable<Ride> {
    return this.http.get<Ride>(`/api/route/${id}`);
  }

  public addRide(routeId: number, newRide: Partial<Ride>): Observable<RideResponse> {
    return this.http.post<RideResponse>(`/api/route/${routeId}/ride`, newRide);
  }

  public updateRide(routeId: number, rideId: number, newRide: Segment[]): Observable<number> {
    return this.http.put<number>(`/api/route/${routeId}/ride/${rideId}`, { segments: newRide });
  }

  public deleteRide(routeId: number, rideId: number): Observable<Ride> {
    return this.http.delete<Ride>(`/api/route/${routeId}/ride/${rideId}`);
  }
}
