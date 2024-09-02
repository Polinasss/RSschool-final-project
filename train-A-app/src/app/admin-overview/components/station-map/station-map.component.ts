import { Component, AfterViewInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { Subject, takeUntil } from 'rxjs';
import {
  GeocodingService,
  NominatimResponse,
} from '../../services/geocoding-service/geocoding.service';
import { LocationData } from '../../models/station';

const iconRetinaUrl = '';
const iconUrl = './assets/marker-icon.png';
const shadowUrl = './assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = iconDefault;

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

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private geocodingService: GeocodingService) {}

  ngAfterViewInit(): void {
    this.initializeMap();
    if (this.map && iconDefault) {
      this.geocodingService.updateMapMarkers(this.map);
    }

    this.map.on('click', this.handleMapClick.bind(this), { passive: true });
  }

  private initializeMap(): void {
    if (this.map) {
      return;
    }

    this.map = L.map('map', {
      center: [51.505, -0.09],
      zoom: 1,
    });

    const titles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 1,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });

    titles.addTo(this.map);
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
