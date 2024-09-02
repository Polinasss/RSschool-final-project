import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as L from 'leaflet';
import { StationFacade } from 'app/admin-overview/_state/station/station.facade';

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

  private autocompleteUrl = 'https://nominatim.openstreetmap.org/search';

  private stationFacade = inject(StationFacade);

  private stations$ = this.stationFacade.station$;

  constructor(private http: HttpClient) {}

  getCityByCoordinates(lat: number, lon: number): Observable<NominatimResponse> {
    const url = `${this.apiUrl}?lat=${lat}&lon=${lon}&format=json&addressdetails=1`;
    return this.http.get<NominatimResponse>(url);
  }

  updateMapMarkers(map: L.Map): void {
    const markersMap = new Map<number, L.Marker>();

    this.stations$.subscribe((stations) => {
      if (!map) return;

      markersMap.forEach((marker, stationId) => {
        if (!stations.some((station) => station.id === stationId)) {
          map.removeLayer(marker);
          markersMap.delete(stationId);
        }
      });

      stations.forEach((station) => {
        if (!markersMap.has(station.id)) {
          const marker = L.marker([station.latitude, station.longitude])
            .addTo(map)
            .bindPopup(`${station.city}`);
          markersMap.set(station.id, marker);
        } else {
          const existingMarker = markersMap.get(station.id);
          if (existingMarker) {
            existingMarker.setLatLng([station.latitude, station.longitude]);
            existingMarker.getPopup()?.setContent(`${station.city}`);
          }
        }
      });
    });
  }
}
