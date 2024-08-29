import { Component, AfterViewInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { Subject, takeUntil } from 'rxjs';
import {
  GeocodingService,
  NominatimResponse,
} from '../../services/geocoding-service/geocoding.service';
import { LocationData } from '../../models/station';

@Component({
  selector: 'app-station-map',
  standalone: true,
  imports: [],
  templateUrl: './station-map.component.html',
  styleUrl: './station-map.component.scss',
})
export class StationMapComponent implements AfterViewInit, OnDestroy {
  @Output() locationSelected = new EventEmitter<LocationData>();

  private map!: L.Map;

  private customIcon: L.Icon;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private geocodingService: GeocodingService) {
    this.customIcon = L.icon({
      iconRetinaUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  }

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  private initializeMap(): void {
    if (this.map) {
      return;
    }

    this.map = L.map('map').setView([51.505, -0.09], 1);

    const titles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 1,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });

    titles.addTo(this.map);

    this.geocodingService.updateMapMarkers(this.map, this.customIcon);

    this.map.on('click', this.handleMapClick.bind(this), { passive: true });
  }

  private handleMapClick(e: L.LeafletMouseEvent): void {
    const { lat, lng } = e.latlng;

    this.map.panTo(e.latlng);

    this.geocodingService
      .getCityByCoordinates(lat, lng)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: NominatimResponse) => {
        const city =
          response.address.city ||
          response.address.town ||
          response.address.village ||
          'Unknown City';
        this.locationSelected.emit({ city, latitude: lat, longitude: lng });
      });
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.off('click');
      this.map.remove();
    }
    this.destroy$.next();
    this.destroy$.complete();
  }
}
