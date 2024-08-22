import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface NominatimResponse {
  address: {
    city?: string;
    town?: string;
    village?: string;
    road?: string;
    state?: string;
    country?: string;
    country_code?: string;
  };
  lat: string;
  lon: string;
}

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  private apiUrl = 'https://nominatim.openstreetmap.org/reverse';

  constructor(private http: HttpClient) {}

  getCityByCoordinates(lat: number, lon: number): Observable<NominatimResponse> {
    const url = `${this.apiUrl}?lat=${lat}&lon=${lon}&format=json&addressdetails=1`;
    return this.http.get<NominatimResponse>(url);
  }
}
