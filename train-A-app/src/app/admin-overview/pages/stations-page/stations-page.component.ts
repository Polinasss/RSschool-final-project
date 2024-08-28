import { Component, inject, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StationFacade } from 'app/admin-overview/_state/station/station.facade';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StationMapComponent } from '../../components/station-map/station-map.component';
import { StationFormComponent } from '../../components/station-form/station-form.component';
import { StationListComponent } from '../../components/station-list/station-list.component';
import { LocationData, Station } from '../../models/station';

@Component({
  selector: 'app-stations-page',
  standalone: true,
  imports: [
    StationMapComponent,
    StationFormComponent,
    StationListComponent,
    FormsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './stations-page.component.html',
  styleUrl: './stations-page.component.scss',
})
export class StationsPageComponent {
  stationsConnectedForm: FormGroup;

  public selectedLocation: LocationData | null = null;

  private snackBar = inject(MatSnackBar);

  private stationFacade = inject(StationFacade);

  readonly stations$ = this.stationFacade.station$;

  readonly error$ = this.stationFacade.error$;

  readonly isLoading$ = this.stationFacade.isLoading$;

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

    this.error$.subscribe((error) => {
      if (error) {
        this.snackBar.open(error, 'Close', { duration: 3000 });
      }
    });
  }

  public onAddStation(newStation: Station) {
    this.stationFacade.addStation(newStation);
    this.mapComponent.updateMapMarkers();
  }

  public onDeleteStation(stationId: number) {
    // const index = this.stations.findIndex((station) => station.id === stationId);
    // if (index > -1) {
    //   const isConnected = this.stations.some((station) =>
    //     station.connectedTo.some((connection) => connection.id === stationId.toString()),
    //   );

    //   if (isConnected) {
    //     console.log('Cannot delete station with active rides!');
    //     return;
    //   }

    //   this.stations.splice(index, 1);
    //   if (this.mapComponent) {
    //     this.mapComponent.updateMapMarkers();
    //   }
    // }
    console.log('Station to delete:', stationId);
  }
}
