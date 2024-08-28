import { Component, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import * as L from 'leaflet';
import {
  GeocodingService,
  NominatimResponse,
} from '../../services/geocoding-service/geocoding.service';
import { LocationData, Station } from '../../models/station';

@Component({
  selector: 'app-station-map',
  standalone: true,
  imports: [],
  templateUrl: './station-map.component.html',
  styleUrl: './station-map.component.scss',
})
export class StationMapComponent implements AfterViewInit {
  @Input() stations!: Station[];

  @Output() locationSelected = new EventEmitter<LocationData>();

  private map!: L.Map;

  private customIcon: L.Icon;

  private markers: L.Marker[] = [];

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

    this.map = L.map('map', {
      zoom: 1,
      minZoom: 1,
    }).setView([51.505, -0.09], 1);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);

    this.updateMapMarkers();

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;

      this.map.panTo(e.latlng);

      this.geocodingService
        .getCityByCoordinates(lat, lng)
        .subscribe((response: NominatimResponse) => {
          const city =
            response.address.city ||
            response.address.town ||
            response.address.village ||
            'Unknown City';
          this.locationSelected.emit({ city, latitude: lat, longitude: lng });
        });
    });
  }

  public updateMapMarkers(): void {
    this.markers.forEach((marker) => this.map.removeLayer(marker));
    this.markers = [];

    this.stations.forEach((station) => {
      const marker = L.marker([station.latitude, station.longitude], { icon: this.customIcon })
        .addTo(this.map)
        .bindPopup(`${station.city}`)
        .openPopup();
      this.markers.push(marker);
    });
  }
}
