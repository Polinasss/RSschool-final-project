import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StationMapComponent } from '../../components/station-map/station-map.component';
import { StationFormComponent } from '../../components/station-form/station-form.component';
import { StationListComponent } from '../../components/station-list/station-list.component';
import { LocationData, Station } from '../../models/station';
import { MOCK_STATIONS } from '../../models/mocked-data';

@Component({
  selector: 'app-stations-page',
  standalone: true,
  imports: [
    StationMapComponent,
    StationFormComponent,
    StationListComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './stations-page.component.html',
  styleUrl: './stations-page.component.scss',
})
export class StationsPageComponent {
  stationsConnectedForm: FormGroup;

  public selectedLocation: LocationData | null = null;

  public stations: Station[] = MOCK_STATIONS;

  @ViewChild(StationMapComponent) mapComponent!: StationMapComponent;

  @ViewChild(StationListComponent) listComponent!: StationListComponent;

  constructor(private fb: FormBuilder) {
    this.stationsConnectedForm = this.fb.group({
      city: ['', Validators.required],
      latitude: ['', [Validators.required, Validators.min(-90), Validators.max(90)]],
      longitude: ['', [Validators.required, Validators.min(-180), Validators.max(180)]],
      connectedTo: this.fb.array([]),
    });
  }

  public onLocationSelected(locationData: LocationData): void {
    this.selectedLocation = locationData;
    this.stationsConnectedForm.patchValue({
      city: locationData.city,
      latitude: locationData.latitude,
      longitude: locationData.longitude,
    });
  }

  public onAddStation(newStation: Station) {
    const stationExist = this.stations.find((station) => station.city === newStation.city);

    if (stationExist) {
      console.log('A station already exists in this city. Cannot add a new one!');
      return;
    }

    this.stations.push(newStation);
    this.mapComponent.updateMapMarkers();
  }

  public onDeleteStation(stationId: number) {
    const index = this.stations.findIndex((station) => station.id === stationId);
    if (index > -1) {
      const isConnected = this.stations.some((station) =>
        station.connectedTo.some((connection) => connection.id === stationId.toString()),
      );

      if (isConnected) {
        console.log('Cannot delete station with active rides!');
        return;
      }

      this.stations.splice(index, 1);
      if (this.mapComponent) {
        this.mapComponent.updateMapMarkers();
      }
    }
  }
}
